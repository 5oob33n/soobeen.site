import { Project, MenuItem, CVItem } from './types';

/*
  [🗂️ 파일 관리 및 폴더 구조 가이드]

  프로젝트별로 파일이 섞이지 않도록, 아래와 같이 폴더를 나누어 관리하는 것을 추천합니다.
  프로젝트 루트의 'public' 폴더 안에 아래 구조대로 폴더를 만드세요.

  public/
   └── images/
        ├── autopsy/            (Autopsy of Sensing)
        ├── resonair/           (Resonair)
        ├── afropolik/          (Afropolik)
        ├── antio/              (Antio)
        ├── echoia/             (Echoia)
        ├── object-metamorphosis/ 
        ├── debris-tracer/      
        ├── jujube/             
        ├── seed-capsule/       
        ├── vom-blick/          
        ├── oensa-ant/          
        ├── devouring-voices/   (Devouring Voices)
        └── ceramics/           (도자 작업)

  * 파일을 넣은 후, 아래 코드에서 주석(// [파일교체시]...)에 적힌 경로로 imageUrl 값을 변경하세요.
  * 경로는 항상 '/images/...' 로 시작해야 합니다.
*/

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Projects', id: 'projects' },
  { label: 'Ceramics', id: 'ceramics' },
  { label: 'BIO', id: 'bio' },
  { label: 'Contact', id: 'contact' },
];

export const MENU_ITEMS_KO: MenuItem[] = [
  { label: '프로젝트', id: 'projects' },
  { label: '세라믹', id: 'ceramics' },
  { label: '소개', id: 'bio' },
  { label: '연락처', id: 'contact' },
];

export const BIO_PROFILE = {
  name: "Soobeen Woo",
  nameKo: "우수빈",
  title: "Media Artist",
  titleKo: "미디어 아티스트",
  location: "Bremen, Germany / Daegu & Busan, Korea",
  locationKo: "브레멘, 독일 / 대구·부산, 한국",
  email: "soobeen.work@gmail.com"
};

export const CONTACT_INFO = {
  email: "soobeen.work@gmail.com",
  links: [
    { label: "Instagram", url: "https://www.instagram.com/5oob33n/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/soobeen-woo/" },
    { label: "SoundCloud", url: "https://soundcloud.com/youxfromisland" }
  ]
};

export const BIO_TEXT = [
  "Soobeen Woo is an artist who treats sound, vibration, and material as archaeological strata rather than expressive media. Her interest lies in the traces left before existence becomes visible or linguistic — through micro-vibrations, erased voices, and non-human sensory structures.",
  "Her installations function not as representations but as sites of excavation. Sound, ceramics, vibration systems, text, and virtual environments each operate as evidence fields, where what has disappeared, failed to register, or resisted perception resurfaces in the form of fragments and residues. These elements shift, erode, and dissolve in response to proximity, body heat, breath, air movement, and time.",
  "Her current research centers on unfired clay — a material that retains the possibility of returning to the environment. Clay becomes a site of evidence: absorbing sound and vibration, then dispersing them again. The process of gathering natural matter directly from the land and experimenting with it as material comes close to an act of excavation — one in which what has disappeared returns in the form of a trace.",
  "This practice explores the unstable boundary between perception and existence. It questions the assumption that to exist is to be sensed, addressing the right not to be perceived, human emotion as material intrusion, and the ways non-human beings inhabit the world through traces rather than presence."
];

export const BIO_TEXT_KO = [
  "우수빈은 사운드, 진동, 물질을 표현 매체가 아닌 고고학적 지층으로 다루는 작가다. 존재가 가시화되거나 언어화되기 이전 — 미세한 진동, 지워진 목소리, 비인간적 감각 구조 — 이 남기는 흔적에 관심을 둔다.",
  "설치 작업은 재현이 아닌 발굴지로 기능한다. 사운드, 도자, 진동 시스템, 텍스트, 가상 환경은 각각 증거의 장으로 작동하며, 사라진 것, 인식되지 못한 것, 지각에 저항했던 것이 파편과 잔류물의 형태로 되살아난다. 이 요소들은 근접성, 체온, 호흡, 기류, 시간에 반응하며 변화하고 마모되고 소멸한다.",
  "현재는 '소성하지 않은 흙'을 중심으로 연구를 이어가고 있다. 언젠가 다시 환경으로 돌아갈 수 있는 물질로서의 흙은, 소리와 진동을 머금었다가 다시 흩어지는 하나의 증거 현장이 된다. 자연 지물을 직접 채집하고 재료로 실험하는 과정은, 사라진 것이 흔적의 형태로 되돌아오는 발굴의 행위에 가깝다.",
  "이 작업은 지각과 존재 사이의 불안정한 경계를 탐구한다. 존재한다는 것이 곧 감지된다는 가정에 의문을 제기하며, 지각받지 않을 권리, 물질로서의 인간 감정, 흔적을 통해 세계에 깃드는 비인간 존재의 방식을 함께 살핀다."
];

export const CV_LABELS = {
  en: {
    education: 'Education',
    exhibitions: 'Exhibitions & Performances',
    awards: 'Awards & Grants',
    experience: 'Experience',
    work: 'Work',
    contributions: 'Contributions',
    contact: 'Contact',
    contactLabel: 'Contact',
    back: '← Back to List',
    viewProject: 'View Project',
    close: 'Close',
    type: 'Type',
    category: 'Category',
    materials: 'Materials',
    yearLocation: 'Year / Location',
    exhibitedAt: 'Exhibited At',
    credits: 'Credits',
    soundRecord: 'Sound Record',
    videoDoc: 'Video Documentation',
    comingSoon: 'Coming Soon / To Be Uploaded',
    audioSoon: 'Audio track coming soon',
    viewTitle: {
      projects: 'Projects',
      ceramics: 'Ceramics',
      bio: 'BIO',
      contact: 'Contact',
    } as Record<string, string>,
  },
  ko: {
    education: '학력',
    exhibitions: '전시 및 공연',
    awards: '수상 및 지원',
    experience: '경력',
    work: '활동',
    contributions: '기여',
    contact: '연락처',
    contactLabel: '연락처',
    back: '← 목록으로',
    viewProject: '프로젝트 보기',
    close: '닫기',
    type: '유형',
    category: '카테고리',
    materials: '재료',
    yearLocation: '연도 / 장소',
    exhibitedAt: '전시',
    credits: '크레딧',
    soundRecord: '사운드 기록',
    videoDoc: '영상 기록',
    comingSoon: '준비 중',
    audioSoon: '오디오 준비 중',
    viewTitle: {
      projects: '프로젝트',
      ceramics: '세라믹',
      bio: '소개',
      contact: '연락처',
    } as Record<string, string>,
  },
};

export const EDUCATION: CVItem[] = [
  {
    year: "2023-2026",
    degree: "BFA, Digital Media",
    school: "HfK Bremen (University of Arts Bremen)",
    title: "HfK Bremen", 
    location: "Germany"
  }
];

export const EXHIBITIONS: CVItem[] = [
  { year: 2026, title: "RETURN OF THE GIZMOS", location: "Güterbahnhof Tor 26, Bremen, Germany" },
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
  { year: "2025-2026", title: "Videographer (Studentische Hilfskraft)", company: "DFKI Bremen", location: "Bremen, Germany" },
  { year: 2025, title: "Curator", company: "Lichtrouten 2025", location: "Lüdenscheid, Germany" },
  { year: "2024-present", title: "Guest Editor", company: "2room Magazine (Webzine)" },
  { year: "2021-2023", title: "Editor", company: "Wesang Company: Magazine maat", location: "Seoul, South Korea" }
];

export const CONTRIBUTIONS: CVItem[] = [
  { year: 2025, title: "That's My Neighbour", description: "3D Modeling & Animation, The File Room, Busan, South Korea" },
  { year: 2024, title: "Ouroboros", description: "CGI & AI generated image, Hara Shin, Seoul, South Korea" }
];

export const EDUCATION_KO: CVItem[] = [
  {
    year: "2023-2026",
    degree: "BFA, 디지털 미디어",
    school: "HfK Bremen (University of Arts Bremen)",
    title: "HfK Bremen",
    location: "독일"
  }
];

