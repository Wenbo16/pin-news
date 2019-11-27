from news_api_client import NewsApiClient

def test_basic():
	client = NewsApiClient(api_key='6e402bf74e5e4376b4d991ce169d1ed3')

	news = client.get_top_headlines()
	assert len(news) > 0

	news = client.get_top_headlines(sources='bbc-news')
	print(news)
	assert len(news) > 0

	print ("test_basic passed!")

if __name__ == "__main__":
	test_basic()