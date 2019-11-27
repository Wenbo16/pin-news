import requests
import const
from newsapi_auth import NewsApiAuth
from newsapi_exception import NewsAPIException
from utils import is_valid_string, stringify_date_param

NEWS_API_KEY = "6e402bf74e5e4376b4d991ce169d1ed3"
NEWS_API_ENDPOINT = "https://newsapi.org/v2/"
ARTICALS_API = "top-headlines"
DEFAULT_SOURCES = 'bbc-news'
CATEGORY='business'
LANGUAGE='en'
COUNTRY='us'
SORT_BY='top'


class NewsApiClient(object):
	"""The core client object used to fetch data from News API endpoints.
	:param api_key: Your API key, a length-32 UUID string provided for your News API account.
			You must `register <https://newsapi.org/register>`_ for a News API key.
	:type api_key: str
	:param session: An optional :class:`requests.Session` instance from which to execute requests.
			**Note**: If you provide a ``session`` instance, :class:`NewsApiClient` will *not* close the session
			for you.  Remember to call ``session.close()``, or use the session as a context manager, to close
			the socket and free up resources.
	:type session: `requests.Session <https://2.python-requests.org/en/master/user/advanced/#session-objects>`_ or None
	"""

	def __init__(self, api_key, session=None):
		self.auth = NewsApiAuth(api_key=api_key)
		# if session is None:
		# 	self.request_method = requests
		# else:
		# 	self.request_method = session

	def buildUrl(self, end_point=NEWS_API_ENDPOINT, api_name=ARTICALS_API):
		return end_point + api_name

	def get_top_headlines(self, q=None, sources=DEFAULT_SOURCES, language=LANGUAGE, country=None, category=None):
		articles = []
		payload = {
			'apiKey': NEWS_API_KEY,
		}

		# Keyword/Phrase
		if q is not None:
			if is_valid_string(q):
				payload["q"] = q
			else:
				raise TypeError("keyword/phrase q param should be of type str")

		 # Sources
		if (sources is not None) and ((country is not None) or (category is not None)):
			raise ValueError("cannot mix country/category param with sources param.")

		# Sources
		if sources is not None:
			if is_valid_string(sources):
				payload["sources"] = sources
			else:
				raise TypeError("sources param should be of type str")

		# Language
		if language is not None:
			if is_valid_string(language):
				if language in const.languages:
					payload["language"] = language
				else:
					raise ValueError("invalid language")
			else:
					raise TypeError("language param should be of type str")

		# Country
		if country is not None:
			if is_valid_string(country):
				if country in const.countries:
					payload["country"] = country
				else:
					raise ValueError("invalid country")
			else:
				raise TypeError("country param should be of type str")

		# Category
		if category is not None:
			if is_valid_string(category):
				if category in const.categories:
					payload["category"] = category
				else:
					raise ValueError("invalid category")
			else:
				raise TypeError("category param should be of type str")

		# Todo:Check Status of Request
		# response = self.request_method.get(const.TOP_HEADLINES_URL, auth=self.auth, timeout=30, params=payload)

		response = requests.get(self.buildUrl(), params=payload)
		res_json = response.json()

		if (res_json is not None and res_json['status'] == 'ok'):
			articles=res_json['articles']
		else:
			raise NewsAPIException(response.json())
		return articles
