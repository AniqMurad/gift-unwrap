import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import blog1 from '../assets/b1.png'
import sidebar1 from '../assets/sb1.png'
import { Buttons } from '../components/Buttons'
import { SearchIcon } from '../components/icons'
import Footer from '../components/Footer'



const Blog = () => {

  return (
    <div className=''>
      <SearchPageNavbar title="Blog" />
      <div className="mt-[7%] container px-16 flex justify-between mb-10">

        {/* Blog Posts Section */}
        <div className="w-[960px]">
          <div className="flex bg-white items-center overflow-hidden mb-10">
            <img src={blog1} className="w-[480px] h-[320px] rounded-[28px]" />
            <div className="p-4">
              <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">BABY, CHILDREN</span>
              <h2 className="text-3xl font-semibold mt-2">Great Gifts For A Fun Children's Room</h2>
              <p className="text-[#696C70] text-sm mt-4">
                By Tony Nguyen — Oct 12, 2023
              </p>
              <p className="text-[#696C70] mt-4">I love splurging on some amazing designer bags but also finding cute budget-friendly ones as well...</p>
              <a href="#" className="text-black font-bold mt-4 inline-block border-b">Read More</a>
            </div>
          </div>

          <div className="flex bg-white items-center overflow-hidden mb-10">
            <img src={blog1} className="w-[480px] h-[320px] rounded-[28px]" />
            <div className="p-4">
              <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">BABY, CHILDREN</span>
              <h2 className="text-3xl font-semibold mt-2">Great Gifts For A Fun Children's Room</h2>
              <p className="text-[#696C70] text-sm mt-4">
                By Tony Nguyen — Oct 12, 2023
              </p>
              <p className="text-[#696C70] mt-4">I love splurging on some amazing designer bags but also finding cute budget-friendly ones as well...</p>
              <a href="#" className="text-black font-bold mt-4 inline-block border-b">Read More</a>
            </div>
          </div>

          <div className="flex bg-white items-center overflow-hidden mb-10">
            <img src={blog1} className="w-[480px] h-[320px] rounded-[28px]" />
            <div className="p-4">
              <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">BABY, CHILDREN</span>
              <h2 className="text-3xl font-semibold mt-2">Great Gifts For A Fun Children's Room</h2>
              <p className="text-[#696C70] text-sm mt-4">
                By Tony Nguyen — Oct 12, 2023
              </p>
              <p className="text-[#696C70] mt-4">I love splurging on some amazing designer bags but also finding cute budget-friendly ones as well...</p>
              <a href="#" className="text-black font-bold mt-4 inline-block border-b">Read More</a>
            </div>
          </div>

          <div className="flex bg-white items-center overflow-hidden mb-10">
            <img src={blog1} className="w-[480px] h-[320px] rounded-[28px]" />
            <div className="p-4">
              <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">BABY, CHILDREN</span>
              <h2 className="text-3xl font-semibold mt-2">Great Gifts For A Fun Children's Room</h2>
              <p className="text-[#696C70] text-sm mt-4">
                By Tony Nguyen — Oct 12, 2023
              </p>
              <p className="text-[#696C70] mt-4">I love splurging on some amazing designer bags but also finding cute budget-friendly ones as well...</p>
              <a href="#" className="text-black font-bold mt-4 inline-block border-b">Read More</a>
            </div>
          </div>

          <Buttons />

        </div>

        {/* Sidebar */}
        <div className="w-[270px]">

          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-[12px] p-2 mb-6"
          />
          <SearchIcon />

          <div className="bg-white border-b border-[#E9E9E9] mb-10">
            <h3 className="font-bold text-lg mb-6">Recent Posts</h3>
            <div className="flex justify-between w-[270px] mb-6">
              <img
                src={sidebar1}
                className="w-[80px] h-[80px] rounded-md object-cover"
              />
              <div className='w-[170px] flex flex-col justify-center'>
                <div className="w-max bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] inline-block">
                  BABY, NEWBORN
                </div>
                <p className="text-sm text-black mt-2">How To Organize Baby Visits And Keep...</p>
              </div>
            </div>

            <div className="flex justify-between w-[270px] mb-6">
              <img
                src={sidebar1}
                className="w-[80px] h-[80px] rounded-md object-cover"
              />
              <div className='w-[170px] flex flex-col justify-center'>
                <div className="w-max bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] inline-block">
                  BABY, NEWBORN
                </div>
                <p className="text-sm text-black mt-2">How To Organize Baby Visits And Keep...</p>
              </div>
            </div>

            <div className="flex justify-between w-[270px] mb-6">
              <img
                src={sidebar1}
                className="w-[80px] h-[80px] rounded-md object-cover"
              />
              <div className='w-[170px] flex flex-col justify-center'>
                <div className="w-max bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] inline-block">
                  BABY, NEWBORN
                </div>
                <p className="text-sm text-black mt-2">How To Organize Baby Visits And Keep...</p>
              </div>
            </div>
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