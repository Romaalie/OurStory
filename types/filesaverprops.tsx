export interface FileSaverProps {
    fromUri: string;
    toUri: string;
    onSave: (uri: string) => void;
  }