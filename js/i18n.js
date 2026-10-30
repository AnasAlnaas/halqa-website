/* ==========================================================================
   Halqa — translations
   --------------------------------------------------------------------------
   Every piece of text on the site lives here, once in English and once in
   Arabic. In index.html each element carries data-i18n="key" and holds the
   English text directly, so the page is complete and readable before any
   JavaScript runs (this matters for Google and for WhatsApp link previews).

   TO EDIT COPY: change it in BOTH the en and ar block below, and in
   index.html if you are changing the English.
   TO ADD A STRING: give the element data-i18n="some.key" in index.html,
   then add "some.key" to both blocks here.

   Attributes are translated with data-i18n-attr="attribute:key", e.g.
   data-i18n-attr="aria-label:gallery.openLabel".
   ========================================================================== */

window.HALQA_I18N = {
  en: {
    /* ---- document head ---- */
    'meta.title': "Halqa — Learn Arabic, Qur'an & the Seerah with Anas",
    'meta.description':
      "Private and small-group online lessons in Arabic, Qur'an recitation and Tajweed, and the Seerah of the Prophet ﷺ. Native Arabic teacher, 300+ students taught, rated 5.0 on Preply. Free trial lesson.",

    /* ---- chrome ---- */
    'skip.link': 'Skip to main content',
    'theme.toDark': 'Switch to dark theme',
    'theme.toLight': 'Switch to light theme',
    'nav.courses': 'Courses',
    'nav.formats': 'Groups & private',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.reviews': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.book': 'Book a lesson',
    'nav.menuLabel': 'Open menu',
    'lang.label': 'Site language',

    /* ---- hero ---- */
    'hero.eyebrow': "Arabic · Qur'an · Seerah — taught online",
    'hero.title': 'Learn Arabic and the Seerah of the Prophet ﷺ with a teacher beside you',
    'hero.sub':
      'Private one-to-one lessons and small live groups for non-Arabic speakers. Every course is shaped around your level, your goal and your pace.',
    'hero.ctaPrimary': 'Book a free trial lesson',
    'hero.ctaSecondary': 'See the courses',
    'hero.note':
      'Lessons in English or Arabic · Based in Libya (UTC+2) · Usually replies within a few hours',
    'hero.portraitAlt': 'Anas, Arabic and Islamic studies teacher',
    'hero.ratingLabel': 'rated on Preply',
    /* The animated headline: "Learn ___ with a teacher beside you", with the
       blank typed out word by word. The full sentence in hero.title above is
       still what Google and screen readers get. */
    'hero.typedBefore': 'Learn',
    'hero.typedWords': ['Arabic', "the Qur'an", 'Tajweed', 'the Seerah ﷺ'],
    'hero.typedAfter': 'with a teacher beside you',
    'trust.lessons': 'Lessons on Preply',
    'trust.students': 'Students taught',
    'trust.rating': 'Average rating',
    'trust.native': 'Native',
    'trust.nativeLabel': 'Arabic speaker',

    /* ---- now running ---- */
    'now.eyebrow': 'Happening now',
    'now.title': 'Two courses on the calendar',
    'now.lede':
      'One halqa is running right now, and a new one opens soon. Both are also available as private lessons whenever suits you.',
    'now.liveBadge': 'Ongoing now',
    'now.soonBadge': 'Opening soon',
    'now.sirahTitle': 'Seerah of the Prophet ﷺ',
    'now.sirahText':
      'We are moving through the life of the Prophet ﷺ session by session — Makkah, the Hijrah, Madinah — with the context behind each event and what it asks of us.',
    'now.sirahP1': 'Live small group, one session a week — message me and I will send you a time that suits you',
    'now.sirahP2': 'You can join the halqa that is already running',
    'now.sirahP3': 'Catch-up notes if you miss a session',
    'now.sirahCta': 'Join the running halqa',
    'now.dayTitle': 'The Prophetic Day',
    'now.dayText':
      'A day in the life of the Prophet ﷺ from waking to sleeping — his worship, his manners, his habits — and how to bring that shape into your own day.',
    'now.dayP1': 'A new group opens soon, in shā’ Allāh',
    'now.dayP2': 'Seats are reserved in advance',
    'now.dayP3': 'Booking early gets first choice of times',
    'now.dayCta': 'Reserve a seat',
    'now.privateNote':
      'Prefer to study alone? Every course here can be taught one-to-one, starting any week of the year.',

    /* ---- courses ---- */
    'courses.eyebrow': 'What I teach',
    'courses.title': 'Courses',
    'courses.lede':
      'Five courses, each available privately or in a small group. If what you want is not listed, ask — most students end up with something built for them.',
    'courses.openBadge': 'Open for booking',
    'courses.bookCta': 'Book',

    'course.arabic.title': 'Arabic for Non-Arabic Speakers',
    'course.arabic.text':
      'Speak, listen and build real Arabic from zero, or from wherever you stopped. Grammar comes in only as far as it serves you actually using the language.',
    'course.arabic.m1': 'All levels',
    'course.arabic.m2': 'Private or group',
    'course.arabic.m3': '45–60 min',

    'course.writing.title': 'Reading & Writing in Arabic',
    'course.writing.text':
      'The alphabet, the letter shapes, the vowel marks — then real reading with tashkeel, until the script stops looking like decoration and starts being words.',
    'course.writing.m1': 'Beginner',
    'course.writing.m2': 'Private or group',
    'course.writing.m3': '45 min',

    'course.quran.title': "Qur'an Recitation & Tajweed for Kids",
    'course.quran.text':
      'Patient recitation lessons for children, with the rules of Tajweed taught by ear and by example rather than as a list to memorise.',
    'course.quran.m1': 'Ages 6–14',
    'course.quran.m2': 'Private',
    'course.quran.m3': '30–45 min',

    'course.sirah.title': 'Seerah of the Prophet ﷺ',
    'course.sirah.text':
      'The life of the Prophet ﷺ told as one continuous story, with the history around it kept intact. Currently running as a weekly group.',
    'course.sirah.m1': 'All levels',
    'course.sirah.m2': 'Group or private',
    'course.sirah.m3': 'Weekly',

    'course.day.title': 'The Prophetic Day',
    'course.day.text':
      'His day from morning to night — worship, manners, work, rest — and the practical shape it gives to an ordinary day now.',
    'course.day.m1': 'All levels',
    'course.day.m2': 'Group or private',
    'course.day.m3': 'Opening soon',

    /* {price} is filled in from HALQA_PRICES at the bottom of this file */
    'price.from': 'From',
    'price.perLesson': 'per lesson',
    'price.perStudent': 'per lesson, per student',
    'price.privateLine': '{price} one-to-one',
    'price.privateOnly': 'One-to-one lessons',
    'price.ask': 'Pricing on request',
    'price.trial': 'First lesson free',

    /* ---- formats ---- */
    'formats.eyebrow': 'Two ways to study',
    'formats.title': 'A weekly group, or the hour entirely to yourself',
    'formats.lede':
      'I teach ongoing groups and I take private students. Neither is the fallback for the other — they suit different people, and some students do both.',
    'formats.groupTitle': 'Live small groups',
    'formats.groupText':
      'You learn alongside a handful of other students in a fixed weekly halqa. Questions get asked out loud, and the group keeps everyone moving.',
    'formats.groupP1': 'Lower price per session',
    'formats.groupP2': 'A fixed weekly rhythm that is easy to keep',
    'formats.groupP3': "You learn from other students' questions too",
    'formats.groupP4': 'Running now: the Seerah halqa',
    'formats.privateTitle': 'Private one-to-one',
    'formats.privateText':
      'The whole session is yours. We set the pace, the times and the syllabus around you, and you can start in any week of the year.',
    'formats.privateP1': 'Times chosen around your timezone',
    'formats.privateP2': 'A syllabus built on your specific goal',
    'formats.privateP3': 'Move as fast, or as slowly, as you need',
    'formats.privateP4': 'Available for every course on this page',
    'formats.groupCta': 'Ask about the group',
    'formats.privateCta': 'Ask about private lessons',

    /* ---- about ---- */
    'about.eyebrow': 'Your teacher',
    'about.title': 'Anas',
    'about.role': 'Arabic, Qur’an, Islamic Studies and Sira',
    'about.text':
      'I have taught more than 300 students — on Preply, on other platforms, and in real classrooms with a blackboard, notebooks and children sitting on the carpet. I teach Arabic, Qur’an recitation, Islamic Studies and the Sira. What I care about is that a lesson lands: that you leave it able to do something you could not do an hour earlier.',
    'about.c1': 'Certified native Arabic tutor',
    'about.c1sub':
      'Arabic is my first language, and teaching it to non-native speakers is what I do every week.',
    'about.c2': "Qur'an recitation & Tajweed",
    'about.c2sub':
      'The rules of Tajweed explained so that someone who does not speak Arabic can still hear them and copy them.',
    'about.c3': 'Islamic Studies & Sira',
    'about.c3sub':
      'The life of the Prophet ﷺ and the history surrounding it, taught as a story with its context kept in place.',
    'about.c4': 'Interactive by default',
    'about.c4sub':
      'Boards, images, manuscripts and questions — not a lecture read out loud at you.',
    /* {rating}, {lessons}, {reviews} and {students} come from HALQA_STATS */
    'about.c5': '{rating} on Preply across {lessons} lessons',
    'about.c5sub':
      'Part of more than {students} students taught in total, between online platforms and real classrooms.',
    'about.figCaption':
      'Teaching الكتابة — the shape of early Kufic script — from an original manuscript.',
    'about.figAlt':
      'Anas teaching at a smartboard showing an early Kufic Qur’an manuscript, with two students watching',

    /* ---- how it works ---- */
    'how.eyebrow': 'How it works',
    'how.title': 'From a message to your first lesson',
    'how.s1': 'Send a message',
    'how.s1text':
      'WhatsApp or Telegram, in English or Arabic. Tell me what you want to learn and roughly where you are now.',
    'how.s2': 'Take a free trial',
    'how.s2text':
      'We meet for a short first session, find your real level, and agree on a plan. Nothing to pay for this one.',
    'how.s3': 'Pick your times',
    'how.s3text':
      'A fixed weekly slot if you join a group, or times chosen around your timezone if you study privately.',
    'how.s4': 'Start, and keep going',
    'how.s4text':
      'You get the material after each session, and we keep track of what has been covered so nothing quietly gets lost.',

    /* The animated example chat beside the steps */
    'chat.label':
      'An example WhatsApp conversation: a student asks to learn Arabic as a complete beginner, and Anas offers a free trial lesson and asks for their timezone.',
    'chat.name': 'Anas · Halqa',
    'chat.online': 'online',
    'chat.typing': 'typing…',
    'chat.placeholder': 'Message',
    'chat.m1': "Assalamu alaykum! I'd like to learn Arabic. I'm a complete beginner 🙂",
    'chat.m2':
      'Wa alaykum assalam, welcome! We start with a free trial lesson to find your level. Which city or timezone are you in?',
    'chat.m3': 'London.',
    'chat.m4': 'Perfect. I will send you a few times that suit you. See you soon, in shā’ Allāh 🌱',
    'chat.caption': 'An example of how a first conversation usually goes',

    /* ---- gallery ---- */
    'gallery.eyebrow': 'From the classroom',
    'gallery.title': 'Moments of learning',
    'gallery.lede':
      'Real sessions — a blackboard, open notebooks, a manuscript on the screen, children on the carpet.',
    'gallery.openLabel': 'Open larger',
    'gallery.close': 'Close',
    'gallery.prev': 'Previous photo',
    'gallery.next': 'Next photo',

    'g1.alt':
      'Teacher at a smartboard displaying an early Kufic Qur’an manuscript, two students seated in front',
    'g2.alt':
      'Blackboard with a chalk diagram of the Night Journey showing the seven heavens labelled in Arabic',
    'g3.alt': 'The words al-Sīrah al-Nabawiyyah written in chalk on a blackboard',
    'g4.alt':
      'Children sitting on a patterned carpet with open notebooks, practising Arabic writing',
    'g5.alt': 'A small study group sitting together outdoors on a green pitch',
    'g6.alt':
      "A live online Sirah session: the shared slide reads 'His support for the Prophet ﷺ' above an illustration of an old Arabian town, with students' video tiles alongside",

    /* ---- reviews ---- */
    'reviews.eyebrow': 'From my students',
    'reviews.title': '{rating} out of 5 on Preply',
    'reviews.lede': 'Every review below was left by a verified student on Preply.',
    'reviews.verified': 'Verified Preply student',
    'reviews.cta': 'See my Preply profile',
    'preply.ratingLabel': 'Average rating on Preply',
    'preply.lessons': 'Lessons taught on Preply',
    'preply.reviews': 'Verified reviews',
    'review.mak':
      'An excellent teacher, very patient and able to identify areas I struggle with and how I can improve. Highly recommend!',
    'review.hala':
      'He is reliable, punctual, and very dedicated to his work. I can recommend him without reservation and am very satisfied with his teaching. Particularly noteworthy is his ability to explain the correct pronunciation (Tajwīd) in an understandable way.',
    'review.karim':
      'Really great teacher, I’m having a lot of fun. He is super friendly and is helping me a lot with my speaking skills. Definitely recommend him!',

    /* ---- gift ---- */
    'gift.title': "A gift for the people of the Qur'an",
    'gift.text':
      'If you carry a significant portion of the Noble Qur’an in your memory, there is a standing discount on every course on this page. Mention it when you message and it is applied — no forms, no proof asked for.',
    'gift.mark': 'In appreciation of what you already carry.',

    /* ---- faq ---- */
    'faq.eyebrow': 'Before you book',
    'faq.title': 'Questions students usually ask',
    'faq.q1': 'Do I need any Arabic to start?',
    'faq.a1':
      'No. Several of my students began at the alphabet. Lessons are taught in English and shift into more Arabic as you grow into it.',
    'faq.q2': 'How long is a lesson?',
    'faq.a2':
      'Usually 45 to 60 minutes for adults and 30 to 45 for children. We adjust once we both see what holds attention and what does not.',
    'faq.q3': 'Is the first lesson really free?',
    'faq.a3':
      'Yes. The first short session is a trial: we check your level, talk through your goal, and agree on a plan. You decide afterwards whether to continue.',
    'faq.qPrice': 'How much do lessons cost?',
    'faq.aPrice':
      '$10 per lesson one-to-one, or $6 per student in a group, and the first lesson is free. These are the prices when you book with me directly on WhatsApp or Telegram; Preply sets its own price on its platform.',
    'faq.q4': 'What do I need for a lesson?',
    'faq.a4':
      'A phone or laptop with a stable connection, and something to write in. Any material you need is sent to you before we meet.',
    'faq.q5': 'Which platform do we meet on?',
    'faq.a5':
      'Google Meet, or the Preply classroom — those two for now. Booking through Preply keeps the scheduling and the payment in one place.',
    'faq.q6': 'Can I book lessons for my child?',
    'faq.a6':
      'Yes — and not only the recitation course. Every course here is built to work for young learners, with the pace, the examples and the length of the session adjusted to their age. Parents are welcome to sit in on the first lessons.',
    'faq.q7': 'What times are you available?',
    'faq.a7':
      'I teach across a wide spread of hours, from early morning through to late evening. Send me your city or your timezone and I will send back the slots that work.',

    /* ---- contact ---- */
    'contact.eyebrow': 'Get started',
    'contact.title': 'Tell me what you want to learn',
    'contact.lede':
      'A message is enough to begin — no form to fill in, no account to make. I answer in English or Arabic.',
    'contact.waTitle': 'WhatsApp',
    'contact.waSub': 'Fastest reply',
    'contact.tgTitle': 'Telegram',
    'contact.tgSub': 'If you prefer it',
    'contact.pyTitle': 'Preply',
    'contact.pySub': 'Book and pay in one place',
    'contact.note':
      'Usually replies within a few hours (UTC+2). Group seats and private lessons are both open.',

    /* ---- footer ---- */
    'footer.tagline': "Arabic · Qur'an · Seerah",
    'footer.rights': 'Halqa Edu. All rights reserved.'
  },

  ar: {
    /* ---- document head ---- */
    'meta.title': 'حلقة — تعلّم العربية والقرآن والسيرة النبوية مع أنس',
    'meta.description':
      'دروس أونلاين فردية ومجموعات صغيرة في اللغة العربية، وتلاوة القرآن والتجويد، والسيرة النبوية. معلّم عربي أصلي، أكثر من 300 طالب، وتقييم 5.0 على Preply. الدرس الأول مجاني.',

    /* ---- chrome ---- */
    'skip.link': 'انتقل إلى المحتوى',
    'theme.toDark': 'التبديل إلى الوضع الداكن',
    'theme.toLight': 'التبديل إلى الوضع الفاتح',
    'nav.courses': 'الدورات',
    'nav.formats': 'مجموعات وفردي',
    'nav.about': 'عن المعلّم',
    'nav.gallery': 'من الحلقة',
    'nav.reviews': 'التقييمات',
    'nav.faq': 'أسئلة شائعة',
    'nav.book': 'احجز درسًا',
    'nav.menuLabel': 'افتح القائمة',
    'lang.label': 'لغة الموقع',

    /* ---- hero ---- */
    'hero.eyebrow': 'العربية · القرآن · السيرة — عبر الإنترنت',
    'hero.title': 'تعلّم العربية وسيرة النبي ﷺ ومعلّمك إلى جانبك',
    'hero.sub':
      'دروس فردية ومجموعات صغيرة مباشرة لغير الناطقين بالعربية. كل دورة تُبنى على مستواك وهدفك وسرعتك في التعلّم.',
    'hero.ctaPrimary': 'احجز درسًا تجريبيًا مجانًا',
    'hero.ctaSecondary': 'اطّلع على الدورات',
    'hero.note':
      'الدروس بالإنجليزية أو العربية · من ليبيا (UTC+2) · الرد عادةً خلال ساعات',
    'hero.portraitAlt': 'أنس، معلّم اللغة العربية والدراسات الإسلامية',
    'hero.ratingLabel': 'التقييم على Preply',
    'hero.typedBefore': 'تعلّم',
    'hero.typedWords': ['العربية', 'تلاوة القرآن', 'التجويد', 'السيرة النبوية'],
    'hero.typedAfter': 'ومعلّمك إلى جانبك',
    'trust.lessons': 'درسًا على Preply',
    'trust.students': 'طالبًا',
    'trust.rating': 'متوسط التقييم',
    'trust.native': 'أصلي',
    'trust.nativeLabel': 'ناطق بالعربية',

    /* ---- now running ---- */
    'now.eyebrow': 'يجري الآن',
    'now.title': 'دورتان على الجدول',
    'now.lede':
      'حلقة تعمل الآن، وأخرى تُفتح قريبًا. وكلتاهما متاحة كدروس فردية في أي وقت يناسبك.',
    'now.liveBadge': 'مستمرة الآن',
    'now.soonBadge': 'تبدأ قريبًا',
    'now.sirahTitle': 'السيرة النبوية',
    'now.sirahText':
      'نسير في سيرة النبي ﷺ حلقةً بعد حلقة — مكة، والهجرة، والمدينة — مع سياق كل حدث وما يطلبه منّا.',
    'now.sirahP1': 'مجموعة صغيرة مباشرة، لقاء أسبوعي — أرسل رسالة وأخبرك بالوقت المناسب لك',
    'now.sirahP2': 'يمكنك الانضمام إلى الحلقة الجارية الآن',
    'now.sirahP3': 'ملخّصات تعويضية إن فاتك لقاء',
    'now.sirahCta': 'انضم إلى الحلقة الجارية',
    'now.dayTitle': 'اليوم النبوي',
    'now.dayText':
      'يوم من حياة النبي ﷺ من الاستيقاظ إلى النوم — عبادته وأخلاقه وعاداته — وكيف تُعيد هذه الهيئة إلى يومك أنت.',
    'now.dayP1': 'مجموعة جديدة تُفتح قريبًا بإذن الله',
    'now.dayP2': 'المقاعد تُحجز مسبقًا',
    'now.dayP3': 'الحجز المبكر يختار الأوقات أولًا',
    'now.dayCta': 'احجز مقعدًا',
    'now.privateNote':
      'تفضّل الدراسة وحدك؟ كل دورة هنا تُدرَّس فرديًا كذلك، وتبدأ في أي أسبوع من السنة.',

    /* ---- courses ---- */
    'courses.eyebrow': 'ما أُدرّسه',
    'courses.title': 'الدورات',
    'courses.lede':
      'خمس دورات، كل واحدة متاحة فرديًا أو في مجموعة صغيرة. وإن لم تجد ما تريد فاسأل — أكثر الطلاب ينتهون بخطة مصمّمة لهم.',
    'courses.openBadge': 'الحجز مفتوح',
    'courses.bookCta': 'احجز',

    'course.arabic.title': 'العربية لغير الناطقين بها',
    'course.arabic.text':
      'تتحدّث وتسمع وتبني عربية حقيقية من الصفر، أو من حيث توقّفت. والقواعد تأتي بقدر ما تخدم استخدامك الفعلي للغة.',
    'course.arabic.m1': 'كل المستويات',
    'course.arabic.m2': 'فردي أو مجموعة',
    'course.arabic.m3': '45–60 دقيقة',

    'course.writing.title': 'القراءة والكتابة بالعربية',
    'course.writing.text':
      'الحروف وأشكالها والحركات، ثم قراءة حقيقية بالتشكيل، حتى يتحوّل الخط من زخرفة إلى كلمات تقرؤها.',
    'course.writing.m1': 'مبتدئ',
    'course.writing.m2': 'فردي أو مجموعة',
    'course.writing.m3': '45 دقيقة',

    'course.quran.title': 'تلاوة القرآن والتجويد للأطفال',
    'course.quran.text':
      'دروس تلاوة هادئة للأطفال، تُعلَّم فيها أحكام التجويد بالسماع والمحاكاة لا بالحفظ المجرّد.',
    'course.quran.m1': 'من 6 إلى 14 سنة',
    'course.quran.m2': 'فردي',
    'course.quran.m3': '30–45 دقيقة',

    'course.sirah.title': 'السيرة النبوية',
    'course.sirah.text':
      'سيرة النبي ﷺ تُروى قصةً واحدة متّصلة، بتاريخها المحيط بها كما هو. وتعمل الآن كمجموعة أسبوعية.',
    'course.sirah.m1': 'كل المستويات',
    'course.sirah.m2': 'مجموعة أو فردي',
    'course.sirah.m3': 'أسبوعيًا',

    'course.day.title': 'اليوم النبوي',
    'course.day.text':
      'يومه ﷺ من الصباح إلى الليل — عبادةً وخُلقًا وعملًا وراحة — والهيئة العملية التي يمنحها ليومٍ عادي اليوم.',
    'course.day.m1': 'كل المستويات',
    'course.day.m2': 'مجموعة أو فردي',
    'course.day.m3': 'قريبًا',

    'price.from': 'يبدأ من',
    'price.perLesson': 'للدرس',
    'price.perStudent': 'للدرس، لكل طالب',
    'price.privateLine': '{price} للدرس الفردي',
    'price.privateOnly': 'دروس فردية',
    'price.ask': 'السعر عند الطلب',
    'price.trial': 'الدرس الأول مجانًا',

    /* ---- formats ---- */
    'formats.eyebrow': 'طريقتان للدراسة',
    'formats.title': 'حلقة أسبوعية، أو الوقت كله لك وحدك',
    'formats.lede':
      'أُدرّس مجموعات مستمرة، وأستقبل طلابًا أفرادًا. وليست إحداهما بديلًا عن الأخرى — كل واحدة تناسب شخصًا، وبعض الطلاب يجمع بينهما.',
    'formats.groupTitle': 'مجموعات صغيرة مباشرة',
    'formats.groupText':
      'تتعلّم مع عدد قليل من الطلاب في حلقة أسبوعية ثابتة. تُطرح الأسئلة بصوت مسموع، والمجموعة تدفع الجميع إلى الأمام.',
    'formats.groupP1': 'سعر أقل للحلقة',
    'formats.groupP2': 'إيقاع أسبوعي ثابت يسهل الالتزام به',
    'formats.groupP3': 'تستفيد من أسئلة بقية الطلاب أيضًا',
    'formats.groupP4': 'تعمل الآن: حلقة السيرة',
    'formats.privateTitle': 'دروس فردية',
    'formats.privateText':
      'الدرس كله لك. نضبط السرعة والأوقات والمنهج على مقاسك، ويمكنك أن تبدأ في أي أسبوع من السنة.',
    'formats.privateP1': 'أوقات تُختار حسب توقيت بلدك',
    'formats.privateP2': 'منهج يُبنى على هدفك تحديدًا',
    'formats.privateP3': 'تتقدّم بالسرعة التي تحتاجها، سريعة أو هادئة',
    'formats.privateP4': 'متاحة لكل دورة في هذه الصفحة',
    'formats.groupCta': 'اسأل عن المجموعة',
    'formats.privateCta': 'اسأل عن الدروس الفردية',

    /* ---- about ---- */
    'about.eyebrow': 'معلّمك',
    'about.title': 'أنس',
    'about.role': 'العربية والقرآن والدراسات الإسلامية والسيرة',
    'about.text':
      'درّست أكثر من 300 طالب — على Preply وعلى منصّات أخرى وفي صفوف حقيقية، بسبّورة ودفاتر وأطفال يجلسون على السجّاد. أُدرّس العربية وتلاوة القرآن والدراسات الإسلامية والسيرة. وما يهمّني أن يصل الدرس فعلًا: أن تخرج منه قادرًا على شيء لم تكن تقدر عليه قبل ساعة.',
    'about.c1': 'معلّم عربي أصلي معتمد',
    'about.c1sub': 'العربية لغتي الأولى، وتدريسها لغير الناطقين بها عملي الأسبوعي.',
    'about.c2': 'تلاوة القرآن والتجويد',
    'about.c2sub':
      'أحكام التجويد تُشرح بحيث يسمعها من لا يتكلّم العربية ويقدر على محاكاتها.',
    'about.c3': 'الدراسات الإسلامية والسيرة',
    'about.c3sub': 'سيرة النبي ﷺ وتاريخها المحيط بها، تُدرَّس قصةً محفوظًا سياقها.',
    'about.c4': 'تفاعلي بطبعه',
    'about.c4sub': 'سبّورة وصور ومخطوطات وأسئلة — لا محاضرة تُقرأ عليك.',
    'about.c5': '{rating} على Preply في {lessons} درسًا',
    'about.c5sub': 'جزء من أكثر من {students} طالب دُرّسوا بين المنصّات والصفوف الحقيقية.',
    'about.figCaption': 'درس الكتابة — شكل الخط الكوفي المبكر — من مخطوط أصلي.',
    'about.figAlt':
      'أنس يُدرّس على شاشة تفاعلية تعرض مخطوطًا قرآنيًا بالخط الكوفي، وطالبان يتابعان',

    /* ---- how it works ---- */
    'how.eyebrow': 'كيف نبدأ',
    'how.title': 'من رسالة إلى أول درس',
    'how.s1': 'أرسل رسالة',
    'how.s1text':
      'واتساب أو تلغرام، بالعربية أو الإنجليزية. أخبرني بما تريد تعلّمه وبمستواك تقريبًا.',
    'how.s2': 'خُذ درسًا تجريبيًا',
    'how.s2text':
      'نلتقي لقاءً أول قصيرًا، نعرف مستواك الحقيقي، ونتفق على خطة. ولا شيء تدفعه مقابل هذا اللقاء.',
    'how.s3': 'اختر أوقاتك',
    'how.s3text':
      'موعد أسبوعي ثابت إن انضممت إلى مجموعة، أو أوقات تُختار حسب توقيتك إن درست فرديًا.',
    'how.s4': 'ابدأ واستمرّ',
    'how.s4text':
      'تصلك المادة بعد كل لقاء، ونتابع ما أنجزناه حتى لا يضيع شيء في الطريق.',

    'chat.label':
      'مثال على محادثة واتساب: وليّ أمر يطلب دروس تلاوة لابنه، وأنس يعرض درسًا تجريبيًا مجانيًا ويسأل عن مدينتهم.',
    'chat.name': 'أنس · حلقة',
    'chat.online': 'متصل الآن',
    'chat.typing': 'يكتب…',
    'chat.placeholder': 'رسالة',
    'chat.m1': 'السلام عليكم، أريد دروس تلاوة لابني، عمره ثماني سنوات.',
    'chat.m2':
      'وعليكم السلام، أهلًا وسهلًا! نبدأ بدرس تجريبي مجاني نتعرّف فيه على مستواه. في أي مدينة أنتم؟',
    'chat.m3': 'في برلين.',
    'chat.m4': 'ممتاز، سأرسل لكم أوقاتًا تناسب توقيتكم. نلقاكم قريبًا بإذن الله 🌱',
    'chat.caption': 'مثال على أول محادثة كما تجري عادةً',

    /* ---- gallery ---- */
    'gallery.eyebrow': 'من الحلقة',
    'gallery.title': 'لحظات من التعلّم',
    'gallery.lede':
      'حلقات حقيقية — سبّورة، ودفاتر مفتوحة، ومخطوط على الشاشة، وأطفال على السجّاد.',
    'gallery.openLabel': 'اعرض بحجم أكبر',
    'gallery.close': 'إغلاق',
    'gallery.prev': 'الصورة السابقة',
    'gallery.next': 'الصورة التالية',

    'g1.alt': 'معلّم عند شاشة تفاعلية تعرض مخطوطًا قرآنيًا كوفيًا، وطالبان أمامه',
    'g2.alt': 'سبّورة عليها رسم بالطبشور للإسراء والمعراج مع أسماء السماوات السبع',
    'g3.alt': 'عبارة «السيرة النبوية» مكتوبة بالطبشور على سبّورة',
    'g4.alt': 'أطفال يجلسون على سجّاد بدفاتر مفتوحة يتدرّبون على الكتابة العربية',
    'g5.alt': 'مجموعة صغيرة تدرس معًا في الخارج على ملعب أخضر',
    'g6.alt':
      'حلقة سيرة مباشرة عبر الإنترنت: الشريحة المعروضة عنوانها «نصرته للنبي صلى الله عليه وسلم» فوق رسم لمدينة عربية قديمة، وإلى جانبها نوافذ الطلاب',

    /* ---- reviews ---- */
    'reviews.eyebrow': 'من طلابي',
    'reviews.title': '{rating} من 5 على Preply',
    'reviews.lede': 'كل تقييم أدناه كتبه طالب موثّق على منصة Preply.',
    'reviews.verified': 'طالب موثّق على Preply',
    'reviews.cta': 'اطّلع على ملفي في Preply',
    'preply.ratingLabel': 'متوسط التقييم على Preply',
    'preply.lessons': 'درسًا على Preply',
    'preply.reviews': 'تقييمات موثّقة',
    'review.mak':
      'معلّم ممتاز، صبور جدًا وقادر على تحديد المواضع التي أجد فيها صعوبة وكيف أتحسّن. أنصح به بشدة!',
    'review.hala':
      'يُعتمد عليه، دقيق في مواعيده، ومخلص جدًا في عمله. أنصح به دون أي تحفّظ وأنا راضٍ تمامًا عن تدريسه. ومما يستحق الذكر خاصةً قدرته على شرح النطق الصحيح (التجويد) بطريقة مفهومة.',
    'review.karim':
      'معلّم رائع فعلًا، وأنا أستمتع كثيرًا. لطيف جدًا ويساعدني كثيرًا في مهارة التحدث. أنصح به بالتأكيد!',

    /* ---- gift ---- */
    'gift.title': 'هديّة لأهل القرآن',
    'gift.text':
      'إن كنت تحمل جزءًا معتبرًا من القرآن الكريم في صدرك، فهناك خصم دائم على كل دورة في هذه الصفحة. اذكر ذلك في رسالتك فيُطبَّق — بلا استمارات ولا إثبات.',
    'gift.mark': 'تقديرًا لما تحمله في صدرك.',

    /* ---- faq ---- */
    'faq.eyebrow': 'قبل الحجز',
    'faq.title': 'أسئلة يطرحها الطلاب عادةً',
    'faq.q1': 'هل أحتاج معرفة سابقة بالعربية؟',
    'faq.a1':
      'لا. عدد من طلابي بدأ من الحروف. تُدرَّس الدروس بالإنجليزية ثم تنتقل إلى عربية أكثر بقدر ما تنمو معها.',
    'faq.q2': 'كم يستمر الدرس؟',
    'faq.a2':
      'عادةً من 45 إلى 60 دقيقة للكبار، ومن 30 إلى 45 للأطفال. ونعدّل بعد أن نرى ما يثبّت الانتباه وما لا يثبّته.',
    'faq.q3': 'هل الدرس الأول مجاني فعلًا؟',
    'faq.a3':
      'نعم. اللقاء الأول القصير تجريبي: نتحقّق من مستواك، ونتحدّث عن هدفك، ونتفق على خطة. ثم تقرّر بعده إن أردت الاستمرار.',
    'faq.qPrice': 'كم سعر الدروس؟',
    'faq.aPrice':
      '10 دولارات للدرس الفردي، أو 6 دولارات لكل طالب في المجموعة، والدرس الأول مجاني. هذه أسعار الحجز المباشر معي عبر واتساب أو تلغرام؛ أما Preply فيحدّد سعره الخاص على منصّته.',
    'faq.q4': 'ماذا أحتاج للدرس؟',
    'faq.a4':
      'هاتف أو حاسوب باتصال مستقر، وشيء تكتب فيه. وأي مادة تحتاجها تُرسل إليك قبل اللقاء.',
    'faq.q5': 'على أي منصّة نلتقي؟',
    'faq.a5':
      'Google Meet أو صف Preply — هذان الاثنان في الوقت الحالي. والحجز عبر Preply يجمع المواعيد والدفع في مكان واحد.',
    'faq.q6': 'هل أحجز دروسًا لطفلي؟',
    'faq.a6':
      'نعم — وليست دورة التلاوة وحدها. كل دورة هنا مبنيّة لتناسب المتعلّمين الصغار، بسرعة وأمثلة ومدّة تُعدَّل حسب أعمارهم. ويسرّني حضور الوالدين في الدروس الأولى.',
    'faq.q7': 'ما أوقات توفّرك؟',
    'faq.a7':
      'أُدرّس في مدى واسع من الساعات، من الصباح الباكر إلى آخر المساء. أرسل لي مدينتك أو توقيتك وأرسل لك الأوقات المتاحة.',

    /* ---- contact ---- */
    'contact.eyebrow': 'لنبدأ',
    'contact.title': 'أخبرني بما تريد تعلّمه',
    'contact.lede':
      'رسالة واحدة تكفي للبداية — لا استمارة تُملأ ولا حساب يُنشأ. أُجيب بالعربية أو الإنجليزية.',
    'contact.waTitle': 'واتساب',
    'contact.waSub': 'أسرع رد',
    'contact.tgTitle': 'تلغرام',
    'contact.tgSub': 'إن كان أيسر لك',
    'contact.pyTitle': 'Preply',
    'contact.pySub': 'الحجز والدفع في مكان واحد',
    'contact.note':
      'الرد عادةً خلال ساعات (UTC+2). مقاعد المجموعات والدروس الفردية مفتوحة.',

    /* ---- footer ---- */
    'footer.tagline': 'العربية · القرآن · السيرة',
    'footer.rights': 'حلقة التعليمية. جميع الحقوق محفوظة.'
  }
};

