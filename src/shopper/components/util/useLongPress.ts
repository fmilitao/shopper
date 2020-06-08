import { useState, useEffect, useCallback } from 'react';

// FIXME: should this be on release?
export default function useLongPress(callback: () => void, ms: number) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    if (startLongPress) {
      const timerId = setTimeout(callback, ms);

      // called on clean up
      return () => clearTimeout(timerId);
    }
    // else let it clean up.
  }, [callback, ms, startLongPress]);

  const start = useCallback(() => setStartLongPress(true), []);
  const stop = useCallback(() => setStartLongPress(false), []);

  return {
    // start
    onMouseDown: start,
    onTouchStart: start,
    // end
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}
