import Nav from '@/components/Nav';
import SectionIndex from '@/components/SectionIndex';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Leadership from '@/components/Leadership';
import Education from '@/components/Education';
import SoftSkills from '@/components/SoftSkills';
import Certificates from '@/components/Certificates';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="grain-overlay" />
      <Nav />
      <SectionIndex />
      <main>
        <Hero />
        <Projects />
        <Leadership />
        <Education />
        <SoftSkills />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}
