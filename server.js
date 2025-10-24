const { pool, sql, poolConnect } = require('./db');

const getAnalogDataByDate = async (req, res) => {
  try {
    await poolConnect; // ensure pool is ready

    const { from } = req.query;
    if (!from) return res.status(400).json({ message: 'From date is required' });

    const request = pool.request();
    request.input('from', sql.Date, from);

    const result = await request.query(`
      SELECT [id], [DATE1], [TIME1], [A1], [A2], [A3], [A4]
      FROM [SANJAY].[dbo].[IBPS3_ANALOG]
      WHERE CONVERT(date, [DATE1]) = @from
      ORDER BY [TIME1] ASC
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
};


module.exports = { getAnalogDataByDate };
