// Edit this one line if your contact email changes (used on About, Contact, Privacy, Disclaimer, schema)
export const CONTACT_EMAIL = "bdtoolhudadmin@gmail.com";

const BN = "০১২৩৪৫৬৭৮৯";
export const toBnDigits = (n: number) => String(n).replace(/\d/g, (d) => BN[+d]);
