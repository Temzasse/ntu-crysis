from cms.models import Incident
# for html templates
from django.template import Context
import datetime


def getPM_MailContext():
    now = datetime.datetime.now()

    incident_list = Incident.objects.all()

    time_min_before = now - datetime.timedelta(minutes=30)

    incident_ongoing = incident_list.filter(resolved=False)
    incident_resolved = incident_list.filter(resolved=True)

    if incident_ongoing.count() != 0:
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

        incident_ph = incident_list.filter(
            updated_at__lt=now, updated_at__gt=time_min_before)

        incident_ph_ongoing = incident_ph.filter(resolved=False)
        incident_ph_resolved = incident_ph.filter(resolved=True)

        incident_ph_NE = incident_ph.filter(area="NE")
        incident_ph_NW = incident_ph.filter(area="NW")
        incident_ph_SE = incident_ph.filter(area="SE")
        incident_ph_SW = incident_ph.filter(area="SW")

        incident_ph_NE_ongoing = incident_ph_NE.filter(resolved=False)
        incident_ph_NW_ongoing = incident_ph_NW.filter(resolved=False)
        incident_ph_SE_ongoing = incident_ph_SE.filter(resolved=False)
        incident_ph_SW_ongoing = incident_ph_SW.filter(resolved=False)

        incident_ph_NE_resolved = incident_ph_NE.filter(resolved=True)
        incident_ph_NW_resolved = incident_ph_NW.filter(resolved=True)
        incident_ph_SE_resolved = incident_ph_SE.filter(resolved=True)
        incident_ph_SW_resolved = incident_ph_SW.filter(resolved=True)

        data = Context({
            'time_now': now,
            'incident_list': incident_list,
            'incident_ongoing': incident_ongoing,
            'incident_resolved': incident_resolved,


            'incident_ph': incident_ph,
            'incident_ph_ongoing': incident_ph_ongoing,
            'incident_ph_resolved': incident_ph_resolved,


            'incident_ph_NE': incident_ph_NE,
            'incident_ph_NW': incident_ph_NW,
            'incident_ph_SE': incident_ph_SE,
            'incident_ph_SW': incident_ph_SW,

            'incident_ph_NE_resolved': incident_ph_NE_resolved,
            'incident_ph_NW_resolved': incident_ph_NW_resolved,
            'incident_ph_SE_resolved': incident_ph_SE_resolved,
            'incident_ph_SW_resolved': incident_ph_SW_resolved,

            'incident_ph_NE_ongoing': incident_ph_NE_ongoing,
            'incident_ph_NW_ongoing': incident_ph_NW_ongoing,
            'incident_ph_SE_ongoing': incident_ph_SE_ongoing,
            'incident_ph_SW_ongoing': incident_ph_SW_ongoing,

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
        return data
    else:
        return None
