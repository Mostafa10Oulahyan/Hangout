import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { blogPosts } from "../data";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    const readTime = Math.ceil(
        (post.intro.length + post.sections.reduce((acc, s) => acc + s.content.length, 0) + post.conclusion.length) / 1200
    );

    return (
        <main className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
            {/* Hero Section with Background Image */}
            <section className="relative min-h-[70vh] flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40"></div>
                </div>

                {/* Navbar */}
                <div className="relative z-50">
                    <Navbar />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex-1 flex items-end pb-16 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto w-full">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group text-sm">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Meta badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
                                <MapPin className="w-3 h-3" /> {post.countryCode}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium backdrop-blur-sm">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium backdrop-blur-sm">
                                <Clock className="w-3 h-3" /> {readTime} min read
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-2xl max-w-4xl">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="relative z-20 -mt-8">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/60 border border-gray-100 p-8 md:p-12 lg:p-16">

                        {/* Intro */}
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-14 first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                            {post.intro}
                        </p>

                        {/* Sections */}
                        <div className="space-y-10">
                            {post.sections.map((section, index) => (
                                <div key={index}>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Conclusion */}
                        <div className="mt-14 pt-8 border-t border-gray-100">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">In Conclusion</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {post.conclusion}
                            </p>
                        </div>

                        {/* Back to Blog CTA */}
                        <div className="mt-14 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to All Posts
                            </Link>
                            <span className="text-sm text-gray-400">{post.date} · {readTime} min read</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer before footer */}
            <div className="py-16"></div>

            <Footer />
        </main>
    );
}
