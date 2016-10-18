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


"""
We should figure out the ER-diagram first before creating the models.
That will make it much easier to understand the relationships between different
entities and to get a good picture about the whole system.

Take a look at the notes I added and see if they make sense :)

Notes added by Teemu Taskula (3.10.2016)
"""

class Incident(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    comment = models.TextField(max_length=300, blank=True)  # use as a string but should be split by '.' or '\n'

    # NOTE: Incident type should probably be like `land` or `sea`
    #       so that we know what kind of response unit to send.
    type = models.CharField(choices=TYPE_CHOICE, default='UN', max_length=5)
    # NOTE: Check choice.py for note about area choices.
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    level = models.IntegerField(default=0)
    # NOTE: Should this be `created_at`?
    created_at = models.DateTimeField(auto_now_add=True)
    # NOTE: Should this be `updated_at`?
    updated_at = models.DateTimeField(auto_now=True)
    # NOTE: Is this data necessary? Can be expressed in comment or maybe even left out entirely.
    witness = models.CharField(max_length=20, default='Public', blank=True)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)
    #create many-to-one relationship handle
    handle_by = models.ForeignKey('ResponseUnit', on_delete=models.CASCADE, default = 1)
    # NOTE: Incident should have `status` field => `active` / `done`
    #       Response unit sets incident to `done` when task is completed.

    # owner = models.ForeignKey('auth.User', related_name='incident')

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
    type = models.CharField(choices=TYPE_CHOICE, default='UN', max_length=5)
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    phone = models.CharField(max_length=10, blank=True)
    email = models.EmailField(max_length=50, blank=True)
    # NOTE: Do we need address?
    address = models.CharField(max_length=30, blank=True)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)
    speciality = models.CharField(choices = TYPE_CHOICE, default='UN', max_length=5)


    # NOTE: Response unit should have `speciality` field that corresponds to some incident `type` field
    #       => eg. `land` or `sea`
    #       => this way we can send the correct unit to handle the correct incident.

    # NOTE: Also response unit `type` field could be one of `trainer` / `police` / `military`...
    #       We dont need to create classes for these => lets keep it simple ;)

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
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    comment = models.TextField(max_length=300, blank=True)
    status = models.CharField(choices= STATUS_CHOICE, default='UN', max_length=5) 
    type = models.CharField(choices=TYPE_CHOICE, default='UN', max_length=5)
    # NOTE: Crisis probably doesn't need to know about area because area is
    #       property of individual incident in crisis.
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)
    level = models.IntegerField(default=0)
    threshold = models.IntegerField(default=0)
    # NOTE: should probably have `status` field => `inactive` / `active` / `pending` / `archived`
    #       For example: when we create incident we attach it to Crisis
    #       that might need to be created with status `inactive` since its not
    #       a crisis yet.
    #       When the num of incidents passes the threshold we change the status to `active`
    #       And when the crisis has been resolved it goes to `pending` status
    #       (or `archived` if we want to make it simpler)

    # NOTE: `created_at` and `updated_at` instead?
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # NOTE: Should be `incidents` because of ManyToManyField
    incidents = models.ManyToManyField(Incident, blank=True)
    # NOTE: Shelter are not crisis dependant, right? So crisis doesn't really have shelters
    shelters = models.ManyToManyField(Shelter, blank=True)
    # NOTE: Should be `resonseUnits` because of ManyToManyField
    responseUnits = models.ManyToManyField(ResponseUnit, blank=True)
    # NOTE: Trainer should one type of response unit not a thing by itself.
    #       => this can probably be removed.
    trainers = models.ManyToManyField(Trainer, blank=True)

    # NOTE: Crisis is not attached to some location.
    #       Crisis is basically a container for incidents that have the location data.
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)

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