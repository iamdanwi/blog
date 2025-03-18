import Link from 'next/link';
import Image from 'next/image';
import { getRandomPhoto, getPhotos } from '@/lib/unsplash';
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

async function getFeaturedImage() {
  return getRandomPhoto('technology programming computer');
}

async function getBlogImages() {
  return getPhotos('technology computer coding', 6);
}

export default async function Home() {
  const [featuredImage, blogImages] = await Promise.all([
    getFeaturedImage(),
    getBlogImages(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
          <Image
            src={featuredImage?.url || '/images/default-cover.jpg'}
            alt={featuredImage?.alt || 'Featured post'}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 relative z-10 py-24">
          <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
            Featured Article
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold text-white tracking-tight sm:text-7xl">
            Breaking Into Product Design
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300">
            Let&apos;s get one thing out of the way: you don&apos;t need a fancy degree to get into tech. 
            We sat down with industry experts to talk about breaking into the field.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="group">
              Read Article
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Browse More
            </Button>
          </div>
          {featuredImage?.author && (
            <p className="mt-4 text-sm text-gray-400">
              Photo by{' '}
              <a
                href={featuredImage.author.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                {featuredImage.author.name}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Recent Articles</h2>
            <Button variant="link" className="text-gray-600 dark:text-gray-400 group">
              View all
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogImages.map((image, i) => (
              <article key={i} className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <Link href={`/posts/sample-post-${i + 1}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={600}
                      height={338}
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full">
                        Development
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">5 min read</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                      Building Scalable Systems: A Practical Guide
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      Learn how to design and implement systems that can handle millions of users while maintaining performance and reliability.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div>
                          <p className="text-sm font-medium">Sarah Chen</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay ahead of the curve</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community of tech enthusiasts and get weekly insights, tutorials, and tech news delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            No spam ever, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
