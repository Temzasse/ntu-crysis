# import json
from datetime import datetime
from django.dispatch import receiver
# from django.db.models import Q
from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
# from django.core import serializers
from .consumers import ws_send_notification
from rest_framework.authtoken.models import Token
from .models import Crisis, Incident
from .serializers import IncidentSerializer, CrisisSerializer
from cms.email.email import send_mailv4_to_responseunit


# NOTE:
# Check this tutorial about signals
# https://simpleisbetterthancomplex.com/tutorial/2016/07/28/how-to-create-django-signals.html


@receiver(post_save, sender=User)
def create_auth_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=Incident)
def execute_after_save_incident(sender, instance, created, *args, **kwargs):
    # Add newly created incident to current crisis.
    # Create new active crisis if it does not exist.
    currentCrisis, crisisCreated = Crisis.objects.get_or_create(
        status='ACT',
        defaults={
            'title': 'crisis',
            'description': 'automatically created crisis'
        },
    )
    currentCrisis.incidents.add(instance.id)

    # Send incident data to client
    serializer = IncidentSerializer(instance)
    if created:
        send_mailv4_to_responseunit(instance, ["ntu.fuqiang@gmail.com"])
        ws_send_notification('INCIDENT_NEW', serializer.data)
    else:
        ws_send_notification('INCIDENT_UPDATED', serializer.data)


@receiver(post_delete, sender=Incident)
def execute_after_delete_incident(sender, instance, *args, **kwargs):
    ws_send_notification('INCIDENT_DELETE', 'deleted')


# @receiver(post_save, sender=Shelter)
# def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
#     data = serializers.serialize('json', [instance, ])
#     data = json.loads(data)
#     data = json.dumps(data[0]['fields'])
#     ws_send_notification('Shelter', 'UPDATE', data)


@receiver(post_save, sender=Crisis)
def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
    if not created and instance.status == 'ARC':
        # Let's create a new crisis since previous one was archived
        newCrisis = Crisis(title="Crisis ({:%B-%d-%Y})".format(datetime.now()))
        newCrisis.save()
        # data = serializers.serialize('json', [newCrisis, ])
        # data = json.loads(data)
        # data = json.dumps(data[0]['fields'])
        serializer = CrisisSerializer(newCrisis)
        ws_send_notification('CRISIS_RECEIVE_NEW', serializer.data)


@receiver(post_delete, sender=Crisis)
def execute_after_delete_crisis(sender, instance, *args, **kwargs):
    ws_send_notification('CRISIS_DELETE', 'deleted')
