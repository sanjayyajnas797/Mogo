const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'DESKTOP-QHSU4JN',
  database: 'SANJAY',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true, // ✅ Windows Authentication
  },
};

const pool = new sql.ConnectionPool(config);
let poolConnect = null;

const connect = async () => {
  try {
    if (!poolConnect) {
      poolConnect = pool.connect();
      await poolConnect;
      console.log('✅ Connected to SQL Server using Windows Authentication');
    }
  } catch (err) {
    console.error('❌ SQL Server connection error:', err);
  }
};

module.exports = { sql, pool, connect, poolConnect };
