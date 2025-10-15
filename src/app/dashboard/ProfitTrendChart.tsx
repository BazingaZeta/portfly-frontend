'use client';

import { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Function to generate mock portfolio trend data
const generateTrendData = () => {
  const data = [];
  let value = 10000; // Starting portfolio value
  const today = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Simulate market fluctuation
    const fluctuation = (Math.random() - 0.48) * (value * 0.02);
    value += fluctuation;

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#2d3748', padding: '10px', border: '1px solid #4a5568', borderRadius: '6px' }}>
        <p style={{ color: '#cbd5e0' }}>{`Date: ${label}`}</p>
        <p style={{ color: '#a0aec0' }}>{`Portfolio Value: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function ProfitTrendChart() {
  const data = useMemo(() => generateTrendData(), []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
        <YAxis 
          stroke="#9ca3af" 
          fontSize={12} 
          tickFormatter={(value) => `$${(value / 1000)}k`} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#818cf8" 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
