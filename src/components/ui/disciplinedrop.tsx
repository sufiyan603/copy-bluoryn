import Link from "next/link";
import { useEffect, useRef } from "react";

interface DisciplinesDropdownProps {
  disciplines: string[];
  showDisciplines: boolean;
  setShowDisciplines: (value: boolean) => void;
}

const DisciplinesDropdown: React.FC<DisciplinesDropdownProps> = ({
  disciplines,
  showDisciplines,
  setShowDisciplines,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDisciplines(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDisciplines]);

  if (!showDisciplines) return null; // Prevent rendering when dropdown is closed

  return (
    <div
      ref={dropdownRef}
      className="absolute left mt-6 w-[350px] bg-white border rounded-lg shadow-lg p-2 z-0"
    >
      <h1 className="font-bold pl-4 bg-gray-200 p-2 rounded-t-lg">Disciplines</h1>
      
      {/* Scrollable List with Custom Scrollbar */}
      <ul className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 rounded-b-lg">
        {disciplines.map((discipline, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
          >
            <Link
              href={`/disciplines/${discipline.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-gray-700 hover:text-blue-600 py-1"
            >
              {discipline}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplinesDropdown;
