import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import { BlogLine, FbIcon, InstaIcon, InvertedComas, LinkedinIcon, PintIcon, TwtIcon, YtIcon } from '../components/icons'
import baby1 from '../assets/baby1.png'
import baby2 from '../assets/baby2.png'
import main from '../assets/main.png'
import avatar from '../assets/Avatar.png'
import Product from '../components/Product'
import blog1 from '../assets/b1.png'
import Footer from '../components/Footer'
import BlogSideBarSuggestion from '../components/BlogSideBarSuggestion'
import { useParams } from 'react-router-dom';
import { blogData } from '../components/BlogData';

const BlogOpen = () => {

    const { id } = useParams();
    const blog = blogData.find(item => item.id === parseInt(id));

    if (!blog) {
        return <h2 className="text-center text-2xl font-bold mt-10">Blog Not Found</h2>;
    }

    return (
        <div>
            <SearchPageNavbar title="Blog" title2="Blog" titleHome="Home Page" />

            <div className='px-16 py-4 mt-10 mb-10'>


                {/* group 4 */}
                <div className='flex justify-between'>

                    {/* content */}
                    <div className='w-[960px]'>

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
                                <img src={avatar} className='h-[40px] w-[40px] rounded-[1000px]' />
                                <p className="text-[#696C70] text-[14px] mt-1">{blog.authorDate}</p>
                            </div>
                        </div>

                        {/* image */}
                        <div className="mt-6">
                            <img
                                src={blog.image}
                                alt="Main"
                                className="w-full rounded-lg h-[640px]"
                            />
                        </div>

                        {/* post */}
                        <div className='mt-10'>
                            <p className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                                Kim Kardashian West needs no introduction. In the 14 years since she first graced our screens in Keeping Up With The Kardashians, she has built her KKW beauty empire, filmed her show, wrapped her show, become a billionaire, studied law, campaigned for the rights of death row inmates, travelled the world to attend events such as Paris Fashion Week, raised four children and launched her wildly successful shapewear brand SKIMS.
                            </p>

                            <div>
                                <h1 className="text-3xl font-bold mt-6">
                                    How did SKIMS start?
                                </h1>
                                <p className="mt-2 text-[#1F1F1F] text-[18px] leading-relaxed">
                                    For bras, I love our Cotton Jersey Scoop Bralette – it’s lined with this amazing power mesh so you get great support and is so comfy I can sleep in it. I also love our Seamless Sculpt Bodysuit – it’s the perfect all in one sculpting, shaping and smoothing shapewear piece with different levels of support woven throughout.
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-8">
                                <img
                                    src={baby1}
                                    alt="Baby 1"
                                    className="w-full rounded-[32px]"
                                />
                                <img
                                    src={baby2}
                                    alt="Baby 2"
                                    className="w-full rounded-[32px]"
                                />
                            </div>

                            <p className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                                Campaigned for the rights of death row inmates, travelled the world to attend events such as Paris Fashion Week, raised four children and launched her wildly successful shapewear brand SKIMS.
                            </p>

                            <div>
                                <h1 className="text-3xl font-bold mt-6">
                                    How did SKIMS start?
                                </h1>
                                <p className="mt-2 text-[#1F1F1F] text-[18px] leading-relaxed">
                                    For bras, I love our Cotton Jersey Scoop Bralette – it’s lined with this amazing power mesh so you get great support and is so comfy I can sleep in it. I also love our Seamless Sculpt Bodysuit – it’s the perfect all in one sculpting, shaping and smoothing shapewear piece with different levels of support woven throughout.
                                </p>
                            </div>

                            <div className="border border-[#E9E9E9] mt-8 px-10 py-6 rounded-[20px] flex items-center gap-10">
                                <div>
                                    <InvertedComas />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold">
                                        “For Bras, I Love Our Cotton Jersey Scoop Bralette – It’s Lined With This Amazing
                                        Power Mesh So You Get Great Support And Is So Comfy I Can Sleep In It.”
                                    </p>
                                    <p className="mt-2 text-[#696C70]">- ANTHONY BOURDAIN</p>
                                </div>
                            </div>

                            <p className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                                Kim Kardashian West needs no introduction. In the 14 years since she first graced our screens in Keeping Up With The Kardashians, she has built her KKW beauty empire, filmed her show, wrapped her show, become a billionaire, studied law, campaigned for the rights of death row inmates, travelled the world to attend events such as Paris Fashion Week, raised four children and launched her wildly successful shapewear brand SKIMS.
                            </p>

                            <div className="mt-10 grid grid-cols-3 gap-4">
                                <Product />
                                <Product />
                                <Product />
                            </div>

                            <p className="mt-6 text-[#1F1F1F] text-[18px] leading-relaxed">
                                For bras, I love our Cotton Jersey Scoop Bralette – it’s lined with this amazing power mesh so you get great support and is so comfy I can sleep in it. I also love our Seamless Sculpt Bodysuit.
                            </p>
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

                    {/* sidebar */}
                    <div className='w-[270px]'>

                        <div>

                            <div className='flex justify-between items-center'>
                                <img
                                    src={avatar}
                                    alt="Jessie Nguyen"
                                    className="w-[100px] h-[100px] rounded-[1000px]"
                                />

                                <div>
                                    <div>
                                        <h3 className="text-xl font-semibold mt-2">Jessie Nguyen</h3>
                                        <p className="text-sm text-[#696C70]">200 Follower</p>
                                    </div>
                                    <button className="mt-3 px-4 py-1 bg-white text-black text-sm border border-[#E9E9E9] rounded-[1000px]">
                                        Follow
                                    </button>
                                </div>
                            </div>

                            <div className='mb-10'>
                                <p className="text-[16px] text-[#696C70] mt-4">
                                    Jessie Nguyen (@Jessie_ng) is a writer who draws. He’s the Bestselling author of “Number of The Year”. Donec vitae tortor efficitur, convallis lelobortis elit.
                                </p>
                                <div className='flex gap-4 items-center mt-4'>
                                    <FbIcon />
                                    <InstaIcon />
                                    <YtIcon />
                                    <PintIcon />
                                </div>
                            </div>

                        </div>

                        <div>
                            <div className="bg-white mb-10">
                                <BlogSideBarSuggestion />
                            </div>
                        </div>

                        <div className='bg-[#F7F7F7] rounded-[20px] h-[250px] flex flex-col justify-center items-center text-center'>
                            <h4 className="text-[24px] font-semibold mb-3">Subscribe For Daily Newsletter</h4>
                            <form className='w-[220px]'>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="text-center bg-[#FFFFFF] w-full h-[50px] border border-[#FFFFFF] rounded-[12px] text-sm focus:outline-none focus:ring"
                                />
                                <button className="mt-3 w-full h-[50px] bg-black text-white rounded-[12px]">
                                    SIGN UP
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

                {/* news insight */}
                <div className='mt-15'>
                    <h1 className='text-3xl font-bold text-center'>News insight</h1>
                    <div className='flex mt-10 justify-between gap-5 flex-wrap'>

                        {blogData.slice(0, 3).map((item) => (
                            <div key={item.id} className="bg-white items-center overflow-hidden mb-10 w-[400px]">
                                <img src={item.image} alt={item.title} className="w-[400px] h-[270px] rounded-[28px]" />
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
    )
}

export default BlogOpen