import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import profilePhoto from '../assets/srushti.png';
import inforensCover from '../assets/inforens-cover.png';
import widowsCover from '../assets/widows-cover.png';
import sweetLiesCover from '../assets/sweet-lies-cover.png';
import boredDirectorsCover from '../assets/bored-cover.png';
//import boredDirectorsCover from '../assets/bored-directors-cover.png'; // Make sure you add this image to your assets!

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const globeRef = useRef(null);
  const textSectionRef = useRef(null);
  
  // NEW: State for the Interactive Earth Modal
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // List of global greetings to combine with the user's name
  const globalGreetings = [
    "Hello", "Bonjour", "Hola", "Ciao", "こんにちは", "안녕하세요", "नमस्ते", "Привет", "مرحبا",
    "Hallo", "Olá", "Hej", "Ahoj", "Szia", "Cześć", "Γεια σας", "Merhaba", "שלום", "Sawubona",
    "Jambo", "Sveiki", "Halò", "Kamusta", "Xin chào", "Aloha", "Kia ora", "Namaskara", "Vanakkam"
  ];

  // Generate random positions and sizes for the names ONLY when the user submits their name
  const floatingNames = React.useMemo(() => {
    if (!isSubmitted || !visitorName) return [];
    return globalGreetings.map((greet, i) => ({
      id: i,
      text: `${greet}, ${visitorName}`,
      top: Math.floor(Math.random() * 85) + "%",
      left: Math.floor(Math.random() * 85) + "%",
      fontSize: (Math.random() * 1.5 + 1) + "rem", // Random size between 1rem and 2.5rem
      opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1 and 0.5
    }));
  }, [isSubmitted, visitorName]);

  // Lock scrolling when open, and totally reset the name/form when closed
  useEffect(() => {
    if (isBioOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        setIsSubmitted(false);
        setVisitorName('');
      }, 300); 
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isBioOpen]);

  // GSAP Animation: Explodes the names onto the screen when submitted
  useEffect(() => {
    if (isSubmitted) {
      gsap.fromTo(".floating-name",
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: (i, el) => el.getAttribute('data-opacity'), scale: 1, y: 0, duration: 1.5, stagger: 0.03, ease: "back.out(1.5)" }
      );
      gsap.fromTo(".center-welcome",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: "power4.out", delay: 0.5 }
      );
    }
  }, [isSubmitted]);
  

  // --- DYNAMIC LIGHTING & MOUSE SPOTLIGHT ENGINE ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      heroRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      heroRef.current.style.setProperty('--mouse-y', `${y * 100}%`);

      if (globeRef.current) {
        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * -30;
        gsap.to(globeRef.current, {
          rotateY: moveX,
          rotateX: moveY,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); 

  // --- GSAP TEXT REVEALS ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".char-reveal span", 
        { y: '100%', rotate: 3 }, 
        { y: '0%', rotate: 0, stagger: 0.03, duration: 1.4, ease: "expo.out" }
      );

      gsap.fromTo(".hero-fade", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );

      gsap.utils.toArray('.scroll-line-reveal').forEach((line) => {
        gsap.fromTo(line, 
          { opacity: 0, y: 20, filter: "blur(4px)" },
          { scrollTrigger: { trigger: line, start: "top 85%" }, opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }
        );
      });

      gsap.utils.toArray('.scroll-anim').forEach((element) => {
        gsap.fromTo(element, 
          { y: 60, opacity: 0 }, 
          { scrollTrigger: { trigger: element, start: "top 85%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    { id: "inforens", tag: "UX Strategy", title: "Inforens", desc: "Helping a student platform feel as trustworthy as the service behind it.", image: inforensCover },
    { id: "scottish-widows", tag: "Financial Wellbeing", title: "Scottish Widows x GSA", desc: "Designing income protection for people whose lives do not fit a fixed salary.", image: widowsCover },
    { id: "sweet-lies", tag: "Inclusive Education", title: "Sweet Lies & Bitter Truth", desc: "Using one biscuit to open up a much bigger story about empire, labour, and identity.", image: sweetLiesCover },
    { id: "bored-directors", tag: "Education / Research", title: "Bored Directors", desc: "Designing for the phone-free time that remains when the screen is put away.", image: boredDirectorsCover }
  ];

  return (
    <main ref={pageRef} className="w-full overflow-hidden bg-white text-brand-blue selection:bg-brand-accent-blue selection:text-white">
      
      <section 
        ref={heroRef}
        className="relative min-h-screen pt-32 pb-24 flex items-center overflow-hidden"
        style={{ background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,58,237,0.06) 0%, transparent 50%)' }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(124,58,237,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Tighter margin (mb-4) to match the space below the headline */}
            <div className="hero-fade mb-4">
              <span className="px-4 py-1.5 bg-brand-accent-blue/10 border border-brand-accent-blue/20 text-brand-accent-blue text-[10px] font-mono uppercase tracking-[0.25em] font-bold rounded-full shadow-sm">
                Glasgow, UK
              </span>
            </div>

            {/* Fixed Tailwind typos and reduced margin to mb-4 for perfectly equal spacing */}
            <h1 className="char-reveal font-poppins text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.2rem] font-black tracking-tighter text-brand-blue leading-[1.1] mb-4 xl:whitespace-nowrap">
              <div className="overflow-hidden pb-1"><span className="block origin-bottom-left">I Make Services Make sense</span></div>
            </h1>
            <p className="hero-fade font-montserrat font-medium text-slate-700 text-lg md:text-xl leading-relaxed mb-10 max-w-xl border-l-2 border-brand-accent-blue pl-4">
              I am a service designer interested in how people actually experience the things built around them. My work is about making services feel clearer, more useful, and easier to move through.
            </p>

            <div className="hero-fade relative z-20 w-full max-w-lg">
              <div className="bg-white/70 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-200/60 p-2 flex items-center justify-between group hover:border-brand-accent-blue/30 transition-all duration-500">
                <div className="flex items-center gap-3 pl-4 text-slate-400 group-hover:text-brand-accent-blue transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="font-montserrat text-xs font-semibold tracking-wide text-slate-400">Discover Case Studies...</span>
                </div>
                <Link to="/work" className="bg-brand-blue text-white font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-brand-accent-blue hover:scale-105 transition-all shadow-md shadow-brand-blue/10 cursor-none">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center relative h-[500px]">
            <div className="absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] rounded-full border border-dashed border-brand-accent-blue/20 animate-[spin_40s_linear_infinite] pointer-events-none z-0 flex items-center justify-center">
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" fill="none" />
                <text className="font-mono text-[2.8px] fill-brand-accent-blue/40 uppercase tracking-[6px] font-bold">
                  <textPath href="#circlePath">CREATION • THE WORLD OF IDEAS • INNOVATION WITHOUT LIMITS • </textPath>
                </text>
              </svg>
            </div>

            <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full animate-[spin_12s_linear_infinite] pointer-events-none z-10">
              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-brand-accent-blue shadow-[0_0_10px_#7c3aed]"></div>
            </div>

            {/* THE HYPER-REALISTIC EARTH: NASA textures and atmospheric scattering (No Clouds). */}
            <div 
              ref={globeRef}
              onClick={() => setIsBioOpen(true)}
              className="relative flex-shrink-0 aspect-square w-[75vw] h-[75vw] max-w-[18rem] max-h-[18rem] md:max-w-none md:max-h-none md:w-80 md:h-80 md:min-w-[20rem] md:min-h-[20rem] rounded-full group transition-all duration-700 bg-black z-10 transform-gpu cursor-pointer overflow-hidden hover:scale-105 hover:shadow-[0_0_100px_rgba(124,58,237,0.4)]"
             >
              {/* 1. True 3D Spherical Shading (Day/Night Terminator) */}
              <div className="absolute inset-0 rounded-full shadow-[inset_-50px_-30px_60px_rgba(0,0,0,0.9),inset_10px_10px_40px_rgba(255,255,255,0.4)] z-30 pointer-events-none border border-white/10"></div>
              
              {/* 2. Natural Earth Map (No clouds!) */}
              <div 
                className="absolute top-0 left-0 h-full w-[400%] animate-[earthSpin_40s_linear_infinite] z-10 pointer-events-none opacity-100"
                style={{
                  backgroundImage: `url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')`,
                  backgroundSize: '50% 100%',
                  backgroundRepeat: 'repeat-x',
                  filter: 'contrast(1.1) saturate(1.1)' 
                }}
              ></div>

              {/* 3. Subtle Blue Atmospheric Edge Glow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(100,150,255,0.3)] z-40 pointer-events-none mix-blend-screen"></div>
            </div>

            <div className="absolute bottom-10 w-64 h-6 bg-slate-900/5 blur-xl rounded-full z-0 pointer-events-none"></div>

          </div>
        </div>
      </section>

      <section ref={textSectionRef} className="py-32 relative bg-slate-50 border-y border-slate-200/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="scroll-line-reveal font-poppins text-xs font-bold uppercase tracking-[0.3em] text-brand-accent-blue mb-6">
            The Ethos // सृष्टि
          </h3>
          <h2 className="scroll-line-reveal font-poppins text-4xl md:text-5xl font-black text-brand-blue uppercase mb-8 leading-[1.1]">
            Srushti means <span className="text-brand-accent-blue">world</span>.<br/>
            It also means <span className="text-brand-accent-blue">creation</span>.
          </h2>
          <p className="scroll-line-reveal font-montserrat text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">
            "Maybe that is why I am drawn to shaping how people move through services, systems, and experiences."
          </p>
        </div>
      </section>

      <section className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="scroll-anim mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-brand-accent-blue mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-brand-accent-blue"></span> Case Studies
              </h3>
              <h2 className="font-poppins text-4xl md:text-5xl font-black text-brand-blue tracking-tighter">Selected Work</h2>
            </div>
            <Link to="/work" className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-accent-blue transition-colors cursor-none pb-1 border-b border-transparent hover:border-brand-accent-blue w-max">
              View All Work &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {projects.map((project, idx) => (
              <Link to={`/case-study/${project.id}`} key={idx} className="scroll-anim group flex flex-col h-full bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(124,58,237,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-none">
                <div className="h-64 bg-slate-50 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-[10px] tracking-widest bg-slate-200/50">
                      [ Visual ]
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-brand-blue text-[9px] font-mono uppercase tracking-widest font-bold rounded-sm shadow-sm">
                      {project.tag}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative bg-white">
                  <div className="absolute top-0 right-8 -mt-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 group-hover:bg-brand-accent-blue group-hover:text-white text-slate-400 transition-all duration-500 z-20">
                    <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                  <h4 className="font-poppins text-2xl font-bold text-brand-blue mb-3 group-hover:text-brand-accent-blue transition-colors duration-300">{project.title}</h4>
                  <p className="font-montserrat text-sm text-slate-400 font-medium leading-relaxed flex-grow">
                    {project.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative bg-brand-blue w-full pt-40 pb-12 overflow-hidden flex flex-col items-center border-t border-slate-800">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="footertopo" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M-100 200c50-50 100 0 150-50s100-50 150 0" fill="none" stroke="#ffffff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footertopo)" />
          </svg>
        </div>

        <div className="relative z-10 w-full text-center px-6 mb-32">
          {/* Stepped typography sizing from mobile to desktop, added break-words to prevent overflow */}
          <h2 className="font-poppins font-black text-4xl sm:text-5xl md:text-[8rem] lg:text-[10rem] leading-[1.1] md:leading-[0.85] text-white uppercase tracking-tighter break-words">
            ALWAYS <br/>
            <span className="text-brand-accent-blue block mt-2">BRINGING</span>
            THE VALUE.
          </h2>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-[300px] md:w-[500px] pointer-events-none mix-blend-screen opacity-50">
           <img src={profilePhoto} alt="Srushti" className="w-full h-auto object-cover grayscale blur-[0.5px]" />
        </div>

        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left mb-24">
        <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-mono text-[10px] text-brand-accent-blue uppercase tracking-[0.2em] mb-2 font-bold">Pages</span>
            {/* Switched to React <Link> to fix routing issues and changed Home to About */}
            <Link to="/about" className="font-poppins font-black text-white text-2xl md:text-3xl hover:text-brand-accent-blue hover:translate-x-2 transition-all duration-300 cursor-none uppercase tracking-tight">About</Link>
            <Link to="/work" className="font-poppins font-black text-white text-2xl md:text-3xl hover:text-brand-accent-blue hover:translate-x-2 transition-all duration-300 cursor-none uppercase tracking-tight">Work</Link>
            <Link to="/skills" className="font-poppins font-black text-white text-2xl md:text-3xl hover:text-brand-accent-blue hover:translate-x-2 transition-all duration-300 cursor-none uppercase tracking-tight">Skills</Link>
          </div>

          <div className="flex justify-center items-end mt-24 md:mt-32 z-30">
            {/* Switched to a direct Gmail web link so it works perfectly for everyone, even without a desktop mail app */}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=srushtisachinpagariya@gmail.com" target="_blank" rel="noreferrer" className="relative overflow-hidden group bg-brand-accent-blue text-white font-poppins font-bold uppercase tracking-widest px-8 py-5 rounded-full shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-500 flex items-center gap-4 cursor-none hover:scale-105">
              <span className="relative z-10">Let's Talk</span>
              <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-mono text-[10px] text-brand-accent-blue uppercase tracking-[0.2em] mb-2 font-bold">Follow On</span>
            {/* HOW TO ADD YOUR LINKEDIN: Paste your profile URL inside the href quotes below */}
            <a href="https://www.linkedin.com/in/srushti-pagariya/" target="_blank" rel="noreferrer" className="font-poppins font-black text-white text-2xl md:text-3xl hover:text-brand-accent-blue hover:-translate-x-2 transition-all duration-300 cursor-none uppercase tracking-tight">LinkedIn</a>
          </div>
        </div>

        <div className="relative z-30 w-full bg-slate-950 py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] gap-4 md:gap-0 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} Srushti Pagariya.</span>
          <div className="flex gap-8">
            <span className="cursor-none hover:text-white transition-colors">Privacy</span>
            <span className="cursor-none hover:text-white transition-colors">Terms</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes earthSpin {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
      {/* --- THE INTERACTIVE EARTH OVERLAY --- */}
      {isBioOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#02010a]/95 backdrop-blur-xl overflow-hidden">
          
          {/* Close Button */}
          <button 
            onClick={() => setIsBioOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-50 cursor-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div className="w-full h-full flex items-center justify-center relative">
            
            {!isSubmitted ? (
              /* STEP 1: The Input Screen */
              <div className="flex flex-col items-center text-center px-6 z-10 w-full max-w-2xl">
                <span className="inline-block px-4 py-1.5 bg-brand-accent-blue/20 text-brand-accent-blue border border-brand-accent-blue/30 text-[10px] font-mono uppercase tracking-widest font-bold rounded-full mb-8">
                  Connection Established
                </span>
                <h2 className="font-poppins text-3xl md:text-5xl font-bold text-white mb-12">
                  Who is visiting my world?
                </h2>
                
                <form 
                  onSubmit={(e) => { e.preventDefault(); if(visitorName.trim()) setIsSubmitted(true); }}
                  className="w-full flex flex-col items-center"
                >
                  <input 
                    type="text" 
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-brand-accent-blue text-white text-center font-poppins text-4xl md:text-6xl font-black outline-none pb-4 mb-12 placeholder:text-white/10 transition-colors"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    disabled={!visitorName.trim()}
                    className="bg-brand-accent-blue text-white font-mono text-xs font-bold uppercase tracking-widest px-10 py-5 rounded-full hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 cursor-none"
                  >
                    Enter The World
                  </button>
                </form>
              </div>
            ) : (
              /* STEP 2: The Translated Floating Names Screen */
              <div className="absolute inset-0 w-full h-full">
                {/* The scattered background names */}
                {floatingNames.map((item) => (
                  <div 
                    key={item.id}
                    data-opacity={item.opacity}
                    className="floating-name absolute font-poppins font-bold text-white whitespace-nowrap select-none pointer-events-none"
                    style={{
                      top: item.top,
                      left: item.left,
                      fontSize: item.fontSize,
                      opacity: 0 // initial opacity is 0, GSAP handles the reveal
                    }}
                  >
                    {item.text}
                  </div>
                ))}

                {/* The glowing center message */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                  <div className="center-welcome bg-[#02010a]/60 backdrop-blur-md border border-white/10 px-12 py-8 rounded-3xl text-center shadow-[0_0_100px_rgba(124,58,237,0.5)]">
                    <p className="font-mono text-sm text-brand-accent-blue uppercase tracking-[0.3em] font-bold mb-4">
                      Welcome to Srushti's World
                    </p>
                    <h2 className="font-poppins text-5xl md:text-7xl font-black text-white capitalize">
                      {visitorName}
                    </h2>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </main>

  );
};

export default Home;