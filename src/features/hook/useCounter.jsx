import { useState, useEffect } from 'react';

function useCounter(defaultValue) {
  const [count, setCount] = useState(defaultValue);
  useEffect(() => {
  }, [count]);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return [count, increment, decrement];
}

export default useCounter;