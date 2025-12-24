from datetime import datetime
import telebot

TOKEN = '8343146721:AAGXA3xlCbewBTPXHi6xPBw7qd5U5UtlynQ'
GROUP_ID = '-1003569345200'

message_type = ["MESSAGE", "BUG REPORT", "IDEA"]

bot = telebot.TeleBot(TOKEN)

def time_str(): return datetime.now().strftime("%d.%m.%y-%H:%M:%S")

# /start Handler
@bot.message_handler(commands=['start'])
def send_welcome(message):
    #bot.reply_to(message, f"Привет, {message.from_user.first_name}! Я бот.")
    print(f"[{time_str()}] New user")

# /help Handler
@bot.message_handler(commands=['help'])
def send_help(message):
    bot.send_message(message.chat.id, "/message, /bug, /idea")

# /idea Handler
@bot.message_handler(commands=['idea'])
def handle_idea(message):
    sent_msg = bot.send_message(message.chat.id, 
    """
Please, enter your idea below.
    
Пожалуйста, оставьте свою идею ниже.
    
Төменде өз идеяңызды қалдыруыңызды сұраймыз.
    """)
    bot.register_next_step_handler(sent_msg, get_user_text, 2)
    
# /message Handler
@bot.message_handler(commands=['message'])
def handle_message(message):
    sent_msg = bot.send_message(message.chat.id, 
    """
Please, enter your message below.
    
Пожалуйста, оставьте свое сообщение ниже.
    
Төменде өз хабарламаңызды қалдыруыңызды сұраймыз. 
    """) # 47 строка
    bot.register_next_step_handler(sent_msg, get_user_text, 0)
    
    # /bug Handler
@bot.message_handler(commands=['bug'])
def handle_bug(message):
    sent_msg = bot.send_message(message.chat.id, 
    """
Please, describe your bug report in detail.
    
Пожалуйста, опишите проблему подробно.
    
Мәселені егжей-тегжейлі сипаттап жазуыңызды сұраймыз.
    """)
    bot.register_next_step_handler(sent_msg, get_user_text, 1)

def get_user_text(message, m_type):
    text = f"<b>[{message_type[m_type]}]</b>\n'{message.text}'"
    try:
        bot.send_message(GROUP_ID, text, parse_mode='HTML')
        bot.send_message(message.chat.id, 
            """
Thank you for your feedback!
    
Спасибо за вашу обратную связь!
            
Кері байланыс бергеніңіз үшін рақмет!
            """)
    except Exception as e:
        bot.send_message(message.chat.id, 
            f"""
Sorry, something went wrong.
    
Извиние, что-то пошло не так.
    
Кешіріңіз, бірдеңе дұрыс болмады

ERR: {e}
            """)

if __name__ == '__main__':
    print(f"[{time_str()}] Bot started.")
    bot.polling(none_stop=True)

