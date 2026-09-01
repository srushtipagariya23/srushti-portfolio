import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import news1 from '../assets/news-1.png';
import news2 from '../assets/news-2.png';
import news3 from '../assets/news-3.png';
import news4 from '../assets/news-4.png';
import news5 from '../assets/news-5.png';
import news6 from '../assets/news-6.png';
import news7 from '../assets/news-7.png';
import news8 from '../assets/news-8.png';

import sweet1 from '../assets/sweet-1.png';
import sweet2 from '../assets/sweet-2.png';
import sweet3 from '../assets/sweet-3.png';
import sweet4 from '../assets/sweet-4.png';

import inforens1 from '../assets/inforens-1.png';

import scottish1 from '../assets/scottish-1.png';
import scottish2 from '../assets/scottish-2.png';
import scottish3 from '../assets/scottish-3.png';
import scottish4 from '../assets/scottish-4.png';
import scottish5 from '../assets/scottish-5.png';
import scottish6 from '../assets/scottish-6.png';
import scottish7 from '../assets/scottish-7.mp4';

import bored1 from '../assets/bored-1.png';
import bored2 from '../assets/bored-2-1.png';
import bored3 from '../assets/bored-2-2.png';
import bored4 from '../assets/bored-3.png';
import bored5 from '../assets/bored-4.png';


gsap.registerPlugin(ScrollTrigger);

