
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  Plus, 
  ScanLine, 
  Utensils, 
  Award, 
  Droplet, 
  Flame, 
  Zap, 
  Trophy,
  Star 
} from 'lucide-react';
import NutritionScene from '@/components/NutritionScene';
import UserStreak from '@/components/UserStreak';

// Define meal item type
interface MealItem {
  name: string;
  calories: number;
  time: string;
}

// Define user data type
interface UserData {
  name: string;
  dailyCalorieGoal: number;
  currentCalories: number;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  streak: {
    current: number;
    longestEver: number;
    points: number;
    level: number;
  };
  badges: string[];
  dailyMissions: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    reward: number;
  }[];
}

// Mock data with proper typing
const mockUser: UserData = {
  name: "John Doe",
  dailyCalorieGoal: 2400,
  currentCalories: 1350,
  breakfast: [{ name: "Oatmeal with Berries", calories: 320, time: "08:30 AM" }],
  lunch: [{ name: "Grilled Chicken Salad", calories: 450, time: "12:45 PM" }],
  dinner: [{ name: "Salmon with Vegetables", calories: 580, time: "07:15 PM" }],
  snacks: [],
  macros: {
    carbs: 150, // grams
    protein: 110, // grams
    fat: 50, // grams
  },
  streak: {
    current: 7,
    longestEver: 14,
    points: 1250,
    level: 4
  },
  badges: ["Early Bird", "Protein Hero", "Hydration Master"],
  dailyMissions: [
    {
      id: 1,
      title: "Try a new vegetable",
      description: "Add a vegetable you haven't eaten this week",
      completed: false,
      reward: 50
    },
    {
      id: 2,
      title: "Protein Goal",
      description: "Reach 100g of protein today",
      completed: true,
      reward: 75
    },
    {
      id: 3,
      title: "Hydration Check",
      description: "Log at least 8 cups of water",
      completed: false,
      reward: 30
    }
  ]
};

const COLORS = ['#FFA500', '#98FF98', '#FF8042'];

