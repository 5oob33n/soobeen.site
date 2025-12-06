

import { Project, MenuItem, CVItem, Writing } from './types';

/*
  [🗂️ 파일 관리 및 폴더 구조 가이드]

  프로젝트별로 파일이 섞이지 않도록, 아래와 같이 폴더를 나누어 관리하는 것을 추천합니다.
  프로젝트 루트의 'public' 폴더 안에 아래 구조대로 폴더를 만드세요.

  public/
   └── images/
        ├── autopsy/            (Autopsy of Sensing: 사진, 오디오, 비디오)
        ├── resonair/           (Resonair: 사진, 비디오)
        ├── afropolik/          (Afropolik: 사진, 비디오)
        ├── antio/              (Antio: 비디오)
        ├── echoia/             (Echoia: 사진, 비디오)
        ├── object-metamorphosis/ (사진)
        ├── debris-tracer/      (사진)
        ├── jujube/             (Jujube Universe: 사진, 비디오)
        ├── seed-capsule/       (Seed Capsule: 사진, 비디오)
        ├── vom-blick/          (Vom Blick: 비디오)
        ├── oensa-ant/          (Oensa Ant: 비디오)
        └── ceramics/           (도자 작업 사진들)

  * 파일을 넣은 후, 아래 코드에서 주석(// [파일교체시]...)에 적힌 경로로 imageUrl 값을 변경하세요.
  * 경로는 항상 '/images/...' 로 시작해야 합니다.
  * 영상은 Vimeo(비메오) 임베드 링크를 추천합니다.
*/

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Projects', id: 'projects' },
  { label: 'Ceramics', id: 'ceramics' },
  { label: 'Writings', id: 'writings' },
  { label: 'BIO', id: 'bio' },
  { label: 'Contact', id: 'contact' },
];

export const BIO_PROFILE = {
  name: "Soobeen Woo",
  title: "Digital Media Artist",
  location: "Bremen, Germany / Daegu & Busan, Korea",
  email: "youxarthur@gmail.com"
};

export const CONTACT_INFO = {
  email: "youxarthur@gmail.com",
  links: [
    { label: "Instagram", url: "https://www.instagram.com/5oob33n/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/soobeen-woo/" },
    { label: "SoundCloud", url: "https://soundcloud.com/youxfromisland" }
  ]
};

export const BIO_TEXT = [
  "Soobeen Woo is a digital media artist exploring unseen layers of perception and existence. Her work translates what escapes human vision—micro-vibrations, disappearing traces, erased voices, and non-human sensory structures—into sound, ceramics, vibration systems, text, and virtual environments, revealing forms of reality that precede interpretation.",
  "Rather than reproducing an entity, her installations focus on the residue and fractures that existence leaves behind. Elements such as heat, breath, fragments, collisions, condensation, and sound operate like living organisms within the work, shifting and fading in response to the viewer's proximity, body heat, air movement, and time.",
  "She critically examines the relationship between perception and existence, engaging questions of the right not to be sensed, the materiality of human emotion as intrusion, and the ways invisible beings come to inhabit the world."
];

export const EDUCATION: CVItem[] = [
  {
    year: "2023-present",
    degree: "BFA, Digital Media",
    school: "HfK Bremen (University of Arts Bremen)",
    title: "HfK Bremen", 
    location: "Germany"
  }
];

export const EXHIBITIONS: CVItem[] = [
  { year: 2025, title: "ONE PIECE", description: "Choreographed by the Machines", location: "NebenFlut, HfK Bremen, Bremen, Germany" },
  { year: 2025, title: "Lichtrouten 2025", location: "Lüdenscheid, Germany" },
  { year: 2025, title: "BLAUES RAUSCHEN 2025", description: "Performance, Philharmonie Essen, Essen, Germany" },
  { year: 2025, title: "Hochschultage 2025", location: "HfK Bremen, Bremen, Germany" },
  { year: 2024, title: "MAP 2024 - POSTER SERIES", description: "an art project on mobility in the streets of Hanoi (Collaborate with GHTK)", location: "Hanoi Downtown, Vietnam" },
  { year: 2024, title: "Goldstücke 2024 - Licht Kunst Projekte Gelsenkirchen", location: "Gelsenkirchen, Germany" },
  { year: 2024, title: "Lichter der City", description: "Projection Mapping", location: "Bremen, Germany" },
  { year: 2022, title: "Korea-Thai-Japan NFT Festival", description: "Team Invisible", location: "Uncommon Gallery, Seoul, South Korea" },
  { year: 2018, title: "YCK F 2018 (Young Creativ Korea F)", location: "Ara Art Center, Seoul, South Korea" }
];

