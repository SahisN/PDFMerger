export interface FileItem {
  file: any;
  id: string;
  name: string;
  type: "pdf" | "image";
  size: string;
  preview?: string;
}
