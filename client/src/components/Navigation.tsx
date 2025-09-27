import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Chrome as Home, FileText, Shield, Building2, Users, LogOut, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NavigationProps {
  userRole: string;
  userName: string;
  department?: string;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export default function Navigation({ 
  userRole, 
  userName, 
  department, 
  currentPage, 
  onPageChange, 
  onLogout,
  language,
  onLanguageChange
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    english: {
      home: "Home",
      reports: "Reports", 
      newReport: "New Report",
      cases: "Cases",
      review: "Review",
      logout: "Logout",
      language: "Language",
      civilian: "Civilian",
      counsellor: "Ward Counsellor",
      department: "Department Official"
    },
    hindi: {
      home: "होम",
      reports: "रिपोर्ट्स",
      newReport: "नई रिपोर्ट",
      cases: "केसेस",
      review: "समीक्षा",
      logout: "लॉगआउट",
      language: "भाषा",
      civilian: "नागरिक",
      counsellor: "वार्ड काउंसलर", 
      department: "विभागीय अधिकारी"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getNavItems = () => {
    switch (userRole) {
      case "civilian":
        return [
          { id: "dashboard", label: t.home, icon: <Home className="w-4 h-4" /> },
          { id: "new-report", label: t.newReport, icon: <FileText className="w-4 h-4" /> }
        ];
      case "counsellor":
        return [
          { id: "dashboard", label: t.home, icon: <Home className="w-4 h-4" /> },
          { id: "cases", label: t.cases, icon: <Shield className="w-4 h-4" /> }
        ];
      case "department":
        return [
          { id: "dashboard", label: t.home, icon: <Home className="w-4 h-4" /> },
          { id: "review", label: t.review, icon: <Building2 className="w-4 h-4" /> }
        ];
      default:
        return [];
    }
  };

  const getRoleDisplay = () => {
    switch (userRole) {
      case "civilian": return t.civilian;
      case "counsellor": return t.counsellor;
      case "department": return t.department;
      default: return "";
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "civilian": return <Users className="w-4 h-4" />;
      case "counsellor": return <Shield className="w-4 h-4" />;
      case "department": return <Building2 className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <nav className="bg-card border-b border-card-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-semibold text-foreground">Civic Portal</h1>
                <p className="text-xs text-muted-foreground">Jharkhand Government</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-sm font-semibold text-foreground">Civic Portal</h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {getNavItems().map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm" 
                onClick={() => onPageChange(item.id)}
                className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                data-testid={`nav-${item.id}`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* User Info and Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-16 sm:w-24 h-8 sm:h-9" data-testid="select-nav-language">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">EN</SelectItem>
                <SelectItem value="hindi">हि</SelectItem>
              </SelectContent>
            </Select>

            {/* User Info */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <div className="flex items-center space-x-1">
                  {getRoleIcon()}
                  <Badge variant="secondary" className="text-xs">
                    {getRoleDisplay()}
                  </Badge>
                  {department && (
                    <Badge variant="outline" className="text-xs">
                      {department}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm" 
              onClick={onLogout}
              className="flex items-center space-x-2"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && ( 
          <div className="md:hidden border-t border-card-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {getNavItems().map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start space-x-2 h-12"
                  data-testid={`nav-mobile-${item.id}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
              
              {/* Mobile User Info */}
              <div className="pt-3 mt-3 border-t border-card-border">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRoleIcon()}
                    <Badge variant="secondary" className="text-xs">
                      {getRoleDisplay()}
                    </Badge>
                    {department && (
                      <Badge variant="outline" className="text-xs">
                        {department}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}