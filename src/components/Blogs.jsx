import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBlogs } from '../config/api';
import { generateSlug } from '../utils/slugify';

// Skeleton card matching the loaded blog card layout below
const BlogSkeleton = () => (
    <div className='w-full sm:w-[410px]'>
        <div
            className="w-full h-[275px] rounded-[20px]"
            style={{ backgroundColor: '#e5e7eb', animation: 'blogPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
        <div className="mt-6 space-y-3">
            <div
                className="h-[26px] w-[120px] rounded-full"
                style={{ backgroundColor: '#e5e7eb', animation: 'blogPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
            <div
                className="h-[20px] w-[90%] rounded"
                style={{ backgroundColor: '#e5e7eb', animation: 'blogPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
            <div
                className="h-[20px] w-[60%] rounded"
                style={{ backgroundColor: '#e5e7eb', animation: 'blogPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
            <div
                className="h-[14px] w-[40%] rounded mt-1"
                style={{ backgroundColor: '#e5e7eb', animation: 'blogPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
        </div>
    </div>
);

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await fetchBlogs();
                setBlogs(response.data.slice(0, 3)); // Get only first 3 blogs
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
            <div className='px-4 sm:px-8 lg:px-16 py-12'>
                <style>{`
                    @keyframes blogPulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
                <h1 className='flex justify-center font-bold text-3xl'>Blogs</h1>
                <div className='flex flex-col sm:flex-row sm:justify-between gap-5 mt-8'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <BlogSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='px-4 sm:px-8 lg:px-16 py-12'>
            <h1 className='flex justify-center font-bold text-3xl'>Blogs</h1>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-5 mt-8'>
                {blogs.map((blog) => (
                    <Link key={blog.id} to={`/blog/${generateSlug(blog.title)}`} className='w-full sm:w-[410px]'>
                        <div className='cursor-pointer'>
                            <img src={blog.mainImage} className="w-full h-[275px] object-cover rounded-[20px]" alt={blog.title} loading="lazy" decoding="async" />
                            <div className="mt-6">
                                <span className="bg-[#D2EF9A] text-[#1F1F1F] text-[14px] font-bold px-3 py-1 rounded-full uppercase">
                                    {blog.category}
                                </span>
                                <h3 className="mt-2 text-[20px] font-bold line-clamp-2">{blog.title}</h3>
                                <p className="text-[#696C70] text-[14px] mt-3">{blog.authorDate}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Blogs;