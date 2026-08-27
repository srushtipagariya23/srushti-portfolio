import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure these match your actual file extensions (.png or .jpg) in the assets folder!
import inforensCover from '../assets/inforens-cover.png'; 
import widowsCover from '../assets/widows-cover.png';
import sweetLiesCover from '../assets/sweet-lies-cover.png';
// import boredDirectorsCover from '../assets/bored-directors-cover.png';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Cinematic Header Reveal
      gsap.fromTo(".work-header-anim", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" }
      );

      // 2. High-End Scroll Triggered Project Cards
      gsap.utils.toArray('.project-row').forEach((element) => {
        // Text fades and slides up
        gsap.fromTo(element.querySelector('.project-text'), 
          { y: 60, opacity: 0 }, 
          { scrollTrigger: { trigger: element, start: "top 85%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
        
        // Image does a parallax scale-down reveal
        gsap.fromTo(element.querySelector('.project-image-container'), 
          { y: 60, opacity: 0, scale: 0.95 }, 
          { scrollTrigger: { trigger: element, start: "top 85%" }, y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // SRUSHTI'S EXACT PROJECT DATA - REORDERED & UPDATED
  const projects = [
    {
      id: "scottish-widows",
      tag: "Service Design / Financial Wellbeing",
      title: "Scottish Widows x GSA",
      headline: "Designing income protection for people whose lives do not fit a fixed salary.",
      body: "A service design project exploring how income protection can feel more relevant, human, and understandable for young adults working freelance, self-employed, or gig-based jobs.",
      inside: [
        "Research with 18–30 year olds living with income uncertainty.",
        "Insight synthesis and opportunity framing for a live brief.",
        "A more human direction for communicating protection."
      ],
      image: widowsCover,
      placeholder: "[ Scottish Widows Visual ]"
    },
    {
      id: "bored-directors",
      tag: "Service Design / Education",
      title: "Bored Directors",
      headline: "Designing for the phone-free time that remains when the screen is put away.",
      body: "An independent Masters research project investigating the gap left by school phone restrictions, resulting in a physical instructional card system that offers voluntary prompts for noticing, making, and thinking differently.",
      inside: [
        "Primary research and co-design with stakeholders.",
        "A physical instructional card system with six entry points.",
        "A service model built around choice, recognition and reuse."
      ],
      image: null, // Since you may not have the image yet, setting to null prevents build crash!
      placeholder: "[ Bored Directors Visual ]"
    },
    {
      id: "inforens",
      tag: "UX Strategy / Service Design",
      title: "Inforens",
      headline: "Helping a student platform feel as trustworthy as the service behind it.",
      body: "A UX and service design internship project focused on making mentors, tools, community, and support more visible and believable to international students.",
      inside: [
        "A first-time-user audit of trust, clarity, and visibility gaps.",
        "Website and service recommendations across key student journey stages.",
        "A rewards system built around real student value."
      ],
      image: inforensCover,
      placeholder: "[ Inforens Visual ]"
    },
    {
      id: "sweet-lies",
      tag: "Inclusive Education / Editorial Design",
      title: "Sweet Lies and Bitter Truth",
      headline: "Using one biscuit to open up a much bigger story about empire, labour, and identity.",
      body: "An eight-page educational newspaper designed for 13–16 year olds, turning difficult colonial histories into a learning experience that is honest, structured, and respectful.",
      inside: [
        "A story-led editorial format for classroom learning.",
        "A process shaped by accessibility and stakeholder insight.",
        "A final outcome that values clarity over spectacle."
      ],
      image: sweetLiesCover,
      placeholder: "[ Sweet Lies Visual ]"
    }
  ];

  return (
    <main ref={pageRef} className="w-full min-h-screen bg-[#F8F9FA] relative overflow-hidden selection:bg-brand-accent-blue selection:text-white">
      
      {/* BULLETPROOF NAVBAR SPACER */}
      <div className="w-full block pointer-events-none" style={{ height: '160px', minHeight: '160px' }} aria-hidden="true"></div>

      {/* Subtle Background Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-accent-blue/5 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32 relative z-10">
        
        {/* HEADER */}
        <div className="mb-24 md:mb-32 border-b border-slate-200/80 pb-12">
          {/* Added text-4xl for mobile, sm:text-5xl for tablets, md:text-7xl for desktop */}
          <h1 className="work-header-anim font-poppins text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-brand-blue leading-tight mb-6 uppercase break-words">
            Selected <br className="hidden md:block" /> Work<span className="text-brand-accent-blue">.</span>
          </h1>
          <p className="work-header-anim font-montserrat text-lg md:text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
            A curated selection of projects that showcase how I work across service design, strategy, storytelling, and experience design.
          </p>
        </div>

        {/* PROJECTS GRID (Alternating Layout) */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <div key={project.id} className="project-row group flex flex-col md:flex-row gap-12 md:gap-20 items-center cursor-none">
              
              {/* IMAGE SECTION (Alternates left/right based on odd/even index) */}
              <Link to={`/case-study/${project.id}`} className={`project-image-container block cursor-none w-full md:w-1/2 aspect-[4/5] md:aspect-square relative overflow-hidden rounded-sm bg-slate-100 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:shadow-[0_30px_60px_rgba(124,58,237,0.15)] transition-shadow duration-700 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-brand-accent-blue/0 group-hover:bg-brand-accent-blue/10 transition-colors duration-700 z-10 pointer-events-none mix-blend-multiply"></div>

                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      project.id === 'inforens' 
                        ? 'object-contain scale-90 group-hover:scale-100 drop-shadow-2xl' 
                        : ''
                    }`} 
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 text-slate-400 font-mono text-sm tracking-widest bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 shadow-sm">
                      {project.placeholder}
                    </div>
                  </>
                )}

                {/* View Case Study Hover Badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                  <div className="bg-brand-blue text-white font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-3 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                    View Project <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </Link>

              {/* TEXT SECTION */}
              <div className="project-text w-full md:w-1/2 flex flex-col justify-center">
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[9px] font-mono text-brand-accent-blue uppercase tracking-[0.2em] font-bold border-b border-brand-accent-blue/30 pb-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] bg-slate-200/50 px-3 py-1 rounded-sm">
                    {project.tag}
                  </span>
                </div>
                
                <h2 className="font-poppins text-4xl md:text-5xl font-black text-brand-blue tracking-tighter mb-6 group-hover:text-brand-accent-blue transition-colors duration-500">
                  {project.title}
                </h2>
                
                <h3 className="font-montserrat text-xl md:text-2xl text-brand-blue font-medium mb-6 leading-tight">
                  {project.headline}
                </h3>
                
                <p className="font-montserrat text-slate-600 font-light mb-10 leading-relaxed text-lg">
                  {project.body}
                </p>
                
                {/* Glassmorphic 'Inside' Box */}
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-sm border border-slate-200/80 mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] group-hover:border-brand-accent-blue/20 transition-colors duration-500">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent-blue mb-6">Project Scope</p>
                  <ul className="space-y-4 font-montserrat text-slate-600 text-sm font-medium">
                    {project.inside.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-brand-accent-blue mt-0.5 opacity-70">▹</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/case-study/${project.id}`} className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-blue w-max group-hover:text-brand-accent-blue transition-colors duration-300">
                  <span className="border-b-2 border-brand-blue group-hover:border-brand-accent-blue pb-1 transition-colors duration-300">Read the case study</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Work;