import HeroSection from "@/components/home/HeroSection";
import StatsStrip from "@/components/home/StatsStrip";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import NewsGrid from "@/components/home/NewsGrid";
import SocialFeed from "@/components/home/SocialFeed";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <ProjectsGrid />
      <NewsGrid />
      <SocialFeed />
    </>
  );
}
