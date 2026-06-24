import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { FAQ } from "@/lib/content";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Cases />
        <About />
        <Reviews />
        <Faq items={FAQ} />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
