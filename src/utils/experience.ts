/**
 * Calculates full years of experience from September 11, 2011.
 */
export function getYearsOfExperience(startDateStr: string = '2011-09-11'): number {
  const startDate = new Date(startDateStr);
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }

  return years;
}

export function getExperienceText(startDateStr: string = '2011-09-11'): string {
  const years = getYearsOfExperience(startDateStr);
  return `${years}+`;
}
