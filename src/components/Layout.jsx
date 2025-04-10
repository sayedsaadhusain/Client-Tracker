
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, PlusCircle, BarChart, Sun, Moon, LogIn, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/clients", icon: Users, label: "Clients" },
    { to: "/add", icon: PlusCircle, label: "Add" },
    { to: "/analytics", icon: BarChart, label: "Analytics" }
  ];

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Success",
        description: "Successfully logged in with Google"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login with Google",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "Successfully logged out"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive"
      });
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark": return <Moon className="w-5 h-5" />;
      case "light": return <Sun className="w-5 h-5" />;
      default: return <Laptop className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <nav className="hidden md:flex w-64 flex-col bg-card border-r border-border p-4 transition-colors duration-300">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-primary mb-8"
          >
            <span><img src="" alt="" /></span>Client Hunter
          </motion.div>
          <div className="space-y-2 flex-1">
            <AnimatePresence>
              {navItems.map(({ to, icon: Icon, label }) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent transition-all duration-200",
                        isActive && "bg-accent text-accent-foreground font-medium"
                      )
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="pt-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start transition-colors duration-200"
              onClick={toggleTheme}
            >
              {getThemeIcon()}
              <span className="ml-2">
                {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
              </span>
            </Button>
            <AnimatePresence mode="wait">
              {auth.currentUser ? (
                <motion.div
                  key="signout"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign Out
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleGoogleLogin}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In with Google
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50 transition-colors duration-300"
        >
          <div className="flex justify-around items-center h-16">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center py-1 px-3 text-muted-foreground transition-colors duration-200",
                    isActive && "text-primary"
                  )
                }
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{label}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 md:p-8 pb-24 md:pb-8"
        >
          {children}
        </motion.main>

        {/* Mobile Header */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-card border-b border-border md:hidden z-50 px-4 py-3 flex justify-between items-center transition-colors duration-300"
        >
          <div className="text-lg font-bold text-primary">Client Hunter</div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={toggleTheme}
            >
              {getThemeIcon()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={auth.currentUser ? handleSignOut : handleGoogleLogin}
            >
              <LogIn className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Layout;
