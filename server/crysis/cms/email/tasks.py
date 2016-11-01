from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from celery import Celery
from .email import send_mail,send_mailv2
from django.conf import settings


logger = get_task_logger(__name__)

@periodic_task(
	run_every=(crontab(minute='*/1')), 
	name="send_email_to_pm", 
	ignore_result=True,
)
def send_email_to_pm():
	from django.conf import settings
	# recipient_list = {"cz3003.crysis@gmail.com"}
	recipient_list = {"superusercrysis@gmail.com"}
	API_KEY, API_BASE_URL = settings.MAILGUN_API_KEY, settings.MAILGUN_BASE_URL
	# send_mail(API_BASE_URL, API_KEY, recipient_list)
	send_mailv2(API_BASE_URL, API_KEY, recipient_list)
