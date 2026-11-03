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
      { q: ["২০০০ টাকা ক্যাশ আউট চার্জ বিকাশে কত?", "What is the bKash cash out charge on 2,000 taka?"], a: ["প্রতি ১০০০ টাকায় ১৮.৫০ ধরলে ২ × ১৮.৫০ = ৩৭ টাকা। ৩০০০ টাকায় ৫৫.৫০, ১০০ টাকায় ১.৮৫ এবং ৫০০০ টাকায় ৯২.৫০ টাকা। রেট বদলালে অঙ্কও বদলাবে।", "At 18.50 per 1,000 taka, 2 × 18.50 = 37 taka. It is 55.50 on 3,000 taka, 1.85 on 100 taka and 92.50 on 5,000 taka. If the rate changes, these figures change too."] },
      { q: ["প্রিয় নম্বর বা অফারে চার্জ আলাদা হয়?", "Can a Priyo number or an offer change the charge?"], a: ["বিশেষ অফার বা সুবিধা থাকলে রেট আলাদা হতে পারে। আপনার ক্ষেত্রে প্রযোজ্য রেট বিকাশ অ্যাপ বা অফিসিয়াল সাইটে দেখে নিন।", "A special offer or benefit can change the rate. Check the rate that applies to you in the bKash app or on the official site."] },
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
  {
    slug: "bidyut-bill-hisab-niyom",
    title: ["বিদ্যুৎ বিল কীভাবে হিসাব করবেন (ইউনিট, স্ল্যাব, ডিমান্ড চার্জ ও ভ্যাট)", "How to calculate your electricity bill (units, slabs, demand charge and VAT)"],
    desc: ["আবাসিক বিদ্যুৎ বিল ইউনিট অনুযায়ী ধাপে ধাপে কীভাবে হিসাব হয়, ডিমান্ড চার্জ ও ৫% ভ্যাটসহ উদাহরণ দেখে নিন।", "See step by step how a residential electricity bill is worked out from units, with the demand charge and 5% VAT, and examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "electricity-bill-calculator-bd", name: ["বিদ্যুৎ বিল ক্যালকুলেটর", "Electricity bill calculator"] },
    sections: [
      {
        h: ["বিলের তিনটি অংশ", "The three parts of a bill"],
        p: [
          ["আবাসিক (LT-A) বিদ্যুৎ বিলে তিনটি অংশ থাকে: ইউনিট অনুযায়ী বিদ্যুতের মূল্য, অনুমোদিত লোড (kW) অনুযায়ী ডিমান্ড চার্জ, আর এই দুটির যোগফলের ওপর ৫% ভ্যাট। মিটার ভাড়া, বকেয়া ও দেরির জরিমানা থাকলে তা আলাদাভাবে যোগ হয়।", "A residential (LT-A) electricity bill has three parts: the energy charge based on units used, the demand charge based on your sanctioned load (kW), and 5% VAT on the sum of those two. Meter rent, arrears and late fees are added separately if they apply."],
        ],
      },
      {
        h: ["স্ল্যাব অনুযায়ী রেট", "Rates by slab"],
        p: [
          ["জুন ২০২৬ বিলিং থেকে কার্যকর রেট: মোট ইউনিট ৫০ বা কম হলে সব ইউনিট ৪.৬৩ টাকা। এর বেশি হলে ধাপে ধাপে: প্রথম ৭৫ ইউনিট ৫.২৬, ৭৬-২০০ ইউনিট ৮.৫০, ২০১-৩০০ ইউনিট ৯.১০, ৩০১-৪০০ ইউনিট ৯.৬২, ৪০১-৬০০ ইউনিট ১৫.০১ এবং ৬০০ এর বেশি ইউনিট ১৭.৩৫ টাকা।", "Rates effective from the June 2026 billing month: if total units are 50 or fewer, all units are 4.63 taka. Above that, slab by slab: the first 75 units at 5.26, 76-200 at 8.50, 201-300 at 9.10, 301-400 at 9.62, 401-600 at 15.01 and above 600 at 17.35 taka."],
          ["বিইআরসি ৩ জুন দাম বাড়ালেও ৫০ ও ৭৫ ইউনিটের স্ল্যাবের বাড়তি দাম ৪ জুন প্রত্যাহার করেছে, তাই ওই দুই রেট আগের মতোই আছে। প্রতিটি রেট শুধু ওই স্ল্যাবের ইউনিটে লাগে, সব ইউনিটে নয়।", "Although BERC raised prices on 3 June, it withdrew the hike for the 50 and 75 unit slabs on 4 June, so those two rates stay as before. Each rate applies only to the units inside its slab, not to all your units."],
        ],
      },
      {
        h: ["উদাহরণ: ২০০ ইউনিট, ১ kW লোড", "Example: 200 units, 1 kW load"],
        p: [
          ["প্রথম ৭৫ ইউনিট × ৫.২৬ = ৩৯৪.৫০; পরের ১২৫ ইউনিট × ৮.৫০ = ১,০৬২.৫০। বিদ্যুতের মূল্য ১,৪৫৭ টাকা।", "First 75 units × 5.26 = 394.50; next 125 units × 8.50 = 1,062.50. The energy charge is 1,457 taka."],
          ["ডিমান্ড চার্জ ধরা হয়েছে প্রতি kW ৪২ টাকা, তাই ১ kW এ ৪২ টাকা। যোগফল ১,৪৯৯ টাকার ওপর ৫% ভ্যাট ৭৪.৯৫। মোট বিল ১,৫৭৩.৯৫ টাকা।", "The demand charge is taken as 42 taka per kW, so 42 taka for 1 kW. The sum of 1,499 taka plus 5% VAT of 74.95 gives a total bill of 1,573.95 taka."],
        ],
      },
      {
        h: ["আরও কয়েকটি উদাহরণ", "A few more examples"],
        p: [
          ["একই হিসাবে (১ kW, ডিমান্ড ৪২): ৩০ ইউনিটে মোট প্রায় ১৮৯.৯৪ টাকা, ১০০ ইউনিটে প্রায় ৬৮১.৪৫ টাকা, ৩০০ ইউনিটে প্রায় ২,৫২৯.৪৫ টাকা এবং ৫০০ ইউনিটে প্রায় ৫,১১৫.৬০ টাকা।", "With the same assumptions (1 kW, demand charge 42): about 189.94 taka for 30 units, 681.45 for 100 units, 2,529.45 for 300 units and 5,115.60 for 500 units."],
          ["লক্ষ করুন ৪০০ ইউনিটের পর রেট হঠাৎ বেড়ে ১৫.০১ হয়, তাই ৪০০ এর কাছাকাছি গেলে বিল দ্রুত বাড়ে। মাসে ইউনিট কমিয়ে ৪০০ এর নিচে রাখলে সাশ্রয় বেশি হয়।", "Note that after 400 units the rate jumps to 15.01, so the bill rises fast once you pass 400. Keeping your monthly use below 400 units saves more."],
        ],
      },
      {
        h: ["আপনার বিলের সঙ্গে না মিললে", "If it does not match your bill"],
        p: [
          ["আপনার বিলে মিটার ভাড়া, বকেয়া, দেরির জরিমানা, রিবেট বা ভিন্ন ডিমান্ড চার্জ থাকতে পারে। বিতরণ প্রতিষ্ঠান (ডেসকো, ডিপিডিসি, পল্লী বিদ্যুৎ) নিজস্ব নিয়মও ব্যবহার করতে পারে। তাই এটি আনুমানিক হিসাব, আপনার হাতে পাওয়া বিলই চূড়ান্ত।", "Your bill may include meter rent, arrears, late fees, rebates or a different demand charge. Distribution companies (DESCO, DPDC, Palli Bidyut) may also apply their own rules. So this is an estimate, and the bill in your hand is final."],
        ],
      },
    ],
    faqs: [
      { q: ["১০০ ইউনিটে বিল কত আসে?", "What is the bill for 100 units?"], a: ["১ kW লোড ও ডিমান্ড চার্জ ৪২ ধরে মোট প্রায় ৬৮১.৪৫ টাকা। প্রথম ৭৫ ইউনিট ৫.২৬ ও পরের ২৫ ইউনিট ৮.৫০ হিসেবে বিদ্যুতের মূল্য ৬০৭ টাকা, এর সঙ্গে ডিমান্ড ও ৫% ভ্যাট যোগ হয়।", "With a 1 kW load and a demand charge of 42, about 681.45 taka. The first 75 units at 5.26 and the next 25 at 8.50 make an energy charge of 607 taka, then demand and 5% VAT are added."] },
      { q: ["লাইফলাইন রেট কখন প্রযোজ্য?", "When does the lifeline rate apply?"], a: ["মাসে মোট ৫০ ইউনিট বা কম ব্যবহার করলে সব ইউনিট ৪.৬৩ টাকা। ৫১ ইউনিট হলে আর লাইফলাইন রেট পাওয়া যায় না, তখন স্ল্যাব অনুযায়ী হিসাব হয়।", "If you use 50 units or fewer in the month, all units are 4.63 taka. At 51 units you no longer get the lifeline rate and the slab calculation applies."] },
      { q: ["ডিমান্ড চার্জ কত?", "How much is the demand charge?"], a: ["আমাদের টুলে প্রতি kW ৪২ টাকা ধরা আছে, তবে আপনার বিলে আলাদা থাকতে পারে, তাই ক্যালকুলেটরে সেই ঘর বদলানো যায়।", "Our tool uses 42 taka per kW, but your bill may differ, so that box can be changed in the calculator."] },
    ],
  },
  {
    slug: "zakat-hisab-niyom",
    title: ["যাকাত কীভাবে হিসাব করবেন (নিসাব, ২.৫% হার ও উদাহরণ)", "How to calculate zakat (nisab, the 2.5% rate and an example)"],
    desc: ["নিসাব কত, কোন সম্পদে যাকাত হিসাব হয়, ঋণ কীভাবে বাদ যায় এবং ২.৫% যাকাত বের করার ধাপগুলো উদাহরণসহ।", "What the nisab is, which wealth is counted, how debts are subtracted and the steps to find 2.5% zakat, with an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "zakat-calculator-bd", name: ["যাকাত ক্যালকুলেটর", "Zakat calculator"] },
    sections: [
      {
        h: ["নিসাব কী", "What is the nisab"],
        p: [
          ["নিসাব হলো যাকাত ফরজ হওয়ার ন্যূনতম সম্পদের পরিমাণ। এটি ৭.৫ ভরি সোনা অথবা ৫২.৫ ভরি রুপার দামের সমান ধরা হয়। ১ ভরি ১১.৬৬৪ গ্রাম ধরলে এটি প্রায় ৮৭.৪৮ গ্রাম সোনা বা ৬১২.৩৬ গ্রাম রুপা।", "The nisab is the minimum amount of wealth at which zakat becomes due. It is taken as the price of 7.5 vori of gold or 52.5 vori of silver. With 1 vori = 11.664 g, that is about 87.48 g of gold or 612.36 g of silver."],
          ["রুপা না সোনা দিয়ে নিসাব ধরবেন, তা নিয়ে আলিমদের মত আছে। রুপার নিসাবের দাম কম, তাই বেশি মানুষের ওপর যাকাত আসে। আপনার স্থানীয় আলিমের পরামর্শ নিন।", "Scholars differ on whether to use silver or gold for the nisab. The silver nisab is lower in value, so more people owe zakat. Take the advice of your local scholar."],
        ],
      },
      {
        h: ["কোন সম্পদ ধরা হয়", "Which wealth is counted"],
        p: [
          ["সাধারণত নগদ টাকা, ব্যাংকে জমা, সোনা ও রুপার বাজার মূল্য, ব্যবসার পণ্য ও মজুত, এবং ফেরত পাওয়ার মতো পাওনা এই হিসাবে ধরা হয়। এরপর আপনার দেনা বাদ দিয়ে নিট সম্পদ পাওয়া যায়।", "Generally cash, bank savings, the market value of gold and silver, business goods and stock, and money owed to you that is likely to be repaid are counted. Then your debts are subtracted to get net wealth."],
          ["সম্পদ নিসাব পরিমাণ হয়ে এক চান্দ্র বছর আপনার কাছে থাকলে যাকাত দিতে হয়। কোন সম্পদ ও ঋণ ধরা যাবে তা নিয়ে বিস্তারিত নিয়ম আলিমের কাছ থেকে জেনে নিন।", "Zakat is due once your wealth has reached the nisab and you have held it for one lunar year. Ask a scholar for the detailed rules on which wealth and debts count."],
        ],
      },
      {
        h: ["উদাহরণ (দাম কাল্পনিক)", "Example (prices are made up)"],
        p: [
          ["ধরুন রুপার দাম প্রতি ভরি ২,০০০ টাকা। তাহলে নিসাব ৫২.৫ × ২,০০০ = ১,০৫,০০০ টাকা। কারও নগদ ও ব্যাংকে ১,০০,০০০ আর সোনার মূল্য ৫০,০০০ মিলে সম্পদ ১,৫০,০০০, ঋণ ২০,০০০। নিট সম্পদ ১,৩০,০০০ যা নিসাবের চেয়ে বেশি।", "Suppose silver is 2,000 taka per vori. Then the nisab is 52.5 × 2,000 = 1,05,000 taka. Someone has 1,00,000 in cash and bank plus 50,000 in gold, so wealth is 1,50,000, with debts of 20,000. Net wealth is 1,30,000, which is above the nisab."],
          ["যাকাত = ১,৩০,০০০ × ২.৫% = ৩,২৫০ টাকা। আসল দাম বাজুসের আজকের দাম দেখে বসাতে হবে, কারণ সোনা-রুপার দাম রোজ বদলায়।", "Zakat = 1,30,000 × 2.5% = 3,250 taka. For real use, put in today's BAJUS price, because gold and silver prices change every day."],
        ],
      },
      {
        h: ["মনে রাখুন", "Keep in mind"],
        p: [
          ["এটি একটি সাধারণ হিসাবের গাইড, ফতোয়া নয়। ব্যক্তিগত পরিস্থিতিতে যাকাতের শর্ত, ঋণ ও বিশেষ সম্পদ নিয়ে সন্দেহ থাকলে আলিম বা ইসলামী প্রতিষ্ঠানের সঙ্গে কথা বলুন।", "This is a general calculation guide, not a religious ruling. If you have doubts about zakat conditions, debts or special assets in your own situation, speak to a scholar or an Islamic institution."],
        ],
      },
    ],
    faqs: [
      { q: ["যাকাতের হার কত?", "What is the zakat rate?"], a: ["নিট সম্পদের ২.৫%, অর্থাৎ প্রতি ১০০ টাকায় আড়াই টাকা।", "2.5% of net wealth, which is 2.5 taka for every 100 taka."] },
      { q: ["নিসাবের কম সম্পদ থাকলে কি যাকাত দিতে হয়?", "Is zakat due if my wealth is below the nisab?"], a: ["সাধারণ নিয়মে না। নিট সম্পদ নিসাবের কম হলে যাকাত ফরজ হয় না। তবে দান-সদকা যেকোনো পরিমাণে করা যায়।", "Under the general rule, no. If net wealth is below the nisab, zakat is not due. Voluntary charity can still be given in any amount."] },
      { q: ["সোনার গয়নায় কি যাকাত লাগে?", "Is zakat due on gold jewellery?"], a: ["এ নিয়ে আলিমদের মত আছে এবং শর্ত আছে। আপনার গয়নার ক্ষেত্রে করণীয় আপনার স্থানীয় আলিমের কাছ থেকে জেনে নিন।", "Scholars differ on this and there are conditions. Ask your local scholar what applies to your jewellery."] },
    ],
  },
  {
    slug: "fdr-dps-ki-kivabe-hishab",
    title: ["এফডিআর ও ডিপিএস কী, কোনটি ভালো এবং সুদ কীভাবে হিসাব হয়", "What FDR and DPS are, which is better and how the interest is worked out"],
    desc: ["এফডিআর ও ডিপিএস এর পার্থক্য, চক্রবৃদ্ধি সুদের সূত্র, উৎসে কর এবং মেয়াদ শেষে কত টাকা পাবেন তার উদাহরণ।", "The difference between FDR and DPS, the compound interest formula, source tax and an example of what you get at maturity."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "fdr-dps-calculator-bd", name: ["FDR DPS ক্যালকুলেটর", "FDR DPS calculator"] },
    sections: [
      {
        h: ["এফডিআর ও ডিপিএস এর পার্থক্য", "The difference between FDR and DPS"],
        p: [
          ["এফডিআর (ফিক্সড ডিপোজিট) এ একবারে একটি অঙ্ক নির্দিষ্ট মেয়াদের জন্য ব্যাংকে রাখা হয় এবং মেয়াদ শেষে সুদসহ ফেরত পাওয়া যায়। যাদের হাতে এককালীন টাকা আছে, তাদের জন্য এটি উপযোগী।", "With an FDR (fixed deposit) you place one lump sum in the bank for a fixed term and get it back with interest at maturity. It suits people who have a lump sum."],
          ["ডিপিএস (ডিপোজিট পেনশন স্কিম) এ প্রতি মাসে নির্দিষ্ট কিস্তি জমা দিতে হয় এবং মেয়াদ শেষে মোট জমা ও সুদ একসঙ্গে পাওয়া যায়। যাদের মাসিক আয় থেকে অল্প অল্প করে সঞ্চয় করতে হয়, তাদের জন্য এটি উপযোগী।", "With a DPS (deposit pension scheme) you pay a fixed installment every month and get the total deposit and interest together at maturity. It suits people who save a little at a time from monthly income."],
        ],
      },
      {
        h: ["এফডিআর এর সুদ কীভাবে হিসাব হয়", "How FDR interest is worked out"],
        p: [
          ["চক্রবৃদ্ধি সুদের সূত্র: মেয়াদ শেষে প্রাপ্য = আসল × (১ + হার ÷ বছরে যতবার সুদ যোগ হয়)^(বছরে যতবার × বছর)। বেশিরভাগ ব্যাংকে ত্রৈমাসিক চক্রবৃদ্ধি ধরা হয়, মানে বছরে ৪ বার।", "The compound interest formula: maturity amount = principal × (1 + rate ÷ times per year)^(times per year × years). Most banks use quarterly compounding, which is 4 times a year."],
          ["উদাহরণ: ১,০০,০০০ টাকা ৮% সুদে ১২ মাস। ১,০০,০০০ × (১.০২)^৪ = ১,০৮,২৪৩.২২। সুদ ৮,২৪৩.২২ টাকা। ১০% উৎসে কর ৮২৪.৩২ কেটে হাতে পাবেন ১,০৭,৪১৮.৯০ টাকা।", "Example: 1,00,000 taka at 8% for 12 months. 1,00,000 × (1.02)^4 = 1,08,243.22. The interest is 8,243.22 taka. After 10% source tax of 824.32 you receive 1,07,418.90 taka."],
        ],
      },
      {
        h: ["ডিপিএস এর হিসাব", "How DPS is worked out"],
        p: [
          ["প্রতি মাসের শুরুতে কিস্তি জমা এবং মাসিক চক্রবৃদ্ধি ধরলে ৫,০০০ টাকার কিস্তিতে ১২ মাসে ৮% সুদে মোট জমা ৬০,০০০ টাকা, সুদ প্রায় ২,৬৬৪.৬৩ টাকা। ১০% কর ২৬৬.৪৬ বাদে হাতে পাবেন ৬২,৩৯৮.১৭ টাকা। ব্যাংকভেদে নিয়ম আলাদা, তাই এটি আনুমানিক।", "Taking each installment at the start of the month with monthly compounding, a 5,000 taka installment for 12 months at 8% gives total deposits of 60,000 taka and interest of about 2,664.63. After 10% tax of 266.46 you receive 62,398.17 taka. Banks differ, so this is an estimate."],
        ],
      },
      {
        h: ["সুদের ওপর কর", "Tax on the interest"],
        p: [
          ["ব্যাংক সুদ থেকে উৎসে কর কাটে, সাধারণত TIN থাকলে ১০% এবং TIN না থাকলে ১৫%। এফডিআর এর ব্যালেন্সভেদে আবগারি শুল্কও কাটা হয়, যা আমাদের ক্যালকুলেটরে ধরা হয়নি। তাই আপনার ব্যাংকের ঘোষিত মেয়াদ শেষের অঙ্কই চূড়ান্ত।", "Banks deduct tax at source from the interest, generally 10% with a TIN and 15% without. Excise duty is also deducted depending on the FDR balance, and it is not included in our calculator. So the maturity figure your bank states is final."],
        ],
      },
      {
        h: ["কোনটি ভালো", "Which is better"],
        p: [
          ["কোনটি ভালো তা আপনার অবস্থার ওপর নির্ভর করে। এককালীন টাকা থাকলে এফডিআর, মাসিক আয় থেকে জমাতে হলে ডিপিএস। সুদের হার, মেয়াদ, ব্যাংকের নিরাপত্তা ও মেয়াদের আগে ভাঙলে কী কাটে, এসব ব্যাংকে জেনে তুলনা করুন।", "Which is better depends on your situation. An FDR if you have a lump sum, a DPS if you save from monthly income. Compare the interest rate, the term, the bank's safety and what is deducted if you break it early by asking the bank."],
        ],
      },
    ],
    faqs: [
      { q: ["১ লাখ টাকার এফডিআর এ এক বছরে কত সুদ?", "How much interest on a 1 lakh taka FDR in a year?"], a: ["৮% সুদে ত্রৈমাসিক চক্রবৃদ্ধিতে প্রায় ৮,২৪৩ টাকা, কর কাটার আগে। সুদের হার ব্যাংকভেদে আলাদা, তাই আপনার ব্যাংকের হার ক্যালকুলেটরে দিয়ে দেখুন।", "About 8,243 taka at 8% with quarterly compounding, before tax. Rates differ by bank, so put your bank's rate in the calculator."] },
      { q: ["TIN না থাকলে কর বেশি কাটে?", "Is more tax deducted if I have no TIN?"], a: ["সাধারণত হ্যাঁ, TIN থাকলে ১০% এবং না থাকলে ১৫% উৎসে কর কাটে। আপনার ব্যাংকের হার জেনে নিন।", "Generally yes, 10% with a TIN and 15% without. Check your bank's rate."] },
      { q: ["চক্রবৃদ্ধি আর সরল সুদের পার্থক্য কী?", "What is the difference between compound and simple interest?"], a: ["সরল সুদে শুধু আসলের ওপর সুদ হয়। চক্রবৃদ্ধিতে আগের সুদও আসলের সঙ্গে যোগ হয়ে তার ওপর সুদ হয়, তাই মেয়াদ শেষে একটু বেশি পাওয়া যায়।", "Simple interest is earned only on the original amount. With compound interest the earlier interest is added to the principal and earns interest too, so you get a little more at maturity."] },
    ],
  },
  {
    slug: "passport-fee-2026",
    title: ["ই-পাসপোর্ট ফি কত (৪৮ ও ৬৪ পৃষ্ঠা, ৫ ও ১০ বছর, ডেলিভারিভেদে)", "How much is the e-passport fee (48 and 64 pages, 5 and 10 years, by delivery type)"],
    desc: ["৪৮ ও ৬৪ পৃষ্ঠার ই-পাসপোর্টের ৫ ও ১০ বছর মেয়াদের সাধারণ, জরুরি ও অতি জরুরি ডেলিভারির ফি এক জায়গায়।", "The fees for 48 and 64 page e-passports for 5 and 10 years, with regular, express and super express delivery, in one place."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "passport-fee-calculator-bd", name: ["পাসপোর্ট ফি ক্যালকুলেটর", "Passport fee calculator"] },
    sections: [
      {
        h: ["ফি তালিকা (১৫% ভ্যাটসহ)", "Fee list (15% VAT included)"],
        p: [
          ["৪৮ পৃষ্ঠা, ৫ বছর: সাধারণ ৪,০২৫ টাকা, জরুরি ৬,৩২৫ টাকা, অতি জরুরি ৮,৬২৫ টাকা। ৪৮ পৃষ্ঠা, ১০ বছর: সাধারণ ৫,৭৫০ টাকা, জরুরি ৮,০৫০ টাকা, অতি জরুরি ১০,৩৫০ টাকা।", "48 pages, 5 years: regular 4,025 taka, express 6,325 taka, super express 8,625 taka. 48 pages, 10 years: regular 5,750 taka, express 8,050 taka, super express 10,350 taka."],
          ["৬৪ পৃষ্ঠা, ৫ বছর: সাধারণ ৬,৩২৫ টাকা, জরুরি ৮,৬২৫ টাকা, অতি জরুরি ১২,০৭৫ টাকা। ৬৪ পৃষ্ঠা, ১০ বছর: সাধারণ ৮,০৫০ টাকা, জরুরি ১০,৩৫০ টাকা, অতি জরুরি ১৩,৮০০ টাকা।", "64 pages, 5 years: regular 6,325 taka, express 8,625 taka, super express 12,075 taka. 64 pages, 10 years: regular 8,050 taka, express 10,350 taka, super express 13,800 taka."],
          ["এই তালিকা ১২ জুলাই ২০২৬ তারিখে হালনাগাদ হওয়া সরকারি তালিকার উদ্ধৃতি দেওয়া প্রকাশিত তথ্য থেকে নেওয়া। ফি বদলাতে পারে।", "This list comes from published information quoting the official schedule updated on 12 July 2026. Fees can change."],
        ],
      },
      {
        h: ["কোনটি বেছে নেবেন", "Which one to choose"],
        p: [
          ["৪৮ পৃষ্ঠা সাধারণ ভ্রমণের জন্য যথেষ্ট, আর যারা ঘন ঘন বিদেশ যান তারা ৬৪ পৃষ্ঠা নিতে পারেন। ১০ বছর মেয়াদে ফি বেশি হলেও বছরপ্রতি খরচ কম পড়ে। সাধারণ ডেলিভারিতে সময় বেশি লাগে, জরুরি বা অতি জরুরি হলে ফি বেশি দিয়ে দ্রুত পাওয়া যায়।", "48 pages is enough for ordinary travel, and frequent travellers can take 64 pages. A 10 year passport costs more up front but less per year. Regular delivery takes longer, while express and super express cost more but arrive faster."],
        ],
      },
      {
        h: ["আবেদনের আগে যা দেখে নেবেন", "What to check before you apply"],
        p: [
          ["শিশু, নবায়ন, জরুরি পাসপোর্ট, বিদেশের দূতাবাস এবং বিশেষ ছাড়ের (যেমন এনওসি) ক্ষেত্রে ফি আলাদা হতে পারে, যা এই তালিকায় নেই। আবেদন ও ফি জমার আগে সবসময় অফিসিয়াল পোর্টাল epassport.gov.bd এ বর্তমান ফি মিলিয়ে নিন।", "Fees can differ for children, renewals, emergency passports, overseas missions and special concessions (such as an NOC), which are not in this list. Before you apply and pay, always check the current fee on the official portal epassport.gov.bd."],
        ],
      },
    ],
    faqs: [
      { q: ["৪৮ পৃষ্ঠার ৫ বছরের সাধারণ ই-পাসপোর্টের ফি কত?", "What is the fee for a 48 page, 5 year regular e-passport?"], a: ["এই তালিকা অনুযায়ী ৪,০২৫ টাকা, ১৫% ভ্যাটসহ। আবেদনের আগে epassport.gov.bd এ দেখে নিন।", "According to this list it is 4,025 taka including 15% VAT. Check epassport.gov.bd before you apply."] },
      { q: ["১০ বছরের ৬৪ পৃষ্ঠার পাসপোর্টের সবচেয়ে দ্রুত ডেলিভারির ফি কত?", "What is the fee for the fastest delivery of a 10 year, 64 page passport?"], a: ["অতি জরুরি ডেলিভারিতে ১৩,৮০০ টাকা, ১৫% ভ্যাটসহ।", "13,800 taka for super express delivery, including 15% VAT."] },
      { q: ["ফি কোথায় জমা দেব?", "Where do I pay the fee?"], a: ["আবেদনের ধাপে অফিসিয়াল ই-পাসপোর্ট পোর্টালের নির্দেশ অনুযায়ী ফি জমা দিতে হয়। কোনো দালাল বা অনানুষ্ঠানিক উৎসকে টাকা না দিয়ে পোর্টালের নির্দেশনা অনুসরণ করুন।", "You pay the fee according to the instructions of the official e-passport portal during the application. Follow the portal's instructions instead of paying any broker or unofficial source."] },
    ],
  },
  {
    slug: "vori-koto-gram",
    title: ["১ ভরি কত গ্রাম? ভরি, আনা, রতি ও গ্রামের হিসাব", "How many grams is 1 vori? Vori, ana, roti and gram conversion"],
    desc: ["১ ভরি = ১১.৬৬৪ গ্রাম। ভরি, আনা, রতি থেকে গ্রামে এবং গ্রাম থেকে ভরিতে রূপান্তরের নিয়ম ও তালিকা উদাহরণসহ।", "1 vori = 11.664 grams. The rules and a table for converting vori, ana and roti to grams and back, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "gold-weight-converter-bd", name: ["ভরি আনা রতি কনভার্টার", "Vori ana roti converter"] },
    sections: [
      {
        h: ["ভরি, আনা, রতি ও গ্রামের সম্পর্ক", "How vori, ana, roti and grams relate"],
        p: [
          ["বাংলাদেশে সোনা-রুপার ওজন ভরি, আনা ও রতিতে মাপা হয়। ১ ভরি = ১৬ আনা এবং ১ আনা = ৬ রতি, তাই ১ ভরিতে ৯৬ রতি। ১ ভরি = ১১.৬৬৪ গ্রাম।", "In Bangladesh gold and silver are weighed in vori, ana and roti. 1 vori = 16 ana and 1 ana = 6 roti, so 1 vori has 96 roti. 1 vori = 11.664 grams."],
          ["এ থেকে ১ আনা = ১১.৬৬৪ ÷ ১৬ = ০.৭২৯ গ্রাম এবং ১ রতি = ১১.৬৬৪ ÷ ৯৬ = ০.১২১৫ গ্রাম।", "From this, 1 ana = 11.664 ÷ 16 = 0.729 grams and 1 roti = 11.664 ÷ 96 = 0.1215 grams."],
        ],
      },
      {
        h: ["ভরি থেকে গ্রামের তালিকা", "Vori to gram table"],
        p: [
          ["আধা ভরি = ৫.৮৩২ গ্রাম; ১ ভরি = ১১.৬৬৪ গ্রাম; ২ ভরি = ২৩.৩২৮ গ্রাম; ৩ ভরি = ৩৪.৯৯২ গ্রাম; ৫ ভরি = ৫৮.৩২০ গ্রাম; ১০ ভরি = ১১৬.৬৪০ গ্রাম।", "Half a vori = 5.832 grams; 1 vori = 11.664 grams; 2 vori = 23.328 grams; 3 vori = 34.992 grams; 5 vori = 58.320 grams; 10 vori = 116.640 grams."],
        ],
      },
      {
        h: ["হিসাবের নিয়ম ও উদাহরণ", "The method and an example"],
        p: [
          ["ভরি-আনা-রতি থেকে গ্রাম: সব রতিতে বদলে ০.১২১৫ দিয়ে গুণ করুন। যেমন ২ ভরি ৮ আনা ৩ রতি = (২ × ৯৬) + (৮ × ৬) + ৩ = ২৪৩ রতি। ২৪৩ × ০.১২১৫ = ২৯.৫২৪৫ গ্রাম।", "Vori-ana-roti to grams: turn everything into roti and multiply by 0.1215. For example 2 vori 8 ana 3 roti = (2 × 96) + (8 × 6) + 3 = 243 roti. 243 × 0.1215 = 29.5245 grams."],
          ["গ্রাম থেকে ভরি: গ্রামকে ১১.৬৬৪ দিয়ে ভাগ করুন। যেমন ২৫ গ্রাম ÷ ১১.৬৬৪ = প্রায় ২.১৪৩ ভরি, যা প্রায় ২ ভরি ২ আনা ১.৭৬ রতি।", "Grams to vori: divide the grams by 11.664. For example 25 grams ÷ 11.664 is about 2.143 vori, which is about 2 vori 2 ana 1.76 roti."],
        ],
      },
      {
        h: ["দাম হিসাব করার সময় যা মনে রাখবেন", "Things to remember when working out price"],
        p: [
          ["সোনার দাম ক্যারেট অনুযায়ী আলাদা, আর গয়নার ক্ষেত্রে মজুরি ও ভ্যাট আলাদা যোগ হয়। প্রতি ভরির দাম বাজুসের আজকের দাম থেকে দেখে নিয়ে ওজনের সঙ্গে গুণ করুন। ওজনের রূপান্তরে ক্যারেট ধরা হয় না।", "The price of gold differs by carat, and for jewellery the making charge and VAT are added separately. Take the price per vori from today's BAJUS rate and multiply it by the weight. Carat is not part of the weight conversion."],
        ],
      },
    ],
    faqs: [
      { q: ["১ ভরি কত গ্রাম?", "How many grams is 1 vori?"], a: ["বাংলাদেশে ১ ভরি = ১১.৬৬৪ গ্রাম।", "In Bangladesh 1 vori = 11.664 grams."] },
      { q: ["১ ভরিতে কত আনা ও রতি?", "How many ana and roti are in 1 vori?"], a: ["১ ভরিতে ১৬ আনা এবং ৯৬ রতি। ১ আনায় ৬ রতি।", "1 vori has 16 ana and 96 roti. 1 ana has 6 roti."] },
      { q: ["১০ গ্রাম সোনা কত ভরি?", "How many vori is 10 grams of gold?"], a: ["১০ ÷ ১১.৬৬৪ = প্রায় ০.৮৫৭ ভরি, মানে প্রায় ১৩ আনা ৪.৩০ রতি।", "10 ÷ 11.664 is about 0.857 vori, which is about 13 ana 4.30 roti."] },
    ],
  },
  {
    slug: "cgpa-hisab-niyom",
    title: ["CGPA কীভাবে হিসাব করবেন? ক্রেডিট ধরে সহজ নিয়ম", "How to calculate CGPA: a simple credit-weighted method"],
    desc: ["সেমিস্টারের GPA ও ক্রেডিট থেকে CGPA বের করার নিয়ম, উদাহরণ ও ৪.০০ বা ৫.০০ স্কেলের পার্থক্য।", "How to work out CGPA from semester GPA and credits, with an example and the difference between 4.00 and 5.00 scales."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "cgpa-calculator", name: ["CGPA ক্যালকুলেটর", "CGPA calculator"] },
    sections: [
      {
        h: ["CGPA আসলে কী", "What CGPA is"],
        p: [
          ["CGPA মানে Cumulative GPA, অর্থাৎ সব সেমিস্টার মিলিয়ে গড় গ্রেড পয়েন্ট। এটি সেমিস্টারের GPA-র সাধারণ গড় নয়, বরং ক্রেডিট অনুযায়ী ভারযুক্ত গড়, তাই বেশি ক্রেডিটের সেমিস্টার ফলাফলে বেশি প্রভাব ফেলে।", "CGPA stands for Cumulative GPA, the average grade point across all semesters. It is not a plain average of semester GPAs but a credit-weighted average, so a semester with more credits counts for more."],
        ],
      },
      {
        h: ["হিসাবের নিয়ম", "The method"],
        p: [
          ["প্রতিটি সেমিস্টারের GPA-কে তার ক্রেডিট দিয়ে গুণ করুন, গুণফলগুলো যোগ করুন, তারপর মোট ক্রেডিট দিয়ে ভাগ করুন। সূত্র: CGPA = Σ(GPA × ক্রেডিট) ÷ Σ ক্রেডিট।", "Multiply each semester GPA by its credits, add the products, then divide by the total credits. Formula: CGPA = Σ(GPA × credits) ÷ Σ credits."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["ধরুন তিন সেমিস্টারে GPA ৩.৫০ (১৫ ক্রেডিট), ৩.০০ (১২ ক্রেডিট) ও ৪.০০ (৩ ক্রেডিট)। গুণফল: ৩.৫০ × ১৫ = ৫২.৫, ৩.০০ × ১২ = ৩৬, ৪.০০ × ৩ = ১২, মোট ১০০.৫। মোট ক্রেডিট ১৫ + ১২ + ৩ = ৩০। CGPA = ১০০.৫ ÷ ৩০ = ৩.৩৫।", "Say three semesters have GPA 3.50 (15 credits), 3.00 (12 credits) and 4.00 (3 credits). Products: 3.50 × 15 = 52.5, 3.00 × 12 = 36, 4.00 × 3 = 12, total 100.5. Total credits are 15 + 12 + 3 = 30. CGPA = 100.5 ÷ 30 = 3.35."],
          ["সাধারণ গড় করলে (৩.৫ + ৩ + ৪) ÷ ৩ = ৩.৫০ আসত, যা ভুল। ক্রেডিট ধরলে ফল আলাদা হয়।", "A plain average, (3.5 + 3 + 4) ÷ 3 = 3.50, would be wrong. Weighting by credits gives a different answer."],
        ],
      },
      {
        h: ["৪.০০ নাকি ৫.০০ স্কেল", "4.00 or 5.00 scale"],
        p: [
          ["বেশিরভাগ বিশ্ববিদ্যালয় ৪.০০ স্কেল ব্যবহার করে, তবে কিছু প্রতিষ্ঠান ৫.০০ স্কেল নেয়। আপনার প্রতিষ্ঠানের গ্রেডিং নিয়ম ও ক্রেডিট নিয়ম দেখে নিন, কারণ রিটেক বা বাদ পড়া কোর্সের হিসাব প্রতিষ্ঠানভেদে আলাদা হতে পারে।", "Most universities use a 4.00 scale, though some use 5.00. Check your institution's grading and credit rules, because retakes and dropped courses may be counted differently from one institution to another."],
        ],
      },
    ],
    faqs: [
      { q: ["CGPA কি সেমিস্টার GPA-র গড়?", "Is CGPA the average of semester GPAs?"], a: ["না, এটি ক্রেডিট দিয়ে ভারযুক্ত গড়। Σ(GPA × ক্রেডিট) ÷ Σ ক্রেডিট।", "No, it is a credit-weighted average: Σ(GPA × credits) ÷ Σ credits."] },
      { q: ["৩.৫ আর ৩ GPA, দুটোই ১৫ ক্রেডিট হলে CGPA কত?", "What is the CGPA for GPA 3.5 and 3.0 with 15 credits each?"], a: ["ক্রেডিট সমান হলে সাধারণ গড়ই হয়: (৩.৫ + ৩.০) ÷ ২ = ৩.২৫।", "With equal credits it equals the plain average: (3.5 + 3.0) ÷ 2 = 3.25."] },
      { q: ["রিটেক করলে CGPA কীভাবে হিসাব হয়?", "How is CGPA counted after a retake?"], a: ["এটি প্রতিষ্ঠানের নিয়মের ওপর নির্ভর করে, তাই আপনার বিশ্ববিদ্যালয়ের নিয়ম দেখে নিন।", "It depends on your institution's rules, so check your university's policy."] },
    ],
  },
  {
    slug: "emi-kisti-hisab-niyom",
    title: ["EMI বা মাসিক কিস্তি কীভাবে হিসাব করবেন? ঋণের সূত্র ও উদাহরণ", "How to calculate EMI: loan formula with examples"],
    desc: ["ব্যাংক ঋণের মাসিক কিস্তি (EMI), মোট সুদ ও মোট পরিশোধ বের করার সূত্র, উদাহরণসহ।", "The formula for a bank loan's monthly instalment (EMI), total interest and total repayment, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "emi-calculator-bd", name: ["EMI ক্যালকুলেটর", "EMI calculator"] },
    sections: [
      {
        h: ["EMI কী", "What EMI is"],
        p: [
          ["EMI (Equated Monthly Instalment) হলো ঋণ শোধের জন্য প্রতি মাসে একই অঙ্কের কিস্তি। এতে আসল ও সুদ দুটোই থাকে। শুরুতে কিস্তির বড় অংশ সুদ, পরে আসলের অংশ বাড়ে।", "EMI (Equated Monthly Instalment) is the fixed amount you pay each month to repay a loan. It contains both principal and interest. Early on most of it is interest, and the principal share grows later."],
        ],
      },
      {
        h: ["সূত্র", "The formula"],
        p: [
          ["EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)। এখানে P হলো ঋণের পরিমাণ, r হলো মাসিক সুদের হার (বার্ষিক হার ÷ ১২ ÷ ১০০) এবং n হলো মাসের সংখ্যা।", "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). Here P is the loan amount, r is the monthly rate (annual rate ÷ 12 ÷ 100) and n is the number of months."],
        ],
      },
      {
        h: ["উদাহরণ ১: ৫ লাখ টাকা, ১০%, ১২ মাস", "Example 1: 5 lakh taka, 10%, 12 months"],
        p: [
          ["P = ৫,০০,০০০, বার্ষিক ১০%, n = ১২। এই সূত্রে মাসিক কিস্তি প্রায় ৪৩,৯৫৮ টাকা। মোট পরিশোধ প্রায় ৫,২৭,৪৯৫ টাকা, অর্থাৎ মোট সুদ প্রায় ২৭,৪৯৫ টাকা।", "P = 5,00,000, 10% a year, n = 12. By this formula the monthly instalment is about 43,958 taka. Total repayment is about 5,27,495 taka, so the total interest is about 27,495 taka."],
        ],
      },
      {
        h: ["উদাহরণ ২: ১০ লাখ টাকা, ৯.৫%, ৫ বছর", "Example 2: 10 lakh taka, 9.5%, 5 years"],
        p: [
          ["P = ১০,০০,০০০, বার্ষিক ৯.৫%, n = ৬০ মাস। মাসিক কিস্তি প্রায় ২১,০০২ টাকা। মোট পরিশোধ প্রায় ১২,৬০,১১২ টাকা এবং মোট সুদ প্রায় ২,৬০,১১২ টাকা।", "P = 10,00,000, 9.5% a year, n = 60 months. The monthly instalment is about 21,002 taka. Total repayment is about 12,60,112 taka and total interest about 2,60,112 taka."],
        ],
      },
      {
        h: ["ব্যাংকের হিসাবের সঙ্গে মেলানো", "Matching with the bank's figure"],
        p: [
          ["ব্যাংক প্রসেসিং ফি, বীমা, আবগারি শুল্ক বা ভিন্ন সুদের পদ্ধতি ধরলে কিস্তি এই হিসাব থেকে কিছুটা আলাদা হতে পারে। চূড়ান্ত অঙ্কের জন্য ব্যাংকের অফার লেটার দেখুন।", "If the bank adds a processing fee, insurance, excise duty or uses a different interest method, the instalment can differ slightly from this calculation. For the final figure, see the bank's offer letter."],
        ],
      },
    ],
    faqs: [
      { q: ["ঋণের মেয়াদ বাড়ালে কী হয়?", "What happens if I lengthen the loan term?"], a: ["মাসিক কিস্তি কমে, কিন্তু মোট সুদ বেড়ে যায়।", "The monthly instalment falls, but the total interest rises."] },
      { q: ["সুদের হার ০% হলে EMI কত?", "What is the EMI at 0% interest?"], a: ["তখন EMI = P ÷ n, অর্থাৎ ঋণ সমান ভাগে ভাগ হয়।", "Then EMI = P ÷ n, i.e. the loan is simply split equally."] },
      { q: ["এই হিসাব কি ব্যাংকের হিসাবের সঙ্গে হুবহু মিলবে?", "Will this match the bank exactly?"], a: ["সাধারণ হ্রাসমান স্থিতিতে প্রায় মিলবে, তবে ফি ও চার্জ ধরলে ব্যাংকের অঙ্ক আলাদা হতে পারে।", "On a standard reducing balance it should be close, but fees and charges can make the bank's figure differ."] },
    ],
  },
  {
    slug: "bmi-hisab-niyom",
    title: ["BMI কীভাবে হিসাব করবেন? ওজন ও উচ্চতা থেকে সহজ নিয়ম", "How to calculate BMI from weight and height"],
    desc: ["কেজি ও সেমি থেকে BMI বের করার সূত্র, কম ওজন, স্বাভাবিক ও বেশি ওজনের সীমা এবং উদাহরণ।", "The formula for BMI from kg and cm, the underweight, normal and overweight ranges, and an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "bmi-calculator", name: ["BMI ক্যালকুলেটর", "BMI calculator"] },
    sections: [
      {
        h: ["সূত্র", "The formula"],
        p: [
          ["BMI = ওজন (কেজি) ÷ উচ্চতা (মিটার)²। সেমিকে ১০০ দিয়ে ভাগ করে মিটার বানিয়ে নিন।", "BMI = weight (kg) ÷ height (metres)². Divide centimetres by 100 to get metres."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["ওজন ৭০ কেজি, উচ্চতা ১৭০ সেমি (১.৭ মিটার)। ১.৭ × ১.৭ = ২.৮৯। BMI = ৭০ ÷ ২.৮৯ = প্রায় ২৪.২২, যা স্বাভাবিক সীমার মধ্যে।", "Weight 70 kg, height 170 cm (1.7 m). 1.7 × 1.7 = 2.89. BMI = 70 ÷ 2.89 = about 24.22, which is in the normal range."],
          ["১৭০ সেমি উচ্চতায় স্বাভাবিক ওজনের সীমা: ১৮.৫ × ২.৮৯ = প্রায় ৫৩.৫ কেজি থেকে ২৪.৯ × ২.৮৯ = প্রায় ৭২.০ কেজি।", "At 170 cm the normal weight range is 18.5 × 2.89 = about 53.5 kg to 24.9 × 2.89 = about 72.0 kg."],
        ],
      },
      {
        h: ["সাধারণ বিভাগ", "Common categories"],
        p: [
          ["সাধারণভাবে ১৮.৫ এর নিচে কম ওজন, ১৮.৫ থেকে ২৪.৯ স্বাভাবিক, ২৫ থেকে ২৯.৯ বেশি ওজন এবং ৩০ বা তার বেশি স্থূলতা ধরা হয়। এশীয়দের জন্য কিছু সংস্থা ভিন্ন সীমা ব্যবহার করে।", "Commonly, below 18.5 is underweight, 18.5 to 24.9 normal, 25 to 29.9 overweight, and 30 or above obese. Some bodies use different cut-offs for Asian populations."],
        ],
      },
      {
        h: ["BMI-র সীমাবদ্ধতা", "Limits of BMI"],
        p: [
          ["BMI পেশি ও চর্বির পার্থক্য ধরে না, তাই খেলোয়াড় বা বয়স্কদের ক্ষেত্রে বিভ্রান্তিকর হতে পারে। এটি শুধু একটি মোটামুটি সূচক, রোগ নির্ণয় নয়। স্বাস্থ্য নিয়ে চিন্তা থাকলে চিকিৎসকের পরামর্শ নিন।", "BMI does not separate muscle from fat, so it can mislead for athletes or older people. It is only a rough indicator, not a diagnosis. If you are worried about your health, see a doctor."],
        ],
      },
    ],
    faqs: [
      { q: ["৬৫ কেজি ও ১৬৫ সেমির BMI কত?", "What is the BMI for 65 kg and 165 cm?"], a: ["১৬৫ সেমি = ১.৬৫ মিটার, ১.৬৫² = ২.৭২২৫। ৬৫ ÷ ২.৭২২৫ = প্রায় ২৩.৮৮, স্বাভাবিক।", "165 cm = 1.65 m, 1.65² = 2.7225. 65 ÷ 2.7225 = about 23.88, normal."] },
      { q: ["স্বাভাবিক BMI কত?", "What is a normal BMI?"], a: ["সাধারণভাবে ১৮.৫ থেকে ২৪.৯।", "Generally 18.5 to 24.9."] },
      { q: ["BMI কি সবার জন্য নির্ভরযোগ্য?", "Is BMI reliable for everyone?"], a: ["না, পেশিবহুল ব্যক্তি, বয়স্ক বা শিশুদের ক্ষেত্রে এটি যথেষ্ট নয়।", "No, it is not sufficient for muscular people, older adults or children."] },
    ],
  },
  {
    slug: "percentage-hisab-niyom",
    title: ["শতকরা (পার্সেন্টেজ) কীভাবে হিসাব করবেন? সহজ সূত্র ও উদাহরণ", "How to calculate a percentage: simple formulas and examples"],
    desc: ["X এর Y% কত, একটি সংখ্যা আরেকটির কত শতাংশ এবং শতকরা বৃদ্ধি-হ্রাস বের করার সূত্র, পরীক্ষার নম্বর ও দামের উদাহরণসহ।", "Formulas for Y% of X, one number as a percentage of another, and percentage increase or decrease, with exam marks and price examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "percentage-calculator", name: ["শতকরা হিসাব ক্যালকুলেটর", "Percentage calculator"] },
    sections: [
      {
        h: ["X এর Y% কত", "Finding Y% of X"],
        p: [
          ["সূত্র: X × Y ÷ ১০০। যেমন ২০০ টাকার ১৫% = ২০০ × ১৫ ÷ ১০০ = ৩০ টাকা।", "Formula: X × Y ÷ 100. For example, 15% of 200 taka = 200 × 15 ÷ 100 = 30 taka."],
        ],
      },
      {
        h: ["একটি সংখ্যা আরেকটির কত শতাংশ", "One number as a percentage of another"],
        p: [
          ["সূত্র: অংশ ÷ মোট × ১০০। ৫০ নম্বরের মধ্যে ৪০ পেলে ৪০ ÷ ৫০ × ১০০ = ৮০%। ৫০০ নম্বরের মধ্যে ৪৩২ পেলে ৪৩২ ÷ ৫০০ × ১০০ = ৮৬.৪%।", "Formula: part ÷ total × 100. Scoring 40 out of 50 gives 40 ÷ 50 × 100 = 80%. Scoring 432 out of 500 gives 432 ÷ 500 × 100 = 86.4%."],
        ],
      },
      {
        h: ["শতকরা বৃদ্ধি ও হ্রাস", "Percentage increase and decrease"],
        p: [
          ["সূত্র: (নতুন মান − পুরোনো মান) ÷ পুরোনো মান × ১০০। দাম ৫০০ থেকে ৬০০ হলে (৬০০ − ৫০০) ÷ ৫০০ × ১০০ = ২০% বৃদ্ধি। আবার ৬০০ থেকে ৫০০ হলে (৫০০ − ৬০০) ÷ ৬০০ × ১০০ = প্রায় −১৬.৬৭%, অর্থাৎ প্রায় ১৬.৬৭% হ্রাস।", "Formula: (new value − old value) ÷ old value × 100. If a price goes from 500 to 600, that is (600 − 500) ÷ 500 × 100 = a 20% increase. From 600 back to 500 it is (500 − 600) ÷ 600 × 100 = about −16.67%, a decrease of about 16.67%."],
          ["লক্ষ করুন, বৃদ্ধি ও হ্রাসের শতাংশ এক হয় না, কারণ প্রতিবার ভাগ হয় পুরোনো মান দিয়ে।", "Notice that the increase and decrease percentages are not the same, because each time you divide by the old value."],
        ],
      },
      {
        h: ["শতকরা যোগ ও বিয়োগ", "Adding and subtracting a percentage"],
        p: [
          ["২,০০০ টাকার সঙ্গে ১৫% যোগ করতে: ২,০০০ × (১ + ০.১৫) = ২,৩০০ টাকা। ১,৫০০ টাকা থেকে ১০% ছাড় দিতে: ১,৫০০ × (১ − ০.১০) = ১,৩৫০ টাকা।", "To add 15% to 2,000 taka: 2,000 × (1 + 0.15) = 2,300 taka. To take 10% off 1,500 taka: 1,500 × (1 − 0.10) = 1,350 taka."],
        ],
      },
    ],
    faqs: [
      { q: ["শতকরা হিসাবের মূল সূত্র কী?", "What is the basic percentage formula?"], a: ["অংশ ÷ মোট × ১০০।", "Part ÷ total × 100."] },
      { q: ["৩০০ এর ২৫% কত?", "What is 25% of 300?"], a: ["৩০০ × ২৫ ÷ ১০০ = ৭৫।", "300 × 25 ÷ 100 = 75."] },
      { q: ["২০% ছাড়ের পর দাম ৮০০ টাকা হলে আসল দাম কত?", "If the price after a 20% discount is 800 taka, what was the original price?"], a: ["ছাড়ের পর দাম আসল দামের ৮০%। তাই আসল দাম = ৮০০ ÷ ০.৮ = ১,০০০ টাকা।", "After the discount the price is 80% of the original, so the original is 800 ÷ 0.8 = 1,000 taka."] },
    ],
  },
  {
    slug: "boyosh-hisab-niyom",
    title: ["বয়স কীভাবে হিসাব করবেন? জন্মতারিখ থেকে বছর, মাস ও দিন", "How to calculate age in years, months and days from a date of birth"],
    desc: ["জন্মতারিখ থেকে আজ পর্যন্ত বছর, মাস ও দিনে বয়স বের করার ধাপ, উদাহরণ এবং কোথায় কাজে লাগে।", "Steps to work out age in years, months and days from a date of birth, with an example and where it helps."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "age-calculator", name: ["বয়স ক্যালকুলেটর", "Age calculator"] },
    sections: [
      {
        h: ["হাতে হিসাবের ধাপ", "Steps to work it out by hand"],
        p: [
          ["প্রথমে পুরো বছর গুনুন, যতক্ষণ না এ বছরের জন্মদিন পার হয়। এরপর শেষ জন্মদিন থেকে পূর্ণ মাস গুনুন। সবশেষে ওই মাসের তারিখ থেকে আজকের তারিখ পর্যন্ত দিন গুনুন।", "First count whole years until this year's birthday has passed. Then count whole months since the last birthday. Finally count the days from that monthly date to today."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["জন্ম ১৫ মার্চ ২০০৮, হিসাবের দিন ৩ নভেম্বর ২০২৬। ১৫ মার্চ ২০০৮ থেকে ১৫ মার্চ ২০২৬ পর্যন্ত ১৮ বছর। ১৫ মার্চ ২০২৬ থেকে ১৫ অক্টোবর ২০২৬ পর্যন্ত ৭ মাস। ১৫ অক্টোবর থেকে ৩ নভেম্বর পর্যন্ত ১৯ দিন (অক্টোবরে ৩১ দিন, তাই ১৫ থেকে ৩১ অক্টোবর ১৬ দিন, তারপর ৩ দিন)। বয়স ১৮ বছর ৭ মাস ১৯ দিন।", "Born 15 March 2008, calculated on 3 November 2026. From 15 March 2008 to 15 March 2026 is 18 years. From 15 March 2026 to 15 October 2026 is 7 months. From 15 October to 3 November is 19 days (October has 31 days, so 16 days from 15 to 31 October, then 3 more). The age is 18 years, 7 months and 19 days."],
        ],
      },
      {
        h: ["কোথায় কাজে লাগে", "Where it helps"],
        p: [
          ["ফর্ম পূরণ, স্কুল বা কলেজে ভর্তি এবং চাকরির আবেদনে বয়স হিসাব করতে হয়। কোনো আবেদনে বয়সের সীমা থাকলে বিজ্ঞপ্তিতে লেখা নির্দিষ্ট তারিখ অনুযায়ী বয়স গুনুন এবং বিজ্ঞপ্তির নিয়ম মিলিয়ে নিন।", "You need an age for forms, school or college admission and job applications. If an application has an age limit, count the age as of the date stated in the notice and check the notice for its rules."],
        ],
      },
    ],
    faqs: [
      { q: ["জন্মতারিখ থেকে আজ পর্যন্ত বয়স কীভাবে বের করব?", "How do I find my age from my date of birth?"], a: ["জন্মতারিখ ও আজকের তারিখ দিলে ক্যালকুলেটর বছর, মাস ও দিন দেখায়। হাতে করলে উপরের ধাপগুলো মানুন।", "Enter your date of birth and today's date and the calculator shows years, months and days. By hand, follow the steps above."] },
      { q: ["অন্য একটি তারিখ অনুযায়ী বয়স জানা যাবে?", "Can I find the age as of another date?"], a: ["হ্যাঁ, হিসাবের তারিখ বদলে দিলেই হবে।", "Yes, just change the calculation date."] },
    ],
  },
  {
    slug: "taka-kothay-likhar-niyom",
    title: ["টাকার অঙ্ক কথায় কীভাবে লিখবেন? লাখ, কোটি ও চেকে লেখার নিয়ম", "How to write a taka amount in words: lakh, crore and writing cheques"],
    desc: ["বাংলাদেশের লাখ-কোটি পদ্ধতিতে সংখ্যা ভাগ করে অঙ্ক কথায় লেখার সহজ নিয়ম, উদাহরণসহ।", "A simple method for splitting a number in the Bangladeshi lakh-crore system and writing the amount in words, with an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "number-to-words-bd", name: ["টাকার অঙ্ক কথায়", "Number to words"] },
    sections: [
      {
        h: ["লাখ-কোটির ভাগ", "The lakh-crore grouping"],
        p: [
          ["বাংলাদেশে সংখ্যার কমা ডান দিক থেকে প্রথমে তিন অঙ্ক, তারপর প্রতি দুই অঙ্ক পরপর বসে। যেমন ১২,৩৪,৫৬৭। ডান থেকে ভাগগুলো হলো: ৫৬৭ (শতক), ৩৪ (হাজার), ১২ (লাখ)।", "In Bangladesh, commas go after the first three digits from the right and then after every two digits, for example 12,34,567. From the right the groups are 567 (hundreds), 34 (thousands) and 12 (lakh)."],
          ["১০০ হাজারে ১ লাখ এবং ১০০ লাখে ১ কোটি।", "100 thousand makes 1 lakh, and 100 lakh makes 1 crore."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["১২,৩৪,৫৬৭ টাকা = বারো লাখ চৌত্রিশ হাজার পাঁচশ সাতষট্টি টাকা। প্রতিটি ভাগের নাম বলে এরপর ভাগের সংখ্যাকে শব্দ করুন।", "12,34,567 taka = twelve lakh thirty-four thousand five hundred sixty-seven taka. Say each group's number in words, then add the group's name."],
        ],
      },
      {
        h: ["চেক বা ভাউচারে লেখার সময়", "When writing a cheque or voucher"],
        p: [
          ["সংখ্যা ও কথায় লেখা অঙ্ক একই হতে হবে। কথায় লেখার পর সাধারণত শেষে টাকা মাত্র লেখা হয়। ফাঁকা জায়গা রাখলে কেউ অঙ্ক বদলাতে পারে, তাই লাইন টেনে ফাঁকা অংশ ভরাট করে দিন। ব্যাংকের নিজস্ব নিয়ম থাকলে সেটি মানুন।", "The amount in figures and in words must match. After the words it is usual to add \"only\" (taka matro in Bangla). Blank space lets someone change the amount, so draw a line through any empty part. Follow your bank's own rules if it has any."],
        ],
      },
    ],
    faqs: [
      { q: ["১ কোটি মানে কত লাখ?", "How many lakh is 1 crore?"], a: ["১০০ লাখ।", "100 lakh."] },
      { q: ["১,০০,০০০ কে কী বলে?", "What is 1,00,000 called?"], a: ["এক লাখ।", "One lakh."] },
      { q: ["পয়সাসহ টাকা কথায় কীভাবে লিখব?", "How do I write an amount with paisa in words?"], a: ["আগে টাকা কথায় লিখুন, তারপর পয়সা কথায় লিখুন। যেমন ১২৩.৫০ = একশ তেইশ টাকা পঞ্চাশ পয়সা।", "Write the taka in words first and then the paisa. For example 123.50 = one hundred twenty-three taka fifty paisa."] },
    ],
  },
  {
    slug: "bargofut-theke-shotangsho",
    title: ["বর্গফুট থেকে শতাংশ কীভাবে হিসাব করবেন? জমি মাপার সহজ নিয়ম", "How to convert square feet to shotangsho: a simple land measurement guide"],
    desc: ["১,৪০০ বর্গফুট কত শতাংশ, ১ শতাংশে কত বর্গফুট এবং একরের হিসাব, উদাহরণসহ।", "How many shotangsho is 1,400 square feet, how many square feet in 1 shotangsho, and the acre conversion, with examples."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "land-calculator-bd", name: ["জমি পরিমাপ ক্যালকুলেটর", "Land calculator"] },
    sections: [
      {
        h: ["মূল মাপ", "The basic measures"],
        p: [
          ["১ শতাংশ = ৪৩৫.৬ বর্গফুট। ১ একর = ১০০ শতাংশ = ৪৩,৫৬০ বর্গফুট।", "1 shotangsho = 435.6 square feet. 1 acre = 100 shotangsho = 43,560 square feet."],
        ],
      },
      {
        h: ["বর্গফুট থেকে শতাংশ", "Square feet to shotangsho"],
        p: [
          ["সূত্র: বর্গফুট ÷ ৪৩৫.৬। যেমন ১,৪০০ বর্গফুট ÷ ৪৩৫.৬ = প্রায় ৩.২১ শতাংশ। ১,০০০ বর্গফুট = প্রায় ২.৩০ শতাংশ এবং ২,০০০ বর্গফুট = প্রায় ৪.৫৯ শতাংশ।", "Formula: square feet ÷ 435.6. For example 1,400 sq ft ÷ 435.6 = about 3.21 shotangsho. 1,000 sq ft is about 2.30 and 2,000 sq ft is about 4.59 shotangsho."],
        ],
      },
      {
        h: ["শতাংশ থেকে বর্গফুট", "Shotangsho to square feet"],
        p: [
          ["সূত্র: শতাংশ × ৪৩৫.৬। যেমন ৩ শতাংশ × ৪৩৫.৬ = ১,৩০৬.৮ বর্গফুট। ১০ শতাংশ = ৪,৩৫৬ বর্গফুট।", "Formula: shotangsho × 435.6. For example 3 shotangsho × 435.6 = 1,306.8 sq ft. 10 shotangsho = 4,356 sq ft."],
        ],
      },
      {
        h: ["কাঠা ও বিঘা নিয়ে সতর্কতা", "A caution about katha and bigha"],
        p: [
          ["কাঠা ও বিঘার মাপ এলাকাভেদে আলাদা হয়। তাই দলিলে বা এলাকায় কাঠা কত বর্গফুট ধরা হয় তা নিশ্চিত হয়ে হিসাব করুন। আমাদের ক্যালকুলেটরে কাঠার মাপ নিজে বদলে নেওয়া যায়। জমির দলিলের হিসাবের জন্য সরকারি ভূমি অফিস বা সার্ভেয়ারের মাপই চূড়ান্ত।", "The size of a katha or bigha differs by area, so confirm how many square feet a katha means in your deed or locality. Our calculator lets you change the katha size. For legal land records, the measurement from the government land office or a surveyor is final."],
        ],
      },
    ],
    faqs: [
      { q: ["১,৪০০ বর্গফুট কত শতাংশ?", "How many shotangsho is 1,400 square feet?"], a: ["১,৪০০ ÷ ৪৩৫.৬ = প্রায় ৩.২১ শতাংশ।", "1,400 ÷ 435.6 = about 3.21 shotangsho."] },
      { q: ["১ শতাংশে কত বর্গফুট?", "How many square feet in 1 shotangsho?"], a: ["৪৩৫.৬ বর্গফুট।", "435.6 square feet."] },
      { q: ["১ একরে কত শতাংশ?", "How many shotangsho in 1 acre?"], a: ["১০০ শতাংশ।", "100 shotangsho."] },
    ],
  },
  {
    slug: "usa-somoy-bangladesh-somoy",
    title: ["আমেরিকার সময় বাংলাদেশে কত? সময়ের পার্থক্য ও হিসাব", "US time in Bangladesh time: the time difference explained"],
    desc: ["নিউ ইয়র্ক, লস অ্যাঞ্জেলেস ও অন্য মার্কিন সময়কে বাংলাদেশ সময়ে বদলানোর নিয়ম, শীত ও গ্রীষ্মের পার্থক্যসহ।", "How to convert New York, Los Angeles and other US times to Bangladesh time, including the winter and summer difference."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "time-zone-converter", name: ["টাইম জোন কনভার্টার", "Time zone converter"] },
    sections: [
      {
        h: ["বাংলাদেশের সময়", "Bangladesh time"],
        p: [
          ["বাংলাদেশ UTC+৬ সময়ে চলে এবং বর্তমানে ডে-লাইট সেভিং ব্যবহার করে না, তাই সারা বছর পার্থক্য একই থাকে।", "Bangladesh follows UTC+6 and currently does not use daylight saving time, so its offset stays the same all year."],
        ],
      },
      {
        h: ["যুক্তরাষ্ট্রের সময়ের পার্থক্য", "The difference with US time"],
        p: [
          ["যুক্তরাষ্ট্রের অনেক অঞ্চলে সময় বছরে দুবার বদলায়। মার্চের দ্বিতীয় রবিবার থেকে নভেম্বরের প্রথম রবিবার পর্যন্ত গ্রীষ্মকালীন সময় চলে। এ বছর তা ১ নভেম্বর ২০২৬ এ শেষ হয়েছে।", "In much of the US the clocks change twice a year. Daylight saving time runs from the second Sunday of March to the first Sunday of November. This year it ended on 1 November 2026."],
          ["পূর্ব সময় (নিউ ইয়র্ক): শীতে (EST) বাংলাদেশ ১১ ঘণ্টা এগিয়ে, গ্রীষ্মে (EDT) ১০ ঘণ্টা। পশ্চিম সময় (লস অ্যাঞ্জেলেস): শীতে (PST) ১৪ ঘণ্টা, গ্রীষ্মে (PDT) ১৩ ঘণ্টা।", "Eastern time (New York): Bangladesh is 11 hours ahead in winter (EST) and 10 hours ahead in summer (EDT). Pacific time (Los Angeles): 14 hours ahead in winter (PST) and 13 hours in summer (PDT)."],
        ],
      },
      {
        h: ["উদাহরণ", "Examples"],
        p: [
          ["নভেম্বরে নিউ ইয়র্কে সকাল ৯টা মানে বাংলাদেশে একই দিন রাত ৮টা। জুলাইয়ে নিউ ইয়র্কে সকাল ৯টা মানে বাংলাদেশে সন্ধ্যা ৭টা। নভেম্বরে লস অ্যাঞ্জেলেসে সকাল ৯টা মানে বাংলাদেশে রাত ১১টা।", "9:00 AM in New York in November is 8:00 PM the same day in Bangladesh. 9:00 AM in New York in July is 7:00 PM in Bangladesh. 9:00 AM in Los Angeles in November is 11:00 PM in Bangladesh."],
          ["পার্থক্য যোগ করার পর সময় ২৪ ঘণ্টার বেশি হলে পরের দিনে চলে যায়, তাই তারিখও মিলিয়ে নিন।", "If adding the difference passes midnight, the date moves to the next day, so check the date too."],
        ],
      },
    ],
    faqs: [
      { q: ["এখন আমেরিকার পূর্ব সময় ও বাংলাদেশ সময়ের পার্থক্য কত?", "What is the gap between US Eastern and Bangladesh time now?"], a: ["নভেম্বর ২০২৬ থেকে (শীতকালীন সময়) ১১ ঘণ্টা। গ্রীষ্মকালীন সময় শুরু হলে ১০ ঘণ্টা হবে।", "From November 2026 (winter time) it is 11 hours. It will be 10 hours once daylight saving starts again."] },
      { q: ["মিটিংয়ের সময় ঠিক করতে কী করব?", "How do I set a meeting time?"], a: ["টাইম জোন কনভার্টারে দুই দেশের শহর বেছে সময় দিন। ব্রাউজার ডে-লাইট সেভিং নিজেই হিসাব করে।", "Pick both cities in the time zone converter and enter the time. The browser works out daylight saving itself."] },
    ],
  },
  {
    slug: "gpa-4th-subject-hisab",
    title: ["এসএসসি-এইচএসসি জিপিএ কীভাবে হিসাব করবেন? ৪র্থ বিষয়সহ ও ছাড়া", "How to calculate SSC and HSC GPA with and without the 4th subject"],
    desc: ["গ্রেড পয়েন্ট যোগ করে জিপিএ বের করার নিয়ম, ৪র্থ বিষয়ের অতিরিক্ত পয়েন্ট কীভাবে যোগ হয় এবং উদাহরণ।", "How to find GPA by adding grade points, how the 4th subject's extra points are added, and an example."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "gpa-calculator-bd", name: ["জিপিএ ক্যালকুলেটর", "GPA calculator"] },
    sections: [
      {
        h: ["গ্রেড ও পয়েন্ট", "Grades and points"],
        p: [
          ["সাধারণ বোর্ডে নম্বর অনুযায়ী পয়েন্ট: ৮০-১০০ A+ (৫.০০), ৭০-৭৯ A (৪.০০), ৬০-৬৯ A- (৩.৫০), ৫০-৫৯ B (৩.০০), ৪০-৪৯ C (২.০০), ৩৩-৩৯ D (১.০০), ০-৩২ F (০.০০)।", "In the general boards the points follow marks: 80-100 A+ (5.00), 70-79 A (4.00), 60-69 A- (3.50), 50-59 B (3.00), 40-49 C (2.00), 33-39 D (1.00), 0-32 F (0.00)."],
        ],
      },
      {
        h: ["৪র্থ বিষয় ছাড়া জিপিএ", "GPA without the 4th subject"],
        p: [
          ["সব আবশ্যিক বিষয়ের পয়েন্ট যোগ করে বিষয়ের সংখ্যা দিয়ে ভাগ করুন। জিপিএ = মোট পয়েন্ট ÷ বিষয়ের সংখ্যা।", "Add the points of all compulsory subjects and divide by the number of subjects. GPA = total points ÷ number of subjects."],
        ],
      },
      {
        h: ["৪র্থ বিষয়সহ জিপিএ", "GPA with the 4th subject"],
        p: [
          ["৪র্থ বিষয়ের পয়েন্ট ২.০০ এর বেশি হলে শুধু বাড়তি অংশ (পয়েন্ট − ২) মোট পয়েন্টের সঙ্গে যোগ হয়। ভাগ হয় আবশ্যিক বিষয়ের সংখ্যা দিয়েই। ৪র্থ বিষয়ে ২.০০ বা তার কম পেলে কিছু যোগ হয় না। জিপিএ ৫.০০ এর বেশি দেখানো হয় না।", "If the 4th subject's points are above 2.00, only the extra part (points − 2) is added to the total. The divisor stays the number of compulsory subjects. If the 4th subject is 2.00 or less, nothing is added. A GPA is not shown above 5.00."],
          ["উদাহরণ: ধরুন ১০টি আবশ্যিক বিষয়ে মোট ৪০ পয়েন্ট এবং ৪র্থ বিষয়ে ৪.০০। জিপিএ = (৪০ + (৪ − ২)) ÷ ১০ = ৪২ ÷ ১০ = ৪.২০।", "Example: say 10 compulsory subjects total 40 points and the 4th subject is 4.00. GPA = (40 + (4 − 2)) ÷ 10 = 42 ÷ 10 = 4.20."],
        ],
      },
      {
        h: ["বোর্ডভেদে পার্থক্য", "Differences between boards"],
        p: [
          ["বিষয়ের সংখ্যা শাখা ও বোর্ডভেদে (সাধারণ, মাদ্রাসা, কারিগরি) আলাদা হতে পারে। চূড়ান্ত হিসাবের জন্য নিজের বোর্ডের ফলাফল বিজ্ঞপ্তি বা মার্কশিট দেখুন।", "The number of subjects can differ by stream and board (general, madrasah, technical). For the final figure check your board's result notice or marksheet."],
        ],
      },
    ],
    faqs: [
      { q: ["৪র্থ বিষয় ছাড়া জিপিএ কীভাবে বের করব?", "How do I find GPA without the 4th subject?"], a: ["সব আবশ্যিক বিষয়ের পয়েন্ট যোগ করে বিষয়ের সংখ্যা দিয়ে ভাগ করুন।", "Add the points of all compulsory subjects and divide by their number."] },
      { q: ["৪র্থ বিষয়ে A পেলে কত যোগ হয়?", "How much is added for an A in the 4th subject?"], a: ["A এর পয়েন্ট ৪.০০, তাই ৪ − ২ = ২ পয়েন্ট যোগ হয়।", "An A is 4.00 points, so 4 − 2 = 2 points are added."] },
    ],
  },
  {
    slug: "university-cgpa-grade-point",
    title: ["বিশ্ববিদ্যালয়ে A-, B+ এর পয়েন্ট কত? CGPA ও গ্রেড পয়েন্টের নিয়ম", "University grade points in Bangladesh: A-, B+ and how CGPA works"],
    desc: ["বাংলাদেশের বিশ্ববিদ্যালয়ে গ্রেডের পয়েন্ট কেন আলাদা, দুটি প্রচলিত স্কেল এবং ক্রেডিট দিয়ে CGPA হিসাবের উদাহরণ।", "Why grade points differ between Bangladeshi universities, two common scales, and a CGPA example using credits."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "cgpa-calculator", name: ["CGPA ক্যালকুলেটর", "CGPA calculator"] },
    sections: [
      {
        h: ["প্রতি বিশ্ববিদ্যালয়ে স্কেল আলাদা", "Each university has its own scale"],
        p: [
          ["বাংলাদেশে সব বিশ্ববিদ্যালয়ে একই গ্রেড স্কেল নেই। একটি প্রচলিত ৪.০০ স্কেলে A+ = ৪.০০, A = ৩.৭৫, A- = ৩.৫০, B+ = ৩.২৫, B = ৩.০০, B- = ২.৭৫, C+ = ২.৫০, C = ২.২৫, D = ২.০০, F = ০।", "Bangladeshi universities do not all use one grade scale. One common 4.00 scale is A+ = 4.00, A = 3.75, A- = 3.50, B+ = 3.25, B = 3.00, B- = 2.75, C+ = 2.50, C = 2.25, D = 2.00, F = 0."],
          ["কিছু বিশ্ববিদ্যালয় অন্য স্কেল ব্যবহার করে, যেমন A- = ৩.৭০ এবং B+ = ৩.৩০ (IUB ও BRAC ইউনিভার্সিটিতে এমন দেখা যায়), আবার কোথাও A- = ৩.৬৭ এবং B+ = ৩.৩৩।", "Some universities use another scale, for example A- = 3.70 and B+ = 3.30 (seen at IUB and BRAC University), and elsewhere A- = 3.67 and B+ = 3.33."],
          ["এসব তথ্য প্রকাশিত তালিকা থেকে নেওয়া এবং বদলাতে পারে। তাই নিজের বিশ্ববিদ্যালয়ের গ্রেডিং পলিসি দেখে নিন।", "These figures come from published lists and may change, so check your own university's grading policy."],
        ],
      },
      {
        h: ["CGPA কীভাবে হিসাব হয়", "How CGPA is calculated"],
        p: [
          ["সূত্র: CGPA = Σ (কোর্সের গ্রেড পয়েন্ট × ক্রেডিট) ÷ মোট ক্রেডিট।", "Formula: CGPA = Σ (course grade point × credits) ÷ total credits."],
          ["উদাহরণ: তিনটি কোর্স। ৩ ক্রেডিটে ৩.৭৫, ৩ ক্রেডিটে ৩.২৫ এবং ৪ ক্রেডিটে ৩.৫০। (৩ × ৩.৭৫ + ৩ × ৩.২৫ + ৪ × ৩.৫০) ÷ ১০ = (১১.২৫ + ৯.৭৫ + ১৪) ÷ ১০ = ৩৫ ÷ ১০ = ৩.৫০।", "Example: three courses. 3.75 on 3 credits, 3.25 on 3 credits and 3.50 on 4 credits. (3 × 3.75 + 3 × 3.25 + 4 × 3.50) ÷ 10 = (11.25 + 9.75 + 14) ÷ 10 = 35 ÷ 10 = 3.50."],
        ],
      },
    ],
    faqs: [
      { q: ["A- এর পয়েন্ট কত?", "What is the grade point of A-?"], a: ["স্কেলভেদে ৩.৫০ বা ৩.৭০ ও ৩.৬৭ হতে পারে। নিজের বিশ্ববিদ্যালয়ের স্কেল দেখুন।", "Depending on the scale it can be 3.50, 3.70 or 3.67. Check your university's scale."] },
      { q: ["৩.৩৩ জিপিএ কত গ্রেড?", "What grade is a 3.33 GPA?"], a: ["যে স্কেলে B+ = ৩.৩৩ (যেমন UIU তে), সেখানে এটি B+। অন্য স্কেলে ৩.৩৩ গ্রেডের মাঝামাঝি পড়তে পারে।", "On a scale where B+ = 3.33 (for example at UIU) it is B+. On other scales 3.33 may fall between two grades."] },
      { q: ["ক্রেডিট ছাড়া CGPA হিসাব করা যায়?", "Can I work out CGPA without credits?"], a: ["সব কোর্সের ক্রেডিট সমান হলে গ্রেড পয়েন্টের সাধারণ গড়ই CGPA। না হলে ক্রেডিট ধরে হিসাব করতে হবে।", "If all courses have equal credits, the plain average of grade points is the CGPA. Otherwise weight by credits."] },
    ],
  },
  {
    slug: "emi-flat-reducing-parthokko",
    title: ["EMI-তে ফ্ল্যাট রেট ও রিডিউসিং ব্যালেন্সের পার্থক্য কী? মোবাইল ও লোনের কিস্তি", "Flat rate vs reducing balance EMI: what is the difference?"],
    desc: ["একই সুদের হারে ফ্ল্যাট ও রিডিউসিং পদ্ধতিতে কিস্তি কত আলাদা হয়, উদাহরণ ও কেনার আগে কী জিজ্ঞেস করবেন।", "How much the instalment differs between flat and reducing methods at the same rate, with an example and what to ask before you buy."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "emi-calculator-bd", name: ["EMI ক্যালকুলেটর", "EMI calculator"] },
    sections: [
      {
        h: ["দুই পদ্ধতি", "The two methods"],
        p: [
          ["রিডিউসিং ব্যালেন্সে প্রতি মাসে বাকি থাকা আসলের ওপর সুদ ধরা হয়। ফ্ল্যাট রেটে পুরো মেয়াদে শুরুর আসলের ওপরই সুদ ধরা হয়, যদিও আপনি প্রতি মাসে আসল ফেরত দিচ্ছেন। তাই একই হারে ফ্ল্যাট রেটে মোট সুদ বেশি পড়ে।", "With reducing balance, interest is charged on the principal still owed each month. With a flat rate, interest is charged on the original principal for the whole term even though you repay principal every month. So at the same stated rate, the flat method costs more in total."],
        ],
      },
      {
        h: ["উদাহরণ", "Example"],
        p: [
          ["১,০০,০০০ টাকা, ১২% বার্ষিক হার, ১২ মাস। রিডিউসিং ব্যালেন্সে কিস্তি প্রায় ৮,৮৮৫ টাকা, মোট সুদ প্রায় ৬,৬১৯ টাকা। ফ্ল্যাট রেটে সুদ ১,০০,০০০ × ১২% = ১২,০০০ টাকা, কিস্তি (১,০০,০০০ + ১২,০০০) ÷ ১২ = প্রায় ৯,৩৩৩ টাকা।", "100,000 taka at 12% a year for 12 months. With reducing balance the instalment is about 8,885 taka and total interest about 6,619 taka. With a flat rate the interest is 100,000 × 12% = 12,000 taka and the instalment is (100,000 + 12,000) ÷ 12 = about 9,333 taka."],
          ["অর্থাৎ ফ্ল্যাট ১২% আসলে রিডিউসিং ব্যালেন্সের প্রায় ২১.৫% বার্ষিক হারের সমান।", "In other words, a flat 12% works out to about 21.5% a year on a reducing balance basis."],
        ],
      },
      {
        h: ["কেনার আগে কী জিজ্ঞেস করবেন", "What to ask before you buy"],
        p: [
          ["দোকান বা ব্যাংককে জিজ্ঞেস করুন হার ফ্ল্যাট না রিডিউসিং, কিস্তির সংখ্যা কত, মোট কত টাকা ফেরত দিতে হবে এবং প্রসেসিং ফি বা অন্য চার্জ আছে কি না। মোট ফেরতের অঙ্ক নগদ দামের সঙ্গে মিলিয়ে দেখলে খরচ বোঝা যায়। আমাদের ক্যালকুলেটর রিডিউসিং ব্যালেন্স পদ্ধতিতে আনুমানিক হিসাব দেয়।", "Ask whether the rate is flat or reducing, how many instalments there are, the total you will repay, and whether there is a processing fee or other charges. Comparing the total repayment with the cash price shows the real cost. Our calculator gives an estimate using the reducing balance method."],
        ],
      },
    ],
    faqs: [
      { q: ["মোবাইল ফোন কিস্তিতে কেনা কি লাভজনক?", "Is buying a phone on instalments worth it?"], a: ["মোট ফেরতের অঙ্ক নগদ দামের চেয়ে কত বেশি তা দেখুন। ওই বাড়তি টাকাই আপনার কিস্তির খরচ।", "Check how much more the total repayment is than the cash price. That extra is the cost of the instalments."] },
      { q: ["ফ্ল্যাট রেট কি সবসময় বেশি খরচের?", "Is a flat rate always more expensive?"], a: ["একই ঘোষিত হারে হ্যাঁ। তবে দুই অফারের হার আলাদা হলে মোট ফেরতের অঙ্ক দিয়ে তুলনা করুন।", "At the same stated rate, yes. If the two offers have different rates, compare them by total repayment."] },
    ],
  },
  {
    slug: "khoroch-hisab-rakhar-niyom",
    title: ["মাসিক খরচের হিসাব কীভাবে রাখবেন? সহজ নিয়ম ও ধাপ", "How to keep track of your monthly expenses: simple steps"],
    desc: ["আয় ও খরচ লিখে রাখার সহজ পদ্ধতি, খরচের ভাগ এবং মাস শেষে হিসাব মেলানোর উপায়।", "A simple way to record income and spending, group your expenses, and review them at the end of the month."],
    updated: "2026-11-03",
    updatedLabel: ["৩ নভেম্বর, ২০২৬", "3 November 2026"],
    tool: { slug: "expense-tracker", name: ["খরচের হিসাব", "Expense tracker"] },
    sections: [
      {
        h: ["ধাপ ১: আয় লিখুন", "Step 1: write down your income"],
        p: [
          ["মাসের শুরুতে হাতে আসা মোট টাকা লিখুন। বেতন, টিউশন বা অন্য আয় থাকলে আলাদা করে লিখুন।", "At the start of the month write down the total money you have. If you have salary, tuition or other income, list each one."],
        ],
      },
      {
        h: ["ধাপ ২: খরচ ভাগ করুন", "Step 2: group your spending"],
        p: [
          ["খরচকে কয়েকটি ভাগে রাখুন, যেমন খাবার, যাতায়াত, বাসাভাড়া ও বিল, পড়াশোনা, মোবাইল রিচার্জ ও অন্যান্য। নিয়মিত খরচ (ভাড়া, বিল) আর বদলানো খরচ (খাবার, শখ) আলাদা দেখলে কোথায় কমানো যায় বোঝা সহজ হয়।", "Sort spending into a few groups such as food, transport, rent and bills, education, mobile top-up and other. Seeing fixed costs (rent, bills) apart from changing costs (food, hobbies) makes it easier to see where you can cut."],
        ],
      },
      {
        h: ["ধাপ ৩: প্রতিদিন লিখুন", "Step 3: record it every day"],
        p: [
          ["খরচ করার দিনই লিখে ফেলুন। কয়েক দিন পরে লিখতে গেলে ছোট খরচ ভুলে যাওয়া সহজ। আমাদের খরচের হিসাব টুলে খরচ ও আয় যোগ করলে মোট নিজে হিসাব হয়।", "Write it the same day you spend. If you wait a few days, small expenses are easy to forget. In our expense tracker, add each expense and income and the totals are worked out for you."],
        ],
      },
      {
        h: ["ধাপ ৪: মাস শেষে মেলান", "Step 4: review at month end"],
        p: [
          ["মাস শেষে আয় − মোট খরচ = বাকি টাকা। এটি হাতের টাকার সঙ্গে মিলিয়ে দেখুন। কোন ভাগে সবচেয়ে বেশি গেছে দেখে পরের মাসের সীমা ঠিক করুন।", "At month end, income − total spending = money left. Check it against the cash you actually have. See which group took the most and set limits for next month."],
        ],
      },
    ],
    faqs: [
      { q: ["খরচের হিসাব রাখার সবচেয়ে সহজ উপায় কী?", "What is the easiest way to track expenses?"], a: ["প্রতিদিন খরচ করার পরই লিখে ফেলা। একটি খাতা বা টুল যেকোনোটিই চলে।", "Write it down right after you spend. A notebook or a tool both work."] },
      { q: ["এই টুলের ডেটা কি কোথাও জমা হয়?", "Is my data stored anywhere?"], a: ["টুলটি আপনার ব্রাউজারেই চলে। ব্রাউজারের ডেটা মুছলে হিসাব হারিয়ে যেতে পারে, তাই গুরুত্বপূর্ণ হিসাব আলাদা করে লিখে রাখুন।", "The tool runs in your browser. Clearing browser data can erase your records, so keep a separate note of anything important."] },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
