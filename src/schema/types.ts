export interface FileItem {
  id: string;
  name: string;
  type: "pdf" | "image";
  size: string;
  preview?: string;
}