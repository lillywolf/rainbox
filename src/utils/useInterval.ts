
import React, { useState, useEffect, useRef } from 'react'; 
  
export default function useInterval(callback, delay) { 
  const savedCallback = useRef(); 

  useEffect(() => { 
    savedCallback.current = callback; 
  }, [callback]); 

  useEffect(() => { 
    function func() { 
      savedCallback.current(); 
    } 

    if (delay !== null) { 
      let id = setInterval(func, delay); 

      return () => clearInterval(id); 
    } 
  }, [delay]); 
}
