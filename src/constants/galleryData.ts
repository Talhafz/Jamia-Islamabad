export interface GalleryItem {
  id: string;
  src: string;
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  desc: {
    en: string;
    ur: string;
    ar: string;
  };
  category: 'infrastructure' | 'convocation' | 'conferences' | 'assemblies' | 'rallies';
  location: string;
  date?: string;
  featured?: boolean;
}

export const GALLERY_CATEGORIES = [
  { id: 'all', key: 'gallery:categories.all' },
  { id: 'infrastructure', key: 'gallery:categories.infrastructure' },
  { id: 'convocation', key: 'gallery:categories.convocation' },
  { id: 'conferences', key: 'gallery:categories.conferences' },
  { id: 'assemblies', key: 'gallery:categories.assemblies' },
  { id: 'rallies', key: 'gallery:categories.rallies' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'admin-office',
    src: '/assets/Admin Office.jpeg',
    category: 'infrastructure',
    location: 'Central Administrative Wing, I-8/4 Islamabad',
    featured: true,
    title: {
      en: 'Central Administration Office',
      ur: 'مرکزی ایڈمنسٹریشن آفس',
      ar: 'مكتب الإدارة المركزية',
    },
    desc: {
      en: 'Primary administrative block managing student enrollment, academic records, and institutional coordination.',
      ur: 'مرکزی انتظامی بلاک جہاں طلباء کے داخلے، تعلیمی ریکاڈز اور ادارہ جاتی امور سرانجام دیے جاتے ہیں۔',
      ar: 'المبنى الإداري الرئيسي لإدارة تسجيل الطلاب والسجلات الأكاديمية.',
    },
  },
  {
    id: 'chancellor-office',
    src: '/assets/Chancellor Office.jpeg',
    category: 'infrastructure',
    location: 'Executive Suite, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Chancellor Executive Office',
      ur: 'چانسلر ایگزیکٹو آفس',
      ar: 'مكتب رئيس الجامعة',
    },
    desc: {
      en: 'Executive office for high-level meetings, academic board discussions, and institutional leadership.',
      ur: 'ادارے کی اعلیٰ انتظامی قیادت، اہم میٹنگز اور تعلیمی بورڈ کے لیے مختص ایگزیکٹو دفتر۔',
      ar: 'المكتب التنفيذي للاجتماعات والقيادة الأكاديمية.',
    },
  },
  {
    id: 'jamia-masjid',
    src: '/assets/Jamia Masjid Noor-e-Madina.jpeg',
    category: 'infrastructure',
    location: 'Main Campus Quad, Islamabad',
    featured: true,
    title: {
      en: 'Jamia Masjid Noor-e-Madina',
      ur: 'جامع مسجد نورِ مدینہ',
      ar: 'جامع مسجد نور المدينة',
    },
    desc: {
      en: 'Spiritual hub of Jamia Islamabad where daily congregational prayers and spiritual halaqahs take place.',
      ur: 'جامعہ اسلام آباد کا روحانی مرکز جہاں پنجگانہ نمازیں اور روحانی تربیتی نشستیں منعقد ہوتی ہیں۔',
      ar: 'المركز الروحي للجامعة للصلوات الجماعية والحلقات الإيمانية.',
    },
  },
  {
    id: 'classical-library',
    src: '/assets/Library.jpeg',
    category: 'infrastructure',
    location: 'Academic Block B, Ground Floor',
    featured: true,
    title: {
      en: 'Classical Arabic & Islamic Library',
      ur: 'مرکزی اسلامی و علمی کتب خانہ',
      ar: 'المكتبة الإسلامية الكلاسيكية',
    },
    desc: {
      en: 'Comprehensive collection of classical manuscripts, Tafseer, Hadith literature, and Islamic jurisprudence texts.',
      ur: 'تفسیر، حدیث، فقہ اور قدیم اسلامی مخطوطات پر مشتمل نایاب علمی کتب خانہ۔',
      ar: 'مكتبة شاملة تحتوي على كتب التفسير والحديث والفقه الإسلامي.',
    },
  },
  {
    id: 'modern-it-library',
    src: '/assets/Modern IT Library.jpeg',
    category: 'infrastructure',
    location: 'Digital Learning Wing, 1st Floor',
    featured: true,
    title: {
      en: 'Modern Digital & IT Library',
      ur: 'جدید ڈیجیٹل و آئی ٹی لائبریری',
      ar: 'مكتبة تكنولوجيا المعلومات الحديثة',
    },
    desc: {
      en: 'Equipped with computer workstations and high-speed internet for online research and contemporary studies.',
      ur: 'جدید کمپیوٹرز اور تیز ترین انٹرنیٹ سے آراستہ لائبریری جہاں طلباء جدید اور سائنسی تحقیق کرتے ہیں۔',
      ar: 'مجهزة بأجهزة الكمبيوتر والإنترنت للبحث العلمي والحديث.',
    },
  },
  {
    id: 'convocation-main',
    src: '/assets/convocation ceremony.jpeg',
    category: 'convocation',
    location: 'Grand Auditorium, Islamabad',
    featured: true,
    title: {
      en: 'Annual Convocation & Dastar-Bandi',
      ur: 'سالانہ دستارِ بندی و تقریبِ تقسیمِ اسناد',
      ar: 'حفل التخرج السنوي وتتويج الحفاظ',
    },
    desc: {
      en: 'Grand annual ceremony honoring scholars and Hufaz upon completion of Dars-e-Nizami and Quran memorization.',
      ur: 'درسِ نظامی اور حفظِ قرآن مکمل کرنے والے فاضلین اور حفاظِ کرام کی دستار بندی کی عظیم الشان تقریب۔',
      ar: 'حفل سنوي كبير لتكريم الخريجين وحفاظ القرآن الكريم.',
    },
  },
  {
    id: 'convocation-degrees',
    src: '/assets/convocation ceremony 1.jpeg',
    category: 'convocation',
    location: 'Grand Hall Stage',
    featured: false,
    title: {
      en: 'Degree Awarding & Scholars Recognition',
      ur: 'تقسیمِ اسناد و اعزازاتِ حفاظ',
      ar: 'توزيع الشهادات والدبلومات',
    },
    desc: {
      en: 'Distinguished Islamic scholars presenting degrees and awards to graduating students.',
      ur: 'جید علماءِ کرام کے مبارک ہاتھوں سے نگران اور کامیاب طلباء کو اسناد کی فراہمی۔',
      ar: 'علماء كبار يقدمون الشهادات للطلاب المتخرجين.',
    },
  },
  {
    id: 'convocation-gathering',
    src: '/assets/convocation ceremony 3.jpeg',
    category: 'convocation',
    location: 'Main Auditorium Gallery',
    featured: false,
    title: {
      en: 'Convocation Audience & Scholars Assembly',
      ur: 'مجمع علماء و شائقینِ علم',
      ar: 'حضور العلماء والضيوف الكرام',
    },
    desc: {
      en: 'Vast gathering of renowned scholars, parents, and community leaders celebrating academic excellence.',
      ur: 'معروف علماءِ کرام، اولیاء اور اہل دانش کی بڑی تعداد کی شرکت۔',
      ar: 'حشد غفير من العلماء وأولياء الأمور يحتفلون بالمتخرجين.',
    },
  },
  {
    id: 'afkar-sofiya-conf',
    src: '/assets/Adqar-e-Sofiya conference.jpeg',
    category: 'conferences',
    location: 'Conference Hall, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Afkar-e-Sofiya Academic Conference',
      ur: 'افکارِ صوفیاء علمی کانفرنس',
      ar: 'مؤتمر أفكار الصوفية العلمي',
    },
    desc: {
      en: 'Specialized seminar highlighting spiritual philosophy, peace, and Islamic mysticism in modern times.',
      ur: 'تصوف، امن و آشتی اور صوفیانہ افکار پر مبنی تحقیقی و علمی کانفرنس۔',
      ar: 'مؤتمر علمي يسلّط الضوء على الفلسفة الروحية والسلام في الإسلام.',
    },
  },
  {
    id: 'afkar-sofiya-2',
    src: '/assets/Afqar-e-sofiya 2.jpeg',
    category: 'conferences',
    location: 'Seminar Hall B',
    featured: false,
    title: {
      en: 'Afkar-e-Sofiya Research Session',
      ur: 'نشست افکارِ صوفیاء و مکالمہ',
      ar: 'جلسة البحث العلمي لأفكار الصوفية',
    },
    desc: {
      en: 'Interactive scholarly dialogue on the intellectual contributions of Sufi saints in South Asia.',
      ur: 'جنوبی ایشیا میں صوفیاء کے علمی اور اصلاحی کردار پر تفصیلی پینل ڈسکشن۔',
      ar: 'حوار علمي تفاعلي حول الإسهامات الفكرية للصوفية.',
    },
  },
  {
    id: 'abu-bakr-conf',
    src: '/assets/Hazrat Abu Bakr Siddiq Conference.jpeg',
    category: 'conferences',
    location: 'Main Auditorium',
    featured: true,
    title: {
      en: 'Seerat Hazrat Abu Bakr Siddiq (RA) Conference',
      ur: 'سیرتِ حضرت ابو بکر صدیق رضی اللہ عنہ کانفرنس',
      ar: 'مؤتمر سيرة سيدنا أبي بكر الصديق رضي الله عنه',
    },
    desc: {
      en: 'Commemorative seminar reflecting on the life, governance, and sacrifices of the First Caliph of Islam.',
      ur: 'خلیفہ اول سیدنا ابو بکر صدیق رض کی مبارک زندگی اور خدمات پر مبنی عظیم الشان کانفرنس۔',
      ar: 'مؤتمر يبرز سيرة الخليفة الأول للإسلام وحكمته.',
    },
  },
  {
    id: 'hussain-conf-main',
    src: '/assets/Hazrat Imam Hussain (RA) Conference.jpeg',
    category: 'conferences',
    location: 'Central Convention Hall',
    featured: true,
    title: {
      en: 'Seerat Imam Hussain (RA) & Shuhada Conference',
      ur: 'سیرتِ امام حسین رضی اللہ عنہ و شہدائے کربلا کانفرنس',
      ar: 'مؤتمر سيرة الإمام الحسين رضي الله عنه وشهدائه',
    },
    desc: {
      en: 'Scholarly gathering commemorating the sacrifice of Imam Hussain (RA) and principles of truth.',
      ur: 'سید الشہداء حضرت امام حسین رض کی قربانی، حق گوئی اور اعلیٰ اسلامی اقدار پر مبنی کانفرنس۔',
      ar: 'مؤتمر علمي يستحضر تضحيات الإمام الحسين رضي الله عنه ومبادئ الحق.',
    },
  },
  {
    id: 'hussain-conf-stage',
    src: '/assets/Hazrat Imam Hussain (RA) Conference 1.jpeg',
    category: 'conferences',
    location: 'Central Convention Stage',
    featured: false,
    title: {
      en: 'Imam Hussain (RA) Seminar Keynote Addresses',
      ur: 'نشست خطاباتِ علماء - سیرتِ امام حسین رض',
      ar: 'كلمات العلماء في مؤتمر سيرة الإمام الحسين',
    },
    desc: {
      en: 'Keynote presentations by prominent scholars emphasizing unity and Islamic ethics.',
      ur: 'جید علماء کے بصیرت افروز خطابات جس میں اتحادِ امت اور اخلاقیات پر زور دیا گیا۔',
      ar: 'كلمات رئيسية لكبار العلماء تناقش وحدة الأمة والأخلاق.',
    },
  },
  {
    id: 'hussain-conf-aud',
    src: '/assets/Hazrat Imam Hussain (RA) Conference 2.jpeg',
    category: 'conferences',
    location: 'Central Auditorium',
    featured: false,
    title: {
      en: 'Academic Gathering on Seerat-e-Hussain',
      ur: 'حاضرینِ کانفرنس سیرتِ امام حسین رض',
      ar: 'حضور المؤتمر الأكاديمي لسيرة الإمام الحسين',
    },
    desc: {
      en: 'Delegates and students attending the symposium on Husainid thought and courage.',
      ur: 'فکرِ حسینی اور شجاعت کے عنوان پر منعقدہ نشست میں اساتذہ و طلباء کی بھرپور شرکت۔',
      ar: 'مشاركون وطلاب يحضرون الندوة العلمية للفكر الحسيني.',
    },
  },
  {
    id: 'assembly-speech-main',
    src: '/assets/The Assembly for the Reform of Speech.jpeg',
    category: 'assemblies',
    location: 'Anjuman Islah-ul-Bayan Stage',
    featured: true,
    title: {
      en: 'Anjuman Islah-ul-Bayan Oratory Assembly',
      ur: 'انجمنِ اصلاح البیان و تربیتِ خطابت',
      ar: 'جمعية إصلاح البيان والخطابة',
    },
    desc: {
      en: 'Student co-curricular platform designed to train young scholars in public speaking and eloquence.',
      ur: 'طلباء کی فنِ خطابت، فصاحت اور بلاغت کی تربیت کے لیے قائم کردہ ہفتہ وار پلیٹ فارم۔',
      ar: 'منصة طلابية لتدريب العلماء الشباب على الخطابة والفصاحة.',
    },
  },
  {
    id: 'assembly-speech-comp',
    src: '/assets/The Assembly for the Reform of Speech 1.jpeg',
    category: 'assemblies',
    location: 'Debate Hall A',
    featured: false,
    title: {
      en: 'Speech & Debate Competition Session',
      ur: 'طلباء تقریری و مناظرانہ مقابلہ',
      ar: 'مسابقة المناظرة والخطابة الطلابية',
    },
    desc: {
      en: 'Students competing in Arabic, Urdu, and English speech presentations under teacher guidance.',
      ur: 'عربی، اردو اور انگریزی تقریری مقابلوں میں طلباء کی شاندار کارکردگی۔',
      ar: 'طلاب يتنافسون في المسابقات الخطابية باللغات العربية والأوردية والإنجليزية.',
    },
  },
  {
    id: 'assembly-speech-pres',
    src: '/assets/The Assembly for the Reform of Speech 3.jpeg',
    category: 'assemblies',
    location: 'Debate Hall B',
    featured: false,
    title: {
      en: 'Student Eloquence & Character Building Session',
      ur: 'اصلاحی نشست و تربیتِ اخلاق',
      ar: 'جلسة التزكية وبناء الشخصية الخطابية',
    },
    desc: {
      en: 'Character building and intellectual presentation sessions conducted by student societies.',
      ur: 'طلباء کی علمی، اخلاقی اور شخصیتی بالیدگی کے لیے تربیتی نشست۔',
      ar: 'جلسات لتطوير المهارات الشخصية والخطابية للطلاب.',
    },
  },
  {
    id: 'kashmir-rally-main',
    src: '/assets/Yakjehti Kashmir reeli.jpeg',
    category: 'rallies',
    location: 'Islamabad Avenue / Campus Outer',
    featured: true,
    title: {
      en: 'Kashmir Solidarity Peace Rally',
      ur: 'یومِ یکجہتیِ کشمیر عظیم الشان ریلی',
      ar: 'مسيرة التضامن السلمية مع كشمير',
    },
    desc: {
      en: 'Campus wide peaceful rally expressing solidarity with the oppressed people of Kashmir.',
      ur: 'کشمیری عوام کے حقوق اور ان سے یکجہتی کے لیے جامعہ کے طلباء کی پرامن ریلی۔',
      ar: 'مسيرة سلمية للتضامن مع الشعب الكشميري.',
    },
  },
  {
    id: 'kashmir-rally-march',
    src: '/assets/Yakjehti Kashmir 2.jpeg',
    category: 'rallies',
    location: 'Main Boulevard, Islamabad',
    featured: false,
    title: {
      en: 'Kashmir Solidarity Public March',
      ur: 'کشمیر مارچ و عوامی شرکت',
      ar: 'المسيرة الجماهيرية للتضامن مع كشمير',
    },
    desc: {
      en: 'Faculty members and students participating in the annual Kashmir solidarity march.',
      ur: 'اساتذہ اور طلباء کا کشمیر کے مظلوموں کے لیے پرعزم ریلی میں مارچ۔',
      ar: 'أعضاء هيئة التدريس والطلاب يشاركون في مسيرة التضامن.',
    },
  },
  {
    id: 'bismillah-main',
    src: '/assets/Bismillah shareef.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: true,
    title: {
      en: 'Bismillah Shareef Ceremony',
      ur: 'تقریبِ بسم اللہ شریف',
      ar: 'حفل البسملة الشريفة',
    },
    desc: {
      en: 'A blessed ceremony marking the formal start of Quranic education for new students with the recitation of Bismillah.',
      ur: 'نئے طلباء کے قرآنی تعلیمی سفر کا باقاعدہ آغاز بسم اللہ شریف کی تقریب کے ذریعے۔',
      ar: 'حفل مبارك يُؤذن ببدء الرحلة القرآنية للطلاب الجدد بتلاوة البسملة الشريفة.',
    },
  },
  {
    id: 'bismillah-1',
    src: '/assets/Bismillah shareef1.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: false,
    title: {
      en: 'Bismillah Ceremony – Scholars Blessing',
      ur: 'تقریبِ بسم اللہ – علماء کی دعا و مبارکباد',
      ar: 'حفل البسملة – دعاء العلماء وتهنئتهم',
    },
    desc: {
      en: 'Distinguished scholars offering prayers and blessings as new students begin their sacred journey of learning.',
      ur: 'جید علماءِ کرام نئے طلباء کے تعلیمی سفر کے آغاز پر دعا و برکت دے رہے ہیں۔',
      ar: 'علماء أجلاء يتلون الدعاء والبركات للطلاب الجدد في بداية رحلتهم العلمية.',
    },
  },
  {
    id: 'bismillah-2',
    src: '/assets/Bismillah shareef2.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: false,
    title: {
      en: 'Bismillah Ceremony – Parents & Students Gathering',
      ur: 'تقریبِ بسم اللہ – اولیاء و طلباء کا اجتماع',
      ar: 'حفل البسملة – تجمع أولياء الأمور والطلاب',
    },
    desc: {
      en: 'Parents and students gathered together to witness and celebrate the sacred Bismillah ceremony.',
      ur: 'تقریبِ بسم اللہ میں والدین اور طلباء کی پُرمسرت اجتماعی شرکت۔',
      ar: 'أولياء الأمور والطلاب يتجمعون للاحتفاء بحفل البسملة المبارك.',
    },
  },
  {
    id: 'bismillah-3',
    src: '/assets/Bismillah shareef3.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: false,
    title: {
      en: 'Bismillah Ceremony – Quranic Recitation',
      ur: 'تقریبِ بسم اللہ – قرآنی تلاوت',
      ar: 'حفل البسملة – تلاوة القرآن الكريم',
    },
    desc: {
      en: 'Young students reciting the holy Quran for the first time in front of scholars at the Bismillah ceremony.',
      ur: 'نئے طلباء کا علماءِ کرام کی موجودگی میں پہلی بار قرآن مجید کی تلاوت کا آغاز۔',
      ar: 'طلاب جدد يتلون القرآن الكريم لأول مرة أمام العلماء في حفل البسملة.',
    },
  },
  {
    id: 'bismillah-4',
    src: '/assets/Bismillah shareef4.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: false,
    title: {
      en: 'Bismillah Ceremony – Closing Dua',
      ur: 'تقریبِ بسم اللہ – اختتامی دعا',
      ar: 'حفل البسملة – الدعاء الختامي',
    },
    desc: {
      en: 'Closing prayers marking the end of the Bismillah ceremony, invoking blessings for the students journey ahead.',
      ur: 'تقریبِ بسم اللہ کا اختتامی دعائیہ اجتماع جس میں طلباء کے روشن مستقبل کے لیے دعا کی گئی۔',
      ar: 'الدعاء الختامي لإتمام حفل البسملة داعياً بالتوفيق للطلاب في مسيرتهم.',
    },
  },
  {
    id: 'shahadat-ali-main',
    src: '/assets/shahadat ali al murtaza conference.jpeg',
    category: 'conferences',
    location: 'Conference Hall, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Shahadat Hazrat Ali al-Murtaza (RA) Conference',
      ur: 'شہادتِ حضرت علی المرتضیٰ رضی اللہ عنہ کانفرنس',
      ar: 'مؤتمر شهادة سيدنا علي المرتضى رضي الله عنه',
    },
    desc: {
      en: 'A scholarly conference commemorating the martyrdom and exceptional services of Hazrat Ali ibn Abi Talib (RA), the fourth Caliph of Islam.',
      ur: 'خلیفہ چہارم سیدنا حضرت علی المرتضیٰ رضی اللہ عنہ کی شہادت اور عظیم خدمات کی یاد میں علمی کانفرنس۔',
      ar: 'مؤتمر علمي يُحيي ذكرى شهادة الإمام علي المرتضى رضي الله عنه وخدماته الجليلة للإسلام.',
    },
  },
  {
    id: 'shahadat-ali-1',
    src: '/assets/shahadat ali al murtaza conference1.jpeg',
    category: 'conferences',
    location: 'Main Auditorium, Jamia Islamabad',
    featured: false,
    title: {
      en: 'Hazrat Ali (RA) Conference – Keynote Addresses',
      ur: 'کانفرنس حضرت علی رض – علماء کے خطابات',
      ar: 'مؤتمر الإمام علي – كلمات العلماء الرئيسية',
    },
    desc: {
      en: 'Eminent scholars delivering keynote addresses on the justice, piety and intellectual legacy of Hazrat Ali (RA).',
      ur: 'جید علماءِ کرام نے حضرت علی رض کے عدل، تقویٰ اور علمی ورثے پر بصیرت افروز خطابات دیے۔',
      ar: 'علماء بارزون يُلقون كلمات رئيسية حول عدالة الإمام علي وتقواه وإرثه الفكري.',
    },
  },
  {
    id: 'shahadat-ali-2',
    src: '/assets/shahadat ali al murtaza conference2.jpeg',
    category: 'conferences',
    location: 'Main Auditorium, Jamia Islamabad',
    featured: false,
    title: {
      en: 'Hazrat Ali (RA) Conference – Audience & Scholars',
      ur: 'کانفرنس حضرت علی رض – حاضرینِ مجلس',
      ar: 'مؤتمر الإمام علي – الحضور والعلماء',
    },
    desc: {
      en: 'A large gathering of scholars and students attending the academic conference on the life of Hazrat Ali (RA).',
      ur: 'علماء اور طلباء کی بڑی تعداد کانفرنس میں شریک ہو کر حضرت علی رض کی سیرت پر سماعت کر رہی ہے۔',
      ar: 'حشد كبير من العلماء والطلاب يحضرون المؤتمر الأكاديمي حول حياة سيدنا علي رضي الله عنه.',
    },
  },
  {
    id: 'welcome-party-main',
    src: '/assets/Wemcome Party.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: true,
    title: {
      en: 'New Students Welcome Party',
      ur: 'نئے طلباء کی خیرمقدمی تقریب',
      ar: 'حفل استقبال الطلاب الجدد',
    },
    desc: {
      en: 'A warm welcome ceremony organized for new students joining Jamia Islamabad at the start of the academic session.',
      ur: 'نئے تعلیمی سال کے آغاز پر جامعہ اسلام آباد میں داخل ہونے والے طلباء کی پُرتپاک خیرمقدمی تقریب۔',
      ar: 'حفل استقبال دافئ ينظمه الطلاب والأساتذة لاستقبال الوافدين الجدد.',
    },
  },
  {
    id: 'welcome-party-1',
    src: '/assets/Wemcome Party1.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: false,
    title: {
      en: 'Welcome Ceremony – Introductions & Addresses',
      ur: 'خیرمقدمی تقریب – تعارفی نشست',
      ar: 'حفل الاستقبال – التعريف والخطابات',
    },
    desc: {
      en: 'Faculty members and senior students introducing new scholars to the academic environment and traditions of Jamia.',
      ur: 'اساتذہ اور سینئر طلباء نئے طلباء کو جامعہ کے علمی ماحول اور روایات سے متعارف کروا رہے ہیں۔',
      ar: 'أعضاء هيئة التدريس والطلاب الأقدم يعرّفون الطلاب الجدد بالبيئة الأكاديمية وتقاليد الجامعة.',
    },
  },
  {
    id: 'welcome-party-2',
    src: '/assets/Wemcome Party2.jpeg',
    category: 'assemblies',
    location: 'Jamia Islamabad, I-8/4 Islamabad',
    featured: false,
    title: {
      en: 'Welcome Ceremony – Group Gathering',
      ur: 'خیرمقدمی تقریب – اجتماعی نشست',
      ar: 'حفل الاستقبال – التجمع الجماعي',
    },
    desc: {
      en: 'New and senior students gathered together in a collective session, fostering brotherhood and camaraderie.',
      ur: 'نئے اور پرانے طلباء کا اجتماع جس میں اخوت اور بھائی چارے کی فضا قائم کی گئی۔',
      ar: 'تجمع الطلاب الجدد والقدامى لتعزيز الأخوة والروابط الجماعية.',
    },
  },
];

