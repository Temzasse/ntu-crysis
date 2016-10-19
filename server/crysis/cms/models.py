from django.db import models
from django.dispatch import receiver
from .consumers import ws_send_notification
from .choice import *
from django.core import serializers
import json
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


@receiver(models.signals.post_save, sender=User)
def create_auth_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)



class Incident(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    type = models.CharField(choices=TYPE_CHOICE, default='LAN', max_length=5)
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # NOTE: Is this data necessary? Can be expressed in comment or maybe even left out entirely.
    # witness = models.CharField(max_length=20, default='Public', blank=True)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)
    handle_by = models.ForeignKey('ResponseUnit', on_delete=models.CASCADE, blank=True, null=True)
    resolved = models.BooleanField(default=False)
    def __str__(self):
        return self.title


@receiver(models.signals.post_save, sender=Incident)
def execute_after_save_incident(sender, instance, created, *args, **kwargs):
    data = serializers.serialize('json', [instance, ])
    data = json.loads(data)
    data = json.dumps(data[0]['fields'])
    if created:
        ws_send_notification('Incident', 'CREATE', data)
    else:
        ws_send_notification('Incident', 'UPDATE', data)


@receiver(models.signals.post_delete, sender=Incident)
def execute_after_delete_incidnet(sender, instance, *args, **kwargs):
    ws_send_notification('Incident', 'DELETE', 'deleted')


class ResponseUnit(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    type = models.CharField(choices=R_UNIT_TYPE_CHOICE, default='POL', max_length=10)
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    phone = models.CharField(max_length=10, blank=True)
    email = models.EmailField(max_length=50, blank=True)
    address = models.CharField(max_length=30, blank=True)
    speciality = models.CharField(choices=TYPE_CHOICE, default='LAN', max_length=10)

    def __str__(self):
        return self.name


# NOTE: this might be a bit too detailed for us - out of the scope of this project
class Trainer(models.Model):
    name = models.CharField(max_length=30)
    sex = models.CharField(choices=SEX_CHOICE, max_length=5)
    type = models.CharField(choices=TRAINER_TYPE_CHOICE, max_length=10, blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    nationality = models.CharField(choices=NATIONALITY_CHOICE, max_length=5, blank=True)
    def __str__(self):
        return self.name


class Shelter(models.Model):
    name = models.CharField(max_length=50)
    capacity = models.IntegerField(blank=True)
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    status = models.BooleanField(default=False)  # opening - True or closed - False

    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)

    def __str__(self):
        return self.name

@receiver(models.signals.post_save, sender=Shelter)
def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
    data = serializers.serialize('json', [instance, ])
    data = json.loads(data)
    data = json.dumps(data[0]['fields'])
    ws_send_notification('Shelter', 'UPDATE', data)


class Crisis(models.Model):
    # NOTE: there's really no point of having a title to crisis
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=500, blank=True)
    # comment = models.TextField(max_length=300, blank=True)
    status = models.CharField(choices=STATUS_CHOICE, default='INA', max_length=10)
    level = models.IntegerField(default=0)
    threshold = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    incidents = models.ManyToManyField(Incident, blank=True)
    #shelters = models.ManyToManyField(Shelter, blank=True)

    def __str__(self):
        return self.title


@receiver(models.signals.post_save, sender=Crisis)
def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
    data = serializers.serialize('json', [instance, ])
    data = json.loads(data)
    data = json.dumps(data[0]['fields'])
    if created:
        ws_send_notification('Crisis', 'CREATE', data)
    else:
        ws_send_notification('Crisis', 'UPDATE', data)


@receiver(models.signals.post_delete, sender=Crisis)
def execute_after_delete_crisis(sender, instance, *args, **kwargs):
    ws_send_notification('Crisis', 'DELETE', 'deleted')


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
