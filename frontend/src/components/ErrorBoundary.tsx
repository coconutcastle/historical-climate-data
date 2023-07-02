import React, { useState, useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

interface ErrorDetails {
  status: string,
  name: string,
  cause: string,
  message: string,
}

const ErrorBoundary: React.FC = () => {

  const error = useRouteError();
  const navigate = useNavigate();

  const [errorDetails, setErrorDetails] = useState<ErrorDetails>({
    status: 'N/A',
    name: 'N/A',
    cause: 'N/A',
    message: 'N/A'
  });

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setErrorDetails({
        status: `${error.status}`,
        name: 'N/A',
        cause: 'N/A',
        message: error.data.message || error.statusText
      });
    } else if (error instanceof Error) {
      setErrorDetails({
        status: 'N/A',
        name: error.name,
        cause: typeof error.cause === 'string' ? error.cause : 'Unknown',
        message: error.message
      });
    } else if (typeof error === 'string') {
      setErrorDetails({
        status: 'N/A',
        name: 'N/A',
        cause: 'N/A',
        message: error
      });
    } else {
      console.error(error);
      setErrorDetails({
        status: 'Unknown',
        name: 'Unknown',
        cause: 'Unknown',
        message: 'Unknown'
      });
    }
  }, [error]);

  return (
    <div className="data-content" style={{ minHeight: '100vh' }}>
      <div className='title'>
        Something went wrong...
      </div>
      <hr style={{ width: "100%" }} />
      <div className="plain-section">
        <p><b>Error Status Code: </b>{errorDetails.status}</p>
        <p><b>Name: </b>{errorDetails.name}</p>
        <p><b>Cause: </b>{errorDetails.cause}</p>
        <p><b>Details: </b></p>
        <p>{errorDetails.message}</p>
      </div>
      <button className='big-button' onClick={() => navigate('/')}>
        <div className='button-text'>
          BACK TO HOMEPAGE
        </div>
        <i className='material-icons'>play_arrow</i>
      </button>
    </div>
  )
}

export default ErrorBoundary;