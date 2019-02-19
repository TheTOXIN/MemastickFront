export enum API {
  BASE_URL = 'https://memastick-back.herokuapp.com',
  OAUTH_TOKEN = '/oauth/token',
  HELLO = '/hello',
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
  MEMES_CREATE = '/memes/create',
  MEMES_CREATE_CHECK = '/memes/create/check',
  MEMES_PAGES_READ = '/memes/pages/read',
  MEMES_READ = '/memes/read',
  MEME_LIKES_TRIGGER = '/meme-likes/trigger',
  MEME_LIKES_CHROMOSOME = '/meme-likes/chromosome',
  TOKENS_WALLETS_MY = '/token-wallets/my',
  TOKENS_WALLETS_HAVE = '/token-wallets/have',
}
