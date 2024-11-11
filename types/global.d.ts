declare global {
    var Readable: typeof import('stream').Readable;
    var Writable: typeof import('stream').Writable;
  }
  
  export {}; // This is required to make this file a module and avoid potential conflicts
  