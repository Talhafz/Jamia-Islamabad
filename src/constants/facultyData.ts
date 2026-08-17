export interface FacultyMember {
  id: string;
  tier: 1 | 2 | 3;
  name: string;
  nameEn?: string;
  designation: string;
  designationEn?: string;
  additionalRoles?: string[];
  additionalRolesEn?: string[];
  department?: string;
  departmentEn?: string;
  qualifications?: string;
  qualificationsEn?: string;
  religiousEducation?: string;
  secularEducation?: string;
  currentServices?: string;
  experience?: string;
  bio?: string;
  bioEn?: string;
  photo?: string | null;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  // ── TIER 1: PRINCIPAL & SHAYKH AL-HADITH (SOLO CENTERED NODE) ──────────────
  {
    id: 'zafar-iqbal-jalali',
    tier: 1,
    name: 'پروفیسر ڈاکٹر محمد ظفر اقبال جلالی',
    nameEn: 'Prof. Dr. Muhammad Zafar Iqbal Jalali',
    designation: 'پرنسپل و شیخ الحدیث جامعہ اسلام آباد',
    designationEn: 'Principal & Shaykh al-Hadith, Jamia Islamabad',
    additionalRoles: [
      'چیئرمین: اسلام آباد ایجوکیشن اینڈ ریلیف فاؤنڈیشن',
      'چیئرمین: اسلام آباد ریسرچ بورڈ',
      'چانسلر: اسلام آباد انٹرنیشنل یونیورسٹی پاکستان (IIUP)',
      'چیف ایڈیٹر: مجلہ "اسلام آباد اسلامکس" (HEC تسلیم شدہ سہ لسانی ششماہی تحقیقی مجلہ)',
    ],
    additionalRolesEn: [
      'Chairman: Islamabad Education & Relief Foundation',
      'Chairman: Islamabad Research Board',
      'Chancellor: Islamabad International University Pakistan (IIUP)',
      'Chief Editor: "Islamabad Islamics" (HEC Recognized Trilingual Journal)',
    ],
    photo: '/assets/doctor_sahib.jpeg',
    bio: `پروفیسر ڈاکٹر محمد ظفر اقبال جلالی صاحب جامعہ اسلام آباد کے بانی، پرنسپل اور شیخ الحدیث ہیں۔ آپ ایک جید عالم دین، بین الاقوامی شہرت یافتہ محقق، مصنف اور ممتاز تعلیمی رہنما ہیں۔ آپ نے ہزاروں طلبہ اور علماء کرام کی تربیتی و علمی سرپرستی فرمائی ہے، جن میں سے متعدد ایم فل اور پی ایچ ڈی سکالرز کے طور پر ملک و قوم کی خدمت سرانجام دے رہے ہیں۔ آپ متعدد اعلیٰ علمی و تحقیقی اداروں کے سربراہ ہیں جن میں اسلام آباد ایجوکیشن اینڈ ریلیف فاؤنڈیشن، اسلام آباد ریسرچ بورڈ، اور اسلام آباد انٹرنیشنل یونیورسٹی پاکستان شامل ہیں۔ آپ ایچ ای سی سے منظور شدہ سہ لسانی تحقیقی مجلہ "اسلام آباد اسلامکس" کے ایڈیٹر انچیف بھی ہیں۔ آپ کی تصانیف میں "اخلاق کی پاکیزگی"، "ارمغان مظہری"، "اربعین مظہری"، اور "فتاویٰ جامعہ اسلام آباد" سمیت عربی و اردو میں متعدد علمی و تحقیقی کتب شامل ہیں۔ آپ نے قومی نصاب کونسل میں اہم خدمات سرانجام دیں اور پی ٹی وی نیوز، مختلف ٹی وی چینلز اور روزنامہ اوصاف میں ہفتہ وار کالموں کے ذریعے دینی و علمی رہنمائی فراہم کی ہے۔ آپ کا روحانی و علمی تعلق درگاہ عالیہ بھکی شریف سے ہے۔`,
  },

  // ── TIER 2: SENIOR DIRECTORS & LECTURERS (3 NODES) ────────────────────────
  {
    id: 'rafaqat-ali-jalali',
    tier: 2,
    name: 'حافظ مفتی محمد رفاقت علی جلالی',
    nameEn: 'Hafiz Mufti Muhammad Rafaqat Ali Jalali',
    designation: 'مدرس و ڈائریکٹر امور رہائش',
    designationEn: 'Lecturer & Director of Residential Affairs',
    department: 'Islamic Studies | Tafsir | Usul al-Tafsir | Hadith | Usul al-Hadith | Fiqh | Ilm al-Kalam | Research',
    departmentEn: 'Islamic Studies | Tafsir | Usul al-Tafsir | Hadith | Usul al-Hadith | Fiqh | Ilm al-Kalam | Research',
    qualifications: 'PhD (Usul al-Tafsir) – In Progress | Mufti Specialization | Shahadat-ul-Alamiyyah | Hifz al-Qur\'an',
    qualificationsEn: 'PhD (Usul al-Tafsir) – In Progress | Mufti Specialization | Shahadat-ul-Alamiyyah | Hifz al-Qur\'an',
    photo: '/assets/rafaqat_square.jpg',
    bioEn: `Hafiz Mufti Muhammad Rafaqat Ali Jalali is a Lecturer and Director of Residential Affairs at Jamia Islamabad. He possesses over 10 years of formal teaching experience in higher Islamic learning and more than 20 years of active religious preaching, community leadership, and khutbah services. As a certified Mufti and PhD scholar in Usul al-Tafsir, he manages student residential affairs, conducts research in Quranic and Hadith sciences, contributes columns, participates in media programs, and delivers lectures at national academic conferences.`,
  },
  {
    id: 'aslam-jalali',
    tier: 2,
    name: 'ڈاکٹر مفتی محمد اسلم جلالی',
    nameEn: 'Dr. Mufti Muhammad Aslam Jalali',
    designation: 'ناظم تعلیمات جامعہ اسلام آباد',
    designationEn: 'Director of Academics, Jamia Islamabad',
    religiousEducation: 'شہادۃ العالمیہ فی علوم العربیہ',
    secularEducation: 'پی ایچ ڈی عربی',
    currentServices: 'تدریس، خطابت اور نظامت تعلیم',
    experience: '23 سال',
    department: 'تدریس و تحقیق و نظامت تعلیم',
    photo: '/assets/dr. aslam sahib.jpeg',
    bio: `ڈاکٹر مفتی محمد اسلم جلالی جامعہ اسلام آباد کے ناظم تعلیمات اور سینئر استاد ہیں۔ آپ نے دینی تعلیم میں شہادۃ العالمیہ اور عصری تعلیم میں عربی زبان و ادبیات میں پی ایچ ڈی کی ڈگری حاصل کی ہے۔ آپ کو تدریس، تحقیق، خطابت اور تعلیمی نظامت کا 23 سالہ وسیع تجربہ حاصل ہے۔`,
  },
  {
    id: 'majid-nawaz-jalali',
    tier: 2,
    name: 'ڈاکٹر محمد مجید نواز ملک جلالی',
    nameEn: 'Dr. Muhammad Majid Nawaz Malik Jalali',
    designation: 'سینئر مدرس جامعہ اسلام آباد',
    designationEn: 'Senior Teacher, Jamia Islamabad',
    department: 'Islamic Studies | Fiqh | Hadith | Seerah | Research',
    departmentEn: 'Islamic Studies | Fiqh | Hadith | Seerah | Research',
    qualifications: 'PhD Islamic Studies (University of Karachi) | MA Arabic (Gold Medalist) | Alimiyyah',
    qualificationsEn: 'PhD Islamic Studies (University of Karachi) | MA Arabic (Gold Medalist) | Alimiyyah',
    photo: '/assets/majid nawaz.jpeg',
    bioEn: `Dr. Muhammad Majid Nawaz Malik Jalali is a Senior Teacher at Jamia Islamabad with over 10 years of academic teaching and research experience. A Gold Medalist in MA Arabic and PhD holder in Islamic Studies from the University of Karachi, he specializes in Fiqh, Hadith, Seerah, and research methodology. He has published research papers in HEC-recognized journals, contributed to curriculum development, and organized multiple national academic conferences.`,
  },

  // ── TIER 3: LECTURERS & RESEARCH SCHOLARS (11 NODES) ─────────────────────
  {
    id: 'iqbal-chohan',
    tier: 3,
    name: 'حافظ محمد اقبال چوہان',
    nameEn: 'Hafiz Muhammad Iqbal Chohan',
    designation: 'اسلامک سکالر | محقق | مدرس | امام و خطیب',
    designationEn: 'Islamic Scholar | Researcher | Lecturer | Imam & Khateeb',
    qualifications: 'MPhil (Islamic Studies)',
    qualificationsEn: 'MPhil (Islamic Studies)',
    photo: null,
    bioEn: `Hafiz Muhammad Iqbal Chohan is an MPhil Islamic Scholar, researcher, lecturer, and experienced Imam & Khateeb. He brings extensive expertise in Islamic jurisprudence, Quranic studies, and academic research, contributing actively to teaching and community spiritual leadership.`,
  },
  {
    id: 'zahoor-ahmad',
    tier: 3,
    name: 'ظہور احمد',
    designation: 'رکن شعبہ تحقیق',
    religiousEducation: 'الشھادة العالمیہ (فراغت 2019)',
    secularEducation: 'پی ایچ ڈی (انڈونیشیا)',
    currentServices: 'مدرس اینڈ امام وخطیب',
    experience: '5 سال',
    photo: '/assets/zahoor sahib.jpeg',
  },
  {
    id: 'abdul-shakoor',
    tier: 3,
    name: 'عبدالشکور',
    designation: 'مدرس',
    religiousEducation: 'ایم ایس عربیک (فراغت 2023)',
    secularEducation: 'بی اے',
    currentServices: 'مہتمم ادارہ الزھراء، خطیب، استاذ',
    experience: '4 سال',
    photo: '/assets/Abdushaqoor sahib.jpeg',
  },
  {
    id: 'wajih-ul-hassan',
    tier: 3,
    name: 'محمد وجیہ الحسن جلالی',
    designation: 'نائب نگران امور رہائش و طعام',
    religiousEducation: 'الشھادة العالمیہ (فراغت 2018)',
    secularEducation: 'ایم فل سکالر',
    currentServices: 'مدرس اینڈ امام وخطیب',
    experience: '7 سال',
    photo: '/assets/wajih ul hassan sahib.jpeg',
  },
  {
    id: 'tauheed-ahmad-hazarvi',
    tier: 3,
    name: 'علامہ مفتی توحید احمد ہزاروی',
    designation: 'کوآرڈینیٹر شعبہ تعلیم',
    religiousEducation: 'شھادۃ العالمیہ (فراغت 2017)',
    secularEducation: 'پی ایچ ڈی (اسلامک اسٹڈیز)',
    currentServices: 'مدرس، امام و خطیب، محقق',
    experience: '7 سال',
    photo: '/assets/tauheed sahib.jpeg',
  },
  {
    id: 'rizwan-ahmad',
    tier: 3,
    name: 'رضوان احمد',
    designation: 'صدر مدرس',
    religiousEducation: 'حفظِ قرآن، تجوید و قراءت، درسِ نظامی مکمل (فراغت 2019)',
    secularEducation: 'بیچلر',
    currentServices: 'تدریسِ تجوید و قراءت',
    experience: '7 سال',
    photo: '/assets/Qari rizwan.jpeg',
  },
  {
    id: 'sami-ul-haq',
    tier: 3,
    name: 'سمیع الحق جلالی',
    designation: 'نائب ناظم تعلیمات جامعہ اسلام آباد',
    religiousEducation: 'شہادت العالمیہ فی علوم العربیہ (فراغت 2018)',
    secularEducation: 'ایم فل',
    currentServices: 'تدریس و نظامت تعلیم',
    experience: '5 سال',
    photo: null,
  },
  {
    id: 'shehzad-khan',
    tier: 3,
    name: 'شہزاد خان',
    designation: 'مدرس',
    religiousEducation: 'الشھادة العالمیہ (فراغت 2023)',
    secularEducation: 'ایم ایس اسلامک سٹڈیز',
    currentServices: 'مدرس اینڈ امام وخطیب',
    experience: '4 سال',
    photo: '/assets/shehzad sahib.jpeg',
  },
  {
    id: 'syed-shafqat-hussain',
    tier: 3,
    name: 'سید شفقت حسین شاہ صاحب',
    designation: 'مدرس، خطیب، امام',
    religiousEducation: 'شہادت العالمیہ فی علوم العربیہ (فراغت 2012)',
    secularEducation: 'مڈل',
    experience: '13 سال',
    photo: '/assets/syed shafqat shah sahib.jpeg',
  },
  {
    id: 'sirajuddin-durrani',
    tier: 3,
    name: 'سراج دین جلالی ولد روشن دین خان درانی',
    designation: 'فاضل و مدرس جامعہ اسلام آباد',
    qualifications: 'شھادۃ العالمیہ، ایم اے عربی، B.Ed (علامہ اقبال اوپن یونیورسٹی)',
    currentServices: 'ادارے سے منسلک: 9 سال | تدریس: 2 سال',
    photo: '/assets/sirajuddin.png',
  },
  {
    id: 'hasnat-ahmad-sabri',
    tier: 3,
    name: 'حافظ حسنات احمد صابری ولد محمد طالب حسین',
    designation: 'مدرس و خادم جامعہ اسلام آباد',
    qualifications: 'شھادۃ العالمیہ، اے ٹی ٹی سی، میٹرک',
    currentServices: 'جامعہ سے وابستگی: 19 سال',
    photo: '/assets/hasnat sahib.jpeg',
  },
];
