/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'check/*' {}
declare module '*.lottie' {}
declare module '*.svg' {}
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module 'base64toblob' {
  function base64ToBlob(base64: any, mime: any): Blob;
  export = base64ToBlob;
}

declare module 'qrcode' {
  const qrcode: any;
  export = qrcode;
}

interface Window {
  scannerWorker: Worker;
  toastGroups: string[] | undefined;
}
