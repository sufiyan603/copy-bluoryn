"use client";

import { Accordion } from "@radix-ui/react-accordion";
import { GraduationCap, Building2, Trophy, Users, Users2 } from "lucide-react";
import { Key, useState } from "react";
import Accordion1 from "@/components/ui/inpage";
import SubjectsList from "@/components/ui/subject";

type Section = {
  title: string;
  content: string;
};

type Sections = {
  [key: string]: Section;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<keyof Sections>("study");
  // const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sections: Sections = {
    study: {
      title: "Study in India",
      content: `What's it like studying in the country with the second-highest population, the country with the most populous 
      democracy, and the country that has six total national religions? Probably unlike anything you've experienced before. Is 
      it possible to get an overload of culture? Let's hope not, because that's precisely how it feels to pursue a Bachelor's or 
      Master's in India.

      If you're looking to study at a university in India, you will find numerous study degrees, offering diverse programmes 
      and a vibrant cultural environment. For decades, students from all over the world have imagined themselves swimming 
      in this endless stream of diverse music, food, and art that exist together in India's massive landscape. Such an 
      environment also makes studying there both exciting and hugely enriching.

      Why Study in India?

      1. Studying and living in India is cheap
      In India, there are over 800 universities, so it's not surprising that tuition fees vary significantly. Still, as a general rule, 
      they are much more affordable when compared to fees at Western universities.

      2. Follow in the footsteps of Indian CEOs
      Sundar Pichai (CEO of Google), Satya Nadella (CEO of Microsoft), Shantanu Narayen (CEO of Adobe) — these are only 
      some of the successful Indians who, at the time of writing this, are in charge of some of the biggest tech companies in 
      the world.

      3. India has one of the fastest growing economies
      India is among the top 10 largest economies in the world based on the GDP (gross domestic product). Its economy has 
      actually been growing at a rate of 7–8% in the last years.

      4. Explore the profoundly unique Indian culture
      The Indian history and especially culture are very rich and colourful. India is often referred to as "The Land of a 
      Thousand Gods", because in addition to big deity names like Brahma, Vishnu, or Shiva, there are literally hundreds of 
      other gods and goddesses with different roles and importance in their culture.

      5. Discover yoga where it all began
      The Western world largely views yoga as a form of physical exercise. However, in India, this ancient practice in 
      considered a powerful system for general wellbeing and health on all levels: body, mind, emotions, and energy.`
    },
    living: {
      title: "Living in India",
      content: `Living in India is an experience unlike any other. Here's what you need to know:

      Cost of Living
      India is amazingly cheap to live in, even if you find yourself in one of the big cities like Mumbai or New Delhi.

      Accommodation (international or combined hostels): usually provided by the university
      Accommodation (rent flat): 85–330 EUR/month
      Utilities: 30–45 EUR/month
      Monthly transport pass: 8 EUR
      Three-course meal for 2 people at a mid-range restaurant: 9 EUR
      Milk: 0.57 EUR
      Loaf of bread: 0.40 EUR`
    },
    about: {
      title: "About India",
      content: `The Republic of India is a country in South Asia. The name 'India' is 
      derived from the River Indus, the valleys around which were the home of the early settlers.
       One of the earliest civilizations, the Indus Valley civilization flourished on the Indian subcontinent from c. 
       2600 B.C. to c. 2000 B.C.

      - Interesting Facts about India
Every few years the Kumbh Mela – a massive Hindu pilgrimage -  is held on the Ganges river bank. It is the world’s largest gathering of humans (bringing in a whopping 200 million people), and is visible from outer space.
The world’s biggest family lives in India; a man with 39 wives and 94 children. And you thought your holidays were hectic.
India has the lowest meat consumption per person.
The discovery of water on the moon was actually discovered in 2009 by India’s ISRO Chandrayaan- 1 using its Moon Mineralogy Mapper.
Around 100 Million years ago, India was actually an island.`
    },
    universities: {
      title: "Universities in India",
      content: `India has one of the largest higher education systems in the world, with over 800 universities and 39,000 colleges. 
      Some of the top institutions include:

      - Indian Institute of Technology (IIT)
      - Indian Institute of Management (IIM)
      - Jawaharlal Nehru University
      - University of Delhi
      - Amrita University
      - Tata Institute of Social Sciences`
    },
    visa: {
      title: "Student Visa",
      content: `To study in India, you'll need a student visa. Here's what you need to know:

      Requirements:
      - Admission letter from an Indian university
      - Valid passport
      - Proof of sufficient funds
      - Health insurance
      - Passport-size photographs
      - Completed visa application form

      The visa process typically takes 2-3 weeks.`
    },
    work: {
      title: "Work Permit",
      content: `Working while studying in India:

      - Student visa holders can work part-time during their studies
      - Internships related to your course are allowed
      - Post-study work options are available for certain degrees
      - Many multinational companies have offices in major Indian cities`
    },
    apply: {
      title: "How to Apply",
      content: `Application Process:

      Required Documents:
      - Scan of your degree(s)/diploma(s)
      - Your CV
      - Academic transcripts
      - Copy of passport
      - Test scores (TOEFL/IELTS)
      - Motivation letter
      - Financial statements

      English Language Requirements:
      - TOEFL: 70-100 iBT
      - IELTS: 6.0-7.0
      - PTE Academic: 50-65`
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop"
            alt="Mumbai skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full pt-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Ultimate Guide to Studying<br />in India in 2025
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Browse all master programmes in India
            </p>

            <div className="max-w-2xl">
              <div className="flex">
                <input
                  type="text"
                  placeholder="What do you want to study?"
                  className="flex-1 px-6 py-4 rounded-l-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-r-lg text-lg font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Jul-May</div>
              <div className="text-sm text-gray-500">Academic Year</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">58</div>
              <div className="text-sm text-gray-500">State Institutes</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50</div>
              <div className="text-sm text-gray-500">Ranked Universities</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">49,000</div>
              <div className="text-sm text-gray-500">Int. Students</div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-3">
                <Users2 className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,405,632,000</div>
              <div className="text-sm text-gray-500">Population</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:sticky md:top-4 h-fit bg-white rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                {Object.entries(sections).map(([key, section], index) => (
                  <div
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`font-medium cursor-pointer transition-colors ${activeSection === key
                        ? "text-blue-600"
                        : "text-gray-900 hover:text-blue-600"
                      }`}
                  >
                    {section.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {sections[activeSection].title}
              </h2>
              <div className="prose prose-lg max-w-none">
                {sections[activeSection].content.split('\n').map((paragraph: string, index: Key | null | undefined) => (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Accordion1 />
      <SubjectsList/>
    </main>
  );
}