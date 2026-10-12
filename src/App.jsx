import React from 'react';
import { useAppSelector } from './hooks/useRedux';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import SearchResults from './components/home/SearchResults';
import ExploreCategories from './components/home/ExploreCategories';
import VendorDetail from './components/home/VendorDetail';
import LoginScreen from './components/auth/LoginScreen';
import BlogPage from './components/blog/BlogPage';
import PricingPage from './components/pricing/PricingPage';
import ValueSection from './components/home/ValueSection';
import FAQ from './components/home/FAQ';
import Footer from './components/layout/Footer';

function App() {
  const {
    selectedVendor,
    showLoginScreen,
    showBlogPage,
    showPricingPage,   // NEW
  } = useAppSelector((state) => state.ui);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />
      <main className="flex-grow">
        {showLoginScreen ? (
          <LoginScreen />
        ) : showBlogPage ? (
          <BlogPage />
        ) : showPricingPage ? (
          <PricingPage />
        ) : selectedVendor ? (
          <VendorDetail />
        ) : (
          <>
            <Hero />
            <SearchResults />
            <ExploreCategories />
            <ValueSection />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;