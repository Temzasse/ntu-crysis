# import json
from datetime import datetime
from django.dispatch import receiver
# from django.db.models import Q
from django.db.models.signals import pre_save, post_save, post_delete
from django.contrib.auth.models import User
# from django.core import serializers
from .consumers import ws_send_notification
from rest_framework.authtoken.models import Token
from .models import Crisis, Incident
from .serializers import IncidentSerializer, CrisisSerializer
# from .email.tasks import send_crysis_start_mail, send_crysis_archived_mail


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

    level = currentCrisis.incidents.count()

    if level >= currentCrisis.threshold and not currentCrisis.ongoing:
        # Now we are in crisis mode
        currentCrisis.ongoing = True
        currentCrisis.save()

        # Send update notification to client
        crisis_serializer = CrisisSerializer(currentCrisis)
        ws_send_notification('CRISIS_RECEIVE_UPDATED', crisis_serializer.data)

    # Send incident data to client
    serializer = IncidentSerializer(instance)
    if created:
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


# @receiver(post_save, sender=Crisis)
# def execute_after_save_crisis(sender, instance, created, *args, **kwargs):
#     if not created and instance.status == 'ARC':
#         # Let's create a new crisis since previous one was archived
#         newCrisis = Crisis(title="Crisis ({:%B-%d-%Y})".format(datetime.now()))
#         newCrisis.save()
#         serializer = CrisisSerializer(newCrisis)
#         ws_send_notification('CRISIS_RECEIVE_NEW', serializer.data)


@receiver(pre_save, sender=Crisis)
def execute_before_save_crisis(sender, instance, *args, **kwargs):
    orig = Crisis.objects.filter(id=instance.id).first()

    if not orig:
        return

    # Crisis starts
    if orig.ongoing != instance.ongoing and instance.ongoing:
        print('[EMAIL] Sending email when crisis starts')
        # send_crysis_start_mail.delay(instance.incidents)

    # Crisis is archived/ends
    elif (orig.status != instance.status) and (instance.status == 'ARC'):
        # Let's create a new crisis since previous one was archived
        newCrisis = Crisis(title="Crisis ({:%B-%d-%Y})".format(datetime.now()))

        serializer = CrisisSerializer(newCrisis)
        ws_send_notification('CRISIS_RECEIVE_NEW', serializer.data)

        # Send PM email
        print('[EMAIL] Sending email when crisis ends')
        # send_crysis_archived_mail.delay(instance.incidents)

        newCrisis.save()


@receiver(post_delete, sender=Crisis)
def execute_after_delete_crisis(sender, instance, *args, **kwargs):
    ws_send_notification('CRISIS_DELETE', 'deleted')
