import { getPostsByCategory } from '@/app/lib/posts';
import PostCard from '@/app/components/PostCard';
import { Category } from '@/app/types/post';
import { use } from 'react';
import { categoryTitles } from '@/app/lib/constants';

interface CategoryPageProps {
  params: Promise<{
    category: Category;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;
  const posts = use(getPostsByCategory(category as Category));
  const categoryTitle = categoryTitles[category as keyof typeof categoryTitles];

  return (
    <div className="space-y-8">
      <header className="text-center space-y-6 py-8 border-b-2 border-[#d3c5bb] dark:border-gray-800">
        <h1 className="text-4xl font-serif font-bold text-[#2c1810] dark:text-gray-100">
          {categoryTitle}
        </h1>
        <p className="text-xl font-serif text-[#5c4030] dark:text-gray-400">
          Latest articles in {categoryTitle.toLowerCase()}
        </p>
        <div className="w-16 h-1 bg-[#8b4513] dark:bg-[#d3c5bb] mx-auto"></div>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 bg-[#f5efe9] dark:bg-gray-800/20 rounded-lg border border-[#d3c5bb] dark:border-gray-800">
          <p className="text-[#5c4030] dark:text-gray-400 font-serif text-lg">
            No posts available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
} 