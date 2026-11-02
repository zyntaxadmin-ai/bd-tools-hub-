// Guide articles (the /guides section). Add a new guide by adding an object here, then add it to the sitemap list automatically.
// Every text is a [Bangla, English] pair. Keep facts dated and link to the matching tool.
export type GuideSection = { h: [string, string]; p: [string, string][] };
export type Guide = {
  slug: string;
  title: [string, string];
  desc: [string, string];
  updated: string; // ISO date
  updatedLabel: [string, string];
  tool: { slug: string; name: [string, string] };
  sections: GuideSection[];
  faqs: { q: [string, string]; a: [string, string] }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "cash-out-charge-hisab",
    title: ["বিকাশ, নগদ, রকেট ও উপায় ক্যাশ আউট চার্জ কীভাবে হিসাব করবেন", "How to calculate bKash, Nagad, Rocket and Upay cash out charges"],
    desc: ["প্রতি ১০০০ টাকায় চার্জ ধরে ক্যাশ আউটে কত টাকা কাটবে তা কীভাবে বের করবেন, উদাহরণসহ সহজ নিয়ম।", "A simple rule with examples to find out how much is deducted on a cash out, using the charge per 1,000 taka."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "bkash-calculator", name: ["bKash চার্জ ক্যালকুলেটর", "bKash charge calculator"] },
    sections: [
      {
        h: ["ক্যাশ আউট চার্জের সহজ নিয়ম", "The simple rule for cash out charges"],
        p: [
          ["মোবাইল ব্যাংকিং-এ ক্যাশ আউট চার্জ সাধারণত প্রতি ১০০০ টাকায় একটি নির্দিষ্ট অঙ্ক হিসেবে বলা হয়। যেমন প্রতি ১০০০ টাকায় ১৮.৫০ টাকা। এটি আসলে ১.৮৫%।", "Mobile banking cash out charges are usually quoted as a fixed amount per 1,000 taka. For example 18.50 taka per 1,000, which is 1.85%."],
          ["সূত্র: চার্জ = টাকার পরিমাণ × (প্রতি ১০০০ টাকার চার্জ ÷ ১০০০)। তাই ৫,০০০ টাকা তুললে প্রতি ১০০০ এ ১৮.৫০ ধরে চার্জ হয় ৫ × ১৮.৫০ = ৯২.৫০ টাকা। মোট কাটবে ৫,০০০ + ৯২.৫০ = ৫,০৯২.৫০ টাকা।", "Formula: charge = amount × (charge per 1,000 ÷ 1,000). So for 5,000 taka at 18.50 per 1,000 the charge is 5 × 18.50 = 92.50 taka. In total 5,000 + 92.50 = 5,092.50 taka is deducted."],
        ],
      },
      {
        h: ["চার্জ কেন বদলায়", "Why the charge changes"],
        p: [
          ["এজেন্ট, এটিএম বা ব্যাংকের বুথভেদে চার্জ আলাদা হয়। একই কোম্পানিরও অফার, অ্যাপের ধরন এবং সময়ভেদে রেট বদলাতে পারে। তাই ইন্টারনেটের পুরোনো তালিকা না দেখে নিজের অ্যাপে বা অফিসিয়াল ওয়েবসাইটে রেট দেখে নেওয়া ভালো।", "The charge differs between an agent, an ATM and a bank booth. Even the same company can change its rate by offer, app type and date. So instead of an old list online, check the rate in your own app or on the official website."],
          ["আমাদের ক্যালকুলেটরগুলোতে এখন (অক্টোবর ২০২৬ এ দেখা) এজেন্ট ক্যাশ আউটে প্রতি ১০০০ টাকায় এই রেট ধরা আছে: bKash ১৮.৫০, Nagad ১৪.৯০, Rocket ১৮, Upay ১৪। এই রেট নিয়ে প্রকাশিত উৎসগুলোর মধ্যে মিল নেই, তাই আপনার নিজের রেট জানা থাকলে ক্যালকুলেটরে \"নিজে রেট দিন\" ব্যবহার করুন।", "Our calculators currently use these agent cash out rates per 1,000 taka (checked October 2026): bKash 18.50, Nagad 14.90, Rocket 18, Upay 14. Published sources do not fully agree on these rates, so if you know your own rate, use \"Enter my own rate\" in the calculator."],
        ],
      },
      {
        h: ["কম চার্জে টাকা তোলার উপায়", "Ways to pay less when you cash out"],
        p: [
          ["কিছু কোম্পানির নির্দিষ্ট ব্যাংকের এটিএম বুথে ক্যাশ আউটের রেট এজেন্টের চেয়ে কম। যেমন আমাদের ক্যালকুলেটরে Rocket এর ডাচ-বাংলা ব্যাংক এটিএম ১০ এবং Upay এর ইউসিবি ব্যাংক এটিএম ৮ ধরা আছে। কাছে এমন বুথ থাকলে রেট মিলিয়ে দেখুন।", "Some companies charge less at certain bank ATM booths than at an agent. For example our calculators use 10 for Rocket at Dutch-Bangla Bank ATMs and 8 for Upay at UCB Bank ATMs. If there is such a booth near you, compare the rate."],
          ["একসঙ্গে বেশি টাকা তুললে চার্জের অঙ্কও বেশি হয়, কারণ চার্জ টাকার সমানুপাতিক। তাই প্রয়োজনের বেশি টাকা না তুলে, রেট জেনে হিসাব করে তোলাই ভালো।", "Taking out a larger amount makes the charge bigger because it is proportional to the amount. So work out the charge first and take only what you need."],
        ],
      },
    ],
    faqs: [
      { q: ["১০,০০০ টাকা ক্যাশ আউটে কত চার্জ কাটে?", "How much is the charge for cashing out 10,000 taka?"], a: ["প্রতি ১০০০ টাকায় ১৮.৫০ হলে ১০ × ১৮.৫০ = ১৮৫ টাকা। রেট ১৪ হলে ১৪০ টাকা। আপনার রেট অনুযায়ী ক্যালকুলেটরে দেখে নিন।", "At 18.50 per 1,000 it is 10 × 18.50 = 185 taka. At a rate of 14 it is 140 taka. Check your own rate in the calculator."] },
      { q: ["প্রতি ১০০০ টাকায় ১৮.৫০ মানে কত শতাংশ?", "What percentage is 18.50 per 1,000 taka?"], a: ["১.৮৫%। প্রতি ১০০০ এর চার্জকে ১০ দিয়ে ভাগ করলে শতাংশ পাওয়া যায়।", "It is 1.85%. Divide the charge per 1,000 by 10 to get the percentage."] },
      { q: ["সেন্ড মানির চার্জও কি এভাবে হিসাব হয়?", "Is send money calculated the same way?"], a: ["সেন্ড মানি অ্যাপ ও অফারভেদে বদলায়, বেশিরভাগ ক্ষেত্রে একই কোম্পানির নম্বরে পাঠানো সাধারণত ফ্রি। অ্যাপে দেখে নিন।", "Send money varies by app and offer, and sending to a number of the same company is often free. Check in the app."] },
    ],
  },
  {
    slug: "ssc-gpa-hisab-niyom",
    title: ["এসএসসি ও এইচএসসি জিপিএ কীভাবে হিসাব করবেন (গ্রেড পয়েন্ট ও ৪র্থ বিষয়)", "How to calculate SSC and HSC GPA (grade points and the 4th subject)"],
    desc: ["নম্বর থেকে গ্রেড পয়েন্ট, জিপিএ বের করার নিয়ম, ৪র্থ বিষয়ের হিসাব এবং ফেল করার শর্ত উদাহরণসহ বুঝে নিন।", "Learn how marks turn into grade points, how GPA is worked out, how the 4th subject counts and when a student fails, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "gpa-calculator-bd", name: ["GPA ক্যালকুলেটর", "GPA calculator"] },
    sections: [
      {
        h: ["নম্বর থেকে গ্রেড পয়েন্ট", "From marks to grade points"],
        p: [
          ["বাংলাদেশের সব শিক্ষা বোর্ডে প্রতিটি বিষয়ের নম্বরকে গ্রেডে ও গ্রেড পয়েন্টে বদলানো হয়: ৮০-১০০ নম্বরে A+ (৫.০০), ৭০-৭৯ এ A (৪.০০), ৬০-৬৯ এ A- (৩.৫০), ৫০-৫৯ এ B (৩.০০), ৪০-৪৯ এ C (২.০০), ৩৩-৩৯ এ D (১.০০) এবং ৩৩ এর নিচে F (০.০০)।", "In all education boards of Bangladesh, the marks in each subject are converted to a grade and a grade point: 80-100 is A+ (5.00), 70-79 is A (4.00), 60-69 is A- (3.50), 50-59 is B (3.00), 40-49 is C (2.00), 33-39 is D (1.00) and below 33 is F (0.00)."],
        ],
      },
      {
        h: ["জিপিএ বের করার নিয়ম", "How GPA is worked out"],
        p: [
          ["জিপিএ = সব বাধ্যতামূলক বিষয়ের গ্রেড পয়েন্টের যোগফল ÷ ওই বিষয়ের সংখ্যা। কত বিষয় ধরা হয় তা শাখা ও বোর্ডের নিয়মের ওপর নির্ভর করে, তাই আপনার ফলাফলে ধরা বিষয়ের সংখ্যা দিয়েই ভাগ করুন।", "GPA = the total grade points of the compulsory subjects ÷ the number of those subjects. How many subjects count depends on your group and board, so divide by the number of subjects counted in your result."],
          ["উদাহরণ (৬টি বিষয়): ৫.০০, ৪.০০, ৪.০০, ৩.৫০, ৩.৫০ ও ৫.০০ এর যোগফল ২৫.০০। ৬ দিয়ে ভাগ করলে জিপিএ ৪.১৭।", "Example (6 subjects): 5.00, 4.00, 4.00, 3.50, 3.50 and 5.00 add up to 25.00. Divided by 6, the GPA is 4.17."],
        ],
      },
      {
        h: ["৪র্থ বিষয়ের হিসাব", "How the 4th subject counts"],
        p: [
          ["৪র্থ (ঐচ্ছিক) বিষয়ে ২.০০ এর বেশি যে গ্রেড পয়েন্ট পাওয়া যায়, শুধু ওই বাড়তি অংশ মোট পয়েন্টে যোগ হয়। যেমন ৪র্থ বিষয়ে ৫.০০ পেলে ৫.০০ − ২.০০ = ৩.০০ যোগ হবে। ২.০০ বা তার কম পেলে জিপিএ-তে কোনো প্রভাব পড়ে না।", "In the 4th (optional) subject, only the part of the grade point above 2.00 is added to the total. For example, 5.00 in the 4th subject adds 5.00 − 2.00 = 3.00. A grade point of 2.00 or less has no effect on the GPA."],
          ["উপরের উদাহরণে ৪র্থ বিষয়ে ৫.০০ পেলে মোট ২৫.০০ + ৩.০০ = ২৮.০০, ভাগ করলে ২৮ ÷ ৬ = ৪.৬৭। সর্বোচ্চ জিপিএ ৫.০০।", "In the example above, with 5.00 in the 4th subject the total is 25.00 + 3.00 = 28.00, and 28 ÷ 6 = 4.67. The maximum GPA is 5.00."],
        ],
      },
      {
        h: ["কখন ফেল ধরা হয়", "When a student fails"],
        p: [
          ["পাস করতে প্রতিটি বিষয়ে অন্তত D (১.০০), মানে ৩৩ নম্বর পেতে হয়। কোনো একটি বিষয়ে F পেলে অন্য বিষয়ে যত ভালোই করুন, সামগ্রিক ফলাফল ফেল দেখায়।", "To pass, you need at least D (1.00) in every subject, which is 33 marks. If you get F in any one subject, the overall result is a fail however well you did in the others."],
          ["আমাদের GPA ক্যালকুলেটর ৫টি বিষয়ের গড় বের করে এবং কোনো বিষয়ে F থাকলে Fail দেখায়। নিজের ফলাফলের সঠিক বিষয়সংখ্যা ও ৪র্থ বিষয়ের নিয়ম মিলিয়ে নিতে বোর্ডের নিয়ম দেখুন।", "Our GPA calculator averages 5 subjects and shows Fail if any subject is F. To match the exact number of subjects and the 4th subject rule for your result, check your board's rules."],
        ],
      },
    ],
    faqs: [
      { q: ["জিপিএ ৫ পেতে কত নম্বর লাগে?", "How many marks do I need for GPA 5?"], a: ["জিপিএ ৫.০০ পেতে প্রতিটি বিষয়ে ৮০ বা তার বেশি নম্বর (A+) লাগে। এক বিষয়ে ৭৯ হলেও জিপিএ ৫-এর নিচে নামে, তবে ৪র্থ বিষয়ের বাড়তি পয়েন্ট জিপিএ বাড়াতে পারে।", "For GPA 5.00 you need 80 or more (A+) in every subject. One subject at 79 brings the GPA below 5, though extra points from the 4th subject can raise the GPA."] },
      { q: ["৪র্থ বিষয়ে ফেল করলে কি সামগ্রিক ফেল?", "Do I fail overall if I fail the 4th subject?"], a: ["এ নিয়ম বোর্ড ও সালভেদে আলাদা হতে পারে। তাই নিশ্চিত হতে আপনার বোর্ডের সর্বশেষ নিয়ম বা স্কুলের শিক্ষকের কাছ থেকে জেনে নিন।", "This rule can differ by board and by year. To be sure, check your board's latest rules or ask your teacher."] },
      { q: ["A- এর গ্রেড পয়েন্ট কত?", "What is the grade point of A-?"], a: ["৩.৫০, যা ৬০ থেকে ৬৯ নম্বরের জন্য।", "It is 3.50, for marks from 60 to 69."] },
    ],
  },
  {
    slug: "income-tax-hisab-2026-27",
    title: ["আয়কর কীভাবে হিসাব করবেন (২০২৬-২৭, ব্যক্তি করদাতা)", "How to calculate income tax (2026-27, individual taxpayers)"],
    desc: ["করমুক্ত সীমা, কর-ধাপ, বিনিয়োগ রেয়াত ও ন্যূনতম কর ধরে ব্যক্তি করদাতার আয়কর হিসাবের ধাপগুলো উদাহরণসহ।", "The steps to work out an individual taxpayer's income tax with the tax-free limit, slabs, investment rebate and minimum tax, with an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "income-tax-calculator-bd", name: ["আয়কর ক্যালকুলেটর", "Income tax calculator"] },
    sections: [
      {
        h: ["ধাপ ১: করযোগ্য আয় বের করুন", "Step 1: Find your taxable income"],
        p: [
          ["বছরের মোট আয় থেকে করমুক্ত অংশ বাদ দিলে করযোগ্য আয় পাওয়া যায়। মাসিক বেতনকে ১২ দিয়ে গুণ করে বোনাস যোগ করুন, তারপর আপনার পে-স্লিপ বা কর পরামর্শকের কাছে জেনে করমুক্ত অংশ বাদ দিন।", "Subtract the tax-exempt part from your total yearly income to get taxable income. Multiply your monthly salary by 12, add bonuses, then subtract the exempt part you get from your payslip or a tax adviser."],
        ],
      },
      {
        h: ["ধাপ ২: করমুক্ত সীমা ও কর-ধাপ", "Step 2: The tax-free limit and slabs"],
        p: [
          ["ফাইনান্স অ্যাক্ট ২০২৬ অনুযায়ী ২০২৬-২৭ অর্থবছরে সাধারণ করদাতার করমুক্ত আয়সীমা ৪,০০,০০০ টাকা। নারী, ৬৫+ বয়সী, প্রতিবন্ধী ও মুক্তিযোদ্ধাদের সীমা বেশি, তা এনবিআর-এর ঘোষণা থেকে দেখে নিন।", "Under the Finance Act 2026 the tax-free limit for a general taxpayer is 4,00,000 taka for 2026-27. Women, people aged 65+, people with disabilities and freedom fighters have higher limits, so check the NBR announcement."],
          ["সীমার পরের আয়ে ধাপে ধাপে কর: প্রথম ৩,০০,০০০ টাকায় ১০%, পরের ৪,০০,০০০ টাকায় ১৫%, পরের ৫,০০,০০০ টাকায় ২০%, পরের ২০,০০,০০০ টাকায় ২৫% এবং বাকি আয়ে ৩০%। আগের ৫% ধাপটি আর নেই।", "Income above the limit is taxed slab by slab: 10% on the first 3,00,000, 15% on the next 4,00,000, 20% on the next 5,00,000, 25% on the next 20,00,000 and 30% on the rest. The old 5% slab is gone."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["করযোগ্য আয় ১২,০০,০০০ টাকা হলে করমুক্ত ৪,০০,০০০ বাদ দিয়ে থাকে ৮,০০,০০০। এর ৩,০০,০০০ এ ১০% = ৩০,০০০; ৪,০০,০০০ এ ১৫% = ৬০,০০০; বাকি ১,০০,০০০ এ ২০% = ২০,০০০। মোট কর ১,১০,০০০ টাকা।", "With a taxable income of 12,00,000, after the 4,00,000 limit 8,00,000 remains. 10% of 3,00,000 = 30,000; 15% of 4,00,000 = 60,000; 20% of the last 1,00,000 = 20,000. The total tax is 1,10,000 taka."],
        ],
      },
      {
        h: ["ধাপ ৩: রেয়াত ও ন্যূনতম কর", "Step 3: Rebate and minimum tax"],
        p: [
          ["যোগ্য বিনিয়োগ (যেমন ডিপিএস, সঞ্চয়পত্র, জীবনবিমার প্রিমিয়াম) থাকলে কর কমানো যায়। প্রকাশিত তথ্য অনুযায়ী রেয়াত হলো করযোগ্য আয়ের ৩%, বিনিয়োগের ১০% এবং ৭,৫০,০০০ টাকার মধ্যে সবচেয়ে কম অঙ্ক। উপরের উদাহরণে ৫,০০,০০০ টাকা বিনিয়োগ থাকলে রেয়াত ৩৬,০০০, তাই কর দাঁড়ায় ৭৪,০০০ টাকা।", "Eligible investment (such as DPS, savings certificates and life insurance premium) can reduce your tax. According to published information the rebate is the lowest of 3% of taxable income, 10% of investment and 7,50,000 taka. In the example above, with 5,00,000 invested the rebate is 36,000, so the tax comes to 74,000 taka."],
          ["আয় করমুক্ত সীমার বেশি হলে সাধারণত ন্যূনতম ৫,০০০ টাকা কর দিতে হয়। নতুন করদাতার ক্ষেত্রে ১,০০০ টাকা বলে জানা যায়।", "If your income is above the tax-free limit, a minimum tax of 5,000 taka usually applies. New taxpayers are reported to pay 1,000 taka."],
        ],
      },
      {
        h: ["মনে রাখুন", "Keep in mind"],
        p: [
          ["কর আইন প্রতি বাজেটে বদলায় এবং এখানে সারচার্জ ও উৎসে কর কর্তন ধরা হয়নি। এটি আনুমানিক হিসাব, রিটার্ন জমার আগে nbr.gov.bd বা একজন কর পরামর্শকের সঙ্গে মিলিয়ে নিন।", "Tax law changes with every budget and surcharge and tax deducted at source are not included here. This is an estimate, so check nbr.gov.bd or a tax adviser before you file your return."],
        ],
      },
    ],
    faqs: [
      { q: ["২০২৬-২৭ এ করমুক্ত আয়সীমা কত?", "What is the tax-free income limit for 2026-27?"], a: ["সাধারণ করদাতার জন্য ৪,০০,০০০ টাকা (ফাইনান্স অ্যাক্ট ২০২৬)। বাজেটে প্রস্তাব ছিল ৩,৭৫,০০০, কিন্তু সংসদে পাস হওয়া বিলে ৪,০০,০০০ করা হয়েছে।", "4,00,000 taka for a general taxpayer (Finance Act 2026). The budget proposed 3,75,000 but the bill passed by parliament raised it to 4,00,000."] },
      { q: ["মাসে ৫০,০০০ টাকা বেতনে কত কর?", "How much tax on a 50,000 taka monthly salary?"], a: ["বছরে ৬,০০,০০০ টাকা। করমুক্ত অংশ বাদ না দিলে ৪,০০,০০০ এর পর ২,০০,০০০ এ ১০% = ২০,০০০ টাকা কর। বেতনের করমুক্ত অংশ থাকলে কর কমবে, কখনো ন্যূনতম করে নামতে পারে। ক্যালকুলেটরে নিজের হিসাব দেখুন।", "That is 6,00,000 per year. With no exempt part, 10% of the 2,00,000 above 4,00,000 = 20,000 taka tax. If part of the salary is exempt the tax goes down and may fall to the minimum tax. See your own case in the calculator."] },
      { q: ["রিটার্ন জমা না দিলে কী হয়?", "What if I do not file a return?"], a: ["TIN থাকলে করমুক্ত আয়ের মধ্যে থাকলেও রিটার্ন জমা দেওয়ার বাধ্যবাধকতা থাকে। বিস্তারিত নিয়ম এনবিআর বা কর পরামর্শকের কাছে জেনে নিন।", "If you have a TIN you are generally required to file a return even when your income is within the tax-free limit. Ask the NBR or a tax adviser for the details."] },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
