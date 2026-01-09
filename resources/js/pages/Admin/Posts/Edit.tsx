import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
// @ts-ignore
import { route } from 'ziggy-js';

interface FormData {
    title: string;
    excerpt: string;
    content: string;
    is_published: boolean;
}

export default function Edit({ post }: { post: any }) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        is_published: !!post.is_published,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.posts.update', post.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Edit Post',
                    href: route('admin.posts.edit', post.id),
                },
            ]}
        >
            <Head title="Edit Post" />
            <div className="mx-auto max-w-4xl p-4">
                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-lg bg-white p-6 shadow"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Excerpt
                        </label>
                        <textarea
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            rows={3}
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                        />
                        {errors.excerpt && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.excerpt}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-mono shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            rows={15}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        {errors.content && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.content}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="is_published"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={data.is_published}
                            onChange={(e) =>
                                setData('is_published', e.target.checked)
                            }
                        />
                        <label
                            htmlFor="is_published"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Publish immediately
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        >
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
