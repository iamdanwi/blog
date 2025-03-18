import Link from 'next/link';
import { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#d3c5bb] dark:border-gray-700">
      <div className="p-6">
        <span className="text-[#8b4513] dark:text-[#d3c5bb] text-sm font-serif capitalize">
          {post.category}
        </span>
        <h3 className="mt-2 text-xl font-serif font-semibold">
          <Link 
            href={`/posts/${post.category}/${post.slug}`}
            className="text-[#2c1810] dark:text-gray-100 hover:text-[#8b4513] dark:hover:text-[#d3c5bb]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-[#5c4030] dark:text-gray-400 font-serif">
          {post.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm text-[#8b4513] dark:text-[#d3c5bb] font-serif">
          <span>{post.author.name}</span>
          <time dateTime={post.date.toISOString()}>
            {post.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>
    </article>
  );
} 