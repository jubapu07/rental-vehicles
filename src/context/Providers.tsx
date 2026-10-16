"use client";

import React from "react";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { SavedCarsProvider } from "./SavedCarsContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SavedCarsProvider>{children}</SavedCarsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
