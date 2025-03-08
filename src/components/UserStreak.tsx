
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Award, Flame, Star } from 'lucide-react';

interface UserStreakProps {
  streak: {
    current: number;
    longestEver: number;
    points: number;
    level: number;
  };
  badges: string[];
}

const UserStreak = ({ streak, badges }: UserStreakProps) => {
  const levelProgress = (streak.points % 1000) / 1000; // Assume 1000 points per level
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-4 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Level {streak.level}</h3>
                  <div className="text-sm opacity-90">
                    {streak.points} total points
                  </div>
                  <div className="w-32 h-2 bg-white/30 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full" 
                      style={{ width: `${levelProgress * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center">
                  <Flame className="w-5 h-5 text-yellow-300 mr-1" />
                  <span className="text-2xl font-bold">{streak.current}</span>
                </div>
                <div className="text-xs opacity-90">Day Streak</div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">{streak.longestEver}</div>
                <div className="text-xs opacity-90">Longest Streak</div>
              </div>
              
              <div className="hidden md:block">
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Award className="w-4 h-4 mr-1 text-yellow-300" />
                      <span className="text-xs font-medium">{badge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 md:hidden">
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center bg-orange-100 text-orange-700 rounded-full px-3 py-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-4 h-4 mr-1 text-orange-500" />
                  <span className="text-xs font-medium">{badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserStreak;
