import { BLOG_POSTS } from "@/lib/data";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";
import { ArticleJsonLd, BreadcrumbJsonLd } from "next-seo";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | SysHub365 Blog`,
    description: post.excerpt,
    keywords: [
      "SysHub365 blog",
      "software engineering",
      "tech insights",
      post.title,
    ],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.img],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);

  if (!post) return <BlogDetailClient />;

  return (
    <>
      <BreadcrumbJsonLd
        scriptKey="blog-breadcrumb"
        items={[
          { name: "Home", item: "https://syshub365.com" },
          { name: "Blog", item: "https://syshub365.com/blog" },
          { name: post.title, item: `https://syshub365.com/blog/${slug}` },
        ]}
      />
      <ArticleJsonLd
        scriptKey="blog-article"
        type="Article"
        url={`https://syshub365.com/blog/${slug}`}
        headline={post.title}
        description={post.excerpt}
        image={post.img}
        datePublished={post.date}
        author="SYSHUB365"
        publisher={{
          "@type": "Organization",
          name: "SYSHUB365",
          logo: { "@type": "ImageObject", url: "https://syshub365.com/images/logo.png" },
        }}
      />
      <BlogDetailClient />
    </>
  );
}
