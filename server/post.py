from facepy import GraphAPI

# Initialize the Graph API with a valid access token (optional,
# but will allow you to do all sorts of fun stuff).

oauth_access_token = 'EAACEdEose0cBAG3kdmZAmFHUtxaoZB12qGLWyZB3LP0nCQlIn5kpgXueDdhGqMaPm2QmOMQwVSMCFnQNUQCwMLa3uCwqZAkj3ZALkK3m8SgFEzA4OsLQf0rTVoRBgrSZCFInWnuYsN29rlpjzIiZCTesJVGHTxZAuHb3RNsYbh61zNVvoZC8zsS0M'
graph = GraphAPI(oauth_access_token)

# Get my latest posts
#graph.get('me/posts')

#Post a photo of a parrot
#graph.post(
#   path = 'me/photos',
#   source = open('Untitled.png','rb')
#)

graph.post(
     path = 'me/feed',
     message="hello",
)
 
