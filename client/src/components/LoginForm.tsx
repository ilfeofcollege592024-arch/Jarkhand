import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Building2, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string; role: string; department?: string }) => void;
}

const departments = [
  "Public Works Department",
  "Municipal Corporation", 
  "Water Supply Department",
  "Electricity Board",
  "Health Department",
  "Education Department"
];

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("english");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && role) {
      onLogin({ username, password, role, department: role === "department" ? department : undefined });
    }
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "civilian": return <Users className="w-5 h-5" />;
      case "counsellor": return <Shield className="w-5 h-5" />;
      case "department": return <Building2 className="w-5 h-5" />;
      default: return null;
    }
  };

  const translations = {
    english: {
      title: "Civic Report Portal",
      subtitle: "Jharkhand Government",
      description: "Sign in to report issues and track progress",
      username: "Username",
      password: "Password",
      selectRole: "Select User Type",
      selectDepartment: "Select Department",
      civilian: "Civilian",
      counsellor: "Ward Counsellor", 
      department: "Department Official",
      signIn: "Sign In",
      language: "Language"
    },
    hindi: {
      title: "नागरिक रिपोर्ट पोर्टल",
      subtitle: "झारखंड सरकार",
      description: "समस्याओं की रिपोर्ट करने और प्रगति ट्रैक करने के लिए साइन इन करें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      selectRole: "उपयोगकर्ता प्रकार चुनें",
      selectDepartment: "विभाग चुनें",
      civilian: "नागरिक",
      counsellor: "वार्ड काउंसलर",
      department: "विभागीय अधिकारी",
      signIn: "साइन इन करें",
      language: "भाषा"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4 mobile-optimized">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-semibold">{t.title}</CardTitle>
              <CardDescription className="text-sm font-medium text-primary">{t.subtitle}</CardDescription>
            </div>
          </div>
          <CardDescription>{t.description}</CardDescription>
          
          <div className="flex justify-center">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32" data-testid="select-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">{t.selectRole}</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger data-testid="select-role">
                  <SelectValue placeholder={t.selectRole} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civilian">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon("civilian")}
                      <span>{t.civilian}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="counsellor">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon("counsellor")}
                      <span>{t.counsellor}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="department">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon("department")}
                      <span>{t.department}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "department" && (
              <div className="space-y-2">
                <Label htmlFor="department">{t.selectDepartment}</Label>
                <Select value={department} onValueChange={setDepartment} required>
                  <SelectTrigger data-testid="select-department">
                    <SelectValue placeholder={t.selectDepartment} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!username || !password || !role || (role === "department" && !department)}
              data-testid="button-signin"
            >
              {t.signIn}
            </Button>
          </form>

          {role && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <div className="flex items-center space-x-2">
                {getRoleIcon(role)}
                <Badge variant="secondary">
                  {role === "civilian" && t.civilian}
                  {role === "counsellor" && t.counsellor}
                  {role === "department" && t.department}
                </Badge>
                {role === "department" && department && (
                  <Badge variant="outline">{department}</Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}