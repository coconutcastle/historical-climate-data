import { useContext, useState } from "react";
import { DataContext } from "../../App";

export default function UploadData() {

  const [file, setFile] = useState<any>('Uploaded file will be displayed here.');
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);
  const { setData, setDataFormat } = useContext(DataContext);

  return (
    <div className="params-section">
      <div className='heading-1'>
        Upload data to visualize
      </div>
      <div className="mt-2">Upload a data file in either CSV, JSON, or TEXT format.</div>
      <button className="med-button" style={{ position: 'relative' }}>
        <div className="med-button-text">UPLOAD FILE</div>
        <i className='material-icons ms-2'>upload_outlined</i>
        <input type='file' className='hidden-input' accept='.csv,.json,.txt'
          onInput={(e: any) => {
            setUploadError(undefined);
            const reader = new FileReader();

            reader.onload = () => {
              if (typeof reader.result === 'string') {
                // check for file extensions
                const extension = (e.target.files[0].name).match(/.+\.([a-z]+)/);
                if (['csv', 'json', 'txt'].includes(extension[1])) {
                  setFile(reader.result);
                  setData(reader.result);
                  setDataFormat(extension[1]);
                } else {
                  setUploadError('Unsupported file type.')
                };
              } else {
                setUploadError('Error reading file.')
              };
            };

            try {
              reader.readAsText(e.target.files[0]);
            } catch (error) {
              console.log('Failed to read file.');  // more warning necessary?
            };
          }} />
      </button>
      {uploadError && (
        <div className="text-field-error pt-1 mt-1">{uploadError}</div>
      )}
      <textarea className="text-area w-100 mt-4" style={{ minHeight: '300px', whiteSpace: 'pre' }} value={file} onChange={() => { }} />
    </div>
  )
}