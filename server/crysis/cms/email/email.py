import requests
from cms.models import Incident
# for html templates
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from cms import views
from cms.choice import *
from datetime import datetime


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


def send_mailv4(recipient_list):
	import datetime,time
	from django.conf import settings
	plaintxt_ly = get_template('report_to_PM.txt')
	# html_ly = get_template('report_to_PM.html')
	# html_ly = get_template('report.html')
	html_ly = get_template('email.html')
	subject = "Incident report"

	incident_list = Incident.objects.all()
	
	server_starttime = settings.SERVER_START_TIME

	now = datetime.datetime.now()
	time_min_before = now - datetime.timedelta(minutes=30)
	
	incident_ongoing = incident_list.filter(resolved=False)
	incident_resolved = incident_list.filter(resolved=True)
	
	incident_NE = incident_list.filter(area="NE")
	incident_NW = incident_list.filter(area="NW")
	incident_SE = incident_list.filter(area="SE")
	incident_SW = incident_list.filter(area="SW")

	
	incident_NE_ongoing = incident_NE.filter(resolved=False)
	incident_NW_ongoing = incident_NW.filter(resolved=False)
	incident_SE_ongoing = incident_SE.filter(resolved=False)
	incident_SW_ongoing = incident_SW.filter(resolved=False)

	incident_NE_resolved = incident_NE.filter(resolved=True)
	incident_NW_resolved = incident_NW.filter(resolved=True)
	incident_SE_resolved = incident_SE.filter(resolved=True)
	incident_SW_resolved = incident_SW.filter(resolved=True)

	incident_ph = incident_list.filter(updated_at__lt=now,updated_at__gt=time_min_before)
	

	incident_ph_ongoing = incident_ph.filter(resolved=False)
	incident_ph_resolved = incident_ph.filter(resolved=True)



	incident_ph_NE = incident_ph.filter(area="NE")
	incident_ph_NW = incident_ph.filter(area="NW")
	incident_ph_SE = incident_ph.filter(area="SE")
	incident_ph_SW = incident_ph.filter(area="SW")

	incident_ph_NE_ongoing = incident_ph_NE.filter(resolved=False)
	incident_ph_NW_ongoing  = incident_ph_NW.filter(resolved=False)
	incident_ph_SE_ongoing = incident_ph_SE.filter(resolved=False)
	incident_ph_SW_ongoing = incident_ph_SW.filter(resolved=False)

	incident_ph_NE_resolved = incident_ph_NE.filter(resolved=True)
	incident_ph_NW_resolved = incident_ph_NW.filter(resolved=True)
	incident_ph_SE_resolved = incident_ph_SE.filter(resolved=True)
	incident_ph_SW_resolved = incident_ph_SW.filter(resolved=True)

	d = Context({
		'time_now':now,
		'incident_list' :incident_list,
		'incident_ongoing' :incident_ongoing,
		'incident_resolved' :incident_resolved,


        'incident_ph': incident_ph,
        'incident_ph_ongoing':incident_ph_ongoing,
		'incident_ph_resolved':incident_ph_resolved,


		'incident_ph_NE':incident_ph_NE,
		'incident_ph_NW':incident_ph_NW,
		'incident_ph_SE':incident_ph_SE,
		'incident_ph_SW':incident_ph_SW,

		'incident_ph_NE_resolved':incident_ph_NE_resolved,
		'incident_ph_NW_resolved':incident_ph_NW_resolved,
		'incident_ph_SE_resolved':incident_ph_SE_resolved,
		'incident_ph_SW_resolved':incident_ph_SW_resolved,

		'incident_ph_NE_ongoing':incident_ph_NE_ongoing,
		'incident_ph_NW_ongoing':incident_ph_NW_ongoing,
		'incident_ph_SE_ongoing':incident_ph_SE_ongoing,
		'incident_ph_SW_ongoing':incident_ph_SW_ongoing,

		'incident_NE': incident_NE,
		'incident_NW': incident_NW,
		'incident_SE': incident_SE,
		'incident_SW': incident_SW,

		
		'incident_NE_ongoing': incident_NE_ongoing,
		'incident_NW_ongoing': incident_NW_ongoing,
		'incident_SE_ongoing': incident_SE_ongoing,
		'incident_SW_ongoing': incident_SW_ongoing,

		'incident_NE_resolved': incident_NE_resolved,
		'incident_NW_resolved': incident_NW_resolved,
		'incident_SE_resolved': incident_SE_resolved,
		'incident_SW_resolved': incident_SW_resolved,

    })


	text_content = plaintxt_ly.render(d)
	html_content = html_ly.render(d)

	sender = "reportgenerator@crysis.com"

	msg = EmailMultiAlternatives(subject, text_content, sender, recipient_list)
	msg.attach_alternative(html_content, "text/html")
	respone = msg.send()


def send_mailv4_to_responseunit(incident, recipient_list):
	import datetime,time
	from django.conf import settings
	plaintxt_ly = get_template('responseunit_email.txt')
	html_ly = get_template('responseunit_email.html')
	subject = "New Incident Assigned"
	time = incident.created_at.strftime('%d %b %Y, %H%M')
	area = dict(AREA_CHOICE)[incident.area]
	type = dict(TYPE_CHOICE)[incident.type]
	d = Context({
		'incident': incident,
		'time': time,
		'area': area,
		'type': type
	})


	text_content = plaintxt_ly.render(d)
	html_content = html_ly.render(d)

	sender = "reportgenerator@crysis.com"

	msg = EmailMultiAlternatives(subject, text_content, sender, recipient_list)
	msg.attach_alternative(html_content, "text/html")
	respone = msg.send()