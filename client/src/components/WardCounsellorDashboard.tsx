import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, FileText, Search, Eye, Check, X, Calendar, MapPin, User, Building2, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from "lucide-react";

interface WardCounsellorDashboardProps {
  language?: string;
  onLanguageChange?: (language: string) => void;
}

// TODO: Remove mock data when implementing real backend
const mockCases = [
  {
    id: "CASE001",
    title: "Multiple Street Light Issues",
    category: "Infrastructure Issues",
    description: "Several reports about broken street lights in Ward 12",
    status: "Under Review",
    priority: "High",
    area: "Ranchi Central",
    ward: "Ward 12",
    reportCount: 5,
    createdAt: "2024-01-15T10:30:00Z",
    assignedDepartment: "Public Works Department"
  },
  {
    id: "CASE002",
    title: "Water Supply Complaints",
    category: "Infrastructure Issues", 
    description: "Multiple complaints about water supply disruption in Kanke area",
    status: "Forwarded",
    priority: "High",
    area: "Kanke",
    ward: "Ward 15",
    reportCount: 8,
    createdAt: "2024-01-18T08:15:00Z",
    assignedDepartment: "Water Supply Department"
  },
  {
    id: "CASE003",
    title: "Garbage Collection Issues",
    category: "Public Nuisance",
    description: "Recurring complaints about delayed garbage collection",
    status: "Resolved",
    priority: "Medium",
    area: "Doranda", 
    ward: "Ward 8",
    reportCount: 3,
    createdAt: "2024-01-16T14:20:00Z",
    assignedDepartment: "Municipal Corporation"
  }
];

