import React from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import { BlogLine, FbIcon, InstaIcon, LinkedinIcon, PintIcon, TwtIcon, YtIcon, InvertedComas } from '../components/icons';
import avatar from '../assets/Avatar.png';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { blogData } from '../components/BlogData';
import Navbar from '@/components/Navbar';

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

              {/* Placeholder for products if you still want them here, or remove */}
              {/* <div className="mt-10 grid grid-cols-3 gap-4">
                <Product />
                <Product />
                <Product />
              </div> */}

            </div>

            {/* sharepost */}
            <div className="flex justify-between items-center mb-4 mt-10">
              {/* Tags */}
              <div className="flex items-center space-x-2">
                <span className="text-[#1F1F1F] text-sm">Tag:</span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">FEATURED</span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">INTERVIEW</span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">CAREER</span>
              </div>

              {/* Social Share */}
              <div className="flex items-center space-x-3">
                <span className="text-[#1F1F1F] text-sm">Share</span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">
                  <FbIcon />
                </span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">
                  <LinkedinIcon />
                </span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">
                  <TwtIcon />
                </span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">
                  <PintIcon />
                </span>
                <span className="px-3 py-1 bg-[#F7F7F7] text-[#1F1F1F] text-xs rounded-full">
                  <YtIcon />
                </span>
              </div>
            </div>

            {/* next pre */}
            <div className="items-center border-t border-b border-[#E9E9E9] flex justify-between text-sm mt-10 h-[90px]">
              <div className="flex-1 text-left">
                <span className="block text-xs text-[#A0A0A0]">PREVIOUS</span>
                <p className="font-medium text-[#1F1F1F] mt-2">I Couldn't Help But Splurge On These Epic Fall Finds</p>
              </div>
              <div className=''>
                <BlogLine />
              </div>
              <div className="flex-1 text-right">
                <span className="block text-xs text-[#A0A0A0]">NEXT</span>
                <p className="font-medium text-[#1F1F1F] mt-2">My Mani Photo Dump To Save To Your Nail Inspo Folder</p>
              </div>
            </div>

          </div>

        </div>

        {/* news insight */}
        <div className='mt-15'>
          <h1 className='text-3xl font-bold text-center'>News insight</h1>
          <div className='flex mt-10 justify-center gap-5 flex-wrap'>

            {blogData.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white items-center overflow-hidden mb-10 w-[400px]">
                <img src={item.image} alt={item.title} className="w-[400px] h-[270px] rounded-[28px] object-cover" />
                <div className="mt-4">
                  <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">{item.category}</span>
                  <h2 className="text-3xl font-semibold mt-2">{item.title}</h2>
                  <p className="text-[#696C70] text-sm mt-4">{item.authorDate}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default BlogOpen;