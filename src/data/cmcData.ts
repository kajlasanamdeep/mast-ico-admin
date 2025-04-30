
import { Tokenomics, Roadmap } from "@/types/cmc";

export const initialTokenomics: Tokenomics = {
  totalSupply: "100,000,000",
  tokenSymbol: "MAST",
  initialPrice: "$0.05",
  tokenAllocations: [
    { category: "Public Sale", percentage: 40, color: "#3b82f6" },
    { category: "Team", percentage: 20, color: "#10b981" },
    { category: "Reserve", percentage: 15, color: "#f97316" },
    { category: "Marketing", percentage: 10, color: "#8b5cf6" },
    { category: "Advisors", percentage: 10, color: "#f43f5e" },
    { category: "Ecosystem", percentage: 5, color: "#fbbf24" }
  ],
  description: "MAST token is the utility token for the platform. It provides governance rights, staking rewards, and transaction fee discounts."
};

export const initialRoadmap: Roadmap = {
  title: "MAST ICO Roadmap",
  description: "Our strategic plan for development and growth over the coming years.",
  milestones: [
    {
      id: "q1-2023",
      title: "Project Inception",
      description: "Initial concept development, team formation, and whitepaper creation.",
      quarter: "Q1",
      year: "2023",
      completed: true
    },
    {
      id: "q2-2023",
      title: "Seed Funding",
      description: "Securing initial investment from strategic partners and early believers.",
      quarter: "Q2",
      year: "2023",
      completed: true
    },
    {
      id: "q3-2023",
      title: "Platform Development",
      description: "Building the core platform infrastructure and smart contract development.",
      quarter: "Q3",
      year: "2023",
      completed: true
    },
    {
      id: "q4-2023",
      title: "Private Sale",
      description: "Opening token sales to private investors and early adopters.",
      quarter: "Q4",
      year: "2023",
      completed: true
    },
    {
      id: "q1-2024",
      title: "Public ICO",
      description: "Launching the public Initial Coin Offering for widespread participation.",
      quarter: "Q1",
      year: "2024",
      completed: true
    },
    {
      id: "q2-2024",
      title: "Exchange Listings",
      description: "Listing MAST tokens on major cryptocurrency exchanges.",
      quarter: "Q2",
      year: "2024",
      completed: false
    },
    {
      id: "q3-2024",
      title: "Platform Expansion",
      description: "Adding new features and expanding the ecosystem with strategic partnerships.",
      quarter: "Q3",
      year: "2024",
      completed: false
    },
    {
      id: "q4-2024",
      title: "Global Expansion",
      description: "Expanding to new markets and increasing user adoption worldwide.",
      quarter: "Q4",
      year: "2024",
      completed: false
    }
  ]
};
