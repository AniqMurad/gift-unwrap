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
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default

  return (
    <div className='w-full h-auto'>
      <Navbar bgColor="#ffff" borderBottom="2px" borderColor="#E9E9E9" />
      <SubNavbar />
      <HeroSection />
      <Trending />
      <ProductPage title="Gifts for Him" category="giftsForHim" />
      <Categories />
      <ProductPage title="Birthday Gifts" category="birthday" />
      <Review />
      <Services />
      <InstaSpace />
      <Blogs />
      <Partners />
      <Offer />
      <Footer />

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Receive 10% OFF Your Next Order</DialogTitle>
            <DialogDescription>Exclusive Offers & More!</DialogDescription>
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