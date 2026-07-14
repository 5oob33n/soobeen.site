import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import AsciiBackground from './components/AsciiBackground';
import WaterDropHome from './components/WaterDropHome';
import {
  MENU_ITEMS,
  MENU_ITEMS_KO,
  PROJECTS,
  CERAMICS,
  BIO_TEXT,
  BIO_TEXT_KO,
  CV_LABELS,
  BIO_PROFILE,
  EDUCATION,
  EXHIBITIONS,
  AWARDS,
  EXPERIENCES,
  WORK,
  CONTRIBUTIONS,
  EDUCATION_KO,
  EXHIBITIONS_KO,
  AWARDS_KO,
  EXPERIENCES_KO,
  WORK_KO,
  CONTRIBUTIONS_KO,
  CONTACT_INFO
} from './constants';

import { CVItem, Project } from './types';

type Lang = 'en' | 'ko';

// Inline component for Ceramic Grid Items with Slideshow
const CeramicGridItem: React.FC<{ item: Project; lang: Lang }> = ({ item, lang }) => {
  const [idx, setIdx] = useState(0);
  
  // Combine main image and gallery images, removing duplicates
  const images = React.useMemo(() => {
    const list = [item.imageUrl];
    if (item.galleryUrls) {
      list.push(...item.galleryUrls);
    }
    // Filter out empty strings and remove duplicates
    return Array.from(new Set(list.filter(Boolean)));
  }, [item.imageUrl, item.galleryUrls]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group relative">
      <div className="aspect-square bg-gray-50 overflow-hidden mb-4 relative select-none">
        <img 
          src={images[idx]} 
          alt={`${item.title} view ${idx + 1}`} 
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 transition-all duration-500" 
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-0 h-full px-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/10 z-10"
              aria-label="Previous image"
            >
              <span className="text-3xl text-white drop-shadow-md font-thin">‹</span>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-0 h-full px-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/10 z-10"
              aria-label="Next image"
            >
              <span className="text-3xl text-white drop-shadow-md font-thin">›</span>
            </button>
            <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {images.map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-1 h-1 rounded-full ${i === idx ? 'bg-white' : 'bg-white/40'}`}
                 />
               ))}
            </div>
          </>
        )}
      </div>

      <h3 className={`font-heading font-medium text-sm uppercase group-hover:italic transition-all ${lang === 'ko' && item.titleKo ? 'font-ko' : ''}`}>
        {lang === 'ko' && item.titleKo ? item.titleKo : item.title}
      </h3>
      <p className="font-mono text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{item.category}</p>
      {item.description && (
        <p className={`text-xs font-light text-gray-400 mt-2 line-clamp-2 leading-relaxed ${lang === 'ko' && item.descriptionKo ? 'font-ko' : 'font-sans'}`}>
          {lang === 'ko' && item.descriptionKo ? item.descriptionKo : item.description}
        </p>
      )}
    </div>
  );
};

// Main App wrapper with Router
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

// Helper to get current view from pathname
const getViewFromPath = (pathname: string): string => {
  const path = pathname.split('/')[1] || 'home';
  return path;
};

// Helper to create URL-friendly slug from title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '');         // Remove leading/trailing hyphens
};

// Helper to find project by slug
const findProjectBySlug = (slug: string): Project | undefined => {
  return PROJECTS.find(p => createSlug(p.title) === slug);
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  // Slider indices for projects
  const [currentProjectSlideIndex, setCurrentProjectSlideIndex] = useState(0);

  const labels = CV_LABELS[lang];
  const menuItems = lang === 'ko' ? MENU_ITEMS_KO : MENU_ITEMS;
  const bioText = lang === 'ko' ? BIO_TEXT_KO : BIO_TEXT;

  // Determine current view from URL
  const currentView = getViewFromPath(location.pathname);

  // Check if we're on a detail page
  const isProjectDetail = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';
  const selectedProjectSlug = isProjectDetail ? decodeURIComponent(location.pathname.split('/')[2]) : null;

  // Old bookmarks to /writings → home
  useEffect(() => {
    if (location.pathname === '/writings' || location.pathname.startsWith('/writings/')) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Reset project slider when project changes
  useEffect(() => {
    if (selectedProjectSlug) {
      setCurrentProjectSlideIndex(0);
    }
  }, [selectedProjectSlug]);

  // Navigation with transition
  const navigateTo = (view: string) => {
    const targetPath = view === 'home' ? '/' : `/${view}`;
    if (location.pathname === targetPath) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(targetPath);
      setIsTransitioning(false);
    }, 100);
  };

  // Project list → detail (use slug from title)
  const handleProjectClick = (project: Project) => {
    const slug = createSlug(project.title);
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(`/projects/${slug}`);
      setIsTransitioning(false);
    }, 100);
  };

  // Project data & images (find by slug)
  const selectedProjectData = selectedProjectSlug ? findProjectBySlug(selectedProjectSlug) : null;
  
  // Build project image array for slider
  const projectImages = selectedProjectData
    ? (() => {
        const main = selectedProjectData.imageUrl;
        const gallery = selectedProjectData.galleryUrls ?? [];
        if (gallery.length === 0) return main ? [main] : [];
        const seen = new Set<string>();
        const ordered: string[] = [];
        for (const url of [main, ...gallery]) {
          if (url && !seen.has(url)) {
            seen.add(url);
            ordered.push(url);
          }
        }
        return ordered;
      })()
    : [];

  const handleNextProjectSlide = () => {
    if (projectImages.length === 0) return;
    setCurrentProjectSlideIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrevProjectSlide = () => {
    if (projectImages.length === 0) return;
    setCurrentProjectSlideIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };
  
  // Check if on home
  const isHome = location.pathname === '/';

  // Helper to determine if video is local file or external embed
  const isLocalVideo = (url: string) => {
    // Very simple heuristic: local media usually ends with file extension
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
  };

  // Helper to convert generic video URL to embeddable URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // If the URL is already an embed URL, return it as-is
    if (url.includes('player.vimeo.com/video') || url.includes('youtube.com/embed')) {
      return url;
    }
    
    // Vimeo standard URL: https://vimeo.com/123456789
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`;
    }

    // YouTube standard URL: supports multiple formats
    const youtubeMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/
    );
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Fallback: return original URL
    return url;
  };

  // Render helper for CV-like sections
  const renderCVSection = (title: string, items: CVItem[]) => (
    <div className="mb-12">
      <h3 className="font-heading font-bold text-sm uppercase mb-6 tracking-wide border-b border-black/10 pb-2">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 group">
            <div className="md:col-span-2 font-mono text-xs text-gray-500 pt-1">
              {item.year}
            </div>
            <div className="md:col-span-10">
              <p className="font-medium text-sm text-black group-hover:bg-black group-hover:text-white inline-block transition-colors px-1 -ml-1">
                {item.title}
                {item.degree && ` — ${item.degree}`}
                {item.position && ` — ${item.position}`}
              </p>
              <div className="font-light text-sm text-gray-600 mt-1">
                {[
                  item.school,
                  item.company,
                  item.description,
                  item.location
                ].filter(Boolean).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen font-sans text-black selection:bg-black selection:text-white">

      {/* Noise overlay — content pages only */}
      {!isHome && <div className="noise" />}

      {/* ASCII field: inner pages only */}
      {!isHome && (
        <div className="fixed inset-0 z-0">
          <AsciiBackground intensity={0.38} interactive={false} />
        </div>
      )}

      {/* ── HOME ─────────────────────────────────────────── */}
      {isHome && (
        <>
          <WaterDropHome />
          <div className={`relative z-10 w-full h-screen transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

            {/* Left column: name (top) → nav + copyright (bottom) */}
            <div className="flex flex-col justify-between h-full p-10 md:p-14 w-fit">

              <button onClick={() => navigateTo('home')} className="text-left group">
                <h1 className="font-heading font-semibold text-sm tracking-[0.18em] uppercase text-black group-hover:opacity-50 transition-opacity">
                  Soobeen Woo
                </h1>
              </button>

              <div>
                <nav>
                  <ul className="flex flex-col gap-3">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => navigateTo(item.id)}
                          className={`text-[11px] tracking-[0.18em] uppercase text-black hover:opacity-40 transition-opacity ${lang === 'ko' ? 'font-ko tracking-wider' : ''}`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                <p className="font-mono text-[9px] text-black/25 uppercase tracking-wider mt-5">
                  &copy; {new Date().getFullYear()} Soobeen Woo
                </p>
              </div>
            </div>

            {/* Language toggle — top right */}
            <button
              onClick={() => setLang(l => l === 'en' ? 'ko' : 'en')}
              className="absolute top-10 right-10 md:top-14 md:right-14 flex items-center gap-2 text-[11px] tracking-widest uppercase text-black/40 hover:text-black transition-colors"
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'text-black font-semibold' : ''}>EN</span>
              <span className="text-black/20">·</span>
              <span className={lang === 'ko' ? 'text-black font-semibold font-ko' : ''}>KR</span>
            </button>
          </div>
        </>
      )}

      {/* CONTENT VIEW LAYOUT */}
      {!isHome && (
        <div className={`relative z-10 min-h-screen transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Navigation Header for Content Pages */}
          <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-start p-8 md:p-12 pointer-events-none">
            {/* Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="pointer-events-auto text-left hover:opacity-40 transition-opacity"
            >
              <span className="font-heading font-semibold text-sm tracking-[0.18em] uppercase">Soobeen Woo</span>
            </button>

            {/* Right side: lang toggle + menu */}
            <div className="pointer-events-auto flex flex-col items-end gap-2">
              {/* Lang toggle */}
              <button
                onClick={() => setLang(l => l === 'en' ? 'ko' : 'en')}
                className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black/35 hover:text-black transition-colors mb-2"
              >
                <span className={lang === 'en' ? 'text-black font-semibold' : ''}>EN</span>
                <span className="text-black/20">·</span>
                <span className={lang === 'ko' ? 'text-black font-semibold font-ko' : ''}>KR</span>
              </button>
              {/* Nav items */}
              <button onClick={() => navigateTo('home')} className="text-[11px] tracking-widest uppercase text-black/40 hover:text-black transition-colors mb-2">
                {lang === 'ko' ? '닫기' : 'Close'}
              </button>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-[11px] tracking-widest uppercase transition-opacity text-right ${lang === 'ko' ? 'font-ko' : ''} ${currentView === item.id && !selectedProjectSlug ? 'text-black font-semibold opacity-100' : 'text-black/35 hover:text-black hover:opacity-100'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content Container - White/90 background */}
          <main className="w-full min-h-screen bg-white/90 backdrop-blur-sm pt-32 pb-24 px-8 md:px-24 lg:px-48">
            
            {/* Header — only for list/section views */}
            {!selectedProjectSlug && (
              <header className="mb-16">
                <h2 className={`text-4xl md:text-5xl font-heading font-light uppercase tracking-tight ${lang === 'ko' ? 'font-ko' : ''}`}>
                  {labels.viewTitle[currentView] ?? currentView}
                </h2>
              </header>
            )}

            <div className="fade-in-content">
              {/* PROJECTS */}
              {(currentView === 'projects' || isProjectDetail) && (
                <>
                  {!selectedProjectSlug ? (
                    /* Project List View */
                    <div className="space-y-24">
                      {PROJECTS.map((project) => (
                        <div key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start group">
                          <div
                            className="aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
                            onClick={() => handleProjectClick(project)}
                          >
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                          </div>
                          <div className="md:pt-4">
                            <button onClick={() => handleProjectClick(project)} className="text-left">
                              <h3 className="text-xl font-heading font-medium uppercase mb-2 hover:italic transition-all duration-300">
                                {project.title}
                              </h3>
                            </button>
                            <div className="flex gap-4 font-mono text-[10px] text-gray-500 mb-4 border-b border-gray-200 pb-2">
                              <span>{project.year}</span>
                              <span>/</span>
                              <span>{lang === 'ko' && project.categoryKo ? project.categoryKo : project.category}</span>
                            </div>
                            {/* Only show text description in list view */}
                            <p className={`text-sm font-light leading-relaxed text-gray-800 line-clamp-3 ${lang === 'ko' && project.descriptionKo ? 'font-ko' : 'font-sans'}`}>
                              {lang === 'ko' && project.descriptionKo ? project.descriptionKo : project.description}
                            </p>
                            <button
                              onClick={() => handleProjectClick(project)}
                              className={`mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-50 transition-opacity ${lang === 'ko' ? 'font-ko' : ''}`}
                            >
                              {labels.viewProject}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Project Detail View */
                    selectedProjectData && (
                      <div className="animate-fade-in max-w-4xl mx-auto">
                        {/* Title + back button — aligned with content */}
                        <div className="mb-12">
                          <h2 className="text-4xl md:text-5xl font-heading font-light uppercase tracking-tight">
                            {selectedProjectData.title}
                          </h2>
                          <button
                            onClick={() => {
                              setIsTransitioning(true);
                              setTimeout(() => { navigate('/projects'); setIsTransitioning(false); }, 100);
                            }}
                            className="mt-4 text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black hover:underline"
                          >
                            {labels.back}
                          </button>
                        </div>

                        {/* Image Slider / Carousel for projects */}
                        <div className="relative w-full aspect-video bg-gray-100 mb-12 group select-none">
                          <img
                            src={projectImages[currentProjectSlideIndex]}
                            alt={`${selectedProjectData.title} view ${currentProjectSlideIndex + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover transition-all duration-500"
                          />
                          
                          {/* Carousel Controls */}
                          {projectImages.length > 1 && (
                            <>
                              <button
                                onClick={handlePrevProjectSlide}
                                className="absolute left-0 top-0 h-full px-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/10"
                                aria-label="Previous image"
                              >
                                <span className="text-3xl text-white drop-shadow-md font-thin">‹</span>
                              </button>
                              
                              <button
                                onClick={handleNextProjectSlide}
                                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/10"
                                aria-label="Next image"
                              >
                                <span className="text-3xl text-white drop-shadow-md font-thin">›</span>
                              </button>

                              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 text-[10px] font-mono tracking-widest">
                                {currentProjectSlideIndex + 1} / {projectImages.length}
                              </div>
                            </>
                          )}
                        </div>

                        {/* METADATA BLOCK */}
                        <div className="mb-12 border-t border-b border-gray-200 py-6 text-xs font-mono text-gray-600 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            {selectedProjectData.projectType && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">{labels.type}</span>
                                <span className="text-black">{selectedProjectData.projectType}</span>
                              </div>
                            )}
                            <div>
                              <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">{labels.category}</span>
                              <span className="text-black">
                                {lang === 'ko' && selectedProjectData.categoryKo ? selectedProjectData.categoryKo : selectedProjectData.category}
                              </span>
                            </div>
                            {selectedProjectData.materials && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">{labels.materials}</span>
                                <span>
                                  {lang === 'ko' && selectedProjectData.materialsKo
                                    ? selectedProjectData.materialsKo
                                    : selectedProjectData.materials}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">{labels.yearLocation}</span>
                              <span>
                                {selectedProjectData.year} / {selectedProjectData.location || 'Germany'}
                              </span>
                            </div>
                            {selectedProjectData.exhibition && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">{labels.exhibitedAt}</span>
                                <span>{selectedProjectData.exhibition}</span>
                              </div>
                            )}
                            {selectedProjectData.credits && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">{labels.credits}</span>
                                <span className="whitespace-pre-line">{selectedProjectData.credits}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Video Section */}
                        {selectedProjectData.videoUrl && (
                          <div className="w-full aspect-video bg-black mb-8 flex items-center justify-center border border-gray-200">
                            {selectedProjectData.videoUrl === 'placeholder' ? (
                              <div className="text-center p-8">
                                <p className="text-white font-mono uppercase tracking-widest text-xs mb-2 border border-white/30 inline-block px-4 py-2">
                                  {labels.videoDoc}
                                </p>
                                <p className="text-gray-400 text-[10px] font-mono">{labels.comingSoon}</p>
                              </div>
                            ) : isLocalVideo(selectedProjectData.videoUrl) ? (
                              <video
                                controls
                                className="w-full h-full"
                                poster={projectImages[0]}
                              >
                                <source src={selectedProjectData.videoUrl} type="video/mp4" />
                              </video>
                            ) : (
                              <iframe 
                                src={getEmbedUrl(selectedProjectData.videoUrl)}
                                className="w-full h-full"
                                title={`${selectedProjectData.title} video`}
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                              />
                            )}
                          </div>
                        )}

                        {/* Audio Section */}
                        {selectedProjectData.audioUrl && (
                          <div className="w-full mb-12 border border-gray-200 p-6 bg-gray-50/50 backdrop-blur-sm">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2 inline-block">
                              {labels.soundRecord}
                            </p>
                            {selectedProjectData.audioUrl === 'placeholder' ? (
                              <div className="text-center py-6 bg-white border border-dashed border-gray-300">
                                <div className="w-8 h-8 rounded-full border-2 border-gray-300 mx-auto mb-2 animate-pulse"></div>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                                  {labels.audioSoon}
                                </p>
                              </div>
                            ) : (
                              <audio controls className="w-full grayscale focus:outline-none">
                                <source src={selectedProjectData.audioUrl} type="audio/mpeg" />
                              </audio>
                            )}
                          </div>
                        )}

                        {/* Long-form project documentation */}
                        {selectedProjectData.detailSections ? (
                          <div className="mt-16 space-y-24">
                            {selectedProjectData.detailSections.map((section, sectionIndex) => (
                              <section key={section.title} className="border-t border-gray-200 pt-8">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-10">
                                  <div className="md:col-span-3">
                                    <p className="font-mono text-[10px] text-gray-400 tracking-widest mb-3">
                                      {String(sectionIndex + 1).padStart(2, '0')}
                                    </p>
                                    <h3 className={`font-heading text-xl uppercase tracking-wide ${lang === 'ko' ? 'font-ko' : ''}`}>
                                      {lang === 'ko' && section.titleKo ? section.titleKo : section.title}
                                    </h3>
                                  </div>
                                  <p className={`md:col-span-9 text-base md:text-lg font-light leading-relaxed text-gray-800 whitespace-pre-line ${lang === 'ko' ? 'font-ko' : ''}`}>
                                    {lang === 'ko' && section.bodyKo ? section.bodyKo : section.body}
                                  </p>
                                </div>

                                {section.images && section.images.length > 0 && (
                                  <div className={section.layout === 'wide' ? 'space-y-8' : 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'}>
                                    {section.images.map((item, imageIndex) => (
                                      <figure key={`${item.url}-${imageIndex}`} className="min-w-0">
                                        <div className="bg-gray-50 overflow-hidden">
                                          <img
                                            src={item.url}
                                            alt={lang === 'ko' && item.captionKo ? item.captionKo : (item.caption || section.title)}
                                            loading="lazy"
                                            className="w-full h-auto object-contain"
                                          />
                                        </div>
                                        {(item.caption || item.captionKo) && (
                                          <figcaption className={`mt-3 font-mono text-[10px] leading-relaxed text-gray-500 ${lang === 'ko' ? 'font-ko' : ''}`}>
                                            {lang === 'ko' && item.captionKo ? item.captionKo : item.caption}
                                          </figcaption>
                                        )}
                                      </figure>
                                    ))}
                                  </div>
                                )}
                              </section>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-8">
                            <p className={`text-base md:text-lg font-light leading-relaxed text-gray-800 whitespace-pre-line ${lang === 'ko' && selectedProjectData.descriptionKo ? 'font-ko' : ''}`}>
                              {lang === 'ko' && selectedProjectData.descriptionKo ? selectedProjectData.descriptionKo : selectedProjectData.description}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </>
              )}

              {/* CERAMICS LIST (Grid with Inline Slider) */}
              {currentView === 'ceramics' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CERAMICS.map(item => (
                        <CeramicGridItem key={item.id} item={item} lang={lang} />
                    ))}
                </div>
              )}

              {/* BIO */}
              {currentView === 'bio' && (
                <div className="max-w-4xl">
                  {/* Bio Text */}
                  <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 font-mono text-[10px] leading-loose text-gray-500">
                      <p className="text-black font-bold mb-4 uppercase text-xs tracking-widest">
                        {lang === 'ko'
                          ? <span className="font-ko">{BIO_PROFILE.titleKo}</span>
                          : BIO_PROFILE.title}
                      </p>
                      <p className={lang === 'ko' ? 'font-ko text-[11px]' : ''}>
                        {lang === 'ko' ? BIO_PROFILE.locationKo : BIO_PROFILE.location}
                      </p>
                      <br />
                      <p>{lang === 'ko' ? '연락처' : 'Contact'}:</p>
                      <a
                        href={`mailto:${BIO_PROFILE.email}`}
                        className="underline hover:text-black transition-colors"
                      >
                        {BIO_PROFILE.email}
                      </a>
                    </div>
                    <div className="lg:col-span-8 space-y-6">
                      {bioText.map((text, i) => (
                        <p
                          key={i}
                          className={`leading-relaxed text-justify text-sm font-light text-gray-800 ${lang === 'ko' ? 'font-ko' : ''}`}
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Resume / CV Sections */}
                  <div className="border-t border-black pt-16">
                    {renderCVSection(labels.education, lang === 'ko' ? EDUCATION_KO : EDUCATION)}
                    {renderCVSection(labels.exhibitions, lang === 'ko' ? EXHIBITIONS_KO : EXHIBITIONS)}
                    {renderCVSection(labels.awards, lang === 'ko' ? AWARDS_KO : AWARDS)}
                    {renderCVSection(labels.experience, lang === 'ko' ? EXPERIENCES_KO : EXPERIENCES)}
                    {renderCVSection(labels.work, lang === 'ko' ? WORK_KO : WORK)}
                    {renderCVSection(labels.contributions, lang === 'ko' ? CONTRIBUTIONS_KO : CONTRIBUTIONS)}
                  </div>
                </div>
              )}

              {/* CONTACT */}
              {currentView === 'contact' && (
                <div className="min-h-[50vh] flex flex-col justify-center">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-3xl md:text-5xl lg:text-6xl font-heading font-light uppercase hover:opacity-40 transition-opacity break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  <div className="mt-12 flex flex-wrap gap-8 font-mono text-xs uppercase tracking-wider">
                    {CONTACT_INFO.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-40 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
