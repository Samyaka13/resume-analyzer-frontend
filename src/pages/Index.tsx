import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Index - Landing page for AI Resume Analyzer
 * Features animated hero section with call-to-actions
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="auth-background fixed inset-0 -z-10" />

      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="text-xl font-bold text-foreground">
              AI Resume Analyzer
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="btn-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Powered by Artificial Intelligence
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Analyze Resumes with
              <span className="text-primary block mt-2 animate-glow-pulse">
                AI Precision
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Transform your hiring process with intelligent resume analysis and job matching.
              Get instant insights and make data-driven decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="btn-glow text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
                >
                  Start Analyzing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto"
          >
            {/* Feature 1 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze resumes for skills, experience, and job fit
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Instant Results
              </h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive analysis in seconds, not hours
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Secure & Private
              </h3>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted and never shared with third parties
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-lg py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Resume Analyzer. Powered by cutting-edge AI technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
