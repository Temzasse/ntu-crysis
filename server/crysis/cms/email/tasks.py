from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from celery import Celery
from .email import Mail


logger = get_task_logger(__name__)

@periodic_task(
	run_every=(crontab(minute='*/1')), 
	name="send_email_to_pm", 
	ignore_result=True,
)
def send_email_to_pm():
	Mail.send_mail()