import React, {useEffect, useState } from 'react';
import '../Styles/DocumentVerification.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const DocumentVerification = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //const userId=localStorage.getItem('userId');
  
  const planId=localStorage.getItem('planId');

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
 
      try {
        const response = await axios.post(
          "http://localhost:7777/user/profile",
          {
            username,
            password,
          }
        );
 
        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          setError("Failed to retrieve user details");
        }
      } catch (err) {
        setError("Error occurred while fetching data");
      } finally {
      }
    };
 
    fetchUserDetails();
  }, [navigate]);
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
  // const verifyDocument = async (userId) => {
  //   try {
  //     const res = await fetch(`http://localhost:7777/user/document/verify?userId=${userId}`, {
  //       method: 'PUT',
  //     });
  //     const data = await res.json();
  //     console.log('Document verified:', data);
  //   } catch (error) {
  //     console.error('Error verifying document:', error);
  //   }
  // };
  

  const handleUpload = async () => {
    console.log(planId);
    if (!file) {
      alert("Please upload a file!");
      return;
    }
    setLoading(true);
    const userId=userDetails.userId;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', Number(userId));

    try {
      const res = await fetch('http://localhost:7777/user/document/upload', {
        method: 'POST',
        body: formData,
        
      });
      const data = await res.text();
      setResponse(data);

      const verificationRes = await fetch(`http://localhost:7777/user/document/status?userId=${userId}`);
      const isVerified = await verificationRes.json();

      //await verifyDocument(userId);

      navigate('/result', {
        state: {
          success: isVerified,
          message: isVerified ? 'Document verified successfully! To activate your plan, click on Activate Plan button.' : 'Your document verification failed.! Please upload the correct document.',
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
              <button className="removeFile" onClick={handleRemoveFile}>Remove</button>
            </div>
          ) : (
            <>
              <p>Drag & drop your file here or click to select</p>
              <input type="file" onChange={handleFileChange} className="fileInput" />
            </>
          )}
        </div>

        {loading ? (
          <div className="loading-spinner">Verifying document...</div> // Show loading spinner
        ) : (
          <button className="button1" onClick={handleUpload}>Upload Document</button>
        )}


        {/* <button className="button1" onClick={handleUpload} >Upload Document</button> */}
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

/*import React, {useEffect, useState } from 'react';
import '../Styles/DocumentVerification.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";

const DocumentVerification = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  //const userId=localStorage.getItem('userId');
  
  const planId=localStorage.getItem('planId');

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
 
      try {
        const response = await axios.post(
          "http://localhost:7777/user/profile",
          {
            username,
            password,
          }
        );
 
        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          setError("Failed to retrieve user details");
        }
      } catch (err) {
        setError("Error occurred while fetching data");
      } finally {
      }
    };
 
    fetchUserDetails();
  }, [navigate]);
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
  // const verifyDocument = async (userId) => {
  //   try {
  //     const res = await fetch(`http://localhost:7777/user/document/verify?userId=${userId}`, {
  //       method: 'PUT',
  //     });
  //     const data = await res.json();
  //     console.log('Document verified:', data);
  //   } catch (error) {
  //     console.error('Error verifying document:', error);
  //   }
  // };
  

  const handleUpload = async () => {
    console.log(planId);
    if (!file) {
      alert("Please upload a file!");
      return;
    }
    const userId=userDetails.userId;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', Number(userId));

    try {
      const res = await fetch('http://localhost:7777/user/document/upload', {
        method: 'POST',
        body: formData,
        
      });
      const data = await res.text();
      setResponse(data);

      const verificationRes = await fetch(`http://localhost:7777/user/document/status?userId=${userId}`);
      const isVerified = await verificationRes.json();

      //await verifyDocument(userId);

      navigate('/result', {
        state: {
          success: isVerified,
          message: isVerified ? 'Document verified successfully! To activate your plan, click on Activate Plan button.' : 'Your document verification failed.! Please upload the correct document.',
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
              <button className="removeFile" onClick={handleRemoveFile}>Remove</button>
            </div>
          ) : (
            <>
              <p>Drag & drop your file here or click to select</p>
              <input type="file" onChange={handleFileChange} className="fileInput" />
            </>
          )}
        </div>
        <button className="button1" onClick={handleUpload} >Upload Document</button>
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
*/