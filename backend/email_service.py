import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.office365.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL", "hello@syshub365.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "hello@syshub365.com")


def _build_message(to_email: str, subject: str, html_body: str) -> str:
    msg = MIMEMultipart("alternative")
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(html_body, "html"))
    return msg.as_string()


def send_email(to_email: str, subject: str, html_body: str) -> None:
    if not SMTP_PASSWORD:
        raise ValueError("SMTP_PASSWORD not configured")
    msg_str = _build_message(to_email, subject, html_body)
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.sendmail(SMTP_EMAIL, to_email, msg_str)


def send_contact_notification(name: str, email: str, phone: str, message: str) -> None:
    subject = f"New Contact Form Submission from {name}"
    html = f"""\
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #0a0a0f; padding: 40px;">
  <table align="center" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
    <tr>
      <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">New Contact Submission</h1>
        <p style="color: #60a5fa; font-size: 14px; margin: 0 0 32px 0;">syshub365.com</p>

        <table cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr><td style="padding: 12px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Name</span></td></tr>
          <tr><td style="padding: 0 0 20px 0; color: #ffffff; font-size: 16px;">{name}</td></tr>

          <tr><td style="padding: 12px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Email</span></td></tr>
          <tr><td style="padding: 0 0 20px 0; color: #ffffff; font-size: 16px;"><a href="mailto:{email}" style="color: #60a5fa;">{email}</a></td></tr>

          <tr><td style="padding: 12px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Phone</span></td></tr>
          <tr><td style="padding: 0 0 20px 0; color: #ffffff; font-size: 16px;">{phone}</td></tr>

          <tr><td style="padding: 12px 0;"><span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Message</span></td></tr>
          <tr><td style="padding: 16px 20px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); color: #e2e8f0; font-size: 14px; line-height: 1.6;">{message}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 32px 0;" />
        <p style="color: #475569; font-size: 12px; text-align: center; margin: 0;">Sent via SysHub365 Contact Form</p>
      </td>
    </tr>
  </table>
</body>
</html>"""
    send_email(ADMIN_EMAIL, subject, html)


def send_newsletter_notification(email: str) -> None:
    subject = "New Newsletter Subscription"
    html = f"""\
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #0a0a0f; padding: 40px;">
  <table align="center" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
    <tr>
      <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">New Newsletter Subscriber</h1>
        <p style="color: #60a5fa; font-size: 14px; margin: 0 0 32px 0;">syshub365.com</p>

        <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 8px 0;">Email</p>
        <p style="color: #ffffff; font-size: 16px; margin: 0 0 32px 0;"><a href="mailto:{email}" style="color: #60a5fa;">{email}</a></p>

        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 32px 0;" />
        <p style="color: #475569; font-size: 12px; text-align: center; margin: 0;">Sent via SysHub365 Newsletter Subscription</p>
      </td>
    </tr>
  </table>
</body>
</html>"""
    send_email(ADMIN_EMAIL, subject, html)
