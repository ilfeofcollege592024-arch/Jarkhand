import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Building2,
  TrendingUp
} from "lucide-react";

// TODO: Remove mock data when implementing real backend
const mockCases = [
  {
    id: "RPT001",
    title: "Broken Street Light",
    category: "Infrastructure Issues",
    status: "In Progress",
    priority: "High",
    area: "Ranchi Central",
    ward: "Ward 12",
    reportedBy: "John Doe",
    assignedTo: "Public Works Dept",
    createdAt: "2024-01-15",
    lastUpdate: "2024-01-18",
    progress: 65,
    description: "Street light on Main Road has been broken for 3 days"
  },
  {
    id: "RPT002",
    title: "Garbage Collection Issue", 
    category: "Public Nuisance",
    status: "Resolved",
    priority: "Medium",
    area: "Doranda",
    ward: "Ward 12",
    reportedBy: "Jane Smith",
    assignedTo: "Municipal Corp",
    createdAt: "2024-01-10",
    lastUpdate: "2024-01-17",
    progress: 100,
    description: "Irregular garbage collection causing health issues"
  },
  {
    id: "RPT003",
    title: "Water Supply Disruption",
    category: "Infrastructure Issues",
    status: "Pending",
    priority: "High",
    area: "Kanke",
    ward: "Ward 12", 
    reportedBy: "Mike Johnson",
    assignedTo: "Water Supply Dept",
    createdAt: "2024-01-18",
    lastUpdate: "2024-01-18",
    progress: 20,
    description: "No water supply for 2 days in residential area"
  }
];

export default function WardCounsellorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [language] = useState(() => {
    const context = document.querySelector('.language-context');
    return context?.getAttribute('data-language') || 'english';
  });

  const translations = {
    english: {
      welcome: "Ward Counsellor Dashboard",
      subtitle: "Manage and track all assigned cases in your ward",
      overview: "Overview",
      caseManagement: "Case Management", 
      analytics: "Analytics",
      totalCases: "Total Cases",
      pending: "Pending",
      inProgress: "In Progress",
      resolved: "Resolved",
      highPriority: "High Priority",
      searchCases: "Search cases...",
      allCases: "All Cases",
      caseId: "Case ID",
      reportedBy: "Reported By",
      assignedTo: "Assigned To",
      priority: "Priority",
      status: "Status",
      progress: "Progress",
      lastUpdate: "Last Update",
      viewDetails: "View Details",
      filterBy: "Filter by status"
    },
    hindi: {
      welcome: "वार्ड काउंसलर डैशबोर्ड",
      subtitle: "अपने वार्ड में सभी निर्दिष्ट मामलों का प्रबंधन और ट्रैकिंग करें",
      overview: "अवलोकन",
      caseManagement: "केस प्रबंधन",
      analytics: "विश्लेषण",
      totalCases: "कुल केसेस",
      pending: "लंबित",
      inProgress: "प्रगति में",
      resolved: "हल किया गया",
      highPriority: "उच्च प्राथमिकता",
      searchCases: "केसेस खोजें...",
      allCases: "सभी केसेस",
      caseId: "केस आईडी",
      reportedBy: "द्वारा रिपोर्ट किया गया",
      assignedTo: "को सौंपा गया",
      priority: "प्राथमिकता",
      status: "स्थिति",
      progress: "प्रगति",
      lastUpdate: "अंतिम अपडेट",
      viewDetails: "विवरण देखें",
      filterBy: "स्थिति के अनुसार फ़िल्टर करें",
      updateStatus: "स्थिति अपडेट करें",
      markResolved: "हल किया गया मार्क करें",
      markInProgress: "प्रगति में मार्क करें",
      markPending: "लंबित मार्क करें"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleStatusUpdate = (caseId: string, newStatus: string) => {
    console.log(`Updating case ${caseId} to status: ${newStatus}`);
    // TODO: Implement actual status update logic
    // This would typically make an API call to update the case status
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "destructive";
      case "in progress": return "default";
      case "resolved": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
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

  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || caseItem.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockCases.length,
    pending: mockCases.filter(c => c.status === "Pending").length,
    inProgress: mockCases.filter(c => c.status === "In Progress").length,
    resolved: mockCases.filter(c => c.status === "Resolved").length,
    highPriority: mockCases.filter(c => c.priority === "High").length
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{t.welcome}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" data-testid="tab-overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="cases" data-testid="tab-cases">{t.caseManagement}</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">{t.analytics}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">{t.totalCases}</p>
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

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold">{stats.highPriority}</p>
                    <p className="text-sm text-muted-foreground">{t.highPriority}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Cases Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Cases</CardTitle>
              <CardDescription>Latest case updates in your ward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCases.slice(0, 3).map((caseItem) => (
                  <div key={caseItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="w-full" data-testid={`button-view-${caseItem.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t.viewDetails}
                        </Button>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            className="flex-1 text-xs"
                            onClick={() => handleStatusUpdate(caseItem.id, "Resolved")}
                            data-testid={`button-resolve-${caseItem.id}`}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {language === "hindi" ? "हल" : "Resolve"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => handleStatusUpdate(caseItem.id, "In Progress")}
                            data-testid={`button-progress-${caseItem.id}`}
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {language === "hindi" ? "प्रगति" : "Progress"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ward Performance Analytics</CardTitle>
              <CardDescription>Statistical overview of case resolution in your ward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Case Resolution Rate</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Average Resolution Time</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current</span>
                      <span className="font-medium">5.2 days</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}