import { useState, useEffect, useRef, useCallback } from "react";

const languages = [
  { name: "Python", color: "#3572A5", level: 92 },
  { name: "C", color: "#555555", level: 88 },
  { name: "C#", color: "#68217A", level: 90 },
  { name: "C++", color: "#f34b7d", level: 87 },
  { name: "HTML", color: "#e34c26", level: 93 },
  { name: "CSS", color: "#563d7c", level: 91 },
  { name: "JavaScript", color: "#f1e05a", level: 89 },
  { name: "SQL", color: "#e38c00", level: 88 },
];

const stacks = [
  { cat: "Frontend", items: ["HTML / CSS", "JavaScript", "Responsive Design", "UI/UX"], color: "#00d4ff" },
  { cat: "Backend", items: ["FastAPI", "Python", "REST API", "Jinja2"], color: "#a855f7" },
  { cat: "AI & ML", items: ["Claude API", "LangChain", "Prompt Engineering", "RAG"], color: "#22c55e" },
  { cat: "Tools", items: ["VS Code", "Git", "Docker", "Cursor"], color: "#f97316" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>{}[]";

const txt = {
  it: {
    nav: [["Home", "hero"], ["About", "about"], ["Skills", "skills"], ["Contatti", "contact"]],
    hi: "// ciao, sono",
    tagline: "PROGETTO.\nCOSTRUISCO.\nDEPLOYO.",
    role: "Full-Stack Developer · AI Enthusiast",
    about: "Programmatore full-stack con la passione per l'intelligenza artificiale. Costruisco applicazioni web complete — dal frontend al backend — e integro soluzioni AI per creare prodotti che funzionano davvero.",
    s1: "Linguaggi",
    s2: "Stack",
    s3: "Contatti",
    cta: "Connettiti su LinkedIn",
    available: "Disponibile per collaborazioni",
  },
  en: {
    nav: [["Home", "hero"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]],
    hi: "// hi, i'm",
    tagline: "I DESIGN.\nI BUILD.\nI DEPLOY.",
    role: "Full-Stack Developer · AI Enthusiast",
    about: "Full-stack developer with a passion for artificial intelligence. I build complete web applications — from frontend to backend — and integrate AI solutions to create products that actually work.",
    s1: "Languages",
    s2: "Stack",
    s3: "Contact",
    cta: "Connect on LinkedIn",
    available: "Available for collaborations",
  },
};

function useInView(th = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

function MatrixRain() {
  const c = useRef(null);
  useEffect(() => {
    const cv = c.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, cols, drops;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const resize = () => {
      w = cv.width = cv.parentElement.offsetWidth;
      h = cv.height = cv.parentElement.offsetHeight;
      cols = Math.floor(w / 18);
      drops = Array(cols).fill(0).map(() => Math.random() * -100);
    };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,18,0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "14px 'JetBrains Mono', monospace";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18, y = drops[i] * 18;
        ctx.fillStyle = `rgba(0,212,255,${0.03 + Math.random() * 0.06})`;
        ctx.fillText(ch, x, y);
        if (y > h && Math.random() > 0.98) drops[i] = 0;
        drops[i] += 0.4 + Math.random() * 0.3;
      }
    };
    const iv = setInterval(draw, 55);
    return () => { clearInterval(iv); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={c} style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6, pointerEvents: "none" }} />;
}

function Scramble({ text, trigger, delay = 0, as: Tag = "span", style }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!trigger) return;
    let f = 0; const total = 30;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        f++; const p = f / total; let r = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " " || text[i] === "\n") { r += text[i]; continue; }
          r += p > (i / text.length) + 0.25 ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setOut(r);
        if (f >= total) { clearInterval(iv); setOut(text); }
      }, 30);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger, text, delay]);
  return <Tag style={style}>{out || "\u00A0"}</Tag>;
}

