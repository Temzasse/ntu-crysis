import tweepy
import datetime
CONSUMER_KEY = 'SkQ0WXFJYcQCwLaz3bAa9VKIX'
CONSUMER_SECRET = 'VMO8Cpf28GRdHYH9e0mkuMRk76tJ7qLEfsuaErbUqcpD1lLaSF'
ACCESS_TOKEN = '782948316464111616-V2lYx8gAnhTFgSkSKzdDUWihBvpY1tU'
ACCESS_TOKEN_SECRET = 'mYAIlTkrddT13luepctdpps2Tn1CBHd63z1eeJ1EsijRI'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)


def updateTwitter():
    from django.conf import settings
    import os
    y = 0
    test = []
    filename = os.path.join(settings.BASE_DIR, 'cms/templates/shelter.txt')

    with open(filename) as f:
        for line in f:
            test.append(line)
    f.close()

    while (y < 5):
        api.update_status(status=test[y])
        y = y + 1

    return True


def updateTwitterv2():

    y = 0

    time_now = datetime.datetime.now()
    strtime_now = time_now.strftime("%B %d%m%Y, %H:%M:%S")
    test = [
        strtime_now + '\nShelter 1 : SE shelter 1 : 30 Rowell Rd, Singapore 207985',
        strtime_now + '\nShelter 2 : NE shelter 1 : 827 Tampines Street 81, #01-150, Singapore 520827',
        strtime_now + '\nShelter 3 : NW Shelter 1 : 48 Sungei Kadut Avenue, Singapore 729671',
        strtime_now + '\nShelter 4 : SE Shelter 1 : 8 Gul Circle, Singapore 629564',
    ]

    while (y < 4):
        api.update_status(status=test[y])
        y = y + 1
