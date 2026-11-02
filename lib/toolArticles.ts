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

  "rocket-calculator": {
    bn: [
      {
        h: "Rocket ক্যাশ আউট চার্জের হিসাব",
        p: [
          "এই ক্যালকুলেটরে Rocket এজেন্ট ক্যাশ আউট প্রতি ১০০০ টাকায় ১৮ টাকা (১.৮%) এবং ডাচ-বাংলা ব্যাংকের এটিএমে ১০ টাকা (১%) ধরা হয়েছে। যেমন ৫০০০ টাকা এজেন্টের কাছ থেকে তুললে চার্জ ৯০ টাকা, আর মোট কাটবে ৫০৯০ টাকা।",
          "ডাচ-বাংলা ব্যাংকের নিজস্ব এটিএমে চার্জ সাধারণত কম, কারণ Rocket ওই ব্যাংকেরই সেবা। টাকা তোলার আগে কোন উপায়ে কত লাগবে তা মিলিয়ে দেখলে কিছু টাকা বাঁচানো যায়।",
        ],
      },
      {
        h: "রেট না মিললে কী করবেন",
        p: [
          "বিভিন্ন সূত্রে Rocket এর এজেন্ট চার্জ ১.৬৭% থেকে ১.৮% পর্যন্ত লেখা আছে। আপনার রেট আলাদা হলে \"নিজে রেট দিন\" অপশনে প্রতি ১০০০ টাকায় সেটি লিখে হিসাব করুন। চূড়ান্ত চার্জ সবসময় Rocket অ্যাপে দেখে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "Working out the Rocket cash out charge",
        p: [
          "This calculator uses 18 taka per 1,000 (1.8%) for Rocket agent cash out and 10 taka (1%) at Dutch-Bangla Bank ATMs. For example, taking out 5,000 taka from an agent costs 90 taka and 5,090 taka is deducted in total.",
          "Charges at Dutch-Bangla Bank's own ATMs are usually lower because Rocket is that bank's service. Comparing the options before you withdraw can save you a little money.",
        ],
      },
      {
        h: "What to do if the rate does not match",
        p: [
          "Public sources list the Rocket agent charge anywhere from 1.67% to 1.8%. If your rate is different, choose \"Enter my own rate\" and type it per 1,000 taka. Always treat the charge shown in the Rocket app as final.",
        ],
      },
    ],
  },

  "upay-calculator": {
    bn: [
      {
        h: "Upay ক্যাশ আউট চার্জের হিসাব",
        p: [
          "এই ক্যালকুলেটরে Upay এজেন্ট ক্যাশ আউট প্রতি ১০০০ টাকায় ১৪ টাকা (১.৪%) এবং ইউসিবি ব্যাংকের এটিএমে ৮ টাকা (০.৮%) ধরা হয়েছে। যেমন ৩০০০ টাকা এজেন্টের কাছ থেকে তুললে চার্জ ৪২ টাকা, আর মোট কাটবে ৩০৪২ টাকা।",
          "Upay ইউসিবি ব্যাংকের সেবা, তাই ইউসিবি এটিএম থেকে টাকা তুললে সাধারণত চার্জ কম লাগে।",
        ],
      },
      {
        h: "অ্যাপে মিলিয়ে নিন",
        p: [
          "Upay এর চার্জ সম্পর্কে আমরা সীমিত সূত্র পেয়েছি, তাই টাকা তোলার আগে Upay অ্যাপে দেখানো চার্জ যাচাই করুন। রেট আলাদা হলে \"নিজে রেট দিন\" অপশনে প্রতি ১০০০ টাকায় আপনার রেট বসিয়ে হিসাব করুন।",
        ],
      },
    ],
    en: [
      {
        h: "Working out the Upay cash out charge",
        p: [
          "This calculator uses 14 taka per 1,000 (1.4%) for Upay agent cash out and 8 taka (0.8%) at UCB Bank ATMs. For example, taking out 3,000 taka from an agent costs 42 taka and 3,042 taka is deducted in total.",
          "Upay is a UCB Bank service, so withdrawing from a UCB ATM usually costs less.",
        ],
      },
      {
        h: "Confirm in the app",
        p: [
          "We found only limited sources for Upay charges, so check the charge shown in the Upay app before you withdraw. If your rate is different, choose \"Enter my own rate\" and type your rate per 1,000 taka.",
        ],
      },
    ],
  },

  "image-to-pdf": {
    bn: [
      {
        h: "ছবি থেকে PDF কীভাবে বানাবেন",
        p: [
          "এক বা একাধিক ছবি সিলেক্ট করুন, তীর বাটন দিয়ে ক্রম ঠিক করুন, তারপর PDF বানান চাপুন। প্রতিটি ছবি একটি আলাদা পেজ হয়। একসাথে সর্বোচ্চ ৫০টি ছবি দেওয়া যায়।",
          "পেজের মাপ দুই রকম বেছে নেওয়া যায়। A4 বেছে নিলে ছবি A4 পেজের মাঝখানে বসে, ছবি আড়াআড়ি হলে পেজও আড়াআড়ি হয়। ছবির মাপে বেছে নিলে পেজ ঠিক ছবির সমান হয়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "চাকরি বা ভর্তির আবেদনে সার্টিফিকেট, NID বা পাসপোর্টের ছবি এক PDF ফাইলে জমা দিতে বলা হয়। স্ক্যান করা পৃষ্ঠা বা ফোনের ছবি একসাথে করে পাঠানোর জন্যও এটি কাজে লাগে।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। ফাইলের সাইজে সীমা থাকলে আগে Image Compressor দিয়ে ছবি ছোট করে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How to make a PDF from images",
        p: [
          "Select one or more images, set the order with the arrow buttons, then tap Create PDF. Each image becomes its own page, and you can add up to 50 images at once.",
          "You can choose between two page sizes. With A4, the image is centred on an A4 page, and a wide image gets a landscape page. With fit to image, the page is exactly the size of the image.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "Job and admission applications often ask for certificates, an NID or a passport photo in a single PDF file. It is also handy for sending scanned pages or phone photos together.",
          "Your images are not uploaded anywhere, everything happens on your phone or browser. If there is a file size limit, shrink the images first with the Image Compressor.",
        ],
      },
    ],
  },

  "merge-pdf": {
    bn: [
      {
        h: "একাধিক PDF কীভাবে জোড়া দেবেন",
        p: [
          "দুই বা তার বেশি PDF সিলেক্ট করুন, তীর বাটন দিয়ে ক্রম ঠিক করুন, তারপর PDF জোড়া দিন চাপুন। উপরের ফাইলের পেজ আগে বসে। একসাথে সর্বোচ্চ ২০টি ফাইল জোড়া যায়, প্রতিটি সর্বোচ্চ ৫০ MB।",
          "জোড়া লাগানো PDF এর সাইজ মোটামুটি সব ফাইলের সাইজের যোগফলের কাছাকাছি হয়। সাইজ বেশি হলে পরে কম্প্রেস করে নিতে পারেন।",
        ],
      },
      {
        h: "যা মনে রাখবেন",
        p: [
          "পাসওয়ার্ড দেওয়া বা নষ্ট PDF খোলা যায় না। এমন ফাইল থাকলে টুল কোন ফাইলে সমস্যা তা জানিয়ে দেবে, সেটি বাদ দিয়ে আবার চেষ্টা করুন।",
          "আপনার ফাইল কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। তাই গোপন কাগজপত্রও নিশ্চিন্তে জোড়া দিতে পারবেন।",
        ],
      },
    ],
    en: [
      {
        h: "How to combine several PDFs",
        p: [
          "Select two or more PDFs, set the order with the arrow buttons, then tap Merge PDFs. Pages of the top file come first. You can merge up to 20 files at once, each up to 50 MB.",
          "The merged PDF is roughly the sum of all the file sizes. If it is too big, you can compress it afterwards.",
        ],
      },
      {
        h: "Good to know",
        p: [
          "Password protected or damaged PDFs cannot be opened. If one is in the list, the tool tells you which file has the problem so you can remove it and try again.",
          "Your files are not uploaded anywhere, everything happens on your phone or browser, so you can merge private documents with confidence.",
        ],
      },
    ],
  },

  "split-pdf": {
    bn: [
      {
        h: "PDF থেকে পেজ কীভাবে আলাদা করবেন",
        p: [
          "PDF সিলেক্ট করার পর দুটি উপায় আছে। পেজ রেঞ্জ দিলে আপনার বাছা পেজগুলো নিয়ে একটি নতুন PDF হয়। যেমন 1-3, 5, 8-10 লিখলে পেজ ১, ২, ৩, ৫, ৮, ৯ ও ১০ থাকবে। বাংলা সংখ্যাও চলে।",
          "প্রতি পেজ আলাদা বেছে নিলে প্রতিটি পেজ নিজস্ব PDF হয় এবং একটি একটি করে ডাউনলোড করতে হয়। এটি সর্বোচ্চ ১০০ পেজের PDF এর জন্য।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "বড় PDF এর শুধু দরকারি কয়েকটি পেজ পাঠাতে চাইলে, বা ফর্মের সাথে নির্দিষ্ট পেজ জমা দিতে হলে এটি কাজে লাগে। মূল ফাইল অপরিবর্তিত থাকে, শুধু নতুন ফাইল তৈরি হয়।",
          "আপনার ফাইল কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to pull pages out of a PDF",
        p: [
          "After you select a PDF there are two ways. With a page range, the pages you pick become one new PDF. For example, 1-3, 5, 8-10 keeps pages 1, 2, 3, 5, 8, 9 and 10. Bangla digits work too.",
          "With each page separately, every page becomes its own PDF and you download them one by one. This works for PDFs up to 100 pages.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It is useful when you want to send only the few pages you need from a large PDF, or submit specific pages with a form. Your original file stays unchanged, only new files are created.",
          "Your file is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "image-compressor": {
    bn: [
      {
        h: "ছবির সাইজ কীভাবে কমাবেন",
        p: [
          "ছবি সিলেক্ট করে JPEG বা WebP বেছে নিন, তারপর কোয়ালিটি স্লাইডার ঠিক করুন। কোয়ালিটি কমালে ফাইলের সাইজ কমে। আগে ও পরের সাইজ পাশাপাশি দেখে ডাউনলোড করতে পারবেন।",
          "আরও ছোট করতে চাইলে ছবির প্রস্থ কমিয়ে দিন। মাপ ছোট হলে ফাইলও ছোট হয়। PNG ছবি দিলে এখানে JPEG বা WebP তে বদলে যাবে, কারণ PNG তে কোয়ালিটি কমিয়ে সাইজ কমানো যায় না।",
        ],
      },
      {
        h: "কোথায় কাজে লাগে",
        p: [
          "অনেক সরকারি ও চাকরির আবেদন ফর্মে ছবির সাইজ ১০০ KB বা ২০০ KB এর মধ্যে রাখতে বলা হয়। এই টুল দিয়ে কোয়ালিটি ঠিক করে সেই সীমার মধ্যে আনা যায়।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to reduce an image's file size",
        p: [
          "Select an image, choose JPEG or WebP, then adjust the quality slider. Lowering the quality makes the file smaller. You can compare the before and after sizes side by side before you download.",
          "To go smaller still, reduce the image width. A smaller image makes a smaller file. If you give a PNG, it is turned into JPEG or WebP here, because PNG size cannot be reduced by lowering quality.",
        ],
      },
      {
        h: "Where it helps",
        p: [
          "Many government and job application forms ask for a photo under 100 KB or 200 KB. You can tune the quality here to bring the file within that limit.",
          "Your image is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "image-resizer": {
    bn: [
      {
        h: "ছবির মাপ কীভাবে বদলাবেন",
        p: [
          "ছবি সিলেক্ট করে প্রিসেট বাছুন অথবা প্রস্থ ও উচ্চতা পিক্সেলে লিখুন। Lock চালু থাকলে একটি মাপ বদলালে অন্যটি নিজে ঠিক হয়, তাই ছবি বিকৃত হয় না। সর্বোচ্চ ৮০০০ পিক্সেল পর্যন্ত মাপ দেওয়া যায়।",
          "পাসপোর্ট সাইজ ছবির জন্য প্রিসেট আছে। ৩.৫ × ৪.৫ সেমি ছবি ৩০০ DPI তে প্রায় ৪১৩ × ৫৩১ পিক্সেল হয়। তবে ফর্ম বা ওয়েবসাইটের নির্দেশনা আলাদা হলে সেটাই মানুন।",
        ],
      },
      {
        h: "যা মনে রাখবেন",
        p: [
          "ছবি অনেক বড় করলে মান কমে যেতে পারে, কারণ নতুন পিক্সেল তৈরি হয় না, শুধু বিদ্যমান পিক্সেল টেনে বাড়ানো হয়। তাই সম্ভব হলে বড় ছবি ছোট করুন, ছোট ছবি বড় নয়।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to change an image's size",
        p: [
          "Select an image, then pick a preset or type a width and height in pixels. With the lock on, changing one side sets the other automatically, so the image is not distorted. Sizes up to 8,000 pixels are allowed.",
          "There are presets for passport size photos. A 3.5 × 4.5 cm photo at 300 DPI is about 413 × 531 pixels. If a form or website gives different instructions, follow those.",
        ],
      },
      {
        h: "Good to know",
        p: [
          "Making an image much bigger can lower its quality, because no new detail is created, existing pixels are only stretched. Where possible, shrink a big image rather than enlarging a small one.",
          "Your image is not uploaded anywhere, everything happens on your phone or browser.",
        ],
      },
    ],
  },

  "image-converter": {
    bn: [
      {
        h: "ছবির ফরম্যাট কীভাবে বদলাবেন",
        p: [
          "ছবি সিলেক্ট করে JPG, PNG বা WebP বেছে নিন। JPG ও WebP তে কোয়ালিটি স্লাইডার আছে, PNG তে নেই। ডাউনলোডের আগে নতুন ফাইলের সাইজ দেখা যায়।",
          "PNG থেকে JPG করলে স্বচ্ছ অংশ সাদা হয়ে যায়, কারণ JPG স্বচ্ছতা সাপোর্ট করে না। WebP সাধারণত JPG বা PNG এর চেয়ে ছোট সাইজে একই মানের ছবি দেয়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "কোনো ফর্ম বা ওয়েবসাইট শুধু JPG নেয়, অথচ আপনার ছবি PNG বা WebP, এমন সময় এটি কাজে লাগে। ওয়েবসাইটে ছবি ছোট রাখতে WebP তে বদলানোও জনপ্রিয় উপায়।",
          "আপনার ছবি কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। ব্রাউজার কোনো ফরম্যাট সাপোর্ট না করলে টুল আপনাকে জানিয়ে দেবে কোন ফরম্যাটে সেভ হচ্ছে।",
        ],
      },
    ],
    en: [
      {
        h: "How to change an image format",
        p: [
          "Select an image and choose JPG, PNG or WebP. JPG and WebP have a quality slider, PNG does not. You can see the size of the new file before you download it.",
          "Converting a PNG to JPG turns transparent areas white, because JPG does not support transparency. WebP usually gives the same quality as JPG or PNG at a smaller size.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps when a form or website accepts only JPG but your image is a PNG or WebP. Converting to WebP is also a popular way to keep images small on a website.",
          "Your image is not uploaded anywhere, everything happens on your phone or browser. If your browser does not support a format, the tool tells you which format it saved instead.",
        ],
      },
    ],
  },

  "qr-code-generator": {
    bn: [
      {
        h: "QR কোড কীভাবে বানাবেন",
        p: [
          "বক্সে লিংক বা লেখা লিখুন, সাইজ ও রং ঠিক করুন, তারপর PNG ডাউনলোড করুন। সাইজ ২০০ থেকে ১০০০ পিক্সেল পর্যন্ত বেছে নেওয়া যায়।",
          "লেখা বা লিংক সরাসরি QR এর ভেতরেই থাকে, তাই এই QR কোডের কোনো মেয়াদ নেই। তবে লিংকের ওয়েবসাইট বন্ধ হলে সেই লিংক আর কাজ করবে না।",
        ],
      },
      {
        h: "ভুল সংশোধনের মাত্রা",
        p: [
          "L, M, Q ও H মাত্রা ঠিক করে QR এর কিছু অংশ নষ্ট হলেও তা পড়া যাবে কিনা। L প্রায় ৭%, M ১৫%, Q ২৫% এবং H ৩০% পর্যন্ত নষ্ট হলে পড়া যায়। মাত্রা বাড়ালে QR ঘন হয়।",
          "রং বদলালে গাঢ় রঙের QR হালকা পটভূমিতে রাখুন, নাহলে স্ক্যানার পড়তে পারবে না। আপনার লেখা কোথাও পাঠানো হয় না, QR আপনার ব্রাউজারেই তৈরি হয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to make a QR code",
        p: [
          "Type a link or text in the box, adjust the size and colours, then download the PNG. You can choose a size from 200 to 1,000 pixels.",
          "The text or link is stored inside the QR itself, so this QR code does not expire. If the website behind a link goes offline, though, the link will stop working.",
        ],
      },
      {
        h: "Error correction level",
        p: [
          "The levels L, M, Q and H decide whether the QR can still be read if part of it is damaged. L tolerates about 7% damage, M 15%, Q 25% and H up to 30%. A higher level makes the QR denser.",
          "If you change colours, keep a dark QR on a light background, or scanners may not read it. Your text is not sent anywhere, the QR is made in your browser.",
        ],
      },
    ],
  },

  "cgpa-calculator": {
    bn: [
      {
        h: "CGPA কীভাবে হিসাব হয়",
        p: [
          "প্রতিটি সেমিস্টারের GPA কে সেই সেমিস্টারের ক্রেডিট দিয়ে গুণ করে সব সেমিস্টারের গুণফল যোগ করা হয়। তারপর মোট ক্রেডিট দিয়ে ভাগ করলে CGPA পাওয়া যায়।",
          "উদাহরণ: প্রথম সেমিস্টারে GPA ৩.৫০ ও ১৫ ক্রেডিট, দ্বিতীয়টিতে GPA ৩.০০ ও ১৫ ক্রেডিট হলে CGPA হয় (৩.৫ × ১৫ + ৩.০ × ১৫) ÷ ৩০ = ৩.২৫।",
        ],
      },
      {
        h: "স্কেল ও সীমাবদ্ধতা",
        p: [
          "টুলে ৪.০০ ও ৫.০০ দুই স্কেলই আছে, উপরে থেকে আপনার স্কেল বেছে নিন। দরকার হলে নতুন সেমিস্টার যোগ করা যায়।",
          "বিশ্ববিদ্যালয়ভেদে গ্রেডিং সিস্টেম এবং রিটেক বা ইমপ্রুভমেন্টের নিয়ম আলাদা। তাই এই ফলাফল আনুমানিক ধরুন এবং চূড়ান্ত CGPA আপনার বিশ্ববিদ্যালয় থেকে দেখে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "How CGPA is calculated",
        p: [
          "Multiply each semester's GPA by that semester's credits and add up the results for all semesters. Divide by the total credits to get the CGPA.",
          "Example: if the first semester has a GPA of 3.50 with 15 credits and the second has 3.00 with 15 credits, the CGPA is (3.5 × 15 + 3.0 × 15) ÷ 30 = 3.25.",
        ],
      },
      {
        h: "Scale and limitations",
        p: [
          "The tool supports both 4.00 and 5.00 scales, so choose yours at the top. You can add more semesters as needed.",
          "Grading systems and retake or improvement rules differ between universities. Treat this result as an estimate and check your final CGPA with your university.",
        ],
      },
    ],
  },

  "pdf-to-jpg": {
    bn: [
      {
        h: "PDF থেকে JPG কীভাবে বানাবেন",
        p: [
          "PDF সিলেক্ট করুন, চাইলে পেজ রেঞ্জ লিখুন (যেমন 1-3, 5), ছবির মান বেছে নিন, তারপর JPG বানান চাপুন। প্রতিটি পেজ একটি আলাদা JPG ছবি হয় এবং পাশের বাটন থেকে ডাউনলোড করা যায়।",
          "সাধারণ মানে A4 পেজ প্রায় ৮৯২ × ১২৬২ পিক্সেলের ছবি হয়, ফাইল ছোট থাকে। উচ্চ মানে ছবি আরও বড় ও স্পষ্ট হয়, তবে ফাইলের সাইজও বাড়ে। একবারে সর্বোচ্চ ৫০টি পেজ করা যায়।",
        ],
      },
      {
        h: "কখন কাজে লাগে",
        p: [
          "PDF এর কোনো পেজ ছবি হিসেবে মেসেঞ্জারে বা ফর্মে পাঠাতে, বা পেজের ছবি এডিট করতে চাইলে এটি কাজে লাগে।",
          "আপনার PDF কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। শুধু PDF পড়ার টুলটি ইন্টারনেট থেকে একবার লোড হয়, তাই প্রথমবার ইন্টারনেট দরকার। পাসওয়ার্ড দেওয়া PDF খোলা যায় না।",
        ],
      },
    ],
    en: [
      {
        h: "How to turn a PDF into JPG images",
        p: [
          "Select a PDF, optionally type a page range (for example 1-3, 5), choose the image quality, then tap Convert to JPG. Each page becomes its own JPG image with a download button beside it.",
          "Normal quality makes an A4 page about 892 × 1262 pixels with a smaller file. High quality gives bigger, sharper images but larger files. You can convert up to 50 pages at a time.",
        ],
      },
      {
        h: "When it helps",
        p: [
          "It helps when you want to send a PDF page as a picture in a chat or form, or edit a page as an image.",
          "Your PDF is not uploaded anywhere, everything happens on your phone or browser. Only the PDF reader library is loaded once from the internet, so you need a connection the first time. Password protected PDFs cannot be opened.",
        ],
      },
    ],
  },

  "compress-pdf": {
    bn: [
      {
        h: "PDF এর সাইজ কীভাবে কমাবেন",
        p: [
          "PDF সিলেক্ট করে হালকা, মাঝারি বা শক্তিশালী মাত্রা বেছে নিন, তারপর PDF কম্প্রেস করুন চাপুন। শেষে আগে ও পরের সাইজ দেখানো হয়। নতুন ফাইল ছোট হলেই ডাউনলোড বাটন আসে।",
          "এই টুল প্রতিটি পেজকে ছবিতে বদলে নতুন PDF বানায়, পেজের মাপ একই থাকে। তাই স্ক্যান করা কাগজ বা ছবির PDF অনেকটাই ছোট হয়।",
        ],
      },
      {
        h: "যা মনে রাখবেন",
        p: [
          "কম্প্রেসের পর PDF এর লেখা সিলেক্ট, কপি বা সার্চ করা যাবে না, কারণ পেজ এখন ছবি। লেখা দরকার হলে মূল ফাইল রেখে দিন। লেখা-ভিত্তিক PDF আগে থেকেই ছোট থাকে, সেখানে নতুন ফাইল বড় হতে পারে, তখন মূল ফাইলটিই ব্যবহার করুন।",
          "আবেদন ফর্মে ফাইলের সাইজের সীমা থাকলে এটি কাজে লাগে। আপনার PDF কোথাও আপলোড হয় না, সব কাজ আপনার ফোন বা ব্রাউজারেই হয়। শুধু PDF পড়ার টুলটি ইন্টারনেট থেকে একবার লোড হয়। সর্বোচ্চ ৬০ পেজ ও ৫০ MB।",
        ],
      },
    ],
    en: [
      {
        h: "How to reduce a PDF's size",
        p: [
          "Select a PDF, choose light, balanced or strong compression, then tap Compress PDF. You then see the size before and after. The download button appears only when the new file is smaller.",
          "This tool turns every page into an image and builds a new PDF at the same page size. Scanned papers and image-based PDFs often shrink a lot.",
        ],
      },
      {
        h: "Good to know",
        p: [
          "After compressing, the text in the PDF can no longer be selected, copied or searched, because the pages are now images. Keep the original if you need the text. Text-based PDFs are usually small already, so the new file can even be bigger, in which case keep the original.",
          "It helps when an application form has a file size limit. Your PDF is not uploaded anywhere, everything happens on your phone or browser. Only the PDF reader library is loaded once from the internet. Up to 60 pages and 50 MB.",
        ],
      },
    ],
  },

  "passport-fee-calculator-bd": {
    bn: [
      {
        h: "ই-পাসপোর্টের ফি কীভাবে দেখবেন",
        p: [
          "পাসপোর্টের পৃষ্ঠা (৪৮ বা ৬৪), মেয়াদ (৫ বা ১০ বছর) এবং ডেলিভারির ধরন (সাধারণ, জরুরি বা অতি জরুরি) বেছে নিলে ফি দেখা যায়। যেমন ৪৮ পৃষ্ঠার ৫ বছরের সাধারণ ই-পাসপোর্টের ফি ৪,০২৫ টাকা, আর ৬৪ পৃষ্ঠার ১০ বছরের অতি জরুরি পাসপোর্টের ফি ১৩,৮০০ টাকা। সব ফি ১৫% ভ্যাটসহ।",
          "নিচের তালিকায় একই পৃষ্ঠা ও মেয়াদের তিন ধরনের ডেলিভারির ফি পাশাপাশি দেখানো হয়, তাই কোনটিতে কত বাড়তি লাগবে তা সহজে তুলনা করা যায়।",
        ],
      },
      {
        h: "আবেদনের আগে যা মনে রাখবেন",
        p: [
          "এই ফি তালিকা ১২ জুলাই ২০২৬ তারিখের সরকারি তালিকা অনুযায়ী প্রকাশিত তথ্য থেকে নেওয়া। ফি বদলাতে পারে, তাই আবেদনের আগে অফিসিয়াল পোর্টাল epassport.gov.bd এ মিলিয়ে নিন।",
          "শিশু, নবায়ন, জরুরি পাসপোর্ট, বিদেশের দূতাবাস এবং NOC এর মতো বিশেষ ছাড়ের ক্ষেত্রে ফি আলাদা হতে পারে, এই টুল সেগুলো ধরে না। এটি একটি স্বাধীন ওয়েবসাইট, কোনো সরকারি সংস্থার সঙ্গে যুক্ত নয়।",
        ],
      },
    ],
    en: [
      {
        h: "How to check the e-passport fee",
        p: [
          "Choose the booklet pages (48 or 64), the validity (5 or 10 years) and the delivery type (regular, express or super express) to see the fee. For example, a 48 page, 5 year regular e-passport costs 4,025 taka, and a 64 page, 10 year super express passport costs 13,800 taka. All fees include 15% VAT.",
          "The table below shows the fees for all three delivery types for the same pages and validity side by side, so you can easily compare how much extra each costs.",
        ],
      },
      {
        h: "Before you apply",
        p: [
          "This fee list is taken from published information quoting the official schedule updated 12 July 2026. Fees can change, so confirm them on the official portal, epassport.gov.bd, before you apply.",
          "Fees can differ for children, renewals, emergency passports, overseas missions and special concessions such as NOC, and this tool does not cover them. This is an independent website and is not connected to any government body.",
        ],
      },
    ],
  },

  "bdt-currency-converter": {
    bn: [
      {
        h: "টাকার রেট কীভাবে কনভার্ট করবেন",
        p: [
          "পরিমাণ লিখে কোন মুদ্রা থেকে কোন মুদ্রায় বদলাবেন তা বেছে নিন। টাকা, মার্কিন ডলার, সৌদি রিয়াল, UAE দিরহাম, ভারতীয় রুপি, ইউরো, পাউন্ডসহ কয়েকটি মুদ্রা আছে। মাঝের তীর বাটনে চাপ দিলে দুই মুদ্রা অদলবদল হয়।",
          "ফলাফলের নিচে ১ একক মুদ্রার রেট ও রেটের তারিখ দেখানো হয়। রেট দিনে একবার আপডেট হয়।",
        ],
      },
      {
        h: "এই রেট আর ব্যাংকের রেটের পার্থক্য",
        p: [
          "এখানে দেখানো রেট মধ্যবর্তী (রেফারেন্স) রেট। ব্যাংক, এক্সচেঞ্জ হাউস বা মানি চেঞ্জার নিজেদের কেনা ও বেচার রেট ব্যবহার করে, যা এর থেকে আলাদা হয়। তাই টাকা বদলানো বা রেমিট্যান্স পাঠানোর আগে তাদের রেট দেখে নিন।",
          "রেট আনার জন্য ইন্টারনেট লাগে। আপনার লেখা পরিমাণ কোথাও পাঠানো হয় না।",
        ],
      },
    ],
    en: [
      {
        h: "How to convert currency",
        p: [
          "Enter an amount and choose which currency to convert from and to. Taka, US dollar, Saudi riyal, UAE dirham, Indian rupee, euro and pound are among the currencies available. Tap the arrow button in the middle to swap the two currencies.",
          "Below the result you see the rate for 1 unit and the date of the rate. The rates update once a day.",
        ],
      },
      {
        h: "How this differs from a bank's rate",
        p: [
          "The rate shown here is a mid-market (reference) rate. Banks, exchange houses and money changers use their own buying and selling rates, which differ from it. Check their rates before you exchange money or send remittance.",
          "An internet connection is needed to fetch the rates. The amount you type is never sent anywhere.",
        ],
      },
    ],
  },

  "electricity-bill-calculator-bd": {
    bn: [
      {
        h: "বিদ্যুৎ বিল কীভাবে হিসাব হয়",
        p: [
          "আবাসিক বিল তিনটি অংশ নিয়ে হয়: ইউনিট অনুযায়ী বিদ্যুতের মূল্য, অনুমোদিত লোড অনুযায়ী ডিমান্ড চার্জ, এবং এই দুটির যোগফলের ওপর ৫% ভ্যাট। ইউনিটের মূল্য স্ল্যাব ধরে হয়, প্রতিটি রেট শুধু ওই স্ল্যাবের ইউনিটে লাগে।",
          "উদাহরণ: ২০০ ইউনিট ও ১ kW লোড হলে প্রথম ৭৫ ইউনিট ৫.২৬ টাকায় (৩৯৪.৫০), পরের ১২৫ ইউনিট ৮.৫০ টাকায় (১,০৬২.৫০) ধরে বিদ্যুতের মূল্য ১,৪৫৭ টাকা। এর সঙ্গে ডিমান্ড চার্জ ৪২ টাকা যোগ করে ১,৪৯৯ টাকার ওপর ৫% ভ্যাট ৭৪.৯৫ টাকা, মোট ১,৫৭৩.৯৫ টাকা।",
        ],
      },
      {
        h: "বিলের সঙ্গে মিলিয়ে নিন",
        p: [
          "এই টুলে জুন ২০২৬ বিলিং থেকে কার্যকর আবাসিক (LT-A) রেট ধরা হয়েছে। বিইআরসি ৩ জুনের বাড়তি দাম ৫০ ও ৭৫ ইউনিটের স্ল্যাবের জন্য ৪ জুন প্রত্যাহার করেছে, তাই লাইফলাইন (৫০ ইউনিট বা কম) রেট ৪.৬৩ ও প্রথম স্ল্যাব ৫.২৬ টাকাই আছে।",
          "ডিমান্ড চার্জ প্রতি kW ৪২ টাকা ধরা হয়েছে, তবে আপনার বিলে আলাদা হতে পারে, তাই ঘরটি বদলানো যায়। মিটার ভাড়া, বকেয়া, দেরির জরিমানা ও রিবেট ধরা হয়নি, তাই প্রকৃত বিল কিছুটা আলাদা হতে পারে। প্রকৃত বিলই চূড়ান্ত।",
        ],
      },
    ],
    en: [
      {
        h: "How an electricity bill is worked out",
        p: [
          "A residential bill has three parts: the energy charge based on units used, the demand charge based on your sanctioned load, and 5% VAT on the sum of those two. The energy charge is worked out slab by slab, and each rate applies only to the units inside its slab.",
          "Example: with 200 units and a 1 kW load, the first 75 units are charged at 5.26 taka (394.50) and the next 125 at 8.50 taka (1,062.50), so the energy charge is 1,457 taka. Adding a demand charge of 42 taka gives 1,499 taka, and 5% VAT of 74.95 makes the total 1,573.95 taka.",
        ],
      },
      {
        h: "Check it against your bill",
        p: [
          "This tool uses the residential (LT-A) rates effective from the June 2026 billing month. BERC withdrew its 3 June hike for the 0-50 and 0-75 unit slabs on 4 June, so the lifeline rate (50 units or fewer) stays at 4.63 taka and the first slab at 5.26 taka.",
          "The demand charge is set at 42 taka per kW, but your bill may differ, so the field can be changed. Meter rent, arrears, late fees and rebates are not included, so your actual bill can be a little different. The bill you receive is final.",
        ],
      },
    ],
  },

  "number-to-words-bd": {
    bn: [
      {
        h: "টাকার অঙ্ক কথায় লেখা কেন দরকার",
        p: [
          "চেক, ভাউচার, চালান ও চুক্তিতে টাকার অঙ্কের পাশাপাশি কথায়ও লিখতে হয়, যাতে অঙ্কে কোনো বদল বা ভুল সহজে ধরা পড়ে। এই টুল আপনার অঙ্ক বাংলা ও ইংরেজি দুই ভাষায় কথায় লিখে দেয়।",
          "যেমন ১২,৩৪,৫৬৭ টাকা কথায় হয় \"বারো লাখ চৌত্রিশ হাজার পাঁচশ সাতষট্টি টাকা মাত্র\"। পয়সা থাকলে \"টাকা ... পয়সা মাত্র\" আকারে দেখায়।",
        ],
      },
      {
        h: "লাখ-কোটি পদ্ধতি",
        p: [
          "বাংলাদেশে সংখ্যা গোনা হয় হাজার, লাখ ও কোটি দিয়ে। এক লাখ মানে ১,০০,০০০ এবং এক কোটি মানে ১,০০,০০,০০০। ইংরেজিতেও তাই Lakh ও Crore ব্যবহার করা হয়েছে।",
          "চেকে লেখার আগে বানান একবার মিলিয়ে নিন। কিছু ব্যাংকে \"শ\" এর বদলে \"শত\" লেখার চল থাকলে নিজে বদলে নিন।",
        ],
      },
    ],
    en: [
      {
        h: "Why write an amount in words",
        p: [
          "Cheques, vouchers, invoices and contracts ask for the amount in words as well as numbers, so that any change or mistake in the digits is easy to spot. This tool writes your amount in words in both Bangla and English.",
          "For example 12,34,567 taka reads \"Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven Taka Only\". If there are paisa, it reads \"Taka ... Paisa Only\".",
        ],
      },
      {
        h: "The lakh and crore system",
        p: [
          "Numbers in Bangladesh are counted in thousands, lakhs and crores. One lakh is 1,00,000 and one crore is 1,00,00,000. That is why the English words use Lakh and Crore too.",
          "Check the spelling once before you write it on a cheque. If your bank prefers a different Bangla spelling for hundreds, change it yourself.",
        ],
      },
    ],
  },

  "zakat-calculator-bd": {
    bn: [
      {
        h: "যাকাত কীভাবে হিসাব হয়",
        p: [
          "এই টুলে আপনার নগদ টাকা, সোনা ও রুপার বাজার মূল্য, ব্যবসার মজুত এবং ফেরত পাওয়ার মতো পাওনা যোগ করা হয়, তারপর আপনার ঋণ বাদ দিয়ে নিট সম্পদ বের হয়। নিট সম্পদ নিসাবের সমান বা বেশি হলে তার ২.৫% যাকাত হিসেবে দেখায়।",
          "নিসাব হলো ৭.৫ ভরি সোনা অথবা ৫২.৫ ভরি রুপার দাম। ১ ভরি ১১.৬৬৪ গ্রাম ধরে এটি প্রায় ৮৭.৪৮ গ্রাম সোনা বা ৬১২.৩৬ গ্রাম রুপা। সোনা-রুপার দাম রোজ বদলায়, তাই আপনি আজকের প্রতি ভরির দাম নিজে লিখবেন।",
        ],
      },
      {
        h: "কিছু জরুরি কথা",
        p: [
          "সাধারণ নিয়মে নিট সম্পদ নিসাব পরিমাণ হলে এবং এক চান্দ্র বছর আপনার কাছে থাকলে যাকাত দিতে হয়। রুপা না সোনা দিয়ে নিসাব ধরবেন, তা নিয়ে আলিমদের মত আছে।",
          "এই টুল একটি সাধারণ হিসাবের সহায়ক, ফতোয়া নয়। ব্যক্তিগত অবস্থায় কোনো সন্দেহ থাকলে আপনার স্থানীয় আলিম বা ইসলামী প্রতিষ্ঠানের সঙ্গে কথা বলুন।",
        ],
      },
    ],
    en: [
      {
        h: "How zakat is worked out",
        p: [
          "This tool adds your cash, the market value of your gold and silver, business stock and money owed to you that is likely to be repaid, then subtracts your debts to get net wealth. If net wealth is at least the nisab, it shows 2.5% of it as zakat.",
          "The nisab is the price of 7.5 vori of gold or 52.5 vori of silver. With 1 vori = 11.664 g, that is about 87.48 g of gold or 612.36 g of silver. Gold and silver prices change every day, so you type today's price per vori yourself.",
        ],
      },
      {
        h: "A few important points",
        p: [
          "As a general rule, zakat is due when your net wealth reaches the nisab and you have held it for one lunar year. Scholars differ on whether to use silver or gold for the nisab.",
          "This tool is a general calculation aid, not a religious ruling. If you have doubts about your own situation, speak to your local scholar or an Islamic institution.",
        ],
      },
    ],
  },

  "gold-weight-converter-bd": {
    bn: [
      {
        h: "ভরি, আনা, রতি ও গ্রাম",
        p: [
          "বাংলাদেশে সোনা-রুপা ভরি, আনা ও রতিতে মাপা হয়, কিন্তু ওজন যন্ত্রে ও দামের তালিকায় গ্রামও দেখা যায়। এই টুল দুই দিকেই রূপান্তর করে।",
          "১ ভরি = ১৬ আনা = ৯৬ রতি = ১১.৬৬৪ গ্রাম। তাই ১ আনা = ০.৭২৯ গ্রাম এবং ১ রতি = ০.১২১৫ গ্রাম। যেমন ২ ভরি ৮ আনা ৩ রতি হলো ২৯.৫২৪৫ গ্রাম।",
        ],
      },
      {
        h: "দামের হিসাব",
        p: [
          "প্রতি ভরির দাম লিখলে আপনার ওজনের মোট দাম দেখায়। আজকের দাম এই টুলে নেই, তাই বাজুসের আজকের দাম দেখে নিজে লিখুন। ক্যারেট অনুযায়ী দাম আলাদা, আর গয়নার মজুরি ও ভ্যাট এখানে ধরা হয়নি।",
        ],
      },
    ],
    en: [
      {
        h: "Vori, ana, roti and grams",
        p: [
          "In Bangladesh gold and silver are weighed in vori, ana and roti, while scales and price lists often show grams. This tool converts in both directions.",
          "1 vori = 16 ana = 96 roti = 11.664 grams, so 1 ana = 0.729 g and 1 roti = 0.1215 g. For example 2 vori 8 ana 3 roti is 29.5245 grams.",
        ],
      },
      {
        h: "Working out the price",
        p: [
          "Type the price per vori and the tool shows the total value of your weight. Today's price is not in this tool, so check the BAJUS rate and type it yourself. Price differs by carat, and jewellery making charges and VAT are not included.",
        ],
      },
    ],
  },
};
