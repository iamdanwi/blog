export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About TechInsights
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Empowering the next generation of tech professionals through in-depth knowledge and practical insights.
        </p>
      </section>

      {/* Mission Section */}
      <section className="space-y-8">
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400">
            At TechInsights, we believe that knowledge should be accessible, comprehensive, and practical. 
            Our mission is to bridge the gap between theoretical concepts and real-world applications in 
            Computer Science, Cybersecurity, and Information Technology.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We strive to create content that not only educates but also inspires and empowers our readers 
            to excel in their technical journeys. Whether you&apos;re a student, professional, or enthusiast, 
            our platform is designed to help you stay ahead in the rapidly evolving tech landscape.
          </p>
        </div>
      </section>

      {/* What We Cover */}
      <section className="space-y-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">What We Cover</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-800">
            <h3 className="font-serif text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Computer Science</h3>
            <p className="text-gray-600 dark:text-gray-400">
              From algorithms and data structures to system design and software architecture, 
              we dive deep into the fundamental concepts that power modern computing.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-800">
            <h3 className="font-serif text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Cybersecurity</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the latest in network security, ethical hacking, threat analysis, 
              and best practices for protecting digital assets in an interconnected world.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-800">
            <h3 className="font-serif text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">IT & Infrastructure</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with cloud computing, DevOps practices, system administration, 
              and the tools that drive modern IT infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Join Our Community</h2>
          <p className="text-lg text-indigo-100">
            Be part of our growing community of tech enthusiasts. Subscribe to our newsletter 
            for the latest articles, tutorials, and insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                JD
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600 dark:text-gray-400">Founder & Lead Editor</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              With over 15 years of experience in software development and cybersecurity, 
              John leads our editorial team in creating high-quality technical content.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                JS
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Jane Smith</h3>
                <p className="text-gray-600 dark:text-gray-400">Technical Director</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Jane brings her expertise in cloud architecture and IT infrastructure to ensure 
              our content stays current with industry best practices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 