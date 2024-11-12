export interface FileSaverProps {
    fromUri: string;
    toUri: string;
    onSave: ({localImage, dropboxPath}: {localImage: string; dropboxPath: string}) => void;
  }