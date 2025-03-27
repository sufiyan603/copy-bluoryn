"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[300px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80"
          alt="Academic books and papers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#D84315] bg-opacity-80">
          <div className="max-w-4xl mx-auto px-4 pt-16">
            <h1 className="text-3xl font-bold text-white mb-2">
              6 Steps to Writing an Awesome Academic CV for Master's Application
            </h1>
            <p className="text-white text-sm">
              Updated: 18 Sep 2024 • Published: 18 Sep 2024
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/articles" className="text-gray-600 hover:text-gray-900">Articles</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/articles/cv-writing" className="text-gray-600 hover:text-gray-900">CV Writing</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900">6 Steps to Writing an Academic CV</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2>What the academic CV for Master's application is all about</h2>
              <p>
                The most important thing you need to know about the academic CV for Master's application is that 
                it should show how you understand your own achievements. The CV should be tailored specifically 
                for your future Master's program, to help you stand out for what you have done and your skills.
              </p>

              <h3>1. Is there a difference between a Resume and a CV for university application?</h3>
              <p>
                While both documents include a short history of your activities, a Resume is rather a one-two 
                page summary of your professional achievements, while a CV for university application highlights 
                all your academic accomplishments. Most universities will ask for your CV. The main exception 
                is when you apply for an MBA, in which case most universities ask for your Resume.
              </p>

              <h3>2. Focus on your academic background</h3>
              <p>
                A golden rule of a CV for Master's application is to emphasize your academic achievements 
                over professional ones. You should definitely mention professional experience, but you should 
                give top priority to your education.
              </p>

              <h3>3. Volunteer work and internships matter more than you think</h3>
              <p>
                Internships or volunteer work in your CV for Master's application show admissions officers your 
                interests and that you are willing to work hard for reasons other than immediate financial gain.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Search</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="All disciplines"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                  <span>Worldwide</span>
                </label>
              </div>
              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}