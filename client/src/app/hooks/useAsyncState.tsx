"use client";
import { useState, useEffect, useRef } from 'react';

const useAsyncState = <T,>(initialState: T): [T, (newState: T) => Promise<void>] => {
  const [state, setState] = useState(initialState);
  const resolverRef = useRef<((value: void | PromiseLike<void>) => void) | null>(null); // Ref to store the resolver function

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(); // Resolve the promise ...without the updated state
      resolverRef.current = null; // Clear the resolver
    }
  }, [state]);

  const setAsyncState = (newState: T): Promise<void> => {
    setState(newState); // Update the state
    return new Promise((resolve) => {
      resolverRef.current = resolve; // Store the resolver function
    });
  };

  return [state, setAsyncState]; // Return the state and the async setter
};

export default useAsyncState;
