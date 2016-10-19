import json
from channels import Group
from channels.sessions import channel_session
from .models import Crisis


@channel_session
def ws_message(message):
    msg = json.loads(message['text'])

    if msg['type'] == 'INCIDENT_FETCH':
        print('INCIDENT_FETCH')
        activeCrisis = Crisis.objects.get(status='INA')
        print('---------------')
        print(activeCrisis)
        print('---------------')

    message.reply_channel.send({
        "text": 'test',
    })


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
