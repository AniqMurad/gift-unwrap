import { serializeSnapshot } from "../lib/serverPages";
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
import navLogo from '../assets/redesign/nav-logo.png';
import heroGiftBox from '../assets/redesign/hero-gift-box.png';
import {
  buildStoreStructuredData,
  buildWebsiteStructuredData,
} from '../lib/structuredData';

const Home = () => {
  return (
    <div className="gu-page">
      <Helmet>
        <title>Send Gifts to Pakistan Online | Gift Unwrap</title>
        <meta name="description" content="Send thoughtful gifts to loved ones in Pakistan. Explore curated hampers or build your own gift box. Check delivery availability for their city." />
        <meta name="google-site-verification" content="IRKZW1tFIrwJARVCWhBIFZv2A_6bx8GHScL9UMH4dVA" />
        <link rel="canonical" href="https://www.giftunwrap.com/" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script type="application/ld+json">
          {serializeSnapshot(buildStoreStructuredData({ logo: navLogo, image: heroGiftBox }))}
        </script>
        <script type="application/ld+json">
          {serializeSnapshot(buildWebsiteStructuredData())}
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
