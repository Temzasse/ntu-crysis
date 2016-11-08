from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from celery import shared_task, task
from .email import send_mailv4
from .mail_context import getPM_MailContext
from cms.models import Crisis, Incident
import datetime

logger = get_task_logger(__name__)


@periodic_task(
    run_every=(crontab(minute='*/1')),
    name="send_email_to_pm",
    ignore_result=True,
    )
def send_email_to_pm():
    time_now = datetime.datetime.now()
    strtime_now = time_now.strftime("%Y %b %d,%H:%M:%S")

    subject = "Periodic Incident report %s" % strtime_now
    # recipient_list = {"cz3003.crysis@gmail.com"}
    recipient_list = {"superusercrysis@gmail.com"}
    crisis_latest = Crisis.objects.all()
    if crisis_latest[0].ongoing:
        d_context = getPM_MailContext(Incident.objects.all(), subject)
        send_mailv4(recipient_list, d_context, subject)

    else:
        print "No crisis... (not sending to PM)"


@task(name="send_crysis_start_mail", ignore_result=True)
def send_crysis_start_mail():
    time_now = datetime.datetime.now()
    strtime_now = time_now.strftime("%Y %b %d,%H:%M:%S")

    subject = "New incident add to crisis, %s" % strtime_now
    # recipient_list = {"cz3003.crysis@gmail.com"}
    recipient_list = {"superusercrysis@gmail.com"}
    crisis_latest = Crisis.objects.all()
    d_context = getPM_MailContext(crisis_latest[0].incidents, subject)
    try:
        send_mailv4(recipient_list, d_context, subject)
    except:
        print "(send_crysis_start_mail) email not sent..."


@task(name="send_crysis_archived_mail", ignore_result=True,retry_kwargs={'max_retries': 5})
def send_crysis_archived_mail():
    time_now = datetime.datetime.now()
    strtime_now = time_now.strftime("%Y %b %d,%H:%M:%S")

    subject = "Incident archived %s" % strtime_now
    # recipient_list = {"cz3003.crysis@gmail.com"}
    recipient_list = {"superusercrysis@gmail.com"}
    incidents = Incident.objects.all()
    d_context = getPM_MailContext(incidents, subject)
    try:
        send_mailv4(recipient_list, d_context, subject)
    except:
        print "(send_crysis_archived_mail) email not sent..."
