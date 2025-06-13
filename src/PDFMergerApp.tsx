import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  ImageIcon,
  Upload,
  X,
  ArrowUp,
  ArrowDown,
  RotateCw,
  Eye,
  Trash2,
  Combine,
  Files,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "pdf" | "image";
  size: string;
  preview?: string;
}

export default function PDFMergerApp() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = () => {
    // handle file upload
    console.log("upload handling");
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const moveFile = (id: string, direction: "up" | "down") => {
    setFiles((prev) => {
      const index = prev.findIndex((file) => file.id === id);
      if (index === -1) return prev;

      const newFiles = [...prev];
      if (direction === "up" && index > 0) {
        [newFiles[index], newFiles[index - 1]] = [
          newFiles[index - 1],
          newFiles[index],
        ];
      } else if (direction === "down" && index < newFiles.length - 1) {
        [newFiles[index], newFiles[index + 1]] = [
          newFiles[index + 1],
          newFiles[index],
        ];
      }
      return newFiles;
    });
  };

  const handleMerge = async () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    setIsProcessing(false);
    setProgress(0);
    alert("Choose where to save your merged PDF file...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <Combine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                PDF Merger
              </h1>
              <p className="text-sm text-gray-600">
                Combine PDFs and images seamlessly
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Upload Section */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? "border-blue-400 bg-blue-50 scale-[1.02]"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                  onClick={handleFileUpload}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    handleFileUpload();
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add PDFs and images in any order - we'll merge them into one
                    PDF
                  </p>

                  <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span>PDF Documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-500" />
                      <span>JPG, PNG, TIFF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Files className="w-4 h-4 text-green-500" />
                      <span>Up to 100MB each</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-gray-900">
                      Files to merge ({files.length})
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFiles([])}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              file.type === "pdf"
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {file.type === "pdf" ? (
                              <FileText className="w-5 h-5" />
                            ) : (
                              <ImageIcon className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                          <Badge
                            variant={
                              file.type === "pdf" ? "destructive" : "default"
                            }
                          >
                            {file.type.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(file.id, "up")}
                            disabled={index === 0}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(file.id, "down")}
                            disabled={index === files.length - 1}
                          >
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RotateCw className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Processing Overlay - appears in center of screen */}
            {isProcessing && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="shadow-2xl border-0 bg-white mx-4 min-w-[400px]">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                        <Combine className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Merging your files...
                        </h3>
                        <Progress
                          value={progress}
                          className="w-full max-w-md mx-auto"
                        />
                        <p className="text-gray-600 mt-2">
                          {progress}% complete
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-80 bg-white/50 backdrop-blur-sm border-l border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">
                      1
                    </span>
                  </div>
                  <p>Add your PDF files and images</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">
                      2
                    </span>
                  </div>
                  <p>Arrange them in your preferred order</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">
                      3
                    </span>
                  </div>
                  <p>Click merge and save your new PDF</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
                onClick={handleMerge}
                disabled={files.length === 0 || isProcessing}
              >
                <Combine className="w-4 h-4 mr-2" />
                {isProcessing ? "Processing..." : "Merge Files"}
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Supported formats
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Images:</strong> JPG, PNG, TIFF, BMP
                </p>
                <p>
                  <strong>Documents:</strong> PDF
                </p>
                <p>
                  <strong>File size:</strong> Up to 100MB each
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky Bottom Merge Button - only show when files exist */}
      {files.length > 0 && !isProcessing && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg px-8 py-3 text-lg font-semibold"
            size="lg"
            onClick={handleMerge}
          >
            <Combine className="w-5 h-5 mr-2" />
            Merge {files.length} Files
          </Button>
        </div>
      )}
    </div>
  );
}
