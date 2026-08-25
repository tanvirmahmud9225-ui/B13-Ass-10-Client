import Hero from '@/components/Hero';
import CustomerReviews from '@/components/main/CustomerReviews';
import PopularCities from '@/components/main/PopularCities';
import RecentlyAdded from '@/components/main/RecentlyAdded';
import WhyChooseUs from '@/components/main/WhyChooseUs';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <PopularCities />
      <CustomerReviews />
      <RecentlyAdded />
    </div>
  );
};

export default page;