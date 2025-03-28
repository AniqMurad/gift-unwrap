import Footer from "../components/Footer";
import { LoginLine } from "../components/icons";
import SearchPageNavbar from "../components/SearchPageNavbar";
import React from "react";
import UsernameField from "@/components/UsernameField";
import PasswordField from "@/components/PasswordField";
import RememberIcon from "@/components/RememberIcon";

const Login = () => {

    return (
        <>
            <SearchPageNavbar title="Login" titleHome="Home Page" />

            <div className="flex px-16 py-20 justify-between items-center">

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-6">Login</h2>
                    <div>
                        <UsernameField />
                        <PasswordField />
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <div className="flex items-center cursor-pointer">
                                <RememberIcon />
                                <span className="text-[#1F1F1F]">Remember me</span>
                            </div>
                            <a href="#" className="text-[16px] underline">Forgot Your Password?</a>
                        </div>
                    </div>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase">LOGIN</button>
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">New Customer</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Be part of our growing family of new customers! Join us today and unlock
                        a world of exclusive benefits, offers, and personalized experiences.
                    </p>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase">REGISTER</button>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default Login;
