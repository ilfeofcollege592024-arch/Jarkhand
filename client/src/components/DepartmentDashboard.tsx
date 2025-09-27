import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Building2, 
  FileText, 
  Search,
  Eye,
  Check,
  X,
  Calendar,
  MapPin,
  User,
  Image,
  FileIcon,
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

// TODO: Remove mock data when implementing real backend
const mockReports = [
  {
    id: "RPT001",
    title: "Broken Street Light",
    category: "Infrastructure Issues",
    subcategory: "Street Lights",
    description: "The street light on Main Road, Ward 12 has been broken for 3 days. This is causing safety issues for pedestrians and vehicles during night time.",
    status: "Under Review",
    priority: "High",
    area: "Ranchi Central",
    ward: "Ward 12",
    reportedBy: "John Doe",
    reportedAt: "2024-01-15T10:30:00Z",
    assignedDepartment: "Public Works Department",
    files: ["streetlight1.jpg", "location_map.pdf"],
    voiceNote: "voice_note_001.mp3",
    isValidated: false
  },
  {
    id: "RPT002",
    title: "Water Supply Disruption",
    category: "Infrastructure Issues", 
    subcategory: "Water Supply",
    description: "No water supply for the last 2 days in the residential area near Kanke. Affecting around 50 families.",
    status: "Validated",
    priority: "High",
    area: "Kanke",
    ward: "Ward 15",
    reportedBy: "Mike Johnson",
    reportedAt: "2024-01-18T08:15:00Z",
    assignedDepartment: "Water Supply Department",
    files: ["water_issue.jpg"],
    voiceNote: null,
    isValidated: true
  },
  {
    id: "RPT003",
    title: "Garbage Collection Delay",
    category: "Public Nuisance",
    subcategory: "Garbage",
    description: "Garbage has not been collected for over a week in Doranda area, causing health hazards and bad smell.",
    status: "Under Review",
    priority: "Medium",
    area: "Doranda", 
    ward: "Ward 8",
    reportedBy: "Jane Smith",
    reportedAt: "2024-01-16T14:20:00Z",
    assignedDepartment: "Municipal Corporation",
    files: ["garbage1.jpg", "garbage2.jpg"],
    voiceNote: "voice_note_003.mp3",
    isValidated: false
  }
];

