import QuoteForm from '@/components/ui/QuoteForm';

export default function QuoteSection({ defaultEquipment, className = 'py-12 lg:py-16' }: { defaultEquipment?: string; className?: string }) {
  return (
    <section id="quote" className={`bg-white ${className}`}>
      <div className="mx-auto max-w-[800px] px-0 lg:px-10">
        <QuoteForm defaultEquipment={defaultEquipment} />
      </div>
    </section>
  );
}
