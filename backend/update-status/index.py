import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2

def send_email(to_email: str, full_name: str, status: str):
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    status_messages = {
        'new': {
            'subject': 'Заявка получена',
            'body': f'Здравствуйте, {full_name}!\n\nВаша заявка на кредит успешно получена и зарегистрирована.\nНаш менеджер скоро свяжется с вами для уточнения деталей.\n\nС уважением,\nООО МФО "Рассрочка без процентов"'
        },
        'processing': {
            'subject': 'Заявка в обработке',
            'body': f'Здравствуйте, {full_name}!\n\nВаша заявка на кредит находится в обработке.\nМы проверяем все данные и скоро дадим ответ.\n\nС уважением,\nООО МФО "Рассрочка без процентов"'
        },
        'approved': {
            'subject': 'Заявка одобрена! 🎉',
            'body': f'Здравствуйте, {full_name}!\n\nПоздравляем! Ваша заявка на кредит одобрена.\nНаш менеджер свяжется с вами для оформления документов.\n\nС уважением,\nООО МФО "Рассрочка без процентов"'
        },
        'rejected': {
            'subject': 'Решение по заявке',
            'body': f'Здравствуйте, {full_name}!\n\nК сожалению, по результатам рассмотрения ваша заявка на кредит отклонена.\nВы можете подать новую заявку через 30 дней.\n\nС уважением,\nООО МФО "Рассрочка без процентов"'
        }
    }
    
    message_data = status_messages.get(status)
    if not message_data:
        return
    
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Subject'] = message_data['subject']
    
    msg.attach(MIMEText(message_data['body'], 'plain', 'utf-8'))
    
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()

def handler(event: dict, context) -> dict:
    '''Обновление статуса заявки на кредит с отправкой email-уведомления'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Method not allowed'})
        }
    
    body = json.loads(event.get('body', '{}'))
    application_id = body.get('id')
    new_status = body.get('status')
    
    if not application_id or not new_status:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Missing id or status'})
        }
    
    allowed_statuses = ['new', 'processing', 'approved', 'rejected']
    if new_status not in allowed_statuses:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Invalid status'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT email, full_name FROM applications WHERE id = %s",
        (application_id,)
    )
    result = cursor.fetchone()
    
    if not result:
        cursor.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Application not found'})
        }
    
    email, full_name = result
    
    cursor.execute(
        "UPDATE applications SET status = %s WHERE id = %s",
        (new_status, application_id)
    )
    conn.commit()
    
    cursor.close()
    conn.close()
    
    email_sent = False
    email_error = None
    
    try:
        send_email(email, full_name, new_status)
        email_sent = True
    except Exception as e:
        email_error = str(e)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True, 
            'email_sent': email_sent,
            'email_error': email_error
        })
    }