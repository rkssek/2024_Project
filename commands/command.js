module.exports = {
    name: '커맨드',  
    run(client, message, args) {
      message.channel.send('커맨드 목록');
      message.channel.send('!금지어 추가 : 금지어를 추가합니다.');
      message.channel.send('!금지어 목록 : 금지어 목록을 보여줍니다.');
      message.channel.send('!금지어 삭제 : 금지어를 삭제합니다.');
      message.channel.send('!EPL : 현재 EPL 상위 10팀을 보여줍니다.');
      message.channel.send('!세리에 : 현재 세리에 상위 10팀을 보여줍니다.');
      message.channel.send('!리그앙 : 현재 리그앙 상위 10팀을 보여줍니다.');
      message.channel.send('!분데스리가 : 현재 분데스리가 상위 10팀을 보여줍니다.');
      message.channel.send('!라리가 : 현재 라리가 상위 10팀을 보여줍니다.');
      message.channel.send('!날씨 : 현재 군포시 날씨를 보여줍니다.');
      message.channel.send('!책 : 현재 베스트셀러 상위 10권을 보여줍니다.');
    }
  };
  