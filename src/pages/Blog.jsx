import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import { blogData } from '../components/BlogData';
import { Buttons } from '../components/Buttons'
import { SearchIcon } from '../components/icons'
import Footer from '../components/Footer'
import BlogSideBarSuggestion from '../components/BlogSideBarSuggestion'
import { Link } from 'react-router-dom';

const Blog = () => {

  return (
    <div className=''>
      <SearchPageNavbar title="Blog" titleHome="Home Page" />
      <div className="mt-[7%] px-16 flex justify-between mb-10">

        {/* Blog Posts Section */}
        <div className="w-[960px]">
          {blogData.slice(3, 7).map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className=''>
              <div className='cursor-pointer'>
                <div className="flex bg-white items-center overflow-hidden mb-10 gap-5 h-[320px]">
                  <img src={blog.image} className="w-[480px] h-[320px] rounded-[28px]" />
                  <div className="p-4">
                    <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">{blog.category}</span>
                    <h2 className="text-3xl font-semibold mt-5 capitalize">{blog.title}</h2>
                    <p className="text-[#696C70] text-sm mt-4">
                      {blog.authorDate}
                    </p>
                    <p className="text-[#696C70] mt-4">I love splurging on some amazing designer bags but also finding cute budget-friendly ones as well...</p>
                    <a href="#" className="text-black font-bold mt-4 inline-block border-b">Read More</a>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <Buttons />

        </div>

        {/* Sidebar */}
        <div className="w-[270px]">

          <div className='flex justify-between px-[20px] py-[11px] items-center border rounded-[12px] mb-10 border-[#E9E9E9]'>
            <input
              type="text"
              placeholder="Search"
              className=" w-auto"
            />
            <SearchIcon />
          </div>
          <div className="bg-white border-b border-[#E9E9E9]">
            <BlogSideBarSuggestion />
          </div>

          <div className="bg-white border-b border-[#E9E9E9] mb-10">
            <h3 className="font-semibold text-xl mb-6">Categories</h3>
            <ul className="mt-2 mb-6 space-y-2 text-sm text-[#696C70]">
              <li className='flex justify-between items-center mb-3'><span>Birthday Blogs</span><span className="text-[#A0A0A0]">(112)</span></li>
              <li className='flex justify-between items-center mb-3'><span>Valentines Blogs</span><span className="text-[#A0A0A0]">(32)</span></li>
              <li className='flex justify-between items-center mb-3 text-black'><span className='underline'>Gift Ideas Blogs</span><span>(42)</span></li>
              <li className='flex justify-between items-center mb-3'><span>Tips and Inspiration Blogs</span><span className="text-[#A0A0A0]">(13)</span></li>
              <li className='flex justify-between items-center mb-3'><span>Children Blogs</span><span className="text-[#A0A0A0]">(54)</span></li>
              <li className='flex justify-between items-center mb-3'><span>Eid ul Fitr Blogs</span><span className="text-[#A0A0A0]">(93)</span></li>
              <li className='flex justify-between items-center mb-3'><span>Ramadan Blogs</span><span className="text-[#A0A0A0]">(52)</span></li>
              <li className='flex justify-between items-center mb-6'><span>Eid ul Adha Blogs</span><span className="text-[#A0A0A0]">(14)</span></li>
            </ul>
          </div>

          <div className="bg-white mb-10">
            <h3 className="font-semibold text-xl mb-6">Popular Tag</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className='flex gap-5'>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>Children</p>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>baby</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>birthday</p>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>ramadan</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>couple</p>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>mother</p>
              </div>
              <div className='flex gap-5'>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>business</p>
                <p className='text-xs text-[#696C70] px-3 py-1 border rounded-[65px] border-[#E9E9E9] bg-[#FFFFFF] uppercase'>eid ul fitr</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Blog