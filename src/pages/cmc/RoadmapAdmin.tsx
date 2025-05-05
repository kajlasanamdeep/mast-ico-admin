
import { useState } from "react";
import { useCmc } from "@/contexts/CmcContext";
import { RoadmapMilestone } from "@/types/cmc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const RoadmapAdmin = () => {
  const { roadmap, updateRoadmap } = useCmc();
  
  const [formData, setFormData] = useState({
    title: roadmap.title,
    description: roadmap.description,
    milestones: [...roadmap.milestones]
  });

  // Handle basic text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle milestone changes
  const handleMilestoneChange = (index: number, field: keyof RoadmapMilestone, value: string | boolean) => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      milestones: updatedMilestones
    });
  };

  // Add new milestone
  const addMilestone = () => {
    if (formData.milestones.length >= 20) {
      toast({
        title: "Error",
        description: "Maximum of 20 milestones allowed",
        variant: "destructive",
      });
      return;
    }
    
    const newMilestone: RoadmapMilestone = {
      id: uuidv4(),
      title: "New Milestone",
      description: "Description for this milestone",
      quarter: "Q1",
      year: new Date().getFullYear().toString(),
      completed: false
    };
    
    setFormData({
      ...formData,
      milestones: [...formData.milestones, newMilestone]
    });
  };

  // Remove milestone
  const removeMilestone = (index: number) => {
    const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      milestones: updatedMilestones
    });
  };

  // Move milestone up or down
  const moveMilestone = (fromIndex: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && fromIndex === 0) || 
      (direction === 'down' && fromIndex === formData.milestones.length - 1)
    ) {
      return;
    }
    
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    const updatedMilestones = [...formData.milestones];
    const [movedItem] = updatedMilestones.splice(fromIndex, 1);
    updatedMilestones.splice(toIndex, 0, movedItem);
    
    setFormData({
      ...formData,
      milestones: updatedMilestones
    });
  };

  // Save changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate there's at least one milestone
    if (formData.milestones.length === 0) {
      toast({
        title: "Validation Error",
        description: "You need to add at least one milestone",
        variant: "destructive",
      });
      return;
    }
    
    updateRoadmap(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Roadmap</h2>
          <p className="text-muted-foreground">
            Define the timeline and milestones for your project
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Roadmap Information</CardTitle>
            <CardDescription>
              Basic information about your project roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Roadmap Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={formData.title} 
                  onChange={handleInputChange}
                  placeholder="e.g., MAST Project Roadmap"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description" 
                  name="description"
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Provide a brief overview of your roadmap"
                  rows={3}
                />
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription className="flex justify-between items-center">
              <span>Define the key milestones for your project</span>
              <Button type="button" size="sm" onClick={addMilestone}>
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.milestones.length === 0 ? (
              <div className="text-center p-6 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No milestones yet. Add your first milestone to get started.</p>
              </div>
            ) : (
              formData.milestones.map((milestone, index) => (
                <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" /> */}
                      <h3 className="font-medium">Milestone {index + 1}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => moveMilestone(index, 'up')} 
                        disabled={index === 0}
                        className="h-8 w-8"
                      >
                        ↑
                        <span className="sr-only">Move Up</span>
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => moveMilestone(index, 'down')} 
                        disabled={index === formData.milestones.length - 1}
                        className="h-8 w-8"
                      >
                        ↓
                        <span className="sr-only">Move Down</span>
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeMilestone(index)} 
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${index}`}>Title</Label>
                      <Input 
                        id={`title-${index}`} 
                        value={milestone.title} 
                        onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        placeholder="e.g., Launch Beta Version"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-1/3 space-y-2">
                        <Label htmlFor={`quarter-${index}`}>Quarter</Label>
                        <select 
                          id={`quarter-${index}`}
                          value={milestone.quarter}
                          onChange={(e) => handleMilestoneChange(index, 'quarter', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="Q1">Q1</option>
                          <option value="Q2">Q2</option>
                          <option value="Q3">Q3</option>
                          <option value="Q4">Q4</option>
                        </select>
                      </div>
                      <div className="w-1/3 space-y-2">
                        <Label htmlFor={`year-${index}`}>Year</Label>
                        <Input 
                          id={`year-${index}`} 
                          value={milestone.year} 
                          onChange={(e) => handleMilestoneChange(index, 'year', e.target.value)}
                          placeholder="2024"
                        />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <Label htmlFor={`completed-${index}`} className="block mb-1">Completed</Label>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`completed-${index}`} 
                            checked={milestone.completed}
                            onCheckedChange={(checked) => handleMilestoneChange(index, 'completed', checked)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {milestone.completed ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea 
                      id={`description-${index}`} 
                      value={milestone.description} 
                      onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                      placeholder="Describe what this milestone involves"
                      rows={2}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto" onClick={handleSubmit}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RoadmapAdmin;
