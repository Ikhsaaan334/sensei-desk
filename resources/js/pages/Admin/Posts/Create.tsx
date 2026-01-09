import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// @ts-ignore
import axios from 'axios';
import { route } from 'ziggy-js';

interface FormData {
    title: string;
    image: File | null;
    content: string;
    is_published: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const addImage = async () => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
            return;
        }

        // Alternatively, create a hidden file input for actual uploads if needed immediately
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (_) => {
            const file = input.files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await axios.post(
                        route('admin.upload_image'),
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        },
                    );

                    editor
                        .chain()
                        .focus()
                        .setImage({ src: response.data.url })
                        .run();
                } catch (error) {
                    console.error('Image upload failed', error);
                    alert('Image upload failed');
                }
            }
        };
        input.click();
    };

    return (
        <div className="flex gap-2 border-b border-gray-300 bg-gray-50 p-2 dark:border-zinc-700 dark:bg-zinc-800">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`rounded px-2 py-1 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-zinc-700' : ''} dark:text-gray-200`}
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`rounded px-2 py-1 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-zinc-700' : ''} dark:text-gray-200`}
            >
                I
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`rounded px-2 py-1 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-zinc-700' : ''} dark:text-gray-200`}
            >
                H2
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                }
                className={`rounded px-2 py-1 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-zinc-700' : ''} dark:text-gray-200`}
            >
                Left
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                }
                className={`rounded px-2 py-1 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-zinc-700' : ''} dark:text-gray-200`}
            >
                Center
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                }
                className={`rounded px-2 py-1 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-zinc-700' : ''} dark:text-gray-200`}
            >
                Right
            </button>
            <button
                type="button"
                onClick={addImage}
                className="rounded px-2 py-1 dark:text-gray-200"
            >
                Image
            </button>
        </div>
    );
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: '',
        image: null,
        content: '',
        is_published: false,
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image'],
            }),
        ],
        content: data.content,
        onUpdate: ({ editor }) => {
            setData('content', editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.posts.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Create Post', href: route('admin.posts.create') },
            ]}
        >
            <Head title="Create Post" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <form
                    onSubmit={submit}
                    className="flex h-full flex-col gap-6 rounded-lg bg-white p-6 shadow dark:bg-zinc-900"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 dark:focus:border-indigo-600"
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-300 dark:file:bg-zinc-800 dark:file:text-indigo-400"
                        />
                        {errors.image && ( // @ts-ignore
                            <div className="mt-1 text-sm text-red-500">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Content
                        </label>
                        <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800">
                            <MenuBar editor={editor} />
                            <div className="flex-1 overflow-y-auto">
                                <EditorContent
                                    editor={editor}
                                    className="h-full"
                                />
                            </div>
                        </div>
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
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                            checked={data.is_published}
                            onChange={(e) =>
                                setData('is_published', e.target.checked)
                            }
                        />
                        <label
                            htmlFor="is_published"
                            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                        >
                            Publish immediately
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:hover:bg-indigo-500"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
