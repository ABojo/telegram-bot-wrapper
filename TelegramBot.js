const axios = require('axios');

const TelegramBot = (() => {
  function createErrorString(err) {
    const errorData = err.response.data;
    const statusCode = errorData.error_code;
    const statusMessage = errorData.description;

    return `The request failed. HTTP Status: ${statusCode} ${statusMessage}`;
  }

  async function sendGetRequest(url) {
    try {
      const response = await axios(url);
      return response.data;
    } catch (err) {
      const errorString = createErrorString(err);
      throw new Error(errorString);
    }
  }

  return class {
    constructor(botKey) {
      if (!botKey) {
        throw new Error('You must provide your bot key as an argument.');
      }

      this.botKey = botKey;
      this.apiUrl = `https://api.telegram.org/${this.botKey}`;
    }

    async sendMessage(chatId, message) {
      const requestUrl = `${this.apiUrl}/sendMessage?chat_id=${chatId}&text=${message}`;
      return await sendGetRequest(requestUrl);
    }
  };
})();

module.exports = TelegramBot;
