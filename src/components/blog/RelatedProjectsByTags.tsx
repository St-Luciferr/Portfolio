import { getRelatedProjectsByTags } from '@/lib/services';
import { ProjectMiniCard } from '@/components/projects/ProjectMiniCard';

interface RelatedProjectsByTagsProps {
  tagNames: string[];
  limit?: number;
}

/** Case studies that share tags with a blog post. Renders nothing when none match. */
export async function RelatedProjectsByTags({ tagNames, limit = 3 }: RelatedProjectsByTagsProps) {
  const projects = await getRelatedProjectsByTags(tagNames, limit);
  if (!projects.length) return null;

  return (
    <section aria-labelledby="related-projects-heading" className="mt-20">
      <div className="border-t border-white/10 pt-12">
        <h2
          id="related-projects-heading"
          className="text-white text-2xl sm:text-3xl font-bold"
        >
          See it in production
        </h2>
        <p className="mt-2 text-secondary">
          Case studies built with the techniques in this post.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectMiniCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
