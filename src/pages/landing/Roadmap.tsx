
import RoadmapDisplay from "@/components/cmc/RoadmapDisplay";

const RoadmapPage = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Project Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our development timeline and future plans
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <RoadmapDisplay />
      </div>
    </div>
  );
};

export default RoadmapPage;
