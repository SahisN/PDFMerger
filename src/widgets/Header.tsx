import { Combine } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <Combine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">PDF Merger</h1>
            <p className="text-sm text-gray-600">
              Combine PDFs and images seamlessly
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
