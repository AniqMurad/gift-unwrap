import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBlogs } from '../config/api';

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
                <h1 className='flex justify-center font-bold text-3xl'>Blogs</h1>
                <div className='flex justify-center mt-8'>
                    <p>Loading blogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='px-4 sm:px-8 lg:px-16 py-12'>
            <h1 className='flex justify-center font-bold text-3xl'>Blogs</h1>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-5 mt-8'>
                {blogs.map((blog) => (
                    <Link key={blog.id} to={`/blog/${blog.id}`} className='w-full sm:w-[410px]'>
                        <div className='cursor-pointer'>
                            <img src={blog.mainImage} className="w-full h-[275px] object-cover rounded-[20px]" alt={blog.title} />
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