from facepy import GraphAPI

# Initialize the Graph API with a valid access token (optional,
# but will allow you to do all sorts of fun stuff).

oauth_access_token = 'EAABZC0OOt2wQBAOcKcpbbYiuFyEONLyqOsdUrODvEBLXq6ZCPXBcI1oZA4UZCPrIkXcZBOzkF9ue0AXNRAEjeE4tfJHy4GwjGfT4CZArvkwmTDGLnU2T1eiixAPm7q4GsPQPVAsDbWdZCEWGwANtKwZAWmeo85xX8tdvfiZBc7Mu6JQZDZD'
graph = GraphAPI(oauth_access_token)

# Get my latest posts
#graph.get('me/posts')

#Post a photo of a parrot
#graph.post(
#   path = 'me/photos',
#   source = open('Untitled.png','rb')
#)
def updateFacebook():
    
    file = open('shelter.txt', 'r')

    graph.post(
    path = 'me/feed',
    message=file.read(),
   
    ) 

    return True
