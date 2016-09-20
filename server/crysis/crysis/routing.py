from channels.routing import route
from cms.consumers import ws_message, ws_connect, ws_disconnect

channel_routing = [
    #route("http.request","snippets.consumers.http_consumer"),#if i want to route http request.
    route("websocket.receive", ws_message),
    route("websocket.connect", ws_connect),
    route("websocket.disconnect", ws_disconnect),
]