'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, ChevronDown, MessageCircle, Plane, GraduationCap, Globe, } from 'lucide-react';
import { Input } from './ui/input';
import ResourceDropdown from './ui/resourcedrop';
import DisciplinesDropdown from './ui/disciplinedrop';

const disciplines = [
  'Agriculture & Forestry',
  'Applied Sciences & Professions',
  'Arts, Design & Architecture',
  'Business & Management',
  'Computer Science & IT',
  'Education & Training',
  'Engineering & Technology',
  'Environmental Studies & Earth Sciences',
  'Hospitality, Leisure & Sports',
  'Humanities',
  'Journalism & Media',
  'Law',
  'Medicine & Health',
  'Natural Sciences & Mathematics',
  'Social Sciences'
];

const resource = [
  "Find your scholarship to study abroad",
  "What Is a Transcript of Records and When Do Students Need One?",
  "Write a Successful Motivation Letter for Your Master's",
  "How to Apply to Universities Worldwide and Tips for Being Accepted",
  "What Documents Do You Need to Apply for a University Abroad?",
  "6 Steps to Writing an Awesome Academic CV for Master’s Application",

];


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDisciplines, setShowDisciplines] = useState(false);
  const [showResource, setShowResource] = useState(false)
  // const [showCountries, setShowCountries] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 mr-8">
                Bluoryn
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <div className="relative">
                  {/* Button to Toggle Dropdown */}
                  <button onClick={() => setShowDisciplines(!showDisciplines)} className="flex items-center text-gray-700 hover:text-blue-600">
                    <GraduationCap className="h-5 w-5 mr-2" /> Disciplines
                  </button>
                  <DisciplinesDropdown disciplines={disciplines} showDisciplines={showDisciplines} setShowDisciplines={setShowDisciplines} />
                </div>
                <Link href="/countries" legacyBehavior>
                  <a><button
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <Globe className="h-5 w-5 mr-2" /> Countries
                  </button>
                  </a>
                </Link>
                <div className="relative">
                  {/* Button to Toggle Dropdown */}
                  <button
                    onClick={() => setShowResource(!showResource)}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <Plane className="h-5 w-5 mr-2" /> Apply
                  </button>
                  {/* Resource Dropdown Component */}
                  <ResourceDropdown  showResource={showResource} setShowResource={setShowResource} />
                </div>
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <Phone className="h-5 w-5 mr-2" />Contact Us
                </button>
                {/* <div className="flex items-center gap-1  px-3 py-1 rounded-lg border">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="What to study?"
                    className="h-9 w-32 text-sm border-none  focus:outline-none"
                  />
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Where?"
                    className="h-9 w-28 text-sm border-none focus:ring-0 focus:outline-none"
                  />
                  <Button className="h-9 px-4 bg-[#ff7f00] hover:bg-[#ff9933] text-sm">
                    Search
                  </Button>
                </div> */}

              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <Heart className="h-5 w-5 mr-1" /> Wishlist
              </button>
              <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
                <MessageCircle className="h-5 w-5 mr-1" /> Chat
              </button>

              {/* <Button variant="ghost" className="hidden md:inline-flex">For Students</Button> */}
              {/* <Button variant="ghost" className="hidden md:inline-flex">For Universities</Button> */}
              <Button variant="ghost" className="hidden md:inline-flex">Sign in</Button>
              <Button className="hidden md:inline-flex bg-neutral-900 text-neutral-100 hover:bg-neutral-900/90">Register</Button>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        {isMenuOpen && (
          <div className="md:hidden absolute bg-white border-b">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => setShowDisciplines(!showDisciplines)}
                className=" flex items-center text-gray-700 hover:text-blue-600"
              >
                Disciplines <ChevronDown className="h-4 w-4" />
              </button>
              {showDisciplines && (
                <div className="px-4 pb-2">
                  {disciplines.map((discipline) => (
                    <Link
                      key={discipline}
                      href={`/disciplines/${discipline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="block text-gray-700 hover:text-blue-600 py-1"
                    >
                      {discipline}
                    </Link>
                  ))}
                </div>
              )}

              <Button variant="ghost" className="w-full text-left">Countries</Button>
              <Button variant="ghost" className="w-full text-left">Universities</Button>
              <Button variant="ghost" className="w-full text-left">Apply</Button>
              <Button variant="ghost" className="w-full text-left">Wishlist</Button>
              {/* <Button variant="ghost" className="w-full text-left">For Students</Button>
              <Button variant="ghost" className="w-full text-left">For Universities</Button> */}
              <Button variant="ghost" className="w-full text-left">Sign in</Button>
              <Button className="w-full">Register</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}