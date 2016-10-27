import requests
from cms.models import Incident
from django.core.mail import EmailMultiAlternatives
# from django.conf import settings


def send_mail(API_BASE_URL, API_KEY, recipient_list):
	# https://api.mailgun.net/v3/sandbox4ac9c7827182454cb64760dea766890d.mailgun.org
	key = API_KEY
	sandbox = API_BASE_URL


	# key = 'key-4745d5bb1df7897d7cc9866769c74df3'
	# sandbox = 'sandboxed3dc79ee0374c9a9a288859fbd98726.mailgun.org'

	request_url = 'https://api.mailgun.net/v2/{0}/messages'.format(sandbox)
	request = requests.post(
        request_url,
        auth=('api', key),
        data={'from': 'hello@example.com',
              'to': recipient_list,
              'subject': 'nite test!',
              'text': 'Thanks!!Spamming test!.'
    })
	# key = 'key-4745d5bb1df7897d7cc9866769c74df3'
	# sandbox = 'sandboxed3dc79ee0374c9a9a288859fbd98726.mailgun.org'

	# recipient = CUSTOMER_LIST
	# request_url = 'https://api.mailgun.net/v2/{0}/messages'.format(sandbox)
	# request = requests.post(request_url, auth=('api', key), data={
	#     'from': 'hello@example.com',
	#     'to': recipient,
	#     'subject': 'test 1',
	#     'text': 'test Mailgun'
	# })
	print ('Status: {0}'.format(request.status_code))
	print ('Body:   {0}'.format(request.text))