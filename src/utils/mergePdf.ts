import type { FileItem } from "@/schema/types";
import { PDFDocument } from "pdf-lib";

export const mergeFilesToPdf = async (files: FileItem[]): Promise<Blob> => {
  const mergedPdf = await PDFDocument.create();

  // A4 size in points: width = 595.28, height = 841.89
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;

  for (const fileItem of files) {
    const fileBytes = await fileItem.file.arrayBuffer();

    if (fileItem.type === "pdf") {
      const pdf = await PDFDocument.load(fileBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => {
        // Resize copied pages to match standard size if needed
        page.setSize(PAGE_WIDTH, PAGE_HEIGHT);
        mergedPdf.addPage(page);
      });
    } else if (fileItem.type === "image") {
      let image;
      let originalWidth = 0;
      let originalHeight = 0;

      if (fileItem.file.type === "image/jpeg") {
        image = await mergedPdf.embedJpg(fileBytes);
      } else if (fileItem.file.type === "image/png") {
        image = await mergedPdf.embedPng(fileBytes);
      }

      if (image) {
        originalWidth = image.width;
        originalHeight = image.height;

        // Scale image to fit inside the page
        const scale = Math.min(
          PAGE_WIDTH / originalWidth,
          PAGE_HEIGHT / originalHeight
        );

        const scaledWidth = originalWidth * scale;
        const scaledHeight = originalHeight * scale;

        const x = (PAGE_WIDTH - scaledWidth) / 2;
        const y = (PAGE_HEIGHT - scaledHeight) / 2;

        const page = mergedPdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        page.drawImage(image, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }
    }
  }

  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([new Uint8Array(mergedPdfBytes)], {
    type: "application/pdf",
  });
};