// --- FULL PROJECT DATA ENGINE ---
const projectData = {
  "scottish-widows": {
    title: "Scottish Widows x GSA",
    tag: "Service Design / Financial Wellbeing / Live Client Project",
    heroSubtitle: "Exploring how income protection can be understood, communicated, and experienced in a more human and meaningful way.",
    heroCopy: "In this live client project at Glasgow School of Art, we worked with Lloyds Banking Group to explore how protection services could feel more understandable, relevant, and human. After looking at the wider protection landscape, we narrowed our focus to income protection because it felt especially connected to uncertainty, changing work patterns, and the kinds of futures many people are trying to navigate today. Working collaboratively across research, interviews, synthesis, and prototyping, we wanted to understand not only what people knew about income protection, but why it so often felt distant, unclear, or difficult to act on.",
    quickFacts: [
      "Project type: Live client academic project",
      "Client: Lloyds Banking Group / Scottish Widows",
      "Duration: Academic term project",
      "Team: Group project",
      "Role: Service Designer",
      "Focus: Income protection service journey"
    ],
    image1: { src: scottish1, caption: "A service design project focused on making income protection feel clearer, more relevant, and easier to trust." },
    brief: "The project began with a broad question around protection, but it quickly became clear that income protection carried a particular kind of tension. For many people, it sat somewhere between something important and something they had never fully seen themselves needing. The challenge was to understand what created that distance, what emotional and practical barriers shaped people’s responses, and how the experience could feel more supportive from the very beginning.",
    image2: { 
      type: 'split', 
      srcs: [scottish2, scottish3], // Passes both images side-by-side
      microcopy: ["Focus area", "Stakeholder landscape"], 
      caption: "We began broadly with sticky-note ideation, then structured our findings into a clear stakeholder landscape." 
    },
    approach: "This was a fully collaborative group project, so the work moved across the whole process together rather than through fixed individual roles. We used exploratory design methods to understand the space first, then gradually built a clearer direction through research, mapping, synthesis, and prototyping.",
    approachBullets: [
      "Explored the wider protection landscape before narrowing the focus.",
      "Conducted public interviews, desk research, and digital surveys.",
      "Built user flows, journey maps, stakeholder maps, and service blueprints.",
      "Synthesised findings into patterns, themes, and opportunity areas.",
      "Translated insights into a redesigned website journey prototype."
    ],
    insights: [
      "Many people did not reject income protection. They simply did not see themselves in it.",
      "Trust was shaped as much by tone and framing as by information.",
      "In financial conversations, pauses and discomfort often revealed as much as direct answers."
    ],
    image4: { 
      type: 'split', 
      srcs: [scottish4, scottish5], 
      microcopy: ["Journey Map", "Redesigned Journey"], 
      caption: "Journey mapping the trust gaps (left) helped us directly shape a much clearer, human-facing website prototype (right)." 
    },
    output: "The final output moved beyond insight gathering into a clearer service direction and a more human-facing prototype. Rather than simply explaining income protection better, the work aimed to make the experience feel easier to recognise, easier to trust, and easier to move through.",
    outputBullets: [
      "Research synthesis",
      "Rationale for choosing income protection as the focus",
      "Opportunity areas",
      "User flow and service journey thinking",
      "Service blueprint and journey framework",
      "Redesigned website journey prototype"
    ],
    /* We set image5 to null because 4 and 5 are now combined side-by-side in image4! */
    image5: { 
      type: 'video',
      src: scottish7, 
      microcopy: ["Live Demo", "Mobile Touchpoints"], 
      caption: "The redesigned journey translates our research into a clearer, more human-facing mobile and web experience." 
    },
    outcome: "The project reframed income protection as more than a communication problem. It showed that the experience depends on whether people can recognise their own lives in the service, feel emotionally understood, and trust what they are being asked to consider.",
    outcomeBullets: [
      "Individual: Made the service feel easier to understand and act on.",
      "Organisation: Highlighted where communication could better build trust.",
      "Wider impact: Opened a more accessible way of thinking about financial protection."
    ],
    challenges: "This project came with two major constraints. The first was time. Because it was a live group project, we could not speak to as many users as we would have liked. The second was the sensitivity of the topic itself. Conversations around income and instability required a more careful and trauma-aware way of listening.",
    reflections: "This project taught me that interviews are not only about collecting answers. They are about learning how to listen properly. Often, what matters most sits in a pause, a hesitation, or a moment of discomfort.",
    reflectionCards: [
      "How someone speaks can reveal as much as what they say.",
      "The quality of a question shapes the quality of an insight.",
      "A service becomes stronger when it is viewed from multiple perspectives.",
      "Visuals need to explain the idea, not just decorate the page."
    ]
  },
  "sweet-lies": {
    title: "Sweet Lies and Bitter Truth",
    tag: "Inclusive Education / Editorial Design / Learning Experience",
    heroSubtitle: "An educational newspaper designed to help young learners engage with colonial history through honesty, structure, and care.",
    heroCopy: "In this live group project at Glasgow School of Art, we worked with Mackintosh at the Willow and the National Trust for Scotland to design an educational learning resource for secondary school students. Using the Empire Biscuit as a starting point, we explored colonial history, labour, food heritage, and identity through an eight-page newspaper created to make a sensitive subject feel accessible, thoughtful, and honest. As a group, we worked across the full process together, and I contributed especially strongly through content writing, language refinement, and shaping how the story unfolded across the experience.",
    quickFacts: [
      "Project type: Live academic group project",
      "Partners: Mackintosh at the Willow / National Trust for Scotland",
      "Duration: Five-week project",
      "Audience: Learners aged 13 to 16",
      "Role: Service Designer",
      "Deliverable: Eight-page educational newspaper prototype"
    ],
    image1: { src: sweet1, caption: "An editorial learning experience designed to hold difficult history with honesty, structure, and care." },
    brief: "The brief was to create a learning resource around Scottish afternoon tea for young learners, with a focus on historical power and empire. What sounded simple at first quickly opened into something much larger. The challenge was to communicate a deeply sensitive history in a way that respected young audiences, worked in real classrooms, and remained accessible to different learner needs without reducing the depth of the subject.",
    image2: { src: sweet2, microcopy: ["One biscuit", "Six countries", "Centuries of exploitation"], caption: "What first looked like a simple object quickly opened into a much wider story of labour, trade, empire, and identity." },
    approach: "This project was shaped through stakeholder listening, concept testing, editorial decision-making, and repeated simplification. Because we could not speak directly with the end users due to ethical constraints, we relied on expert input, student reactions to existing learning formats, and careful judgment throughout the process.",
    approachBullets: [
      "Conducted site visits and listened to stakeholder presentations.",
      "Gathered input on accessibility, curriculum, hospitality, and food heritage.",
      "Reviewed student reactions to existing learning formats.",
      "Explored concepts including workshops, games, roleplay, timelines, and sensory ideas.",
      "Rejected ideas that distracted from the history or created access barriers.",
      "Chose a newspaper format because it felt clearer, more realistic, and more respectful to the content."
    ],
    image3: { src: sweet3, microcopy: ["Teachers have limited time", "Accessibility starts early", "Content must stay honest"], caption: "Stakeholder insight helped define what the resource needed to do in real classrooms, not just what sounded engaging in theory." },
    insights: [
      "Teenagers did not need to be over-entertained. They needed to be respected with real content.",
      "Format should support learning, not overpower it.",
      "Accessibility had to shape the resource from the beginning, not the final polish."
    ],
    image4: { src: sweet4, caption: "Some of the strongest decisions in the project came from the ideas we chose not to pursue." },
    output: "The final output was an eight-page educational newspaper where every element was deliberately structured, edited, and reviewed several times. The wording, pacing, and sequencing were shaped carefully so the experience could stay clear, sensitive, and educational without losing depth.",
    outputBullets: [
      "Eight-page newspaper prototype",
      "Narrative structure across the full reading journey",
      "Carefully written and edited content",
      "Reflection prompts and learning cues",
      "A format designed for real classroom use"
    ],
    image5: { 
      type: "newspaper", 
      srcs: [news1, news2, news3, news4, news5, news6, news7, news8], 
      text: "[ Newspaper Viewer Loaded ]", 
      microcopy: ["Chunked learning", "Editorial pacing", "One clear idea per page"], 
      caption: "The newspaper format allowed the content to unfold gradually, helping learners move through a difficult subject with more clarity and confidence." 
    },
    outcome: "The project showed that difficult histories can be taught more effectively when the format is simple, content-led, and designed with real access conditions in mind. It also demonstrated how editorial design, storytelling, and accessibility can work together to create a more meaningful learning experience.",
    outcomeBullets: [
      "A format that could work within one class period.",
      "A resource that did not rely on expensive tools or complex setup.",
      "A more respectful and accessible way of engaging with colonial history."
    ],
    challenges: "This project had several important constraints. We could not speak directly to the end users because of ethical concerns and the sensitivity of the subject, so we had to build the work through stakeholder insight, secondary feedback, and careful interpretation. Time and budget shaped every decision too.",
    reflections: "This project taught me that simplicity does not mean losing depth. Sometimes the most respectful design choice is the Math that removes spectacle and lets the content do the work. It also made me more aware of how budget, ethics, time, and accessibility shape what good design really looks like in practice.",
    reflectionCards: [
      "Content-led experiences can be more powerful than highly interactive ones.",
      "Budget and access shape design just as much as creativity does.",
      "Simplicity can hold serious complexity when it is designed carefully."
    ]
  },
  "inforens": {
    title: "Inforens",
    tag: "UX Strategy / Service Design / Internship Project",
    heroSubtitle: "Making a student platform feel clearer, more trustworthy, and more human across website, rewards, and journey design.",
    heroCopy: "At Inforens, I worked across a live team environment with designers, founders, and developers to improve how the platform communicated value and supported international students across different stages of their journey. My work spanned website experience, service clarity, content recommendations, and a mystery reward system, all focused on making the platform feel more trustworthy, visible, and useful to first-time users.",
    quickFacts: [
      "Project type: Internship project",
      "Organisation: Inforens",
      "Duration: Ongoing internship project",
      "Team: Designers, founders, and developers",
      "Role: Service Designer",
      "Scope: Website experience, service visibility, and reward system design"
    ],
    image1: { text: "[ Polished dark mockup of the Inforens site ]", caption: "A service and UX project focused on turning hidden value into a clearer student-facing experience." },
    brief: "Inforens already offered strong student value through peer mentorship, post-arrival support, proprietary tools, and structured service bundles, but much of that value was buried or weakly communicated for first-time visitors. The challenge was to make those strengths more visible and shape a clearer experience of trust, progression, and usefulness across the platform.",
    image2: { text: "[ Comparison visual showing what Inforens actually offers versus website ]", microcopy: ["Strong product", "Weak communication", "Hidden value"], caption: "The gap was not in the service itself, but in how little of its value was visible to a first-time user." },
    approach: "The work was approached through a first-time-user and service design lens. Rather than treating the platform as a set of isolated screens, I looked at how visibility, structure, trust, and progression worked across the whole experience.",
    approachBullets: [
      "Audited the website experience from a first-time user perspective.",
      "Identified trust, clarity, and navigation gaps.",
      "Developed recommendations for homepage messaging, pricing visibility, mentor visibility, and service communication.",
      "Proposed journey improvements across plans, tools, and post-arrival support.",
      "Built a reward logic system based on actual Inforens services rather than generic discounts."
    ],
    image3: { text: "[ Report spread or diagram showing the main website experience findings. ]", caption: "The audit focused on the places where strong service value already existed, but was not visible enough to first-time users." },
    insights: [
      "The product was stronger than the website communication.",
      "Trust was being weakened by hidden pricing, buried tools, and low visibility of human proof.",
      "Students need to feel the outcome before they fully understand the service."
    ],
    image4: { text: "[ Homepage recommendation visual ]", caption: "The recommendations focused on making trust signals and service value visible earlier in the journey." },
    output: "The work resulted in a set of connected strategic and UX deliverables designed to improve clarity, visibility, and conversion without losing the student-first quality of the service. Each recommendation aimed to make the platform feel less hidden, less fragmented, and more trustworthy from the first interaction onward.",
    outputBullets: [
      "Website experience report",
      "Homepage and purchase journey recommendations",
      "Content and service visibility recommendations",
      "Structural improvements across plans and tools",
      "Four-tier mystery reward system tied to real Inforens services"
    ],
    image5: { text: "[ Strong report page showing homepage recommendations ]", microcopy: ["Clear promise", "Visible pricing", "Human proof"], caption: "The recommendations focused on making the service easier to understand before asking users to commit." },
    outcome: "The project helped turn hidden platform strengths into clearer user-facing opportunities. It also created a stronger framework for thinking about trust, progression, pricing visibility, and rewards as connected parts of one service experience rather than separate features.",
    outcomeBullets: [
      "Clearer communication of student value",
      "Stronger visibility of human proof",
      "Better trust-building before commitment",
      "More meaningful reward design tied to real services"
    ],
    image6: { text: "[ Clean reward-system visual showing the four reward tiers ]", caption: "The reward system was designed around real platform services, turning engagement into meaningful value instead of generic offers." },
    challenges: "One challenge was that the issues were spread across multiple touchpoints rather than sitting inside one isolated feature. That meant the work had to stay strategic and systemic, not only visual. Another challenge was balancing business value with user trust.",
    image7: { text: "[ Simple impact grid showing visibility, trust, progression, and value. ]", caption: "The work focused on making the platform’s strongest qualities easier to see, understand, and act on." },
    reflections: "This project taught me that trust is rarely built by one feature alone. It usually comes from the consistency of signals across pricing, structure, language, proof, and visibility. It also reinforced that discovery is increasingly mobile-first for younger audiences, even if later decisions happen elsewhere.",
    reflectionCards: [
      "Trust is cumulative.",
      "Visual memory often works faster than long explanations.",
      "Discovery is mobile-first, even when purchase is not."
    ]
  },
  "bored-directors": {
    title: "Bored Directors",
    tag: "Service Design / Education / Masters Research Project",
    heroSubtitle: "Designing for the phone-free time that remains when the screen is put away.",
    heroCopy: "In this independent Masters research project at Glasgow School of Art, I investigated a gap that had not yet been designed for. Schools are increasingly restricting phones, but removing a phone does not automatically create meaningful time. For young people who have grown up with a screen available in every spare moment, unstructured phone-free time can feel unfamiliar. Through desk research, eight primary interviews, co-design exchange and iterative prototyping, I explored what might help young people enter that time with curiosity rather than anxiety. The result is Bored Directors, a physical instructional card system that offers voluntary prompts for noticing, making, communicating, pausing and thinking differently.",
    quickFacts: [
      "Project type: Independent Masters research project",
      "Institution: Glasgow School of Art, MDes Design Innovation and Service Design",
      "Duration: Twelve weeks",
      "Team: Individual project",
      "Role: Research, synthesis, ideation, co-design, service design, prototyping and testing",
      "Focus: Phone-free unstructured time for young people aged 14-16",
      "Methods: Desk research, stakeholder interviews, affinity clustering, co-design, precedent analysis, journey mapping, service blueprinting and physical prototyping"
    ],
    image1: { src: bored1, caption: "The research question narrowed through evidence, stakeholder feedback and testing." },
    brief: "The project began with a broad question about boredom and creativity in Scottish secondary schools. It quickly became clear that the more urgent question sat inside a live policy moment: phones were being restricted, but no one had designed for the time left behind. The brief was not about whether phones are good or bad. It was about what comes after restriction. What fills the time. Who takes responsibility for it. And what conditions might help something creative, reflective or self-directed emerge. I began with the question: How is boredom linked to creativity in Scottish secondary schools? I finished with: What conditions could support creative and critical thinking in phone-free unstructured time for young people aged 14–16? Each shift was forced by research and feedback, not intuition.",
    image2: { type: 'split', 
    srcs: [bored2, bored3], caption: "The research question narrowed through evidence, stakeholder feedback and testing." },
    approach: "I used the Double Diamond to separate problem framing from problem solving. The first phase focused on understanding the gap between phone restriction and the experience of young people inside that policy. The second phase translated the research into possible design directions. I used three main approaches: Affinity clustering to identify repeated patterns across eight stakeholder interviews. Co-design to explore emerging ideas through a shared session with Daydream Believers. Precedent-led design to test ideas against creative practices such as Brian Eno’s Oblique Strategies, Yoko Ono’s Grapefruit and Bruno Munari’s approach to curiosity and making. The final deck did not begin as a predetermined answer. It developed from the evidence.",
    approachBullets: [
      "Affinity clustering to identify repeated patterns across eight stakeholder interviews.",
      "Co-design to explore emerging ideas through a shared session with Daydream Believers.",
      "Precedent-led design to test ideas against creative practices such as Brian Eno’s Oblique Strategies.",
      "Translated research into a physical instructional card system."
    ],
    insights: [
      "The issue is not simply phone use. Young people may be choosing phones over the discomfort of an empty moment.",
      "Ownership changes engagement. Ownership is often the variable, not the activity itself.",
      "Restriction is not restoration. Phone-free time is an unfamiliar experience that needs to be entered, not imposed.",
      "The gap is systemic. No single person currently owns the transition from phone access to phone-free time."
    ],
    image3: { src: bored3 , caption: "The research moved from literature, to people, to systems, to a physical prototype." },
    image4: { src: bored4 , caption: "Every design decision traces back to a research finding." },
    output: "Bored Directors is a physical instructional card system for young people aged 14–16. The deck creates small, voluntary invitations into phone-free unstructured time. It does not tell young people to be creative, productive or sociable. Instead, it gives them different ways to begin: noticing, making, imagining, communicating, pausing or defining an open problem. There are no correct answers, scores or required outcomes. A card can be picked up, adapted, ignored, passed on or used in a completely unexpected way. The name positions young people as directors of their own unstructured time. The tone is slightly formal, deadpan and speculative, as if the organisation issuing the cards is real. Each department translates a research insight into a different entry point: Observation, Misdirection, Communication, Making, Stillness, and De-Brief.",
    outputBullets: [
      "Voluntary entry into phone-free time",
      "Minimal adult facilitation",
      "One brief check-in without evaluation",
      "No marking, collection or homework",
      "Reusable across future sessions",
      "Designed to fit existing school spaces"
    ] 
  }
};

