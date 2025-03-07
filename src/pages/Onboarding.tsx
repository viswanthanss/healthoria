
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Form schema
const onboardingSchema = z.object({
  age: z.coerce.number().min(18, { message: "You must be at least 18 years old" }).max(100, { message: "Please enter a valid age" }),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender" }),
  height: z.coerce.number().min(100, { message: "Height must be at least 100 cm" }).max(250, { message: "Height must be less than 250 cm" }),
  weight: z.coerce.number().min(30, { message: "Weight must be at least 30 kg" }).max(250, { message: "Weight must be less than 250 kg" }),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"], { required_error: "Please select your activity level" }),
  goal: z.enum(["lose", "maintain", "gain"], { required_error: "Please select your goal" }),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      height: undefined,
      weight: undefined,
      activityLevel: undefined,
      goal: undefined,
    },
  });

  const onSubmit = async (data: OnboardingValues) => {
    setIsLoading(true);
    
    try {
      // Calculate calorie needs (Harris-Benedict formula with activity multiplier)
      let bmr = 0;
      
      // BMR calculation
      if (data.gender === "male") {
        bmr = 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age);
      } else {
        bmr = 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age);
      }
      
      // Apply activity multiplier
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
      };
      
      let dailyCalories = bmr * activityMultipliers[data.activityLevel];
      
      // Adjust based on goal
      if (data.goal === "lose") {
        dailyCalories -= 500; // Create a 500 calorie deficit
      } else if (data.goal === "gain") {
        dailyCalories += 500; // Create a 500 calorie surplus
      }
      
      // Round to nearest 10
      dailyCalories = Math.round(dailyCalories / 10) * 10;
      
      console.log('Onboarding data:', data);
      console.log('Calculated daily calories:', dailyCalories);
      
      // Mock successful onboarding
      setTimeout(() => {
        toast({
          title: "Profile completed",
          description: `Your recommended daily intake is ${dailyCalories} calories.`,
        });
        // In a real app, you would save this data to your database
        navigate('/track');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <motion.div 
        className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-healthoria-gold">Let's Get Started</h1>
          <p className="mt-2 text-gray-600">Tell us about yourself to get personalized recommendations</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-4">
                          <RadioGroupItem value="male" id="male" />
                          <label htmlFor="male" className="text-sm font-medium leading-none cursor-pointer">Male</label>
                          
                          <RadioGroupItem value="female" id="female" />
                          <label htmlFor="female" className="text-sm font-medium leading-none cursor-pointer">Female</label>
                          
                          <RadioGroupItem value="other" id="other" />
                          <label htmlFor="other" className="text-sm font-medium leading-none cursor-pointer">Other</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your height"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your weight"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your activity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (hard daily exercise & physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the option that best describes your typical activity level.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What is your goal?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="lose" id="lose" />
                          <label htmlFor="lose" className="text-sm font-medium leading-none cursor-pointer">Lose Weight</label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="maintain" id="maintain" />
                          <label htmlFor="maintain" className="text-sm font-medium leading-none cursor-pointer">Maintain Weight</label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="gain" id="gain" />
                          <label htmlFor="gain" className="text-sm font-medium leading-none cursor-pointer">Gain Weight</label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-gold hover:opacity-90 transition-opacity"
            >
              {isLoading ? "Calculating..." : "Calculate My Plan"}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
