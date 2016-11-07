from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
# from celery import Celery
from .email import send_mailv4
from .mail_context import getPM_MailContext


logger = get_task_logger(__name__)


@periodic_task(
    run_every=(crontab(minute='*/1')),
    name="send_email_to_pm",
    ignore_result=True,
    )
def send_email_to_pm():
    # recipient_list = {"cz3003.crysis@gmail.com"}
    recipient_list = {"superusercrysis@gmail.com"}
    d_context = getPM_MailContext()
    send_mailv4(recipient_list, d_context)
