import { MetadataRoute } from 'next'
import { articles, services, products } from "@/data/site-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maintechvn.com'

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/services',
    '/news',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug || service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes, ...serviceRoutes]
}
