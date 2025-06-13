import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ImageIcon, Upload, Combine, Files } from "lucide-react";
import Header from "./widgets/Header";
import type { FileItem } from "./schema/types";
import Sidebar from "./widgets/Sidebar";
import ProgressLoader from "./widgets/ProgressLoader";
import ShowFileList from "./widgets/ShowFileList";
import { mergeFilesToPdf } from "./utils/mergePdf";

export default function PDFMergerApp() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files?: FileList) => {
    console.log("file uplaoding");
    if (files) {
      const validFiles: FileItem[] = Array.from(files)
        .filter((file) =>
          ["application/pdf", "image/png", "image/jpeg"].includes(file.type)
        )
        .map((file) => ({
          file,
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type == "application/pdf" ? "pdf" : "image",
          size: `${file.size}`,
          preview:
            file.type == "application/pdf"
              ? "/placeholder.svg?height100&width=100"
              : undefined,
        }));
      setFiles((prev) => [...prev, ...validFiles]);
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/pdf,image/png,image/jpeg";
      input.multiple = true;

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
          handleFileUpload(target.files);
        }
      };

      input.click();
    }
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

    try {
      // Simulate processing
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setProgress(i);
      }

      const mergeBlob = await mergeFilesToPdf(files);
      setIsProcessing(false);
      setProgress(0);
      await new Promise((r) => setTimeout(r, 300));

      const url = URL.createObjectURL(mergeBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Merging files failed...");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <Header />

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
                  onClick={() => handleFileUpload()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    handleFileUpload(e.dataTransfer.files);
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
              <ShowFileList
                files={files}
                moveFile={moveFile}
                removeFile={removeFile}
                setFiles={setFiles}
              />
            )}

            {/* Processing Overlay - appears in center of screen */}
            {isProcessing && <ProgressLoader progress={progress} />}
          </div>
        </main>

        {/* Sidebar */}
        <Sidebar
          files={files}
          handleMerge={handleMerge}
          isProcessing={isProcessing}
        />
      </div>

      {/* Sticky Bottom Merge Button - only show when files exist */}
      {files.length > 1 && !isProcessing && (
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
