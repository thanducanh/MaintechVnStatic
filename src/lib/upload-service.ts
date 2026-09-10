import fs from "fs/promises";
import path from "path";

export interface IUploadService {
  uploadFile(file: File, folder: string, module?: string, userId?: number): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

/**
 * Local Disk Upload Service implementation.
 * Easily swappable with AWS S3 / Cloud Storage in the future.
 */
class LocalUploadService implements IUploadService {
  async uploadFile(file: File, folder: string, module?: string, userId?: number): Promise<string> {
    try {
      if (!file || typeof file.arrayBuffer !== "function" || file.size <= 0) {
        throw new Error("No valid file was provided");
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
      const fileName = `${Date.now()}_${cleanFileName}`;
      const uploadDir = path.join(process.cwd(), "public/uploads", folder);
      
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      
      const storagePath = `/uploads/${folder}/${fileName}`;

      return storagePath;
    } catch (error: any) {
      console.error("LocalUploadService: Error uploading file", error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      if (!fileUrl.startsWith("/uploads/")) {
        throw new Error("Invalid file path for deletion");
      }
      
      const filePath = path.join(process.cwd(), "public", fileUrl);
      await fs.unlink(filePath);
    } catch (error: any) {
      console.warn(`LocalUploadService: Could not delete file ${fileUrl}:`, error.message);
    }
  }
}

// Instantiate and export the service.
// To switch to S3 later, just replace this with an S3UploadService instance.
export const uploadService: IUploadService = new LocalUploadService();
