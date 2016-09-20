from django.http import HttpResponse
from channels.handler import AsgiHandler
from channels import Group
from channels.sessions import channel_session
import json
# def http_consumer(message):
#     response = HttpResponse("Hello world! You asked for %s" %message.content['path'])
#     for chunk in AsgiHandler.encode_response(response):
#         message.reply_channel.send(chunk)


#Send message by JavaScript socket.send(something)
@channel_session
def ws_message(message):
    Group("%s" % message.channel_session['room']).send({
        "text": message['text'] + message.channel_session['room'],
    })


#Join a WebSocket by JavaScript socket = new WebSocket("ws://" + window.location.host + "/GroupName/");
@channel_session
def ws_connect(message):
    room = message.content['path'].strip("/")
    message.channel_session['room'] = room
    Group("%s" % room).add(message.reply_channel)

@channel_session
def ws_disconnect(message):
    Group('chat').discard(message.reply_channel)

#React for push message by JavaScript socket.onmessage = function(e){action here with e.data}
def ws_send_notification(group, class_name, change_type, class_id):
    result = json.dumps({
        'class': class_name,
        'change_type': change_type,
        'id': class_id
    })
    Group("%s" % group).send({'text': result})