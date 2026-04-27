import { BLOG_POSTS } from "@/lib/data";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";

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

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
