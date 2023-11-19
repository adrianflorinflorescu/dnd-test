const memory = {} as {[key: number]: string}

export function generateRandomString({i}: {i: number}): string {
  if(memory[i]){
    return memory[i]
  }

  const whatIs = ['Github', 'Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'Reddit', 'StackOverflow', 'Google', 'Yahoo', 'Bing', 'DuckDuckGo', 'Baidu', 'Yandex', 'Ask', 'AOL', 'WolframAlpha', 'Quora', 'Pinterest', 'Tumblr', 'Flickr', 'Snapchat', 'TikTok', 'Twitch', 'Vimeo', 'WhatsApp', 'WeChat', 'Telegram', 'Signal', 'Skype', 'Zoom', 'Discord', 'Slack', 'Spotify', 'Netflix', 'Hulu', 'Amazon', 'Ebay', 'Wikipedia', 'IMDB', 'Yelp', 'TripAdvisor', 'Uber', 'Lyft', 'Airbnb', 'Expedia', 'Booking', 'Kayak', 'Trivago', 'Hotels', 'Zillow', 'Trulia', 'Redfin', 'Zoopla', 'Rightmove', 'Craigslist', 'Autotrader', 'Cars', 'CarGurus', 'Carfax', 'Edmunds', 'KBB', 'AutoTempest', 'Carvana', 'TrueCar', 'CarMax', 'Carvana'];
  const attribute = ['awesome', 'cool', 'great', 'amazing', 'fantastic', 'wonderful', 'incredible', 'excellent', 'superb', 'marvelous', 'magnificent', 'brilliant', 'genius', 'outstanding', 'exceptional', 'terrific', 'fabulous', 'phenomenal', 'splendid', 'stunning', 'spectacular', 'remarkable', 'extraordinary', 'mind-blowing', 'mind-boggling', 'jaw-dropping', 'unbelievable', 'astounding', 'stupendous', 'prodigious', 'miraculous', 'staggering', 'breathtaking', 'awe-inspiring', 'formidable', 'majestic', 'grand', 'glorious', 'sublime', 'sumptuous', 'exquisite', 'lovely', 'delightful', 'enjoyable', 'pleasant', 'pleasing', 'satisfying', 'delicious', 'tasty', 'yummy', 'scrumptious', 'delectable', 'appealing', 'charming', 'engaging', 'fascinating', 'interesting', 'enchanting', 'captivating', 'enthralling', 'bewitching', 'alluring', 'gorgeous', 'handsome', 'pretty', 'cute', 'attractive', 'stunning', 'elegant', 'fine', 'refined', 'graceful', 'stylish', 'chic', 'trendy', 'fashionable', 'classy', 'dashing', 'polished', 'sophisticated', 'smart', 'brilliant', 'clever', 'intelligent', 'ingenious', 'shrewd', 'astute', 'wise', 'sensible', 'sagacious', 'sage', 'judicious', 'prudent', 'perceptive', 'percipient', 'penetrating', 'discerning', 'insightful', 'thoughtful', 'aware', 'considerate', 'sensitive', 'empathetic', 'sympathetic', 'compassionate', 'kind', 'thoughtful', 'caring', 'loving', 'warm', 'tender', 'tactful', 'gracious', 'generous', 'hospitable', 'humble', 'modest'];
  const suffix = ['and secure', 'and private', 'and anonymous', 'and with more features for SSL', 'and with more features for TLS', 'and with more features for DNS', 'and with more features for HTTP', 'and with more features for HTTPS', 'and with more features for FTP', 'and with more features for SSH', 'and with more features for SFTP', 'and with more features for SCP', 'version 3', 'version 4', 'version 5', 'version 6', 'version 7', 'version 8', 'version 9', 'version 10', 'version 11', 'version 12', 'version 13', 'version 14', 'version 15', 'version 16', 'version 17', 'version 18', 'version 19', 'version 20', 'Windows Edition', 'Mac Edition', 'Linux Edition', 'Android Edition', 'iOS Edition', 'iPadOS Edition', 'ChromeOS Edition', 'FirefoxOS Edition', 'Windows Phone Edition', 'Blackberry Edition', 'Windows Mobile Edition', 'Symbian Edition', 'Tizen Edition', 'Ubuntu Edition', 'Debian Edition', 'Fedora Edition', 'Red Hat Edition', 'CentOS Edition', 'Mint Edition', 'Arch Edition', 'Gentoo Edition', 'Slackware Edition', 'OpenSUSE Edition', 'ElementaryOS Edition', 'Manjaro Edition', 'Kali Edition', 'Raspbian Edition', 'Android Edition', 'iOS Edition', 'iPadOS Edition', 'ChromeOS Edition', 'FirefoxOS Edition', 'Windows Phone Edition', 'Blackberry Edition', 'Windows Mobile Edition', 'Symbian Edition', 'Tizen Edition', 'Ubuntu Edition', 'Debian Edition', 'Fedora Edition', 'Red Hat Edition', 'CentOS Edition', 'Mint Edition', 'Arch Edition', 'Gentoo Edition', 'Slackware Edition', 'OpenSUSE Edition', 'ElementaryOS Edition', 'Manjaro Edition', 'Kali Edition', 'Raspbian Edition'];

  const randomWhatIs = whatIs[Math.floor(Math.random() * whatIs.length)];
  const randomAttribute = attribute[Math.floor(Math.random() * attribute.length)];
  const randomSuffix = suffix[Math.floor(Math.random() * suffix.length)];

  const phrase = `${randomWhatIs}: ${randomAttribute} ${randomSuffix}.`;

  memory[i] = phrase;
  
  return phrase;
}