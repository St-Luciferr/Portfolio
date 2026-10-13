import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/frontend';

export function ProjectMiniCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-lg border border-white/10 bg-tertiary p-5 hover:border-[#915eff] transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={project.imageUrl}
          alt={`${project.name} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-white font-bold text-lg group-hover:text-[#915eff] transition-colors line-clamp-1">
        {project.name}
      </h3>
      <p className="mt-2 text-secondary text-sm leading-relaxed line-clamp-2">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className={`text-xs ${tag.color} bg-gray-800/30 px-2 py-1 rounded-md`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
