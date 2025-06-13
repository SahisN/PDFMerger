import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Combine } from "lucide-react";

export default function ProgressLoader({ progress }: { progress: number }) {
  return (
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
              <Progress value={progress} className="w-full max-w-md mx-auto" />
              <p className="text-gray-600 mt-2">{progress}% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
