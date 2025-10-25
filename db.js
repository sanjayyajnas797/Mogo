const sql = require('mssql');

const config = {
  user: 'soundu',              // SQL Auth username
  password: 'sias',  // SQL Auth password
  server: 'DESKTOP-QHSU4JN',    // your server name or IP
  database: 'SANJAY',
  options: {
    encrypt: true,                // for cloud deploy
    trustServerCertificate: true, // self-signed cert
  },
};

const pool = new sql.ConnectionPool(config);
let poolConnect = null;

const connect = async () => {
  try {
    if (!poolConnect) {
      poolConnect = pool.connect();
      await poolConnect;
      console.log('✅ Connected to SQL Server using SQL Authentication');
    }
  } catch (err) {
    console.error('❌ SQL Server connection error:', err);
  }
};

module.exports = { sql, pool, connect, poolConnect };
