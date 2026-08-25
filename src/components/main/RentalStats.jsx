'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { rentalStats } from '@/lib/data';

function StatNumber({ value }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration: 1.4,
            ease: 'easeOut',
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value]);

    return (
        <span ref={ref}>{display.toLocaleString('en-US')}</span>
    );
}

export default function RentalStats() {
    return (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="rounded-3xl bg-pine px-6 py-14 sm:px-14">
                <div className="max-w-lg">
                    <span className="section-eyebrow text-brass-light">By The Numbers</span>
                    <h2 className="section-title text-paper">Rental activity on Latch.</h2>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
                    {rentalStats.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <p className="font-display text-4xl text-brass-light sm:text-5xl">
                                <StatNumber value={s.value} />
                                {s.suffix}
                            </p>
                            <p className="mt-2 text-sm text-paper/60">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
