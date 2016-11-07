import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from cms.choice import AREA_CHOICE, TYPE_CHOICE
# from cms import views
# from django.conf import settings


def send_mail_html(recipient_list, sender, subject, d, plain_t, html_t):

    plaintxt_ly = get_template(plain_t)
    html_ly = get_template(html_t)
    text_content = plaintxt_ly.render(d)
    html_content = html_ly.render(d)
    msg = EmailMultiAlternatives(subject, text_content, sender, recipient_list)
    msg.attach_alternative(html_content, "text/html")
    try:
            msg.send()
            print "***(%s) -mail sent" % (
                subject)
    except:
            print "***FAILED TO SEND (%s) -mail" % (
                subject)


def send_mailv4(recipient_list, d):

    plaintxt_ly = get_template('report_to_PM.txt')
    html_ly = get_template('report_to_PM.html')

    now = datetime.datetime.now()
    strtime_now = now.strftime("%Y %b %d,%H:%M:%S")
    subject = "Incident report %s" % strtime_now

    if d:

        text_content = plaintxt_ly.render(d)
        html_content = html_ly.render(d)

        sender = "reportgenerator@crysis.com"

        msg = EmailMultiAlternatives(
            subject, text_content, sender, recipient_list)

        msg.attach_alternative(html_content, "text/html")

        try:
            # msg.send()
            print "***(%s) -mail sent" % (
                subject)
        except:
            print "***FAILED TO SEND (%s) -mail" % (
                subject)

    else:
        print "***Not sending mail to PM --- (No Ongoing incident)\n"


def send_mailv4_to_responseunit(incident, recipient_list):
    plaintxt_ly = get_template('responseunit_email.txt')
    html_ly = get_template('responseunit_email.html')
    subject = "New Incident Assigned"
    created_at_time = incident.created_at.strftime('%d %b %Y, %H%M')
    area = dict(AREA_CHOICE)[incident.area]
    type = dict(TYPE_CHOICE)[incident.type]
    map_url = """
        https://maps.googleapis.com/maps/api/staticmap
        ?center={lat},{lng}
        &zoom=14&size=400x400
        &markers=color:red%7Clabel:S%7C{lat},{lng}""".format(
        lat=(incident.latitude), lng=(incident.longitude)
    )

    d = Context({
        'incident': incident,
        'time': created_at_time,
        'area': area,
        'type': type,
        'map_url': map_url
    })

    text_content = plaintxt_ly.render(d)
    html_content = html_ly.render(d)
    sender = "reportgenerator@crysis.com"

    msg = EmailMultiAlternatives(subject, text_content, sender, recipient_list)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
