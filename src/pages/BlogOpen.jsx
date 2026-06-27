import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import SearchPageNavbar from '../components/SearchPageNavbar';
import { BlogLine, InvertedComas, LeftIcon } from '../components/icons';
import avatar from '../assets/Avatar.png';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../config/api';
import TableOfContents from '../components/TableOfContents';
import { generateSlug, findBlogBySlug } from '../utils/slugify';

const BlogOpen = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        const blogsResponse = await fetchBlogs();
        setAllBlogs(blogsResponse.data);
        setBlog(findBlogBySlug(blogsResponse.data, slug));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    loadBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <Navbar showSearchInput={false} bgColor="#FBF4E8" />
        <SearchPageNavbar title="Blog" titleHome="Home Page" backgroundColor='#FBF4E8' />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar showSearchInput={false} bgColor="#FBF4E8" />
        <SearchPageNavbar title="Blog" titleHome="Home Page" backgroundColor='#FBF4E8' />
        <h2 className="text-center text-2xl font-bold mt-10">Blog Not Found</h2>
        <Footer />
      </div>
    );
  }

  // Find current blog index for prev/next navigation
  const currentIndex = allBlogs.findIndex(b => b.id === blog.id);
  const prevBlog = allBlogs[(currentIndex - 1 + allBlogs.length) % allBlogs.length];
  const nextBlog = allBlogs[(currentIndex + 1) % allBlogs.length];

  // Generate meta tags with fallback to auto-generated values
  const generateMetaTitle = (blogPost) => {
    if (blogPost.metaTitle) {
      return blogPost.metaTitle;
    }
    return `${blogPost.title} | Gift Unwrap Blog`;
  };

  const generateMetaDescription = (blogPost) => {
    if (blogPost.metaDescription) {
      return blogPost.metaDescription;
    }
    return blogPost.subHeading || '';
  };

  // Parse [text](url) markdown links and **bold** text within a paragraph string
  const parseParagraphLinks = (text) => {
    const inlineRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = inlineRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      if (match[3] !== undefined) {
        parts.push(<strong key={match.index}>{match[3]}</strong>);
      } else {
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {match[1]}
          </a>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Parse blog content into headings, lists and paragraphs.
  // Supported per-line syntax: "## " (heading), "### " (sub-heading),
  // "- "/"* " (bullet item), "1. " (numbered item) — everything else is a paragraph.
  const renderBlogContent = (content) => {
    if (!content) return null;

    const blocks = [];
    let currentList = null;

    const flushList = () => {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
    };

    content.split('\n').forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        return;
      }

      const h2Match = line.match(/^##\s+(.+)/);
      const h3Match = line.match(/^###\s+(.+)/);
      const bulletMatch = line.match(/^[-*]\s+(.+)/);
      const numberMatch = line.match(/^\d+\.\s+(.+)/);

      if (h2Match) {
        flushList();
        blocks.push({ type: 'h2', text: h2Match[1] });
      } else if (h3Match) {
        flushList();
        blocks.push({ type: 'h3', text: h3Match[1] });
      } else if (bulletMatch) {
        if (!currentList || currentList.type !== 'ul') {
          flushList();
          currentList = { type: 'ul', items: [] };
        }
        currentList.items.push(bulletMatch[1]);
      } else if (numberMatch) {
        if (!currentList || currentList.type !== 'ol') {
          flushList();
          currentList = { type: 'ol', items: [] };
        }
        currentList.items.push(numberMatch[1]);
      } else {
        flushList();
        blocks.push({ type: 'paragraph', text: line });
      }
    });
    flushList();

    return blocks.map((block, index) => {
      if (block.type === 'h2') {
        return (
          <h2 key={index} className="text-[20px] font-bold text-[#1F1F1F] mt-6 mb-2">
            {parseParagraphLinks(block.text)}
          </h2>
        );
      }
      if (block.type === 'h3') {
        return (
          <h3 key={index} className="text-[17px] font-semibold text-[#1F1F1F] mt-5 mb-2">
            {parseParagraphLinks(block.text)}
          </h3>
        );
      }
      if (block.type === 'ul') {
        return (
          <ul key={index} className="list-disc pl-6 mt-2 space-y-1 text-[#1F1F1F] text-[15px] leading-snug">
            {block.items.map((item, i) => (
              <li key={i}>{parseParagraphLinks(item)}</li>
            ))}
          </ul>
        );
      }
      if (block.type === 'ol') {
        return (
          <ol key={index} className="list-decimal pl-6 mt-2 space-y-1 text-[#1F1F1F] text-[15px] leading-snug">
            {block.items.map((item, i) => (
              <li key={i}>{parseParagraphLinks(item)}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={index} className="mt-3 text-[#1F1F1F] text-[15px] leading-snug">
          {parseParagraphLinks(block.text)}
        </p>
      );
    });
  };

  return (
    <div>
      <Helmet>
        <title>{generateMetaTitle(blog)}</title>
        <meta name="description" content={generateMetaDescription(blog)} />
        <link rel="canonical" href={`${window.location.origin}${window.location.pathname}`} />
        <meta property="og:title" content={generateMetaTitle(blog)} />
        <meta property="og:description" content={generateMetaDescription(blog)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.mainImage || ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateMetaTitle(blog)} />
        <meta name="twitter:description" content={generateMetaDescription(blog)} />
        <meta name="twitter:image" content={blog.mainImage || ''} />
      </Helmet>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar title="Blog" titleHome="Home Page" backgroundColor='#FBF4E8' />

      <div className='px-6 md:px-10 lg:px-12 py-4 mt-2 mb-10'>
        <div className='flex justify-center gap-10 lg:gap-14 max-w-[1100px] mx-auto'>

          {/* content - comfortable reading width, leaves room for the TOC sidebar */}
          <div className='w-full max-w-[760px]'>

            {/* heading */}
            <div className="mt-2">
              <div>
                <span className="bg-[#D2EF9A] text-black px-3 py-1 rounded-full text-[14px] font-semibold uppercase">
                  {blog.category}
                </span>
                <h1 className="text-[26px] font-bold mt-2 leading-snug">
                  {blog.title}
                </h1>
                {blog.subHeading && (
                  <h2 className="text-[17px] text-gray-700 mt-2 leading-snug">
                    {blog.subHeading}
                  </h2>
                )}
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <img src={avatar} className='h-[40px] w-[40px] rounded-full' alt="Author Avatar" decoding="async" />
                <p className="text-[#696C70] text-[14px] mt-1">{blog.authorDate}</p>
              </div>
            </div>

            {/* main blog image */}
            <div className="mt-6">
              <img
                src={blog.mainImage}
                alt={blog.title}
                className="w-full rounded-lg h-[320px] object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            {/* Dynamic Blog Content Sections */}
            <div className='mt-10'>

              {/* Blog content */}
              {blog.content && (
                <div className="mt-8" ref={contentRef}>
                  {renderBlogContent(blog.content)}
                </div>
              )}

              {/* Content images */}
              {blog.contentImages && blog.contentImages.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-8">
                  {blog.contentImages.slice(0, 2).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Content ${index + 1}`}
                      className="w-full rounded-[32px] object-cover h-[300px]"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* next prev logic */}
            {allBlogs.length > 1 && (
              <div className="border-t border-b border-[#E9E9E9] flex flex-col sm:flex-row text-sm mt-10">
                {/* Previous */}
                <Link
                  to={`/blog/${generateSlug(prevBlog.title)}`}
                  className="group flex-1 flex items-center gap-3 py-5 sm:py-0 sm:h-[90px] px-2 rounded-lg hover:bg-[#FBF4E8] transition-colors duration-200"
                >
                  <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-1">
                    <LeftIcon />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs text-[#A0A0A0]">PREVIOUS</span>
                    <p className="font-medium text-[#1F1F1F] mt-2 group-hover:underline line-clamp-1">
                      {prevBlog.title}
                    </p>
                  </div>
                </Link>

                {/* Divider */}
                <div className="hidden sm:flex items-center justify-center px-2">
                  <BlogLine />
                </div>

                {/* Next */}
                <Link
                  to={`/blog/${generateSlug(nextBlog.title)}`}
                  className="group flex-1 flex items-center justify-end gap-3 py-5 sm:py-0 sm:h-[90px] px-2 rounded-lg text-right hover:bg-[#FBF4E8] transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <span className="block text-xs text-[#A0A0A0]">NEXT</span>
                    <p className="font-medium text-[#1F1F1F] mt-2 group-hover:underline line-clamp-1">
                      {nextBlog.title}
                    </p>
                  </div>
                  <span className="shrink-0 rotate-180 transition-transform duration-200 group-hover:translate-x-1">
                    <LeftIcon />
                  </span>
                </Link>
              </div>
            )}

          </div>

          <TableOfContents containerRef={contentRef} watch={blog.content} />

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default BlogOpen;