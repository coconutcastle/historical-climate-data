import { useState } from "react";

export default function UploadData() {

  const [file, setFile] = useState<any>('Uploaded file will be displayed here.');

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
          const reader = new FileReader();
          reader.onload = () => { setFile(reader.result) }
          reader.readAsText(e.target.files[0]);
        }}/>
      </button>
      <textarea className="text-area w-100 mt-4" style={{ minHeight: '300px', whiteSpace: 'pre' }} value={file} onChange={() => { }} />
    </div>
  )
}