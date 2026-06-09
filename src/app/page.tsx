import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsStrip from "@/components/home/StatsStrip";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import NewsGrid from "@/components/home/NewsGrid";
import SocialFeed from "@/components/home/SocialFeed";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-12 lg:pt-14">
        <HeroSection />
        <StatsStrip />
        <ProjectsGrid />
        <NewsGrid />
        <SocialFeed />
      </main>
      <Footer />
    </>
  );
}
