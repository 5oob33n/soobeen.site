import React, { useState, useEffect } from 'react';
import AsciiBackground from './components/AsciiBackground';
import GlitchText from './components/GlitchText';
import { 
  MENU_ITEMS, 
  PROJECTS, 
  CERAMICS, 
  WRITINGS, 
  BIO_TEXT, 
  BIO_PROFILE,
  EDUCATION,
  EXHIBITIONS,
  AWARDS,
  EXPERIENCES,
  WORK,
  CONTRIBUTIONS,
  CONTACT_INFO
} from './constants';
import { CVItem } from './types';

type ViewState = 'home' | 'projects' | 'ceramics' | 'writings' | 'bio' | 'contact';

const App: React.FC = () => {
  // Navigation & view state
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedWritingId, setSelectedWritingId] = useState<string | null>(null);
  const [selectedCeramicId, setSelectedCeramicId] = useState<string | null>(null); // currently opened ceramic gallery
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Slider indices for projects and ceramics
  const [currentProjectSlideIndex, setCurrentProjectSlideIndex] = useState(0);
  const [currentCeramicSlideIndex, setCurrentCeramicSlideIndex] = useState(0);

  // Scroll to top on view / selection change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProjectId, selectedWritingId, selectedCeramicId]);

  // Reset project slider when project changes
  useEffect(() => {
    if (selectedProjectId) {
      setCurrentProjectSlideIndex(0);
    }
  }, [selectedProjectId]);

  // Reset ceramic slider when ceramic changes
  useEffect(() => {
    if (selectedCeramicId) {
      setCurrentCeramicSlideIndex(0);
    }
  }, [selectedCeramicId]);

  // Simple view navigation
  const navigateTo = (view: ViewState) => {
    // If user clicks the same view and nothing is selected, do nothing (except for home)
    if (view === currentView && !selectedProjectId && !selectedWritingId && !selectedCeramicId && view !== 'home') return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(view);
      // Reset inner selections when changing main view
      setSelectedProjectId(null);
      setSelectedWritingId(null);
      setSelectedCeramicId(null);
      setIsTransitioning(false);
    }, 100);
  };

  // Project list → detail
  const handleProjectClick = (projectId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProjectId(projectId);
      setIsTransitioning(false);
    }, 100);
  };

  // Writings list → detail
  const handleWritingClick = (writingId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedWritingId(writingId);
      setIsTransitioning(false);
    }, 100);
  };

  // Ceramics card → open gallery modal
  const handleCeramicClick = (ceramicId: string) => {
    // When user clicks on a ceramic item, open the gallery overlay and reset index
    setSelectedCeramicId(ceramicId);
    setCurrentCeramicSlideIndex(0);
  };

  // Close ceramic gallery modal
  const handleCloseCeramic = () => {
    setSelectedCeramicId(null);
  };

  // Project data & images
  const selectedProjectData = selectedProjectId ? PROJECTS.find(p => p.id === selectedProjectId) : null;
  const selectedWritingData = selectedWritingId ? WRITINGS.find(w => w.id === selectedWritingId) : null;
  
  // Build project image array for slider
  const projectImages = selectedProjectData 
    ? (selectedProjectData.galleryUrls && selectedProjectData.galleryUrls.length > 0 
        ? selectedProjectData.galleryUrls 
        : [selectedProjectData.imageUrl])
    : [];

  const handleNextProjectSlide = () => {
    if (projectImages.length === 0) return;
    setCurrentProjectSlideIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrevProjectSlide = () => {
    if (projectImages.length === 0) return;
    setCurrentProjectSlideIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  // Ceramics: find selected item (using any to avoid TS type conflicts if CERAMICS is loosely typed)
  const selectedCeramicData = selectedCeramicId
    ? (CERAMICS as any[]).find((c) => c.id === selectedCeramicId) || null
    : null;

  // Ceramics gallery images: use galleryUrls if present, otherwise fallback to single imageUrl
  const ceramicImages: string[] = selectedCeramicData
    ? (selectedCeramicData.galleryUrls && selectedCeramicData.galleryUrls.length > 0
        ? selectedCeramicData.galleryUrls
        : [selectedCeramicData.imageUrl])
    : [];

  const handleNextCeramicSlide = () => {
    if (ceramicImages.length === 0) return;
    setCurrentCeramicSlideIndex((prev) => (prev + 1) % ceramicImages.length);
  };

  const handlePrevCeramicSlide = () => {
    if (ceramicImages.length === 0) return;
    setCurrentCeramicSlideIndex((prev) => (prev - 1 + ceramicImages.length) % ceramicImages.length);
  };

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
        <GlitchText text={title} />
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
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="noise" />

      {/* PERSISTENT BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <AsciiBackground intensity={1} />
      </div>

      {/* HOME VIEW LAYOUT */}
      {currentView === 'home' && (
        <div className={`relative z-10 w-full h-screen flex flex-col justify-between p-8 md:p-12 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Top Left: Name */}
          <header className="flex justify-start">
            <button 
              onClick={() => navigateTo('home')}
              className="bg-white/80 backdrop-blur-[2px] px-2 py-1 -ml-2 rounded-sm text-left hover:opacity-60 transition-opacity cursor-pointer group"
            >
              <h1 className="font-heading font-bold text-sm tracking-widest uppercase">
                <GlitchText text="Soobeen Woo" />
              </h1>
            </button>
          </header>

          {/* Bottom Area: Copyright (Left) & Menu (Right) */}
          <div className="flex justify-between items-end w-full">
            
            {/* Copyright */}
            <div className="bg-white/80 backdrop-blur-[2px] px-2 py-1 -ml-2 rounded-sm">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-tight">
                &copy; {new Date().getFullYear()} Soobeen Woo. <span className="hidden sm:inline">All Rights Reserved.</span>
              </p>
            </div>

            {/* Menu */}
            <nav className="bg-white/80 backdrop-blur-[2px] px-3 py-2 -mr-3 rounded-sm">
              <ul className="flex flex-col gap-1 text-right">
                {MENU_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => navigateTo(item.id as ViewState)}
                      className="group block w-full font-heading font-normal text-xs tracking-widest transition-all uppercase text-right"
                    >
                      <GlitchText text={item.label} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* CONTENT VIEW LAYOUT */}
      {currentView !== 'home' && (
        <div className={`relative z-10 min-h-screen transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Navigation Header for Content Pages */}
          <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-start p-8 md:p-12 pointer-events-none">
            {/* Logo links back to home */}
            <button 
              onClick={() => navigateTo('home')} 
              className="pointer-events-auto bg-white/80 backdrop-blur-[2px] px-2 py-1 -ml-2 rounded-sm font-heading font-bold text-sm tracking-widest uppercase hover:opacity-50 transition-opacity text-left cursor-pointer"
            >
              <GlitchText text="Soobeen Woo" />
            </button>

            {/* Content Menu (Simple list) */}
            <div className="pointer-events-auto flex flex-col items-end gap-1 font-heading text-xs uppercase tracking-wide bg-white/80 backdrop-blur-[2px] px-4 py-2 -mr-4 rounded-sm">
              <button onClick={() => navigateTo('home')} className="mb-4 hover:underline">Close</button>
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id as ViewState)}
                  className={`hover:opacity-100 transition-opacity text-right ${currentView === item.id && !selectedProjectId && !selectedWritingId && !selectedCeramicId ? 'opacity-100 font-bold' : 'opacity-40'}`}
                >
                  <GlitchText text={item.label} triggerOnLoad={false} />
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content Container - White/90 background */}
          <main className="w-full min-h-screen bg-white/90 backdrop-blur-sm pt-32 pb-24 px-8 md:px-24 lg:px-48">
            
            <header className="mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-light uppercase tracking-tight">
                <GlitchText 
                  text={
                    selectedProjectId ? 'Project View' : 
                    selectedWritingId ? 'Reading' : 
                    currentView
                  } 
                />
              </h2>
              {(selectedProjectId || selectedWritingId) && (
                <button 
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setSelectedProjectId(null);
                      setSelectedWritingId(null);
                      setIsTransitioning(false);
                    }, 100);
                  }}
                  className="mt-4 text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black hover:underline"
                >
                  &larr; Back to List
                </button>
              )}
            </header>

            <div className="fade-in-content">
              {/* PROJECTS */}
              {currentView === 'projects' && (
                <>
                  {!selectedProjectId ? (
                    /* Project List View */
                    <div className="space-y-24">
                      {PROJECTS.map((project) => (
                        <div key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start group">
                          <div
                            className="aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
                            onClick={() => handleProjectClick(project.id)}
                          >
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                          </div>
                          <div className="md:pt-4">
                            <button onClick={() => handleProjectClick(project.id)} className="text-left">
                              <h3 className="text-xl font-heading font-medium uppercase mb-2 hover:italic transition-all duration-300">
                                {project.title}
                              </h3>
                            </button>
                            <div className="flex gap-4 font-mono text-[10px] text-gray-500 mb-4 border-b border-gray-200 pb-2">
                              <span>{project.year}</span>
                              <span>/</span>
                              <span>{project.category}</span>
                            </div>
                            {/* Only show text description in list view */}
                            <p className="font-sans text-sm font-light leading-relaxed text-gray-800 line-clamp-3">
                              {project.description}
                            </p>
                            <button
                              onClick={() => handleProjectClick(project.id)}
                              className="mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
                            >
                              View Project
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Project Detail View */
                    selectedProjectData && (
                      <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="mb-4 font-mono text-xs text-gray-500 uppercase tracking-widest">
                          {selectedProjectData.year}
                        </div>
                        <h1 className="text-3xl md:text-6xl font-heading font-light uppercase tracking-tight mb-12">
                          {selectedProjectData.title}
                        </h1>

                        {/* Image Slider / Carousel for projects */}
                        <div className="relative w-full aspect-video bg-gray-100 mb-12 group select-none">
                          <img
                            src={projectImages[currentProjectSlideIndex]}
                            alt={`${selectedProjectData.title} view ${currentProjectSlideIndex + 1}`}
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
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">Type</span>
                                <span className="text-black">{selectedProjectData.projectType}</span>
                              </div>
                            )}
                            <div>
                              <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">Category</span>
                              <span className="text-black">{selectedProjectData.category}</span>
                            </div>
                            {selectedProjectData.materials && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">Materials</span>
                                <span>{selectedProjectData.materials}</span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">Year / Location</span>
                              <span>
                                {selectedProjectData.year} / {selectedProjectData.location || 'Germany'}
                              </span>
                            </div>
                            {selectedProjectData.exhibition && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">Exhibited At</span>
                                <span>{selectedProjectData.exhibition}</span>
                              </div>
                            )}
                            {selectedProjectData.credits && (
                              <div>
                                <span className="block text-gray-400 uppercase text-[10px] tracking-wider mb-1">Credits</span>
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
                                  Video Documentation
                                </p>
                                <p className="text-gray-400 text-[10px] font-mono">Coming Soon / To Be Uploaded</p>
                              </div>
                            ) : isLocalVideo(selectedProjectData.videoUrl) ? (
                              <video 
                                controls 
                                className="w-full h-full"
                                poster={projectImages[0]}
                              >
                                <source src={selectedProjectData.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
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
                              Sound Record
                            </p>
                            {selectedProjectData.audioUrl === 'placeholder' ? (
                              <div className="text-center py-6 bg-white border border-dashed border-gray-300">
                                <div className="w-8 h-8 rounded-full border-2 border-gray-300 mx-auto mb-2 animate-pulse"></div>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                                  Audio track coming soon
                                </p>
                              </div>
                            ) : (
                              <audio controls className="w-full grayscale focus:outline-none">
                                <source src={selectedProjectData.audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            )}
                          </div>
                        )}

                        {/* Description Text */}
                        <div className="mt-8">
                          <p className="text-base md:text-lg font-light leading-relaxed text-gray-800 whitespace-pre-line">
                            {selectedProjectData.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}

              {/* CERAMICS */}
              {currentView === 'ceramics' && (
                <div className="relative">
                  {/* Ceramics grid (overview) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CERAMICS.map((item: any) => (
                      <div
                        key={item.id}
                        className="cursor-pointer group"
                        onClick={() => handleCeramicClick(item.id)}
                      >
                        <div className="aspect-square bg-gray-50 overflow-hidden mb-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                        <h3 className="font-heading font-medium text-sm uppercase">
                          {item.title}
                        </h3>
                        <p className="font-mono text-[10px] text-gray-500 mt-1">
                          {item.category}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Ceramics gallery modal overlay */}
                  {selectedCeramicData && (
                    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                      <div className="relative max-w-4xl w-full mx-4 bg-white/90 rounded-sm shadow-lg p-6 md:p-8">
                        {/* Close button */}
                        <button
                          onClick={handleCloseCeramic}
                          className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-gray-500 hover:text-black"
                        >
                          Close ×
                        </button>

                        {/* Title / meta */}
                        <div className="mb-4 pr-10">
                          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                            Ceramic Piece
                          </div>
                          <h3 className="text-lg md:text-2xl font-heading uppercase">
                            {selectedCeramicData.title}
                          </h3>
                          {selectedCeramicData.category && (
                            <p className="font-mono text-[10px] text-gray-500 mt-1">
                              {selectedCeramicData.category}
                            </p>
                          )}
                        </div>

                        {/* Image slider for ceramics */}
                        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group select-none">
                          {ceramicImages.length > 0 && (
                            <img
                              src={ceramicImages[currentCeramicSlideIndex]}
                              alt={`${selectedCeramicData.title} view ${currentCeramicSlideIndex + 1}`}
                              className="w-full h-full object-cover transition-all duration-500"
                            />
                          )}

                          {ceramicImages.length > 1 && (
                            <>
                              <button
                                onClick={handlePrevCeramicSlide}
                                className="absolute left-0 top-0 h-full px-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/10"
                                aria-label="Previous image"
                              >
                                <span className="text-3xl text-white drop-shadow-md font-thin">‹</span>
                              </button>
                              
                              <button
                                onClick={handleNextCeramicSlide}
                                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/10"
                                aria-label="Next image"
                              >
                                <span className="text-3xl text-white drop-shadow-md font-thin">›</span>
                              </button>

                              <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 text-[10px] font-mono tracking-widest rounded-sm">
                                {currentCeramicSlideIndex + 1} / {ceramicImages.length}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* WRITINGS */}
              {currentView === 'writings' && (
                <>
                  {!selectedWritingId ? (
                    /* Writings List View */
                    <div className="max-w-3xl space-y-16">
                      {WRITINGS.map((w) => (
                        <article
                          key={w.id}
                          className="group cursor-pointer"
                          onClick={() => handleWritingClick(w.id)}
                        >
                          <div className="font-mono text-[10px] text-gray-400 mb-2">
                            {w.date}
                          </div>
                          <h3 className="text-2xl font-heading font-medium mb-3 group-hover:italic transition-all">
                            {w.title}
                          </h3>
                          <p className="text-sm font-light leading-relaxed text-gray-600">
                            {w.summary}
                          </p>
                          <button className="mt-4 text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-50 transition-opacity">
                            Read More
                          </button>
                          <div className="mt-6 w-12 h-px bg-gray-200 group-hover:w-full transition-all duration-500"></div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    /* Writing Detail View */
                    selectedWritingData && (
                      <div className="animate-fade-in max-w-3xl mx-auto">
                        <div className="mb-6 font-mono text-xs text-gray-500 uppercase tracking-widest border-b border-black/10 pb-4">
                          {selectedWritingData.date}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-light mb-12 leading-tight">
                          {selectedWritingData.title}
                        </h1>
                        <div className="prose prose-sm md:prose-base font-light text-justify text-gray-800 whitespace-pre-line leading-loose">
                          {selectedWritingData.content}
                        </div>
                        
                        <div className="mt-20 pt-8 border-t border-gray-200">
                          <p className="font-mono text-[10px] text-gray-400">
                            &copy; Soobeen Woo. Text may not be reproduced without permission.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}

              {/* BIO */}
              {currentView === 'bio' && (
                <div className="max-w-4xl">
                  {/* Bio Text */}
                  <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 font-mono text-[10px] leading-loose text-gray-500">
                      <p className="text-black font-bold mb-4 uppercase text-xs tracking-widest">
                        <GlitchText text={BIO_PROFILE.title} triggerOnLoad={false} />
                      </p>
                      <p>{BIO_PROFILE.location}</p>
                      <br />
                      <p>Contact:</p>
                      <a
                        href={`mailto:${BIO_PROFILE.email}`}
                        className="underline hover:text-black transition-colors"
                      >
                        {BIO_PROFILE.email}
                      </a>
                    </div>
                    <div className="lg:col-span-8 space-y-6">
                      {BIO_TEXT.map((text, i) => (
                        <p
                          key={i}
                          className="leading-relaxed text-justify text-sm font-light text-gray-800"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Resume / CV Sections */}
                  <div className="border-t border-black pt-16">
                    {renderCVSection('Education', EDUCATION)}
                    {renderCVSection('Exhibitions & Performances', EXHIBITIONS)}
                    {renderCVSection('Awards & Grants', AWARDS)}
                    {renderCVSection('Experience', EXPERIENCES)}
                    {renderCVSection('Work', WORK)}
                    {renderCVSection('Contributions', CONTRIBUTIONS)}
                  </div>
                </div>
              )}

              {/* CONTACT */}
              {currentView === 'contact' && (
                <div className="min-h-[50vh] flex flex-col justify-center">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-3xl md:text-5xl lg:text-6xl font-heading font-light uppercase hover:italic transition-all break-all"
                  >
                    <GlitchText text={CONTACT_INFO.email} />
                  </a>
                  <div className="mt-12 flex flex-wrap gap-8 font-mono text-xs uppercase tracking-wider">
                    {CONTACT_INFO.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:line-through transition-all"
                      >
                        <GlitchText text={link.label} triggerOnLoad={false} />
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
