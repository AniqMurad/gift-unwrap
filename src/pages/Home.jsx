// Home.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import LandingHeader from '../components/LandingHeader';
import HelloBar from '../components/HelloBar';
import {
  GiftBoxSteps,
  GiftCategories,
  GuaranteeStrip,
  GiftFinder,
  FeaturedGifts,
  Testimonials,
  GiftGuides,
  LandingFaqs,
} from '../components/LandingSections';
import LandingCta from '../components/LandingCta';
import LandingFooter from '../components/LandingFooter';

const Home = () => {
  return (
    <div className="gu-page">
      <Helmet>
        <title>Pakistan's Most Unique Gift Shop | Gift Unwrap</title>
        <meta name="description" content="Discover Pakistan's most unique gift shop at Gift Unwrap Shop creative gifts surprise boxes & fast delivery for birthdays anniversaries & special moments." />
        <meta name="google-site-verification" content="IRKZW1tFIrwJARVCWhBIFZv2A_6bx8GHScL9UMH4dVA" />
        <link rel="canonical" href="https://www.giftunwrap.com/" />
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.giftunwrap.com/#website",
            "url": "https://www.giftunwrap.com/",
            "name": "Gift Unwrap",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.giftunwrap.com/SearchOutput?query={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <HelloBar />
      <div className="gu-header-anchor">
        <LandingHeader variant="home" />
      </div>
      <div className="gu-hero-shell">
        <HeroSection />
      </div>
      <main className="gu-main-content">
        <GiftBoxSteps />
        <GiftCategories />
        <GuaranteeStrip />
        <GiftFinder />
        <FeaturedGifts />
        <Testimonials />
        <GiftGuides />
        <LandingFaqs />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Home;
