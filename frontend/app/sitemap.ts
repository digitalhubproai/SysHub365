import { MetadataRoute } from 'next'
import { BLOG_POSTS, PROJECTS } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://syshub365.com'
  
  // Base routes
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts
  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Projects
  const projects = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...blogPosts, ...projects]
}
