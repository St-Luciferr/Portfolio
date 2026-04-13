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
      color: 'text-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
    },
    {
      title: 'Work Experiences',
      value: stats.experiences,
      icon: Briefcase,
      color: 'text-green-700',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
    },
    {
      title: 'Technologies',
      value: stats.technologies,
      icon: Code,
      color: 'text-purple-700',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Wrench,
      color: 'text-orange-700',
      bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200',
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
            <Card key={stat.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">Total count</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Projects */}
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-gray-900">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {recentProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No projects yet</p>
              <p className="text-sm text-gray-400 mt-1">Create your first project to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">/{project.slug}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.is_published
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {project.is_published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">
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
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/projects"
              className="group p-6 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="p-3 bg-blue-50 rounded-lg w-fit mb-3 group-hover:bg-blue-100 transition-colors">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Manage Projects</h3>
              <p className="text-sm text-gray-600">Add, edit, or delete projects</p>
            </a>
            <a
              href="/admin/experiences"
              className="group p-6 bg-white border-2 border-green-100 rounded-xl hover:border-green-400 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="p-3 bg-green-50 rounded-lg w-fit mb-3 group-hover:bg-green-100 transition-colors">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Manage Experiences</h3>
              <p className="text-sm text-gray-600">Update your work history</p>
            </a>
            <a
              href="/admin/settings"
              className="group p-6 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="p-3 bg-orange-50 rounded-lg w-fit mb-3 group-hover:bg-orange-100 transition-colors">
                <Wrench className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Site Settings</h3>
              <p className="text-sm text-gray-600">Update hero, bio, and SEO</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
