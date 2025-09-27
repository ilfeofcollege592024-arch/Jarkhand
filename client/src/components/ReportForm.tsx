import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Mic, MicOff, FileText, Users, TriangleAlert as AlertTriangle, Building2, Camera, X, MapPin } from "lucide-react";

interface ReportFormProps {
  onSubmit: (report: any) => void;
  onCancel: () => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
}

const categories = {
  "Infrastructure Issues": {
    icon: <Building2 className="w-5 h-5" />,
    subcategories: ["Road Damage", "Street Lights", "Water Supply", "Electricity", "Drainage"]
  },
  "Public Nuisance": {
    icon: <AlertTriangle className="w-5 h-5" />,
    subcategories: ["Noise Pollution", "Garbage", "Illegal Construction", "Encroachment", "Air Pollution"]
  },
  "Authority Issues": {
    icon: <Users className="w-5 h-5" />,
    subcategories: ["Corruption", "Negligence", "Misconduct", "Delay in Service", "Inappropriate Behavior"]
  }
};

const wards = Array.from({ length: 15 }, (_, i) => `Ward ${i + 1}`);
const areas = ["Ranchi Central", "Doranda", "Kanke", "Hindpiri", "Lalpur", "Hatia", "Ratu"];

export default function ReportForm({ onSubmit, onCancel, language = "english", onLanguageChange }: ReportFormProps) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [ward, setWard] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [misconductType, setMisconductType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);

  const translations = {
    english: {
      newReport: "Submit New Report",
      subtitle: "Report civic issues to improve your community",
      category: "Report Category",
      selectCategory: "Select a category",
      subcategory: "Issue Type",
      selectSubcategory: "Select specific issue",
      title: "Report Title",
      titlePlaceholder: "Brief title for your report",
      description: "Detailed Description",
      descriptionPlaceholder: "Describe the issue in detail...",
      location: "Location Details",
      area: "Area",
      selectArea: "Select your area",
      ward: "Ward",
      selectWard: "Select your ward",
      authorityDetails: "Authority Details",
      officerName: "Officer Name",
      officerPlaceholder: "Name of the concerned officer",
      misconductType: "Nature of Misconduct",
      attachments: "Attachments",
      uploadFiles: "Upload Photos/Documents",
      voiceNote: "Voice Note",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      submit: "Submit Report",
      cancel: "Cancel",
      dragDrop: "Drag & drop files here or click to browse",
      supportedFormats: "Supported: JPG, PNG, PDF (Max 5MB each)"
    },
    hindi: {
      newReport: "नई रिपोर्ट सबमिट करें",
      subtitle: "अपने समुदाय को बेहतर बनाने के लिए नागरिक मुद्दों की रिपोर्ट करें",
      category: "रिपोर्ट श्रेणी",
      selectCategory: "एक श्रेणी चुनें",
      subcategory: "मुद्दे का प्रकार",
      selectSubcategory: "विशिष्ट मुद्दा चुनें",
      title: "रिपोर्ट शीर्षक",
      titlePlaceholder: "अपनी रिपोर्ट के लिए संक्षिप्त शीर्षक",
      description: "विस्तृत विवरण",
      descriptionPlaceholder: "समस्या का विस्तार से वर्णन करें...",
      location: "स्थान विवरण",
      area: "क्षेत्र",
      selectArea: "अपना क्षेत्र चुनें",
      ward: "वार्ड",
      selectWard: "अपना वार्ड चुनें",
      authorityDetails: "प्राधिकरण विवरण",
      officerName: "अधिकारी का नाम",
      officerPlaceholder: "संबंधित अधिकारी का नाम",
      misconductType: "दुराचार की प्रकृति",
      attachments: "संलग्नक",
      uploadFiles: "फ़ोटो/दस्तावेज़ अपलोड करें",
      voiceNote: "वॉयस नोट",
      startRecording: "रिकॉर्डिंग शुरू करें",
      stopRecording: "रिकॉर्डिंग रोकें",
      submit: "रिपोर्ट सबमिट करें",
      cancel: "रद्द करें",
      dragDrop: "फाइलें यहाँ ड्रैग और ड्रॉप करें या ब्राउज़ करने के लिए क्लिक करें",
      supportedFormats: "समर्थित: JPG, PNG, PDF (प्रत्येक अधिकतम 5MB)"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    if (isRecording) {
      // TODO: Stop recording and save voice note
      setIsRecording(false);
      setVoiceNote("Voice note recorded"); // Mock
      console.log("Recording stopped");
    } else {
      // TODO: Start recording
      setIsRecording(true);
      console.log("Recording started");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportData = {
      category,
      subcategory,
      title,
      description,
      area,
      ward,
      officerName: category === "Authority Issues" ? officerName : undefined,
      misconductType: category === "Authority Issues" ? misconductType : undefined,
      files,
      voiceNote,
      timestamp: new Date().toISOString()
    };
    onSubmit(reportData);
  };

  const isFormValid = category && subcategory && title && description && area && ward &&
    (category !== "Authority Issues" || (officerName && misconductType));

  return (
    <div className="max-w-4xl mx-auto mobile-form">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>{t.newReport}</span>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">{t.category}</Label>
              <RadioGroup value={category} onValueChange={(value) => {
                setCategory(value);
                setSubcategory("");
              }}>
                {Object.entries(categories).map(([cat, info]) => (
                  <div key={cat} className="flex items-center space-x-3">
                    <RadioGroupItem value={cat} id={cat} data-testid={`radio-category-${cat}`} />
                    <Label htmlFor={cat} className="flex items-center space-x-2 cursor-pointer">
                      {info.icon}
                      <span>{cat}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Subcategory */}
            {category && (
              <div className="space-y-2">
                <Label>{t.subcategory}</Label>
                <Select value={subcategory} onValueChange={setSubcategory}>
                  <SelectTrigger data-testid="select-subcategory">
                    <SelectValue placeholder={t.selectSubcategory} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[category as keyof typeof categories].subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Title and Description */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.title}</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.titlePlaceholder}
                  data-testid="input-title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.description}</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
                rows={4}
                data-testid="textarea-description"
              />
            </div>

            {/* Location */}
            <div>
              <Label className="text-base font-medium mb-4 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{t.location}</span>
              </Label>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label>{t.area}</Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger data-testid="select-area">
                      <SelectValue placeholder={t.selectArea} />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>{t.ward}</Label>
                  <Select value={ward} onValueChange={setWard}>
                    <SelectTrigger data-testid="select-ward">
                      <SelectValue placeholder={t.selectWard} />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((w) => (
                        <SelectItem key={w} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Authority Details (only for Authority Issues) */}
            {category === "Authority Issues" && (
              <div>
                <Label className="text-base font-medium mb-4">{t.authorityDetails}</Label>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label>{t.officerName}</Label>
                    <Input
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder={t.officerPlaceholder}
                      data-testid="input-officer-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.misconductType}</Label>
                    <Select value={misconductType} onValueChange={setMisconductType}>
                      <SelectTrigger data-testid="select-misconduct">
                        <SelectValue placeholder={t.misconductType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bribery">Bribery</SelectItem>
                        <SelectItem value="negligence">Negligence</SelectItem>
                        <SelectItem value="abuse">Abuse of Power</SelectItem>
                        <SelectItem value="delay">Unreasonable Delay</SelectItem>
                        <SelectItem value="harassment">Harassment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload */}
            <div>
              <Label className="text-base font-medium mb-4">{t.attachments}</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">{t.dragDrop}</p>
                <p className="text-xs text-muted-foreground mb-4">{t.supportedFormats}</p>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  data-testid="input-file-upload"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  <Camera className="w-4 h-4 mr-2" />
                  {t.uploadFiles}
                </Button>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        data-testid={`button-remove-file-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Note */}
            <div>
              <Label className="text-base font-medium mb-4">{t.voiceNote}</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  className="flex items-center space-x-2"
                  data-testid="button-voice-recording"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? t.stopRecording : t.startRecording}</span>
                </Button>
                {voiceNote && (
                  <Badge variant="secondary">Voice note recorded</Badge>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
                {t.cancel}
              </Button>
              <Button type="submit" disabled={!isFormValid} data-testid="button-submit-report">
                {t.submit}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}