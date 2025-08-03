import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/environment';

interface CompressionOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  outputPath: string;
  success: boolean;
  error?: string;
}

class DocumentCompressionService {
  private uploadDir: string;
  private isEnabled: boolean;

  constructor() {
    this.uploadDir = config.UPLOAD_PATH || 'uploads';
    this.isEnabled = config.UPLOAD_COMPRESSION_ENABLED;
    
    // Ensure upload directory exists
    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
      console.log(`✅ Created upload directory: ${this.uploadDir}`);
    }
  }

  async compressImage(
    inputPath: string,
    outputPath?: string,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> {
    if (!this.isEnabled) {
      return {
        originalSize: 0,
        compressedSize: 0,
        compressionRatio: 1,
        outputPath: inputPath,
        success: true,
        error: 'Compression disabled'
      };
    }

    try {
      const {
        quality = config.UPLOAD_COMPRESSION_QUALITY || 80,
        maxWidth = config.UPLOAD_COMPRESSION_RESIZE_MAX_WIDTH || 1920,
        maxHeight = config.UPLOAD_COMPRESSION_RESIZE_MAX_HEIGHT || 1080,
        format = 'jpeg'
      } = options;

      // Get original file stats
      const originalStats = await fs.stat(inputPath);
      const originalSize = originalStats.size;

      // Generate output path if not provided
      const finalOutputPath = outputPath || this.generateOutputPath(inputPath, format);

      // Process image with sharp
      let sharpInstance = sharp(inputPath);

      // Get metadata to check current dimensions
      const metadata = await sharpInstance.metadata();
      
      // Resize if image is larger than max dimensions
      if (metadata.width && metadata.height) {
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          sharpInstance = sharpInstance.resize({
            width: maxWidth,
            height: maxHeight,
            fit: 'inside',
            withoutEnlargement: true
          });
        }
      }

      // Apply compression based on format
      switch (format.toLowerCase()) {
        case 'jpeg':
          sharpInstance = sharpInstance.jpeg({ quality, progressive: true });
          break;
        case 'png':
          sharpInstance = sharpInstance.png({ 
            compressionLevel: Math.round((100 - quality) / 10),
            progressive: true 
          });
          break;
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality });
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      // Save compressed image
      await sharpInstance.toFile(finalOutputPath);

      // Get compressed file stats
      const compressedStats = await fs.stat(finalOutputPath);
      const compressedSize = compressedStats.size;
      const compressionRatio = originalSize > 0 ? compressedSize / originalSize : 1;

      console.log(`✅ Image compressed: ${this.formatBytes(originalSize)} → ${this.formatBytes(compressedSize)} (${Math.round((1 - compressionRatio) * 100)}% reduction)`);

      return {
        originalSize,
        compressedSize,
        compressionRatio,
        outputPath: finalOutputPath,
        success: true
      };

    } catch (error: any) {
      console.error('❌ Image compression failed:', error);
      return {
        originalSize: 0,
        compressedSize: 0,
        compressionRatio: 1,
        outputPath: inputPath,
        success: false,
        error: error.message
      };
    }
  }

  async compressMultipleImages(
    inputPaths: string[],
    options: CompressionOptions = {}
  ): Promise<CompressionResult[]> {
    const results: CompressionResult[] = [];

    for (const inputPath of inputPaths) {
      try {
        const result = await this.compressImage(inputPath, undefined, options);
        results.push(result);
      } catch (error: any) {
        results.push({
          originalSize: 0,
          compressedSize: 0,
          compressionRatio: 1,
          outputPath: inputPath,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  async optimizeForWeb(inputPath: string, outputPath?: string): Promise<CompressionResult> {
    return this.compressImage(inputPath, outputPath, {
      quality: 85,
      maxWidth: 1920,
      maxHeight: 1080,
      format: 'webp'
    });
  }

  async createThumbnail(
    inputPath: string, 
    outputPath?: string, 
    size: number = 300
  ): Promise<CompressionResult> {
    try {
      const finalOutputPath = outputPath || this.generateThumbnailPath(inputPath);
      const originalStats = await fs.stat(inputPath);

      await sharp(inputPath)
        .resize({
          width: size,
          height: size,
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90, progressive: true })
        .toFile(finalOutputPath);

      const compressedStats = await fs.stat(finalOutputPath);

      return {
        originalSize: originalStats.size,
        compressedSize: compressedStats.size,
        compressionRatio: compressedStats.size / originalStats.size,
        outputPath: finalOutputPath,
        success: true
      };

    } catch (error: any) {
      return {
        originalSize: 0,
        compressedSize: 0,
        compressionRatio: 1,
        outputPath: inputPath,
        success: false,
        error: error.message
      };
    }
  }

  async getImageInfo(imagePath: string): Promise<{
    width?: number;
    height?: number;
    format?: string;
    size: number;
    density?: number;
    hasAlpha?: boolean;
  }> {
    try {
      const metadata = await sharp(imagePath).metadata();
      const stats = await fs.stat(imagePath);

      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: stats.size,
        density: metadata.density,
        hasAlpha: metadata.hasAlpha
      };
    } catch (error) {
      throw new Error(`Failed to get image info: ${error}`);
    }
  }

  private generateOutputPath(inputPath: string, format: string): string {
    const parsedPath = path.parse(inputPath);
    const timestamp = Date.now();
    return path.join(
      parsedPath.dir,
      `${parsedPath.name}_compressed_${timestamp}.${format}`
    );
  }

  private generateThumbnailPath(inputPath: string): string {
    const parsedPath = path.parse(inputPath);
    return path.join(
      parsedPath.dir,
      `${parsedPath.name}_thumb${parsedPath.ext}`
    );
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isCompressionEnabled(): boolean {
    return this.isEnabled;
  }

  getUploadDirectory(): string {
    return this.uploadDir;
  }

  getSupportedFormats(): string[] {
    return ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'gif'];
  }

  isImageFile(filename: string): boolean {
    const ext = path.extname(filename).toLowerCase().slice(1);
    return this.getSupportedFormats().includes(ext);
  }

  async cleanupOldFiles(directory: string, maxAgeHours: number = 24): Promise<number> {
    try {
      const files = await fs.readdir(directory);
      let deletedCount = 0;
      const cutoffTime = Date.now() - (maxAgeHours * 60 * 60 * 1000);

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime.getTime() < cutoffTime) {
          await fs.unlink(filePath);
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        console.log(`🧹 Cleaned up ${deletedCount} old compressed files`);
      }

      return deletedCount;
    } catch (error) {
      console.error('Error cleaning up old files:', error);
      return 0;
    }
  }

  getCompressionStats(): {
    enabled: boolean;
    defaultQuality: number;
    maxWidth: number;
    maxHeight: number;
    uploadDirectory: string;
    supportedFormats: string[];
  } {
    return {
      enabled: this.isEnabled,
      defaultQuality: config.UPLOAD_COMPRESSION_QUALITY || 80,
      maxWidth: config.UPLOAD_COMPRESSION_RESIZE_MAX_WIDTH || 1920,
      maxHeight: config.UPLOAD_COMPRESSION_RESIZE_MAX_HEIGHT || 1080,
      uploadDirectory: this.uploadDir,
      supportedFormats: this.getSupportedFormats()
    };
  }
}

// Create and export singleton instance
const documentCompressionService = new DocumentCompressionService();
export { documentCompressionService };
export default documentCompressionService;