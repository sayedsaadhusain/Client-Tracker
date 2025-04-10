
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Client Hunter</h1>
          <p className="text-muted-foreground">Track your client outreach efforts</p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
          <Button
            onClick={signInWithGoogle}
            className="w-full py-6 text-lg"
          >
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              alt="Google"
              className="w-6 h-6 mr-4"
            />
            Sign in with Google
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
