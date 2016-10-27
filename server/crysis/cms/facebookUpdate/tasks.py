from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from celery import Celery
from .facebook import updateFacebook

logger = get_task_logger(__name__)


@periodic_task(
    run_every=(crontab(minute='*/1')),
    name="update_facebook",
    ignore_result=True
)
def update_facebook():
	logger.info("Facebook test")
	return updateFacebook()
