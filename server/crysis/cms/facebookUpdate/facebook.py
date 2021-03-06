from facepy import GraphAPI
from django.conf import settings
import os

# Initialize the Graph API with a valid access token (optional,
# but will allow you to do all sorts of fun stuff).

# oauth_access_token = 'EAABZC0OOt2wQBAOcKcpbbYiuFyEONLyqOsdUrODvEBLXq6ZCPXBcI1oZA4UZCPrIkXcZBOzkF9ue0AXNRAEjeE4tfJHy4GwjGfT4CZArvkwmTDGLnU2T1eiixAPm7q4GsPQPVAsDbWdZCEWGwANtKwZAWmeo85xX8tdvfiZBc7Mu6JQZDZD'
oauth_access_token = 'EAACEdEose0cBAPRtQdvettZAmH7ZA6GiRtCx4AFUPfTZBLUPTIjBZCKIVWZCpgYXw5V3sK8c4g7q5bZBUvpMh2M1aq4ZCiYPMwLIIilhFZCFdX4SrBKi5WPFWVrEl5Y1sZACCMkIJUJm6eyPFFXNd3ankhGuJFDfZB53v86bFFtYEzZCrXQj4bU6TPw'
graph = GraphAPI(oauth_access_token)

# Get my latest posts
# graph.get('me/posts')

# Post a photo of a parrot
# graph.post(
#   path = 'me/photos',
#   source = open('Untitled.png','rb')
# )


def updateFacebook():
    file = open('../templates/shelter.txt', 'r')

    graph.post(
        path='me/feed',
        message=file.read(),
        )

    return True


def updateFacebookv2():

    file = open(os.path.join(
        settings.BASE_DIR,
        'cms/templates/shelter.txt'), 'r'
    )
    graph.post(
        path='me/feed',
        message=file.read(),
        )

    return True
