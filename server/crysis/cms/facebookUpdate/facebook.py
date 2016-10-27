from facepy import GraphAPI

# Initialize the Graph API with a valid access token (optional,
# but will allow you to do all sorts of fun stuff).

oauth_access_token = 'EAABZC0OOt2wQBAPYwGWmZB1WPHJInqpFlj59D3XjLrAXlGLWGaPpu8z1VeXNSlJdgBHTu3QYxZBEBwaLoql52GVVg9xamVjfIhEHBZCaokm4ks5BSH5SYFeXw8ktJE37PVAvDHLmWkDG7kR2fmCuqtleJuOEGIwSBgIZB102sTQZDZD'


def updateFacebook():
#Post a photo of a parrot
#graph.post(
#   path = 'me/photos',
#   source = open('Untitled.png','rb')
#)

    graph.post(
         path = 'me/feed',
         message="hello",
    )

    return TRUE
