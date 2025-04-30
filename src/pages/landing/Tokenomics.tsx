
import TokenomicsDisplay from "@/components/cmc/TokenomicsDisplay";

const TokenomicsPage = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Tokenomics</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn about the MAST token distribution and economics
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <TokenomicsDisplay />
      </div>
    </div>
  );
};

export default TokenomicsPage;
