import React from 'react';
import { LineChart as ReChartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
         ResponsiveContainer, BarChart as ReChartsBarChart, Bar } from 'recharts';
import { ChartType } from '../types/akf';

interface MetricsChartProps {
  data: Array<{
    month: string;
    efficiency: number;
    compliance: number;
    risk: number;
  }>;
  type?: ChartType;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data, type = 'line' }) => {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'line' ? (
          <ReChartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" />
            <Line type="monotone" dataKey="compliance" stroke="#06b6d4" />
            <Line type="monotone" dataKey="risk" stroke="#f43f5e" />
          </ReChartsLineChart>
        ) : (
          <ReChartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="efficiency" fill="#8b5cf6" />
            <Bar dataKey="compliance" fill="#06b6d4" />
            <Bar dataKey="risk" fill="#f43f5e" />
          </ReChartsBarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};