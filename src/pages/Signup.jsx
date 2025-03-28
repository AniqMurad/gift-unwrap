import ConfirmPasswordField from '@/components/ConfirmPasswordField'
import Footer from '@/components/Footer'
import { LoginLine } from '@/components/icons'
import PasswordField from '@/components/PasswordField'
import RememberIcon from '@/components/RememberIcon'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import UsernameField from '@/components/UsernameField'
import React from 'react'

const Signup = () => {

    return (
        <div>
            <SearchPageNavbar title="Create An Account" titleHome="Home Page" />

            <div className="flex px-16 py-20 justify-between items-center">

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-6">Register</h2>
                    <div>
                        <UsernameField />
                        <PasswordField />
                        <ConfirmPasswordField />
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <div className="flex items-center">
                                <RememberIcon />
                                <span className="text-[#A0A0A0]">
                                    I agree to the <span className="text-[#1F1F1F]">Terms of Use</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase">REGISTER</button>
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">Already have an account?</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!
                    </p>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase">LOGIN</button>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Signup