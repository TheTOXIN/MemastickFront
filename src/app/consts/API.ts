export enum API {
  // BASE_URL = 'https://memastick-back.herokuapp.com',
  BASE_URL = 'http://192.168.10.54:8080',
  DOMAIN_URL = 'https://www.memastick.ru',
  OAUTH_TOKEN = '/oauth/token',
  HELLO = '/hello',
  HOME = '/home',
  INVITE_REGISTRATION = '/invite/registration',
  REGISTRATION = '/registration',
  PASSWORD_RESET_TAKE = '/password-reset/take',
  PASSWORD_RESET_SEND = '/password-reset/send',
  MEMETICK_VIEW_ME = '/memeticks/view/me',
  MEMETICK_VIEW = '/memeticks/view',
  STATS_MEMETICK = '/statistics/memetick',
  STATS_GLOBAL = '/statistics/global',
  MEMETICK_AVATAR_DOWNLOAD = '/memetick-avatars/download',
  MEMETICK_AVATAR_UPLOAD = '/memetick-avatars/upload',
  MEMETICK_NICK_CHANE = '/memeticks/nick/change',
  MEMETICK_RATING = '/memeticks/rating',
  MEMES_CREATE = '/memes/create',
  MEMES_PAGES_FILTER = '/memes/pages/filter',
  MEMES_READ = '/memes/read',
  MEME_LIKES_TRIGGER = '/meme-likes/trigger',
  MEME_LIKES_CHROMOSOME = '/meme-likes/chromosome',
  TOKENS_WALLETS_MEMETICK = '/token-wallets/memetick',
  TOKENS_WALLETS_HAVE = '/token-wallets/have',
  EVOLVE_MEME = '/evolve-memes/meme',
  EVOLVE_CHANCE_MEME = '/evolve-memes/chance/meme',
  ALLOWANCE_TAKE = '/token-allowance/take',
  ALLOWANCE_HAVE = '/token-allowance/have'
}
