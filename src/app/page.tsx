import Hero from '@/components/sections/Hero';
import KeyAssets from '@/components/sections/KeyAssets';
import Mission from '@/components/sections/Mission';
import Capabilities from '@/components/sections/Capabilities';
import Testimonials from '@/components/sections/Testimonials';
import Contacts from '@/components/sections/Contacts';
import QuoteSection from '@/components/sections/QuoteSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <KeyAssets />
      <Mission />
      <Capabilities />
      <Testimonials />
      <Contacts />
      <QuoteSection />
    </main>
  );
}