export const AWARDS: CVItem[] = [
  { year: 2025, title: "Open Space - Domshof", description: "Vjing Performance, Bremen, Germany" },
  { year: 2024, title: "Dreaming Streams", description: "Goldstücke - Licht kunst Projekte Gelsenkirchen Diplopia Open Call, Team KIS, Gelsenkirchen, Germany" },
  { year: 2024, title: "Open Space - Domshof", description: "Vjing Performance, Bremen, Germany" }
];

export const EXPERIENCES: CVItem[] = [
  { year: 2025, title: "VJ-ing Workshop", description: "Xenorama Studio, Bremen, Germany" },
  { year: 2025, title: "BLAUES RAUSCHEN 2025", description: "Data Ethics and Creative Practice - A Critical Workshop, Essen, Germany" },
  { year: 2024, title: "MAP 2024 - Movement", description: "HfK Bremen & Heritage Art Space - Hanoi, Vietnam, Bremen, Germany" },
  { year: 2024, title: "VJ-ing Workshop", description: "We Dig it + Xenorama Studio, Bremen, Germany" },
  { year: 2023, title: "Projection Mapping Workshop", description: "We Dig it + Xenorama Studio, Bremen, Germany" },
  { year: 2022, title: "Seminar & Hackathon", description: "In the Age of Web 3.0 Creating in Digital online environment, Art Collider - Korea National University of Arts, Seoul, South Korea" }
];

export const WORK: CVItem[] = [
  { year: "2025-present", title: "Videographer (Studentische Hilfskraft)", company: "DFKI Bremen", location: "Bremen, Germany" },
  { year: 2025, title: "Curator", company: "Lichtrouten 2025", location: "Lüdenscheid, Germany" },
  { year: "2024-present", title: "Guest Editor", company: "2room Magazine (Webzine)" },
  { year: "2021-2023", title: "Editor", company: "Wesang Company: Magazine maat", location: "Seoul, South Korea" }
];

