from django.db import models
from django.dispatch import receiver
from .consumers import ws_send_notification
from .choice import *


class Incident(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    comment = models.TextField(max_length=300, blank=True)  # use as a string but should be split by '.' or '\n'

    type = models.CharField(choices=TYPE_CHOICE, default='UN', max_length=5)
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    level = models.IntegerField(default=0)
    created_by = models.DateTimeField(auto_now_add=True)
    updated_by = models.DateTimeField(auto_now=True)
    witness = models.CharField(max_length=20, default='Public', blank=True)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)

    owner = models.ForeignKey('auth.User', related_name='incident')

    def __str__(self):
        return self.title


@receiver(models.signals.post_save, sender=Incident)
def execute_after_save_incident(sender, instance, created, *args, **kwargs):
    print('incident save')
    print(created)
    print(instance.id)
    if created:
        ws_send_notification('User', 'Incident', 'CREATE', instance.id)
    else:
        ws_send_notification('User', 'Incident', 'UPDATE', instance.id)


@receiver(models.signals.post_delete, sender=Incident)
def execute_after_delete_incidnet(sender, instance, *args, **kwargs):
    ws_send_notification('User', 'Incident', 'DELETE', instance.id)


class ResponseUnit(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)

    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    phone = models.CharField(max_length=10, blank=True)
    email = models.EmailField(max_length=50, blank=True)

    address = models.CharField(max_length=30, blank=True)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)

    def __str__(self):
        return self.name


class Trainer(models.Model):
    name = models.CharField(max_length=30)
    sex = models.CharField(choices=SEX_CHOICE, max_length=5)
    type = models.CharField(choices=TRAINER_TYPE_CHOICE, max_length=10, blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    nationality = models.CharField(choices=NATIONALITY_CHOICE, max_length=5, blank=True)

    def __str__(self):
        return self.name


class Crisis(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    comment = models.TextField(max_length=300, blank=True)

    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    level = models.IntegerField(default=0)

    created_by = models.DateTimeField(auto_now_add=True)
    updated_by = models.DateTimeField(auto_now=True)

    incident = models.ManyToManyField(Incident)
    responseUnit = models.ManyToManyField(ResponseUnit, blank=True)
    trainer = models.ManyToManyField(Trainer, blank=True)

    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)

    def __str__(self):
        return self.title


@receiver(models.signals.post_save, sender=Crisis)
def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
    if created:
        ws_send_notification('User', 'Crisis', 'CREATE', instance.id)
    else:
        ws_send_notification('User', 'Crisis', 'UPDATE', instance.id)


@receiver(models.signals.post_delete, sender=Crisis)
def execute_after_delete_crisis(sender, instance, *args, **kwargs):
    ws_send_notification('User', 'Crisis', 'DELETE', instance.id)


class PokemonDB(models.Model):
    name = models.CharField(max_length=30)
    name_cn = models.CharField(max_length=30, blank=True)
    type = models.CharField(choices=POKEMON_TYPE_CHOICE, max_length=5, blank=True)
    ability = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name


class Pokemon(models.Model):
    sex = models.CharField(choices=SEX_CHOICE, max_length=5)
    pokemon_type = models.ForeignKey(PokemonDB, on_delete=models.CASCADE)
    owner = models.ForeignKey(Trainer, on_delete=models.CASCADE)

    def __str__(self):
        return self.pokemon_type.name+ ' by ' + self.owner.name

# class Shelter(models.Model)
# class Weather(models.Models)
# class Report()
# class SocialMedia()
# class User()



