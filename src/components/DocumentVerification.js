import React, { useState } from 'react';
import '../Styles/DocumentVerification.css';
import { useNavigate } from 'react-router-dom';

const DocumentVerification = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const userId=localStorage.getItem('userId');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };
  const handleRemoveFile = () => {
    setFile(null); // Remove the uploaded file
  };
  const verifyDocument = async (userId) => {
    try {
      const res = await fetch(`http://localhost:7777/user/document/verify?userId=${userId}`, {
        method: 'PUT',
      });
      const data = await res.json();
      console.log('Document verified:', data);
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  };
  

  const handleUpload = async () => {
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', Number(userId));

    try {
      const res = await fetch('http://localhost:7777/user/document/upload', {
        method: 'POST',
        body: formData,
        headers:{
          
        }
      });
      const data = await res.text();
      setResponse(data);

      await verifyDocument(userId);

      navigate('/result', {
        state: {
          success: true,
          message: 'Document uploaded and verified successfully!',
          aadhaarNumber: data.aadhaarNumber,
          name: data.name,
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
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
      <div className="card1">
        <h1>Document Upload and Verification</h1>
        <div
          className={`dropbox ${dragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="fileDisplay">
              <p>File: {file.name}</p>
              <button className="removeFile" onClick={handleRemoveFile}>❌</button>
            </div>
          ) : (
            <>
              <p>Drag & drop your file here or click to select</p>
              <input type="file" onChange={handleFileChange} className="fileInput" />
            </>
          )}
        </div>
        <button className="button1" onClick={handleUpload} disabled={!file}>Upload Document</button>
        {response && (
          <div className="response">
            <h2>Server Response:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentVerification;






/*import React, { useState } from 'react';
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

export default DocumentVerification;*/
