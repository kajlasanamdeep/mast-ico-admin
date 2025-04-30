
import React, { createContext, useState, useContext, useEffect } from "react";
import { Tokenomics, Roadmap } from "@/types/cmc";
import { initialTokenomics, initialRoadmap } from "@/data/cmcData";
import { toast } from "@/hooks/use-toast";

interface CmcContextType {
  tokenomics: Tokenomics;
  roadmap: Roadmap;
  updateTokenomics: (data: Tokenomics) => void;
  updateRoadmap: (data: Roadmap) => void;
  loading: boolean;
}

const CmcContext = createContext<CmcContextType | undefined>(undefined);

export const CmcProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tokenomics, setTokenomics] = useState<Tokenomics>(initialTokenomics);
  const [roadmap, setRoadmap] = useState<Roadmap>(initialRoadmap);

  // Load data from localStorage on init
  useEffect(() => {
    const storedTokenomics = localStorage.getItem("tokenomics");
    const storedRoadmap = localStorage.getItem("roadmap");

    if (storedTokenomics) {
      try {
        setTokenomics(JSON.parse(storedTokenomics));
      } catch (error) {
        console.error("Failed to parse tokenomics data:", error);
      }
    }

    if (storedRoadmap) {
      try {
        setRoadmap(JSON.parse(storedRoadmap));
      } catch (error) {
        console.error("Failed to parse roadmap data:", error);
      }
    }

    setLoading(false);
  }, []);

  // Update tokenomics
  const updateTokenomics = (data: Tokenomics) => {
    setTokenomics(data);
    localStorage.setItem("tokenomics", JSON.stringify(data));
    toast({
      title: "Success",
      description: "Tokenomics data has been updated successfully.",
    });
  };

  // Update roadmap
  const updateRoadmap = (data: Roadmap) => {
    setRoadmap(data);
    localStorage.setItem("roadmap", JSON.stringify(data));
    toast({
      title: "Success",
      description: "Roadmap data has been updated successfully.",
    });
  };

  return (
    <CmcContext.Provider
      value={{ tokenomics, roadmap, updateTokenomics, updateRoadmap, loading }}
    >
      {children}
    </CmcContext.Provider>
  );
};

export const useCmc = () => {
  const context = useContext(CmcContext);
  if (context === undefined) {
    throw new Error("useCmc must be used within a CmcProvider");
  }
  return context;
};
