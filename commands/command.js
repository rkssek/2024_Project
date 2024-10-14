module.exports = {
    name: '커맨드',  
    run(client, message, args) {
      message.channel.send('커맨드 목록');
      message.channel.send('!금지어 추가 : 금지어를 추가합니다.');
      message.channel.send('!금지어 목록 : 금지어 목록을 보여줍니다.');
      message.channel.send('!금지어 삭제 : 금지어를 삭제합니다.');
      message.channel.send('!EPL : 현재 EPL 상위 10팀을 보여줍니다.');
    }
  };
  