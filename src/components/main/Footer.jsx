import Link from 'next/link';
import { FiKey } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';

const columns = [
    {
        title: 'Explore',
        links: [
            { label: 'All Properties', href: '/properties' },
            { label: 'Top Locations', href: '/properties' },
            { label: 'How it works', href: '/#why-choose-us' },
        ],
    },
    {
        title: 'Account',
        links: [
            { label: 'Login', href: '/login' },
            { label: 'Register', href: '/register' },
            { label: 'Dashboard', href: '/dashboard' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-ink text-paper/70">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brass/20 text-brass-light">
                                <FiKey size={18} />
                            </span>
                            <span className="font-display text-2xl text-paper">Latch</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed">
                            A transparent, secure rental marketplace connecting tenants and
                            property owners — one address at a time.
                        </p>
                    </div>

                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="font-plate text-xs uppercase tracking-[0.2em] text-brass-light">
                                {col.title}
                            </h4>
                            <ul className="mt-4 space-y-3">
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        <Link href={l.href} className="text-sm transition hover:text-paper">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="font-plate text-xs uppercase tracking-[0.2em] text-brass-light">
                            Stay updated
                        </h4>
                        <p className="mt-4 text-sm">New listings, straight to your inbox.</p>
                        <form className="mt-4 flex gap-2">
                            <input
                                type="email"
                                placeholder="you@email.com"
                                className="w-full rounded-full border border-paper/15 bg-paper/5 px-4 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-brass"
                            />
                            <button className="btn-primary !px-4 !py-2.5 text-sm whitespace-nowrap">
                                Join
                            </button>
                        </form>
                        <div className="mt-6 flex items-center gap-3">
                            {[FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 transition hover:border-brass hover:text-brass-light"
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row">
                    <p>© {new Date().getFullYear()} Latch. All rights reserved.</p>
                    <p>Made for tenants and owners who value a good front door.</p>
                </div>
            </div>
        </footer>
    );
}
