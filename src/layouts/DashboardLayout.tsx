
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollReveal, useParallax } from '@/hooks/useAnimations';
import { 
  Home,
  ChartBar,
  Settings,
  Calculator,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // Initialize animation hooks
  useScrollReveal();
  useParallax();

  const location = useLocation();
  
  const handleLogout = () => {
    // This would typically connect to your auth service
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // For now, just redirect to home page
    window.location.href = '/';
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/track', label: 'Track', icon: <Calculator size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <ChartBar size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-healthoria-gold">Healthoria</span>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-healthoria-gold"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Side Navigation - hidden on mobile */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gradient-gold text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="grid grid-cols-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-3 ${
                  location.pathname === item.path
                    ? 'text-healthoria-gold'
                    : 'text-gray-600'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-16 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