/* ==========================================================================
   Contact details and the pre-filled messages
   --------------------------------------------------------------------------
   Each "Book" button carries data-msg="key". The matching message below is
   URL-encoded into the WhatsApp link, in whichever language the visitor is
   reading. Change the number in ONE place here.
   ========================================================================== */

window.HALQA_CONTACT = {
  whatsapp: '218945244671',
  telegram: 'AnasAlnaas',
  preply: 'https://preply.in/ANAS6EN29906995102?ts=17866532',

  messages: {
    en: {
      trial: 'Assalamu alaykum. I would like to book a free trial lesson.',
      general: 'Assalamu alaykum. I would like to ask about your courses.',
      sirah:
        'Assalamu alaykum. I would like to join the Seerah halqa that is running now.',
      day: 'Assalamu alaykum. I would like to reserve a seat on The Prophetic Day course.',
      arabic:
        'Assalamu alaykum. I would like to ask about the Arabic course for non-Arabic speakers.',
      writing:
        'Assalamu alaykum. I would like to ask about the Arabic reading and writing course.',
      quran:
        "Assalamu alaykum. I would like to ask about Qur'an recitation lessons for children.",
      group: 'Assalamu alaykum. I would like to ask about the group lessons.',
      private: 'Assalamu alaykum. I would like to ask about private one-to-one lessons.'
    },
    ar: {
      trial: 'السلام عليكم. أريد حجز درس تجريبي مجاني.',
      general: 'السلام عليكم. أريد السؤال عن الدورات.',
      sirah: 'السلام عليكم. أريد الانضمام إلى حلقة السيرة الجارية الآن.',
      day: 'السلام عليكم. أريد حجز مقعد في دورة اليوم النبوي.',
      arabic: 'السلام عليكم. أريد السؤال عن دورة العربية لغير الناطقين بها.',
      writing: 'السلام عليكم. أريد السؤال عن دورة القراءة والكتابة بالعربية.',
      quran: 'السلام عليكم. أريد السؤال عن دروس تلاوة القرآن للأطفال.',
      group: 'السلام عليكم. أريد السؤال عن دروس المجموعات.',
      private: 'السلام عليكم. أريد السؤال عن الدروس الفردية.'
    }
  }
};

