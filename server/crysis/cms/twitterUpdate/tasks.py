from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from celery import Celery
from .twitter import updateTwitter

logger = get_task_logger(__name__)


@periodic_task(
    run_every=(crontab(minute='*/1')),
    name="update_twitter",
    ignore_result=True
)
def update_twitter():
	logger.info("Tweeted test")
	return updateTwitter()
