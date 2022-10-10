const axios = require('axios');

class TelegramBot {
  constructor(botKey) {
    if (!botKey) {
      throw new Error('You must provide your bot key as an argument.');
    }

    this.botKey = botKey;
    this.apiUrl = `https://api.telegram.org/${this.botKey}`;
  }
}

module.exports = TelegramBot;
