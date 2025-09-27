import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import LoginForm from "@/components/LoginForm";
import Navigation from "@/components/Navigation";
import CivilianDashboard from "@/components/CivilianDashboard";
import ReportForm from "@/components/ReportForm";
import WardCounsellorDashboard from "@/components/WardCounsellorDashboard";
import DepartmentDashboard from "@/components/DepartmentDashboard";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import NotFound from "@/pages/not-found";
import { useState as useAppState } from "react";

interface User {
  username: string;
  role: string;
  department?: string;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50"
      data-testid="theme-toggle"
    >
      {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </Button>
  );
}

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [language, setLanguage] = useAppState("english");

  const handleLogin = (credentials: { username: string; password: string; role: string; department?: string }) => {
    // TODO: Replace with actual authentication
    const newUser: User = {
      username: credentials.username,
      role: credentials.role,
      department: credentials.department
    };
    setUser(newUser);
    setCurrentPage("dashboard");
    console.log("User logged in:", newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
    console.log("User logged out");
  };

  const handleNewReport = () => {
    setCurrentPage("new-report");
  };

  const handleViewReports = () => {
    setCurrentPage("reports");
  };

  const handleReportSubmit = (reportData: any) => {
    console.log("Report submitted:", reportData);
    // TODO: Implement actual report submission
    setCurrentPage("dashboard");
  };

  const handleReportCancel = () => {
    setCurrentPage("dashboard");
  };

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="min-h-screen">
        <LoginForm onLogin={handleLogin} language={language} onLanguageChange={setLanguage} />
      </div>
    );
  }

  // Render appropriate dashboard based on user role and current page
  const renderContent = () => {
    switch (user.role) {
      case "civilian":
        switch (currentPage) {
          case "dashboard":
            return <CivilianDashboard onNewReport={handleNewReport} onViewReports={handleViewReports} language={language} onLanguageChange={setLanguage} />;
          case "new-report":
            return <ReportForm onSubmit={handleReportSubmit} onCancel={handleReportCancel} language={language} onLanguageChange={setLanguage} />;
          case "reports":
            return <CivilianDashboard onNewReport={handleNewReport} onViewReports={handleViewReports} language={language} onLanguageChange={setLanguage} />;
          default:
            return <CivilianDashboard onNewReport={handleNewReport} onViewReports={handleViewReports} language={language} onLanguageChange={setLanguage} />;
        }
      case "counsellor":
        return <WardCounsellorDashboard language={language} onLanguageChange={setLanguage} />;
      case "department":
        return <DepartmentDashboard language={language} onLanguageChange={setLanguage} />;
      default:
        return <div className="p-6">Invalid user role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThemeToggle />
      <Navigation
        userRole={user.role}
        userName={user.username}
        department={user.department}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-6">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;