import { useCallback } from 'react';

export default function useTheme() {
  const toggle = useCallback(() => {
    const current = localStorage.getItem('theme') || 'dark';
    const themes = ['dark', 'light', 'blue'];
    const idx = themes.indexOf(current as string);
    const next = themes[(idx + 1) % themes.length];
    localStorage.setItem('theme', next);
    document.documentElement.className = next;
  }, []);
  return { toggle };
}
