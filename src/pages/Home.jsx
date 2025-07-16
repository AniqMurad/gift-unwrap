// Home.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SubNavbar from '../components/SubNavbar';
import HeroSection from '../components/HeroSection';
import Trending from '../components/Trending';
import ProductPage from '../components/ProductPage';
import Categories from '../components/Categories';
import Review from '../components/Review';
import Services from '../components/Services';
import Blogs from '../components/Blogs';
import Partners from '../components/Partners';
import Offer from '../components/Offer';
import Footer from '../components/Footer';
import InstaSpace from '../components/InstaSpace';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <Navbar bgColor="#ffff" borderBottom="2px" borderColor="#E9E9E9" />
      <SubNavbar />
      <main className="flex flex-col gap-6 md:gap-8 lg:gap-12">
        <HeroSection />
        <Trending />
        <ProductPage title="Gifts for Him" category="giftsForHim" />
        <Categories />
        <ProductPage title="Gifts for Her" category="giftsForHer" />
        <Review />
        <Services />
        <Blogs />
        <Partners />
        <Offer />
      </main>
      <Footer />

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] w-full mx-4">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg md:text-xl">Receive 10% OFF Your Next Order</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">Exclusive Offers & More!</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
            />
            <Button type="submit" className="w-full bg-black text-white py-2 rounded">
              Subscribe
            </Button>
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
