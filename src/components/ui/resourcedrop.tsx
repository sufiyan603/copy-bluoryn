import Link from "next/link";
import { useEffect, useRef } from "react";

const resourceLinks = [
  { name: "Find Your Scholarship to Study Abroad", path: "/student_resource/tips1" },
  { name: "What Is a Transcript of Records and When Do Students Need One?", path: "/student_resource/transcript-of-records" },
  { name: "Write a Successful Motivation Letter for Your Master's", path: "/student_resource/motivation-letter" },
  { name: "How to Apply to Universities Worldwide and Tips for Being Accepted", path: "/student_resource/apply-to-universities" },
  { name: "What Documents Do You Need to Apply for a University Abroad?", path: "/student_resource/required-documents" },
  { name: "6 Steps to Writing an Awesome Academic CV for Master’s Application", path: "/student_resource/academic-cv" },
];

interface ResourceDropdownProps {
  showResource: boolean;
  setShowResource: (value: boolean) => void;
}

const ResourceDropdown: React.FC<ResourceDropdownProps> = ({ showResource, setShowResource }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowResource(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowResource]);

  if (!showResource) return null; // Don't render if not visible

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-6 w-[580px] bg-white border rounded-lg shadow-lg p-2 z-50">
      {/* Header */}
      <h1 className="font-bold pl-4 bg-gray-200 p-2 rounded-t-lg">Tips To Apply</h1>

      {/* Scrollable List with Custom Scrollbar */}
      <ul className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 rounded-b-lg">
        {resourceLinks.map((item, index) => (
          <li key={index} className="p-2 hover:bg-gray-100 text-gray-700 cursor-pointer transition-all duration-200">
            <Link href={item.path} className="block text-gray-700 hover:text-blue-600 py-1" onClick={() => setShowResource(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceDropdown;
