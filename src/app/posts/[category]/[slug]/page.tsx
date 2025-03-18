import { getPostBySlug } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { use } from 'react';

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const resolvedParams = use(params);
  const post = use(getPostBySlug(resolvedParams.slug));

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-[680px] mx-auto">
      <header className="mb-16">
        <div className="mb-8">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.category}
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date.toISOString()}>
                {post.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="mx-1">·</span>
              <span>6 min read</span>
            </div>
          </div>
        </div>
      </header>

      <div className="prose dark:prose-invert prose-lg prose-h2:font-serif prose-h3:font-serif prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-gray-900 dark:prose-a:text-gray-100 prose-a:no-underline hover:prose-a:underline">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Writer at TechInsights</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              More from TechInsights
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
} 