// --- SYNCHRONIZED BOOK SPREAD COMPONENT ---
const BookSpreadViewer = ({ srcs, caption, microcopy }) => {
  const [spreadIndex, setSpreadIndex] = useState(0);
  
  // NEW MATH: Page 1 is centered. Remaining pages are grouped in 2.
  const totalSpreads = srcs.length > 0 ? 1 + Math.ceil((srcs.length - 1) / 2) : 0;

  const goNext = (e) => {
    e.stopPropagation();
    if (spreadIndex < totalSpreads - 1) setSpreadIndex(p => p + 1);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    if (spreadIndex > 0) setSpreadIndex(p => p - 1);
  };

  // Logic to properly align pages 2 & 3, 4 & 5 etc.
  const leftImageIndex = spreadIndex === 0 ? -1 : (spreadIndex * 2) - 1;
  const rightImageIndex = spreadIndex === 0 ? 0 : (spreadIndex * 2);

  return (
    <div className="scroll-fade my-16 w-full flex flex-col group cursor-none">
      
      <div className="relative w-full bg-[#F7F7F4] rounded-2xl border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center p-4 md:p-8 transition-colors hover:bg-[#f1f1eb]">
        
        <div className="relative w-full max-w-6xl aspect-[1.4/1] flex shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-sm bg-white">
          
          {spreadIndex === 0 ? (
            /* FIX 2: PAGE 1 IS NOW PERFECTLY CENTERED */
            <div 
              onClick={goNext}
              className="w-full h-full relative flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-50 transition-colors bg-white"
            >
              {srcs[0] && (
                <img 
                  src={srcs[0]} 
                  alt="Cover Page" 
                  onLoad={() => ScrollTrigger.refresh()}
                  className="h-[95%] w-auto max-w-full object-contain drop-shadow-2xl" 
                  style={{ imageRendering: '-webkit-optimize-contrast' }} 
                />
              )}
            </div>
          ) : (
            /* PAGES 2 ONWARD STAGGER LEFT & RIGHT */
            <>
              {/* LEFT PAGE */}
              <div 
                onClick={goPrev}
                className={`w-1/2 h-full relative flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-50 transition-colors ${leftImageIndex < 0 ? 'bg-transparent cursor-default hover:bg-transparent' : 'bg-white border-r border-slate-300'}`}
              >
                {leftImageIndex >= 0 && srcs[leftImageIndex] && (
                  <>
                    <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black/15 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
                    <img 
                      src={srcs[leftImageIndex]} 
                      alt={`Left Page ${leftImageIndex + 1}`} 
                      onLoad={() => ScrollTrigger.refresh()}
                      className="w-full h-full object-contain" 
                      style={{ imageRendering: '-webkit-optimize-contrast' }} 
                    />
                  </>
                )}
              </div>

              {/* RIGHT PAGE */}
              <div 
                onClick={goNext}
                className="w-1/2 h-full relative bg-white flex items-center justify-center overflow-hidden cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black/15 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
                {rightImageIndex < srcs.length && srcs[rightImageIndex] && (
                  <img 
                    src={srcs[rightImageIndex]} 
                    alt={`Right Page ${rightImageIndex + 1}`} 
                    onLoad={() => ScrollTrigger.refresh()}
                    className="w-full h-full object-contain" 
                    style={{ imageRendering: '-webkit-optimize-contrast' }} 
                  />
                )}
              </div>
            </>
          )}

        </div>

        {/* Hover Hint - LEFT SIDE (Previous) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:flex">
          {spreadIndex > 0 && (
            <span className="bg-brand-blue text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg> Previous
            </span>
          )}
        </div>

        {/* Hover Hint - RIGHT SIDE (Next) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:flex">
          {spreadIndex < totalSpreads - 1 && (
            <span className="bg-brand-blue text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
              Next <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          )}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
        {microcopy && (
          <div className="flex gap-2 flex-wrap order-2 md:order-1">
            {microcopy.map((label, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-50 text-brand-blue text-[9px] font-bold uppercase tracking-widest rounded shadow-sm border border-slate-200">
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 order-1 md:order-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <button onClick={goPrev} disabled={spreadIndex === 0} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-none ${spreadIndex === 0 ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-brand-blue hover:bg-brand-accent-blue hover:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Spread {spreadIndex + 1} of {totalSpreads}
          </span>
          
          <button onClick={goNext} disabled={spreadIndex >= totalSpreads - 1} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-none ${spreadIndex >= totalSpreads - 1 ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-brand-blue hover:bg-brand-accent-blue hover:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
      <p className="font-montserrat text-sm text-slate-500 font-medium pl-3 border-l-2 border-brand-accent-blue/30 mt-6 self-start">{caption}</p>
    </div>
  );
};


// --- IMAGE BLOCK MOVED OUTSIDE OF CASESTUDY COMPONENT TO PREVENT RE-RENDER FLICKER ---
const ImageBlock = ({ image }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px" } 
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!image) return null;
  if (image.type === 'newspaper') {
    return <BookSpreadViewer srcs={image.srcs} caption={image.caption} microcopy={image.microcopy} />;
  }
  
  return (
    <div ref={containerRef} className="scroll-fade my-12 group">
      <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative mb-4 block min-h-[300px] md:min-h-[450px]">
        
        {isVisible && (
          <>
            {image.type === 'split' && image.srcs ? (
                <div className="flex flex-col md:flex-row w-full z-10 relative bg-white overflow-hidden">
                  <div className="w-full md:w-1/2 relative border-b md:border-b-0 md:border-r border-slate-200 aspect-[4/3] md:aspect-square">
                    <img src={image.srcs[0]} alt="Split left" onLoad={() => ScrollTrigger.refresh()} className="absolute inset-0 w-full h-full object-cover m-0 block" />
                  </div>
                  <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-square">
                    <img src={image.srcs[1]} alt="Split right" onLoad={() => ScrollTrigger.refresh()} className="absolute inset-0 w-full h-full object-cover m-0 block" />
                  </div>
                </div>
              ) : image.type === 'video' && image.src ? (
                <video 
                  src={image.src} 
                  controls 
                  preload="none"
                  playsInline 
                  onLoadedData={() => ScrollTrigger.refresh()}
                  className="w-full aspect-video object-cover block z-10 relative bg-black" 
                />
              ) : image.src ? (
                <img src={image.src} alt={image.text || "Project Visual"} onLoad={() => ScrollTrigger.refresh()} className="w-full h-auto max-h-[450px] md:max-h-[600px] block z-10 object-contain mx-auto relative p-0" />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center p-6 text-center z-10 text-slate-400 font-mono text-xs">{image.text}</div>
              )}
              
              {image.microcopy && (
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-20 pointer-events-none">
                  {image.microcopy.map((label, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-brand-blue text-[9px] font-bold uppercase tracking-widest rounded shadow-sm border border-slate-100 pointer-events-auto">
                      {label}
                    </span>
                  ))}
                </div>
              )}
          </>
        )}

      </div>
      <p className="font-montserrat text-sm text-slate-500 font-medium pl-3 border-l-2 border-brand-accent-blue/30">{image.caption}</p>
    </div>
  );
};


const CaseStudy = () => {
  const { id } = useParams();
  const project = projectData[id] || projectData["scottish-widows"];
  const pageRef = useRef(null);
  
  const [activeSection, setActiveSection] = useState('brief');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = ['Brief', 'Approach', 'Output', 'Outcome', 'Challenges'];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      const offset = 160; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } 
    );
    sections.forEach((sec) => {
      const el = document.getElementById(sec.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".animate-up", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" });
      gsap.utils.toArray('.scroll-fade').forEach((element) => {
        gsap.fromTo(element, { y: 40, opacity: 0 }, { scrollTrigger: { trigger: element, start: "top 85%" }, y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
      });
    }, pageRef);
    return () => ctx.revert();
  }, [id]);

  if (!project) return <div className="p-20 text-center font-mono">Case study not found.</div>;

  const reflectionGridClass = project.reflectionCards && project.reflectionCards.length === 4 
    ? 'grid-cols-1 md:grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-white text-slate-900 pb-24"> 
      
      {/* FIX 1: INVISIBLE SPACER TO PREVENT NAVBAR OVERLAP */}
      <div className="w-full pointer-events-none" style={{ height: '100px' }} aria-hidden="true"></div>

      {/* WATER-FILL STICKY PROGRESS BAR */}
      <div className="sticky top-[75px] md:top-[60px] -mt-1 md:-mt-22 z-[8000] bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-6 shadow-sm w-full transition-all">
        <div className="max-w-4xl mx-auto flex gap-2 md:gap-3 h-10 md:h-12">
          {sections.map((sec, index) => {
            const sectionSpan = 100 / sections.length;
            const startOffset = index * sectionSpan;
            const fillPercent = Math.max(0, Math.min(100, ((scrollProgress - startOffset) / sectionSpan) * 100));
            const isTextWhite = fillPercent > 50;

            return (
              <button 
                key={sec} 
                onClick={() => scrollToSection(sec)}
                className="flex-1 relative bg-brand-accent-blue/10 rounded-full md:rounded-lg overflow-hidden flex items-center justify-center shadow-inner cursor-none transition-transform duration-300 hover:scale-[1.03]"
              >
                {/* GPU HARDWARE-ACCELERATED SMOOTH FILL */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-full bg-brand-accent-blue shadow-[2px_0_10px_rgba(124,58,237,0.4)]"
                  style={{ 
                    transform: `scaleX(${fillPercent / 100})`,
                    transformOrigin: 'left',
                    transition: 'transform 0.15s ease-out',
                    willChange: 'transform'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                </div>

                <span 
                  className={`relative z-10 hidden md:block font-poppins text-xs font-bold uppercase tracking-wider transition-colors duration-300
                    ${isTextWhite ? 'text-white' : 'text-brand-accent-blue/70'}
                  `}
                >
                  {sec}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12">
        
        {/* HEADER */}
        <div className="animate-up mb-16 text-center">
          <span className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-200 text-brand-accent-blue text-[10px] font-mono uppercase tracking-widest font-bold rounded-full mb-8 shadow-sm">
            {project.tag}
          </span>
          <h1 className="font-poppins text-4xl md:text-6xl font-bold tracking-tight text-brand-blue mb-6 leading-tight">
            {project.title}
          </h1>
          <h2 className="font-montserrat text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
            {project.heroSubtitle}
          </h2>
        </div>

        <ImageBlock image={project.image1} />

        {/* HERO COPY */}
        <div className="animate-up text-lg md:text-xl font-montserrat font-light text-slate-700 leading-relaxed border-l-4 border-brand-accent-blue pl-6 md:pl-10 my-16">
          {project.heroCopy}
        </div>

        {/* QUICK FACTS */}
        <div className="animate-up mb-24 border-y border-slate-200 py-12">
          <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 text-center">Project Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {project.quickFacts.map((fact, idx) => {
              const [key, val] = fact.split(': ');
              return (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent-blue font-bold mb-2">{key}</span>
                  <span className="font-montserrat text-sm md:text-base font-medium text-brand-blue leading-snug">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BRIEF */}
        <section id="brief" className="scroll-fade pt-12 pb-8">
          <h3 className="font-poppins text-4xl font-bold text-brand-blue mb-8">Brief</h3>
          <p className="font-montserrat text-lg font-light text-slate-600 leading-relaxed">{project.brief}</p>
        </section>

        <ImageBlock image={project.image2} />

        {/* APPROACH */}
        <section id="approach" className="scroll-fade pt-12 pb-8">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 mb-12">
            <h3 className="font-poppins text-4xl font-bold text-brand-blue mb-6">Approach</h3>
            <p className="font-montserrat text-lg font-light text-slate-600 leading-relaxed mb-10">{project.approach}</p>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Process Steps</h4>
              <ul className="space-y-4 font-montserrat text-slate-700 font-medium text-sm md:text-base">
                {project.approachBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-brand-accent-blue/10 text-brand-accent-blue flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{idx + 1}</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ImageBlock image={project.image3} />

        {/* INSIGHT CARDS */}
        {project.insights && project.insights.length > 0 && (
          <section className="scroll-fade py-12">
            <h3 className="font-poppins text-sm font-bold uppercase tracking-[0.2em] text-brand-accent-blue mb-8 text-center">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.insights.map((insight, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="text-5xl font-poppins font-bold text-slate-100 block mb-6 leading-none">0{idx + 1}</span>
                  <p className="font-montserrat text-sm font-medium text-brand-blue leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <ImageBlock image={project.image4} />

        {/* OUTPUT */}
        <section id="output" className="scroll-fade pt-12 pb-8">
          <h3 className="font-poppins text-4xl font-bold text-brand-blue mb-6">Output</h3>
          <p className="font-montserrat text-lg font-light text-slate-600 leading-relaxed mb-10">{project.output}</p>
          <div className="flex flex-wrap gap-3">
            {project.outputBullets.map((bullet, idx) => (
              <span key={idx} className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-mono font-medium text-slate-700 hover:border-brand-accent-blue hover:text-brand-accent-blue hover:shadow-[0_5px_15px_rgba(124,58,237,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-none">
                {bullet}
              </span>
            ))}
          </div>
        </section>

        <ImageBlock image={project.image5} />

        {/* OUTCOME */}
        {project.outcome && (
          <section id="outcome" className="scroll-fade pt-12 pb-8">
            <h3 className="font-poppins text-4xl font-bold text-brand-blue mb-6">Outcome</h3>
            <p className="font-montserrat text-lg font-light text-slate-600 leading-relaxed mb-10">{project.outcome}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.outcomeBullets.map((bullet, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-8 h-1 bg-brand-accent-blue rounded-full"></span>
                  <p className="font-montserrat text-sm text-slate-700 font-medium leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <ImageBlock image={project.image6} />

        {/* CHALLENGES */}
        {project.challenges && (
          <section id="challenges" className="scroll-fade pt-12 pb-8">
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl">
              <h3 className="font-poppins text-3xl font-bold text-brand-blue mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-brand-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Challenges
              </h3>
              <p className="font-montserrat text-lg font-light text-slate-700 leading-relaxed">{project.challenges}</p>
            </div>
          </section>
        )}
        
        <ImageBlock image={project.image7} />

        {/* REFLECTIONS */}
        {project.reflections && project.reflectionCards && (
          <section className="scroll-fade bg-brand-blue text-white p-10 md:p-16 rounded-[2.5rem] mt-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent-blue rounded-full blur-[100px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
            
            <h3 className="font-poppins text-4xl font-bold text-white mb-6 relative z-10">Reflections</h3>
            <p className="font-montserrat text-lg font-light text-slate-300 leading-relaxed mb-12 max-w-2xl relative z-10">{project.reflections}</p>
            
            <div className={`grid ${reflectionGridClass} gap-6 relative z-10`}>
              {project.reflectionCards.map((card, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/10 transition-colors">
                  <span className="text-xs font-mono text-brand-accent-blue block mb-4 font-bold uppercase tracking-widest">Takeaway 0{idx + 1}</span>
                  <p className="font-montserrat text-sm font-medium text-slate-100 leading-relaxed">{card}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default CaseStudy;