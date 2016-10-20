import json
from channels import Group
from channels.sessions import channel_session
from django.db.models import Q
from .models import Crisis
from .serializers import IncidentSerializer


@channel_session
def ws_message(message):
    msg = json.loads(message['text'])
    data = {'type': '', 'payload': ''}

    if msg['type'] == 'INCIDENTS_FETCH':
        # NOTE:
        # Current crisis is either 'inactive' or 'active'
        # All past crisises should be either 'pending' or 'archived'
        currentCrisis = Crisis.objects.filter(Q(status='INA') | Q(status='ACT'))[0]  # noqa
        incidents = currentCrisis.incidents.all()
        serializer = IncidentSerializer(incidents, many=True)
        data['payload'] = serializer.data
        data['type'] = 'INCIDENTS_RECEIVE'

    if msg['type'] == 'INCIDENT_UPDATE':
        # NOTE:
        # - attach response unit to incident
        # - other stuff?
        print('Update incident!')

    # TODO: do we need to send message to group channel?
    # Might be enought to just 'broadcast' it to all channels.
    # We probably don't need groups.
    Group('cms').send({"text": json.dumps(data)})
    # message.reply_channel.send({"text": json.dumps(data)})


@channel_session
def ws_connect(message):
    print('WEBSOCKET CONNECTED!')
    Group('cms', channel_layer=message.channel_layer).add(message.reply_channel)  # noqa


@channel_session
def ws_disconnect(message):
    print('WEBSOCKET DISCONNECTED!')
    Group('cms').discard(message.reply_channel)


def ws_send_notification(change_type, data):
    json_string = json.dumps({
        'type': change_type,
        'payload': data
    })
    Group('cms').send({'text': json_string})
