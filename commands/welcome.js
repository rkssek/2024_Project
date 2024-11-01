module.exports = {
    name: 'welcome',

    run() {
        // 빈 메서드 (경고 해결용)
    },

    setup(client) {
        
        const WELCOME_CHANNEL_ID = '1286283429864017974';

        const WELCOME_MESSAGES = [
            `환영합니다, {member}!`,
            `이곳에 오신 것을 환영합니다, {member}.`,
        ];

        // 새 멤버가 추가될 때 이벤트를 설정
        client.on("guildMemberAdd", (member) => {
            WelcomeNewMember(member, client);
        });

        // 새 멤버 환영 메시지를 보내는 함수
        function WelcomeNewMember(member, client) {
            client.channels.fetch(WELCOME_CHANNEL_ID)
                .then(channel => {
                    // 환영 메시지 중 랜덤으로 선택
                    let welcomeMessage = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
                    welcomeMessage = welcomeMessage.replace('{member}', member.user.username);

                    // 멤버가 들어오고 1초 후에 메시지 전송
                    setTimeout(() => {
                        console.log("Welcoming a new member.");
                        channel.send(welcomeMessage);
                    }, 1000);
                })
                .catch(console.error); // 채널을 찾을 수 없을 때 오류 처리
        }
    }
};
