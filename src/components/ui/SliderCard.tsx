'use client';

import Image from 'next/image';

interface SliderCardProps {
  title: string;
  image: string;
  isActive?: boolean;
}

export default function SliderCard({
  title,
  image,
  isActive = false,
}: SliderCardProps) {
  return (
    <div
      className={`relative h-[350px] w-[400px] shrink-0 snap-center overflow-hidden rounded-2xl transition-all duration-300 md:w-[500px] ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="500px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      </div>
    </div>
  );
}
