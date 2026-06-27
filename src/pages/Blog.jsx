import React, { useState, useEffect } from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import { Buttons } from "../components/Buttons";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { fetchBlogs } from "../config/api";
import { generateSlug } from "../utils/slugify";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Navbar showSearchInput={false} bgColor="#FBF4E8" />
        <SearchPageNavbar
          title="Blog"
          titleHome="Home Page"
          backgroundColor="#FBF4E8"
        />
        <Loader />
        <Footer />
      </div>
    );
  }

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
          {blogs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No blogs available at the moment.</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <Link key={blog.id} to={`/blog/${generateSlug(blog.title)}`} className="block mb-10">
                <div className="cursor-pointer">
                  <div className="flex flex-col lg:flex-row bg-white overflow-hidden gap-5">
                    {/* Fixed image container */}
                    <div className="w-full lg:w-[480px] h-[320px] rounded-[28px] overflow-hidden flex-shrink-0">
                      <img
                        src={blog.mainImage}
                        alt={blog.title}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <span className="bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] uppercase">
                        {blog.category}
                      </span>
                      <h2 className="text-lg font-semibold mt-3 leading-snug capitalize">
                        {blog.title}
                      </h2>
                      <p className="text-[#696C70] text-xs mt-2">
                        {blog.authorDate}
                      </p>
                      <p className="text-[#333333] text-sm mt-2 leading-snug line-clamp-3">
                        {blog.subHeading}
                      </p>
                      <span className="text-black text-sm font-bold mt-2 inline-block border-b">
                        Read More
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

          <Buttons />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
