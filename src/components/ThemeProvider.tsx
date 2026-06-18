'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Force light mode on mount
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: false, toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
