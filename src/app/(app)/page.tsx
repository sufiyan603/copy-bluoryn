import Hero from '@/components/Hero';
import FeaturedPrograms from '@/components/FeaturedPrograms';
import QuickLinks from '@/components/QuickLinks';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QuickLinks/>
      <FeaturedPrograms />
    </main>
  );
}