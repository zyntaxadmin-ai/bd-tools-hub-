// Longer explanation text shown under each tool (key = slug without /tool/).
// Add an entry here to give a tool more useful text. Tools without an entry just skip this section.
export type ArticleSection = { h: string; p: string[] };
export type ToolArticle = { bn: ArticleSection[]; en: ArticleSection[] };

export const TOOL_ARTICLES: Record<string, ToolArticle> = {
  "age-calculator": {
    bn: [
      {
        h: "বয়স ক্যালকুলেটর কীভাবে কাজ করে",
        p: [
          "আপনার জন্ম তারিখ দিলে এই টুল আজকের তারিখ পর্যন্ত আপনার বয়স বছর, মাস ও দিনে বের করে দেয়। সঙ্গে মোট কত দিন বেঁচে আছেন এবং পরের জন্মদিন আসতে আর কত দিন বাকি, তাও দেখায়।",
          "হিসাবে লিপ ইয়ার ধরা হয়, তাই ২৯ ফেব্রুয়ারির মতো তারিখেও ফলাফল ঠিক থাকে। সব হিসাব আপনার ফোন বা ব্রাউজারেই হয়, জন্ম তারিখ কোথাও জমা হয় না।",
        ],
      },
      {
        h: "কখন বয়স হিসাব দরকার হয়",
        p: [
          "স্কুল বা কলেজে ভর্তির ফর্ম, পাসপোর্ট ও NID সংক্রান্ত আবেদন, চাকরির আবেদন, বীমা বা অন্য ফর্ম পূরণের সময় সঠিক বয়স লিখতে হয়। নিজে হিসাব করলে মাস ও দিনে ভুল হওয়া সহজ, তাই টুল দিয়ে মিলিয়ে নেওয়া ভালো।",
          "সরকারি চাকরির আবেদনের বয়স নির্দিষ্ট একটি তারিখ ধরে গণনা হয়। সেক্ষেত্রে আমাদের Govt Job Age Calculator ব্যবহার করুন।",
        ],
      },
    ],
    en: [
      {
        h: "How the age calculator works",
        p: [
          "Enter your date of birth and this tool works out your age up to today in years, months and days. It also shows how many days you have lived and how many days remain until your next birthday.",
          "Leap years are taken into account, so dates such as 29 February still give the right result. Everything is calculated on your phone or browser and your date of birth is not stored anywhere.",
        ],
      },
      {
        h: "When you need to calculate your age",
        p: [
          "You need your exact age for school or college admission forms, passport and NID applications, job applications and insurance forms. Counting by hand makes it easy to get the months and days wrong, so it is worth checking with the tool.",
          "Age for a government job is counted on a fixed reference date. For that, use our Govt Job Age Calculator.",
        ],
      },
    ],
  },

  "gpa-calculator-bd": {
    bn: [
      {
        h: "GPA ক্যালকুলেটর কীভাবে কাজ করে",
        p: [
          "এই টুলে পাঁচটি বিষয়ের গ্রেড বেছে নিলে সেগুলোর গড় করে ৫.০০ এর মধ্যে GPA দেখানো হয়। এখানে ব্যবহৃত গ্রেড মান: A+ (৮০-১০০) = ৫.০০, A (৭০-৭৯) = ৪.০০, A- (৬০-৬৯) = ৩.৫০, B (৫০-৫৯) = ৩.০০, C (৪০-৪৯) = ২.০০, D (৩৩-৩৯) = ১.০০, F = ০.০০।",
          "কোনো একটি বিষয়ে F থাকলে ফলাফল Fail হিসেবে দেখানো হয় এবং GPA ০.০০ ধরা হয়।",
        ],
      },
      {
        h: "অফিসিয়াল ফলাফলের সঙ্গে পার্থক্য",
        p: [
          "এটি পাঁচটি বিষয়ের সহজ গড়। বোর্ডের অফিসিয়াল ফলাফলে বিষয়ের সংখ্যা ও ঐচ্ছিক (৪র্থ) বিষয়ের নিয়ম আলাদা হতে পারে, তাই চূড়ান্ত ফল সবসময় আপনার শিক্ষা বোর্ডের প্রকাশিত রেজাল্ট।",
          "টুলটি পরীক্ষার আগে লক্ষ্য ঠিক করতে কাজে লাগে। যেমন কোন বিষয়ে কত গ্রেড পেলে GPA ৫.০০ হবে, তা বদলে বদলে দেখে নিতে পারেন।",
        ],
      },
    ],
    en: [
      {
        h: "How the GPA calculator works",
        p: [
          "Choose the grade for each of five subjects and the tool averages them into a GPA out of 5.00. The grade points used are: A+ (80-100) = 5.00, A (70-79) = 4.00, A- (60-69) = 3.50, B (50-59) = 3.00, C (40-49) = 2.00, D (33-39) = 1.00 and F = 0.00.",
          "If any subject is an F, the result shows Fail and the GPA is taken as 0.00.",
        ],
      },
      {
        h: "How it differs from your official result",
        p: [
          "This is a simple average of five subjects. The board's official result can differ in the number of subjects and the rules for the optional (4th) subject, so the final result is always the one your education board publishes.",
          "The tool is useful for setting goals before an exam. For example, you can try different grades to see what you need for a 5.00.",
        ],
      },
    ],
  },

  "bkash-calculator": {
    bn: [
      {
        h: "bKash ক্যাশ আউট চার্জ কীভাবে হিসাব হয়",
        p: [
          "ক্যাশ আউট চার্জ সাধারণত টাকার পরিমাণের একটি শতাংশ। এই টুলে এজেন্ট ক্যাশ আউট প্রতি ১০০০ টাকায় ১৮.৫ টাকা (১.৮৫%) ধরা হয়েছে। অর্থাৎ ৫০০০ টাকা তুললে চার্জ ৯২.৫ টাকা, আর মোট কাটবে ৫০৯২.৫ টাকা।",
          "টাকার পরিমাণ লিখলেই চার্জ ও মোট কত টাকা লাগবে, তা সঙ্গে সঙ্গে দেখা যায়।",
        ],
      },
      {
        h: "চার্জ নিশ্চিত করে নিন",
        p: [
          "bKash যেকোনো সময় চার্জ বদলাতে পারে এবং এজেন্ট, প্রিয় এজেন্ট বা এটিএমে রেট আলাদা হতে পারে। তাই বড় অঙ্কের লেনদেনের আগে bKash অ্যাপ বা অফিসিয়াল চার্জ চার্ট দেখে নিন।",
          "Nagad, Rocket ও Upay এর জন্য আলাদা ক্যালকুলেটর আমাদের সাইটে আছে।",
        ],
      },
    ],
    en: [
      {
        h: "How the bKash cash out charge is worked out",
        p: [
          "A cash out charge is usually a percentage of the amount. This tool uses 18.5 taka per 1,000 (1.85%) for agent cash out. So cashing out 5,000 taka costs 92.5 taka and 5,092.5 taka is deducted in total.",
          "Type the amount and you immediately see the charge and the total needed.",
        ],
      },
      {
        h: "Confirm the charge before you transact",
        p: [
          "bKash can change its charges at any time, and rates can differ for agents, priority agents and ATMs. For a large amount, check the bKash app or the official charge chart first.",
          "We also have separate calculators for Nagad, Rocket and Upay.",
        ],
      },
    ],
  },

  "nagad-calculator": {
    bn: [
      {
        h: "Nagad ক্যাশ আউট চার্জের হিসাব",
        p: [
          "এই ক্যালকুলেটরে Nagad এজেন্ট ও এটিএম ক্যাশ আউট প্রতি ১০০০ টাকায় ১৪.৯ টাকা ধরা হয়েছে। যেমন ২০০০ টাকা তুললে চার্জ ২৯.৮ টাকা, আর মোট কাটবে ২০২৯.৮ টাকা।",
          "বিভিন্ন সূত্রে Nagad এর রেট আলাদা পাওয়া যায়, কারণ অ্যাপ, USSD ও অফার ভেদে চার্জ বদলায়। তাই আপনার রেট জানা থাকলে \"নিজে রেট দিন\" অপশনে সেটি বসিয়ে হিসাব করুন।",
        ],
      },
      {
        h: "কেন অ্যাপে মিলিয়ে নেবেন",
        p: [
          "মোবাইল ব্যাংকিং চার্জ নিয়মিত বদলায়। টাকা তোলার আগে Nagad অ্যাপে দেখানো চার্জই চূড়ান্ত ধরুন। এই টুল শুধু আগে থেকে আন্দাজ করার জন্য।",
        ],
      },
    ],
    en: [
      {
        h: "Working out the Nagad cash out charge",
        p: [
          "This calculator uses 14.9 taka per 1,000 for Nagad agent and ATM cash out. For example, cashing out 2,000 taka costs 29.8 taka and 2,029.8 taka is deducted in total.",
          "Public sources list different Nagad rates because the charge varies by app, USSD and offer. If you know your own rate, choose \"Enter my own rate\" and use that instead.",
        ],
      },
      {
        h: "Why you should confirm in the app",
        p: [
          "Mobile banking charges change regularly. Treat the charge shown in the Nagad app as final before you withdraw. This tool is only for estimating in advance.",
        ],
      },
    ],
  },

  "word-counter": {
    bn: [
      {
        h: "শব্দ ও অক্ষর গণনার টুল",
        p: [
          "লেখা পেস্ট করলে বা টাইপ করলে সঙ্গে সঙ্গে শব্দ, অক্ষর, বাক্য ও প্যারাগ্রাফের সংখ্যা দেখা যায়। সঙ্গে আনুমানিক পড়ার সময়ও দেখানো হয়, যা প্রতি মিনিটে ২০০ শব্দ ধরে হিসাব করা।",
          "লেখা আপনার ব্রাউজারেই থাকে, কোথাও জমা হয় না।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "রচনা, অ্যাসাইনমেন্ট বা আবেদনপত্রে শব্দসীমা মানতে এটি কাজে লাগে। ব্লগার ও ওয়েবসাইটের লেখকরা মেটা ডেসক্রিপশন (সাধারণত ১৫৫-১৬০ অক্ষরের মধ্যে) ও শিরোনামের দৈর্ঘ্য মিলিয়ে নিতে পারেন। সোশ্যাল মিডিয়া পোস্টে অক্ষরসীমা আছে কিনা দেখতেও কাজে লাগে।",
        ],
      },
    ],
    en: [
      {
        h: "A tool for counting words and characters",
        p: [
          "Paste or type your text and you immediately see the number of words, characters, sentences and paragraphs. It also shows an estimated reading time, worked out at 200 words per minute.",
          "Your text stays in your browser and is not stored anywhere.",
        ],
      },
      {
        h: "Where it helps",
        p: [
          "It helps you stay within the word limit for essays, assignments and applications. Bloggers and website writers can check meta descriptions (usually around 155-160 characters) and title lengths. It is also handy for social media posts that have a character limit.",
        ],
      },
    ],
  },

  "percentage-calculator": {
    bn: [
      {
        h: "শতকরা হিসাবের সূত্র",
        p: [
          "শতকরা হিসাবে তিনটি কাজ সবচেয়ে বেশি লাগে। এক, কোনো সংখ্যার কত শতাংশ কত: (শতাংশ × সংখ্যা) ÷ ১০০। যেমন ২০০ এর ১৫% = ৩০।",
          "দুই, একটি সংখ্যা অন্যটির কত শতাংশ: (প্রথম সংখ্যা ÷ দ্বিতীয় সংখ্যা) × ১০০। যেমন ৪০ হলো ২০০ এর ২০%।",
          "তিন, শতকরা বৃদ্ধি বা হ্রাস: ((নতুন মান − পুরোনো মান) ÷ পুরোনো মান) × ১০০। যেমন দাম ৫০০ থেকে ৬০০ হলে বৃদ্ধি ২০%।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "পরীক্ষার নম্বর থেকে শতাংশ, দোকানের ছাড় বা ভ্যাট, ব্যাংকের সুদ ও দামের ওঠানামা, সবখানেই শতকরা হিসাব লাগে। টুলে সংখ্যা বসালেই উত্তর পাওয়া যায়, তাই হাতে হিসাব করার ভুল এড়ানো যায়।",
        ],
      },
    ],
    en: [
      {
        h: "The formulas behind percentages",
        p: [
          "Three percentage calculations come up most. First, a percentage of a number: (percentage × number) ÷ 100. For example, 15% of 200 = 30.",
          "Second, what percentage one number is of another: (first number ÷ second number) × 100. For example, 40 is 20% of 200.",
          "Third, percentage increase or decrease: ((new value − old value) ÷ old value) × 100. For example, a price going from 500 to 600 is a 20% increase.",
        ],
      },
      {
        h: "Where it helps",
        p: [
          "You need percentages for exam marks, shop discounts and VAT, bank interest and price changes. Enter the numbers in the tool and you get the answer, which avoids mistakes from calculating by hand.",
        ],
      },
    ],
  },

  "bmi-calculator": {
    bn: [
      {
        h: "BMI কীভাবে হিসাব হয়",
        p: [
          "BMI (বডি মাস ইনডেক্স) = ওজন (কেজি) ÷ উচ্চতা (মিটার) র বর্গ। যেমন ৭০ কেজি ওজন ও ১.৭৫ মিটার উচ্চতায় BMI প্রায় ২২.৯।",
          "এই টুলে BMI ১৮.৫ এর কম হলে কম ওজন, ১৮.৫ থেকে ২৪.৯ স্বাভাবিক, ২৫ থেকে ২৯.৯ বেশি ওজন এবং ৩০ বা তার বেশি হলে স্থূলতা হিসেবে দেখানো হয়। সঙ্গে আপনার উচ্চতায় স্বাভাবিক ওজনের পরিসরও দেখানো হয়।",
        ],
      },
      {
        h: "BMI এর সীমাবদ্ধতা",
        p: [
          "BMI একটি সাধারণ আন্দাজ, রোগ নির্ণয় নয়। এটি পেশি ও চর্বির পার্থক্য ধরে না, তাই অনেক পেশিবহুল মানুষের BMI বেশি দেখাতে পারে। শিশু, কিশোর, গর্ভবতী নারী ও বয়স্কদের জন্য আলাদা নিয়ম প্রযোজ্য। দক্ষিণ এশিয়ার মানুষের ক্ষেত্রে কিছু গবেষণায় ঝুঁকির সীমা কম ধরা হয়।",
          "স্বাস্থ্য নিয়ে সিদ্ধান্ত নিতে চিকিৎসকের পরামর্শ নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How BMI is calculated",
        p: [
          "BMI (body mass index) = weight (kg) ÷ height (metres) squared. For example, 70 kg at 1.75 m gives a BMI of about 22.9.",
          "In this tool a BMI below 18.5 is shown as underweight, 18.5 to 24.9 as normal, 25 to 29.9 as overweight and 30 or more as obese. It also shows the normal weight range for your height.",
        ],
      },
      {
        h: "Limits of BMI",
        p: [
          "BMI is a rough guide, not a diagnosis. It does not separate muscle from fat, so a muscular person can show a high BMI. Different rules apply to children, teenagers, pregnant women and older adults. Some research uses lower risk thresholds for South Asian people.",
          "Talk to a doctor before making health decisions.",
        ],
      },
    ],
  },

  "emi-calculator-bd": {
    bn: [
      {
        h: "EMI কীভাবে হিসাব হয়",
        p: [
          "EMI মানে মাসিক কিস্তি। এই টুল reducing balance পদ্ধতিতে হিসাব করে, অর্থাৎ প্রতি মাসে বাকি থাকা আসলের ওপর সুদ ধরা হয়। সূত্র: EMI = P × r × (১+r)^n ÷ ((১+r)^n − ১), যেখানে P হলো লোনের পরিমাণ, r হলো মাসিক সুদের হার (বার্ষিক হার ÷ ১২ ÷ ১০০) এবং n হলো মোট মাস।",
          "ফলাফলে মাসিক কিস্তি, মোট সুদ ও মোট পরিশোধের অঙ্ক এবং প্রথম ১২ মাসের আসল-সুদের ভাগ দেখানো হয়।",
        ],
      },
      {
        h: "লোন নেওয়ার আগে যা মনে রাখবেন",
        p: [
          "মেয়াদ বাড়ালে মাসিক কিস্তি কমে, কিন্তু মোট সুদ বেড়ে যায়। কিস্তির অঙ্ক আপনার মাসিক আয়ের তুলনায় কতটা, তা আগে ভেবে দেখুন।",
          "এটি আনুমানিক হিসাব। ব্যাংকের প্রসেসিং ফি, বীমা ও অন্যান্য চার্জ আলাদা হতে পারে, তাই চূড়ান্ত অঙ্ক ব্যাংক থেকে জেনে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How EMI is calculated",
        p: [
          "EMI means equated monthly instalment. This tool uses the reducing balance method, so interest each month is charged on the principal still owed. The formula is EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of months.",
          "The result shows the monthly instalment, total interest, total repayment and the principal and interest split for the first 12 months.",
        ],
      },
      {
        h: "What to keep in mind before taking a loan",
        p: [
          "A longer tenure lowers the monthly instalment but raises the total interest. Think about how large the instalment is compared with your monthly income.",
          "This is an estimate. Bank processing fees, insurance and other charges may differ, so confirm the final figure with the bank.",
        ],
      },
    ],
  },

  "land-calculator-bd": {
    bn: [
      {
        h: "জমির একক ও রূপান্তর",
        p: [
          "বাংলাদেশে জমি শতাংশ, কাঠা, বিঘা, একর ও বর্গফুটে মাপা হয়। এই টুলে ১ শতাংশ = ৪৩৫.৬ বর্গফুট এবং ১ একর = ১০০ শতাংশ = ৪৩,৫৬০ বর্গফুট ধরা হয়। ১ বিঘা = ২০ কাঠা এবং ১ কাঠা = ১৬ ছটাক।",
          "কাঠার মাপ এলাকাভেদে আলাদা। টুলে সাধারণ মাপ ৭২০ বর্গফুট ধরা আছে, যা বদলানো যায়। এই মাপে ১ কাঠা প্রায় ১.৬৫ শতাংশ এবং ১ বিঘা (১৪,৪০০ বর্গফুট) প্রায় ৩৩ শতাংশ।",
        ],
      },
      {
        h: "জমি কেনাবেচার আগে যা দেখবেন",
        p: [
          "দলিল, খতিয়ান ও সার্ভেয়ারের মাপের সঙ্গে হিসাব মিলিয়ে নিন। এলাকা অনুযায়ী কাঠা ও বিঘার মাপ আলাদা হওয়ায় শুধু টুলের ফলাফলের ওপর নির্ভর করবেন না। এই টুল প্রাথমিক আন্দাজের জন্য।",
          "আয়তক্ষেত্রাকার জমির দৈর্ঘ্য ও প্রস্থ ফুটে দিলে টুল ক্ষেত্রফল বের করে সব এককে রূপান্তর করে দেখায়।",
        ],
      },
    ],
    en: [
      {
        h: "Land units and conversion",
        p: [
          "In Bangladesh land is measured in shatak (decimal), katha, bigha, acre and square feet. This tool uses 1 shatak = 435.6 sq ft and 1 acre = 100 shatak = 43,560 sq ft. 1 bigha = 20 katha and 1 katha = 16 chatak.",
          "The size of a katha differs by area. The tool uses the common 720 sq ft, which you can change. At that size 1 katha is about 1.65 shatak and 1 bigha (14,400 sq ft) is about 33 shatak.",
        ],
      },
      {
        h: "What to check before buying or selling land",
        p: [
          "Match the figures against the deed, khatian and a surveyor's measurement. Because katha and bigha differ by area, do not rely only on the tool's result. It is meant for a first estimate.",
          "For a rectangular plot, enter the length and width in feet and the tool works out the area and converts it into every unit.",
        ],
      },
    ],
  },

  "govt-job-age-calculator": {
    bn: [
      {
        h: "সরকারি চাকরির বয়স কীভাবে গণনা হয়",
        p: [
          "সরকারি চাকরির বিজ্ঞপ্তিতে একটি নির্দিষ্ট তারিখ দেওয়া থাকে, যে তারিখে আপনার বয়স গণনা হবে। এই টুলে আপনার জন্ম তারিখ ও বিজ্ঞপ্তির সেই তারিখ দিলে ওই দিনে আপনার বয়স বছর, মাস ও দিনে দেখায়।",
          "ফলাফলে বোঝা যায় আপনি বয়সের সীমার মধ্যে আছেন কিনা, এবং কত দিন পর্যন্ত যোগ্য থাকতেন বা কত দিন আগে সীমা পেরিয়েছে।",
        ],
      },
      {
        h: "বিজ্ঞপ্তি দেখে নিশ্চিত হোন",
        p: [
          "বয়সসীমা, গণনার তারিখ ও কোটা প্রতিটি চাকরির বিজ্ঞপ্তি ভেদে আলাদা। তাই আবেদনের আগে অফিসিয়াল বিজ্ঞপ্তি ভালো করে পড়ুন। এই টুল শুধু আনুমানিক হিসাব দেয়, চূড়ান্ত সিদ্ধান্ত বিজ্ঞপ্তির নিয়ম অনুযায়ী।",
        ],
      },
    ],
    en: [
      {
        h: "How age is counted for a government job",
        p: [
          "A government job circular gives a fixed date on which your age is counted. Enter your date of birth and that date from the circular, and the tool shows your age on that day in years, months and days.",
          "The result tells you whether you are within the age limit, and how many days you remained eligible or how many days ago the limit passed.",
        ],
      },
      {
        h: "Confirm with the circular",
        p: [
          "Age limits, reference dates and quotas differ by job circular, so read the official circular carefully before applying. This tool gives only an estimate. The final decision follows the rules in the circular.",
        ],
      },
    ],
  },
};
