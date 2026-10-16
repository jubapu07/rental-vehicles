"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SavedCarsContextType {
  savedIds: string[];
  toggleSave: (carId: string) => void;
  isSaved: (carId: string) => boolean;
  count: number;
}

const SavedCarsContext = createContext<SavedCarsContextType>({
  savedIds: [],
  toggleSave: () => {},
  isSaved: () => false,
  count: 0,
});

export function SavedCarsProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(["mahindra-thar-2024", "toyota-innova-hycross-2024"]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pravaas_saved_cars");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSave = (carId: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId];
      try {
        localStorage.setItem("pravaas_saved_cars", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isSaved = (carId: string) => savedIds.includes(carId);

  return (
    <SavedCarsContext.Provider value={{ savedIds, toggleSave, isSaved, count: savedIds.length }}>
      {children}
    </SavedCarsContext.Provider>
  );
}

export const useSavedCars = () => useContext(SavedCarsContext);