export const CONTRIBUTIONS: CVItem[] = [
  { year: 2025, title: "That's My Neighbour", description: "3D Modeling & Animation, The Fike Room, Busan, South Korea" },
  { year: 2024, title: "Ouroboros", description: "CGI & AI generated image, Hara Shin, Seoul, South Korea" }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Autopsy of Sensing',
    projectType: 'Individual Project',
    category: 'Performance',
    year: '2025',
    location: 'Germany',
    materials: 'Ceramic object (x1), glass object (x1), bone conductor transducers, amplifiers, Ableton/Max for Live',
    description: `For a long time, humans have understood perception as a tool to comprehend the world. Only what can be seen, heard, or felt was considered to exist, and perception was used as a means to collect, control, and categorize information. Yet, sensations that are unseen, unheard, and untouchable also operate and exist within the world.

《Autopsy of Sensing》 explores this gap, based on repeated encounters in New Zealand with the deaths of birds—particularly those resulting from collisions with windows—and on the non-visual sensory structures of kiwi and kakapo.

I sonified texts, images, collision data, and photos of the objects using Ableton and Max for Live, and the resulting output is realized as vibrations through two resonating objects: one ceramic and one glass. Each object alludes to the dissected structure of a dead bird, functioning not as a mere reproduction but as a sensory organ that produces distinct resonances.

The vibrations are generated via bone conductor transducers and amplifiers, not to convey messages or meaning, but to remain as fragments of sensation, ghosts of perception that persist even after disappearance.

I unfold the deconstruction and afterlife of sensation through the vibrations and sounds of the two objects, which the audience witnesses but cannot fully interpret. This work records what remains after sensation has vanished—the ghost of perception—and serves as an act of mourning the disappearance and residue of existence.`,
    
    // 📂 폴더: public/images/autopsy/
    imageUrl: '/images/autopsy/main.png', // [파일교체시]: '/images/autopsy/main.jpg'
    audioUrl: 'placeholder', // [파일교체시]: '/images/autopsy/sound.mp3'
    videoUrl: 'placeholder', // [파일교체시]: '/images/autopsy/video.mp4' (또는 'https://player.vimeo.com/video/12345678')
    galleryUrls: [
       '/images/autopsy/01.jpg', // [파일교체시]: '/images/autopsy/01.jpg'
       //'https://picsum.photos/600/400?grayscale'         // [파일교체시]: '/images/autopsy/02.jpg'
    ]
  },
  {
    id: 'p2',
    title: 'Resonair',
    projectType: 'Individual Project',
    category: 'Interactive Installation',
    materials: 'Ceramic masks (x9), fiber optic cables, LED lights, humidifiers, microphone, speaker, round wooden table',
    year: '2025',
    location: 'Germany',
    exhibition: 'LICHTROUTEN Lüdenscheid, March 20 – 29, 2025, Daily from 7:00 PM – 11:00 PM',
    credits: 'Photography: Lars Gonikman, Jennifer Braun',
    
    // 📂 폴더: public/images/resonair/
    imageUrl: '/images/resonair/main.png', // [파일교체시]: '/images/resonair/main.jpg'
    videoUrl: 'https://vimeo.com/1144115072', // [파일교체시]: '/images/resonair/video.mp4' (또는 비메오)
    galleryUrls: [
      '/images/resonair/01.png', // [파일교체시]: '/images/resonair/01.jpg'
      '/images/resonair/02.png', // [파일교체시]: '/images/resonair/02.jpg'
      '/images/resonair/03.png',
      '/images/resonair/04.png',
      '/images/resonair/05.png',
      '/images/resonair/06.png',
      '/images/resonair/07.png',
      '/images/resonair/08.png',
      '/images/resonair/09.png'
    ],
    description: `Resonair explores the interplay between breath, presence, and disappearance in an environment saturated with air pollution. At the center of a round wooden table lies a single mask, surrounded by eight others, all connected by glowing fiber optic cables. Each mask emits light and steam, gradually filling the space with a dense, foggy atmosphere.

A microphone hangs from the ceiling, inviting visitors to interact. When a breath is blown into it, the light shifts—changing slowly from red to blue. This transformation symbolizes the shared nature of breath and the possibility of regeneration through connection. Even when something is broken or fragmented, it can be restored through relational and social bonds.

Breathing is something we do without conscious awareness, which often leads us to forget how precious it is. Through engaging with the installation via breath, this unconscious act is brought to the surface, transforming what is usually invisible and taken for granted into something felt, seen, and shared.

By rendering breath both as a fleeting trace and an act of survival, Resonair blurs the boundary between visibility and erasure. It reminds us that breath, though invisible, must not be taken for granted—and that ignoring air pollution is ignoring the very basis of our existence.`,
  },
  {
    id: 'p3',
    title: 'Afropolik',
    projectType: 'Individual Project',
    category: 'Installation',
    materials: 'Motor, Arduino, Raspberry Pi, Processing, aluminum profile frame, silicone mat',
    year: '2025',
    location: 'Germany',
    exhibition: 'HfK Bremen, Bremen, Germany',
    credits: 'Photography: Lars Gonikman, Soobeen Woo\nVideography: Soobeen Woo',
    
    // 📂 폴더: public/images/afropolik/
    imageUrl: '/images/afropolik/main.jpg', // [파일교체시]: '/images/afropolik/main.jpg'
    videoUrl: 'https://vimeo.com/1060243247', // [파일교체시]: '/images/afropolik/video.mp4' (또는 비메오)
    galleryUrls: [
      '/images/afropolik/01.jpg', // [파일교체시]: '/images/afropolik/01.jpg'
      '/images/afropolik/02.jpg',
      '/images/afropolik/03.jpg',
      '/images/afropolik/04.jpg',
      '/images/afropolik/05.jpg',
      '/images/afropolik/06.jpg'
    ],
    description: `Afropolik is a kinetic installation that addresses air pollution and the right to breathe. The movement of the motor varies depending on real-time air pollution data, influencing the pressure of a face-like form onto a silicone mat.

Higher pollutant levels intensify the movement, creating deeper imprints, while cleaner air results in lighter or no traces. These imprints serve as physical records of the invisible air quality, visualizing the impact of pollution on the human body.

By combining mechanical movement and sound, the work alludes to a future where air is controlled and questions the value and social significance of shared breathing space.`,
  },
  {
    id: 'p_antio',
    title: 'Antio',
    projectType: 'Individual Project',
    category: 'Video',
    materials: 'Duration: 02:44',
    year: '2025',
    location: 'Germany',
    exhibition: 'Hochschultage 2025, HfK Bremen, Bremen, Germany',
    
    // 📂 폴더: public/images/antio/
    imageUrl: '/images/antio/main.png', // [파일교체시]: '/images/antio/thumbnail.jpg'
    videoUrl: 'https://vimeo.com/1061963881', // [파일교체시]: '/images/antio/video.mp4' (또는 비메오)
    galleryUrls: [
      '/images/antio/01.png', // [파일교체시]: '/images/antio/01.jpg'
      '/images/antio/02.png',
      '/images/antio/03.png',
      '/images/antio/04.png',
      '/images/antio/05.png',
      '/images/antio/06.png',
      '/images/antio/07.png',
      '/images/antio/08.png',
      '/images/antio/09.png',
      '/images/antio/10.png'
    ],
    description: `This advertisement for Antio Co., a virtual company, is set within the Antio universe, where hidden agendas and corporate propaganda shape reality. Generated using Pika, Sora, and Suno, and edited with After Effects and Ableton Live, the video adopts a creepy and conspiratorial tone, gradually revealing unsettling truths beneath its polished marketing.

Presented in the style of a dystopian infomercial with VHS aesthetics, the ad showcases Antio's latest innovations, such as Oensa Ant and Perotox, as essential solutions for a controlled future. However, as the narrative unfolds, glitches, distortions, and eerie undertones expose a deeper deception, suggesting that the world outside Antio's promises may not be as habitable as it seems.

The sound design, featuring manipulated voices and distorted audio layers, reinforces the sense of unease, making viewers question the fine line between corporate illusion and reality.`,
  },
  {
    id: 'p4',
    title: 'Echoia',
    projectType: 'Individual Project',
    category: 'Installation',
    materials: '3D hologram, AI-generated visuals and sound, mirror, black acrylic panels, stone',
    year: '2024',
    location: 'Germany',
    exhibition: 'Goldstücke, Gelsenkirchen',
    credits: 'Photography: Jennifer Braun, Lars Gonikman',
    
    // 📂 폴더: public/images/echoia/
    imageUrl: '/images/echoia/main.jpg', // [파일교체시]: '/images/echoia/main.jpg'
    videoUrl: 'https://vimeo.com/1043418455', // [파일교체시]: '/images/echoia/video.mp4' (또는 비메오)
    galleryUrls: [
      //'https://picsum.photos/seed/echoia1/800/600?grayscale', // [파일교체시]: '/images/echoia/01.jpg'
      //'https://picsum.photos/seed/echoia2/800/600?grayscale',
      //'https://picsum.photos/seed/echoia3/800/600?grayscale'
    ],
    description: `Echoia symbolically represents how digital information approaches reality and how actual identity merges with digital existence. It is expressed through a holographic device positioned at the intersection of the digital and the analog.

Echoia's dynamic virtual persona is designed to overlap with a physical body, moving in a mutually mimetic manner with the digital entity. It also utilizes AI to infinitely diffuse and transform into multiple entities, generating an ever-flowing vortex that continuously connects them. By viewing this from a narrow, confined space, the work offers a more intimate experience, inviting viewers to project themselves through its reflection and contemplate their own digital self.

The sound is composed from conversations with a virtual AI that embodies Echoia's persona, translated into music.`,
  },
  {
    id: 'p5',
    title: 'Object Metamorphosis',
    projectType: 'Individual Project',
    category: 'Digital print',
    year: '2024',
    location: 'Germany',
    exhibition: 'MAP 2024, GHTK delivery motorbikes, Hanoi',
    credits: 'Photography: Hoàng Nguyễn, Út Quyên\nCollaboration: GHTK, Vietnam',
    
    // 📂 폴더: public/images/object-metamorphosis/
    imageUrl: '/images/object-metamorphosis/main.jpeg', // [파일교체시]: '/images/object-metamorphosis/main.jpg'
    galleryUrls: [
      '/images/object-metamorphosis/01.jpg', // [파일교체시]: '/images/object-metamorphosis/01.jpg'
      '/images/object-metamorphosis/02.jpg',
      '/images/object-metamorphosis/03.jpeg',
      '/images/object-metamorphosis/04.jpeg',
      '/images/object-metamorphosis/05.jpg',
      '/images/object-metamorphosis/06.jpg'
    ],
    description: `Object Metamorphosis focuses on the mobility of landscapes and their transformation, exploring the relationship between the material and the virtual. Disappearing physical environments, such as glaciers in New Zealand, were documented through personal video recordings and transformed into 3D scans using Luma AI.

Through this process, material existence is digitally reconstructed, creating an intersection between reality and the virtual. However, this process questions whether digitization can fully preserve the identity of a place or inevitably leads to distortions and disconnections. Mobility extends beyond simple physical movement to the reconstruction of existence across time and space. Glaciers that once existed in a physical location are reborn in digital form within a virtual space, allowing the memories and traces of specific places to move and persist within new contexts.

The typography reflects this intention, designed in a fragmented and incomplete form. The incompleteness of the typography highlights the inevitable gaps and transformations brought about by digitization, which fails to fully capture the wholeness of a place. This work is presented in collaboration with GHTK as part of MAP 2024. MAP 2024 is an international artistic exchange project between Bremen, Germany, and Hanoi, Vietnam, with this year's theme being 'Mobility.' The project explores not only physical movement but also the spread of ideas, thoughts, languages, and artistic expressions. From December 14 to 20, posters created by Bremen artists will be attached to GHTK delivery motorbikes, traveling across Hanoi and offering a new perspective on movement.`,
  },
  {
    id: 'p6',
    title: 'Debris Tracer',
    projectType: 'Individual Project',
    category: 'Website',
    year: '2024',
    location: 'Germany',
    
    // 📂 폴더: public/images/debris-tracer/
    imageUrl: '/images/debris-tracer/main.png', // [파일교체시]: '/images/debris-tracer/main.jpg'
    videoUrl: 'https://vimeo.com/918490095', // [파일교체시]: '/images/debris-tracer/video.mp4' (또는 비메오)
    galleryUrls: [
      //'https://picsum.photos/seed/debris1/800/600?grayscale', // [파일교체시]: '/images/debris-tracer/01.jpg'
      //'https://picsum.photos/seed/debris2/800/600?grayscale'
    ],
    description: `Space debris, invisible to the naked eye, is an underestimated threat for many. While it may not seem urgent at present, the accumulation of space debris could result in severe environmental consequences for Earth in the future. I am deeply dedicated to exploring perspectives beyond the human gaze by blending elements of nature and technology.

Conceptually, I aimed to visually represent space debris as a vast ring encircling Earth. To effectively convey this concept, I combined auditory and visual effects to stimulate human senses of sound and sight. By utilizing these senses, I hope to elevate awareness of this issue by prompting users to vocalize the phrase 'space debris.' This innovative project unfolds as a dynamic web page set against the backdrop of space. Upon loading, the page detects the phrase 'space debris,' transforming it into a password to guide users to the next environment. Using Speech Recognition technology, users are prompted to speak the designated phrase, leading them to the final page.

The final page offers a unique experience with each visit, featuring diverse music, text, and interactive objects. Each object corresponds to distinct textual descriptions, with direct engagement revealing 3D models responsive to sound intensity. Space debris primarily comprises remnants from artificial satellites and other space objects. To enhance intrigue, I integrated commonplace items into the visual narrative. This symbolizes the omnipresence of space debris in our surroundings and underscores the inevitability of humans being part of this cycle. This phenomenon emphasizes the urgent need for heightened awareness and proactive solutions.`,
  },
  {
    id: 'p7',
    title: 'Jujube Universe',
    projectType: 'Individual Project',
    category: 'Video',
    year: '2023',
    location: 'Korea',
    
    // 📂 폴더: public/images/jujube/
    imageUrl: '/images/jujube/main.png', // [파일교체시]: '/images/jujube/main.jpg'
    videoUrl: 'https://vimeo.com/863884778', // [파일교체시]: '/images/jujube/video.mp4' (또는 비메오)
    galleryUrls: [
      //'https://picsum.photos/600/450?grayscale', // [파일교체시]: '/images/jujube/01.jpg'
      //'https://picsum.photos/600/450?grayscale&blur=2'
    ],
    description: `This work is an expansion of the view of the jujube. I thought that the structure of the jujube's supergene is like a galaxy in the universe and gave it a new personality, which I linked to a meteorite that fell to earth.

In this artwork, the jujube serves as a prominent motif that will greatly influence the future of humanity, symbolizing a fervent desire to extensively study jujubes as one of the Super Seeds that could potentially save humanity.`,
  },
  {
    id: 'p8',
    title: 'Seed Capsule',
    projectType: 'Individual Project',
    category: 'Interactive VR',
    year: '2023',
    location: 'Korea',
    
    // 📂 폴더: public/images/seed-capsule/
    imageUrl: '/images/seed-capsule/main.png', // [파일교체시]: '/images/seed-capsule/main.jpg'
    videoUrl: 'https://vimeo.com/916853940', // [파일교체시]: '/images/seed-capsule/vr-demo.mp4' (또는 비메오)
    galleryUrls: [
      //'https://picsum.photos/seed/seedcapsule1/600/400?grayscale', // [파일교체시]: '/images/seed-capsule/01.jpg'
      //'https://picsum.photos/seed/seedcapsule2/600/400?grayscale'
    ],
    description: `This work revolves around the concept of a 'Seed Capsule,' which serves as a repository for memories. The term 'Seed' carries dual meaning, representing a device that stores objects, backgrounds, and environments from the past, encapsulating memories.

This work takes the form of an interactive VR experience, comprising rooms with different environments. By clicking on cubes, users can trigger sounds or move to the next room, allowing them to explore three rooms containing objects imbued with memories and stories.`,
  },
  {
    id: 'p9',
    title: 'Vom Blick',
    projectType: 'Individual Project',
    category: 'Video',
    year: '2023',
    location: 'Korea',
    
    // 📂 폴더: public/images/vom-blick/
    imageUrl: '/images/vom-blick/main.png', // [파일교체시]: '/images/vom-blick/thumbnail.jpg'
    videoUrl: 'https://vimeo.com/916350613', // [파일교체시]: '/images/vom-blick/video.mp4' (또는 비메오)
    galleryUrls: [
      //'https://picsum.photos/600/350?grayscale', // [파일교체시]: '/images/vom-blick/01.jpg'
      //'https://picsum.photos/600/350?grayscale&blur=2'
    ],
    description: `This work delves into a recurring theme that runs throughout the series of works in 2023, relentlessly probing the notion of the 'gaze' and challenging the notion of unquestioningly accepting the human perspective.

I steer the narrative of the video by vigilantly considering when I view things through an anthropocentric lens and when I passively embrace it without scrutiny.`,
  },
  {
    id: 'p10',
    title: 'Oensa Ant',
    projectType: 'Individual Project',
    category: 'Video',
    year: '2022',
    location: 'Korea',
    
    // 📂 폴더: public/images/oensa-ant/
    imageUrl: '/images/oensa-ant/main.png', // [파일교체시]: '/images/oensa-ant/thumbnail.jpg'
    videoUrl: 'https://vimeo.com/860863523', // [파일교체시]: '/images/oensa-ant/video.mp4' (또는 비메오)
    galleryUrls: [
      //'https://picsum.photos/600/400?grayscale', // [파일교체시]: '/images/oensa-ant/01.jpg'
      //'https://picsum.photos/600/400?grayscale&blur=2'
    ],
    description: `This work is connected to the 'Antio' project and involves the virtual study of the most important creature in that project, the 'Oensa Ant'. This ant has the ability to secrete a substance called 'Perotox', which has the power to purify the environment.

In a dystopian setting, it is the only living being capable of saving humanity, and humans once again rely on the strength of this small creature to survive. In this work, the ant becomes a more important being than humans, prompting a reevaluation of its status. However, it also highlights the duality of humans' relationship with non-human life forms, as the ant is sometimes exploited by humans despite its crucial role.`,
  }
];

