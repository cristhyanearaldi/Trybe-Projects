import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    try:
        header = {"user-agent": "Fake user-agent"}
        response = requests.get(url, timeout=3, headers=header)
        response.raise_for_status()
        time.sleep(1)
    except (requests.HTTPError, requests.Timeout):
        return None
    else:
        return response.text


# Requisito 2
def scrape_novidades(html_content):
    selector = Selector(html_content)
    posts_links = selector.css(".entry-title a::attr(href)").getall()
    return posts_links


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(html_content)
    next_page_link = selector.css(".nav-links .next::attr(href)").get()
    return next_page_link


# Requisito 4
def scrape_noticia(html_content):
    selector = Selector(html_content)
    url = selector.css("link[rel=canonical]::attr(href)").get()
    title = selector.css(".entry-header-inner h1::text").get()
    timestamp = selector.css(".post-meta .meta-date::text").get()
    writer = selector.css(".meta-author a::text").get()
    comments_count = selector.css("#comments > h5::text").re_first(r"\d") or 0
    summary = selector.xpath("string(//div[@class='entry-content']/p)").get()
    tags = selector.css(".post-tags li a::text").getall()
    category = selector.css(".category-style > span.label::text").get()
    return {
        "url": url,
        "title": title,
        "timestamp": timestamp,
        "writer": writer,
        "comments_count": comments_count,
        "summary": summary,
        "tags": tags,
        "category": category,
    }


# Requisito 5
def get_tech_news(amount):
    url_base = "https://blog.betrybe.com"
    tech_news = []
    while (len(tech_news) < amount):
        html_content = fetch(url_base)
        posts_links = scrape_novidades(html_content)
        tech_news.extend(scrape_noticia(fetch(link)) for link in posts_links)
        url_base = scrape_next_page_link(html_content)
    create_news(tech_news[:amount])
    return tech_news[:amount]
