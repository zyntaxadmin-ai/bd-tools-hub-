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
    title: "bKash Charge Calculator",
    desc: "Calculate bKash Cash Out and Send Money charges easily.",
    howTo: ["Enter the amount", "Choose Cash Out or Send Money", "See the charge and the total"],
    faqs: [
      { q: "Is the charge always the same?", a: "No. bKash can change its charges at any time. Check the official charge chart to confirm." },
      { q: "What is the Cash Out charge on 1,000 taka?", a: "This calculator uses 18.5 taka." },
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
    title: "CGPA Calculator",
    desc: "Calculate your CGPA from semester GPA and credits, on a 4.00 or 5.00 scale.",
    howTo: ["Choose the 4.00 or 5.00 scale", "Enter the GPA and credits for each semester", "Add more semesters if needed and read your CGPA"],
    faqs: [
      { q: "How is CGPA calculated?", a: "Each semester's GPA is multiplied by its credits, the results are added, then divided by the total credits." },
      { q: "Is it the same for every university?", a: "No. Grading systems and retake or improvement rules differ. Check your final CGPA with your university." },
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
