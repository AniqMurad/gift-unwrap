import Logo from "../assets/logo.png";
import React from "react";
import { UsersIcon, CartIcon, HeartIcon } from "./icons";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleCartClick = () => {
    navigate("/");
  };
  const handleSeacrh =() => {
    navigate("/search-output");
  }
  const handleLogin = () => {
    navigate("/login");
  }
  const handleRegister = () => {
    navigate("/signup");
  }

  return (
    <div className="flex items-center justify-between bg-[#ffff] px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img src={Logo} alt="" className="w-[173px] h-[42px]"/>
      </div>
      <div className="text-sm">
        <input
          className="rounded-tl-md rounded-bl-md text-[#A0A0A0] w-100 border border-[#E9E9E9] py-2 px-4"
          placeholder="What are you looking for today?"
        />
        <button className="rounded-tr-md rounded-br-md text-sm font-normal cursor-pointer border border-black bg-black text-white py-2 px-6" onClick={handleSeacrh}>
          SEARCH
        </button>
      </div>
      <div className="flex gap-5 items-center justify-between">
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline border-0">
                <UsersIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white p-2 shadow-lg border border-grey-200">
              <DropdownMenuItem>
                <Button className="bg-black text-white font-bold w-full cursor-pointer" onClick={handleLogin}>
                  LOGIN
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="w-full flex justify-center whitespace-nowrap">
                  <span className="text-[#A0A0A0]">
                    Don't have an account?{" "}
                    <strong className="text-black cursor-pointer" onClick={handleRegister}>Register</strong>
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline border-0">
                <HeartIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white p-2 border border-grey-200">
              <DropdownMenuLabel className="text-xl font-bold">
                Wish List
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <div className="w-100% flex justify-center">
                    No Items Available
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  className="bg-black text-white font-bold"
                  onClick={handleWishlistClick}
                >
                  VIEW ALL WISH LIST
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="cursor-pointer">
              <Button variant="outline border-0" onClick={handleCartClick}>
                <CartIcon />
              </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
