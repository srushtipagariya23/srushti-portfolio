import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePhoto from "../assets/Srushti-Profile.png";
// ALL 15 MEMORY PHOTOS
import mem1 from '../assets/mem-1.jpg';
import mem2 from '../assets/mem-2.jpg';
import mem3 from '../assets/mem-3.jpg';
import mem4 from '../assets/mem-4.jpg';
import mem5 from '../assets/mem-5.jpg';
import mem6 from '../assets/mem-6.jpg';
import mem7 from '../assets/mem-7.jpg';
import mem8 from '../assets/mem-8.jpg';
import mem9 from '../assets/mem-9.jpg';
import mem10 from '../assets/mem-10.jpg';
import mem11 from '../assets/mem-11.jpg';
import mem12 from '../assets/mem-12.jpg';
import mem13 from '../assets/mem-13.jpg';
import mem14 from '../assets/mem-14.jpg';
import mem15 from '../assets/mem-15.jpg';

// ALL 20 NATURE PHOTOS
import nat1 from '../assets/nat-1.jpg';
import nat2 from '../assets/nat-2.jpg';
import nat3 from '../assets/nat-3.jpg';
import nat4 from '../assets/nat-4.jpg';
import nat5 from '../assets/nat-5.jpg';
import nat6 from '../assets/nat-6.jpg';
import nat7 from '../assets/nat-7.jpg';
import nat8 from '../assets/nat-8.jpg';
import nat9 from '../assets/nat-9.jpg';
import nat10 from '../assets/nat-10.jpg';
import nat11 from '../assets/nat-11.jpg';
import nat12 from '../assets/nat-12.jpg';
import nat13 from '../assets/nat-13.jpg';
import nat14 from '../assets/nat-14.jpg';
import nat15 from '../assets/nat-15.jpg';
import nat16 from '../assets/nat-16.jpg';
import nat17 from '../assets/nat-17.jpg';
import nat18 from '../assets/nat-18.jpg';
import nat19 from '../assets/nat-19.jpg';
import nat20 from '../assets/nat-20.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const horizontalRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const terminalEndRef = useRef(null);

  // --- MOUSE TRACKING SPOTLIGHT, 3D TILT & SUN CURSOR ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);

      const tiltX = ((clientY / innerHeight) - 0.5) * 15;
      const tiltY = ((clientX / innerWidth) - 0.5) * -15;
      containerRef.current.style.setProperty('--tilt-x', `${tiltX}deg`);
      containerRef.current.style.setProperty('--tilt-y', `${tiltY}deg`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- EASTER EGG: KONAMI CODE ---
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setTheme(prev => prev === 'dark' ? 'light' : 'dark');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- MINI TERMINAL LOGIC ---
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Srushti.OS v2.0.0 loaded.' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      let output = '';
      
      switch(cmd) {
        case 'help': output = 'Commands: about, skills, process, projects, clear'; break;
        case 'about': output = 'Service Designer & Strategist. I design stories, services, and experiences people truly connect with.'; break;
        case 'skills': output = 'Journey Mapping, Systems Thinking, Qualitative Research, Storytelling, Prototyping.'; break;
        case 'process': output = '1. Discover (Listen)\n2. Define (Synthesize)\n3. Develop (Co-design)\n4. Deliver (Prototype)'; break;
        case 'projects': output = 'Inforens (UX Strategy), Scottish Widows (Financial Wellbeing), Sweet Lies (Inclusive Education).'; break;
        case 'clear': setHistory([]); setInput(''); return;
        default: output = `Command not found: ${cmd}`;
      }
      
      setHistory(prev => [...prev, { type: 'input', text: cmd }, { type: 'output', text: output }]);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      // Using block: 'nearest' prevents the entire browser window from jumping down
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history]);

  // --- GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.fromTo(".char-reveal", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 1, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo(".grow-line",
        { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.inOut", delay: 0.8 }
      );

      const timelineNodes = gsap.utils.toArray('.timeline-node');
      timelineNodes.forEach((node, i) => {
        gsap.fromTo(node,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          { scrollTrigger: { trigger: node, start: "top 85%" }, opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        );
      });

      const counters = gsap.utils.toArray('.stat-counter');
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        gsap.fromTo(counter, 
          { textContent: 0 }, 
          { scrollTrigger: { trigger: counter, start: "top 90%" }, 
            textContent: target, duration: 2, ease: "power2.out", snap: { textContent: 1 },
            onUpdate: function() { counter.innerHTML = Math.ceil(this.targets()[0].textContent) + (counter.getAttribute('data-suffix') || ''); }
          }
        );
      });

      gsap.to(".float-slow", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".float-fast", { y: -8, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

      // THE HORIZONTAL SCROLL MEMORY WALL (Updated for 15 photos)
      const wrapper = scrollWrapperRef.current;
      if (wrapper) {
        const totalScroll = wrapper.scrollWidth - window.innerWidth;
        gsap.to(wrapper, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }

      // NATURE WALL PARALLAX FADE-IN
      gsap.utils.toArray('.nature-photo').forEach((photo) => {
        gsap.fromTo(photo,
          { y: 100, opacity: 0, scale: 0.9 },
          { scrollTrigger: { trigger: photo, start: "top 90%" }, y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const bgStyle = theme === 'light' ? 'bg-[#F8F9FA] text-brand-blue' : 'bg-[#050505] text-slate-200';
  const glassStyle = theme === 'light' ? 'bg-white/40 border-slate-200/50' : 'bg-white/5 border-white/10';

  const memories = [mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8, mem9, mem10, mem11, mem12, mem13, mem14, mem15];
  const naturePhotos = [nat1, nat2, nat3, nat4, nat5, nat6, nat7, nat8, nat9, nat10, nat11, nat12, nat13, nat14, nat15, nat16, nat17, nat18, nat19, nat20];

  const memoryCaptions = [
    "Kedarkantha taught me that some highs are earned step by step.",
    "Scotland said happy birthday by turning the whole trip into a gift.",
    "The day responsibility found me, and I found a stronger version of myself.",
    "My first snowfall in Scotland, soft proof that new chapters can arrive quietly.",
    "One of my first Glasgow wanderings, and the city already felt like a story opening.",
    "Representing GSA, one cup, one idea, and many countries in the room.",
    "Mumbai gave me a sunset that felt exactly like goodbye.",
    "A little treat to myself, and a big feeling that Mumbai had made space for me.",
    "Undergrad done, smile saying everything for me.",
    "After one of the biggest business seasons, the trip felt like both reward and lesson.",
    "Edinburgh looked even better with an internship to celebrate.",
    "Goa, the kind of place that never feels finished the first time.",
    "Dumbarton nearly blew me away, but the view still won.",
    "Loch Lomond, my first Scottish trip, and the beginning of a very big love story.",
    "A project I held onto with full heart, and every bit of that showed."
  ];

  return (
    <div 
      ref={containerRef} 
      className={`relative min-h-screen w-full overflow-hidden ${bgStyle} font-montserrat transition-colors duration-1000 selection:bg-brand-accent-blue selection:text-white cursor-none pb-0`}
      style={{ '--mouse-x': '50vw', '--mouse-y': '50vh', '--tilt-x': '0deg', '--tilt-y': '0deg' }}
    >
      
      {/* CUSTOM SUN CURSOR */}
      <div 
        className="pointer-events-none fixed z-[99999] transition-transform duration-75 mix-blend-screen"
        style={{
          left: 'var(--mouse-x)', top: 'var(--mouse-y)', width: '150px', height: '150px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,230,0,0.8) 15%, rgba(255,100,0,0.4) 40%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      ></div>

      <div className="h-32 w-full block pointer-events-none"></div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 opacity-40 mix-blend-${theme === 'light' ? 'multiply' : 'screen'}`} style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(124,58,237,0.12), transparent 40%)` }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,${theme === 'light' ? '#00000005' : '#ffffff05'}_1px,transparent_1px),linear-gradient(to_bottom,${theme === 'light' ? '#00000005' : '#ffffff05'}_1px,transparent_1px)] bg-[size:4rem_4rem]`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <section className="min-h-[80vh] flex flex-col justify-center mb-32 relative pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 transform-gpu" style={{ transform: 'rotateX(var(--tilt-x)) rotateY(var(--tilt-y))', transformStyle: 'preserve-3d' }}>
              <h1 className={`font-poppins text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 flex flex-wrap ${theme === 'light' ? 'text-brand-blue' : 'text-white'}`}>
                <span className="flex">
                  {'Designing'.split('').map((char, i) => <span key={i} className="char-reveal block">{char}</span>)}
                </span>
                <span className="w-4 md:w-6"></span>
                <span className="flex">
                  {'The'.split('').map((char, i) => <span key={i} className="char-reveal block">{char}</span>)}
                </span>
                {/* This invisible div forces the next item onto a new line */}
                <div className="w-full h-0"></div>
                <span className="flex mt-2 md:mt-4">
                  {'Future.'.split('').map((char, i) => <span key={i} className="char-reveal block text-brand-accent-blue">{char}</span>)}
                </span>
              </h1>
              <div className="grow-line h-[2px] w-full bg-gradient-to-r from-brand-accent-blue to-transparent mb-8 origin-left"></div>
              <div className={`backdrop-blur-xl ${glassStyle} p-8 rounded-2xl shadow-2xl relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <p className={`text-lg md:text-xl font-light leading-relaxed relative z-10 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  I have always been more interested in people than neat definitions. In what they carry, what they notice, what they remember, and what quietly shapes the way they move through the world.
                  <br /><br />
                  That is probably why I design the way I do. Through observation, feeling, systems, and stories that usually sit underneath the obvious.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center float-slow relative group">
              <div className="absolute inset-0 bg-brand-accent-blue/20 blur-[60px] rounded-full group-hover:bg-brand-accent-blue/40 group-hover:scale-125 transition-all duration-700 -z-10"></div>
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-tr from-brand-accent-blue to-transparent transform-gpu group-hover:rotate-6 transition-transform duration-700 cursor-none">
                <div className="w-full h-full rounded-full overflow-hidden bg-brand-blue relative">
                  <img src={profilePhoto} alt="Srushti" className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ccff00]/80 blur-[2px] -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-30"></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* NEON SKILL GALAXY */}
        <section className="py-24 relative flex flex-col items-center justify-center min-h-[70vh]">
          <h2 className={`font-poppins text-3xl font-bold uppercase tracking-widest mb-24 text-center ${theme === 'light' ? 'text-brand-blue' : 'text-white'}`}>
            Skill <span className="text-brand-accent-blue">Universe</span>
          </h2>

          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center float-fast">
            
            <div className={`absolute w-28 h-28 backdrop-blur-md border border-brand-accent-blue rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)] z-20 cursor-none hover:scale-110 transition-transform ${glassStyle}`}>
              <span className={`font-mono text-xs font-bold tracking-widest text-center ${theme === 'light' ? 'text-brand-blue' : 'text-white'}`}>SERVICE<br/>DESIGN</span>
            </div>

            <div className="absolute w-full h-full rounded-full animate-[spin_25s_linear_infinite] border-2 border-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.4),inset_0_0_30px_rgba(0,243,255,0.4)]">
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 backdrop-blur-sm border rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite_reverse] hover:bg-brand-accent-blue hover:text-white hover:scale-125 transition-all cursor-none group ${glassStyle}`}>
                <span className="font-mono text-[10px] text-center font-bold">Journey<br/>Mapping</span>
              </div>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 backdrop-blur-sm border rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite_reverse] hover:bg-brand-accent-blue hover:text-white hover:scale-125 transition-all cursor-none group ${glassStyle}`}>
                <span className="font-mono text-[10px] text-center font-bold">Insight<br/>Synthesis</span>
              </div>
            </div>

            <div className="absolute w-[65%] h-[65%] rounded-full animate-[spin_18s_linear_infinite_reverse] border-2 border-[#b026ff] shadow-[0_0_30px_rgba(176,38,255,0.4),inset_0_0_30px_rgba(176,38,255,0.4)]">
              <div className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-20 h-20 backdrop-blur-sm border rounded-full flex items-center justify-center animate-[spin_18s_linear_infinite] hover:bg-brand-accent-blue hover:text-white hover:scale-125 transition-all cursor-none group ${glassStyle}`}>
                <span className="font-mono text-[10px] text-center font-bold">UX<br/>Strategy</span>
              </div>
              <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 backdrop-blur-sm border rounded-full flex items-center justify-center animate-[spin_18s_linear_infinite] hover:bg-brand-accent-blue hover:text-white hover:scale-125 transition-all cursor-none group ${glassStyle}`}>
                <span className="font-mono text-[10px] text-center font-bold">Co-Design</span>
              </div>
            </div>

          </div>
        </section>

        {/* ROADMAP */}
        <section className="py-24 relative">
          <h2 className={`font-poppins text-3xl font-bold uppercase tracking-widest mb-16 text-center ${theme === 'light' ? 'text-brand-blue' : 'text-white'}`}>
            The <span className="text-brand-accent-blue">Roadmap</span>
          </h2>

          <div className="relative border-l-2 border-brand-accent-blue/30 ml-6 md:ml-12" ref={timelineRef}>
            <div className="absolute top-0 left-[-2px] w-1 h-full bg-gradient-to-b from-brand-accent-blue via-transparent to-transparent origin-top scale-y-0 scroll-line"></div>

            {[
              { year: 'PRESENT', title: 'Inforens', desc: 'UX Strategy & Service Design Internship. Helping a student platform feel as trustworthy as the service behind it.' },
              { year: 'RECENT', title: 'Scottish Widows x GSA', desc: 'Designing income protection for people whose lives do not fit a fixed salary through deep qualitative research.' },
              { year: 'PAST', title: 'Sweet Lies & Bitter Truth', desc: 'Inclusive Education & Editorial Design. Using one biscuit to open up a much bigger story about empire, labour, and identity.' },
              { year: 'ORIGIN', title: 'The Foundation', desc: 'Transitioned from journalism and media to uncovering human-centric insights and building strategic service systems.' }
            ].map((node, i) => (
              <div key={i} className="timeline-node relative pl-12 md:pl-20 py-8 group">
                <div className="absolute top-10 left-[-9px] w-4 h-4 rounded-full bg-white border-2 border-brand-accent-blue group-hover:bg-brand-accent-blue group-hover:shadow-[0_0_15px_rgba(124,58,237,0.8)] transition-all duration-300"></div>
                
                <span className="font-mono text-xs font-bold text-brand-accent-blue tracking-widest block mb-2">{node.year}</span>
                <div className={`backdrop-blur-md ${glassStyle} p-6 rounded-xl hover:border-brand-accent-blue transition-colors duration-300 cursor-none shadow-lg group-hover:-translate-y-1 transform`}>
                  <h3 className={`font-poppins text-xl font-bold mb-2 ${theme === 'light' ? 'text-brand-blue' : 'text-white'}`}>{node.title}</h3>
                  <p className={`font-montserrat text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TERMINAL & STATS */}
        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Ice Tea Consumed', target: '999', suffix: '+' },
                { label: 'Sunsets Watched', target: '333', suffix: '+' },
                { label: 'Cuisines Tried', target: '15', suffix: '+' },
                { label: 'Chocolate Types', target: '100', suffix: '+' }
              ].map((stat, i) => (
                <div key={i} className={`backdrop-blur-md ${glassStyle} p-6 rounded-xl flex flex-col justify-center items-center text-center group hover:border-brand-accent-blue transition-colors duration-300 cursor-none float-slow shadow-lg`} style={{ animationDelay: `${i * 0.2}s` }}>
                  <span className="stat-counter font-poppins text-4xl md:text-5xl font-black text-brand-accent-blue mb-2" data-target={stat.target} data-suffix={stat.suffix}>0</span>
                  <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${theme === 'light' ? 'text-slate-500 group-hover:text-brand-blue' : 'text-slate-400 group-hover:text-white'}`}>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[350px]">
              <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-4 font-mono text-[10px] text-slate-500 tracking-widest">guest@srushti-design:~</span>
              </div>
              
              <div className="p-6 font-mono text-xs leading-relaxed text-slate-300 flex-grow overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col gap-2">
                {history.map((cmd, i) => (
                  <div key={i} className={cmd.type === 'input' ? 'text-brand-accent-blue font-bold' : 'text-slate-400'}>
                    {cmd.type === 'input' ? '> ' : ''}{cmd.text.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2" ref={terminalEndRef}>
                  <span className="text-brand-accent-blue font-bold">{'>'}</span>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none flex-grow text-white font-mono placeholder-slate-700"
                    placeholder="Type 'help'..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
          </div>

           
        </section>
      </div>

      {/* --- 15 PHOTO MEMORY WALL --- */}
      <section ref={horizontalRef} className="relative w-full h-screen overflow-hidden flex items-center bg-brand-blue z-20 border-t border-white/10 mt-12">
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div ref={scrollWrapperRef} className="flex items-center gap-12 md:gap-20 px-[15vw] h-full w-max">
          {memories.map((mem, i) => {
            const rotate = i % 2 === 0 ? `rotate-${(i%4)+1}` : `-rotate-${(i%3)+2}`;
            const marginTop = i % 2 === 0 ? (i%3 === 0 ? '-mt-32' : 'mt-40') : (i%4 === 0 ? '-mt-48' : 'mt-24');
            const width = i % 3 === 0 ? 'w-48 md:w-64' : (i % 2 === 0 ? 'w-40 md:w-56' : 'w-36 md:w-48');

            return (
              <React.Fragment key={i}>
                <div className={`relative ${width} ${marginTop} transform ${rotate} hover:rotate-0 hover:scale-125 hover:z-50 transition-all duration-500 ease-out cursor-none group`}>
                  <span className="absolute -bottom-4 -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#ccff00] text-black font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-2 z-20 shadow-sm max-w-[200px] whitespace-normal text-left leading-tight">
                    {memoryCaptions[i]}
                  </span>
                  <div className="relative overflow-hidden bg-white p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
                    <img src={mem} alt={`Memory ${i+1}`} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#ccff00]/80 blur-[2px] -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-30"></div>
                  </div>
                </div>

                {i === 7 && (
                  <div className="relative w-80 md:w-[600px] z-20 mx-8">
                    <h3 className="font-poppins font-black text-4xl md:text-6xl text-white leading-[1.1] uppercase tracking-tighter mix-blend-difference">
                      "WHO AM I, <br/><span className="text-[#8244F5]">WITHOUT MY WIDE SMILE.</span>"
                    </h3>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </section>

      {/* --- 20 PHOTO NATURE MASONRY WALL --- */}
      <section className="py-32 relative bg-[#050505] z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-24">
            <h2 className="font-poppins text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              The <span className="text-brand-accent-blue">World</span> Through My Lens.
            </h2>
            <p className="font-montserrat text-slate-400 font-light max-w-2xl mx-auto">
              Nature, architecture, and the quiet beauties of the world captured over time.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {naturePhotos.map((nat, i) => (
              <div key={i} className="nature-photo break-inside-avoid relative group overflow-hidden bg-white/5 p-2 border border-white/10 hover:border-brand-accent-blue/50 transition-colors duration-500 cursor-none rounded-sm">
                
                <div className="relative overflow-hidden">
                  <img src={nat} alt={`Nature ${i+1}`} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ccff00]/80 blur-[2px] -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-30"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan { 
          0% { transform: translateY(-100%); opacity: 0; } 
          10% { opacity: 1; } 
          90% { opacity: 1; } 
          100% { transform: translateY(400px); opacity: 0; } 
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default About;