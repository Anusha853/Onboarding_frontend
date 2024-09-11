import React, { useState } from 'react';
import '../Styles/DocumentVerification.css';
import { useNavigate } from 'react-router-dom';

const DocumentVerification = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:7777/user/document/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data);

        // Navigate to result page with state
        navigate('/result', {
          state: {
            success: true,
            message: 'Document uploaded successfully!',
            aadhaarNumber: data.aadhaarNumber,
            name: data.name
          }
        });

    } catch (error) {
      console.error('Error uploading file:', error);
       // Navigate to result page with failure state
       navigate('/result', {
        state: {
          success: false,
          message: 'Error uploading document.'
        }
      });


    }
  };

  return (
    <div className="docVerify">
      <h1>Document Upload and Verification</h1>
      <input type="file" onChange={handleFileChange} />
      <button className='button1' onClick={handleUpload}>Upload Document</button>
      {response && (
        <div className="response">
          <h2>Server Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DocumentVerification;
