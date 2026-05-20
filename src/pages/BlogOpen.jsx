import React, { useState, useEffect } from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import { BlogLine, InvertedComas } from '../components/icons';
import avatar from '../assets/Avatar.png';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { fetchBlogById, fetchBlogs } from '../config/api';

const BlogOpen = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        const [blogResponse, blogsResponse] = await Promise.all([
          fetchBlogById(id),
          fetchBlogs()
        ]);
        setBlog(blogResponse.data);
        setAllBlogs(blogsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    loadBlogData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar showSearchInput={false} bgColor="#FBF4E8" />
        <SearchPageNavbar title="Blog" titleHome="Home Page" backgroundColor='#FBF4E8' />
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-xl">Loading blog...</p>
        </div>
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

  // Split content into paragraphs
  const contentParagraphs = blog.content ? blog.content.split('\n').filter(p => p.trim()) : [];

  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar title="Blog" titleHome="Home Page" backgroundColor='#FBF4E8' />

      <div className='px-16 py-4 mt-10 mb-10'>
        {/* Adjusted to full width as sidebar is removed */}
        <div className='flex justify-center'> {/* Use justify-center to center the content */}

          {/* content - Now takes full available width */}
          <div className='w-[1100px]'> {/* Adjust width as needed */}

            {/* heading */}
            <div className="mt-10">
              <div>
                <span className="bg-[#D2EF9A] text-black px-3 py-1 rounded-full text-[14px] font-semibold uppercase">
                  {blog.category}
                </span>
                <h1 className="text-[36px] font-bold mt-2">
                  {blog.title}
                </h1>
                {blog.subHeading && (
                  <h2 className="text-[24px] text-gray-700 mt-2">
                    {blog.subHeading}
                  </h2>
                )}
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <img src={avatar} className='h-[40px] w-[40px] rounded-full' alt="Author Avatar" />
                <p className="text-[#696C70] text-[14px] mt-1">{blog.authorDate}</p>
              </div>
            </div>

            {/* main blog image */}
            <div className="mt-6">
              <img
                src={blog.mainImage}
                alt={blog.title}
                className="w-full rounded-lg h-[640px] object-cover"
              />
            </div>

            {/* Dynamic Blog Content Sections */}
            <div className='mt-10'>

              {/* Blog content paragraphs */}
              {contentParagraphs.length > 0 && (
                <div className="mt-8">
                  {contentParagraphs.map((para, index) => (
                    <p key={index} className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                      {para}
                    </p>
                  ))}
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
                    />
                  ))}
                </div>
              )}
            </div>

            {/* next prev logic */}
            {allBlogs.length > 1 && (
              <div className="items-center border-t border-b border-[#E9E9E9] flex justify-between text-sm mt-10 h-[90px]">
                {/* Previous */}
                <div className="flex-1 text-left">
                  <span className="block text-xs text-[#A0A0A0]">PREVIOUS</span>
                  <Link to={`/blog/${prevBlog.id}`}>
                    <p className="font-medium text-[#1F1F1F] mt-2 hover:underline line-clamp-1">
                      {prevBlog.title}
                    </p>
                  </Link>
                </div>

                {/* Divider */}
                <div><BlogLine /></div>

                {/* Next */}
                <div className="flex-1 text-right">
                  <span className="block text-xs text-[#A0A0A0]">NEXT</span>
                  <Link to={`/blog/${nextBlog.id}`}>
                    <p className="font-medium text-[#1F1F1F] mt-2 hover:underline line-clamp-1">
                      {nextBlog.title}
                    </p>
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* news insight */}
        <div className="mt-20">
          <h1 className="text-3xl font-bold text-center">News Insight</h1>
          <div className="flex flex-col lg:flex-row mt-10 justify-center gap-5 items-center">
            {allBlogs
              .filter(item => item.id !== blog.id) // Exclude current blog
              .sort(() => Math.random() - 0.5)           // Shuffle remaining blogs
              .slice(0, 3)                                // Pick 3 blogs
              .map(item => (
                <Link to={`/blog/${item.id}`} key={item.id} className="bg-white overflow-hidden mb-6 lg:mb-10 w-full max-w-[400px] lg:w-[400px] hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.mainImage}
                    alt={item.title}
                    className="w-full h-[270px] rounded-[28px] object-cover"
                  />
                  <div className="mt-4 px-2">
                    <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">{item.category}</span>
                    <h2 className="text-2xl font-semibold mt-2 line-clamp-2">{item.title}</h2>
                    <p className="text-[#696C70] text-sm mt-4">{item.authorDate}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default BlogOpen;