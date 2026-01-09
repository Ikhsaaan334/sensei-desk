import BlueArchiveOverlay from '@/components/BlueArchiveOverlay';
import FadeIn from '@/components/FadeIn';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
// @ts-ignore

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image?: string;
    published_at: string;
}

interface HomeProps {
    posts: Post[];
}

export default function Home({ posts }: HomeProps) {
    return (
        <PublicLayout>
            <BlueArchiveOverlay />
            <Head title="Schale Database" />

            <header className="relative mt-8 mb-16">
                {/* Decorative Header Element */}
                <div className="absolute top-0 -left-4 hidden h-full w-1 bg-primary/20 md:block"></div>

                <FadeIn>
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-sm font-bold tracking-widest text-primary uppercase">
                            Warning: Restricted Area
                        </span>
                        <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground md:text-6xl">
                            Welcome back, <br />
                            <span className="text-primary italic">Sensei.</span>
                        </h1>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-px max-w-[100px] flex-1 bg-border"></div>
                        <p className="max-w-xl text-lg font-light text-muted-foreground md:text-xl">
                            Accessing archived mission reports, student
                            observations, and strategic logs.
                        </p>
                    </div>
                </FadeIn>
            </header>

            <div className="grid gap-10">
                <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                    <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                        Latest Reports
                    </span>
                    <span className="font-mono text-xs text-primary">
                        {posts.length} FILES FOUND
                    </span>
                </div>

                {posts.map((post, index) => (
                    <FadeIn key={post.id} delay={0.1 * index + 0.3}>
                        <Link
                            href={`/post/${post.slug}`}
                            className="group relative -mx-4 block rounded-lg border border-transparent p-4 transition-colors hover:border-border hover:bg-muted/50"
                        >
                            <article className="flex flex-col gap-6 md:flex-row">
                                {post.image && (
                                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md border border-border/50 bg-black/10 md:aspect-[4/3] md:w-48 dark:bg-black/30">
                                        <div className="pointer-events-none absolute inset-0 z-10 bg-primary/10 opacity-0 mix-blend-overlay transition-opacity group-hover:opacity-100"></div>
                                        <img
                                            src={`/storage/${post.image}`}
                                            alt={post.title}
                                            className="h-full w-full object-contain p-1 transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <div className="mb-2 flex items-baseline justify-between gap-4">
                                        <h2 className="truncate text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                                            {post.title}
                                        </h2>
                                        <time className="shrink-0 rounded bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
                                            {new Date(
                                                post.published_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </time>
                                    </div>
                                    <p className="mb-3 line-clamp-2 leading-relaxed text-muted-foreground">
                                        {post.excerpt ||
                                            'Encrypted content. Authorization required.'}
                                    </p>
                                    <div className="flex translate-x-[-10px] transform items-center text-xs font-bold tracking-wider text-primary uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                        <span>Read Report</span>
                                        <svg
                                            className="ml-1 h-3 w-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </FadeIn>
                ))}

                {posts.length === 0 && (
                    <div className="rounded-lg border-2 border-dashed border-border py-20 text-center">
                        <FadeIn delay={0.3}>
                            <p className="font-mono text-muted-foreground">
                                NO RECORDS FOUND IN ARCHIVE
                            </p>
                        </FadeIn>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
