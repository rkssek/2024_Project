const axios = require('axios');
const cheerio = require('cheerio');
async function getEPLRankings() {
    try {
        const { data } = await axios.get('https://www.espn.com/soccer/standings/_/league/ita.1');
        const $ = cheerio.load(data);

        const teams = [];

        $('tbody tr').each((index, element) => {
            if (index < 10) { 
                let rank = $(element).find('td:nth-child(1)').text().trim(); 
                const teamName = $(element).find('span.hide-mobile').text().trim(); 

                rank = rank.replace(/\D/g, ''); 

                teams.push(`${rank}. ${teamName}`);
            }
        });

        return teams;
    } catch (error) {
        console.error('Error fetching EPL rankings:', error);
        return [];
    }
}

module.exports = {
    name: '세리에',
    description: '현재 세리에A 상위 10위 팀을 보여줍니다.',
    async run(client, message, args) {
        const rankings = await getEPLRankings();
        if (rankings.length > 0) {
            message.channel.send(`현재 세리에A 순위:\n${rankings.join('\n')}`);
        } else {
            message.channel.send('세리에A 순위를 가져오는 데 실패했습니다.');
        }
    },
};
