'use client';
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SearchSection from '@/components/home/SearchSection';
import TripList from '@/components/home/TripList';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SearchSection />
      <TripList />
    </main>
  );
}
