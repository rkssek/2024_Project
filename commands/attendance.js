const pool = require('../database');

module.exports = {
    name: '출석',
    description: '오늘의 출석을 확인합니다.',

async run(client, message, args) {
    const userId = message.author.id; 
    const username = message.author.username; 
    const today = new Date().toISOString().slice(0, 10); 

    try {
    const connection = await pool.getConnection();

    
      const [rows] = await connection.query('SELECT * FROM dailyCheck WHERE did = ?', [userId]);

    if (rows.length === 0) {
        
        const insertSql = 'INSERT INTO dailyCheck (did, username, count, date) VALUES (?, ?, ?, ?)';
        await connection.query(insertSql, [userId, username, 1, today]);
        await message.reply(`${username}님의 첫 번째 출석이 확인되었습니다!`);
    } else {
        
        const currentCount = rows[0].count || 0;
        const updateSql = 'UPDATE dailyCheck SET count = ?, date = ? WHERE did = ?';
        await connection.query(updateSql, [currentCount + 1, today, userId]);
        await message.reply(`${username}님의 출석이 업데이트되었습니다! 현재 총 출석 횟수: ${currentCount + 1}`);
    }

    connection.release(); 
    } catch (error) {
    console.error(error);
    await message.reply('출석 체크 중 오류가 발생했습니다.');
    }
},
};
