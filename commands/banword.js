const fs = require('fs');
const path = require('path');

const bannedWordsPath = path.join(__dirname, '../bannedWords.json');

if (!fs.existsSync(bannedWordsPath)) {
  fs.writeFileSync(bannedWordsPath, JSON.stringify([]));
}

module.exports = {
  name: '금지어',
  run: (client, message, args) => {
    if (args.length === 0) {
      return message.channel.send('사용법: !금지어 추가 <금지어>, !금지어 삭제 <금지어> 또는 !금지어 목록');
    }

    const action = args.shift().toLowerCase();

    const bannedWords = JSON.parse(fs.readFileSync(bannedWordsPath, 'utf8'));

    if (action === '추가') {
      const wordToAdd = args.join(' ');
      if (!wordToAdd) {
        return message.channel.send('추가할 금지어를 입력해주세요.');
      }
      if (bannedWords.includes(wordToAdd)) {
        return message.channel.send('이미 추가된 금지어입니다.');
      }
      try {
        bannedWords.push(wordToAdd);
        fs.writeFileSync(bannedWordsPath, JSON.stringify(bannedWords));
        message.channel.send(`금지어 “${wordToAdd}”가 추가되었습니다.`);
      } catch (error) {
        console.error('파일 쓰기 중 오류가 발생했습니다:', error);
        return message.channel.send('금지어 목록을 업데이트하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } else if (action === '삭제') {
      const wordToRemove = args.join(' ');
      if (!wordToRemove) {
        return message.channel.send('삭제할 금지어를 입력해주세요.');
      }
      const index = bannedWords.indexOf(wordToRemove);
      if (index === -1) {
        return message.channel.send('해당 금지어는 목록에 없습니다.');
      }
      try {
        bannedWords.splice(index, 1);
        fs.writeFileSync(bannedWordsPath, JSON.stringify(bannedWords));
        message.channel.send(`금지어 “${wordToRemove}”가 삭제되었습니다.`);
      } catch (error) {
        console.error('파일 쓰기 중 오류가 발생했습니다:', error);
        return message.channel.send('금지어 목록을 업데이트하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } else if (action === '목록') {
      if (bannedWords.length === 0) {
        return message.channel.send('등록된 금지어가 없습니다.');
      }
      message.channel.send(`현재 금지어 목록: ${bannedWords.join(', ')}`);
    } else {
      message.channel.send('사용법: !금지어 추가 <금지어>, !금지어 삭제 <금지어> 또는 !금지어 목록');
    }
  },
};

module.exports.listenForBannedWords = (client) => {
  client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const bannedWords = JSON.parse(fs.readFileSync(bannedWordsPath, 'utf8'));
    const containsBannedWord = bannedWords.some(word => message.content.includes(word));

    if (containsBannedWord) {
      message.delete().then(() => {
        message.channel.send(`${message.author}, 금지어를 사용하셨기 때문에 메시지가 삭제되었습니다.`).then(msg => {
          setTimeout(() => msg.delete(), 5000);
        });
      }).catch(err => console.error('메시지 삭제 중 오류가 발생했습니다: ', err));
    }
  });
};