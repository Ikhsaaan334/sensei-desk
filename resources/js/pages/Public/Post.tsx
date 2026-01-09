import FadeIn from '@/components/FadeIn';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react'; // Link added

interface Post {
    id: number;
    title: string;
    content: string;
    image?: string;
    published_at: string;
}

interface PostProps {
    post: Post;
}

export default function PostShow({ post }: PostProps) {
    return (
        <PublicLayout>
            <Head title={post.title} />
            <article className="mt-8">
                <FadeIn>
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="group inline-flex items-center font-mono text-xs font-bold text-muted-foreground transition-colors hover:text-primary"
                        >
                            <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-current group-hover:bg-primary/10">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </span>
                            RETURN TO ARCHIVE
                        </Link>
                    </div>

                    <header className="mb-10 border-b border-border pb-8">
                        <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase">
                            <span>
                                Report ID: #
                                {post.id.toString().padStart(4, '0')}
                            </span>
                            <span>//</span>
                            <span>Archived</span>
                        </div>

                        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between">
                            <time className="rounded-sm bg-secondary px-3 py-1 font-mono text-sm text-muted-foreground">
                                {new Date(post.published_at).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    },
                                )}
                            </time>
                            <span className="font-mono text-xs text-muted-foreground/50">
                                CLASSIFIED INFORMATION
                            </span>
                        </div>
                    </header>
                </FadeIn>

                {post.image && (
                    <FadeIn delay={0.1}>
                        <div className="mb-10 overflow-hidden rounded-lg border border-border/50 shadow-sm transition-all duration-500 hover:shadow-lg">
                            <img
                                src={`/storage/${post.image}`}
                                alt={post.title}
                                className="h-auto w-full"
                            />
                        </div>
                    </FadeIn>
                )}

                <FadeIn delay={0.2}>
                    <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-pre:bg-secondary prose-pre:text-foreground">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    <div className="mt-12 flex justify-center border-t border-dashed border-border pt-8">
                        <div className="h-1 w-24 bg-primary/20"></div>
                    </div>
                </FadeIn>
            </article>
        </PublicLayout>
    );
}