export default function DepartmentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [validationComment, setValidationComment] = useState("");
  const [language] = useState(() => {
    const context = document.querySelector('.language-context');
    return context?.getAttribute('data-language') || 'english';
  });

  const translations = {
    english: {
      welcome: "Department Dashboard",
      subtitle: "Review and validate civilian reports",
      overview: "Overview",
      reviewReports: "Review Reports",
      pending: "Pending Review",
      validated: "Validated",
      rejected: "Rejected",
      totalReports: "Total Reports",
      searchReports: "Search reports...",
      reportDetails: "Report Details",
      validate: "Validate Report",
      reject: "Reject Report",
      addComment: "Add validation comment",
      close: "Close",
      reportedBy: "Reported By",
      reportedOn: "Reported On",
      category: "Category",
      priority: "Priority",
      location: "Location",
      description: "Description",
      attachments: "Attachments",
      voiceNote: "Voice Note",
      validationComment: "Validation Comment",
      status: "Status",
      actions: "Actions"
    },
    hindi: {
      welcome: "विभाग डैशबोर्ड",
      subtitle: "नागरिक रिपोर्ट की समीक्षा और सत्यापन करें",
      overview: "अवलोकन",
      reviewReports: "रिपोर्ट समीक्षा",
      pending: "समीक्षा लंबित",
      validated: "सत्यापित",
      rejected: "अस्वीकृत",
      totalReports: "कुल रिपोर्ट",
      searchReports: "रिपोर्ट खोजें...",
      reportDetails: "रिपोर्ट विवरण",
      validate: "रिपोर्ट सत्यापित करें",
      reject: "रिपोर्ट अस्वीकार करें",
      addComment: "सत्यापन टिप्पणी जोड़ें",
      close: "बंद करें",
      reportedBy: "द्वारा रिपोर्ट किया गया",
      reportedOn: "रिपोर्ट की तारीख",
      category: "श्रेणी",
      priority: "प्राथमिकता",
      location: "स्थान",
      description: "विवरण",
      attachments: "संलग्नक",
      voiceNote: "वॉयस नोट",
      validationComment: "सत्यापन टिप्पणी",
      status: "स्थिति",
      actions: "कार्य"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "under review": return "default";
      case "validated": return "secondary";
      case "rejected": return "destructive";
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
      case "validated": return <CheckCircle2 className="w-4 h-4" />;
      case "rejected": return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleValidation = (reportId: string, isValid: boolean) => {
    console.log(`Report ${reportId} ${isValid ? 'validated' : 'rejected'} with comment: ${validationComment}`);
    // TODO: Implement actual validation logic
    setSelectedReport(null);
    setValidationComment("");
  };

  const filteredReports = mockReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockReports.length,
    pending: mockReports.filter(r => r.status === "Under Review").length,
    validated: mockReports.filter(r => r.status === "Validated").length,
    rejected: mockReports.filter(r => r.status === "Rejected").length
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Building2 className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{t.welcome}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" data-testid="tab-overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="review" data-testid="tab-review">{t.reviewReports}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
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
                  <Clock className="w-5 h-5 text-yellow-600" />
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
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.validated}</p>
                    <p className="text-sm text-muted-foreground">{t.validated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <X className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.rejected}</p>
                    <p className="text-sm text-muted-foreground">{t.rejected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports for Quick Review */}
          <Card>
            <CardHeader>
              <CardTitle>Reports Pending Review</CardTitle>
              <CardDescription>Latest reports awaiting validation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.filter(r => r.status === "Under Review").slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{report.id}</Badge>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">{report.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(report.priority)}>
                        {report.priority}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedReport(report)}>
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

        <TabsContent value="review" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.searchReports}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-reports"
            />
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover-elevate" data-testid={`report-card-${report.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline">{report.id}</Badge>
                        <Badge variant={getStatusColor(report.status)} className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span>{report.status}</span>
                        </Badge>
                        <Badge variant={getPriorityColor(report.priority)}>
                          {report.priority}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{report.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">{t.reportedBy}</p>
                            <p className="font-medium">{report.reportedBy}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">{t.location}</p>
                            <p className="font-medium">{report.area}, {report.ward}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">{t.reportedOn}</p>
                            <p className="font-medium">{new Date(report.reportedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedReport(report)} data-testid={`button-view-${report.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t.reportDetails}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <FileText className="w-5 h-5" />
                              <span>{report?.title}</span>
                              <Badge variant="outline">{report?.id}</Badge>
                            </DialogTitle>
                            <DialogDescription>
                              Review and validate this report
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedReport && (
                            <div className="space-y-6">
                              {/* Report Info */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">{t.category}</h4>
                                  <p className="text-muted-foreground">{selectedReport.category} - {selectedReport.subcategory}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">{t.priority}</h4>
                                  <Badge variant={getPriorityColor(selectedReport.priority)}>
                                    {selectedReport.priority}
                                  </Badge>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">{t.reportedBy}</h4>
                                  <p className="text-muted-foreground">{selectedReport.reportedBy}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">{t.location}</h4>
                                  <p className="text-muted-foreground">{selectedReport.area}, {selectedReport.ward}</p>
                                </div>
                              </div>
                              
                              {/* Description */}
                              <div>
                                <h4 className="font-medium mb-2">{t.description}</h4>
                                <p className="text-muted-foreground">{selectedReport.description}</p>
                              </div>
                              
                              {/* Attachments */}
                              {selectedReport.files.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">{t.attachments}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedReport.files.map((file: string, index: number) => (
                                      <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                                        {file.includes('.jpg') || file.includes('.png') ? 
                                          <Image className="w-4 h-4" /> : 
                                          <FileIcon className="w-4 h-4" />
                                        }
                                        <span className="text-sm">{file}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Voice Note */}
                              {selectedReport.voiceNote && (
                                <div>
                                  <h4 className="font-medium mb-2">{t.voiceNote}</h4>
                                  <div className="flex items-center space-x-2 p-2 border rounded">
                                    <FileIcon className="w-4 h-4" />
                                    <span className="text-sm">{selectedReport.voiceNote}</span>
                                  </div>
                                </div>
                              )}
                              
                              {/* Validation Section */}
                              {!selectedReport.isValidated && selectedReport.status === "Under Review" && (
                                <div>
                                  <h4 className="font-medium mb-2">{t.validationComment}</h4>
                                  <Textarea
                                    value={validationComment}
                                    onChange={(e) => setValidationComment(e.target.value)}
                                    placeholder={t.addComment}
                                    rows={3}
                                    data-testid="textarea-validation-comment"
                                  />
                                  
                                  <div className="flex justify-end space-x-3 mt-4">
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleValidation(selectedReport.id, false)}
                                      data-testid="button-reject-report"
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      {t.reject}
                                    </Button>
                                    <Button
                                      onClick={() => handleValidation(selectedReport.id, true)}
                                      data-testid="button-validate-report"
                                    >
                                      <Check className="w-4 h-4 mr-2" />
                                      {t.validate}
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