const Track = () => {
  const [mealInput, setMealInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const caloriesRemaining = mockUser.dailyCalorieGoal - mockUser.currentCalories;
  const calorieProgress = (mockUser.currentCalories / mockUser.dailyCalorieGoal) * 100;

  // Calculate macronutrient percentages
  const macroData = [
    { name: 'Carbs', value: mockUser.macros.carbs * 4 }, // 4 calories per gram
    { name: 'Protein', value: mockUser.macros.protein * 4 }, // 4 calories per gram
    { name: 'Fat', value: mockUser.macros.fat * 9 }, // 9 calories per gram
  ];

  const handleAddMeal = async () => {
    if (!mealInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter what you ate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would call an AI API to process the text
      // For now, we'll simulate a response
      
      // Hardcoded meal recognition for demonstration
      let recognizedMeal = {
        name: mealInput,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
      };

      if (mealInput.toLowerCase().includes("rice")) {
        recognizedMeal.calories = 200;
        recognizedMeal.carbs = 45;
        recognizedMeal.protein = 4;
        recognizedMeal.fat = 0.5;
      } else if (mealInput.toLowerCase().includes("chicken")) {
        recognizedMeal.calories = 330;
        recognizedMeal.carbs = 5;
        recognizedMeal.protein = 40;
        recognizedMeal.fat = 15;
      } else if (mealInput.toLowerCase().includes("salad")) {
        recognizedMeal.calories = 120;
        recognizedMeal.carbs = 10;
        recognizedMeal.protein = 3;
        recognizedMeal.fat = 7;
      } else {
        // Random calories for unrecognized foods
        recognizedMeal.calories = Math.floor(Math.random() * 300) + 100;
        recognizedMeal.carbs = Math.floor(Math.random() * 30) + 5;
        recognizedMeal.protein = Math.floor(Math.random() * 20) + 2;
        recognizedMeal.fat = Math.floor(Math.random() * 15) + 1;
      }

      // Simulate delay for API call
      setTimeout(() => {
        toast({
          title: "Meal added",
          description: `Added ${recognizedMeal.name} (${recognizedMeal.calories} calories)`,
        });
        
        // Check if a mission was completed
        const missionCompleted = mockUser.dailyMissions.find(m => 
          !m.completed && 
          ((m.title.includes("Protein") && recognizedMeal.protein > 20) ||
           (m.title.includes("vegetable") && mealInput.toLowerCase().includes("vegetable")))
        );
        
        if (missionCompleted) {
          setTimeout(() => {
            toast({
              title: "Mission Complete! 🎉",
              description: `You completed: ${missionCompleted.title} (+${missionCompleted.reward} points)`,
            });
          }, 500);
        }
        
        setMealInput('');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your meal. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleCompleteMission = (missionId: number) => {
    toast({
      title: "Mission Completed! 🎉",
      description: `You earned ${mockUser.dailyMissions.find(m => m.id === missionId)?.reward} points!`,
    });
  };

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Today's Nutrition</h1>
          <p className="text-gray-600">Track your meals and nutrition for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        {/* User Streak & Level Component */}
        <UserStreak streak={mockUser.streak} badges={mockUser.badges} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader>
                <CardTitle>Calorie Progress</CardTitle>
                <CardDescription>
                  Your daily goal is {mockUser.dailyCalorieGoal} calories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      {mockUser.currentCalories} consumed
                    </span>
                    <span className="text-sm font-medium">
                      {caloriesRemaining > 0 ? `${caloriesRemaining} remaining` : 'Goal reached!'}
                    </span>
                  </div>
                  <Progress value={calorieProgress} className="h-2 bg-orange-100">
                    <div className="bg-gradient-gold h-full" />
                  </Progress>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="text-2xl font-bold text-healthoria-gold">{mockUser.macros.carbs}g</div>
                      <div className="text-xs text-gray-500">Carbs</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="text-2xl font-bold text-healthoria-gold">{mockUser.macros.protein}g</div>
                      <div className="text-xs text-gray-500">Protein</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="text-2xl font-bold text-healthoria-gold">{mockUser.macros.fat}g</div>
                      <div className="text-xs text-gray-500">Fat</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader>
                <CardTitle>Macronutrients</CardTitle>
                <CardDescription>
                  Distribution of your calories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 3D Nutrition Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Nutrition Visualization</CardTitle>
              <CardDescription>Explore your diet in 3D</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-64">
                <NutritionScene />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daily Missions</CardTitle>
                <CardDescription>Complete tasks to earn points and rewards</CardDescription>
              </div>
              <Star className="text-yellow-400 h-6 w-6" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mockUser.dailyMissions.map((mission) => (
                  <li key={mission.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-3">
                      {mission.title.includes("Protein") ? (
                        <Flame className="text-red-500 h-5 w-5" />
                      ) : mission.title.includes("Hydration") ? (
                        <Droplet className="text-blue-500 h-5 w-5" />
                      ) : (
                        <Zap className="text-green-500 h-5 w-5" />
                      )}
                      <div>
                        <p className="font-medium">{mission.title}</p>
                        <p className="text-xs text-gray-500">{mission.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-healthoria-gold">+{mission.reward}</span>
                      <Button 
                        size="sm" 
                        variant={mission.completed ? "outline" : "default"} 
                        className={mission.completed ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gradient-gold hover:opacity-90"}
                        disabled={mission.completed}
                        onClick={() => handleCompleteMission(mission.id)}
                      >
                        {mission.completed ? "Complete" : "Complete"}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="mb-6 bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
            <CardHeader>
              <CardTitle>Add a Meal</CardTitle>
              <CardDescription>
                Tell us what you ate and we'll calculate the nutrition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  placeholder="E.g. 1 bowl of rice with chicken curry and vegetables"
                  value={mealInput}
                  onChange={(e) => setMealInput(e.target.value)}
                  rows={3}
                  className="resize-none border-orange-200 focus:border-healthoria-gold focus:ring-healthoria-gold"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAddMeal} 
                    disabled={isLoading}
                    className="flex-1 bg-gradient-gold hover:opacity-90 transition-opacity shadow-md"
                  >
                    <Utensils className="mr-2 h-4 w-4" />
                    {isLoading ? "Processing..." : "Add Meal"}
                  </Button>
                  <Button variant="outline" className="flex-1 border-orange-200 text-healthoria-gold hover:bg-orange-50">
                    <ScanLine className="mr-2 h-4 w-4" />
                    Scan Barcode
                  </Button>
                  <Button variant="outline" className="flex-1 border-orange-200 text-healthoria-gold hover:bg-orange-50">
                    <Plus className="mr-2 h-4 w-4" />
                    Quick Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Meals for the day */}
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealTime) => {
            const mealKey = mealTime.toLowerCase() as keyof typeof mockUser;
            // Type assertion to ensure TypeScript knows we're dealing with an array of MealItem
            const meals = mockUser[mealKey] as MealItem[];
            
            return (
              <Card key={mealTime} className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
                <CardHeader>
                  <CardTitle>{mealTime}</CardTitle>
                  <CardDescription>
                    {meals.length ? `${meals.reduce((sum, meal) => sum + meal.calories, 0)} calories` : 'No items yet'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {meals.length ? (
                      <ul className="space-y-2">
                        {meals.map((meal, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div>
                              <p className="font-medium">{meal.name}</p>
                              <p className="text-xs text-gray-500">{meal.time}</p>
                            </div>
                            <div className="text-healthoria-gold font-medium">{meal.calories} cal</div>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <motion.div 
                        className="py-8 text-center text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>No {mealTime.toLowerCase()} items logged yet</p>
                        <Button 
                          variant="link" 
                          className="mt-2 text-healthoria-gold"
                          onClick={() => setMealInput(`I had for ${mealTime.toLowerCase()}:`)}
                        >
                          Add {mealTime}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Track;
