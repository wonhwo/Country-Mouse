import Hero from '@/components/home/Hero';
import FeaturedProject from '@/components/home/FeaturedProject';
import Workshop from '@/components/home/Workshop';
import FieldNotesHome from '@/components/home/FieldNotesHome';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <Workshop />
      <FieldNotesHome />
    </>
  );
}
