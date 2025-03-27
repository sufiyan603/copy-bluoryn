'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[540px] flex items-center justify-center bg-[#05668d]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="University Campus"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Find your ideal Master's programme
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12">
          Search from 76,000+ Master's programmes worldwide
        </p>
        <Card className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="What do you want to study?"
                className="pl-10 h-12"
              />
            </div>
            <div className="md:col-span-5 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Where do you want to study?"
                className="pl-10 h-12"
              />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full h-12 bg-[#ff7f00] hover:bg-[#ff9933]">
                Search
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}