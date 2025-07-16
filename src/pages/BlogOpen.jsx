import React from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import { BlogLine, FbIcon, InstaIcon, LinkedinIcon, PintIcon, TwtIcon, YtIcon, InvertedComas } from '../components/icons';
import avatar from '../assets/Avatar.png';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { blogData } from '../components/BlogData';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const BlogOpen = () => {
  const { id } = useParams();
  const blog = blogData.find(item => item.id === parseInt(id));

  if (!blog) {
    return <h2 className="text-center text-2xl font-bold mt-10">Blog Not Found</h2>;
  }

  // Destructure content for easier access, provide defaults if not present
  const { blogContent = {} } = blog;
  const {
    introText = "",
    qaHeading = "Questions & Answers",
    qaPairs = [],
    images = [],
    singleQa = {},
    quote = {},
    paragraphs = []
  } = blogContent;

  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar title="Blog" title2="Blog" titleHome="Home Page" backgroundColor='#FBF4E8' />

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
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <img src={avatar} className='h-[40px] w-[40px] rounded-full' alt="Author Avatar" />
                <p className="text-[#696C70] text-[14px] mt-1">{blog.authorDate}</p>
              </div>
            </div>

            {/* main blog image */}
            <div className="mt-6">
              <img
                src={blog.image}
                alt={blog.altText || blog.title}
                className="w-full rounded-lg h-[640px] object-cover"
              />
            </div>

            {/* Dynamic Blog Content Sections */}
            <div className='mt-10'>

              {/* 2 line text below image */}
              {introText && (
                <p className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                  {introText}
                </p>
              )}

              {/* Question and answer related to blog */}
              {qaPairs.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-3xl font-bold mt-6">{qaHeading}</h2>
                  {qaPairs.map((qa, index) => (
                    <div key={index} className="mt-4">
                      <h3 className="text-xl font-semibold">{qa.question}</h3>
                      <p className="mt-2 text-[#1F1F1F] text-[18px] leading-relaxed">{qa.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 2 images */}
              {images.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-8">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img.src}
                      alt={img.alt}
                      className="w-full rounded-[32px] object-cover h-[300px]" // Added h-[300px] for consistent height
                    />
                  ))}
                </div>
              )}

              {/* One question and its answer */}
              {singleQa.question && (
                <div className="mt-8">
                  <h2 className="text-3xl font-bold mt-6">{singleQa.question}</h2>
                  <p className="mt-2 text-[#1F1F1F] text-[18px] leading-relaxed">
                    {singleQa.answer}
                  </p>
                </div>
              )}

              {/* One quote */}
              {quote.text && (
                <div className="border border-[#E9E9E9] mt-8 px-10 py-6 rounded-[20px] flex items-center gap-10">
                  <div>
                    <InvertedComas />
                  </div>
                  <div>
                    <p className="text-xl font-semibold">
                      {quote.text}
                    </p>
                    {quote.author && <p className="mt-2 text-[#696C70]">- {quote.author}</p>}
                  </div>
                </div>
              )}

              {/* 2 paragraphs each of 5 lines */}
              {paragraphs.length > 0 && (
                <div className="mt-8">
                  {paragraphs.map((para, index) => (
                    <p key={index} className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* next pre */}
            {/* next prev logic */}
            <div className="items-center border-t border-b border-[#E9E9E9] flex justify-between text-sm mt-10 h-[90px]">
              {/* Previous */}
              <div className="flex-1 text-left">
                <span className="block text-xs text-[#A0A0A0]">PREVIOUS</span>
                <Link to={`/blog/${blogData[(blogData.findIndex(b => b.id === parseInt(id)) - 1 + blogData.length) % blogData.length].id}`}>
                  <p className="font-medium text-[#1F1F1F] mt-2 hover:underline">
                    {blogData[(blogData.findIndex(b => b.id === parseInt(id)) - 1 + blogData.length) % blogData.length].title}
                  </p>
                </Link>
              </div>

              {/* Divider */}
              <div><BlogLine /></div>

              {/* Next */}
              <div className="flex-1 text-right">
                <span className="block text-xs text-[#A0A0A0]">NEXT</span>
                <Link to={`/blog/${blogData[(blogData.findIndex(b => b.id === parseInt(id)) + 1) % blogData.length].id}`}>
                  <p className="font-medium text-[#1F1F1F] mt-2 hover:underline">
                    {blogData[(blogData.findIndex(b => b.id === parseInt(id)) + 1) % blogData.length].title}
                  </p>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* news insight */}
        <div className="mt-20">
          <h1 className="text-3xl font-bold text-center">News Insight</h1>
          <div className="flex flex-col lg:flex-row mt-10 justify-center gap-5 items-center">
            {blogData
              .filter(item => item.id !== parseInt(id)) // Exclude current blog
              .sort(() => Math.random() - 0.5)           // Shuffle remaining blogs
              .slice(0, 3)                                // Pick 3 blogs
              .map(item => (
                <Link to={`/blog/${item.id}`} key={item.id} className="bg-white overflow-hidden mb-6 lg:mb-10 w-full max-w-[400px] lg:w-[400px] hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.altText || item.title}
                    className="w-full h-[270px] rounded-[28px] object-cover"
                  />
                  <div className="mt-4 px-2">
                    <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">{item.category}</span>
                    <h2 className="text-2xl font-semibold mt-2">{item.title}</h2>
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