'use client';

import { useState, useEffect, useMemo } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetDate: Date | string): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Memoize the target date to ensure it doesn't change on every render
  const memoizedTargetDate = useMemo(() => {
    return typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  }, [typeof targetDate === 'string' ? targetDate : targetDate.getTime()]);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const difference = memoizedTargetDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [memoizedTargetDate]);

  return countdown;
}