export const EXHIBITIONS_KO: CVItem[] = [
  { year: 2026, title: "RETURN OF THE GIZMOS", location: "Güterbahnhof Tor 26, 브레멘, 독일" },
  { year: 2025, title: "ONE PIECE", description: "Choreographed by the Machines", location: "NebenFlut, HfK Bremen, 브레멘, 독일" },
  { year: 2025, title: "Lichtrouten 2025", location: "뤼덴샤이트, 독일" },
  { year: 2025, title: "BLAUES RAUSCHEN 2025", description: "퍼포먼스, Philharmonie Essen, 에센, 독일" },
  { year: 2025, title: "Hochschultage 2025", location: "HfK Bremen, 브레멘, 독일" },
  { year: 2024, title: "MAP 2024 - POSTER SERIES", description: "하노이 거리의 이동성을 주제로 한 예술 프로젝트 (GHTK 협업)", location: "하노이 시내, 베트남" },
  { year: 2024, title: "Goldstücke 2024 - Licht Kunst Projekte Gelsenkirchen", location: "겔젠키르헨, 독일" },
  { year: 2024, title: "Lichter der City", description: "프로젝션 매핑", location: "브레멘, 독일" },
  { year: 2022, title: "Korea-Thai-Japan NFT Festival", description: "Team Invisible", location: "Uncommon Gallery, 서울, 한국" },
  { year: 2018, title: "YCK F 2018 (Young Creativ Korea F)", location: "Ara Art Center, 서울, 한국" }
];

export const AWARDS_KO: CVItem[] = [
  { year: 2025, title: "Open Space - Domshof", description: "VJ 퍼포먼스, 브레멘, 독일" },
  { year: 2024, title: "Dreaming Streams", description: "Goldstücke - Licht Kunst Projekte Gelsenkirchen Diplopia 공모, Team KIS, 겔젠키르헨, 독일" },
  { year: 2024, title: "Open Space - Domshof", description: "VJ 퍼포먼스, 브레멘, 독일" }
];

export const EXPERIENCES_KO: CVItem[] = [
  { year: 2025, title: "VJ-ing Workshop", description: "Xenorama Studio, 브레멘, 독일" },
  { year: 2025, title: "BLAUES RAUSCHEN 2025", description: "데이터 윤리와 창작 실천 - 비평 워크숍, 에센, 독일" },
  { year: 2024, title: "MAP 2024 - Movement", description: "HfK Bremen & Heritage Art Space - 하노이, 베트남, 브레멘, 독일" },
  { year: 2024, title: "VJ-ing Workshop", description: "We Dig it + Xenorama Studio, 브레멘, 독일" },
  { year: 2023, title: "Projection Mapping Workshop", description: "We Dig it + Xenorama Studio, 브레멘, 독일" },
  { year: 2022, title: "Seminar & Hackathon", description: "Web 3.0 시대의 디지털 온라인 환경에서의 창작, Art Collider - 한국예술종합학교, 서울, 한국" }
];

export const WORK_KO: CVItem[] = [
  { year: "2025-2026", title: "영상 촬영 (학생 보조원)", company: "DFKI Bremen", location: "브레멘, 독일" },
  { year: 2025, title: "큐레이터", company: "Lichtrouten 2025", location: "뤼덴샤이트, 독일" },
  { year: "2024-현재", title: "객원 편집자", company: "2room Magazine (Webzine)" },
  { year: "2021-2023", title: "편집자", company: "Wesang Company: Magazine maat", location: "서울, 한국" }
];

export const CONTRIBUTIONS_KO: CVItem[] = [
  { year: 2025, title: "That's My Neighbour", description: "3D 모델링 & 애니메이션, The File Room, 부산현대미술관, 부산, 한국" },
  { year: 2024, title: "Ouroboros", description: "CGI & AI 생성 이미지, Hara Shin, 서울, 한국" }
];

/** Bump the `?v=` number when you replace files under public/images/devouring-voices/ (cache bust). */
const DV_IMG = (path: string) => `${path}?v=4`;

