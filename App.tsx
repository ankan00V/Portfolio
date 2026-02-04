import React from 'react';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Background } from './components/Background';
import { BoB } from './components/BoB';
import { Layout } from './components/Layout';
import { Certifications } from './components/Certifications';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Layout>
          <Hero />
          <Education />
          <Experience />
          <Certifications />
          <Skills />
          <Projects />
          <Contact />
        </Layout>
      </div>
      <BoB />
      <ScrollToTop />
    </div>
  );
};

export default App;