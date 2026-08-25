import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Analytics } from "@vercel/analytics/react";
import MagicRings from "./MagicRings";

type Project = {
  id: string;
  title: string;
  year: string;
  cover: string;
  coverType?: "image" | "video";
  start: number;
  end: number;
  firstDetail?: string;
  detailImages?: string[];
};

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

const projects: Project[] = [
  {
    id: "abitua",
    title: "Abitua",
    year: "2026",
    cover: "/portfolio/abitua/process.mov",
    coverType: "video",
    start: 3,
    end: 10,
    firstDetail: "/portfolio/abitua/first.png",
  },
  {
    id: "cremaish",
    title: "Cremaish",
    year: "2026",
    cover: "/portfolio/cremaish/video/03.mov",
    coverType: "video",
    start: 11,
    end: 17,
    firstDetail: "/portfolio/cremaish/first.png",
  },
  {
    id: "habc",
    title: "Habc",
    year: "2026",
    cover: "/covers/habc.png?v=2",
    start: 0,
    end: 0,
    detailImages: ["/portfolio/habc/first.png", "/portfolio/habc/02.png", "/portfolio/habc/03.png", "/portfolio/habc/04.png", "/portfolio/habc/05.png", "/portfolio/habc/06.png", "/portfolio/habc/43.png"],
  },
  {
    id: "daartemis",
    title: "Daartemis",
    year: "2023-2025",
    cover: "/covers/daartemis.png?v=2",
    start: 18,
    end: 34,
    firstDetail: "/portfolio/daartemis/first.png",
  },
];

const imagePath = (project: Project, page: number) =>
  `/portfolio/${project.id}/${String(page).padStart(2, "0")}.jpg`;

const projectDetails: Record<string, { services: string[]; paragraphs: string[] }> = {
  abitua: {
    services: ["标志设计", "图案设计", "包装设计", "吊牌设计"],
    paragraphs: [
      "abitua 是一个独立不久的小众高端女装品牌。品牌以对当下现实的观察为出发点，将个体的感受与立场转译为服装语言。",
      "在标志与视觉系统中，以衬线结构、针线意象和菱形偏移建立兼具态度、精致感与延展性的品牌识别。",
    ],
  },
  cremaish: {
    services: ["电商设计", "排版系统"],
    paragraphs: [
      "cremaish 为都市女性呈现品质、简约与工艺美感的女装设计，展现摩登风格。专注于打造可灵活应对正式与休闲场合的服饰与配饰，将独立设计与精致工艺融入每一件产品。",
      "我通过网格排版优化信息层级，为其优化制定视觉规范，统一文字、色彩，确保品牌线上视觉的统一性与专业性。",
    ],
  },
  daartemis: {
    services: ["视觉方向", "包装优化", "展览物料", "电商设计"],
    paragraphs: [
      "DAARTEMIS 是一个以雕塑艺术为灵感的首饰品牌，围绕艺术、珍贵、时尚与独特建立品牌视觉方向。",
      "通过包装、展览、海报与数字内容的系统化设计，让品牌在不同传播场景中保持清晰、一致且富有艺术感的视觉表达。",
    ],
  },
  habc: {
    services: ["品牌字体", "色彩系统", "图形设计", "包装设计"],
    paragraphs: [
      "HABC 品牌视觉与辅料系统以简洁、轻盈和功能性为基础，建立适用于服装及配饰场景的统一品牌语言。",
      "通过专属字体、色彩、图形符号与包装应用规范，使品牌在不同物料中保持一致、清晰且易于延展的视觉表达。",
    ],
  },
};

let preservedScrollPosition: { x: number; y: number } | null = null;

function navigateWithoutScroll(event: MouseEvent<HTMLAnchorElement>, hash: string) {
  event.preventDefault();
  preservedScrollPosition = { x: window.scrollX, y: window.scrollY };
  window.history.pushState(null, "", hash);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function SiteNav({ label }: { label: string }) {
  return (
    <nav className="site-nav" aria-label={label}>
      <a href="#top" onClick={(event) => navigateWithoutScroll(event, "#top")}>Shijun Peng</a>
      <a href="#info" onClick={(event) => navigateWithoutScroll(event, "#info")}>Info</a>
    </nav>
  );
}

function ViewportVideo({ src, className, label }: { src: string; className?: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let sourceLoaded = false;

    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !sourceLoaded) {
        video.src = src;
        sourceLoaded = true;
        loadObserver.disconnect();
      }
    }, { rootMargin: "400px 0px" });

    const playbackObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!sourceLoaded) {
          video.src = src;
          sourceLoaded = true;
        }
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, { threshold: 0.01 });

    loadObserver.observe(video);
    playbackObserver.observe(video);
    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return <video ref={videoRef} className={className} muted loop playsInline preload="none" aria-label={label} />;
}

