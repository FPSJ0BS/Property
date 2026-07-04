import HeroSection from "@/components/home/HeroSection";
import WhyDifferent from "@/components/home/WhyDifferent";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedListings from "@/components/home/FeaturedListings";
import CoLivingShowcase from "@/components/home/CoLivingShowcase";
import CoWorkingShowcase from "@/components/home/CoWorkingShowcase";
import CommercialShowcase from "@/components/home/CommercialShowcase";
import CityFitShowcase from "@/components/home/CityFitShowcase";
import MovingToNewCity from "@/components/home/MovingToNewCity";
import TrustSection from "@/components/home/TrustSection";
import AIInsightsWidget from "@/components/home/AIInsightsWidget";
import RentalOSSection from "@/components/home/RentalOSSection";
import CityIntelligence from "@/components/home/CityIntelligence";
import SolutionsByAudience from "@/components/home/SolutionsByAudience";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutPreview from "@/components/home/AboutPreview";
import CareersPreview from "@/components/home/CareersPreview";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";
import QuizCTA from "@/components/home/QuizCTA";
import SmartRecommendations from "@/components/engagement/SmartRecommendations";

export default function HomePage() {
  return (
    <>
      <div id="hero"><HeroSection /></div>
      <div id="pillars"><WhyDifferent /></div>
      <div id="journey"><HowItWorks /></div>
      <div id="listings"><FeaturedListings /></div>
      <div id="co-living"><CoLivingShowcase /></div>
      <div id="co-working"><CoWorkingShowcase /></div>
      <div id="commercial"><CommercialShowcase /></div>
      <div id="cityfit"><CityFitShowcase /></div>
      <div id="moving"><MovingToNewCity /></div>
      <div id="quiz-cta"><QuizCTA /></div>
      <div id="trust"><TrustSection /></div>
      <div id="ai-insights"><AIInsightsWidget /></div>
      <div id="recommendations"><SmartRecommendations variant="homepage" /></div>
      <div id="rental-os"><RentalOSSection /></div>
      <div id="market"><CityIntelligence /></div>
      <div id="solutions"><SolutionsByAudience /></div>
      <div id="reviews"><TestimonialsSection /></div>
      <div id="about"><AboutPreview /></div>
      <div id="careers"><CareersPreview /></div>
      <div id="faq"><FAQPreview /></div>
      <div id="cta"><FinalCTA /></div>
    </>
  );
}
