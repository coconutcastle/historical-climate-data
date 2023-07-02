import React from 'react';
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary: React.FC = () => {

  const error = useRouteError();
  let errorMessage: string;

  console.log('active', error);

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div>
      <div>Something went wrong...</div>
      <div>{errorMessage}</div>
    </div>
  )
}

export default ErrorBoundary;