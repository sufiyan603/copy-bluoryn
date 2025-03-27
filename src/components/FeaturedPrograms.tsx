'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

function ProgramCard({ 
  title, 
  university, 
  location, 
  duration, 
  tuition, 
  image 
}: {
  title: string;
  university: string;
  location: string;
  duration: string;
  tuition: string;
  image: string;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Button variant="secondary" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 text-blue-600 hover:text-blue-700">
          {title}
        </h3>
        <p className="text-gray-900 font-medium mb-1">{university}</p>
        <p className="text-gray-600 text-sm mb-4">{location}</p>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>{duration}</span>
          <span>{tuition}</span>
        </div>
        <Button className="w-full">View programme</Button>
      </div>
    </Card>
  );
}

export default function FeaturedPrograms() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Master's programmes</h2>
          <Button variant="outline" className="hidden md:inline-flex">View all programmes</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ProgramCard
              key={i}
              title="Master of Science in Data Science"
              university="Technical University of Munich"
              location="Munich, Germany"
              duration="2 years"
              tuition="€20,000/year"
              image={`https://images.unsplash.com/photo-${i + 1516259762121}-94207942de37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
            />
          ))}
        </div>
        <Button variant="outline" className="w-full mt-6 md:hidden">View all programmes</Button>
      </div>
    </section>
  );
}