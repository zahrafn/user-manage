'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}

function logError(error: Error) {
  // client log
  console.error('Route Error:', error);

//   server log
//   fetch('/api/log-error', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       message: error.message,
//       stack: error.stack,
//       route: window.location.pathname,
//       time: new Date().toISOString(),
//     }),
//   }).catch((e) => console.error('Failed to log error', e));
}
