<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:1024',
            'content' => 'required|string',
            'is_published' => 'boolean',
        ]);

        $post = new Post($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        if (empty($request->excerpt)) {
            $post->excerpt = Str::limit(strip_tags($request->input('content')), 150);
        }

        $post->slug = Str::slug($validated['title']) . '-' . time();
        $post->published_at = $validated['is_published'] ? now() : null;
        $post->save();

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('content-images', 'public');
            return response()->json(['url' => asset('storage/' . $path)]);
        }
        return response()->json(['error' => 'No image uploaded.'], 400);
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:1024',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $post->fill($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
        }

        if (empty($request->excerpt)) {
             $post->excerpt = Str::limit(strip_tags($request->input('content')), 150);
        }

        if ($post->isDirty('title')) {
             $post->slug = Str::slug($validated['title']) . '-' . time();
        }
        if ($post->isDirty('is_published') && $validated['is_published']) {
             $post->published_at = $post->published_at ?? now();
        }
        $post->save();

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }
}
