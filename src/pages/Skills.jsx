import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || window.innerWidth < 768) return; // Disabled on mobile
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".char-reveal span", 
        { y: '120%', opacity: 0, rotate: 2 }, 
        { y: '0%', opacity: 1, rotate: 0, stagger: 0.02, duration: 1.2, ease: "expo.out", delay: 0.1 }
      );
      gsap.fromTo(".hero-fade",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
      gsap.utils.toArray('.scroll-up').forEach((el) => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0, filter: 'blur(5px)' }, 
          { scrollTrigger: { trigger: el, start: "top 85%" }, y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "power3.out" }
        );
      });
      gsap.fromTo(".process-line-fill",
        { scaleY: 0 },
        { scrollTrigger: { trigger: ".process-container", start: "top 70%", end: "bottom 80%", scrub: 1 }, scaleY: 1, ease: "none", transformOrigin: "top center" }
      );
      gsap.utils.toArray('.process-node').forEach((node, i) => {
        // Reduced the horizontal swing on mobile for better performance
        gsap.fromTo(node,
          { opacity: 0, x: window.innerWidth > 768 ? (i % 2 === 0 ? -40 : 40) : 0, y: window.innerWidth <= 768 ? 20 : 0 },
          { scrollTrigger: { trigger: node, start: "top 80%" }, opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.5)" }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const skillCategories = [
    { id: "MOD-01", title: "Service Design", spec: "SPEC: JOURNEYS & ECOSYSTEMS", description: "Mapping complex systems and uncovering opportunities to shape end-to-end service experiences that feel intuitive, accessible, and deeply human-centred.", items: ["Journey Mapping", "Service Blueprinting", "Co-design", "Rapid Prototyping", "Inclusive Services"] },
    { id: "MOD-02", title: "Research & Insight", spec: "SPEC: DISCOVERY & SYNTHESIS", description: "Uncovering hidden needs through mixed-methods research, careful listening, and translating complex qualitative data into clear, actionable design directions.", items: ["Audience Research", "Qualitative Interviews", "Surveys", "Insight Synthesis", "Problem Framing"] },
    { id: "MOD-03", title: "Strategy & Storytelling", spec: "SPEC: NARRATIVE & POSITIONING", description: "Translating insights into compelling narratives that align business goals with user trust, ensuring every touchpoint communicates clear value and purpose.", items: ["Narrative Design", "Content Strategy", "Business Objectives", "Communication Strategy"] },
    { id: "MOD-04", title: "Design & Visuals", spec: "SPEC: PROTOTYPING & PRODUCTION", description: "Bringing concepts to life through rapid prototyping, high-fidelity visual design, and editorial layouts that prioritize clarity and user engagement.", items: ["Figma & Miro", "Editorial Layout", "Visual Storytelling", "Creative Direction"] }
  ];

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-screen bg-[#FAFAFA] text-slate-900 relative overflow-hidden font-montserrat selection:bg-brand-accent-blue selection:text-white md:cursor-none"
      style={{ '--mouse-x': '50vw', '--mouse-y': '50vh' }}
    >
      
      {/* PREMIUM CUSTOM CURSOR - Hidden on mobile */}
      <div 
        className="hidden md:flex pointer-events-none fixed z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out items-center justify-center mix-blend-difference"
        style={{
          left: 'var(--mouse-x)', top: 'var(--mouse-y)',
          width: cursorVariant === 'explore' ? '80px' : '24px',
          height: cursorVariant === 'explore' ? '80px' : '24px',
          backgroundColor: cursorVariant === 'explore' ? '#ffffff' : 'transparent',
          border: cursorVariant === 'explore' ? 'none' : '2px solid #ffffff',
          borderRadius: '50%',
        }}
      >
        <span className={`font-mono text-[10px] uppercase tracking-widest text-black font-bold transition-opacity duration-300 ${cursorVariant === 'explore' ? 'opacity-100' : 'opacity-0'}`}>
          {cursorText}
        </span>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-accent-blue/[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="h-24 md:h-32 w-full block pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <section className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center pb-16 md:pb-20">
          <div className="hero-fade mb-6">
            <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-500 text-[10px] font-mono uppercase tracking-[0.25em] font-bold rounded-full shadow-sm">
              The Evolution
            </span>
          </div>

          <h1 className="char-reveal font-poppins text-4xl md:text-7xl lg:text-[4.5rem] font-black tracking-tighter text-slate-900 leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 max-w-5xl uppercase">
            <div className="overflow-hidden pb-1 md:pb-2"><span className="block origin-bottom-left">From the message</span></div>
            <div className="overflow-hidden pb-1 md:pb-2"><span className="block origin-bottom-left text-brand-accent-blue">to the moment.</span></div>
          </h1>

          <p className="hero-fade font-montserrat text-base md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl">
            My practice bridges creative communication and service design moving from studying how people receive messages to designing the systems, journeys, and services that shape their everyday choices.
          </p>
        </section>

       <section className="py-16 md:py-20 scroll-up relative flex flex-col items-center border-y border-slate-200/50">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-poppins text-2xl md:text-4xl font-bold tracking-tight mb-4">The Innovation Ecosystem</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">An interconnected approach where research, design, and storytelling orbit a single core philosophy.</p>
          </div>
          <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] flex items-center justify-center my-6 md:my-10">
            
            <div className="absolute z-20 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-2 border-brand-accent-blue/20 flex flex-col items-center justify-center">
              <span className="font-poppins font-black text-lg md:text-xl tracking-tighter text-brand-blue">SRUSHTI</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-brand-accent-blue mt-1">Core</span>
            </div>

            <div className="absolute w-[70%] h-[70%] border-[2px] border-brand-accent-blue/40 rounded-full animate-[spin_30s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-4 py-2 bg-white border border-brand-accent-blue/50 rounded-full flex flex-col items-center justify-center shadow-lg animate-[spin_30s_linear_infinite_reverse] hover:scale-110 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent-blue mb-1"></div>
                <span className="font-mono text-[7px] md:text-[9px] font-bold text-brand-accent-blue text-center leading-tight">SERVICE<br/>DESIGN</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 md:px-4 py-2 bg-white border border-brand-accent-blue/50 rounded-full flex flex-col items-center justify-center shadow-lg animate-[spin_30s_linear_infinite_reverse] hover:scale-110 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent-blue mb-1"></div>
                <span className="font-mono text-[7px] md:text-[9px] font-bold text-brand-accent-blue text-center leading-tight">RESEARCH &<br/>INSIGHT</span>
              </div>
            </div>

            <div className="absolute w-full h-full border-[2px] border-dashed border-[#E55039]/40 rounded-full animate-[spin_40s_linear_infinite_reverse]">
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 px-3 md:px-4 py-2 bg-white border border-[#E55039]/50 rounded-full flex flex-col items-center justify-center shadow-lg animate-[spin_40s_linear_infinite] hover:scale-110 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E55039] mb-1"></div>
                <span className="font-mono text-[7px] md:text-[9px] font-bold text-[#E55039] text-center leading-tight">STRATEGY &<br/>STORYTELLING</span>
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 px-3 md:px-4 py-2 bg-white border border-[#E55039]/50 rounded-full flex flex-col items-center justify-center shadow-lg animate-[spin_40s_linear_infinite] hover:scale-110 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E55039] mb-1"></div>
                <span className="font-mono text-[7px] md:text-[9px] font-bold text-[#E55039] text-center leading-tight">DESIGN &<br/>VISUALS</span>
              </div>
            </div>

          </div>
        </section>

       <section className="pt-16 pb-24 md:pb-32">
          <div className="scroll-up text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <p className="font-montserrat text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              That combination is a genuine advantage, not a detour. My advertising foundation gave me experience in audience research and communication strategy, while service design extends that into mapping, co-design, and inclusive service experiences.
            </p>
          </div>

          <div className="scroll-up grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {skillCategories.map((category, idx) => (
              <div 
                key={idx} 
                className="skill-card relative bg-white p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col group md:cursor-none h-full"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-300 group-hover:border-brand-accent-blue transition-colors duration-300"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-300 group-hover:border-brand-accent-blue transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-300 group-hover:border-brand-accent-blue transition-colors duration-300"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-300 group-hover:border-brand-accent-blue transition-colors duration-300"></div>

                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-brand-accent-blue font-bold">
                    {category.id}
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E55039]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-blue/60 group-hover:bg-brand-accent-blue transition-colors duration-300"></span>
                  </div>
                </div>
                
                <h3 className="font-poppins text-2xl md:text-4xl font-black text-brand-blue uppercase tracking-tight mb-2 md:mb-3 group-hover:text-brand-accent-blue transition-colors duration-300">
                  {category.title}
                </h3>
                <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-200/80 pb-4 md:pb-6 mb-6 md:mb-8 block font-semibold">
                  {category.spec}
                </span>
                
                <p className="font-montserrat text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-8 md:mb-12 flex-grow pr-0 md:pr-4">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.items.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 md:px-3 py-1.5 bg-slate-50 border border-slate-200/80 text-[8px] md:text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest group-hover:border-brand-accent-blue/30 group-hover:text-brand-accent-blue group-hover:bg-brand-accent-blue/5 transition-all duration-300 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: THE EVOLUTION TIMELINE --- */}
        <section className="py-20 md:py-32 scroll-up bg-white rounded-3xl border border-slate-200 p-6 md:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.02)] my-12 md:my-20">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-poppins text-3xl md:text-5xl font-black tracking-tight mb-4 md:mb-6 text-brand-blue">How My Practice Evolved.</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-montserrat text-sm md:text-base">From understanding what people notice, to designing the ecosystems they move through.</p>
          </div>

          <div className="process-container relative max-w-4xl mx-auto">
            {/* Center Track Line - Hidden on Mobile */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-slate-100"></div>
            <div className="hidden md:block process-line-fill absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-brand-accent-blue"></div>

            {/* Mobile Left-Side Track Line */}
            <div className="block md:hidden absolute top-0 left-4 w-[2px] h-full bg-slate-100"></div>
            <div className="block md:hidden process-line-fill absolute top-0 left-4 w-[2px] h-full bg-brand-accent-blue"></div>

            {[
              { step: '01', title: 'The Foundation', desc: 'I started in advertising, learning how people notice, interpret, question, and choose in crowded environments. I learned that a message only works when it meets someone where they already are.' },
              { step: '02', title: 'The Shift', desc: 'Service design took that instinct further. Instead of only asking how to communicate an idea, I now ask what happens before, during, and after someone encounters a service.' },
              { step: '03', title: 'The Synthesis', desc: 'My background helps me listen for the real question behind the words, connect human needs with business intent, and turn complex ideas into experiences people can understand and use.' },
              { step: '04', title: 'The Ethos', desc: 'I moved from studying how people receive messages to designing the systems, journeys, and services that shape their everyday choices. The same curiosity. A wider responsibility.' }
            ].map((phase, i) => (
              <div key={i} className={`process-node relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-12 md:mb-20 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                <div className="hidden md:block w-5/12"></div>
                
                {/* Desktop Center Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-4 border-slate-100 rounded-full z-10 items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-brand-accent-blue rounded-full"></div>
                </div>

                {/* Mobile Left Dot */}
                <div className="flex md:hidden absolute left-4 -translate-x-1/2 w-6 h-6 bg-white border-2 border-slate-100 rounded-full z-10 items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-brand-accent-blue rounded-full"></div>
                </div>

                {/* Text Block - Adjusted for Mobile Left Alignment */}
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 flex flex-col items-start ${i % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                  <span className="font-mono text-[10px] md:text-xs font-bold text-brand-accent-blue tracking-widest mb-2">PHASE {phase.step}</span>
                  <h3 className="font-poppins text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">{phase.title}</h3>
                  <p className="font-montserrat text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm text-left">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 5: CREATIVE BEHANCE CTA --- */}
        <section className="py-24 md:py-40 scroll-up flex flex-col items-center text-center">
          <h2 className="font-poppins text-4xl md:text-7xl font-black tracking-tighter text-slate-900 mb-4 md:mb-6 max-w-4xl leading-[1.1]">
            Curious where the <br className="hidden md:block"/> <span className="text-brand-accent-blue">storytelling</span> started?
          </h2>
          <p className="font-montserrat text-sm md:text-xl text-slate-500 font-medium mb-10 md:mb-12 max-w-2xl leading-relaxed">
            Before mapping systems. I was a creative strategist. Explore my earlier archive of advertising and creative direction.
          </p>
          
          <a 
              href="https://www.behance.net/srushtipagariya1" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-brand-blue text-white font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0_10px_30px_rgba(10,25,47,0.1)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.3)] hover:bg-brand-accent-blue hover:-translate-y-1 transition-all duration-300 md:cursor-none group"
            >
              Explore Behance
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
        </section>

      </div>
    </div>
  );
};

export default Skills;