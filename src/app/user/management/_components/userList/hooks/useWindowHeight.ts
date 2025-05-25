import { useState, useEffect } from 'react';

export function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowHeight;
}
