// Intersection Observer API is a browser API that provides a way to asynchronously observe changes 
// in the intersection of a target element with an ancestor element or with a top-level document's viewport.
import { MutableRefObject, useEffect, useRef, useState } from "react";

type UseLazyLoadReturn = [MutableRefObject<HTMLImageElement | null>, boolean];
type IntersectionObserverOptions = IntersectionObserverInit;

export const useLazyLoad = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};