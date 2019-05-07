export enum API {
  // BASE_URL = 'https://memastick-back.herokuapp.com',
  // DOMAIN_URL = 'https://www.memastick.ru',
  DOMAIN_URL = 'http://localhost:4200',
  BASE_URL = 'http://localhost:8080',
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
  MEMES_IMG = '/memes/img',
  MEMES_PAGE = '/memes/page',
  MEMES_PAGES = '/memes/pages',
  MEME_LIKES_TRIGGER = '/meme-likes/trigger',
  MEME_LIKES_CHROMOSOME = '/meme-likes/chromosome',
  TOKENS_WALLETS_MEMETICK = '/token-wallets/memetick',
  TOKENS_WALLETS_HAVE = '/token-wallets/have',
  EVOLVE_MEME = '/evolve-memes/meme',
  ALLOWANCE_TAKE = '/token-allowance/take',
  ALLOWANCE_HAVE = '/token-allowance/have',
  INVENTORY_CELL = '/memetick-inventories/cell',
  INVENTORY_ALL = '/memetick-inventories/all',
  TOKEN_ACCEPT = '/token-accept',
  NOTIFY_PUSH_REGISTER = '/notify/push/register',
  NOTIFY_WEB_REGISTER = '/notify/web/register',
  NOTIFY_BELL_READ = '/notify/bell/read',
  NOTIFY_BELL_CLEAR = '/notify/bell/clear',
  NOTIFY_BELL_MARK = '/notify/bell/mark'
}
