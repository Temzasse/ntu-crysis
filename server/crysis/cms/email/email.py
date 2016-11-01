import requests
from cms.models import Incident
# for html templates
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from cms import views

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


# send email in text format with html attachement
def send_mailv2(API_BASE_URL, API_KEY, recipient_list):
	# https://api.mailgun.net/v3/sandbox4ac9c7827182454cb64760dea766890d.mailgun.org
	# key = API_KEY 
	# sandbox = API_BASE_URL


	# key = 'key-4745d5bb1df7897d7cc9866769c74df3'
	# sandbox = 'sandboxed3dc79ee0374c9a9a288859fbd98726.mailgun.org'
	
	plaintxt_ly = get_template('report_to_PM.txt')
	html_ly = get_template('report_to_PM.html')
	subject = "Incident report"

	incident_list = Incident.objects.all()
	d = Context({
        'incident_list': incident_list
    })


	text_content = plaintxt_ly.render(d)
	html_content = html_ly.render(d)

	sender = "alone@fromtheotherside.com"

	msg = EmailMultiAlternatives(subject, text_content, sender, recipient_list)
	msg.attach_alternative(html_content, "text/html")
	respone = msg.send()
	
def send_mailv3(API_BASE_URL, API_KEY, recipient_list):
	# https://api.mailgun.net/v3/sandbox4ac9c7827182454cb64760dea766890d.mailgun.org
	# key = API_KEY 
	# sandbox = API_BASE_URL


	# key = 'key-4745d5bb1df7897d7cc9866769c74df3'
	# sandbox = 'sandboxed3dc79ee0374c9a9a288859fbd98726.mailgun.org'
	
	plaintxt_ly = get_template('report_to_PM.txt')
	# html_ly = get_template('report_to_PM.html')
	html_ly = get_template('report.html')
	subject = "Incident report"

	incident_list = Incident.objects.all()
	d = Context({
        'incident_list': incident_list
    })


	text_content = plaintxt_ly.render(d)
	html_content = html_ly.render(d)

	sender = "alone@fromtheotherside.com"

	msg = EmailMultiAlternatives(subject, text_content, sender, recipient_list)
	msg.attach_alternative(html_content, "text/html")
	respone = msg.send()
	