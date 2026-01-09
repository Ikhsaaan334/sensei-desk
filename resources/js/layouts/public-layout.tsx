import { Link } from '@inertiajs/react';
import { Github, Youtube } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300 selection:bg-primary selection:text-white">
            {/* Top Decoration Line */}
            <div className="fixed top-0 left-0 z-50 h-1 w-full bg-primary"></div>

            <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
                <Link href="/" className="group flex items-center gap-2">
                    {/* Simple Geometric Logo */}
                    <div className="flex h-8 w-8 transform items-center justify-center rounded-sm bg-primary transition-transform group-hover:rotate-45">
                        <div className="h-4 w-4 rounded-full bg-white"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-foreground transition-colors group-hover:text-primary">
                        Sensei's
                        <span className="ml-1 font-light opacity-50">Desk</span>
                    </span>
                </Link>
            </nav>

            <main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-4">
                {children}
            </main>

            <footer className="mt-20 border-t border-border py-12 text-center">
                <div className="mb-8 flex justify-center gap-6">
                    <a
                        href="https://github.com/Ikhsaaan334"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-black dark:hover:text-white"
                    >
                        <Github className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://www.youtube.com/@xzens1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-[#FF0000]"
                    >
                        <Youtube className="h-6 w-6" />
                        <span className="sr-only">YouTube</span>
                    </a>
                </div>
                <div className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    General Student Council / Schale
                </div>
                <div className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Kivotos Admin System. All
                    rights reserved.
                </div>
            </footer>
        </div>
    );
}
