const projects = [
  {
    id: "abitua", no: "01", title: "ABITUA", category: "Brand Identity / Fashion",
    services: "标志字体设计 · 图案设计 · 包装设计 · 吊牌设计",
    description: "小众高端女装品牌。项目从 Habitude（习惯）与 Attitude（态度）的结合出发，以衬线结构、针线意象与菱形偏移建立可持续生长的视觉系统。",
    images: ["abitua-cover.jpg", "abitua-logo.jpg", "abitua-pattern.jpg", "abitua-tag.jpg"],
    captions: ["Brand Design", "Logotype", "Graphic System", "Brand Application"]
  },
  {
    id: "cremaish", no: "02", title: "CREMAISH", category: "Digital Visual System / Fashion",
    services: "电商设计 · 排版系统",
    description: "面向都市女性的品质女装品牌。通过网格排版优化信息层级，统一文字与色彩规范，建立适用于首页、主图和详情页的线上视觉系统。",
    images: ["cremaish-cover.jpg", "cremaish-home.jpg", "cremaish-main.jpg", "cremaish-detail.jpg"],
    captions: ["Visual Design", "Homepage Layout", "Product Layout", "Detail Layout"]
  },
  {
    id: "daartemis", no: "03", title: "DAARTEMIS 达弥", category: "Art Direction / Jewelry",
    services: "包装优化 · 宣传册 · 展览物料 · 节气海报 · 电商设计",
    description: "雕塑艺术时尚首饰品牌。围绕“艺术、珍贵、时尚、独特”的定位，以简约静奢为基调，完成电商、展览和节日营销等多场景视觉输出。",
    images: ["daartemis-ss24.jpg", "daartemis-ss25.jpg", "daartemis-poster.jpg", "daartemis-home.jpg"],
    captions: ["SS2024 Exhibition", "SS2025 Exhibition", "Campaign Poster", "E-commerce System"]
  }
];

export default function Home() {
  return <main id="top">
    <header className="site-header">
      <a className="identity" href="#top"><b>SHIJUN PENG</b><span>Visual / Brand / AI Designer</span></a>
      <nav aria-label="Primary navigation"><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a></nav>
      <div className="place">CHINA ↔ WORLDWIDE<br/><span>AVAILABLE 2026</span></div>
    </header>

    <section className="intro" aria-labelledby="intro-title">
      <h1 id="intro-title">Independent visual designer shaping identities, visual systems and digital experiences.</h1>
      <p>彭世俊，10+ 年视觉设计经验。<br/>专注品牌、时尚、电商与 AIGC 创意实践。</p>
    </section>

    <section className="projects" id="work">
      {projects.map((project) => <article className="project" id={project.id} key={project.id}>
        <div className="project-head">
          <span className="project-no">{project.no}</span>
          <div><h2>{project.title}</h2><p>{project.category}</p></div>
          <p className="project-description">{project.description}</p>
          <div className="project-services"><span>SERVICES</span><p>{project.services}</p></div>
        </div>
        <div className="project-grid">
          {project.images.map((image, index) => <figure key={image} className={`project-image image-${index + 1}`}>
            <img src={`/projects/${image}`} alt={`${project.title} - ${project.captions[index]}`} loading="lazy"/>
            <figcaption><span>{project.captions[index]}</span><span>{project.no}.{index + 1}</span></figcaption>
          </figure>)}
        </div>
      </article>)}
    </section>

    <section className="about" id="about">
      <div className="section-label">ABOUT / 关于</div>
      <div className="about-main"><h2>Design is a way<br/>to make ideas <em>visible.</em></h2><div className="about-text">
        <p>我是彭世俊，一名视觉设计师、品牌设计师与 AI 设计师。拥有十年以上行业经验，擅长构图、排版与策划，以系统化方法建立清晰且有记忆点的品牌表达。</p>
        <p>经历涵盖品牌视觉、电商设计、产品 UI 与线下展览。如今，我将 AIGC 融入日常创意工作流，在策略、审美与新技术之间寻找新的可能。</p>
      </div></div>
      <div className="facts"><div><span>EXPERIENCE</span><b>10+ YEARS</b></div><div><span>FOCUS</span><b>BRAND / DIGITAL / AI</b></div><div><span>EDUCATION</span><b>CHANGSHA UNIVERSITY</b></div><div><span>STATUS</span><b>OPEN FOR PROJECTS</b></div></div>
    </section>

    <footer id="contact"><div className="section-label">CONTACT / 联系</div><h2>LET&apos;S MAKE<br/>SOMETHING <em>GOOD.</em></h2>
      <a className="email" href="mailto:xxa8@163.com">XXA8@163.COM ↗</a>
      <div className="contact-details"><span>CALL<br/><b>137 1713 1226</b></span><span>WECHAT<br/><b>87080780</b></span></div>
      <div className="footer-meta"><span>© SHIJUN PENG 2026</span><span>VISUAL / BRAND / AI DESIGNER</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  </main>;
}