export const CERAMICS = [
  {
    id: 'c1',
    title: 'Kitty Mug',
    category: 'Clay',
    year: '2025',
    description: 'A handcrafted ceramic cup with a cat-shaped handle',
    imageUrl: '/images/ceramics/01.JPG',
    galleryUrls: [
      '/images/ceramics/02.JPG'
      //'/images/ceramics/residue01-2.jpg',
      //'/images/ceramics/residue01-3.jpg',
    ],
  },

  {
    id: 'c2',
    title: 'Pixel Cat Cup',
    category: 'Porcelain',
    year: '2025',
    description: 'A cup with pixel-style cats.',
    imageUrl: '/images/ceramics/03.PNG'
  },

  {
    id: 'c3',
    title: 'Vivid porcelain cup',
    category: 'Porcelain',
    year: '2025',
    description: 'A vivid porcelain cup',
    imageUrl: '/images/ceramics/04.JPG'
  },

  {
    id: 'c4',
    title: 'Ghost Accessory Holder',
    category: 'Clay',
    year: '2025',
    description: 'A little ghost accessory holder',
    imageUrl: '/images/ceramics/05.JPG'
  },

    {
    id: 'c5',
    title: 'Lemon Juicer',
    category: 'Clay',
    year: '2025',
    description: 'A lemon-shaped fruit juicer',
    imageUrl: '/images/ceramics/06.JPG',
        galleryUrls: [
      '/images/ceramics/07.JPG',
      //'/images/ceramics/residue01-3.jpg',
    ],
  },

  {
    id: 'c6',
    title: 'Wave Foam Plate',
    category: 'Clay',
    year: '2025',
    description: 'A plate with a wave-foam pattern',
    imageUrl: '/images/ceramics/08.JPG',
        galleryUrls: [
      '/images/ceramics/09.JPG',
      //'/images/ceramics/residue01-3.jpg',
    ],
  },

  {
    id: 'c7',
    title: 'Forsythia Cup',
    category: 'Porcelain',
    year: '2025',
    description: 'A spring forsythia cup',
    imageUrl: '/images/ceramics/10.JPG',
  },

  {
    id: 'c8',
    title: 'Take-out Cup',
    category: 'Clay',
    year: '2025',
    description: 'A handcrafted take-out cup',
    imageUrl: '/images/ceramics/11.JPG',
  },
];


