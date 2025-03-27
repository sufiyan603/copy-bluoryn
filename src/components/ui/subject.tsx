import { Briefcase, BookOpen, Globe, Code, FlaskConical, Users, Palette, Gavel, GraduationCap, HeartPulse, Newspaper, TreePalm, Dumbbell, Settings, Earth, Building2 } from "lucide-react";

const subjects = [
  { name: "Agriculture & Forestry", masters: 19, icon: <TreePalm size={30} /> },
  { name: "Applied Sciences & Professions", masters: 45, icon: <Settings size={30} /> },
  { name: "Arts, Design & Architecture", masters: 97, icon: <Palette size={30} /> },
  { name: "Business & Management", masters: 225, icon: <Briefcase size={30} /> },
  { name: "Computer Science & IT", masters: 184, icon: <Code size={30} /> },
  { name: "Education & Training", masters: 32, icon: <GraduationCap size={30} /> },
  { name: "Engineering & Technology", masters: 267, icon: <FlaskConical size={30} /> },
  { name: "Environmental Studies & Earth Sciences", masters: 49, icon: <Earth size={30} /> },
  { name: "Hospitality, Leisure & Sports", masters: 25, icon: <Dumbbell size={30} /> },
  { name: "Humanities", masters: 113, icon: <BookOpen size={30} /> },
  { name: "Journalism & Media", masters: 24, icon: <Newspaper size={30} /> },
  { name: "Law", masters: 29, icon: <Gavel size={30} /> },
  { name: "Medicine & Health", masters: 239, icon: <HeartPulse size={30} /> },
  { name: "Natural Sciences & Mathematics", masters: 300, icon: <FlaskConical size={30} /> },
  { name: "Social Sciences", masters: 196, icon: <Users size={30} /> },
];

const SubjectsList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        What Subject to Study in India?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-105 hover:bg-orange-500 hover:text-white hover:shadow-xl"
          >
            {subject.icon}
            <h3 className="text-lg font-semibold mt-2">{subject.name}</h3>
            <p className="text-sm">{subject.masters} Masters</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsList;
