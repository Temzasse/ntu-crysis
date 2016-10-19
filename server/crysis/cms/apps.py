from django.apps import AppConfig


class CmsConfig(AppConfig):
    name = 'cms'

    def ready(self):
        import cms.signals  # noqa
