from tech_news.database import search_news
import re
from datetime import datetime

MONTHS = {
    "01": "janeiro",
    "02": "fevereiro",
    "03": "março",
    "04": "abril",
    "05": "maio",
    "06": "junho",
    "07": "julho",
    "08": "agosto",
    "09": "setembro",
    "10": "outubro",
    "11": "novembro",
    "12": "dezembro",
}


# Requisito 6
def search_by_title(title):
    news_list = []
    case_insensitive = re.compile(title, re.IGNORECASE)
    tech_news = search_news({"title": case_insensitive})
    for news in tech_news:
        news_list.append((news["title"], news["url"]))
    return news_list


# Requisito 7
def search_by_date(date):
    news_list = []
    year, month, day = date.split("-")
    try:
        datetime.fromisoformat(date).strftime("%-d de %B de %Y")
    except ValueError:
        raise ValueError("Data inválida")

    format_date = f"{int(day)} de {MONTHS[month]} de {year}"
    tech_news = search_news({"timestamp": format_date})
    for news in tech_news:
        news_list.append((news["title"], news["url"]))
    return news_list


# Requisito 8
def search_by_tag(tag):
    news_list = []
    case_insensitive = re.compile(tag, re.IGNORECASE)
    tech_news = search_news({"tags": case_insensitive})
    for news in tech_news:
        news_list.append((news["title"], news["url"]))
    return news_list


# Requisito 9
def search_by_category(category):
    news_list = []
    case_insensitive = re.compile(category, re.IGNORECASE)
    tech_news = search_news({"category": case_insensitive})
    for news in tech_news:
        news_list.append((news["title"], news["url"]))
    return news_list
