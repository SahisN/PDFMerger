import type { FileItem } from '@/schema/types';
import { PDFDocument } from 'pdf-lib';

export const mergeFilesToPdf = async (files: FileItem[]): Promise<Blob> => {
  const mergedPdf = await PDFDocument.create();

  for (const fileItem of files) {
    const fileBytes = await fileItem.file.arrayBuffer();

    if (fileItem.type === 'pdf') {
      const pdf = await PDFDocument.load(fileBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    } else if (fileItem.type === 'image') {
      let image;
      if (fileItem.file.type === 'image/jpeg') {
        image = await mergedPdf.embedJpg(fileBytes);
      } else if (fileItem.file.type === 'image/png') {
        image = await mergedPdf.embedPng(fileBytes);
      }

      if (image) {
        const page = mergedPdf.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }
    }
  }

  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });
};
