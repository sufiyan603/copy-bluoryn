import { Card } from '@/components/ui/card';
import { School, MapPin, GraduationCap } from 'lucide-react';

function QuickLinkCard({ icon, title, links }: {
  icon: React.ReactNode;
  title: string;
  links: string[];
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4 text-blue-600">
        {icon}
        <h3 className="font-bold text-xl ml-3">{title}</h3>
      </div>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <button className="text-gray-600 hover:text-blue-600">{link}</button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function QuickLinks() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickLinkCard
            icon={<School className="h-8 w-8" />}
            title="Popular universities"
            links={['Harvard University', 'MIT', 'Stanford University', 'University of Oxford']}
          />
          <QuickLinkCard
            icon={<MapPin className="h-8 w-8" />}
            title="Popular countries"
            links={['Study in UK', 'Study in USA', 'Study in Germany', 'Study in Netherlands']}
          />
          <QuickLinkCard
            icon={<GraduationCap className="h-8 w-8" />}
            title="Popular disciplines"
            links={['Business & Management', 'Computer Science', 'Engineering', 'Social Sciences']}
          />
        </div>
      </div>
    </section>
  );
}