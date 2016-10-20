import json
from django.dispatch import receiver
from django.db.models import Q
from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
from django.core import serializers
from .consumers import ws_send_notification
from rest_framework.authtoken.models import Token

from .models import Crisis, Incident


# NOTE:
# Check this tutorial about signals
# https://simpleisbetterthancomplex.com/tutorial/2016/07/28/how-to-create-django-signals.html


@receiver(post_save, sender=User)
def create_auth_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=Incident)
def execute_after_save_incident(sender, instance, created, *args, **kwargs):
    # Add newly created incident to current crisis
    currentCrisis = Crisis.objects.filter(Q(status='INA') | Q(status='ACT'))[0]  # noqa
    currentCrisis.incidents.add(instance.id)

    # Send incident data to client
    data = serializers.serialize('json', [instance, ])
    data = json.loads(data)
    data = data[0]['fields']
    if created:
        ws_send_notification('INCIDENT_NEW', data)
    else:
        ws_send_notification('INCIDENT_UPDATE', data)


@receiver(post_delete, sender=Incident)
def execute_after_delete_incidnet(sender, instance, *args, **kwargs):
    ws_send_notification('INCIDENT_DELETE', 'deleted')


# @receiver(post_save, sender=Shelter)
# def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
#     data = serializers.serialize('json', [instance, ])
#     data = json.loads(data)
#     data = json.dumps(data[0]['fields'])
#     ws_send_notification('Shelter', 'UPDATE', data)


@receiver(post_save, sender=Crisis)
def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
    data = serializers.serialize('json', [instance, ])
    data = json.loads(data)
    data = json.dumps(data[0]['fields'])
    if created:
        ws_send_notification('CRISIS_NEW', data)
    else:
        ws_send_notification('CRISIS_UPDATE', data)


@receiver(post_delete, sender=Crisis)
def execute_after_delete_crisis(sender, instance, *args, **kwargs):
    ws_send_notification('CRISIS_DELETE', 'deleted')
