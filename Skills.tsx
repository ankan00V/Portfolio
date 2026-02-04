import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { RESUME_DATA } from '../data';

const data = [
  { name: 'Python', value: 90 },
  { name: 'C++', value: 85 },
  { name: 'SQL', value: 80 },
  { name: 'ML/AI', value: 75 },
  { name: 'Data Viz', value: 85 },
  { name: 'React', value: 70 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Technical <span className="text-purple-500">Arsenal</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Core Competencies</h3>
            {Object.entries(RESUME_DATA.skills).map(([category, skills]) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/5 rounded-xl p-6 hover:border-purple-500/30 transition-colors"
              >
                <h4 className="text-purple-400 font-medium mb-3 capitalize">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 rounded-md bg-white/5 text-sm text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="h-[400px] bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col overflow-hidden">
            <h3 className="text-xl font-semibold mb-6 text-center">Proficiency Metrics</h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={data} 
                  layout="vertical" 
                  margin={{ left: 0, right: 30, top: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{ fill: '#9ca3af', fontSize: 14 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]} 
                    barSize={24} 
                    background={{ fill: 'rgba(255,255,255,0.02)', radius: [0, 4, 4, 0] }}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};