/* ==========================================================================
   PRICES
   --------------------------------------------------------------------------
   One rate for private lessons and one for groups, per lesson, in US dollars,
   for lessons booked directly (Preply sets its own price). Each course card
   says which formats it offers with data-formats="private group" in
   index.html, and shows "From $6" plus the private rate, or just the private
   rate. Set either value to null to hide it.

   If you change a price, also update the FAQ answer (faq.aPrice above, in
   both languages), the "offers" in the JSON-LD block at the top of
   index.html, and the English fallback prices written in index.html.
   ========================================================================== */

window.HALQA_PRICES = {
  currency: '$',
  private: 10,
  group: 6
};

/* ==========================================================================
   NUMBERS FROM YOUR PREPLY PROFILE
   --------------------------------------------------------------------------
   Preply cannot be read automatically (it blocks other sites), so these are
   copied by hand. Every number on the page — the strip under the hero, the
   Preply card, the About section — is filled in from here, so updating one
   line here updates all of them. Last copied: 30 October 2026.

   index.html also carries the same numbers as plain text for visitors without
   JavaScript and for Google; search it for the old value when you change one.
   ========================================================================== */

window.HALQA_STATS = {
  rating: '5.0',   /* keep the quotes, so it shows as 5.0 rather than 5 */
  lessons: 127,
  reviews: 4,
  students: 300
};
