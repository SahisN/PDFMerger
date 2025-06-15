import { Button } from "@/components/ui/button";
import { Combine } from "lucide-react";
import type { FileItem } from "@/schema/types";

export default function Sidebar({
  files,
  isProcessing,
  handleMerge,
}: {
  files: FileItem[];
  isProcessing: boolean;
  handleMerge: () => void;
}) {
  return (
    <aside className="w-80 bg-white/50 backdrop-blur-sm border-l border-gray-200 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">1</span>
              </div>
              <p>Add your PDF files and images</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">2</span>
              </div>
              <p>Arrange them in your preferred order</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">3</span>
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
            disabled={files.length <= 1 || isProcessing}
          >
            <Combine className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Merge Files"}
          </Button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Supported formats</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Images:</strong> JPG, PNG
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
  );
}
