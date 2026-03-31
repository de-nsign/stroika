import Hero from '@/components/sections/Hero';
import KeyAssets from '@/components/sections/KeyAssets';
import Mission from '@/components/sections/Mission';
import Capabilities from '@/components/sections/Capabilities';
import Testimonials from '@/components/sections/Testimonials';
import Contacts from '@/components/sections/Contacts';
import QuoteForm from '@/components/ui/QuoteForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <KeyAssets />
      <Mission />
      <Capabilities />
      <Testimonials />
      <Contacts />
      <section id="quote" className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[800px] px-6 lg:px-10">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
