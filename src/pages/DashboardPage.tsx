import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * DashboardPage - Protected user dashboard
 * Displays after successful authentication
 */
const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const accessToken = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (!accessToken || !userData) {
      // Redirect to login if not authenticated
      navigate("/login");
      return;
    }

    // Parse and set user data
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });

    // Redirect to home
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              AI Resume Analyzer
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Welcome Section */}
          <div className="glass-card rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome, {user.fullName || user.username}! 👋
            </h2>
            <p className="text-muted-foreground">
              Ready to analyze resumes and job descriptions with AI?
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Resume Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload and analyze resumes with AI-powered insights
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Job Matching
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Match resumes with job descriptions intelligently
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* User Info */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Account Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Username:</span>{" "}
                {user.username}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span>{" "}
                {user.email}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
