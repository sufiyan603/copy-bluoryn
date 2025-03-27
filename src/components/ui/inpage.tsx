import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface University {
  name: string;
  masters?: number;
}

interface City {
  name: string;
  universities: University[];
}

const cities: City[] = [
  {
    name: "Abhayapuri",
    universities: [
      { name: "BML Munjal University", masters: 7 },
      { name: "Indian Institute of Technology Bhubaneswar (IITBBS)", masters: 14 },
    ],
  },
  {
    name: "Ambala",
    universities: [{ name: "Maharishi Markandeshwar University (MMU)", masters: 29 }],
  },
  {
    name: "Bangalore",
    universities: [
      { name: "Manipal College of Health Professions (MCHP)", masters: 33 },
      { name: "Alliance University", masters: 2 },
      { name: "Christ University, Bangalore", masters: 39 },
      { name: "Symbiosis International University", masters: 92 },
      { name: "Pearl Academy", masters: 20 },
    ],
  },
  {
    name: "Bhubaneshwar",
    universities: [{ name: "KIIT University", masters: 33 }],
  },
  {
    name: "Bihar Sharif",
    universities: [],
  },
  {
    name: "Calcutta",
    universities: [],
  },
  { name: "Chandigarh", universities: [] },
  { name: "Chennai", universities: [] },
  { name: "Coimbatore", universities: [] },
  { name: "Dehra Dun", universities: [] },
  { name: "Delhi", universities: [] },
  { name: "Devanhalli", universities: [] },
  { name: "Dhanbad", universities: [] },
  { name: "Hariana", universities: [] },
  { name: "Hisar", universities: [] },
  { name: "Hyderabad", universities: [] },
  { name: "Jaipur", universities: [] },
  { name: "Kakinada", universities: [] },
  { name: "Karaikkudi", universities: [] },
  { name: "Karari", universities: [] },
  { name: "Kottayam", universities: [] },
  { name: "Malkajgiri", universities: [] },
  { name: "Malpe", universities: [] },
  { name: "Mandi", universities: [] },
  { name: "Mohali", universities: [] },
  { name: "Mumbai", universities: [] },
  { name: "Mysore", universities: [] },
  { name: "Nagar", universities: [] },
  { name: "Nagpur", universities: [] },
  { name: "Nasik", universities: [] },
  { name: "New Delhi", universities: [] },
  { name: "Noida", universities: [] },
  { name: "Palanpur", universities: [] },
  { name: "Patiala", universities: [] },
  { name: "Pune", universities: [] },
  { name: "Rupnagar", universities: [] },
  { name: "Sangareddi", universities: [] },
  { name: "Sanquelim", universities: [] },
  { name: "Sehore", universities: [] },
  { name: "Silchar", universities: [] },
  { name: "Sonipat", universities: [] },
  { name: "Thanjavur", universities: [] },
  { name: "Vellore", universities: [] },
  { name: "Vijayawada", universities: [] },
  { name: "Yelahanka", universities: [] },
];

export default function Accordion1() {
  const [openCity, setOpenCity] = useState<string | null>(null);

  const toggleCity = (cityName: string) => {
    setOpenCity(openCity === cityName ? null : cityName);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Universities, Colleges and Schools in India
      </h1>

      <div className="space-y-2">
        {cities.map((city) => (
          <div key={city.name} className="border rounded-lg overflow-hidden">
            {/* City Header */}
            <button
              className="w-full flex justify-between items-center p-4 text-lg font-medium bg-gray-200 hover:bg-gray-300 transition"
              onClick={() => toggleCity(city.name)}
            >
              <span>
                {city.name} {city.universities.length > 0 && `(${city.universities.length})`}
              </span>
              {openCity === city.name ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {/* University List */}
            {openCity === city.name && (
              <div className="bg-white p-4 space-y-2">
                {city.universities.length > 0 ? (
                  city.universities.map((uni) => (
                    <p key={uni.name} className="text-blue-600 hover:underline cursor-pointer">
                      {uni.name} {uni.masters && `(${uni.masters} Masters)`}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600 italic">No universities listed.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
