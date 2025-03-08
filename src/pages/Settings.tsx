import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Download, 
  User, 
  CreditCard, 
  Globe, 
  AlignLeft, 
  Smartphone,
  Target,
  Bot,
  Heart,
  Languages,
  Star
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [waterReminders, setWaterReminders] = useState(true);
  const [wearableSync, setWearableSync] = useState(false);
  const [language, setLanguage] = useState('english');
  
  const dietaryPreferences = [
    { id: 'vegan', label: 'Vegan', active: false },
    { id: 'vegetarian', label: 'Vegetarian', active: true },
    { id: 'paleo', label: 'Paleo', active: false },
    { id: 'keto', label: 'Keto', active: false },
    { id: 'gluten-free', label: 'Gluten Free', active: true },
    { id: 'dairy-free', label: 'Dairy Free', active: false },
    { id: 'nut-free', label: 'Nut Free', active: false },
  ];
  
  const [preferences, setPreferences] = useState(dietaryPreferences);
  
  const handleTogglePreference = (id: string) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, active: !pref.active } : pref
    ));
    
    toast({
      title: "Preference Updated",
      description: `Your dietary preferences have been updated.`,
    });
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${darkMode ? 'Light' : 'Dark'} Mode Activated`,
      description: `App theme has been changed to ${darkMode ? 'light' : 'dark'} mode.`,
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your nutritional data is being prepared for download.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Data Export Complete",
        description: "Your data has been downloaded successfully.",
      });
    }, 2000);
  };
  
  const handleConnectWearable = () => {
    setWearableSync(true);
    toast({
      title: "Wearable Connected",
      description: "Your fitness device has been connected successfully.",
    });
  };
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    toast({
      title: "Language Updated",
      description: `App language has been changed to ${lang}.`,
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
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Customize your nutrition tracking experience</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dietary Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>Manage your dietary preferences and restrictions</CardDescription>
                </div>
                <AlignLeft className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {preferences.map(pref => (
                    <Button
                      key={pref.id}
                      variant={pref.active ? "default" : "outline"}
                      onClick={() => handleTogglePreference(pref.id)}
                      className={pref.active ? "bg-gradient-gold hover:opacity-90" : "border-orange-200 text-gray-700 hover:bg-orange-50"}
                    >
                      {pref.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Health Goals</CardTitle>
                  <CardDescription>Set and track your health objectives</CardDescription>
                </div>
                <Target className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Weight Goal</span>
                    <span className="text-sm text-healthoria-gold">Lose 5kg</span>
                  </div>
                  <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Protein Intake</span>
                    <span className="text-sm text-healthoria-gold">110g daily</span>
                  </div>
                  <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Activity Level</span>
                    <span className="text-sm text-healthoria-gold">Moderate</span>
                  </div>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications & Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your alerts and reminders</CardDescription>
                </div>
                <Bell className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates and reminders</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Meal Reminders</p>
                    <p className="text-sm text-gray-500">Get reminded to log your meals</p>
                  </div>
                  <Switch checked={mealReminders} onCheckedChange={setMealReminders} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Water Intake Reminders</p>
                    <p className="text-sm text-gray-500">Stay hydrated with timely reminders</p>
                  </div>
                  <Switch checked={waterReminders} onCheckedChange={setWaterReminders} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Device Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Device Integration</CardTitle>
                  <CardDescription>Connect wearables and fitness devices</CardDescription>
                </div>
                <Smartphone className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sync with Wearables</p>
                    <p className="text-sm text-gray-500">Import activity data automatically</p>
                  </div>
                  <Switch checked={wearableSync} onCheckedChange={setWearableSync} />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleConnectWearable}
                    className="border-orange-200 text-gray-700 hover:bg-orange-50"
                    disabled={wearableSync}
                  >
                    Connect Fitbit
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleConnectWearable}
                    className="border-orange-200 text-gray-700 hover:bg-orange-50"
                    disabled={wearableSync}
                  >
                    Connect Apple Health
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleConnectWearable}
                    className="border-orange-200 text-gray-700 hover:bg-orange-50"
                    disabled={wearableSync}
                  >
                    Connect Google Fit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* App Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>App Preferences</CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </div>
                <SettingsIcon className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">Enable dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>
                
                <Separator className="my-2" />
                
                <div>
                  <p className="font-medium mb-2">Language</p>
                  <div className="flex flex-wrap gap-2">
                    {['english', 'spanish', 'french', 'german', 'japanese'].map(lang => (
                      <Button
                        key={lang}
                        variant={language === lang ? "default" : "outline"}
                        onClick={() => handleLanguageChange(lang)}
                        className={language === lang ? "bg-gradient-gold hover:opacity-90" : "border-orange-200 text-gray-700 hover:bg-orange-50"}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI and Coaching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>AI Coach & Personalization</CardTitle>
                  <CardDescription>Manage your AI coaching features</CardDescription>
                </div>
                <Bot className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Personalized Recommendations</p>
                    <p className="text-sm text-gray-500">Get AI-powered meal suggestions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mood-Based Recommendations</p>
                    <p className="text-sm text-gray-500">Adjust meal plans based on mood</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Insights & Reports</p>
                    <p className="text-sm text-gray-500">Receive detailed nutrition analysis</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button className="w-full bg-gradient-gold hover:opacity-90">
                  <Star className="mr-2 h-4 w-4" />
                  Upgrade to Premium Coach
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account & Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="md:col-span-2"
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Account & Privacy</CardTitle>
                  <CardDescription>Manage your account and data preferences</CardDescription>
                </div>
                <User className="h-5 w-5 text-healthoria-gold" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="border-orange-200 text-gray-700 hover:bg-orange-50">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  
                  <Button variant="outline" className="border-orange-200 text-gray-700 hover:bg-orange-50">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  
                  <Button variant="outline" className="border-orange-200 text-gray-700 hover:bg-orange-50">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </Button>
                  
                  <Button variant="outline" className="border-orange-200 text-gray-700 hover:bg-orange-50 text-red-500 hover:text-red-600 hover:border-red-200">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
