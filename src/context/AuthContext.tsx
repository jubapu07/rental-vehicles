"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserKYCState } from "@/lib/types";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  avatarUrl?: string;
  kyc: UserKYCState;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  requestPhoneOtp: (phone: string) => Promise<{ success: boolean; message: string; otpPreview?: string }>;
  verifyPhoneOtp: (phone: string, otp: string, name?: string) => Promise<{ success: boolean; message: string }>;
  signInWithEmail: (email: string, name?: string) => Promise<{ success: boolean }>;
  signOut: () => void;
  submitKyc: (drivingLicense: string, expiry: string, maskedAadhaar: string) => Promise<{ success: boolean }>;
}

const DEFAULT_KYC: UserKYCState = {
  drivingLicenseNumber: "DL-0420180054321",
  dlExpiryDate: "2032-12-31",
  dlVerified: true,
  idProofType: "AADHAAR",
  maskedAadhaar: "XXXX-XXXX-8924",
  isVerified: true,
  submittedAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  requestPhoneOtp: async () => ({ success: false, message: "" }),
  verifyPhoneOtp: async () => ({ success: false, message: "" }),
  signInWithEmail: async () => ({ success: false }),
  signOut: () => {},
  submitKyc: async () => ({ success: false }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pravaas_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Pre-populate with verified demo customer for instant testing
        const defaultDemoUser: AuthUser = {
          id: "usr-demo-in",
          name: "Arunav Deshmukh",
          phone: "9876543210",
          email: "arunav@pravaas.in",
          role: "CUSTOMER",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          kyc: DEFAULT_KYC,
        };
        setUser(defaultDemoUser);
        localStorage.setItem("pravaas_auth_user", JSON.stringify(defaultDemoUser));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestPhoneOtp = async (phone: string): Promise<{ success: boolean; message: string; otpPreview?: string }> => {
    // Validate Indian phone number: 10 digits starting with 6, 7, 8, or 9
    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return { success: false, message: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)." };
    }

    // In demo environment, OTP is always 123456
    return {
      success: true,
      message: `OTP sent to +91 ${cleanPhone}. Use test OTP: 123456`,
      otpPreview: "123456",
    };
  };

  const verifyPhoneOtp = async (phone: string, otp: string, name = "Indian Explorer"): Promise<{ success: boolean; message: string }> => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (otp !== "123456" && otp.length !== 6) {
      return { success: false, message: "Invalid OTP. For test mode, enter 123456" };
    }

    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name: name || `Traveler +91 ${cleanPhone.slice(-4)}`,
      phone: cleanPhone,
      email: `${cleanPhone}@pravaas.user`,
      role: "CUSTOMER",
      kyc: DEFAULT_KYC,
    };

    setUser(newUser);
    try {
      localStorage.setItem("pravaas_auth_user", JSON.stringify(newUser));
    } catch {
      // ignore
    }

    return { success: true, message: "Logged in successfully via +91 OTP!" };
  };

  const signInWithEmail = async (email: string, name = "Pravaas Guest"): Promise<{ success: boolean }> => {
    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name,
      phone: "9876543210",
      email,
      role: email.includes("admin") ? "ADMIN" : "CUSTOMER",
      kyc: DEFAULT_KYC,
    };
    setUser(newUser);
    try {
      localStorage.setItem("pravaas_auth_user", JSON.stringify(newUser));
    } catch {
      // ignore
    }
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem("pravaas_auth_user");
    } catch {
      // ignore
    }
  };

  const submitKyc = async (drivingLicense: string, expiry: string, maskedAadhaar: string): Promise<{ success: boolean }> => {
    if (!user) return { success: false };

    const updatedUser: AuthUser = {
      ...user,
      kyc: {
        drivingLicenseNumber: drivingLicense.toUpperCase(),
        dlExpiryDate: expiry,
        dlVerified: true,
        idProofType: "AADHAAR",
        maskedAadhaar: maskedAadhaar.startsWith("XXXX") ? maskedAadhaar : `XXXX-XXXX-${maskedAadhaar.slice(-4)}`,
        isVerified: true,
        submittedAt: new Date().toISOString(),
      },
    };

    setUser(updatedUser);
    try {
      localStorage.setItem("pravaas_auth_user", JSON.stringify(updatedUser));
    } catch {
      // ignore
    }
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        requestPhoneOtp,
        verifyPhoneOtp,
        signInWithEmail,
        signOut,
        submitKyc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