function LangBar({ lang, index, visible }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "grid", gridTemplateColumns: "100px 1fr 40px", alignItems: "center", gap: 20, padding: "14px 0",
      borderBottom: "1px solid rgba(255,255,255,0.03)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-30px)",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600,
        color: hover ? lang.color : "rgba(255,255,255,0.5)",
        textShadow: hover ? `0 0 20px ${lang.color}88` : "none", transition: "all 0.4s",
      }}>{lang.name}</span>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          width: visible ? `${lang.level}%` : "0%", borderRadius: 2,
          background: hover ? `linear-gradient(90deg,${lang.color},${lang.color}dd)` : `linear-gradient(90deg,${lang.color}66,${lang.color}33)`,
          boxShadow: hover ? `0 0 16px ${lang.color}44, 0 0 4px ${lang.color}` : "none",
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${index * 70 + 200}ms, background 0.4s, box-shadow 0.4s`,
        }} />
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textAlign: "right",
        color: hover ? lang.color : "rgba(255,255,255,0.2)", transition: "color 0.4s",
        textShadow: hover ? `0 0 12px ${lang.color}66` : "none",
      }}>{lang.level}%</span>
    </div>
  );
}

function StackBlock({ stack, index, visible }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: hover ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
      border: `1px solid ${hover ? stack.color + "33" : "rgba(255,255,255,0.04)"}`,
      borderRadius: 12, padding: "28px 24px",
      opacity: visible ? 1 : 0, transform: visible ? (hover ? "translateY(-4px)" : "none") : "translateY(40px)",
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      position: "relative", overflow: "hidden",
      boxShadow: hover ? `0 8px 30px ${stack.color}10` : "none",
    }}>
      <div style={{
        position: "absolute", top: 12, bottom: 12, left: 0, width: 2,
        background: stack.color, opacity: hover ? 0.8 : 0.2, transition: "opacity 0.4s",
        boxShadow: hover ? `0 0 8px ${stack.color}` : "none",
      }} />
      <h4 style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
        color: stack.color, marginBottom: 16, letterSpacing: "0.06em",
        textShadow: hover ? `0 0 12px ${stack.color}44` : "none", transition: "text-shadow 0.4s",
      }}>{`> ${stack.cat}`}</h4>
      {stack.items.map((item) => (
        <div key={item} style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: hover ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)",
          padding: "5px 0 5px 12px", borderLeft: `1px solid ${hover ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)"}`,
          transition: "all 0.3s",
        }}>
          <span style={{ color: stack.color, opacity: 0.5, marginRight: 8 }}>—</span>{item}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("it");
  const t = txt[lang];
  const [ready, setReady] = useState(false);
  const [aboutRef, aboutVis] = useInView(0.2);
  const [langRef, langVis] = useInView(0.1);
  const [stackRef, stackVis] = useInView(0.1);
  const [ctaRef, ctaVis] = useInView(0.2);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => { setTimeout(() => setReady(true), 250); }, []);

  useEffect(() => {
    const ids = ["hero", "about", "skills", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,212,255,0.3)}70%{box-shadow:0 0 0 10px rgba(0,212,255,0)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes lineGrow{from{width:0}to{width:60px}}
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#0a0a12}
        ::selection{background:#00d4ff33;color:#fff}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#00d4ff44;border-radius:9px}
      `}</style>

      <div style={{ background: "#0a0a12", color: "#fff", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 clamp(20px,4vw,48px)", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(10,10,18,0.8)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
        }}>
          <span onClick={() => scrollTo("hero")} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
            color: "#00d4ff", cursor: "pointer", letterSpacing: "0.04em",
          }}>umberto_</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {t.nav.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                padding: "7px 16px", borderRadius: 6, border: "none",
                background: activeSection === id ? "rgba(0,212,255,0.08)" : "transparent",
                color: activeSection === id ? "#00d4ff" : "rgba(255,255,255,0.3)",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500,
                cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { if (activeSection !== id) e.target.style.color = "rgba(255,255,255,0.6)"; }}
                onMouseLeave={(e) => { if (activeSection !== id) e.target.style.color = "rgba(255,255,255,0.3)"; }}
              >{label}</button>
            ))}
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.06)", margin: "0 8px" }} />
            <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: 2 }}>
              {["it", "en"].map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "5px 12px", borderRadius: 4, border: "none",
                  background: lang === l ? "rgba(0,212,255,0.12)" : "transparent",
                  color: lang === l ? "#00d4ff" : "rgba(255,255,255,0.2)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.3s", textTransform: "uppercase",
                }}>{l}</button>
              ))}
            </div>
          </div>
        </nav>

        <section id="hero" style={{
          height: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", position: "relative", overflow: "hidden",
          padding: "0 clamp(32px,8vw,140px)",
        }}>
          <MatrixRain />
          <div style={{
            position: "absolute", right: "-10%", top: "20%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.07), rgba(168,85,247,0.04), transparent 65%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
              color: "#00d4ff", opacity: 0.5, marginBottom: 20,
              animation: ready ? "fadeUp 0.8s ease both 0.2s" : "none", opacity: ready ? undefined : 0,
            }}>{t.hi}</p>
            <div style={{ animation: ready ? "fadeUp 1s ease both 0.4s" : "none", opacity: ready ? undefined : 0 }}>
              <h1 style={{
                fontSize: "clamp(48px,9vw,110px)", fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff",
              }}>Umberto</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
                <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #00d4ff, transparent)", animation: "lineGrow 1s ease both 1s" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>{t.role}</span>
              </div>
            </div>
            <div style={{
              marginTop: 40, fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px,5vw,56px)", fontWeight: 700, lineHeight: 1.1,
              animation: ready ? "fadeUp 1s ease both 0.7s" : "none", opacity: ready ? undefined : 0,
            }}>
              <Scramble text={t.tagline} trigger={ready} delay={900} as="div" style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "pre-line",
              }} />
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              marginTop: 36, padding: "8px 20px", borderRadius: 8,
              border: "1px solid rgba(0,212,255,0.12)", background: "rgba(0,212,255,0.03)",
              animation: ready ? "fadeUp 0.8s ease both 1.4s" : "none", opacity: ready ? undefined : 0,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{t.available}</span>
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            animation: ready ? "fadeUp 0.8s ease both 2s" : "none", opacity: ready ? undefined : 0,
          }}>
            <div style={{ width: 1, height: 48, background: "linear-gradient(transparent, rgba(0,212,255,0.2))" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00d4ff", opacity: 0.4 }} />
          </div>
        </section>

        <section id="about" ref={aboutRef} style={{ padding: "120px clamp(32px,8vw,140px) 80px" }}>
          <div style={{
            maxWidth: 640, opacity: aboutVis ? 1 : 0, transform: aboutVis ? "none" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#00d4ff", opacity: 0.5, marginBottom: 24, letterSpacing: "0.1em" }}>{"// about"}</div>
            <p style={{ fontSize: 20, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", fontFamily: "'Space Grotesk', sans-serif" }}>{t.about}</p>
          </div>
        </section>

        <section id="skills" ref={langRef} style={{ padding: "60px clamp(32px,8vw,140px) 80px" }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#00d4ff", letterSpacing: "0.1em", fontWeight: 600 }}>01</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.s1}</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
            </div>
            {languages.map((l, i) => <LangBar key={l.name} lang={l} index={i} visible={langVis} />)}
          </div>
        </section>

        <section ref={stackRef} style={{ padding: "40px clamp(32px,8vw,140px) 120px" }}>
          <div style={{ maxWidth: 900 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#a855f7", letterSpacing: "0.1em", fontWeight: 600 }}>02</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.s2}</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {stacks.map((s, i) => <StackBlock key={s.cat} stack={s} index={i} visible={stackVis} />)}
            </div>
          </div>
        </section>

        <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)", padding: "16px 0" }}>
          <div style={{ display: "flex", animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
            {Array(5).fill("PYTHON — C — C# — C++ — JAVASCRIPT — HTML — CSS — SQL — FASTAPI — GIT — ").map((s, i) => (
              <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", color: "rgba(255,255,255,0.06)" }}>{s}</span>
            ))}
          </div>
        </div>

        <section id="contact" ref={ctaRef} style={{ padding: "100px clamp(32px,8vw,140px) 60px" }}>
          <div style={{
            opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#22c55e", opacity: 0.5, marginBottom: 32, letterSpacing: "0.1em" }}>{"// contact"}</div>
            <a href="https://www.linkedin.com/in/umberto-pizzuti-2a7ab83aa" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              padding: "18px 40px", borderRadius: 8, textDecoration: "none",
              background: "transparent", border: "1px solid rgba(0,212,255,0.2)",
              color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14,
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", cursor: "pointer",
            }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, { background: "rgba(0,212,255,0.06)", borderColor: "#00d4ff", boxShadow: "0 0 40px rgba(0,212,255,0.12)", transform: "translateY(-2px)" })}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: "transparent", borderColor: "rgba(0,212,255,0.2)", boxShadow: "none", transform: "none" })}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {t.cta}<span style={{ opacity: 0.4 }}>→</span>
            </a>
          </div>
          <div style={{ marginTop: 80, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.03)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.08)" }}>© 2026 Umberto</div>
        </section>
      </div>
    </>
  );
}
