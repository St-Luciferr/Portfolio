import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { projects } from '@/lib/constants';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | Santosh Pandey`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-primary py-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/#projects"
          className="text-secondary hover:text-white transition-colors mb-8 inline-block"
        >
          &larr; Back to Projects
        </Link>

        <div className="bg-tertiary rounded-3xl overflow-hidden shadow-card">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
              {project.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`text-sm ${tag.color} bg-gray-800/30 px-3 py-1 rounded-full`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <p className="text-secondary text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#915eff] hover:bg-[#7a4fd4] text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Image
                src={project.demo_url ? '/images/web.png' : '/images/github.png'}
                alt=""
                width={20}
                height={20}
              />
              {project.demo_url ? 'View Live Demo' : 'View Source Code'}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
