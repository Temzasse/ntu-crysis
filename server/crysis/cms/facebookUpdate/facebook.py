from facepy import GraphAPI

# Initialize the Graph API with a valid access token (optional,
# but will allow you to do all sorts of fun stuff).

oauth_access_token = 'EAABZC0OOt2wQBAH9wUdWaIJdsiHyCbNOunFy2F8Wv1AuKZBEJL9Y4J0JtuDZCfF5Hv0au75bgo86hUpknaCjQCfAzbnJeZCplbmhTLaJCMb4drYcZAaGjjQC6m8VuiBesRn7YEEIua2xXChwQBDEqakCoQlBwCI8ZD'


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
