// Home.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
import DeliveryMarquee from '../components/DeliveryMarquee';
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
      <Helmet>
        <title>Pakistan's Most Unique Gift Shop | Gift Unwrap</title>
        <meta name="description" content="Discover Pakistan's most unique gift shop at Gift Unwrap Shop creative gifts surprise boxes & fast delivery for birthdays anniversaries & special moments." />
        <meta name="google-site-verification" content="IRKZW1tFIrwJARVCWhBIFZv2A_6bx8GHScL9UMH4dVA" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OnlineStore",
            "@id": "https://www.giftunwrap.com/#store",
            "name": "Gift Unwrap",
            "url": "https://www.giftunwrap.com/",
            "logo": "https://www.giftunwrap.com/logo.png",
            "image": "https://www.giftunwrap.com/hero-banner.jpg",
            "description": "Premium gift store in Pakistan offering thoughtful gifts for birthdays, weddings, Mother's Day, Women's Day, corporate events, and religious occasions. 24/7 customer support, 14-day returns, nationwide shipping.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PK"
            },
            "priceRange": "PKR 2000 - PKR 15000",
            "telephone": "+92 326 8927354",
            "email": "giftunwrap@gmail.com",
            "openingHours": "Mo-Su 00:00-23:59",
            "sameAs": [
              "https://www.facebook.com/giftunwrap",
              "https://www.instagram.com/giftunwrap"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "English",
              "contactOption": "TollFree"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "87",
              "reviewCount": "87"
            },
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Gifts for Him",
                  "url": "https://www.giftunwrap.com/giftforhim"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Gifts for Her",
                  "url": "https://www.giftunwrap.com/giftforher"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Baby Gifts",
                  "url": "https://www.giftunwrap.com/Giftforbabies"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Birthday Gifts",
                  "url": "https://www.giftunwrap.com/Giftforbirthday"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Wedding Gifts",
                  "url": "https://www.giftunwrap.com/giftforwedding"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Corporate Gifts",
                  "url": "https://www.giftunwrap.com/giftforcompanies"
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar bgColor="#ffff" borderBottom="2px" borderColor="#E9E9E9" />
      <DeliveryMarquee />
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
        {/* <Partners /> */}
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
