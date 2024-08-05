import { FC } from 'react';
import { Button } from '@mui/material';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type Props = {
  onDrop: (acceptedFiles: any) => void;
  onDropRejected: (fileRejections: FileRejection[], event: DropEvent) => void;
  buttonText?: string;
};

export const CsvImport: FC<Props> = (props) => {
  const { onDrop, onDropRejected, buttonText = '在庫データ' } = props;

  // // CSVをドロップしたときに呼び出される処理
  // const onDrop = useCallback((acceptedFiles: any) => {
  //   acceptedFiles.forEach((file: any) => {
  //     const reader = new FileReader();
  //     reader.onabort = () => console.log('file reading was aborted');
  //     reader.onerror = () => console.log('file reading has failed');
  //     reader.onload = () => {
  //       const binaryStr = reader.result;
  //       // CSVのデータをコンソールに表示する
  //       console.log(binaryStr);
  //     };
  //     reader.readAsText(file);
  //   });
  // }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'text/csv': [],
    },
    maxFiles: 1,
  });

  return (
    <div className="App">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileUploadIcon />}
            // onClick={handleDownload}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
