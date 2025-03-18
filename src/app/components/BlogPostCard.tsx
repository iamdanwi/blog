import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Post } from '@/types/post';

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.category}/${post.slug}`}>
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={post.coverImage || '/images/default-cover.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            {post.author.image && (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={24}
                height={24}
                className="object-cover"
              />
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>{post.author.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
} 