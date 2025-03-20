import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Video, Users, Shield, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f5f5f5_0%,_#ffffff_100%)] -z-10" />
        
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6 max-w-xl"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 text-sm w-fit gap-2">
                <span className="bg-black text-white px-2 py-0.5 rounded-full text-xs">New</span>
                <span className="text-black/70">Premium quality video calls</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                Connect with clarity and simplicity
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Experience video calling refined to its purest form. No distractions, just crystal clear connections in a beautifully minimal interface.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="rounded-md w-full sm:w-auto">
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"} 
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="rounded-md w-full sm:w-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 flex items-center justify-center">
                <div className="text-white text-center px-6">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl font-medium mb-2">NexMeet Video</h3>
                  <p className="text-white/70 max-w-md mx-auto">
                    Distraction-free calling in stunning clarity
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-medium mb-4"
            >
              Everything you need, nothing you don't
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Our minimalist design focuses on the essentials, delivering a seamless video calling experience without unnecessary complexity.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-4">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Crystal Clear Video</h3>
              <p className="text-muted-foreground">
                High-definition video that adjusts to your connection for a flawless experience every time.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Group Conferences</h3>
              <p className="text-muted-foreground">
                Connect with multiple participants in the same elegant interface, with smart layout adjustments.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Communication</h3>
              <p className="text-muted-foreground">
                End-to-end encryption ensures your conversations remain private and secure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Video className="h-5 w-5" />
              <span className="font-medium">NexMeet</span>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
            
            <div className="mt-6 md:mt-0">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} NexMeet. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
