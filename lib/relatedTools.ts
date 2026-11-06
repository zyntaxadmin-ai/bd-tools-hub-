// Tools that belong together. On a tool page, the other tools in its group are shown first
// in "related tools", then the rest of the same category. This links similar pages to each other.
const GROUPS: string[][] = [
  ["bkash-calculator", "nagad-calculator", "rocket-calculator", "upay-calculator"],
  ["gpa-calculator-bd", "cgpa-calculator"],
  ["stopwatch-timer", "countdown-timer"],
];

/** Slugs (without the /tool/ prefix) that should be listed first for this tool, in order. */
export function preferredRelated(slug: string): string[] {
  const key = slug.replace("/tool/", "");
  const group = GROUPS.find((g) => g.includes(key));
  return group ? group.filter((s) => s !== key) : [];
}
