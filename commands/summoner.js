const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    name: '롤',
    description: 'fow.kr에서 롤 소환사 정보를 검색합니다.',
    async run(client, message, args) {
        if (!args.length) {
            return message.channel.send('소환사 이름을 입력해주세요.');
        }

        const summonerName = encodeURIComponent(args.join(' '));
        const url = `https://fow.lol/find/kr/${summonerName}`;

        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);

            const name = $('#profile-container > div.profile > div:nth-child(2) > span.username').text().trim();
            const tier = $('#content-container > div > div > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > span').first().text().trim();
            const winRate = $('#content-container > div > div > div.game_overwrite > div.game_summary > div.game_summary_all_winrate > span.summary_common_winrate').text().trim();

            if (name) {
                message.channel.send(
                    `🔍 **${name}**님의 전적\n` +
                    `티어: ${tier}\n` +
                    `승률: ${winRate}`
                );
            } else {
                message.channel.send('소환사 정보를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('fow.kr에서 정보를 가져오는 중 오류 발생:', error);
            message.channel.send('소환사 정보를 가져오는 중 오류가 발생했습니다.');
        }
    }
};