function InfoPage() {
  return (
    <main id="info" className="info-page">
      <section className="profile">
        <SiteNav label="Info navigation" />
        <div className="profile-copy">
          <p className="profile-intro">
            <span>Boasting over 10 years of practical experience within visual design,</span>
            <span>I excel at visual composition, layout design and project planning.</span>
            <span>I am well‑versed in AIGC‑driven creative workflows, and hold strong</span>
            <span>aesthetic acumen to produce comprehensive, high‑grade visual deliverables independently.</span>
          </p>
          <div className="info-contact"><div className="info-locations"><p>(GZ)<br/>guangzhou panyu</p><p>(CS)<br/>changsha lugu</p></div><img className="info-portrait" src="/images/3333.jpg" alt="Shijun Peng portrait" /><p>VX 87080780<br/><a href="mailto:xxa8@163.com">EMAIL&nbsp;&nbsp;xxa8@163.com</a></p></div>
        </div>
      </section>
    </main>
  );
}

function Home() {
  return (
    <main id="top" className="home">
      <section className="works-index" id="works">
        <SiteNav label="Works navigation" />
        <div className="works-list">
          {projects.map((project, index) => (
            <article className="work-card" id={`slide-${project.id}`} key={project.id}>
              <a className="work-cover" href={`#project/${project.id}`} aria-label={`View ${project.title} project`}>
                {project.coverType === "video" ? (
                  <ViewportVideo src={project.cover} label={`${project.title} project cover`} />
                ) : (
                  <img
                    src={project.cover}
                    alt={`${project.title} project cover`}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                )}
              </a>
              <a className="work-meta" href={`#project/${project.id}`}>
                <b>{project.title.toLowerCase()}&nbsp;&nbsp;I&nbsp;&nbsp;{project.year}</b>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectNav() {
  return (
    <header className="project-nav"><SiteNav label="Project navigation" /></header>
  );
}

function ProjectPage({ project }: { project: Project }) {
  const images = useMemo(() => {
    if (project.detailImages) return project.detailImages;
    const projectImages = Array.from({ length: project.end - project.start }, (_, index) => imagePath(project, project.start + index + 1));
    if (project.firstDetail) projectImages[0] = project.firstDetail;
    return projectImages;
  }, [project]);
  const detail = projectDetails[project.id];
  const media = useMemo<ProjectMedia[]>(() => {
    const projectImages = images.map((src, index) => ({
      type: "image" as const,
      src,
      alt: `${project.title} portfolio page ${index + 1}`,
    }));

    if (project.id === "abitua") {
      return [
        { type: "video", src: "/portfolio/abitua/process.mov", alt: "Abitua design process video" },
        { type: "image", src: "/portfolio/abitua/process-01.jpg", alt: "Abitua design process and material samples" },
        { type: "image", src: "/portfolio/abitua/process-02.jpg", alt: "Abitua logotype construction process" },
        ...projectImages.slice(1),
        projectImages[0],
      ];
    }

    if (project.id === "cremaish") {
      return [
        projectImages[0],
        { type: "video", src: "/portfolio/cremaish/video/01.mov", alt: "Cremaish fashion video 1" },
        { type: "video", src: "/portfolio/cremaish/video/02.mov", alt: "Cremaish fashion video 2" },
        { type: "video", src: "/portfolio/cremaish/video/03.mov", alt: "Cremaish fashion video 3" },
        ...projectImages.slice(1),
      ];
    }

    return projectImages;
  }, [images, project.id, project.title]);

  return (
    <main id="top" className="project-page project-longform" aria-label={`${project.title} complete project`}>
      <ProjectNav />
      <section className="project-details" aria-label={`${project.title} information`}>
        <dl className="project-details-meta">
          <div><dt>Client</dt><dd>{project.title.toLowerCase()}</dd></div>
          <div><dt>Service</dt><dd>{detail.services.map((service) => <span key={service}>{service}</span>)}</dd></div>
          <div><dt>Partner</dt><dd>彭世俊</dd></div>
        </dl>
        <div className="project-details-copy">
          {detail.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      {media.map((item, index) => item.type === "video" ? (
        <ViewportVideo className="project-longform-image" src={item.src} label={item.alt} key={item.src} />
      ) : (
        <img
          className={`project-longform-image${item.src === "/portfolio/habc/first.png" ? " habc-lead-image" : ""}`}
          src={item.src}
          alt={item.alt}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          key={item.src}
        />
      ))}
    </main>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    const checkPosition = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        const pageHeight = document.documentElement.scrollHeight;
        const distanceToBottom = pageHeight - window.innerHeight - window.scrollY;
        const nextIsVisible = distanceToBottom <= 24 && pageHeight > window.innerHeight;
        setIsVisible((current) => current === nextIsVisible ? current : nextIsVisible);
        animationFrame = 0;
      });
    };
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    checkPosition();
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="返回到页面顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="back-to-top-icon" aria-hidden="true" />
    </button>
  );
}

function ContactMarquee() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("has-contact-marquee", isOpen);
    return () => document.body.classList.remove("has-contact-marquee");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="contact-marquee" aria-label="微信联系方式 VX 87080780">
      <div className="contact-marquee-track">
        <div className="contact-marquee-group">
          <span>VX 87080780</span><span>VX 87080780</span><span>VX 87080780</span><span>VX 87080780</span>
        </div>
        <div className="contact-marquee-group" aria-hidden="true">
          <span>VX 87080780</span><span>VX 87080780</span><span>VX 87080780</span><span>VX 87080780</span>
        </div>
      </div>
      <button className="contact-marquee-close" type="button" aria-label="关闭跑马灯" onClick={() => setIsOpen(false)}>×</button>
    </div>
  );
}

function OpeningSplash({ onComplete }: { onComplete: () => void }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const beginExit = useCallback(() => setIsLeaving(true), []);

  useEffect(() => {
    document.body.classList.add("splash-open");
    const autoEnterTimer = window.setTimeout(beginExit, 9500);
    return () => {
      window.clearTimeout(autoEnterTimer);
      document.body.classList.remove("splash-open");
    };
  }, [beginExit]);

  useEffect(() => {
    if (!isLeaving) return;
    const exitTimer = window.setTimeout(onComplete, 500);
    return () => window.clearTimeout(exitTimer);
  }, [isLeaving, onComplete]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      beginExit();
    }
  };

  return (
    <div
      className={`opening-splash${isLeaving ? " is-leaving" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="进入 Shijun Peng 作品集首页"
      onClick={beginExit}
      onKeyDown={onKeyDown}
    >
      <div className="opening-splash-rings"><MagicRings speed={1.1} ringCount={7} /></div>
      <span className="opening-splash-name">Junshi Peng</span>
    </div>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash);
      requestAnimationFrame(() => {
        if (preservedScrollPosition) {
          window.scrollTo(preservedScrollPosition.x, preservedScrollPosition.y);
          preservedScrollPosition = null;
          return;
        }
        if (window.location.hash.startsWith("#project/")) {
          window.scrollTo({ top: 0, behavior: "instant" });
        } else {
          document.querySelector(window.location.hash || "#top")?.scrollIntoView();
        }
      });
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const projectId = hash.startsWith("#project/") ? hash.slice(9) : "";
  const project = projects.find((item) => item.id === projectId);
  const page = project ? <ProjectPage project={project} /> : hash === "#info" ? <InfoPage /> : <Home />;
  const footer = <footer className="site-footer"><p className="site-footer-copyright">© All rights Reserved by Shijun Peng work</p></footer>;
  const enterHome = useCallback(() => {
    window.history.replaceState(null, "", "#top");
    setHash("#top");
    window.scrollTo({ top: 0, behavior: "instant" });
    setShowSplash(false);
  }, []);

  return <>{showSplash && <OpeningSplash onComplete={enterHome} />}<ContactMarquee />{page}{footer}<BackToTopButton /><Analytics route={hash || "#top"} path={`${window.location.pathname}${hash || "#top"}`} /></>;
}
