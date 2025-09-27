import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Plus, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Building2, MapPin, Calendar } from "lucide-react";

interface CivilianDashboardProps {
  onNewReport: () => void;
  onViewReports: () => void;
}

// TODO: Remove mock data when implementing real backend
const mockReports = [
  {
    id: "RPT001",
    title: "Broken Street Light",
    category: "Infrastructure Issues",
    status: "In Progress",
    ward: "Ward 12",
    createdAt: "2024-01-15",
    progress: 65
  },
  {
    id: "RPT002", 
    title: "Garbage Collection Issue",
    category: "Public Nuisance",
    status: "Resolved",
    ward: "Ward 12",
    createdAt: "2024-01-10",
    progress: 100
  },
  {
    id: "RPT003",
    title: "Water Supply Disruption",
    category: "Infrastructure Issues", 
    status: "Pending",
    ward: "Ward 12",
    createdAt: "2024-01-18",
    progress: 20
  }
];

export default function CivilianDashboard({ onNewReport, onViewReports }: CivilianDashboardProps) {
  const [language] = useState(() => {
    const context = document.querySelector('.language-context');
    return context?.getAttribute('data-language') || 'english';
  });

  const translations = {
    english: {
      welcome: "Welcome Back!",
      subtitle: "Track your reports and submit new civic issues",
      quickStats: "Quick Stats",
      totalReports: "Total Reports",
      pending: "Pending",
      inProgress: "In Progress", 
      resolved: "Resolved",
      recentReports: "Recent Reports",
      newReport: "Submit New Report",
      viewAll: "View All Reports",
      reportId: "Report ID",
      status: "Status",
      progress: "Progress",
      createdOn: "Created on"
    },
    hindi: {
      welcome: "वापसी पर स्वागत है!",
      subtitle: "अपनी रिपोर्ट ट्रैक करें और नए नागरिक मुद्दे सबमिट करें",
      quickStats: "त्वरित आंकड़े",
      totalReports: "कुल रिपोर्ट",
      pending: "लंबित",
      inProgress: "प्रगति में",
      resolved: "हल किया गया",
      recentReports: "हाल की रिपोर्ट",
      newReport: "नई रिपोर्ट सबमिट करें",
      viewAll: "सभी रिपोर्ट्स देखें",
      reportId: "रिपोर्ट आईडी",
      status: "स्थिति",
      progress: "प्रगति",
      createdOn: "बनाई गई तारीख"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "destructive";
      case "in progress": return "default";
      case "resolved": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "in progress": return <AlertCircle className="w-4 h-4" />;
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const stats = {
    total: mockReports.length,
    pending: mockReports.filter(r => r.status === "Pending").length,
    inProgress: mockReports.filter(r => r.status === "In Progress").length,
    resolved: mockReports.filter(r => r.status === "Resolved").length
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">{t.welcome}</h1>
        <p className="text-muted-foreground mb-4">{t.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onNewReport} className="flex items-center space-x-2" data-testid="button-new-report">
            <Plus className="w-4 h-4" />
            <span>{t.newReport}</span>
          </Button>
          <Button variant="outline" onClick={onViewReports} className="flex items-center space-x-2" data-testid="button-view-reports">
            <FileText className="w-4 h-4" />
            <span>{t.viewAll}</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t.quickStats}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">{t.totalReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">{t.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                  <p className="text-sm text-muted-foreground">{t.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.resolved}</p>
                  <p className="text-sm text-muted-foreground">{t.resolved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t.recentReports}</h2>
        <div className="space-y-4">
          {mockReports.map((report) => (
            <Card key={report.id} className="hover-elevate cursor-pointer" data-testid={`report-card-${report.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="outline">{report.id}</Badge>
                      <Badge variant={getStatusColor(report.status)} className="flex items-center space-x-1">
                        {getStatusIcon(report.status)}
                        <span>{report.status}</span>
                      </Badge>
                    </div>
                    
                    <h3 className="font-medium text-foreground mb-1">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{report.category}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{report.ward}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{t.createdOn} {report.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-24 ml-4">
                    <div className="text-xs text-muted-foreground mb-1">{t.progress}</div>
                    <Progress value={report.progress} className="h-2" />
                    <div className="text-xs text-right mt-1">{report.progress}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}