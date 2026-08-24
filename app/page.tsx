import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  previews: string[];
  start: number;
  end: number;
  detailImages?: string[];
  description: string;
  services: string;
};

const projects: Project[] = [
  {
    id: "abitua",
    title: "ABITUA",
    category: "BRAND IDENTITY",
    year: "2026",
    cover: "/covers/abitua.png",
    previews: ["/covers/abitua.png"],
    start: 3,
    end: 10,
    description: "小众高端女装品牌视觉识别。以 Habitude 与 Attitude 为概念原点，用衬线结构、针线意象与菱形偏移，构建克制且可延展的品牌系统。",
    services: "LOGOTYPE / GRAPHIC SYSTEM / PACKAGING / APPLICATION",
  },
  {
    id: "habc",
    title: "HABC",
    category: "BRAND VISUAL SYSTEM",
    year: "2026",
    cover: "/covers/habc.png?v=2",
    previews: ["/covers/habc.png?v=2"],
    start: 0,
    end: 0,
    detailImages: ["/portfolio/habc/02.png", "/portfolio/habc/03.png", "/portfolio/habc/04.png", "/portfolio/habc/05.png", "/portfolio/habc/06.png", "/portfolio/habc/07.png", "/portfolio/habc/43.png"],
    description: "HABC 品牌视觉与辅料系统，通过字体、色彩、图形语言与包装应用建立统一、清晰且可持续延展的品牌规范。",
    services: "LOGOTYPE / VISUAL SYSTEM / PACKAGING",
  },
  {
    id: "daartemis",
    title: "DAARTEMIS",
    category: "ART DIRECTION",
    year: "2023-2025",
    cover: "/covers/daartemis.png?v=2",
    previews: ["/covers/daartemis.png?v=2"],
    start: 18,
    end: 34,
    description: "雕塑艺术首饰品牌视觉方向。围绕艺术、珍贵、时尚与独特的品牌定位，完成展览、海报、电商及节日传播等多场景设计。",
    services: "CAMPAIGN / EXHIBITION / POSTER / DIGITAL DESIGN",
  },
  {
    id: "cremaish",
    title: "CREMAISH",
    category: "DIGITAL VISUAL SYSTEM",
    year: "2025",
    cover: "/covers/cremaish.png",
    previews: ["/covers/cremaish.png"],
    start: 11,
    end: 17,
    description: "面向都市女性的品质女装电商视觉系统。通过网格、图像节奏和信息层级，统一首页、主图与详情页的品牌表达。",
    services: "ART DIRECTION / E-COMMERCE / LAYOUT SYSTEM",
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

function TopBar({ project, detail = false }: { project?: Project; detail?: boolean }) {
  return (
    <header className={`topbar ${detail ? "topbar--detail" : ""}`}>
      <a href="#top" className="studio">Shijun Peng</a>
      <span>{detail ? "SELECTED WORK" : project?.category}</span>
      <span>{project?.title ?? "VISUAL DESIGNER"}</span>
      {detail ? <a href="#top">CLOSE</a> : <span>{project?.year}</span>}
    </header>
  );
}

function InfoPage() {
  return (
    <main id="info" className="info-page">
      <section className="profile">
        <nav className="profile-nav" aria-label="Info navigation">
          <a href="#top">Shijun Peng</a>
          <a href="#info">Info</a>
        </nav>
        <div className="profile-copy">
          <p>10+ years of experience in visual design<br/>Skilled in composition, layout, and conceptualization<br/>Proficient in AIGC creation with a strong aesthetic sense</p>
          <p>10+视觉设计工作经验<br/>擅长构图和排版及策划<br/>具备AIGC创作能力和良好的审美</p>
          <p className="info-contact"><a href="mailto:xxa8@163.com">EMAIL: xxa8@163.com</a><br/>WECHAT: 87080780<br/>CALL: 1371731226<img className="info-portrait" src="/images/3333.jpg" alt="Shijun Peng portrait" /></p>
        </div>
      </section>
    </main>
  );
}

function Home() {
  return (
    <main id="top" className="home">
      <section className="works-index" id="works">
        <nav className="works-nav" aria-label="Works navigation">
          <a href="#top">Shijun Peng</a>
          <a href="#info">Info</a>
        </nav>
        <div className="works-list">
          {projects.map((project) => (
            <article className="work-card" id={`slide-${project.id}`} key={project.id}>
              <div className="project-carousel" tabIndex={0} aria-label={`Swipe through ${project.title} covers`}>
                {project.previews.map((preview, index) => (
                  <a className="work-cover" href={`#project/${project.id}`} aria-label={`View ${project.title} project, cover ${index + 1}`} key={preview}>
                    <img src={preview} alt={`${project.title} project cover ${index + 1}`} />
                  </a>
                ))}
              </div>
              <a className="work-meta" href={`#project/${project.id}`}>
                <b>{project.title}</b>
                <span>{project.year}</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectProfile({ position }: { position: "top" | "bottom" }) {
  return (
    <section className={`project-profile project-profile--${position}`}>
      <nav className="project-profile-nav" aria-label={`${position} project navigation`}>
        <a href="#top">Shijun Peng</a>
        <a href="#info">Info</a>
      </nav>
    </section>
  );
}

function ProjectPage({ project }: { project: Project }) {
  const images = useMemo(
    () => project.detailImages ?? Array.from({ length: project.end - project.start - 1 }, (_, index) => imagePath(project, project.start + index + 2)),
    [project],
  );
  const detail = projectDetails[project.id];

  return (
    <main id="top" className="project-page project-longform" aria-label={`${project.title} complete project`}>
      <ProjectProfile position="top" />
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
      {images.map((src, index) => (
        <img
          className="project-longform-image"
          src={src}
          alt={`${project.title} portfolio page ${index + 1}`}
          key={src}
        />
      ))}
    </main>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      const distanceToBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setIsVisible(distanceToBottom <= 24 && document.documentElement.scrollHeight > window.innerHeight);
    };
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    checkPosition();
    return () => {
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
      TOP
    </button>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash);
      requestAnimationFrame(() => {
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
  return <>{page}<BackToTopButton /></>;
}
