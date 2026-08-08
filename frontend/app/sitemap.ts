import { MetadataRoute } from 'next'
import { BLOG_POSTS, PROJECTS } from '@/lib/data'

const BASE_URL = 'https://www.syshub365.com'

const SERVICE_SLUGS = [
  'web-development',
  'ai-integration',
  'ui-ux-design',
  'cloud-solutions',
  'digital-marketing',
  'cybersecurity',
  'software-licensing',
  'graphic-design',
  'erp-solutions',
  'crm-solutions',
]

const parsePostDate = (date: string) => {
  const d = new Date(`${date}, 2026`)
  return Number.isNaN(d.getTime()) ? new Date() : d
}

export default function sitemap(): MetadataRoute.Sitemap {
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
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Service detail pages
  const servicePages = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts
  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    lastModified: parsePostDate(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Projects
  const projects = PROJECTS.map((project) => ({
    url: `${BASE_URL}/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...servicePages, ...blogPosts, ...projects]
}
