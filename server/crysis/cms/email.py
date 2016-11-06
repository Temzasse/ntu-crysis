import requests


class Mail:
    url = "https://api.mailgun.net/v3/sandboxbaf24b0c7e0d46d4a69d7fb15c16a99c.mailgun.org/messages"
    sender = "Mailgun Sandbox <postmaster@sandboxbaf24b0c7e0d46d4a69d7fb15c16a99c.mailgun.org>"
    apiKey = "key-49604cbf02ae2c0f4665354a1110f361"

    def send_mail(self, to_name, to_address, subject, text, html):
        requests.post(
            self.url,
            auth=("api", self.apiKey),
            data={
                "from": self.sender,
                "to": to_name + " <" + to_address + ">",
                "subject": subject,
                "text": text,
                "html": html}
        )