export const WRITINGS: Writing[] = [
  {
    id: 'w1',
    title: "The Right Not To Be Sensed",
    date: "Sep 2024",
    summary: "Exploring privacy in an age of hyper-surveillance through the lens of quantum physics.",
    content: `In an era defined by hyper-surveillance and data extraction, the act of remaining unseen has become a radical form of resistance. The "Right Not To Be Sensed" explores the intersection of privacy, quantum physics, and digital ethics.

    Just as the observer effect in quantum mechanics states that measuring a particle changes its state, the constant digital observation of human behavior fundamentally alters the nature of human existence. When every movement, heartbeat, and facial micro-expression is cataloged, analyzed, and monetized, the self ceases to be an autonomous entity and becomes a data point in a predictive model.

    This essay argues that true privacy is no longer about hiding information but about claiming the right to exist without being measured. It is a plea for the preservation of the "uncollapsed state"—the potentiality of being that exists before interpretation and categorization. By examining the ways in which invisible infrastructures of sensing permeate our daily lives, we can begin to imagine a new kind of human right: the right to remain indeterminate.`
  },
  {
    id: 'w2',
    title: "Materiality of Emotion",
    date: "Jan 2024",
    summary: "How grief and joy physically alter the spaces we inhabit.",
    content: `Emotions are often dismissed as fleeting, intangible internal states. However, this text proposes that emotions possess a distinct materiality—a physical weight that alters the spaces we inhabit.

    Consider the atmosphere of a room after an argument, or the residual warmth in a space recently filled with laughter. These are not merely psychological projections but tangible shifts in the energetic composition of the environment. Grief, in particular, manifests as a density, a heaviness that seems to displace air. Joy, conversely, operates as a vibration, a loosening of molecular bonds.

    Drawing on concepts from new materialism and affect theory, "Materiality of Emotion" investigates how human feelings leave residues on objects and architecture. It asks: If emotions are physical, can they be fossilized? Can we excavate the emotional history of a place just as we excavate its geological layers? By treating emotion as matter, we open up new possibilities for understanding the interaction between the human psyche and the physical world.`
  },
  {
    id: 'w3',
    title: "Invisible Inhabitants",
    date: "Nov 2023",
    summary: "A study on microbial life and its impact on architectural theory.",
    content: `Architecture has traditionally been designed for the human scale, prioritizing human comfort and aesthetics. Yet, our built environments are teeming with invisible inhabitants—microbes, fungi, and microscopic organisms—that coexist with us in intimate proximity.

    "Invisible Inhabitants" challenges the anthropocentric view of architecture by highlighting the agency of these non-human actors. Rather than sterilizing our spaces to exclude them, what if we designed architectures of coexistence? This essay examines the concept of "bio-receptive design," where materials are chosen to host and nurture specific microbial communities that contribute to the health of the ecosystem.

    By acknowledging the trillions of invisible lives that share our spaces, we shift from a perspective of dominance to one of symbiosis. The walls are not inert barriers but living skins; the air is not empty space but a medium of biological exchange. Recognizing these invisible neighbors forces us to rethink the boundaries of the "home" and the definition of "occupant."`
  }
];
