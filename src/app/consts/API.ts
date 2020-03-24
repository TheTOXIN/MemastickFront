export enum API {
  OAUTH_TOKEN = '/oauth/token',
  HELLO = '/hello',
  HOME = '/home',
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

  RANK_TYPES = '/memetick-rank/types',
  RANK_TOKENS = '/memetick-rank/tokens',

  MEMES_CREATE = '/memes/create',
  MEMES_IMG = '/memes/img',
  MEMES_PAGE = '/memes/page',
  MEMES_PAGES = '/memes/pages',
  MEMES_READ = '/memes/read',
  MEME_LIKES_TRIGGER = '/meme-likes/trigger',
  MEME_LIKES_CHROMOSOME = '/meme-likes/chromosome',
  MEME_RESURRECT = '/memes/resurrect',
  MEME_BAN = '/memes/ban',

  TOKENS_WALLETS_HAVE = '/token-wallets/have',
  EVOLVE_MEME = '/evolve-memes/meme',
  EVOLVE_MEME_CHANCE = '/evolve-memes/meme/chance',

  ALLOWANCE_TAKE = '/token-allowance/take',
  ALLOWANCE_MAKE = '/token-allowance/make',
  ALLOWANCE_HAVE = '/token-allowance/have',

  INVENTORY_CELL_STATE = '/memetick-inventories/cell/state',
  INVENTORY_CELL_HAVE = '/memetick-inventories/cell/have',
  INVENTORY_ALL = '/memetick-inventories/all',
  PICKAXE = '/pickaxe',

  TOKEN_ACCEPT = '/token-accept',
  TOKENS_WALLETS_MEMETICK = '/token-wallets/memetick',

  NOTIFY_PUSH_REGISTER = '/notify/push/register',
  NOTIFY_WEB_REGISTER = '/notify/web/register',
  NOTIFY_BELL_READ = '/notify/bell/read',
  NOTIFY_BELL_CLEAR = '/notify/bell/clear',
  NOTIFY_BELL_MARK = '/notify/bell/mark',
  NOTIFY_COUNT = '/notify-count',

  SEETING_ME = '/setting-users/me',
  SEETING_PUSH = '/setting-users/push',
  SEETING_FOLLOW = '/setting-followers/follow',
  SEETING_FOLLOW_MY = '/setting-followers/my',

  SECURITY_LOGOUT = '/security/logout',
  USER_ME = '/user/me',
  USER_DATA = '/user/data',

  ADMIN_TRANSALTE = '/translator/admin',
  USER_TRANSLATE = '/translator/user',

  INVITE_READ = '/invites',
  INVITE_SEND = '/invite/send',
  INVITE_REGISTRATION = '/invite/registration',

  MEME_COINS_HITORY = '/meme-coins/history',
  BLOCK_COINS_MAKE = '/block-coins/make',
  BLOCK_COINS_MINE = '/block-coins/mine',
  BLOCK_COINS_FLUSH = '/block-coins/flush',
  SHOP_COOKIES = '/shop/cookies',

  MEMOTYPE_COLLECTION = '/memotype-set/collection',
  MEMOTYPE_READ = '/memotype-memetick/read',
  MEMOTYPE_ALL = '/memotype/all',
  MEMOTYPE_BUY = '/memotype-memetick/buy',

  BATTLE_VOTE = '/battle-vote/give',
  BATTLE_REQUEST = '/battle-member/request',
  BATTLE_RESPONSE = '/battle-member/response',
  BATTLE_LIST = '/battle-vote/list',
  BATTLE_VIEW = '/battle/view/',
  BATTLE_PREVIEW = '/battle/preview/',
  BATTLE_HOME = '/battle/home',
  BATTLE_RATING_MY = '/battle-rating/my',
  BATTLE_RATING_MAIN = '/battle-rating/main',

  DONATER_RANDOM_MESSAGE = '/donater-messages/random',
  DONATER_READ_RATING = '/donater-ratings/read',
}
