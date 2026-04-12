import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Code, Wrench } from 'lucide-react';

async function getDashboardStats() {
  const supabase = await createClient();

  const [projects, experiences, technologies, services] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('experiences').select('id', { count: 'exact', head: true }),
    supabase.from('technologies').select('id', { count: 'exact', head: true }),
    supabase.from('services').select('id', { count: 'exact', head: true }),
  ]);

  return {
    projects: projects.count || 0,
    experiences: experiences.count || 0,
    technologies: technologies.count || 0,
    services: services.count || 0,
  };
}

async function getRecentProjects() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('projects')
    .select('id, name, slug, created_at, is_published')
    .order('created_at', { ascending: false })
    .limit(5);

  return data || [];
}

export default async function DashboardOverview() {
  const stats = await getDashboardStats();
  const recentProjects = await getRecentProjects();

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Work Experiences',
      value: stats.experiences,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Technologies',
      value: stats.technologies,
      icon: Code,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your portfolio CMS. Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <p className="text-gray-500">No projects yet</p>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-500">/{project.slug}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.is_published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {project.is_published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/dashboard/projects"
              className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Manage Projects</h3>
              <p className="text-sm text-gray-500">Add, edit, or delete projects</p>
            </a>
            <a
              href="/admin/dashboard/experiences"
              className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <Briefcase className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium">Manage Experiences</h3>
              <p className="text-sm text-gray-500">Update your work history</p>
            </a>
            <a
              href="/admin/dashboard/settings"
              className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <Wrench className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-medium">Site Settings</h3>
              <p className="text-sm text-gray-500">Update hero, bio, and SEO</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
