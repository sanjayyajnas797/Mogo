import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [from, setFrom] = useState('');
  const [data, setData] = useState([]);
  const [overallTotal, setOverallTotal] = useState(0);
  const [adjustValue, setAdjustValue] = useState('');
  const [adjustedTotal, setAdjustedTotal] = useState(0);

  // Fetch data for a single date
  const fetchData = async () => {
    if (!from) return alert('Please select a date');
    try {
      const res = await axios.get(`http://localhost:4000/analog/date?from=${from}`);
      setData(res.data);

      const total = res.data.reduce((sum, row) => {
        return (
          sum +
          (parseFloat(row.A1) || 0) +
          (parseFloat(row.A2) || 0) +
          (parseFloat(row.A3) || 0) +
          (parseFloat(row.A4) || 0)
        );
      }, 0);

      setOverallTotal(total);
      setAdjustedTotal(total);
    } catch (err) {
      console.error(err);
      alert('Error fetching data');
    }
  };

  // Adjust total (always from overallTotal, not adjustedTotal)
  const handleAdjust = (type) => {
    const value = parseFloat(adjustValue);
    if (isNaN(value)) return alert('Enter a valid number');

    let newAdjusted = overallTotal; // always start from overall total

    if (type === '+') newAdjusted = overallTotal + value;
    else if (type === '-') newAdjusted = overallTotal - value;

    setAdjustedTotal(newAdjusted);
    setAdjustValue('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analog Data Viewer</h2>

      {/* Date Filter */}
      <div style={{ marginBottom: '20px' }}>
        Date:{' '}
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <button style={{ marginLeft: '10px' }} onClick={fetchData}>
          Fetch
        </button>
      </div>

      {/* Totals */}
      <div style={{ marginBottom: '20px', width: '350px' }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>Overall Total:</strong>{' '}
          <input
            type="number"
            value={overallTotal}
            readOnly
            style={{ width: '120px', backgroundColor: '#eee' }}
          />
        </div>
        <div>
          <strong>Adjusted Total:</strong>{' '}
          <input
            type="number"
            value={adjustedTotal}
            readOnly
            style={{
              width: '120px',
              backgroundColor: '#f9f9f9',
              marginRight: '5px',
            }}
          />
          <input
            type="number"
            placeholder="Enter number"
            value={adjustValue}
            onChange={(e) => setAdjustValue(e.target.value)}
            style={{ width: '80px', marginRight: '5px' }}
          />
          <button onClick={() => handleAdjust('+')}>+</button>
          <button onClick={() => handleAdjust('-')} style={{ marginLeft: '3px' }}>
            -
          </button>
        </div>
      </div>

      {/* Data Table */}
      <table
        border="1"
        cellPadding="5"
        style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>A1</th>
            <th>A2</th>
            <th>A3</th>
            <th>A4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.DATE1}</td>
              <td>{row.A1}</td>
              <td>{row.A2}</td>
              <td>{row.A3}</td>
              <td>{row.A4}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
