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
    message.reply_channel.send({"text": json.dumps(data)})


@channel_session
def ws_connect(message):
    print('WEBSOCKET CONNECTED!')
    Group('incident').add(message.reply_channel)


@channel_session
def ws_disconnect(message):
    print('WEBSOCKET DISCONNECTED!')
    Group('incident').discard(message.reply_channel)


def ws_send_notification(group, change_type, data):
    result = json.dumps({
        'type': change_type,
        'payload': data
    })
    print('Websocket sending Group \'%s\' \'%s\'.' % (group, result))
    Group("%s" % group).send({'text': result})
