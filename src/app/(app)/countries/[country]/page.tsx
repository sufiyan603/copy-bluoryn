import { notFound } from "next/navigation";
import dynamic from "next/dynamic";


const countryPages: Record<string, any> = {
  india: dynamic(() => import("../../data/india")),
  // usa: <USAPage />,
//   australia: <AustraliaPage />,
};

export function generateStaticParams() {
  return Object.keys(countryPages).map((country) => ({ country }));
}

// ✅ Render the correct country page
export default function CountryPage({ params }: { params: { country: string } }) {
  const CountryComponent = countryPages[params.country];

  if (!CountryComponent) {
    return notFound(); // Show 404 if country not found
  }

  return <CountryComponent />; // ✅ Render as JSX element
}
