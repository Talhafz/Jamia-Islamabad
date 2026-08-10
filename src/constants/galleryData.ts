export interface GalleryItem {
  id: string;
  src: string;        // Main thumbnail image path
  images?: string[];  // All photos associated with this event
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
  // ── Infrastructure ────────────────────────────────────────────────────────
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

  // ── Event 1: Convocation & Dastar-Bandi ─────────────────────────────────────
  {
    id: 'convocation-main',
    src: '/assets/convocation ceremony.jpeg',
    images: [
      '/assets/convocation ceremony.jpeg',
      '/assets/convocation ceremony 1.jpeg',
      '/assets/convocation ceremony 3.jpeg',
    ],
    category: 'convocation',
    location: 'Grand Auditorium, Islamabad',
    featured: true,
    title: {
      en: 'Annual Convocation & Dastar-Bandi Ceremony',
      ur: 'دستارِ فضیلت و ختمِ بخاری شریف',
      ar: 'حفل التخرج السنوي وتتويج الخريجين',
    },
    desc: {
      en: "Annual graduation and turban ceremony honoring Jamia Islamabad's graduating muftis, scholars, and huffaz/qaris, attended by prominent scholars and families nationwide; Shaykh al-Hadith delivers the final hadith lesson from Sahih al-Bukhari.",
      ur: 'جامعہ اسلام آباد کے فاضلین، مفتیانِ کرام، اور حفاظ و قراء کی سالانہ تقریبِ دستارِ فضیلت و ختمِ بخاری شریف۔ اس بابرکت تقریب میں ملک بھر کے اکابر علماءِ کرام، شائقینِ علم اور فارغ التحصیل طلباء کے اولیاء شرکت کرتے ہیں، جہاں شیخ الحدیث صاحب صحیح البخاری کی آخری حدیث کا درس اور اختتامی بصیرت افروز خطاب فرماتے ہیں۔',
      ar: 'حفل التخرج السنوي وتتويج الخريجين والحفاظ في جامعة إسلام آباد، حيث يلقي شيخ الحديث الدرس الأخير من صحيح البخاري والكلمة الختامية.',
    },
  },

  // ── Event 2: Afkar-e-Sofiya Academic Conference ───────────────────────────
  {
    id: 'afkar-sofiya-conf',
    src: '/assets/afqar-e-sofia 3.jpeg',
    images: [
      '/assets/afqar-e-sofia 3.jpeg',
      '/assets/Adqar-e-Sofiya conference.jpeg',
      '/assets/Afqar-e-sofiya 2.jpeg',
      '/assets/afqar-e-sofia 4.jpeg',
      '/assets/afqar-e-sofia 5.jpeg',
      '/assets/afqar-e-sofia 6.jpeg',
    ],
    category: 'conferences',
    location: 'Main Conference Auditorium, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Afkar-e-Sofiya Academic Conference',
      ur: 'افکارِ صوفیاء کانفرنس',
      ar: 'مؤتمر أفكار الصوفية العلمي',
    },
    desc: {
      en: 'Conference held under Jamaat Jalaliya Pakistan, presided over by Shaykh al-Hadith, spreading the teachings of Data Ganj Bakhsh Ali Hujwiri, Mujaddid Alf Thani, Imam Ahmad Raza Khan, and other scholars aimed at spiritual reform, peace, and tolerance.',
      ur: 'جماعت جلالیہ پاکستان کے زیرِ اہتمام اور شیخ الحدیث صاحب کی صدارت میں انعقاد پذیر عظیم الشان افکارِ صوفیاء کانفرنس۔ جس کا بنیادی مقصد حضرت داتا گنج بخش علی ہجویری، مجدد الف ثانی، امام احمد رضا خان اور دیگر اکابر صوفیاء کی تعلیمات کو عام کرنا، روحانی اصلاح اور معاشرے میں امن، رواداری و توازن کو فروغ دینا ہے۔',
      ar: 'مؤتمر أفكار الصوفية المنعقد تحت مظلة جماعة جلالية باکستان برئاسة شيخ الحديث لترسيخ تعاليم كبار الصوفية ونشر السلام والتسامح والتربية الروحية.',
    },
  },

  // ── Event 3: Seerat Hazrat Abu Bakr Siddiq (RA) Conference ────────────────
  {
    id: 'abu-bakr-conf',
    src: '/assets/Hazrat Abu Bakr Siddiq Conference.jpeg',
    images: [
      '/assets/Hazrat Abu Bakr Siddiq Conference.jpeg',
    ],
    category: 'conferences',
    location: 'Main Auditorium, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Seerat Hazrat Abu Bakr Siddiq (RA) Conference',
      ur: 'حضرت سیدنا صدیقِ اکبرؓ کانفرنس',
      ar: 'مؤتمر سيرة سيدنا أبي بكر الصديق رضي الله عنه',
    },
    desc: {
      en: 'Annual conference under Jamaat Jalaliya Pakistan highlighting the character, truthfulness, loyalty, and historic services of Hazrat Abu Bakr Siddiq (RA), aimed at fostering sincerity and steadfastness.',
      ur: 'جماعت جلالیہ پاکستان کے زیرِ اہتمام منعقدہ سالانہ حضرت سیدنا صدیقِ اکبر رضی اللہ عنہ کانفرنس۔ اس علمی و روحانی اجتماع میں خلیفہ اول سیدنا ابو بکر صدیق رض کی سیرت، صداقت، وفاداری اور عظیم دینی و خلافت خدمات کو خراجِ تحسین پیش کیا جاتا ہے تاکہ مسلمانوں میں اخلاص اور استقامت بیدار ہو۔',
      ar: 'مؤتمر سنوي تحت رعاية جماعة جلالية باکستان يسلّط الضوء على سيرة الخليفة الأول سيدنا أبي بكر الصديق رضي الله عنه وصدقه وخدماته الجليلة للإسلام.',
    },
  },

  // ── Event 4: Seerat Imam Hussain (RA) & Shuhada Conference ────────────────
  {
    id: 'hussain-conf-main',
    src: '/assets/Hazrat Imam Hussain (RA) Conference.jpeg',
    images: [
      '/assets/Hazrat Imam Hussain (RA) Conference.jpeg',
      '/assets/Hazrat Imam Hussain (RA) Conference 1.jpeg',
      '/assets/Hazrat Imam Hussain (RA) Conference 2.jpeg',
    ],
    category: 'conferences',
    location: 'Central Convention Hall, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Seerat Imam Hussain (RA) & Shuhada Conference',
      ur: 'حضرت سیدنا امام حسینؓ کانفرنس',
      ar: 'مؤتمر سيرة الإمام الحسين رضي الله عنه وشهدائه',
    },
    desc: {
      en: "Annual conference under Islam Ulama Council International, presided over by the Principal, highlighting Imam Hussain's (RA) character, the event of Karbala, patience, and supreme sacrifice for truth.",
      ur: 'اسلام علماء کونسل انٹرنیشنل کے زیرِ اہتمام اور نگرانِ اعلیٰ کی صدارت میں منعقدہ سالانہ حضرت سیدنا امام حسین رضی اللہ عنہ کانفرنس۔ اس ہمہ گیر علمی سیمینار میں نواسہ رسول سیدنا امام حسین رض کے اسوہ حسنہ، واقعہ کربلا، صبر، اور باطل کے سامنے حق کے لیے عظیم قربانی کے عالمگیر اصولوں پر مفصل روشنی ڈالی جاتی ہے۔',
      ar: 'مؤتمر سنوي تحت إشراف مجلس علماء الإسلام الدولي برئاسة عميد الجامعة لإبراز سيرة الإمام الحسين رضي الله عنه وواقعة كربلاء والتضحية من أجل الحق.',
    },
  },

  // ── Event 5: Anjuman Islah-ul-Bayan Assembly ─────────────────────────────
  {
    id: 'assembly-speech-main',
    src: '/assets/The Assembly for the Reform of Speech.jpeg',
    images: [
      '/assets/The Assembly for the Reform of Speech.jpeg',
      '/assets/The Assembly for the Reform of Speech 1.jpeg',
      '/assets/The Assembly for the Reform of Speech 3.jpeg',
    ],
    category: 'assemblies',
    location: 'Anjuman Islah-ul-Bayan Stage, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Anjuman Islah-ul-Bayan Oratory Assembly',
      ur: 'بزمِ اصلاحُ البیان',
      ar: 'جمعية إصلاح البيان والخطابة',
    },
    desc: {
      en: "Weekly (Thursday) gathering under the Islamic Students Federation aimed at improving students' speech, intellectual maturity, confidence, and public speaking/da'wah skills.",
      ur: 'اسلامی اسٹوڈنٹس فیڈریشن کے زیرِ انتظام منعقد ہونے والی ہفتہ وار (جمعرات) علمی و تربیتی نشست "بزمِ اصلاحُ البیان"۔ اس پلیٹ فارم کے ذریعے طلباء کے اندر فنِ خطابت، فصاحت، فکری بالیدگی، اعتمادسازی اور دعوت و تبلیغ کی صلاحیتوں کو نکھارا اور سنوارا جاتا ہے۔',
      ar: 'تجمع أسبوعي (كل يوم خميس) تحت إشراف اتحاد الطلاب الإسلامي لتطوير مهارات الخطابة والفصاحة والنضج الفكري لدى الطلاب.',
    },
  },

  // ── Event 6: Shahadat Hazrat Ali al-Murtaza (RA) Conference ───────────────
  {
    id: 'shahadat-ali-main',
    src: '/assets/shahadat ali al murtaza conference.jpeg',
    images: [
      '/assets/shahadat ali al murtaza conference.jpeg',
      '/assets/shahadat ali al murtaza conference1.jpeg',
      '/assets/shahadat ali al murtaza conference2.jpeg',
    ],
    category: 'conferences',
    location: 'Conference Hall, Jamia Islamabad',
    featured: true,
    title: {
      en: 'Shahadat Hazrat Ali al-Murtaza (RA) Conference',
      ur: 'شہادتِ حضرت علی المرتضیٰؓ کانفرنس',
      ar: 'مؤتمر شهادة سيدنا علي المرتضى رضي الله عنه',
    },
    desc: {
      en: 'A scholarly conference commemorating the martyrdom and exceptional services of Hazrat Ali ibn Abi Talib (RA), the fourth Caliph of Islam.',
      ur: 'خلیفہ چہارم سیدنا حضرت علی المرتضیٰ رضی اللہ عنہ کی شہادت اور عظیم خدمات کی یاد میں علمی و تحقیقی کانفرنس۔',
      ar: 'مؤتمر علمي يُحيي ذكرى شهادة الإمام علي المرتضى رضي الله عنه وخدماته الجليلة للإسلام.',
    },
  },

  // ── Event 7: Bismillah Shareef Ceremony ────────────────────────────────────
  {
    id: 'bismillah-main',
    src: '/assets/Bismillah shareef.jpeg',
    images: [
      '/assets/Bismillah shareef.jpeg',
      '/assets/Bismillah shareef1.jpeg',
      '/assets/Bismillah shareef2.jpeg',
      '/assets/Bismillah shareef3.jpeg',
      '/assets/Bismillah shareef4.jpeg',
    ],
    category: 'assemblies',
    location: 'Jamia Islamabad Main Auditorium',
    featured: true,
    title: {
      en: 'Bismillah Shareef Ceremony',
      ur: 'تقریبِ بسم اللہ شریف',
      ar: 'حفل البسملة الشريفة',
    },
    desc: {
      en: 'A blessed ceremony marking the formal start of Quranic education for new students with the recitation of Bismillah and prayers from senior scholars.',
      ur: 'نئے طلباء کے قرآنی تعلیمی سفر کا باقاعدہ آغاز بسم اللہ شریف کی مبارک تقریب اور اکابر علماء کی دعاؤں کے ذریعے باوقار انداز میں۔',
      ar: 'حفل مبارك يُؤذن ببدء الرحلة القرآنية للطلاب الجدد بتلاوة البسملة الشريفة ودعاء كبار العلماء.',
    },
  },

  // ── Event 8: New Students Welcome Party ───────────────────────────────────
  {
    id: 'welcome-party-main',
    src: '/assets/Wemcome Party.jpeg',
    images: [
      '/assets/Wemcome Party.jpeg',
      '/assets/Wemcome Party1.jpeg',
      '/assets/Wemcome Party2.jpeg',
    ],
    category: 'assemblies',
    location: 'Jamia Islamabad Quad',
    featured: true,
    title: {
      en: 'New Students Welcome Ceremony',
      ur: 'نئے طلباء کی خیرمقدمی تقریب',
      ar: 'حفل استقبال الطلاب الجدد',
    },
    desc: {
      en: 'A warm welcome ceremony organized for new students joining Jamia Islamabad at the start of the academic session, fostering brotherhood and academic integration.',
      ur: 'نئے تعلیمی سال کے آغاز پر جامعہ اسلام آباد میں داخل ہونے والے طلباء کی پُرتپاک خیرمقدمی تقریب جس میں تعارفی نشست اور تربیتی رہنمائی فراہم کی گئی۔',
      ar: 'حفل استقبال دافئ ينظمه الطلاب والأساتذة لاستقبال الوافدين الجدد وتعزيز الأخوة والروابط الجماعية.',
    },
  },

  // ── Event 9: Kashmir Solidarity Peace Rally ───────────────────────────────
  {
    id: 'kashmir-rally-main',
    src: '/assets/Yakjehti Kashmir reeli.jpeg',
    images: [
      '/assets/Yakjehti Kashmir reeli.jpeg',
      '/assets/Yakjehti Kashmir 2.jpeg',
    ],
    category: 'rallies',
    location: 'Islamabad Avenue / Campus Outer',
    featured: true,
    title: {
      en: 'Kashmir Solidarity Peace Rally',
      ur: 'یومِ یکجہتیِ کشمیر عظیم الشان ریلی',
      ar: 'مسيرة التضامن السلمية مع كشمير',
    },
    desc: {
      en: 'Campus wide peaceful rally expressing solidarity with the oppressed people of Kashmir, led by faculty members and student councils.',
      ur: 'کشمیری عوام کے حقوق اور ان سے یکجہتی کے لیے جامعہ کے اساتذہ اور طلباء کی عظیم الشان پرامن ریلی اور مارچ۔',
      ar: 'مسيرة سلمية كبرى يقودها الأساتذة والطلاب للتضامن مع الشعب الكشميري الشقيق.',
    },
  },
];
