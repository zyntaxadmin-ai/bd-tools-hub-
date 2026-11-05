export type ToolEn = { title: string; desc: string; howTo: string[]; faqs: { q: string; a: string }[] };

// English page content for every live tool (key = slug without /tool/)
export const TOOL_EN: Record<string, ToolEn> = {
  "age-calculator": {
    title: "Age Calculator",
    desc: "Find your exact age from your date of birth in years, months and days, plus total days and days until your next birthday.",
    howTo: ["Select your date of birth", "Click Calculate", "See your age in years, months, days and total days"],
    faqs: [
      { q: "Does it handle leap years?", a: "Yes, leap years are taken into account." },
      { q: "What if I enter a future date?", a: "It shows an error, because a date of birth cannot be in the future." },
    ],
  },
  "gpa-calculator-bd": {
    title: "GPA Calculator BD",
    desc: "Calculate your SSC/HSC GPA from subject grades. If any subject is F, it shows Fail.",
    howTo: ["Select the grade for each of the 5 subjects", "Click Calculate GPA", "See your result out of 5.00"],
    faqs: [
      { q: "What if a subject has an F?", a: "It shows GPA 0.00 and a Fail status." },
      { q: "Is this my official result?", a: "No, it is only an estimate. Check your official result from the board." },
    ],
  },
  "bkash-calculator": {
    title: "bKash Cash Out Charge Calculator",
    desc: "Calculate the bKash cash out charge (agent 18.50 per 1,000 taka, ATM 14.90, last checked October 2026). See the charge, the total deducted and how much you can cash out from your balance.",
    howTo: ["Enter the amount (or tap a quick amount below)", "Choose agent, ATM or Send Money", "See the charge and the total deducted straight away", "To find how much you can cash out, open the second tab and enter your balance"],
    faqs: [
      { q: "What is the bKash cash out charge?", a: "This calculator uses 18.50 taka per 1,000 (1.85%) for agent cash out and 14.90 taka per 1,000 for ATM cash out (last checked October 2026)." },
      { q: "Is the charge always the same?", a: "No. bKash can change its charges at any time. Check the official charge chart to confirm." },
      { q: "What is the cash out charge on 1,000 taka?", a: "18.50 taka for agent cash out and 14.90 taka for ATM cash out. In total 1,018.50 or 1,014.90 taka is deducted from your balance." },
      { q: "What is the cash out charge on 5,000 taka?", a: "92.50 taka at an agent, so 5,092.50 taka is deducted in total. At an ATM it is 74.50 taka, 5,074.50 in total." },
      { q: "How is the charge worked out?", a: "Charge = amount × 18.5 ÷ 1,000 (agent). For example 37 taka on 2,000 taka and 92.5 taka on 5,000 taka. The charge is taken from your balance on top of the amount." },
      { q: "How much can I cash out if my balance is 5,000 taka?", a: "The charge comes out of the same balance, so you cannot cash out the full 5,000. At the agent rate you can cash out about 4,909 taka, with a charge of about 90.82 taka. Use the second tab for any balance." },
      { q: "Is the charge lower at a Priyo agent or with an offer?", a: "bKash has published lower rates for benefits such as the Priyo agent, but rates and monthly limits change. Check your own rate in the app or on *247# and enter it under \"Enter my own rate\"." },
      { q: "What Send Money charge does the tool assume?", a: "The tool assumes a charge of 0 for Send Money. A charge can apply above limits or for other kinds of transfer, so check the bKash app or the official chart." },
      { q: "How do I compare with other services?", a: "Nagad, Rocket and Upay have their own calculators. For all four side by side, read our cash out charge table guide." },
    ],
  },
  "word-counter": {
    title: "Word Counter",
    desc: "Count words, characters, sentences and paragraphs as you type.",
    howTo: ["Paste your text into the box", "Watch the live count", "Clear it and start again"],
    faqs: [
      { q: "How is reading time calculated?", a: "At 200 words per minute." },
      { q: "Does it count Bangla text?", a: "Yes, both Bangla and English." },
    ],
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    desc: "Percentage calculations in one click: X% of Y, percent increase or decrease, add or subtract a percentage. Shows the working.",
    howTo: ["Choose the type of calculation at the top", "Enter the two numbers", "See the result and the working"],
    faqs: [
      { q: "What is the percentage formula?", a: "Part ÷ total × 100. For example, 20% of 50 = 50 × 20 ÷ 100 = 10." },
      { q: "How do I find a percentage increase?", a: "(New value − old value) ÷ old value × 100. A negative result means a decrease." },
      { q: "What is 15% of 200?", a: "200 × 15 ÷ 100 = 30." },
    ],
  },
  "bmi-calculator": {
    title: "BMI Calculator",
    desc: "Find your BMI from weight and height, and the normal weight range for your height.",
    howTo: ["Enter your weight in kg", "Enter your height in cm or in feet and inches", "See your BMI, category and normal weight range"],
    faqs: [
      { q: "How is BMI calculated?", a: "Weight in kg divided by height in metres squared." },
      { q: "What is a normal BMI?", a: "For adults, WHO considers 18.5 to 24.9 to be normal." },
      { q: "Is BMI accurate for everyone?", a: "No. It may not be accurate for children, pregnant women and athletes. Please consult a doctor." },
    ],
  },
  "emi-calculator-bd": {
    title: "EMI Calculator",
    desc: "Calculate the monthly instalment, total interest and total repayment from the loan amount, interest rate and tenure.",
    howTo: ["Enter the loan amount", "Enter the annual interest rate and tenure", "See the monthly EMI and the first 12 months table"],
    faqs: [
      { q: "How is EMI calculated?", a: "With the reducing balance method: EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where r is the monthly rate and n is the number of months." },
      { q: "Will it match my bank exactly?", a: "Processing fees, insurance or a different method can cause small differences. Confirm with your bank." },
    ],
  },
  "land-calculator-bd": {
    title: "Land Calculator (Shatak, Katha, Bigha, Acre)",
    desc: "Convert land area between shatak (decimal), katha, bigha, acre, square feet and square metres in one place.",
    howTo: ["Enter the area and pick its unit", "Change the square feet per katha to match your area if needed", "See every unit at once or copy a value"],
    faqs: [
      { q: "How many square feet is 1 shatak?", a: "1 shatak = 435.6 square feet. 100 shatak make 1 acre (43,560 square feet)." },
      { q: "How many square feet is 1 katha?", a: "It is usually taken as 720 square feet, but katha and bigha sizes vary by area, so use your local measure." },
      { q: "How many katha is 1 bigha?", a: "This tool assumes 1 bigha = 20 katha." },
    ],
  },
  "password-generator": {
    title: "Strong Password Generator",
    desc: "Generate secure random passwords. They are created in your browser and never saved.",
    howTo: ["Set the length", "Choose the character types", "Click Copy and use it"],
    faqs: [
      { q: "Is my password saved anywhere?", a: "No. Passwords are generated in your browser and are not sent to any server." },
      { q: "How long should a password be?", a: "At least 12 to 16 characters, mixing upper and lower case letters, numbers and symbols." },
    ],
  },
  "case-converter": {
    title: "Case Converter",
    desc: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case.",
    howTo: ["Paste your text into the box", "Click the format you want", "Copy the result"],
    faqs: [
      { q: "Does it work on Bangla text?", a: "Bangla script has no upper or lower case, so Bangla text stays unchanged. English text is converted." },
      { q: "What is Sentence case?", a: "The first letter of each sentence is capital and the rest is lowercase." },
    ],
  },
  "cgpa-calculator": {
    title: "CGPA Calculator BD",
    desc: "Calculate your semester GPA and CGPA from course grades and credits. Add your previous CGPA to see the updated one. Includes a grade point table and 4.00 and 5.00 scales.",
    howTo: ["On the \"By course\" tab, enter each course's grade and credits", "If you have a previous CGPA and credits, enter them in the box below (optional)", "See your semester GPA and updated CGPA straight away", "If you already know semester GPAs, use the \"From semester GPA\" tab"],
    faqs: [
      { q: "How is CGPA calculated?", a: "Each course's grade point is multiplied by its credits, the results are added, then divided by the total credits. Formula: CGPA = Σ(grade point × credits) ÷ total credits." },
      { q: "What is the difference between GPA and CGPA?", a: "GPA is the average result of one semester. CGPA is the credit-weighted average across all semesters so far." },
      { q: "What are the grade points from A+ to F?", a: "On the common 4.00 scale: A+ 4.00, A 3.75, A- 3.50, B+ 3.25, B 3.00, B- 2.75, C+ 2.50, C 2.25, D 2.00 and F 0. This can differ between universities." },
      { q: "How do I work out my new CGPA with a previous CGPA?", a: "On the \"By course\" tab, enter this semester's courses and your previous CGPA and total credits in the box below. The tool combines them into the updated CGPA." },
      { q: "What is the difference between the 4.00 and 5.00 scales?", a: "Most universities in Bangladesh use the 4.00 scale. SSC and HSC use the 5.00 scale. The \"From semester GPA\" tab lets you pick either." },
      { q: "How do I convert CGPA to percentage?", a: "There is no single formula that every university uses. Check your university's grading policy or conversion formula, because this tool does not assume one." },
      { q: "How does a retake or improvement change the result?", a: "The rules differ between universities. Some replace the old grade with the new one, others count both. In the tool you can remove the old course and enter the new grade, but check the final result with your university." },
      { q: "Is the calculation the same at every university?", a: "No. Grading systems and retake or improvement rules differ. Check your final CGPA with your university." },
    ],
  },
  "unit-converter": {
    title: "Unit Converter",
    desc: "Convert length, weight, temperature, area, volume, speed and data size in one place.",
    howTo: ["Pick a category such as length", "Enter a value and choose the from and to units", "Use the swap button to reverse the units"],
    faqs: [
      { q: "How many centimetres is 1 inch?", a: "1 inch = 2.54 centimetres." },
      { q: "How many bytes is 1 KB?", a: "This tool uses 1 KB = 1,024 bytes." },
      { q: "What is the formula for °C to °F?", a: "°F = °C × 9/5 + 32." },
    ],
  },
  "bill-calculator": {
    title: "Bill Splitter",
    desc: "Split a bill with friends. Add VAT, service charge and tip to see the amount per person.",
    howTo: ["Enter the total bill and the number of people", "Optionally enter VAT/service charge and tip percentages", "See the amount per person"],
    faqs: [
      { q: "How are VAT and tip added?", a: "Both are calculated as a percentage of the original bill and added to it." },
      { q: "What about decimals?", a: "Per-person amounts are shown to two decimal places. Round up however you like." },
    ],
  },
  "date-difference-calculator": {
    title: "Date Difference Calculator",
    desc: "Find the difference between two dates in years, months, days and total days, or add or subtract days from a date.",
    howTo: ["Choose Difference or Add/Subtract mode", "Enter the dates and numbers", "See the result"],
    faqs: [
      { q: "How are months and days counted?", a: "Whole months from the start date are counted first, and the remaining days are shown separately. Adding months from the 31st stops at the last day of shorter months." },
      { q: "What if the start date is later?", a: "The tool swaps the two dates automatically." },
    ],
  },
  "govt-job-age-calculator": {
    title: "Govt Job Age Calculator",
    desc: "Check whether you are within the age limit using your date of birth, the circular's reference date and the maximum age.",
    howTo: ["Enter your date of birth", "Enter the age-calculation date and maximum age from the circular", "See whether you are within the limit and your last eligible date"],
    faqs: [
      { q: "Is the age limit built into the tool?", a: "No. The maximum age and reference date differ by circular and quota, so enter them from the circular." },
      { q: "What if I am exactly on the limit day?", a: "The tool treats you as eligible up to the birthday of the maximum age. Always confirm with the official circular." },
    ],
  },
  "scientific-calculator": {
    title: "Scientific Calculator",
    desc: "Online scientific calculator with sin, cos, tan, log, ln, square root, powers, factorial and brackets.",
    howTo: ["Type or tap buttons to build the expression", "Switch Deg/Rad for angles", "Press = for the result and use Ans for the previous result"],
    faqs: [
      { q: "What is the difference between Deg and Rad?", a: "Deg treats angles as degrees and Rad as radians. In Deg mode, sin(30) = 0.5." },
      { q: "How big can a factorial be?", a: "It works for whole numbers from 0 to 170." },
    ],
  },
  "image-compressor": {
    title: "Image Compressor",
    desc: "Reduce image size in KB or MB and set the quality yourself. Images are not uploaded; everything happens on your device.",
    howTo: ["Select an image", "Choose JPEG or WebP and adjust the quality", "Compare the sizes and download"],
    faqs: [
      { q: "Is my image uploaded anywhere?", a: "No. Compression happens entirely in your browser and the image never leaves your device." },
      { q: "Why JPEG or WebP and not PNG?", a: "PNG is lossless, so lowering quality does not reduce its size. JPEG and WebP shrink when quality is lowered. A PNG you add here is converted to JPEG or WebP." },
      { q: "How can I reduce the size further?", a: "Lower the quality or reduce the maximum width in pixels. Smaller dimensions give smaller files." },
    ],
  },
  "image-resizer": {
    title: "Image Resizer",
    desc: "Change image width and height in pixels. Includes passport-size presets. Images are not uploaded.",
    howTo: ["Select an image", "Pick a preset or enter the width and height", "Click Resize and download"],
    faqs: [
      { q: "How many pixels is a passport photo?", a: "A 3.5 × 4.5 cm photo at 300 DPI is about 413 × 531 pixels. Follow the form or website's own instructions if they differ." },
      { q: "What does keeping the ratio mean?", a: "With the lock on, changing one dimension adjusts the other so the image is not distorted." },
      { q: "Is my image uploaded anywhere?", a: "No, everything happens in your browser." },
    ],
  },
  "image-converter": {
    title: "Image Converter",
    desc: "Convert images between JPG, PNG and WebP. Nothing is uploaded; it all happens in your browser.",
    howTo: ["Select an image", "Choose the target format", "Download the result"],
    faqs: [
      { q: "What happens to transparency when converting PNG to JPG?", a: "JPG does not support transparency, so transparent areas become white." },
      { q: "What is WebP?", a: "WebP is an image format by Google that usually gives smaller files than JPG or PNG at similar quality." },
    ],
  },
  "qr-code-generator": {
    title: "QR Code Generator",
    desc: "Create a free QR code from a link or text. Adjust the colours and size, then download it as a PNG.",
    howTo: ["Enter a link or text", "Adjust the size and colours", "Download the PNG"],
    faqs: [
      { q: "Does this QR code expire?", a: "No. The text or link is encoded in the QR itself, so it is permanent. If the linked website goes offline, the link will stop working." },
      { q: "What are the error correction levels?", a: "They decide whether the QR can still be read if part of it is damaged. L is about 7%, M 15%, Q 25% and H 30%. Higher levels make the QR denser." },
      { q: "Is my text sent anywhere?", a: "No, the QR code is generated in your browser." },
    ],
  },
  "character-counter": {
    title: "Character Counter",
    desc: "Count characters with and without spaces, and check limits for SMS, X, SEO title and description.",
    howTo: ["Type or paste your text", "See the live count", "Pick a limit such as SMS to see how many characters remain"],
    faqs: [
      { q: "How many characters fit in an SMS?", a: "A single English (GSM) SMS holds 160 characters, and a Bangla or Unicode SMS holds 70 per part. Longer messages are sent as multiple SMS." },
      { q: "How long should an SEO title be?", a: "Around 50 to 60 characters. Google truncates by pixel width, so this is approximate." },
    ],
  },
  "color-picker": {
    title: "Color Picker",
    desc: "Pick a colour or type a HEX code to see the HEX, RGB and HSL values, and copy them in one tap.",
    howTo: ["Pick a colour or type a HEX code", "See the HEX, RGB and HSL values", "Tap copy"],
    faqs: [
      { q: "What is the difference between HEX, RGB and HSL?", a: "They are three ways to write the same colour. HEX and RGB mix red, green and blue, while HSL uses hue, saturation and lightness." },
      { q: "Does it accept 3-digit HEX codes?", a: "Yes. For example, #FFF means #FFFFFF." },
    ],
  },
  "lorem-ipsum-generator": {
    title: "Lorem Ipsum Generator",
    desc: "Generate Lorem Ipsum placeholder text as paragraphs, sentences or words for your designs and websites.",
    howTo: ["Choose paragraphs, sentences or words", "Enter how many you need", "Copy and use it"],
    faqs: [
      { q: "What is Lorem Ipsum?", a: "It is placeholder text used in design to show how real text will fill a layout." },
      { q: "Does it mean anything?", a: "No. It is nonsense Latin-style text used only to show text size and layout." },
    ],
  },
  "meta-tag-generator": {
    title: "Meta Tag Generator",
    desc: "Create SEO meta tags with title, description, Open Graph and Twitter tags for Blogger or any website.",
    howTo: ["Enter the page title and description", "Add the URL, image and author if needed", "Copy the HTML into your page's <head>"],
    faqs: [
      { q: "How long should the title and description be?", a: "Keep titles around 50 to 60 characters and descriptions 120 to 160. Google truncates by pixel width, so these are approximate." },
      { q: "Do meta keywords help SEO?", a: "Google does not use meta keywords for ranking. You can include them, but it is fine to leave them out." },
      { q: "What is a canonical URL?", a: "It tells search engines which URL is the main version when the same content appears at several URLs." },
    ],
  },
  "keyword-density-checker": {
    title: "Keyword Density Checker",
    desc: "See which words or phrases appear most in your text and their percentage. Works for Bangla and English.",
    howTo: ["Paste your text", "Choose 1, 2 or 3-word phrases", "See the top 20 keywords and their density"],
    faqs: [
      { q: "How is density calculated?", a: "The number of times the keyword appears ÷ total words × 100." },
      { q: "What is the ideal keyword density?", a: "There is no magic number. Write naturally and do not force the same word in." },
      { q: "Does it work for Bangla?", a: "Yes. The common-word list is short, so turn the filter off if needed." },
    ],
  },
  "stopwatch-timer": {
    title: "Stopwatch & Timer",
    desc: "Online stopwatch with laps, and a countdown timer that beeps at the end, on one page.",
    howTo: ["Pick Stopwatch or Countdown Timer", "Press Start (set the time first for the timer)", "Use Pause, Lap or Reset"],
    faqs: [
      { q: "What if the timer makes no sound?", a: "Check your phone volume and silent mode. Keep the page open, because a locked screen or closed tab may stop the sound." },
      { q: "How accurate is it?", a: "Time is measured from your device clock, so it stays correct even if the tab goes to the background. It is not meant for professional sports timing." },
    ],
  },
  "todo-list": {
    title: "To-Do List",
    desc: "Make a daily task list and tick things off. No signup, and the list stays in your browser.",
    howTo: ["Type a task and press + or Enter", "Tick it when it is done", "Filter by All, Active or Done"],
    faqs: [
      { q: "Where is my list saved?", a: "Only on your phone or browser (local storage), never on a server. It will not appear on other devices." },
      { q: "What if I clear my browser data?", a: "Your list will be deleted too. Keep important items somewhere else as well." },
    ],
  },
  "random-number-generator": {
    title: "Random Number Generator",
    desc: "Generate random numbers in a range, plus a coin flip and dice roll.",
    howTo: ["Enter the minimum, maximum and how many numbers", "Optionally choose unique numbers", "Click generate"],
    faqs: [
      { q: "Are the numbers truly random?", a: "They come from the browser's crypto generator, which is stronger than Math.random. For official or legal lotteries, use an approved method." },
      { q: "What is the limit for unique numbers?", a: "You cannot ask for more unique numbers than the range holds. For example, 1 to 10 gives at most 10 unique numbers." },
    ],
  },
  "countdown-timer": {
    title: "Countdown Timer",
    desc: "Enter an event date to see the days, hours, minutes and seconds left, live.",
    howTo: ["Enter the event name", "Pick the date and time", "Watch the live countdown"],
    faqs: [
      { q: "Are Eid or Ramadan dates built in?", a: "No. They depend on moon sighting and change every year, so set the date yourself." },
      { q: "Is my event saved?", a: "Yes, only in your browser. It will be there when you come back." },
    ],
  },
  "time-zone-converter": {
    title: "Time Zone Converter",
    desc: "Convert Bangladesh time to the UK, US, Saudi Arabia, Malaysia and other countries.",
    howTo: ["Choose the country to convert from", "Enter the date and time, or use the current time", "See the time in all countries together"],
    faqs: [
      { q: "Is daylight saving handled?", a: "Yes. It uses your browser's time zone data, so daylight saving is handled by date. For example, London is UTC+1 in summer and UTC+0 in winter." },
      { q: "What is Bangladesh time?", a: "Bangladesh Standard Time is UTC+6, and Bangladesh currently does not use daylight saving." },
    ],
  },
  "expense-tracker": {
    title: "Expense Tracker",
    desc: "Keep track of income and expenses, view them by month, see where your money goes by category and download a CSV. Your data stays on your phone.",
    howTo: ["Choose income or expense, then enter the amount and category", "Tap Add", "See your total income, expenses and balance by month, and download a CSV if needed"],
    faqs: [
      { q: "Where are my entries saved?", a: "Only on your phone or browser (local storage), never on a server. They will not appear on other devices." },
      { q: "What if I clear my browser data?", a: "Your entries will be deleted too, so download a CSV now and then as a backup." },
    ],
  },
  "invoice-generator": {
    title: "Invoice Generator",
    desc: "Create a free invoice with items, VAT and discount, then print it or save it as a PDF. No signup needed.",
    howTo: ["Enter your details and your client's details", "Add the items, VAT and discount", "Tap Print and choose \"Save as PDF\""],
    faqs: [
      { q: "How do I get a PDF?", a: "Tap Print and the print window opens. Choose \"Save as PDF\" in place of a printer." },
      { q: "Is my information sent anywhere?", a: "No. Everything happens in your browser. Only your (seller) details and currency are remembered in this browser for next time." },
      { q: "Is this the official government VAT challan (Mushak) format?", a: "No, this is a general invoice. The official VAT invoice rules are different, so check the NBR rules for that." },
    ],
  },
  "qr-scanner": {
    title: "QR Code Scanner",
    desc: "Scan a QR code with your phone camera, or upload a photo of one. No image is sent to a server.",
    howTo: ["Start the camera and allow permission", "Hold the QR code inside the frame", "See the result and, if it is a link, check the address before opening it"],
    faqs: [
      { q: "What if the camera does not start?", a: "Check that camera permission is allowed for this site in your browser and that no other app is using the camera. You can also upload a photo of the QR code below." },
      { q: "Is a scanned link safe?", a: "Not necessarily. An unknown QR code can lead to a harmful site, so check the address before opening a link." },
      { q: "Is my image uploaded anywhere?", a: "No, everything is processed on your phone." },
    ],
  },
  "text-to-speech": {
    title: "Text to Speech",
    desc: "Paste text and have it read aloud in Bangla, English and other languages installed on your device. Adjust voice, speed and pitch. Your text is never sent anywhere.",
    howTo: ["Type or paste your text", "Choose the language and voice (leave it on Automatic to detect the language from the text), then set speed and pitch", "Tap Speak"],
    faqs: [
      { q: "Which languages work?", a: "The languages that have a voice installed on your phone or browser. In Automatic mode the tool detects the language from the writing system (for example Bangla, Hindi, Arabic, English). For other languages written in Latin letters, such as Spanish, choose that language from the Language list." },
      { q: "What if Bangla or another language is not read aloud?", a: "Install a voice for that language in Settings → Language → Text-to-speech. Voices marked \"online\" need internet and start slowly, so pick an offline voice if you can." },
      { q: "Why does it not work when I open it from Instagram or Facebook?", a: "The built-in browser of those apps does not support voice. Use the ⋯ menu and choose \"Open in browser\" to open it in Chrome." },
      { q: "Can I download the audio?", a: "No. The browser voice can only play the sound and cannot save it as a file." },
    ],
  },
  "nagad-calculator": {
    title: "Nagad Charge Calculator",
    desc: "Work out the Nagad cash out charge and the total amount deducted in a moment. You can also enter your own rate.",
    howTo: ["Enter the amount", "Choose agent or ATM cash out", "See the charge and the total deducted"],
    faqs: [
      { q: "What is the Nagad cash out charge on 1,000 taka?", a: "This calculator uses 14.90 taka per 1,000. Rates can differ by app, USSD and offers, so check the app." },
      { q: "Is the charge always the same?", a: "No. Nagad can change its charges at any time. Check the app or the official charge chart." },
      { q: "What if my rate is different?", a: "Choose \"Enter my own rate\" and type your rate per 1,000 taka." },
      { q: "Why is send money not included?", a: "Send money fees vary by app and offer, so they are not included." },
    ],
  },
  "rocket-calculator": {
    title: "Rocket Charge Calculator",
    desc: "Work out how much it costs to cash out from Dutch-Bangla Bank's Rocket at an agent or an ATM.",
    howTo: ["Enter the amount", "Choose agent or Dutch-Bangla ATM", "See the charge and the total deducted"],
    faqs: [
      { q: "What is the Rocket agent cash out charge?", a: "This calculator uses 18 taka per 1,000 (1.8%). Some sources list 1.67%, so check the app." },
      { q: "Why is the Dutch-Bangla ATM cheaper?", a: "Rocket is a Dutch-Bangla Bank service, so cash out at its own ATMs usually costs less." },
      { q: "Do charges change?", a: "Yes, at any time. Check the official app or charge chart." },
    ],
  },
  "upay-calculator": {
    title: "Upay Charge Calculator",
    desc: "Work out how much it costs to cash out from UCB's Upay at an agent or an ATM.",
    howTo: ["Enter the amount", "Choose agent or UCB ATM", "See the charge and the total deducted"],
    faqs: [
      { q: "What is the Upay agent cash out charge?", a: "This calculator uses 14 taka per 1,000 (1.4%) and 8 taka at UCB ATMs. Confirm in the app." },
      { q: "Do charges change?", a: "Yes, at any time. Check the official app or charge chart." },
      { q: "What if my rate is different?", a: "Choose \"Enter my own rate\" and type your rate per 1,000 taka." },
    ],
  },
  "image-to-pdf": {
    title: "Image to PDF",
    desc: "Make one PDF from one or more images. Set the order and choose A4 or fit-to-image pages. Your images are not uploaded, everything happens on your phone.",
    howTo: ["Select one or more images", "Set the order with the arrow buttons and pick a page size", "Tap Create PDF and download it"],
    faqs: [
      { q: "Are my images uploaded anywhere?", a: "No. The PDF is made entirely on your phone or browser and no image goes to a server." },
      { q: "Can I make one PDF from several images?", a: "Yes, up to 50 images at once. Each image becomes its own page." },
      { q: "What is the difference between A4 and fit to image?", a: "With A4, each image is centred on an A4 page with a small margin. With fit to image, the page is exactly the size of the image with no margin." },
      { q: "What happens to transparent parts of a PNG?", a: "Images are placed in the PDF as JPEG, so transparent areas turn white." },
      { q: "Can I use it for passport or form submissions?", a: "Yes. If there is a file size limit, shrink the images first with the Image Compressor." },
    ],
  },
  "merge-pdf": {
    title: "Merge PDF",
    desc: "Combine several PDF files into one PDF and set the order yourself. Your files are not uploaded, everything happens on your phone.",
    howTo: ["Select two or more PDFs", "Set the order with the arrow buttons", "Tap Merge PDFs and download the result"],
    faqs: [
      { q: "Are my PDFs uploaded anywhere?", a: "No. Merging happens entirely on your phone or browser and no file goes to a server." },
      { q: "How many PDFs can I merge?", a: "Up to 20 files at once, each up to 50 MB." },
      { q: "Can I merge a password protected PDF?", a: "No. Password protected or damaged PDFs cannot be opened. Remove the password first." },
      { q: "How do I change the order afterwards?", a: "Use the arrow buttons next to each file and merge again." },
      { q: "Will the file get bigger?", a: "It will be roughly the sum of all the file sizes. Compress it afterwards if you need it smaller." },
    ],
  },
  "rotate-pdf": {
    title: "Rotate PDF",
    desc: "Fix upside-down or sideways PDF pages by rotating them right, left or 180°. Rotate all pages or only the ones you choose. Your file is not uploaded, everything happens on your phone.",
    howTo: ["Select a PDF", "Choose right 90°, left 90° or 180°, and pick all pages or chosen pages", "Tap Rotate PDF and download the new file"],
    faqs: [
      { q: "Is my PDF uploaded anywhere?", a: "No. Rotating happens entirely on your phone or browser and no file goes to a server." },
      { q: "Can I rotate only a few pages?", a: "Yes. Choose chosen pages and type page numbers such as 1-3, 5. The other pages stay as they are. Bangla digits work too." },
      { q: "Can I rotate a password protected PDF?", a: "No. Password protected or damaged PDFs cannot be opened." },
      { q: "Does the original PDF change?", a: "No. Your original stays as it was, only a new file is created." },
    ],
  },
  "split-pdf": {
    title: "Split PDF",
    desc: "Pull chosen pages out of a PDF, or turn every page into its own PDF. Your file is not uploaded, everything happens on your phone.",
    howTo: ["Select a PDF", "Type a page range (for example 1-3, 5) or choose each page separately", "Tap Split PDF and download the result"],
    faqs: [
      { q: "Is my PDF uploaded anywhere?", a: "No. Splitting happens entirely on your phone or browser and no file goes to a server." },
      { q: "How do I write a page range?", a: "Separate parts with commas. For example, 1-3, 5, 8-10 keeps pages 1, 2, 3, 5, 8, 9 and 10 in one new PDF. Bangla digits work too." },
      { q: "What do I get if I split each page?", a: "Every page becomes its own PDF and you download them one by one. This works for PDFs up to 100 pages." },
      { q: "Can I split a password protected PDF?", a: "No. Password protected or damaged PDFs cannot be opened." },
      { q: "Does the original PDF change?", a: "No. Your original stays as it was, only new files are created." },
    ],
  },
  "pdf-to-jpg": {
    title: "PDF to JPG",
    desc: "Turn each page of a PDF into a JPG image. Pick the pages and the image quality. Your PDF is not uploaded, everything happens on your phone.",
    howTo: ["Select a PDF", "Type a page range if needed and choose the image quality", "Tap Convert to JPG and download each page image"],
    faqs: [
      { q: "Is my PDF uploaded anywhere?", a: "No. Your PDF is turned into images entirely on your phone or browser. Only the PDF reader library (pdf.js) is loaded once from the internet, so you need a connection the first time." },
      { q: "How many pages can I convert at once?", a: "Up to 50 pages at a time. For longer PDFs, type a page range such as 1-50, then 51-100." },
      { q: "What is the difference between normal and high quality?", a: "Normal makes an A4 page about 892 × 1262 pixels with a smaller file. High makes bigger, sharper images but larger files." },
      { q: "Can I download all pages at once?", a: "No, each page image has its own download button." },
      { q: "Can I convert a password protected PDF?", a: "No. Password protected or damaged PDFs cannot be opened." },
    ],
  },
  "compress-pdf": {
    title: "Compress PDF",
    desc: "Shrink scanned or image-based PDFs with three compression levels and see the size before and after. Your PDF is not uploaded, everything happens on your phone.",
    howTo: ["Select a PDF", "Choose light, balanced or strong compression", "Tap Compress PDF, check the before and after size and download it"],
    faqs: [
      { q: "Is my PDF uploaded anywhere?", a: "No. Compression happens entirely on your phone or browser. Only the PDF reader library (pdf.js) is loaded once from the internet, so you need a connection the first time." },
      { q: "Which PDFs does it work best on?", a: "Scanned papers, image-based PDFs and PDFs of phone photos. Files like these often shrink a lot, sometimes by 80% or more, though it varies from file to file." },
      { q: "Can I still copy text after compressing?", a: "No. This tool turns every page into an image to build the new PDF, so text can no longer be selected, copied or searched. Keep the original if you need the text." },
      { q: "Why did the size not go down?", a: "Text-based PDFs are usually small already, so the new file can even be bigger. In that case the tool hides the download button and you should keep the original." },
      { q: "Which level should I pick?", a: "Start with balanced. Choose strong to go smaller, or light if text looks blurry." },
      { q: "How many pages can it handle?", a: "Up to 60 pages and 50 MB. Split bigger PDFs first with Split PDF." },
    ],
  },
  "passport-fee-calculator-bd": {
    title: "Passport Fee Calculator BD",
    desc: "Pick 48 or 64 pages, 5 or 10 years and a delivery type to see the e-passport fee. 15% VAT included.",
    howTo: ["Choose the booklet pages (48 or 64)", "Choose the validity (5 or 10 years) and the delivery type", "See the fee and confirm it on the official portal before you apply"],
    faqs: [
      { q: "What is the fee for a 48 page, 5 year regular e-passport?", a: "According to this tool's list it is 4,025 taka including 15% VAT. Fees can change, so check epassport.gov.bd before you apply." },
      { q: "Is VAT included?", a: "Yes, every fee here includes 15% VAT." },
      { q: "Are child and renewal fees different?", a: "This tool only has the standard fees for a new e-passport. Fees for children, renewals, emergency passports, overseas missions and special concessions can differ, so check the official portal." },
      { q: "Is this an official government tool?", a: "No. This is an independent website. The fee list is taken from published information and is not connected to any government body. Check the final fee on the official portal." },
    ],
  },
  "bdt-currency-converter": {
    title: "BDT Currency Converter",
    desc: "Convert taka to dollars, riyals, dirhams, rupees, pounds and more at a daily reference rate.",
    howTo: ["Enter an amount", "Choose which currency to convert from and to", "See the result and the date of the rate"],
    faqs: [
      { q: "Where do the rates come from?", a: "From an open currency rate dataset that updates once a day. It is a mid-market (reference) rate, and the rate date is shown under the result." },
      { q: "Why does it differ from my bank or exchange house?", a: "Banks, exchange houses and money changers use their own buying and selling rates, which differ from the mid-market rate. Check theirs before you transact." },
      { q: "Is this the rate used to send remittance?", a: "No. Remittance rates and fees depend on the service you use. This tool is only for estimating." },
      { q: "Does it work offline?", a: "No, it needs an internet connection to fetch the rates. The amount you type is never sent anywhere." },
    ],
  },
  "electricity-bill-calculator-bd": {
    title: "Electricity Bill Calculator BD",
    desc: "Estimate your monthly residential (LT-A) electricity bill from units used, sanctioned load and 5% VAT, with a slab by slab breakdown.",
    howTo: ["Enter the units you used in the month", "Enter your sanctioned load in kW and check the demand charge", "Tap Calculate Bill and compare the breakdown with your bill"],
    faqs: [
      { q: "Which rates does it use?", a: "The residential (LT-A) rates effective from the June 2026 billing month: 5.26 taka up to 75 units, 8.50 for 76-200, 9.10 for 201-300, 9.62 for 301-400, 15.01 for 401-600 and 17.35 above 600. With 50 units or fewer, all units are charged 4.63 taka. BERC withdrew its 3 June hike for the 0-50 and 0-75 unit slabs on 4 June, so those two rates stay as before." },
      { q: "Is each rate applied to all my units?", a: "No. Each rate applies only to the units inside its slab. For example, with 200 units the first 75 are charged 5.26 and the next 125 are charged 8.50." },
      { q: "What is the demand charge?", a: "A fixed monthly charge based on your sanctioned load in kW, whatever your usage. This tool uses 42 taka per kW, and you can change it to match your bill." },
      { q: "Why is my bill different from the result?", a: "Your bill can include meter rent, arrears, late fees, rebates and a different demand charge, and your distribution company may apply its own rules. Use this as an estimate and trust the bill you receive." },
      { q: "Does it work for commercial or industrial connections?", a: "No. It is only for residential (LT-A) customers." },
    ],
  },
  "number-to-words-bd": {
    title: "Number to Words BD",
    desc: "Write a taka amount in Bangla and English words, for example 12345 taka = Twelve Thousand Three Hundred Forty Five Taka Only. Lakh-crore system, paisa included.",
    howTo: ["Type the taka amount in numbers (commas and Bangla digits also work)", "See the Bangla and English words below", "Tap Copy and paste it into your cheque or form"],
    faqs: [
      { q: "How are paisa shown?", a: "Type up to two decimal places and the words read \"Taka ... Paisa Only\". For example 100.50 reads One Hundred Taka Fifty Paisa Only." },
      { q: "What is the largest number it accepts?", a: "Up to 14 digits, which is plenty for everyday cheques and bills." },
      { q: "Why lakh and crore instead of million and billion?", a: "Banks and offices in Bangladesh use the lakh and crore system, so the English words use Lakh and Crore too." },
      { q: "What should I do before writing it on a cheque?", a: "Check the spelling once. Some banks and offices prefer a slightly different Bangla spelling for hundreds, so change it yourself if needed." },
    ],
  },
  "zakat-calculator-bd": {
    title: "Zakat Calculator BD",
    desc: "Work out your zakat from cash, gold, silver, business stock and money owed to you, minus debts. Nisab is 7.5 vori of gold or 52.5 vori of silver, rate 2.5%.",
    howTo: ["Choose silver or gold and type today's price per vori", "Enter your cash, gold, silver, business goods, money owed and debts", "Tap Calculate Zakat to see the result"],
    faqs: [
      { q: "What is the nisab?", a: "The price of 7.5 vori of gold or 52.5 vori of silver. With 1 vori = 11.664 g, that is about 87.48 g of gold or 612.36 g of silver." },
      { q: "What is the zakat rate?", a: "2.5% of net wealth, which is 2.5 taka for every 100 taka." },
      { q: "Should I use silver or gold for the nisab?", a: "Scholars differ on this. Many use the silver nisab because it is lower, so more people owe zakat. Ask your local scholar." },
      { q: "Are debts subtracted?", a: "Yes, this tool subtracts your debts from total wealth to get net wealth. Ask a scholar which debts count in your case." },
      { q: "Is this a religious ruling?", a: "No. It is a general calculation tool. For the conditions and special cases, speak to a scholar or an Islamic institution." },
    ],
  },
  "gold-weight-converter-bd": {
    title: "Gold Weight Converter BD",
    desc: "Convert gold or silver weight between vori, ana, roti and grams. 1 vori = 11.664 grams. Optional price calculation.",
    howTo: ["Enter vori, ana and roti or enter grams", "See the converted weight right away", "Optionally enter the price per vori to get the total value"],
    faqs: [
      { q: "How many grams is 1 vori?", a: "In Bangladesh 1 vori = 11.664 grams. 1 vori = 16 ana = 96 roti, so 1 ana = 0.729 g and 1 roti = 0.1215 g." },
      { q: "How many ana and roti are in 1 vori?", a: "1 vori is 16 ana and 1 ana is 6 roti, so 1 vori has 96 roti." },
      { q: "Does it handle 22 carat or 21 carat gold?", a: "Weight conversion does not depend on carat. Prices differ by carat, so type the price per vori for your carat in the price box." },
      { q: "Does it show today's gold price?", a: "No. Prices change daily, so type today's price yourself from the BAJUS rate." },
    ],
  },
  "income-tax-calculator-bd": {
    title: "Income Tax Calculator BD",
    desc: "Estimate an individual taxpayer's income tax from monthly or yearly income, with tax slabs, investment rebate and minimum tax. Income year 2026-27, Finance Act 2026.",
    howTo: ["Enter your income (per month or per year) and any tax-exempt part", "Choose general taxpayer, or type your own tax-free limit", "Add any eligible investment and tap Calculate Tax"],
    faqs: [
      { q: "What is the tax-free income limit?", a: "Under the Finance Act 2026 it is 4,00,000 taka for a general taxpayer for 2026-27. Women, people aged 65+, people with disabilities and freedom fighters have higher limits, so choose Other and type your own." },
      { q: "What are the tax rates?", a: "After the tax-free limit: 10% on the next 3 lakh, 15% on the next 4 lakh, 20% on the next 5 lakh, 25% on the next 20 lakh and 30% on the rest." },
      { q: "What is the minimum tax?", a: "Usually 5,000 taka when income is above the tax-free limit. New taxpayers are reported to pay 1,000, so the box can be changed." },
      { q: "How is the investment rebate worked out?", a: "In this tool the rebate is the lowest of 3% of taxable income, 10% of eligible investment and 7,50,000 taka. Check the NBR's list of eligible investments." },
      { q: "Which part of my salary is tax free?", a: "Some parts of salary are exempt. Get that amount from your payslip or a tax adviser and type it in the tax-exempt box. If you leave it empty, all income is treated as taxable." },
      { q: "Can I file my return with this?", a: "No, it is only an estimate. Check nbr.gov.bd or a tax adviser before you file." },
    ],
  },
  "fdr-dps-calculator-bd": {
    title: "FDR DPS Calculator BD",
    desc: "Work out how much you get at maturity from an FDR or a DPS. Enter the interest rate, term and source tax (10% or 15%) to see total interest and the amount in hand.",
    howTo: ["Choose FDR or DPS", "Enter the deposit or monthly installment, interest rate and term in months", "Pick the source tax rate and tap Calculate"],
    faqs: [
      { q: "How is FDR interest worked out?", a: "With compound interest, the maturity amount = principal × (1 + rate ÷ times per year)^(times per year × years). Most banks use quarterly compounding." },
      { q: "How much tax is cut from the interest?", a: "Source tax is generally 10% with a TIN and 15% without one. Check your bank's rate." },
      { q: "How does the DPS calculation work?", a: "This tool takes each installment at the start of the month with monthly compounding. Banks differ, so the result is an estimate." },
      { q: "Is excise duty included?", a: "No. Banks deduct excise duty on FDR balances depending on the amount, and it is not included here." },
      { q: "Why does my bank show a different figure?", a: "Banks can differ in when they add interest, how they count days and which charges they apply. The maturity figure your bank states is final." },
    ],
  },
  "bangla-calendar": {
    title: "Bangla Calendar",
    desc: "See today's Bangla date, browse a Gregorian and Bangla calendar and convert dates, using Bangladesh's revised Bangla calendar.",
    howTo: ["See today's Bangla date and season", "Change the month to browse the calendar", "Use the date converter to go from Gregorian to Bangla or the other way round"],
    faqs: [
      { q: "When is Pohela Boishakh?", a: "On 14 April every year in Bangladesh's revised calendar." },
      { q: "How many days does Falgun have?", a: "29 days in a normal year and 30 in a Gregorian leap year." },
      { q: "Will it match West Bengal's dates?", a: "No. This follows Bangladesh's calendar. West Bengal uses a different calendar, where Pohela Boishakh is usually on 15 April." },
    ],
  },
};
