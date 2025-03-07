
import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for the charts
const weeklyData = [
  { day: 'Mon', calories: 2100, goal: 2400, carbs: 220, protein: 110, fat: 70 },
  { day: 'Tue', calories: 1950, goal: 2400, carbs: 200, protein: 100, fat: 65 },
  { day: 'Wed', calories: 2300, goal: 2400, carbs: 250, protein: 120, fat: 80 },
  { day: 'Thu', calories: 2050, goal: 2400, carbs: 210, protein: 115, fat: 70 },
  { day: 'Fri', calories: 2400, goal: 2400, carbs: 260, protein: 130, fat: 85 },
  { day: 'Sat', calories: 2600, goal: 2400, carbs: 280, protein: 140, fat: 90 },
  { day: 'Sun', calories: 2200, goal: 2400, carbs: 230, protein: 120, fat: 75 },
];

const monthlyData = [
  { week: 'Week 1', calories: 2150, goal: 2400 },
  { week: 'Week 2', calories: 2250, goal: 2400 },
  { week: 'Week 3', calories: 2300, goal: 2400 },
  { week: 'Week 4', calories: 2200, goal: 2400 },
];

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState('week');

  return (
    <DashboardLayout>
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Nutrition Analytics</h1>
        <p className="text-gray-600">Track your progress and analyze your nutrition patterns</p>
      </motion.div>

      <motion.div 
        className="flex flex-col md:flex-row justify-between mb-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="calories" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="macros">Macros</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Nutrition Overview</h2>
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="calories">
              <Card>
                <CardHeader>
                  <CardTitle>Calorie Intake vs. Goal</CardTitle>
                  <CardDescription>
                    Compare your daily calorie intake against your target
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeFrame === 'week' ? weeklyData : monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={timeFrame === 'week' ? 'day' : 'week'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="calories"
                        name="Calories Consumed"
                        stroke="#FFA500"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="goal"
                        name="Daily Goal"
                        stroke="#98FF98"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="macros">
              <Card>
                <CardHeader>
                  <CardTitle>Macronutrient Distribution</CardTitle>
                  <CardDescription>
                    Track your carbs, protein, and fat intake over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="carbs" name="Carbs (g)" fill="#8884d8" />
                      <Bar dataKey="protein" name="Protein (g)" fill="#FFA500" />
                      <Bar dataKey="fat" name="Fat (g)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Calorie Trends</CardTitle>
                  <CardDescription>
                    Analyze your nutrition patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="calories"
                        name="Daily Calories"
                        stroke="#FFA500"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Highlights</CardTitle>
            <CardDescription>
              Key insights from your nutrition data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-healthoria-gold/10 text-healthoria-gold p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Weekly Average</h3>
                  <p className="text-gray-500 text-sm">Your daily average for the week is 2,229 calories.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-healthoria-gold/10 text-healthoria-gold p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Consistency Score</h3>
                  <p className="text-gray-500 text-sm">You've stayed within 10% of your goal 5 out of 7 days.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-healthoria-gold/10 text-healthoria-gold p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Peak Day</h3>
                  <p className="text-gray-500 text-sm">Saturday was your highest calorie intake day (2,600 cal).</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              AI-powered insights based on your patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-[#98FF98]/10 text-[#98FF98] p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Protein Intake</h3>
                  <p className="text-gray-500 text-sm">You're consistently hitting your protein targets. Great job!</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#98FF98]/10 text-[#98FF98] p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Weekend Awareness</h3>
                  <p className="text-gray-500 text-sm">Try to maintain more consistent calorie intake on weekends.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-[#98FF98]/10 text-[#98FF98] p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Progress Trend</h3>
                  <p className="text-gray-500 text-sm">Your weekly average is trending closer to your goal. Keep it up!</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Analytics;
