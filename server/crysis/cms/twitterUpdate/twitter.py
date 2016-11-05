import tweepy

CONSUMER_KEY = 'SkQ0WXFJYcQCwLaz3bAa9VKIX'
CONSUMER_SECRET = 'VMO8Cpf28GRdHYH9e0mkuMRk76tJ7qLEfsuaErbUqcpD1lLaSF'
ACCESS_TOKEN = '782948316464111616-V2lYx8gAnhTFgSkSKzdDUWihBvpY1tU'
ACCESS_TOKEN_SECRET = 'mYAIlTkrddT13luepctdpps2Tn1CBHd63z1eeJ1EsijRI'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

test = []
y = 0

def updateTwitter():
    with open('../templates/shelter.txt') as f:
        for line in f:
            test.append(line)
    f.close()

    while (y < 5):
        api.update_status(status=test[y])
        y = y + 1

    return True
