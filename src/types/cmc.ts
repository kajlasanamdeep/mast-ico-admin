
export interface TokenAllocation {
  category: string;
  percentage: number;
  color: string;
}

export interface Tokenomics {
  totalSupply: string;
  tokenSymbol: string;
  initialPrice: string;
  tokenAllocations: TokenAllocation[];
  description: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  quarter: string;
  year: string;
  completed: boolean;
}

export interface Roadmap {
  title: string;
  description: string;
  milestones: RoadmapMilestone[];
}
