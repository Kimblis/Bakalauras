/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

export const useScreenMedia = ({ min = 0, max = Number.POSITIVE_INFINITY } = {}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', ({ target }) => setScreenWidth((target as any).innerWidth), true);
  }, []);

  return {
    matches: screenWidth < max && screenWidth > min,
    screenWidth,
  };
};
