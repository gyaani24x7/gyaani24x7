"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import * as mammoth from "mammoth";
import FilePreviewDialog from "./FilePreviewDialog";
import LoginDialog from "./LoginDialog";
import { useSession } from "next-auth/react";

interface ContextInputCardProps {
  onTextChange: (text: string) => void;
  onFileSelect: (file: File | null) => void;
  onContinue: () => void;
}

const ContextInputCard: React.FC<ContextInputCardProps> = ({
  onTextChange,
  onFileSelect,
  onContinue,
}) => {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState("text");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [textValue, setTextValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    onTextChange(e.target.value);
  };

  // ✅ Avoid "canvas" issue by dynamic importing pdfjs
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    await import("pdfjs-dist/build/pdf.worker.entry");

    const pdfData = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }
    return text;
  };

  const extractTextFromDocx = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
    setLoadingPreview(true);

    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDocx(file);
      } else {
        text = await file.text();
      }

      setFileContent(text);
      setPreviewOpen(true);
    } catch (err) {
      console.error("File parsing error:", err);
      setFileContent("Unable to extract text from file.");
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleUseSelection = (selected: string) => {
    setTextValue(selected);
    onTextChange(selected);
  };

  const handleContinueClick = () => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    onContinue();
  };

  return (
    <>
      <Card className="bg-[#0a0a0a] border border-red-500 text-white w-full max-w-4xl mx-auto rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-red-500">
            Add Your Context
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm sm:text-base">
            Paste notes or upload a file — select content and continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row md:items-start gap-8 justify-between mt-6">
          {/* Left Side */}
          <div className="flex-1 w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full justify-between bg-[#141414] border border-red-600 rounded-lg overflow-hidden">
                <TabsTrigger
                  value="text"
                  className="w-1/2 text-white data-[state=active]:bg-red-600 transition-colors py-2 text-sm sm:text-base"
                >
                  Paste Text
                </TabsTrigger>
                <TabsTrigger
                  value="file"
                  className="w-1/2 text-white data-[state=active]:bg-red-600 transition-colors py-2 text-sm sm:text-base"
                >
                  Upload File
                </TabsTrigger>
              </TabsList>

              {/* TEXT INPUT */}
              <TabsContent value="text" className="mt-4">
                <Textarea
                  placeholder="Paste or type your content here..."
                  value={textValue}
                  onChange={handleTextChange}
                  className="min-h-[180px] sm:min-h-[200px] bg-[#111] text-white border-red-500 focus-visible:ring-red-600 text-sm sm:text-base resize-none rounded-lg"
                />
              </TabsContent>

              {/* FILE UPLOAD */}
              <TabsContent
                value="file"
                className="flex flex-col items-center justify-center text-center gap-3 mt-6"
              >
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center gap-2 text-gray-300 hover:text-red-500 transition text-sm sm:text-base"
                >
                  <UploadCloud className="w-5 h-5" />
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {loadingPreview && (
                  <p className="text-gray-500 text-sm">Extracting content...</p>
                )}

                {selectedFile && !loadingPreview && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {selectedFile.name}
                    </p>
                    <Button
                      onClick={() => setPreviewOpen(true)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base flex items-center gap-2 rounded-lg px-4 py-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview & Select Content
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center justify-center text-center gap-4 flex-shrink-0 md:w-1/3">
            <FileText className="text-red-500 w-10 h-10 sm:w-12 sm:h-12" />
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-[250px]">
              Once you’re ready, click continue to generate your quiz.
            </p>
            <Button
              onClick={handleContinueClick}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-2 text-sm sm:text-base font-medium w-full sm:w-auto"
            >
              Continue →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <FilePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        content={fileContent}
        onUseSelection={handleUseSelection}
      />

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};

export default ContextInputCard;
