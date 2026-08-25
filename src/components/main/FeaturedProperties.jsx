'use client';

import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '@/lib/data';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function FeaturedProperties() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="section-eyebrow">Featured Listings</span>
          <h2 className="section-title">Fresh keys, ready for viewing.</h2>
        </div>
        <p className="section-sub sm:text-right sm:!mt-0">
          A hand-picked set of approved properties, updated as owners publish
          new listings.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featuredProperties.slice(0, 6).map((property, index) => (
          <motion.div key={property.id} variants={item}>
            <PropertyCard property={property} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
