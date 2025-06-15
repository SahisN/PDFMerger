import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FileItem } from "@/schema/types";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  FileText,
  ImageIcon,
  RotateCw,
  Trash2,
  X,
} from "lucide-react";
import type React from "react";

export default function ShowFileList({
  files,
  setFiles,
  moveFile,
  removeFile,
}: {
  files: FileItem[];
  // eslint-disable-next-line no-unused-vars
  setFiles: (file: React.SetStateAction<FileItem[]>) => void;
  // eslint-disable-next-line no-unused-vars
  moveFile: (_id: string, _direction: "up" | "down") => void;
  // eslint-disable-next-line no-unused-vars
  removeFile: (_id: string) => void;
}) {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-gray-900">Files to merge ({files.length})</span>
          <Button variant="outline" size="sm" onClick={() => setFiles([])}>
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
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{file.size}</p>
                </div>
                <Badge
                  variant={file.type === "pdf" ? "destructive" : "default"}
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
  );
}
