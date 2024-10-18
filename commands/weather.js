const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: '날씨',
  run: async (client, message, args) => {
    try {
      // 네이버에서 군포 날씨 검색
      const response = await axios.get('https://search.naver.com/search.naver?query=%EA%B5%B0%ED%8F%AC+%EB%82%A0%EC%94%A8');
      const html = response.data;
      const $ = cheerio.load(html);

      // 기온 가져오기
      const temperatureElement = $('div.weather_graphic > div.temperature_text > strong').text().trim();
      const temperature = temperatureElement ? temperatureElement.substring(2, 9).trim() : '정보 없음';

      // 습도 가져오기
      const humidityElement = $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div > div:nth-child(1) > div.content_wrap > div.open > div:nth-child(1) > div > div.weather_info > div > div._today > div.temperature_info > dl > div:nth-child(2)').text().trim();
      const humidity = humidityElement || '정보 없음';

      // 풍향 가져오기
      const windDirectionElement = $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div > div:nth-child(1) > div.content_wrap > div.open > div:nth-child(1) > div > div.weather_info > div > div._today > div.temperature_info > dl > div:nth-child(3)').text().trim();
      const windDirection = windDirectionElement || '정보 없음';

      // 강수 확률 가져오기
      const precipitationMorningElement = $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div > div.api_subject_bx._weekly_weather_wrap > div.content_wrap > div > div.inner > div > div.list_box._weekly_weather > ul > li:nth-child(1) > div > div.cell_weather > span:nth-child(1) > span > span').text().trim();
      const precipitationAfternoonElement = $('#main_pack > section.sc_new.cs_weather_new._cs_weather > div > div.api_subject_bx._weekly_weather_wrap > div.content_wrap > div > div.inner > div > div.list_box._weekly_weather > ul > li:nth-child(1) > div > div.cell_weather > span:nth-child(2) > span > span').text().trim();
      const precipitationMorning = precipitationMorningElement || '정보 없음';
      const precipitationAfternoon = precipitationAfternoonElement || '정보 없음';

      // 임베드 메시지 생성
      const weatherEmbed = new EmbedBuilder()
        .setColor(0x00ae86)
        .setTitle('군포 날씨 정보')
        .addFields(
          { name: '기온', value: `현재 ${temperature}℃`, inline: false },
          { name: '습도', value: `현재 ${humidity}`, inline: false },
          { name: '풍향', value: `현재 ${windDirection}`, inline: false },
          { name: '강수 확률', value: `오전: ${precipitationMorning}
오후: ${precipitationAfternoon}`, inline: false }
        )
        .setFooter({ text: '네이버 날씨 정보를 기반으로 합니다.' });

      // 디스코드 메시지로 임베드 전송
      message.channel.send({ embeds: [weatherEmbed] });
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류가 발생했습니다:', error);
      message.channel.send('날씨 정보를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  },
};