export const PROJECTS: Project[] = [
  {
    id: 'p12',
    title: 'Residual, Unfelt',
    projectType: 'Individual Project',
    category: 'Sound Installation / Speculative Sensing System',
    categoryKo: '사운드 설치 / 추측적 감지 시스템',
    year: '2026',
    location: 'Germany',
    materials:
      'Unfired clay, agar, copper rods and wire, modified piezo sensors, suspended weights, Teensy 4.1, Audio Shield, custom processing boards, patch bay, speakers; three probing objects, each 30 × 10 cm',
    materialsKo:
      '소성하지 않은 흙, 한천, 구리봉과 구리선, 개조한 피에조 센서, 추, Teensy 4.1, Audio Shield, 커스텀 프로세싱 보드, 패치 베이, 스피커; 프로빙 오브젝트 3점, 각 30 × 10 cm',
    imageUrl: '/images/residual-unfelt/DSC083752.JPG',
    galleryUrls: [
      '/images/residual-unfelt/DSC08374.JPG',
      '/images/residual-unfelt/DSC08375.JPG',
      '/images/residual-unfelt/DSC08324.JPG',
    ],
    description: `Residual, Unfelt investigates how human-made infrastructures and material transformations become recorded within the Earth's strata over time. Rather than treating geological layers as passive formations produced only by natural processes, the work considers the Earth as an active material archive that continuously receives, stores, and transforms vibrations, pressure, extraction, construction, and other traces of human activity. It asks: how are human-made materials recorded within the Earth's material layers, regardless of human intention?

Three probing objects inspired by geological core samples translate subtle environmental vibrations into a slowly changing sonic environment. Each object contains three piezo sensors beneath layered slabs of unfired clay and agar. Visitors do not trigger an immediate response. Their footsteps, movements, and presence gradually alter an existing composition, mirroring the extended timescales through which traces accumulate within geological strata. The sound is not presented as the Earth's literal voice, but as a speculation on how imperceptible material responses might become audible.

MATERIAL EXPERIMENTS

The work emerged from nearly two months of experiments combining clay and agar at different ratios. Nine slabs were produced using agar concentrations of 6%, 8.3%, and 15%. Clay brings soil, sediment, and geological formation into the composite, while agar - a biomaterial derived from marine algae - introduces moisture, growth, decay, and continuous transformation. As the slabs dried, each concentration produced different patterns of cracking, shrinkage, opacity, deformation, and biological growth. These changes were understood not as defects, but as material records generated through time and environmental conditions.

PROTOTYPE & SOUND SYSTEM

The first prototype combined all nine slabs into one large core-sample structure. Because the clay-agar composite absorbed much of the vibration energy, piezo signals remained weak. The sensing structure was therefore redesigned: a needle was attached above each piezo, with a small weight suspended beneath it by copper wire to create tension and amplify subtle movement. Copper rods were added as both structural supports and efficient vibration conductors. Through this process, the forms shifted from sculptures toward speculative geological probes.

The final system connects nine piezo sensors to three processing boards and a central Teensy 4.1 with an Audio Shield. Instead of directly triggering sounds, the sensors gradually influence layers of a composition: a 17-45 Hz sub-drone evokes deep geological movement; shifting tones suggest pressure, friction, and tension; filtered noise carries muffled material motion; and high-frequency leakage tones introduce traces of human-made infrastructure. Each influence decays slowly, giving the system a memory-like behavior. The exposed electronics, wiring, sensing elements, and patch connections reveal how invisible vibrations are gathered and transformed rather than concealing the process.

Residual, Unfelt proposes that recording extends beyond cameras, sensors, and digital storage. It approaches the Earth itself as a medium - one that keeps registering human activity long after its immediate causes disappear. Rather than asking what humans record about the Earth, the work asks what the Earth may already be recording about us.`,
    descriptionKo: `Residual, Unfelt는 인간이 만든 인프라와 물질적 변형이 시간이 흐르며 지구의 지층 안에 어떻게 기록되는지를 탐구합니다. 지질층을 자연 과정만으로 만들어진 수동적 형성물로 바라보는 대신, 진동과 압력, 채굴과 건설을 비롯한 인간 활동의 흔적을 지속해서 받아들이고 저장하며 변형하는 능동적인 물질 아카이브로서 지구를 바라봅니다. 작업은 묻습니다. 인간의 의도와 무관하게, 인간이 만든 물질은 지구의 물질적 층위 안에 어떻게 기록되는가?

지질 코어 샘플에서 영감을 얻은 세 개의 프로빙 오브젝트는 환경의 미세한 진동을 서서히 변화하는 음향 환경으로 번역합니다. 각 오브젝트에는 소성하지 않은 흙과 한천으로 만든 층 아래에 세 개의 피에조 센서가 설치되어 있습니다. 관객의 행동은 즉각적인 반응을 일으키지 않습니다. 발걸음과 움직임, 물리적 현존은 이미 존재하는 사운드 구성을 점진적으로 변화시키며, 흔적이 긴 시간에 걸쳐 지층 안에 축적되는 과정을 닮아갑니다. 여기서 사운드는 지구의 목소리를 직접 재현하는 것이 아니라, 인간의 감각 너머에 있는 물질적 반응이 어떻게 들릴 수 있을지를 상상합니다.

재료 실험

작업은 약 두 달간 흙과 한천의 비율을 달리한 실험에서 출발했습니다. 6%, 8.3%, 15%의 서로 다른 한천 농도로 총 아홉 개의 슬래브를 제작했습니다. 흙이 토양과 퇴적, 지질 형성을 가리킨다면 해조류에서 유래한 생체 재료인 한천은 수분과 성장, 부패, 지속적인 변형의 성질을 더합니다. 건조가 진행되면서 각 농도는 서로 다른 균열과 수축, 투명도, 변형, 생물학적 성장의 패턴을 만들었습니다. 이러한 변화는 결함이 아니라 시간과 환경 조건이 생성한 물질적 기록으로 다루어졌습니다.

프로토타입과 사운드 시스템

첫 프로토타입은 아홉 개의 슬래브를 하나의 큰 코어 샘플 구조로 결합했습니다. 그러나 흙과 한천의 복합 재료가 진동 에너지의 상당 부분을 흡수해 피에조 신호가 약하게 나타났습니다. 이에 각 피에조 위에는 바늘을 부착하고, 아래에는 구리선으로 작은 추를 매달아 장력을 만들고 미세한 움직임을 증폭하도록 감지 구조를 다시 설계했습니다. 구리봉은 구조적 지지대이자 진동을 효율적으로 전달하는 요소로 추가되었습니다. 이 과정을 거치며 형태는 조각에서 추측적 지질 탐침에 가까운 모습으로 변화했습니다.

최종 시스템은 아홉 개의 피에조 센서와 세 개의 프로세싱 보드, Audio Shield가 장착된 Teensy 4.1을 연결합니다. 센서는 개별 사운드를 즉시 재생하는 대신, 구성된 사운드 레이어에 점진적으로 영향을 줍니다. 17-45Hz의 서브 드론은 지하 깊은 곳의 움직임을, 천천히 이동하는 음은 압력과 마찰 및 지질학적 긴장을, 필터링된 노이즈는 직접 감지되지 않는 물질의 움직임을 표현합니다. 고주파 누설음은 풍경 속에 스며든 인공 인프라의 흔적을 더합니다. 각 변화는 곧바로 사라지지 않고 천천히 감쇠하며 시스템에 기억과 같은 성질을 만듭니다. 전자 부품과 배선, 센서와 패치 연결은 감추지 않고 드러내어 보이지 않는 진동이 수집되고 변환되는 과정을 보여줍니다.

Residual, Unfelt는 기록이 카메라와 센서, 디지털 저장 장치에만 머물지 않는다고 제안합니다. 지구 자체를 하나의 매체로 바라보며, 직접적인 원인이 사라진 뒤에도 인간 활동을 계속 기록하는 물질 시스템으로 접근합니다. 작업은 인간이 지구에 관해 무엇을 기록하는지가 아니라, 지구가 이미 우리에 관해 무엇을 기록하고 있는지를 묻습니다.`,
    detailSections: [
      {
        title: 'Artist Statement',
        titleKo: '작품 개요',
        body: `Residual, Unfelt investigates how human-made infrastructures and material transformations become recorded within the Earth's strata over time. Geological layers are approached not as passive formations produced solely by natural processes, but as active archives that continuously accumulate traces of human activity. Every vibration, pressure, extraction, and construction contributes to material changes that may remain imperceptible while continuing to exist long after their immediate causes have disappeared.

Three probing objects inspired by geological core samples detect subtle environmental vibrations and translate them into sound. The system does not produce an immediate response. Instead, vibrations accumulate and gradually transform an existing sonic environment, mirroring the slow processes through which traces become embedded within geological strata. The sound is not the Earth's literal voice, but a speculation on how accumulated material responses might become perceptible.`,
        bodyKo: `Residual, Unfelt는 인간이 만든 인프라와 물질적 변형이 시간이 흐르며 지구의 지층 안에 어떻게 기록되는지를 탐구합니다. 지질층을 자연 과정만으로 형성된 수동적 구조가 아니라, 인간 활동의 흔적을 지속해서 축적하는 능동적 아카이브로 바라봅니다. 진동과 압력, 채굴과 건설은 당장 감지되지 않더라도 물질을 변화시키며, 직접적인 원인이 사라진 뒤에도 지구 안에 남습니다.

지질 코어 샘플에서 영감을 얻은 세 개의 프로빙 오브젝트는 환경의 미세한 진동을 감지해 사운드로 번역합니다. 시스템은 즉각 반응하지 않습니다. 진동이 축적되면서 이미 존재하는 음향 환경을 서서히 변화시키고, 흔적이 긴 시간에 걸쳐 지층 안에 새겨지는 과정을 닮아갑니다. 여기서 사운드는 지구의 실제 목소리가 아니라, 축적된 물질의 반응이 어떻게 감각될 수 있을지를 상상하는 장치입니다.`,
        images: [
          {
            url: '/images/residual-unfelt/final-objects-group.png',
            caption: 'Three final probing objects made from layered clay-agar slabs and copper rods.',
            captionKo: '흙-한천 슬래브와 구리봉으로 제작한 세 개의 최종 프로빙 오브젝트.'
          }
        ],
        layout: 'wide'
      },
      {
        title: 'Material & Process',
        titleKo: '재료와 제작 과정',
        body: `The material research began with a question about fired ceramics. Although clay is a natural material, firing makes ceramic objects permanent and difficult to reshape or reuse. Unfired clay offered an alternative that could remain in continuous transformation. Agar, a gelatinous biomaterial derived from marine algae, introduced moisture, growth, decay, and a contrasting temporal behavior.

For nearly two months, clay and agar were combined at different ratios. Nine slabs were produced with agar concentrations of 6%, 8.3%, and 15%. Agar powder was dissolved in water and heated into a viscous solution, then combined with clay slip and poured into plaster molds. Rather than treating the two substances separately, the experiments formed a composite system in which geological and biological processes could coexist.`,
        bodyKo: `재료 연구는 소성 도자에 대한 질문에서 시작했습니다. 흙은 자연 재료지만 소성된 도자는 영구적인 물질이 되어 다시 형태를 바꾸거나 재사용하기 어렵습니다. 이에 지속적으로 변화할 수 있는 대안으로 소성하지 않은 흙을 선택했습니다. 해조류에서 유래한 젤 형태의 생체 재료인 한천은 수분과 성장, 부패, 그리고 흙과 다른 시간성을 작업 안에 도입합니다.

약 두 달 동안 흙과 한천의 비율을 달리하며 실험했습니다. 6%, 8.3%, 15%의 한천 농도로 총 아홉 개의 슬래브를 제작했습니다. 한천 분말을 물에 녹여 가열해 점성 용액을 만들고, 이를 흙 슬립과 섞어 석고 몰드에 부었습니다. 두 재료를 분리된 물질로 다루는 대신, 지질학적 과정과 생물학적 과정이 공존하는 하나의 복합 시스템으로 접근했습니다.`,
        images: [
          {
            url: '/images/residual-unfelt/process-agar-clay.jpg',
            caption: 'Agar solution and clay prepared before mixing.',
            captionKo: '혼합 전 준비한 한천 용액과 흙.'
          },
          {
            url: '/images/residual-unfelt/process-mixing.jpg',
            caption: 'Combining the heated agar solution with clay slip.',
            captionKo: '가열한 한천 용액과 흙 슬립을 혼합하는 과정.'
          },
          {
            url: '/images/residual-unfelt/process-poured-mold.jpg',
            caption: 'The clay-agar mixture poured into a plaster mold.',
            captionKo: '석고 몰드에 부은 흙-한천 혼합물.'
          },
          {
            url: '/images/residual-unfelt/process-pigment-mold.jpg',
            caption: 'A pigmented mixture in the mold during early material tests.',
            captionKo: '초기 재료 실험에서 안료를 섞어 몰드에 부은 모습.'
          }
        ]
      },
      {
        title: 'Material Transformation',
        titleKo: '물질의 변화',
        body: `The slabs were never intended as static sculptures. Drying, cracking, shrinkage, changes in opacity, surface deformation, and biological growth continued throughout the project. Each agar concentration produced a distinct drying behavior. In some samples, mold appeared because of agar's biological properties. These changes were not treated as defects, but as evidence generated by time, environmental conditions, and the interaction between clay and agar. The material itself became a model for geological recording as a gradual process of accumulation and transformation.`,
        bodyKo: `슬래브는 고정된 조각이 아니었습니다. 건조와 균열, 수축, 투명도의 변화, 표면 변형과 생물학적 성장은 프로젝트 내내 계속되었습니다. 한천 농도에 따라 서로 다른 건조 양상이 나타났고, 일부 샘플에는 한천의 생물학적 성질로 인해 곰팡이가 형성되었습니다. 이러한 변화는 결함이 아니라 시간과 환경 조건, 흙과 한천의 상호작용이 만들어낸 증거로 다루었습니다. 물질 자체가 점진적인 축적과 변형으로 이루어지는 지질학적 기록의 모델이 되었습니다.`,
        images: [
          {
            url: '/images/residual-unfelt/material-early.png',
            caption: 'A clay-agar sample in an early stage of drying.',
            captionKo: '건조 초기 단계의 흙-한천 샘플.'
          },
          {
            url: '/images/residual-unfelt/material-mold-growth.png',
            caption: 'Moisture retention and biological growth visible on the surface.',
            captionKo: '표면에 나타난 수분의 잔류와 생물학적 성장.'
          },
          {
            url: '/images/residual-unfelt/material-cracking.png',
            caption: 'Cracks and layered traces produced through drying.',
            captionKo: '건조 과정에서 형성된 균열과 층위의 흔적.'
          },
          {
            url: '/images/residual-unfelt/material-comparison.png',
            caption: 'Three samples showing different surface conditions and drying patterns.',
            captionKo: '서로 다른 표면 상태와 건조 패턴을 보여주는 세 개의 샘플.'
          }
        ]
      },
      {
        title: 'Prototype Development',
        titleKo: '프로토타입 개발',
        body: `The initial plan combined all nine slabs into one large form based on a geological core sample. Piezo sensors were attached directly to the structure to test how vibrations could be detected and translated into sound. The composite, however, absorbed much of the vibration energy. The resulting signals were weak, and the structure did not produce acoustically useful responses.

The form was divided into three independent probes. Copper rods were introduced as structural supports and as conductive elements that transmit vibration more efficiently. Sketches and renderings tested how the layered slabs, sensors, and weights could be distributed. Through this development, the work shifted from a singular sculptural mass toward a network of speculative scientific instruments.`,
        bodyKo: `초기 계획은 아홉 개의 슬래브를 지질 코어 샘플 형태의 하나의 큰 구조로 결합하는 것이었습니다. 피에조 센서를 구조에 직접 부착해 진동을 감지하고 사운드로 번역하는 실험을 진행했습니다. 그러나 복합 재료가 진동 에너지의 상당 부분을 흡수하면서 신호가 약하게 나타났고, 음향적으로 충분한 반응을 만들지 못했습니다.

이후 형태를 세 개의 독립적인 탐침으로 나누었습니다. 구리봉은 구조적 지지대인 동시에 진동을 더 효율적으로 전달하는 전도 요소로 도입했습니다. 스케치와 렌더링을 통해 층층이 쌓인 슬래브, 센서, 추의 배치를 검토했습니다. 이 과정에서 작업은 하나의 조각적 덩어리에서 추측적 과학 장치의 네트워크로 변화했습니다.`,
        images: [
          {
            url: '/images/residual-unfelt/initial-prototype.jpg',
            caption: 'The first single-body prototype, later abandoned because of structural and sensing limitations.',
            captionKo: '구조와 감지 성능의 한계로 이후 변경된 초기 단일 구조 프로토타입.'
          },
          {
            url: '/images/residual-unfelt/render-initial.png',
            caption: 'Early rendering of the slab-based sensing forms.',
            captionKo: '슬래브 기반 감지 구조의 초기 렌더링.'
          },
          {
            url: '/images/residual-unfelt/sketch-core-structure-1.jpg',
            caption: 'Sketch exploring the separation of slabs and the suspended sensing structure.',
            captionKo: '슬래브 분리와 매달린 감지 구조를 검토한 스케치.'
          },
          {
            url: '/images/residual-unfelt/sketch-core-structure-2.jpg',
            caption: 'Development sketch for three stacked layers on copper rods.',
            captionKo: '구리봉 위 세 개 층을 쌓는 구조의 발전 스케치.'
          },
          {
            url: '/images/residual-unfelt/render-three-probes.png',
            caption: 'Rendering of the three distributed core-sample probes.',
            captionKo: '공간에 분산된 세 개의 코어 샘플 탐침 렌더링.'
          }
        ]
      },
      {
        title: 'Sensing & Technical System',
        titleKo: '감지와 기술 시스템',
        body: `Each of the three probes contains three piezo sensors, making nine sensors across the installation. To increase sensitivity, a needle is positioned above each piezo while a small weight is suspended beneath it with copper wire. The added tension amplifies subtle movement that the clay-agar slabs would otherwise absorb.

Detachable audio connections route the sensors through three processing boards to a central Teensy 4.1 microcontroller with an Audio Shield. The probes can therefore be rearranged or replaced. Electronics, patch connections, wiring, and sensing mechanisms remain exposed, presenting the system as a visible geological measuring device rather than a concealed technical support.`,
        bodyKo: `세 개의 탐침에는 각각 세 개의 피에조 센서가 들어가며, 설치 전체에는 총 아홉 개의 센서가 사용됩니다. 감도를 높이기 위해 각 피에조 위에 바늘을 두고 아래에는 구리선으로 작은 추를 매달았습니다. 이 장력이 흙-한천 슬래브가 흡수하는 미세한 움직임을 증폭합니다.

분리 가능한 오디오 연결을 통해 센서 신호는 세 개의 프로세싱 보드를 거쳐 Audio Shield가 장착된 중앙 Teensy 4.1 마이크로컨트롤러로 전달됩니다. 따라서 탐침을 재배치하거나 교체할 수 있습니다. 전자 부품과 패치 연결, 배선, 감지 구조는 숨기지 않고 노출하여, 기술적 보조 장치가 아니라 작동 원리가 드러나는 지질학적 측정 장치처럼 보이게 했습니다.`,
        images: [
          {
            url: '/images/residual-unfelt/sketch-piezo-weight.jpg',
            caption: 'Sketch of the needle, piezo, copper wire, and suspended-weight mechanism.',
            captionKo: '바늘, 피에조, 구리선, 매달린 추의 구조 스케치.'
          },
          {
            url: '/images/residual-unfelt/piezo-weight.png',
            caption: 'A modified piezo sensor with suspended weights used in the final prototype.',
            captionKo: '최종 프로토타입에 사용된 추 결합형 피에조 센서.'
          },
          {
            url: '/images/residual-unfelt/sound-system-diagram.png',
            caption: 'Signal-flow diagram connecting piezo sensors, processing, Teensy Audio Shield, and speaker.',
            captionKo: '피에조 센서, 프로세싱, Teensy Audio Shield, 스피커를 연결한 신호 흐름도.'
          }
        ]
      },
      {
        title: 'Sound System',
        titleKo: '사운드 시스템',
        body: `The system is not designed as an immediate interactive instrument. Piezo sensors do not trigger individual sounds; each influences parameters within an already existing composition. A 17-45 Hz sub-drone suggests movement deep beneath the Earth's surface. Slowly shifting tonal frequencies evoke pressure, friction, and geological tension. Filtered noise represents muffled material movement, while high-frequency electrical leakage introduces traces of human-made infrastructure.

These changes do not disappear immediately. They decay gradually, creating a memory-like behavior in which human-generated vibrations persist as long-term sonic traces. The resulting environment is neither a direct translation of data nor a representation of nature, but an imagined expression of material processes that unfold beyond ordinary human perception.`,
        bodyKo: `이 시스템은 즉각 반응하는 인터랙티브 악기로 설계되지 않았습니다. 피에조 센서가 개별 사운드를 직접 재생하는 대신, 이미 존재하는 구성의 서로 다른 매개변수에 영향을 줍니다. 17-45Hz의 서브 드론은 지하 깊은 곳의 움직임을 암시하고, 천천히 이동하는 음은 압력과 마찰, 지질학적 긴장을 연상시킵니다. 필터링된 노이즈는 희미한 물질의 움직임을, 고주파 전기 누설음은 인간이 만든 인프라의 흔적을 나타냅니다.

변화는 즉시 사라지지 않고 서서히 감쇠합니다. 이 기억과 같은 작동을 통해 인간이 만든 진동은 장기적인 음향의 흔적으로 남습니다. 결과적인 음향 환경은 데이터를 직접 번역하거나 자연을 재현하는 것이 아니라, 평범한 인간의 지각 너머에서 전개되는 물질 과정을 상상한 표현입니다.`,
        images: [
          {
            url: '/images/residual-unfelt/final-objects-single.png',
            caption: 'One final probe showing the different cracking and drying patterns of its three layers.',
            captionKo: '세 개 층의 서로 다른 균열과 건조 패턴을 보여주는 최종 탐침.'
          },
          {
            url: '/images/residual-unfelt/final-material-details.png',
            caption: 'Surface details preserved as records of time and environmental conditions.',
            captionKo: '시간과 환경 조건의 기록으로 남은 표면의 세부.'
          }
        ]
      },
      {
        title: 'Installation & Exhibition',
        titleKo: '설치와 전시',
        body: `The three probing objects are distributed across the exhibition space with two speakers and the exposed electronic system. Visitors move freely among the probes. Their footsteps, movement, and physical presence enter an ongoing process of accumulation, gradually influencing the sound rather than generating an immediate effect.

The speakers create a distributed sonic field so that sound appears to emerge from the surrounding environment rather than from a single object. Together, the probes, sound, electronics, and visitors form a space in which subtle traces accumulate and become perceptible. Rather than asking what humans record about the Earth, Residual, Unfelt asks what the Earth may already be recording about us.`,
        bodyKo: `세 개의 프로빙 오브젝트는 두 대의 스피커와 노출된 전자 시스템과 함께 전시장 곳곳에 배치됩니다. 관객은 탐침 사이를 자유롭게 이동합니다. 발걸음과 움직임, 물리적 현존은 즉각적인 효과를 만드는 대신 지속적인 축적 과정에 들어가 사운드에 점진적으로 영향을 줍니다.

두 스피커는 하나의 오브젝트가 아니라 주변 환경 전체에서 소리가 나타나는 듯한 분산된 음향장을 만듭니다. 탐침과 사운드, 전자 장치, 관객이 함께 미세한 흔적이 축적되고 감지되는 공간을 형성합니다. Residual, Unfelt는 인간이 지구에 관해 무엇을 기록하는지가 아니라, 지구가 이미 우리에 관해 무엇을 기록하고 있는지를 묻습니다.`,
        images: [
          {
            url: '/images/residual-unfelt/DSC083752.JPG',
            caption: 'Installation view of Residual, Unfelt.',
            captionKo: 'Residual, Unfelt 설치 전경.'
          },
          {
            url: '/images/residual-unfelt/DSC08374.JPG',
            caption: 'Probing objects distributed across the exhibition space.',
            captionKo: '전시장에 분산 배치된 프로빙 오브젝트.'
          },
          {
            url: '/images/residual-unfelt/DSC08375.JPG',
            caption: 'Exposed electronics and sensing structures as integral parts of the installation.',
            captionKo: '설치의 일부로 노출된 전자 장치와 감지 구조.'
          },
          {
            url: '/images/residual-unfelt/DSC08324.JPG',
            caption: 'A visitor encountering the work from within the distributed sonic field.',
            captionKo: '분산된 음향장 안에서 작업을 마주하는 관객.'
          }
        ]
      }
    ]
  },
  {
    id: 'p11',
    title: 'Devouring Voices',
    projectType: 'Individual Project',
    category: 'Sound Interactive Installation',
    categoryKo: '사운드 인터랙티브 설치',
    year: '2026',
    location: 'Germany',
    materials:
      'Ceramic siren sculpture, audio interface, microphone, speakers, Ableton Live, Max/MSP; dimensions variable',
    materialsKo:
      '도자 사이렌 조각, 오디오 인터페이스, 마이크, 스피커, Ableton Live, Max/MSP; 가변 크기',
    imageUrl: DV_IMG('/images/devouring-voices/main.JPG'),
    videoUrl: 'placeholder',
    galleryUrls: [
      DV_IMG('/images/devouring-voices/1.JPG'),
      DV_IMG('/images/devouring-voices/2.JPG'),
      DV_IMG('/images/devouring-voices/3.JPG'),
      DV_IMG('/images/devouring-voices/4.JPG'),
      DV_IMG('/images/devouring-voices/5.JPG'),
      DV_IMG('/images/devouring-voices/6.JPG'),
      DV_IMG('/images/devouring-voices/7.JPG'),
      DV_IMG('/images/devouring-voices/8.JPG'),
    ],
    description: `Devouring Voices dismantles the human voice as a stable carrier of meaning and identity. Instead of transmitting intention, the voice is absorbed, fragmented, and reconfigured within a non-human system. What is spoken does not return as language, but as residue—detached from the speaker, stripped of coherence.

At the center of the installation sits a ceramic siren-like sculpture. A microphone invites visitors to speak, but the system does not respond immediately. Voices are captured, delayed, and unpredictably transformed through Ableton Live and Max/MSP before re-emerging through speakers embedded in the space. The returned sound no longer belongs to the speaker; it circulates as something altered, unstable, and untraceable.

This process foregrounds the loss embedded in every act of transmission. Meaning collapses, identity dissolves, and what remains is a fragmented echo that resists recognition. The work does not preserve the voice—it devours it, displacing it into a space where communication fails and only sonic traces persist.

By confronting the audience with their own dislocated voice, Devouring Voices questions the assumption that speech guarantees presence. Instead, it proposes a condition where expression becomes erosion, and where the act of speaking initiates its own disappearance.`,
    descriptionKo: `Devouring Voices는 인간의 목소리를 안정적인 의미와 정체성의 매개체로서 해체합니다. 목소리는 의도를 전달하는 대신, 비인간적 시스템 안에서 흡수되고 분열되고 재구성됩니다. 발화된 것은 언어가 아닌 잔류물로 되돌아오며—발화자로부터 분리되고 일관성을 잃은 채 남습니다.

설치의 중심에는 도자 사이렌 형상의 조각이 자리합니다. 마이크가 관객의 발화를 유도하지만, 시스템은 즉각적으로 반응하지 않습니다. 목소리는 포착되어 지연되고, Ableton Live와 Max/MSP를 통해 예측 불가능하게 변형된 후 공간 곳곳의 스피커를 통해 재출현합니다. 되돌아온 소리는 더 이상 발화자에게 속하지 않으며, 변형되고 불안정하며 추적 불가능한 무언가로 떠돕니다.

이 과정은 모든 전달 행위에 내재된 상실을 전면에 드러냅니다. 의미가 무너지고 정체성이 해소되며, 남는 것은 인식에 저항하는 파편화된 메아리입니다. 작업은 목소리를 보존하지 않습니다—그것을 삼켜버리고, 소통이 실패하며 오직 음향적 흔적만이 지속되는 공간으로 밀어냅니다.

관객이 자신의 분리된 목소리와 마주하게 함으로써, Devouring Voices는 발화가 현재성을 보장한다는 가정에 의문을 제기합니다. 대신, 표현이 침식이 되고 말하는 행위 자체가 스스로의 소멸을 시작하는 조건을 제안합니다.`,
  },
  {
    id: 'p1',
    title: 'Autopsy of Sensing',
    projectType: 'Individual Project',
    category: 'Performance',
    categoryKo: '퍼포먼스',
    year: '2025',
    location: 'Germany',
    materials: 'Ceramic object (x1), glass object (x1), bone conductor transducers, amplifiers, Ableton/Max for Live',
    materialsKo: '도자 오브젝트 (x1), 유리 오브젝트 (x1), 골전도 트랜스듀서, 앰프, Ableton/Max for Live',
    description: `For a long time, humans have understood perception as a tool to comprehend the world. Only what can be seen, heard, or felt was considered to exist, and perception was used as a means to collect, control, and categorize information. Yet, sensations that are unseen, unheard, and untouchable also operate and exist within the world.

《Autopsy of Sensing》 explores this gap, based on repeated encounters in New Zealand with the deaths of birds—particularly those resulting from collisions with windows—and on the non-visual sensory structures of kiwi and kakapo.

I sonified texts, images, collision data, and photos of the objects using Ableton and Max for Live, and the resulting output is realized as vibrations through two resonating objects: one ceramic and one glass. Each object alludes to the dissected structure of a dead bird, functioning not as a mere reproduction but as a sensory organ that produces distinct resonances.

The vibrations are generated via bone conductor transducers and amplifiers, not to convey messages or meaning, but to remain as fragments of sensation, ghosts of perception that persist even after disappearance.

I unfold the deconstruction and afterlife of sensation through the vibrations and sounds of the two objects, which the audience witnesses but cannot fully interpret. This work records what remains after sensation has vanished—the ghost of perception—and serves as an act of mourning the disappearance and residue of existence.`,
    descriptionKo: `오랫동안 인간은 지각을 세계를 이해하는 도구로 사용해왔습니다. 보이고, 들리고, 느껴지는 것만이 존재하는 것으로 여겨졌으며, 지각은 정보를 수집하고 통제하고 분류하는 수단으로 기능했습니다. 그러나 보이지 않고, 들리지 않고, 만져지지 않는 감각들 또한 세계 안에서 작동하고 존재합니다.

《감각의 해부》는 뉴질랜드에서 반복적으로 마주친 새들의 죽음—특히 유리창 충돌로 인한—과 키위새 및 카카포의 비시각적 감각 구조를 바탕으로, 이 간극을 탐구합니다.

텍스트, 이미지, 충돌 데이터, 그리고 오브젝트 사진들을 Ableton과 Max for Live로 소니파이했고, 그 결과물은 두 개의 공명 오브젝트—도자와 유리—를 통해 진동으로 구현됩니다. 각각의 오브젝트는 해부된 죽은 새의 구조를 암시하며, 단순한 재현이 아닌 독자적인 공명을 생성하는 감각 기관으로 기능합니다.

진동은 골전도 트랜스듀서와 앰프를 통해 발생하며, 메시지나 의미를 전달하기 위한 것이 아니라 감각의 파편으로, 소멸 이후에도 지속되는 지각의 유령으로 남기 위한 것입니다.

관객이 목격하지만 완전히 해석할 수 없는 두 오브젝트의 진동과 소리를 통해, 나는 감각의 해체와 사후를 펼쳐냅니다. 이 작업은 감각이 사라진 후 남는 것—지각의 유령—을 기록하며, 존재의 소멸과 잔류를 애도하는 행위입니다.`,
    imageUrl: '/images/autopsy/main.png',
    audioUrl: '/audio/autopsy-of-sensing.mp3',
    videoUrl: 'https://youtu.be/n8bzN-nxmiI',
    galleryUrls: [
       '/images/autopsy/01.jpg',
    ]
  },
  {
    id: 'p2',
    title: 'Resonair',
    projectType: 'Individual Project',
    category: 'Interactive Installation',
    categoryKo: '인터랙티브 설치',
    materials: 'Ceramic masks (x9), fiber optic cables, LED lights, humidifiers, microphone, speaker, round wooden table',
    materialsKo: '도자 마스크 (x9), 광섬유 케이블, LED 조명, 가습기, 마이크, 스피커, 원형 나무 테이블',
    year: '2025',
    location: 'Germany',
    exhibition: 'LICHTROUTEN Lüdenscheid, March 20 – 29, 2025, Daily from 7:00 PM – 11:00 PM',
    credits: 'Photography: Lars Gonikman, Jennifer Braun',
    imageUrl: '/images/resonair/main.png',
    videoUrl: 'https://vimeo.com/1144115072',
    galleryUrls: [
      '/images/resonair/01.png',
      '/images/resonair/02.png',
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
    descriptionKo: `Resonair는 공기 오염이 만연한 환경 속에서 호흡, 현존, 그리고 소멸의 상호작용을 탐구합니다. 둥근 나무 테이블 위에 하나의 마스크가 놓이고, 그 주위로 여덟 개의 마스크가 빛나는 광섬유 케이블로 연결되어 있습니다. 각각의 마스크는 빛과 수증기를 내뿜으며 공간을 점차 짙은 안개로 채워갑니다.

천장에 매달린 마이크는 관객의 참여를 유도합니다. 마이크에 숨을 불어넣으면 빛이 변화합니다—서서히 빨간색에서 파란색으로. 이 전환은 호흡의 공유적 속성과 연결을 통한 회복의 가능성을 상징합니다. 무언가가 깨지거나 파편화되었을 때도, 관계적·사회적 유대를 통해 복원될 수 있습니다.

호흡은 우리가 의식하지 않고 행하는 것이기에, 그것이 얼마나 소중한지 잊기 쉽습니다. 호흡을 통해 설치와 상호작용함으로써, 이 무의식적 행위가 표면으로 떠오르며 보이지 않던 것이 느껴지고, 보이고, 공유됩니다.

호흡을 덧없는 흔적이자 생존의 행위로 가시화함으로써, Resonair는 가시성과 소거 사이의 경계를 흐립니다. 보이지 않더라도 호흡은 당연한 것이 아니며, 공기 오염을 외면하는 것은 우리 존재의 근간을 외면하는 것임을 상기시킵니다.`,
  },
  {
    id: 'p3',
    title: 'Afropolik',
    projectType: 'Individual Project',
    category: 'Installation',
    categoryKo: '설치',
    materials: 'Motor, Arduino, Raspberry Pi, Processing, aluminum profile frame, silicone mat',
    materialsKo: '모터, Arduino, Raspberry Pi, Processing, 알루미늄 프로파일 프레임, 실리콘 매트',
    year: '2025',
    location: 'Germany',
    exhibition: 'HfK Bremen, Bremen, Germany',
    credits: 'Photography: Lars Gonikman, Soobeen Woo\nVideography: Soobeen Woo',
    imageUrl: '/images/afropolik/main.jpg',
    videoUrl: 'https://vimeo.com/1060243247',
    galleryUrls: [
      '/images/afropolik/01.jpg',
      '/images/afropolik/02.jpg',
      '/images/afropolik/03.jpg',
      '/images/afropolik/04.jpg',
      '/images/afropolik/05.jpg',
      '/images/afropolik/06.jpg'
    ],
    description: `Afropolik is a kinetic installation that addresses air pollution and the right to breathe. The movement of the motor varies depending on real-time air pollution data, influencing the pressure of a face-like form onto a silicone mat.

Higher pollutant levels intensify the movement, creating deeper imprints, while cleaner air results in lighter or no traces. These imprints serve as physical records of the invisible air quality, visualizing the impact of pollution on the human body.

By combining mechanical movement and sound, the work alludes to a future where air is controlled and questions the value and social significance of shared breathing space.`,
    descriptionKo: `Afropolik은 공기 오염과 숨 쉴 권리를 다루는 키네틱 설치입니다. 모터의 움직임은 실시간 대기 오염 데이터에 따라 달라지며, 실리콘 매트 위 얼굴 형상에 가해지는 압력에 영향을 미칩니다.

오염 물질 수치가 높아지면 움직임이 강해져 더 깊은 자국을 남기고, 공기가 맑을 때는 흔적이 가볍거나 사라집니다. 이 자국들은 보이지 않는 공기 질의 물리적 기록으로, 오염이 인체에 미치는 영향을 가시화합니다.

기계적 움직임과 소리를 결합함으로써, 작업은 공기가 통제되는 미래를 암시하며 공유된 호흡 공간의 가치와 사회적 의미에 의문을 제기합니다.`,
  },
  {
    id: 'p_antio',
    title: 'Antio',
    projectType: 'Individual Project',
    category: 'Video',
    categoryKo: '비디오',
    materials: 'Duration: 02:44',
    materialsKo: '재생 시간: 02:44',
    year: '2025',
    location: 'Germany',
    exhibition: 'Hochschultage 2025, HfK Bremen, Bremen, Germany',
    imageUrl: '/images/antio/main.png',
    videoUrl: 'https://vimeo.com/1061963881',
    galleryUrls: [
      '/images/antio/01.png',
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
    descriptionKo: `이 광고는 가상 기업 Antio Co.를 위한 것으로, 숨겨진 의도와 기업 프로파간다가 현실을 형성하는 Antio 유니버스를 배경으로 합니다. Pika, Sora, Suno로 생성되고 After Effects와 Ableton Live로 편집된 이 영상은 불안하고 음모론적인 톤을 취하며, 세련된 마케팅 이면에 감춰진 불안한 진실을 서서히 드러냅니다.

디스토피아적 홈쇼핑 형식과 VHS 미학으로 제시된 이 광고는 통제된 미래를 위한 필수 솔루션으로 Oensa Ant와 Perotox 같은 Antio의 최신 혁신을 선보입니다. 그러나 서사가 전개되면서 글리치, 왜곡, 섬뜩한 기저음이 더 깊은 기만을 노출하며, Antio의 약속 너머 세계가 보이는 것만큼 살기 좋지 않을 수 있음을 암시합니다.

조작된 목소리와 왜곡된 오디오 레이어로 구성된 사운드 디자인은 불안감을 강화하며, 기업적 환상과 현실 사이의 경계에 의문을 품게 만듭니다.`,
  },
  {
    id: 'p4',
    title: 'Echoia',
    projectType: 'Individual Project',
    category: 'Installation',
    categoryKo: '설치',
    materials: '3D hologram, AI-generated visuals and sound, mirror, black acrylic panels, stone',
    materialsKo: '3D 홀로그램, AI 생성 영상 및 사운드, 거울, 검정 아크릴 패널, 돌',
    year: '2024',
    location: 'Germany',
    exhibition: 'Goldstücke, Gelsenkirchen',
    credits: 'Photography: Jennifer Braun, Lars Gonikman',
    imageUrl: '/images/echoia/main.jpg',
    videoUrl: 'https://vimeo.com/1043418455',
    galleryUrls: [],
    description: `Echoia symbolically represents how digital information approaches reality and how actual identity merges with digital existence. It is expressed through a holographic device positioned at the intersection of the digital and the analog.

Echoia's dynamic virtual persona is designed to overlap with a physical body, moving in a mutually mimetic manner with the digital entity. It also utilizes AI to infinitely diffuse and transform into multiple entities, generating an ever-flowing vortex that continuously connects them. By viewing this from a narrow, confined space, the work offers a more intimate experience, inviting viewers to project themselves through its reflection and contemplate their own digital self.

The sound is composed from conversations with a virtual AI that embodies Echoia's persona, translated into music.`,
    descriptionKo: `Echoia는 디지털 정보가 현실에 접근하는 방식과 실제 정체성이 디지털 존재와 융합되는 과정을 상징적으로 표현합니다. 디지털과 아날로그의 교차점에 위치한 홀로그래픽 장치를 통해 구현됩니다.

Echoia의 역동적인 가상 페르소나는 물리적 신체와 겹치도록 설계되었으며, 디지털 존재와 상호 모방적인 방식으로 움직입니다. 또한 AI를 활용해 무한히 분산되고 다수의 존재로 변형되며, 이를 지속적으로 연결하는 흐르는 소용돌이를 생성합니다. 좁고 제한된 공간에서 이를 바라봄으로써, 작업은 더 친밀한 경험을 제공하며 관객이 반영을 통해 스스로를 투사하고 자신의 디지털 자아를 성찰하도록 초대합니다.

사운드는 Echoia의 페르소나를 구현한 가상 AI와의 대화에서 비롯되며, 음악으로 번역되었습니다.`,
  },
  {
    id: 'p5',
    title: 'Object Metamorphosis',
    projectType: 'Individual Project',
    category: 'Digital print',
    categoryKo: '디지털 프린트',
    year: '2024',
    location: 'Germany',
    exhibition: 'MAP 2024, GHTK delivery motorbikes, Hanoi',
    credits: 'Photography: Hoàng Nguyễn, Út Quyên\nCollaboration: GHTK, Vietnam',
    imageUrl: '/images/object-metamorphosis/main.jpeg',
    galleryUrls: [
      '/images/object-metamorphosis/01.jpg',
      '/images/object-metamorphosis/02.jpg',
      '/images/object-metamorphosis/03.jpeg',
      '/images/object-metamorphosis/04.jpeg',
      '/images/object-metamorphosis/05.jpg',
      '/images/object-metamorphosis/06.jpg'
    ],
    description: `Object Metamorphosis focuses on the mobility of landscapes and their transformation, exploring the relationship between the material and the virtual. Disappearing physical environments, such as glaciers in New Zealand, were documented through personal video recordings and transformed into 3D scans using Luma AI.

Through this process, material existence is digitally reconstructed, creating an intersection between reality and the virtual. However, this process questions whether digitization can fully preserve the identity of a place or inevitably leads to distortions and disconnections. Mobility extends beyond simple physical movement to the reconstruction of existence across time and space. Glaciers that once existed in a physical location are reborn in digital form within a virtual space, allowing the memories and traces of specific places to move and persist within new contexts.

The typography reflects this intention, designed in a fragmented and incomplete form. The incompleteness of the typography highlights the inevitable gaps and transformations brought about by digitization, which fails to fully capture the wholeness of a place. This work is presented in collaboration with GHTK as part of MAP 2024. MAP 2024 is an international artistic exchange project between Bremen, Germany, and Hanoi, Vietnam, with this year's theme being 'Mobility.' The project explores not only physical movement but also the spread of ideas, thoughts, languages, and artistic expressions. From December 14 to 20, posters created by Bremen artists will be attached to GHTK delivery motorbikes, traveling across Hanoi and offering a new perspective on movement.`,
    descriptionKo: `Object Metamorphosis는 경관의 이동성과 그 변환에 초점을 맞추며, 물질과 가상의 관계를 탐구합니다. 뉴질랜드의 빙하처럼 사라져가는 물리적 환경들이 개인 영상 촬영을 통해 기록되고, Luma AI를 사용해 3D 스캔으로 변환되었습니다.

이 과정을 통해 물질적 존재가 디지털로 재구성되며, 현실과 가상의 교차점이 형성됩니다. 그러나 이 과정은 디지털화가 장소의 정체성을 온전히 보존할 수 있는지, 아니면 불가피하게 왜곡과 단절로 이어지는지를 질문합니다. 이동성은 단순한 물리적 움직임을 넘어 시간과 공간을 가로지른 존재의 재구성으로 확장됩니다. 특정 장소에 물리적으로 존재했던 빙하들은 가상 공간 안에서 디지털 형태로 재탄생하며, 특정 장소의 기억과 흔적이 새로운 맥락 안에서 이동하고 지속될 수 있게 합니다.

타이포그래피는 이러한 의도를 반영하며, 파편화되고 불완전한 형태로 디자인되었습니다. 타이포그래피의 불완전함은 디지털화가 가져오는 필연적인 간극과 변형을 부각시키며, 장소의 온전함을 완전히 포착하는 데 실패합니다. 이 작업은 MAP 2024의 일환으로 GHTK와의 협업으로 제시됩니다. MAP 2024는 독일 브레멘과 베트남 하노이 간의 국제 예술 교류 프로젝트로, 올해 주제는 '이동성'입니다. 12월 14일부터 20일까지, 브레멘 예술가들이 제작한 포스터가 GHTK 배달 오토바이에 부착되어 하노이 전역을 이동하며 새로운 시각을 제공합니다.`,
  },
  {
    id: 'p6',
    title: 'Debris Tracer',
    projectType: 'Individual Project',
    category: 'Website',
    categoryKo: '웹사이트',
    year: '2024',
    location: 'Germany',
    imageUrl: '/images/debris-tracer/main.png',
    videoUrl: 'https://vimeo.com/918490095',
    galleryUrls: [],
    description: `Space debris, invisible to the naked eye, is an underestimated threat for many. While it may not seem urgent at present, the accumulation of space debris could result in severe environmental consequences for Earth in the future. I am deeply dedicated to exploring perspectives beyond the human gaze by blending elements of nature and technology.

Conceptually, I aimed to visually represent space debris as a vast ring encircling Earth. To effectively convey this concept, I combined auditory and visual effects to stimulate human senses of sound and sight. By utilizing these senses, I hope to elevate awareness of this issue by prompting users to vocalize the phrase 'space debris.' This innovative project unfolds as a dynamic web page set against the backdrop of space. Upon loading, the page detects the phrase 'space debris,' transforming it into a password to guide users to the next environment. Using Speech Recognition technology, users are prompted to speak the designated phrase, leading them to the final page.

The final page offers a unique experience with each visit, featuring diverse music, text, and interactive objects. Each object corresponds to distinct textual descriptions, with direct engagement revealing 3D models responsive to sound intensity. Space debris primarily comprises remnants from artificial satellites and other space objects. To enhance intrigue, I integrated commonplace items into the visual narrative. This symbolizes the omnipresence of space debris in our surroundings and underscores the inevitability of humans being part of this cycle. This phenomenon emphasizes the urgent need for heightened awareness and proactive solutions.`,
    descriptionKo: `우주 쓰레기는 육안으로 보이지 않아 많은 이들에게 과소평가되는 위협입니다. 현재로서는 시급하지 않아 보일 수 있지만, 우주 쓰레기의 누적은 미래에 지구에 심각한 환경적 결과를 초래할 수 있습니다. 자연과 기술의 요소를 결합해 인간의 시선을 넘어선 관점을 탐구하는 데 깊이 몰두하고 있습니다.

개념적으로는 우주 쓰레기를 지구를 둘러싼 거대한 고리로 시각적으로 표현하고자 했습니다. 이를 효과적으로 전달하기 위해 청각과 시각 효과를 결합해 인간의 감각을 자극했습니다. 이 감각들을 활용함으로써, 사용자들이 '우주 쓰레기'라는 문구를 발화하도록 유도해 인식을 높이고자 합니다. 이 프로젝트는 우주를 배경으로 한 역동적인 웹 페이지로 전개됩니다. 페이지가 로드되면 '우주 쓰레기'라는 문구를 인식하고, 이를 비밀번호로 변환해 다음 환경으로 안내합니다. 음성 인식 기술을 사용해 사용자는 지정된 문구를 발화하도록 유도되고, 최종 페이지로 이동합니다.

최종 페이지는 방문할 때마다 독특한 경험을 제공하며, 다양한 음악, 텍스트, 인터랙티브 오브젝트를 선보입니다. 각 오브젝트는 고유한 텍스트 설명과 연결되며, 직접 상호작용하면 음량에 반응하는 3D 모델이 드러납니다. 우주 쓰레기는 주로 인공위성과 기타 우주 오브젝트의 잔해로 구성됩니다. 일상적인 사물들을 시각적 서사에 통합해 우주 쓰레기가 우리 주변 어디에나 존재함을 상징하고, 인간이 이 순환의 일부일 수밖에 없음을 강조합니다. 이 현상은 인식 제고와 적극적인 해결책의 시급한 필요성을 부각시킵니다.`,
  },
  {
    id: 'p7',
    title: 'Jujube Universe',
    projectType: 'Individual Project',
    category: 'Video',
    categoryKo: '비디오',
    year: '2023',
    location: 'Korea',
    imageUrl: '/images/jujube/main.png',
    videoUrl: 'https://vimeo.com/863884778',
    galleryUrls: [],
    description: `This work is an expansion of the view of the jujube. I thought that the structure of the jujube's supergene is like a galaxy in the universe and gave it a new personality, which I linked to a meteorite that fell to earth.

In this artwork, the jujube serves as a prominent motif that will greatly influence the future of humanity, symbolizing a fervent desire to extensively study jujubes as one of the Super Seeds that could potentially save humanity.`,
    descriptionKo: `이 작업은 대추를 바라보는 시각을 확장하는 작업입니다. 대추의 슈퍼진 구조가 우주의 은하처럼 보인다고 생각했으며, 이에 새로운 개성을 부여하고 지구에 떨어진 운석과 연결지었습니다.

이 작품에서 대추는 인류의 미래에 큰 영향을 미칠 핵심 모티프로 등장하며, 인류를 구할 수 있는 슈퍼 씨앗 중 하나로서 대추를 광범위하게 연구하고자 하는 열망을 상징합니다.`,
  },
  {
    id: 'p8',
    title: 'Seed Capsule',
    projectType: 'Individual Project',
    category: 'Interactive VR',
    categoryKo: '인터랙티브 VR',
    year: '2023',
    location: 'Korea',
    imageUrl: '/images/seed-capsule/main.png',
    videoUrl: 'https://vimeo.com/916853940',
    galleryUrls: [],
    description: `This work revolves around the concept of a 'Seed Capsule,' which serves as a repository for memories. The term 'Seed' carries dual meaning, representing a device that stores objects, backgrounds, and environments from the past, encapsulating memories.

This work takes the form of an interactive VR experience, comprising rooms with different environments. By clicking on cubes, users can trigger sounds or move to the next room, allowing them to explore three rooms containing objects imbued with memories and stories.`,
    descriptionKo: `이 작업은 기억의 저장소로서의 '씨앗 캡슐' 개념을 중심으로 전개됩니다. '씨앗'이라는 단어는 이중적 의미를 지니며, 과거의 사물, 배경, 환경을 저장하고 기억을 캡슐화하는 장치를 상징합니다.

이 작업은 인터랙티브 VR 경험의 형태를 취하며, 각기 다른 환경의 방들로 구성됩니다. 큐브를 클릭하면 소리가 트리거되거나 다음 방으로 이동할 수 있으며, 기억과 이야기가 깃든 사물들로 채워진 세 개의 방을 탐험할 수 있습니다.`,
  },
  {
    id: 'p9',
    title: 'Vom Blick',
    projectType: 'Individual Project',
    category: 'Video',
    categoryKo: '비디오',
    year: '2023',
    location: 'Korea',
    imageUrl: '/images/vom-blick/main.png',
    videoUrl: 'https://vimeo.com/916350613',
    galleryUrls: [],
    description: `This work delves into a recurring theme that runs throughout the series of works in 2023, relentlessly probing the notion of the 'gaze' and challenging the notion of unquestioningly accepting the human perspective.

I steer the narrative of the video by vigilantly considering when I view things through an anthropocentric lens and when I passively embrace it without scrutiny.`,
    descriptionKo: `이 작업은 2023년 연작 전반에 걸쳐 반복되는 주제를 깊이 파고들며, '시선'이라는 개념을 끊임없이 탐구하고 인간의 관점을 무비판적으로 수용하는 것에 도전합니다.

나는 사물을 인간 중심적 시각으로 바라보는 순간과 아무런 검토 없이 수동적으로 받아들이는 순간을 예민하게 의식하면서 영상의 서사를 이끌어갑니다.`,
  },
  {
    id: 'p10',
    title: 'Oensa Ant',
    projectType: 'Individual Project',
    category: 'Video',
    categoryKo: '비디오',
    year: '2022',
    location: 'Korea',
    imageUrl: '/images/oensa-ant/main.png',
    videoUrl: 'https://vimeo.com/860863523',
    galleryUrls: [],
    description: `This work is connected to the 'Antio' project and involves the virtual study of the most important creature in that project, the 'Oensa Ant'. This ant has the ability to secrete a substance called 'Perotox', which has the power to purify the environment.

In a dystopian setting, it is the only living being capable of saving humanity, and humans once again rely on the strength of this small creature to survive. In this work, the ant becomes a more important being than humans, prompting a reevaluation of its status. However, it also highlights the duality of humans' relationship with non-human life forms, as the ant is sometimes exploited by humans despite its crucial role.`,
    descriptionKo: `이 작업은 'Antio' 프로젝트와 연결되며, 그 프로젝트에서 가장 중요한 생명체인 '오엔사 개미(Oensa Ant)'를 가상으로 연구하는 작업입니다. 이 개미는 'Perotox'라는 물질을 분비하는 능력을 지니며, 이 물질은 환경을 정화하는 힘을 가지고 있습니다.

디스토피아적 설정 속에서, 오엔사 개미는 인류를 구할 수 있는 유일한 생명체이며, 인간은 다시 한번 이 작은 생명체의 힘에 의존해 생존합니다. 이 작업에서 개미는 인간보다 더 중요한 존재가 되며, 그 지위를 재평가하도록 촉구합니다. 그러나 동시에 인간과 비인간 생명체 간의 관계의 이중성을 드러내는데, 개미는 결정적인 역할에도 불구하고 때로는 인간에게 착취당합니다.`,
  },
];

export const CERAMICS: Project[] = [
  {
    id: 'c1',
    title: 'Kitty Mug',
    titleKo: '고양이 머그',
    category: 'Clay',
    year: '2025',
    description: 'A handcrafted ceramic cup with a cat-shaped handle',
    descriptionKo: '고양이 모양 손잡이가 달린 수제 도자 컵',
    imageUrl: '/images/ceramics/01.JPG',
    galleryUrls: [
      '/images/ceramics/02.JPG'
    ],
  },
  {
    id: 'c2',
    title: 'Pixel Cat Cup',
    titleKo: '픽셀 고양이 컵',
    category: 'Porcelain',
    year: '2025',
    description: 'A cup with pixel-style cats.',
    descriptionKo: '픽셀 스타일 고양이가 그려진 컵',
    imageUrl: '/images/ceramics/03.PNG'
  },
  {
    id: 'c3',
    title: 'Vivid porcelain cup',
    titleKo: '비비드 도자기 컵',
    category: 'Porcelain',
    year: '2025',
    description: 'A vivid porcelain cup',
    descriptionKo: '선명한 색감의 도자기 컵',
    imageUrl: '/images/ceramics/04.JPG'
  },
  {
    id: 'c4',
    title: 'Ghost Accessory Holder',
    titleKo: '유령 소품 홀더',
    category: 'Clay',
    year: '2025',
    description: 'A little ghost accessory holder',
    descriptionKo: '귀여운 유령 모양의 소품 정리함',
    imageUrl: '/images/ceramics/05.JPG'
  },
  {
    id: 'c5',
    title: 'Lemon Juicer',
    titleKo: '레몬 착즙기',
    category: 'Clay',
    year: '2025',
    description: 'A lemon-shaped fruit juicer',
    descriptionKo: '레몬 모양의 과일 착즙기',
    imageUrl: '/images/ceramics/06.JPG',
    galleryUrls: [
      '/images/ceramics/07.JPG',
    ],
  },
  {
    id: 'c6',
    title: 'Wave Foam Plate',
    titleKo: '파도 물결 접시',
    category: 'Clay',
    year: '2025',
    description: 'A plate with a wave-foam pattern',
    descriptionKo: '파도 물결 패턴의 접시',
    imageUrl: '/images/ceramics/08.JPG',
    galleryUrls: [
      '/images/ceramics/09.JPG',
    ],
  },
  {
    id: 'c7',
    title: 'Forsythia Cup',
    titleKo: '개나리 컵',
    category: 'Porcelain',
    year: '2025',
    description: 'A spring forsythia cup',
    descriptionKo: '봄 개나리 컵',
    imageUrl: '/images/ceramics/10.JPG',
  },
  {
    id: 'c8',
    title: 'Take-out Cup',
    titleKo: '테이크아웃 컵',
    category: 'Clay',
    year: '2025',
    description: 'A handcrafted take-out cup',
    descriptionKo: '수제 테이크아웃 컵',
    imageUrl: '/images/ceramics/11.JPG',
  },
];
