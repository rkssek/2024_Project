const axios = require('axios');

module.exports = {
    name: '책',
    description: '알라딘 추천 도서 목록을 가져옵니다.',
    async run(client, message, args) {
        const apiKey = 'book API';
        const apiUrl = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${apiKey}&QueryType=BestSeller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

        try {
            const response = await axios.get(apiUrl);
            const books = response.data.item;

            if (books && books.length > 0) {
                let replyMessage = '**추천 도서 목록**\n\n';
                books.forEach((book, index) => {
                    replyMessage += `${index + 1}. **${book.title}** - ${book.author}\n`;
                });
                message.channel.send(replyMessage);
            } else {
                message.channel.send('추천 도서를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            message.channel.send('도서 정보를 가져오는 중 오류가 발생했습니다.');
        }
    }
};
