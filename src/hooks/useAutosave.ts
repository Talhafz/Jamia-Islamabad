'use client';

import { useEffect, useState, useRef } from 'react';

export function useAutosave<T>(
  data: T,
  key: string,
  delay: number = 1000
) {
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  // Stringify data to avoid infinite re-renders from reference changes
  const dataString = JSON.stringify(data);

  // Load initial draft if it exists
  const getDraft = (): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to load draft from localStorage', e);
      return null;
    }
  };

  // Clear draft from local storage
  const clearDraft = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
      setLastSaved(null);
    } catch (e) {
      console.error('Failed to clear draft from localStorage', e);
    }
  };

  useEffect(() => {
    // Avoid saving on mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsSaving(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, dataString);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLastSaved(timeString);
      } catch (e) {
        console.error('Failed to autosave draft', e);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [dataString, key, delay]);

  return { lastSaved, isSaving, getDraft, clearDraft };
}
