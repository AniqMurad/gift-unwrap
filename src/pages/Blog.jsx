import React from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import { blogData } from "../components/BlogData";
import { Buttons } from "../components/Buttons";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Blog = () => {
  return (
    <div className="">
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar
        title="Blog"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="mt-[7%] px-16 mb-10">
        {/* Blog Posts Section */}
        <div className="w-full">
          {blogData.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="block mb-10">
              <div className="cursor-pointer">
                <div className="flex flex-col lg:flex-row bg-white overflow-hidden gap-5">
                  {/* Fixed image container */}
                  <div className="w-full lg:w-[480px] h-[320px] rounded-[28px] overflow-hidden flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">
                      {blog.category}
                    </span>
                    <h2 className="text-3xl font-semibold mt-5 capitalize">
                      {blog.title}
                    </h2>
                    <p className="text-[#696C70] text-sm mt-4">
                      {blog.authorDate}
                    </p>
                    <p className="text-[#333333] text-[15px] mt-4 leading-relaxed">
                      {blog.description}
                    </p>
                    <span className="text-black font-bold mt-4 inline-block border-b">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <Buttons />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
