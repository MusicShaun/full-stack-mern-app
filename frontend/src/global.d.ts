export {};

declare global {
  interface Window {
    cloudinary: any;
    gtag: (...args: any[]) => void;
  }
}