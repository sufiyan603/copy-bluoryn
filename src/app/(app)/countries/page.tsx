"use client";

import { useState } from "react";
import Link from "next/link";

const countries = [
  "Albania", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Canada", "Cayman Islands",
  "China", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark",
  "Dominica", "Ecuador", "Egypt", "Estonia", "Ethiopia", "Finland", "France",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guam", "Hong Kong (SAR)",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kyrgyzstan", "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg",
  "Macao (SAR)", "Macedonia (FYROM)", "Malawi", "Malaysia", "Maldives", "Malta",
  "Mauritius", "Mexico", "Monaco", "Morocco", "Namibia", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "Northern Cyprus", "Norway",
  "Oman", "Pakistan", "Palestinian Territory, Occupied", "Philippines", "Poland",
  "Portugal", "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda",
  "Saudi Arabia", "Serbia", "Singapore", "Sint Maarten", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "United States Virgin Islands", "Vietnam",
  "Zambia"
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Browse Master's Degrees Worldwide</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" p-2 border border-gray-300 rounded-md mb-4"
      />
      <ul className="grid grid-cols-3 gap-2">
        {filteredCountries.map((country, index) => {
          const countrySlug = country
            .replace(/\s*\(\d+\)/, "") // Remove numbers
            .toLowerCase()
            .replace(/\s+/g, "-"); // Convert spaces to hyphens

          return (
            <li key={index} className="text-blue-600 hover:underline">
              <Link href={`/countries/${countrySlug}`}>
                {country.replace(/\s*\(\d+\)/, "")} {/* Display clean country name */}
              </Link>
            </li>
          );
        })}
      </ul>


      {/* Education Initiatives Content */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Education Initiatives Worldwide</h2>
        <p>
          Education initiatives created around the world aim to promote cooperation and academic exchange between
          countries and attract new students, who may benefit from an international education and a global experience.
          Universities worldwide focus on creating career-oriented Master's degrees through high-quality, up-to-date
          course materials.
        </p>
        <p className="mt-2">
          Students have more opportunities than ever to study worldwide, for instance in Australia, Asia, Europe, and
          North America, and benefit from an international study environment. A variety of study options enable
          students to make the right, relevant choices for their future, by following a streamlined enrolment process.
        </p>

        <h3 className="text-lg font-semibold mt-4">What is a Master's Degree?</h3>
        <p>
          A Masters degree is an academic degree granted for the completion of a graduate study course in a specific field of study. To be able to enrol for a Masters degree, students usually need to complete their undergraduate studies in a related field. Graduates of a Masters degree programme are expected to possess advanced knowledge, be able to apply their knowledge in a practical context and possess analytical, critical and problem solving skills in the chosen field of study.

          Masters degrees may be course-based, research-based or are a mixture of the two. The primary goal of Master programmes is to provide you with the necessary knowledge and skills to be able to carry out independent research either in a specific field or in a multidisciplinary field.

          There is a variety of Masters degrees to choose from: academic Masters or taught Masters provide advanced training in preparation for employment, research Masters in which you are engaged in scientific research and teacher training Masters degrees, that prepare you to teach at all levels of secondary education. The study programmes usually take one and a half to two years full-time to complete. Accelerated programmes usually only require one year of studies.
        </p>

        <h3 className="text-lg font-semibold mt-4">Types of Master's Degrees</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Taught Masters:</strong> The structure of a taught Masters degree varies from course to course, and from institution to institution. Examples of different degrees are: Master of Arts (MA), Master of Science (MSc), Master of Law (LLM). Other Masters degrees are more specifically named (for example Master of Business Administration). Most MA or MSc courses include a significant taught element and include some form of research project and dissertation. Teaching can be delivered through seminars, classes, tutorials and supervised laboratory work (where applicable). Assessment can range from examinations, assessed projects, group work or course work. Usually a taught Masters course is studied for one to two years full time. Some courses are offered as part-time or by distance learning options and may take longer.

            In addition to the more familiar MA and MSc titles, there are more subject specific titles. It is, however, more important to focus on the content of the courses itself whilst looking for a Masters degree. Each degree has its own set amount of courses that are mandatory to follow to fulfil the study requirements.

            Executive Masters degrees are especially designed for executive professionals. Most common examples of executive programmes include EMBAs. Admission, graduation requirements, and curriculum of executive degrees differ from regular full-time programs.
          </li>
          <li>
            <strong>Master of Research (MRes):</strong> The MRes is an advanced postgraduate degree in a specific academic discipline. The courses that are part of this degree are preliminary courses to give the student a certain foundation, for example in research methodology. The MRes is designed to prepare students for doctoral research as its particular emphasis lies on an extensive dissertation. This Masters degree is of interest for students who are considering to do a PhD.
          </li>
          <li>
            <strong>MPhil:</strong> An MPhil is a research-only Masters degree and the precursor to a PhD. Many PhD students are registered for this degree in the first 12-18 months of study and have to produce a transfer report at the end of this period to change to the registration of PhD student. For entry to the MPhil you normally should have completed a taught Masters degree (or equivalent). When applying, you are expected to provide a detailed research proposal.
          </li>
          <li>
            <strong>Teacher Training:</strong> There is a difference between the taught master in education, which is a professional MA or MEd - ideal for those who would like to work in both formal and informal educational settings ?, and certificates such as Postgraduate Certificate in Education (PGCE). Usually, a master of education is a one year-long, full-time, intensive programme for students who wish to study a particular field in education. Students acquire a general theoretical background for understanding past and future field experiences, or develop skills for use in professional work in education. Master's level teacher education is delivered in partnership between universities, schools and other partners.
          </li>
        </ul>

        <p className="mt-4">
          In recent years, universities in Asia, Australia, Europe, and America have increased the number of
          English-taught Master's degrees. Some of the most popular study destinations include Australia, Belgium,
          China, Denmark, France, Germany, Italy, the Netherlands, Spain, Switzerland, the United Kingdom, and the
          United States.
        </p>
      </div>
    </div>
  );
}