export default function WardCounsellorDashboard({ language = "english", onLanguageChange }: WardCounsellorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [forwardComment, setForwardComment] = useState("");

  const translations = {
    english: {
      welcome: "Ward Counsellor Dashboard",
      subtitle: "Review and forward civilian reports to departments",
      overview: "Overview",
      manageCases: "Manage Cases",
      pending: "Pending Review",
      forwarded: "Forwarded",
      resolved: "Resolved",
      totalCases: "Total Cases",
      searchCases: "Search cases...",
      caseDetails: "Case Details",
      forward: "Forward to Department",
      resolve: "Mark as Resolved",
      addComment: "Add forwarding comment",
      close: "Close",
      reportCount: "Reports",
      createdOn: "Created On",
      category: "Category",
      priority: "Priority",
      location: "Location",
      description: "Description",
      forwardingComment: "Forwarding Comment",
      status: "Status",
      actions: "Actions"
    },
    hindi: {
      welcome: "वार्ड काउंसलर डैशबोर्ड",
      subtitle: "नागरिक रिपोर्ट की समीक्षा करें और विभागों को भेजें",
      overview: "अवलोकन",
      manageCases: "केस प्रबंधन",
      pending: "समीक्षा लंबित",
      forwarded: "भेजा गया",
      resolved: "हल किया गया",
      totalCases: "कुल केस",
      searchCases: "केस खोजें...",
      caseDetails: "केस विवरण",
      forward: "विभाग को भेजें",
      resolve: "हल के रूप में चिह्नित करें",
      addComment: "फॉरवर्डिंग टिप्पणी जोड़ें",
      close: "बंद करें",
      reportCount: "रिपोर्ट्स",
      createdOn: "बनाई गई तारीख",
      category: "श्रेणी",
      priority: "प्राथमिकता",
      location: "स्थान",
      description: "विवरण",
      forwardingComment: "फॉरवर्डिंग टिप्पणी",
      status: "स्थिति",
      actions: "कार्य"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "under review": return "default";
      case "forwarded": return "secondary";
      case "resolved": return "outline";
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
      case "under review": return <Clock className="w-4 h-4" />;
      case "forwarded": return <CheckCircle2 className="w-4 h-4" />;
      case "resolved": return <Check className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleForward = (caseId: string) => {
    console.log(`Case ${caseId} forwarded with comment: ${forwardComment}`);
    // TODO: Implement actual forwarding logic
    setSelectedCase(null);
    setForwardComment("");
  };

  const handleResolve = (caseId: string) => {
    console.log(`Case ${caseId} marked as resolved`);
    // TODO: Implement actual resolution logic
    setSelectedCase(null);
  };

  const filteredCases = mockCases.filter(case_ =>
    case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockCases.length,
    pending: mockCases.filter(c => c.status === "Under Review").length,
    forwarded: mockCases.filter(c => c.status === "Forwarded").length,
    resolved: mockCases.filter(c => c.status === "Resolved").length
  };

  return (
    <div className="space-y-4 sm:space-y-6 mobile-container">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 sm:p-6 mobile-card">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">{t.welcome}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12 sm:h-10">
          <TabsTrigger value="overview" data-testid="tab-overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="cases" data-testid="tab-cases">{t.manageCases}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">{t.totalCases}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">{t.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.forwarded}</p>
                    <p className="text-sm text-muted-foreground">{t.forwarded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.resolved}</p>
                    <p className="text-sm text-muted-foreground">{t.resolved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Cases for Quick Review */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle>Cases Pending Review</CardTitle>
              <CardDescription>Latest cases awaiting action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCases.filter(c => c.status === "Under Review").slice(0, 3).map((case_) => (
                  <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-1">
                      <Badge variant="outline" className="self-start sm:self-center">{case_.id}</Badge>
                      <div>
                        <p className="font-medium">{case_.title}</p>
                        <p className="text-sm text-muted-foreground">{case_.reportCount} {t.reportCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(case_.priority)}>
                        {case_.priority}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild className="ml-2 sm:ml-0">
                          <Button size="sm" variant="outline" onClick={() => setSelectedCase(case_)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4 sm:space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.searchCases}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-cases"
            />
          </div>

          {/* Cases List */}
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="hover-elevate mobile-card" data-testid={`case-card-${case_.id}`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline">{case_.id}</Badge>
                        <Badge variant={getStatusColor(case_.status)} className="flex items-center space-x-1">
                          {getStatusIcon(case_.status)}
                          <span>{case_.status}</span>
                        </Badge>
                        <Badge variant={getPriorityColor(case_.priority)}>
                          {case_.priority}
                        </Badge>
                        <Badge variant="secondary">
                          {case_.reportCount} {t.reportCount}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-base sm:text-lg mb-2">{case_.title}</h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{case_.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Department</p>
                            <p className="font-medium">{case_.assignedDepartment}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">{t.location}</p>
                            <p className="font-medium">{case_.area}, {case_.ward}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">{t.createdOn}</p>
                            <p className="font-medium">{new Date(case_.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedCase(case_)} data-testid={`button-view-${case_.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t.caseDetails}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-3 sm:mx-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <FileText className="w-5 h-5" />
                              <span>{case_?.title}</span>
                              <Badge variant="outline">{case_?.id}</Badge>
                            </DialogTitle>
                            <DialogDescription>
                              Review and manage this case
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedCase && (
                            <div className="space-y-6">
                              {/* Case Info */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">{t.category}</h4>
                                  <p className="text-muted-foreground">{selectedCase.category}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">{t.priority}</h4>
                                  <Badge variant={getPriorityColor(selectedCase.priority)}>
                                    {selectedCase.priority}
                                  </Badge>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">{t.reportCount}</h4>
                                  <p className="text-muted-foreground">{selectedCase.reportCount} reports</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">{t.location}</h4>
                                  <p className="text-muted-foreground">{selectedCase.area}, {selectedCase.ward}</p>
                                </div>
                              </div>
                              
                              {/* Description */}
                              <div>
                                <h4 className="font-medium mb-2">{t.description}</h4>
                                <p className="text-muted-foreground">{selectedCase.description}</p>
                              </div>
                              
                              {/* Action Section */}
                              {selectedCase.status === "Under Review" && (
                                <div>
                                  <h4 className="font-medium mb-2">{t.forwardingComment}</h4>
                                  <Textarea
                                    value={forwardComment}
                                    onChange={(e) => setForwardComment(e.target.value)}
                                    placeholder={t.addComment}
                                    rows={3}
                                    data-testid="textarea-forward-comment"
                                  />
                                  
                                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                                    <Button
                                      variant="outline"
                                      onClick={() => handleResolve(selectedCase.id)}
                                      className="h-10 mobile-button-full sm:w-auto" data-testid="button-resolve-case"
                                    >
                                      <Check className="w-4 h-4 mr-2" />
                                      {t.resolve}
                                    </Button>
                                    <Button
                                      onClick={() => handleForward(selectedCase.id)}
                                      className="h-10 mobile-button-full sm:w-auto" data-testid="button-forward-case"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      {t.forward}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}