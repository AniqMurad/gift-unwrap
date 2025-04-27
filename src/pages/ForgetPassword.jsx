import Footer from '@/components/Footer'
import { LoginLine } from '@/components/icons'
import PasswordField from '@/components/PasswordField'
import RememberIcon from '@/components/RememberIcon'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import UsernameField from '@/components/UsernameField'
import React from 'react'
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate("/signup");
      }
      
    return (
        <div>
            <SearchPageNavbar title="Forget Your Password" titleHome="Home Page" backgroundColor = '#FBF4E8'/>

            <div className="flex px-16 py-20 justify-between items-center">

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">Reset Your Password</h2>
                    <p className='text-[18px] mb-6'>We will send you an email to reset your password</p>
                    <UsernameField />
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-8 uppercase">Submit</button>
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">New Customer</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Be part of our growing family of new customers! Join us today and unlock
                        a world of exclusive benefits, offers, and personalized experiences.
                    </p>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase cursor-pointer" onClick={handleRegister}>REGISTER</button>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default ForgetPassword