const FIRST_GENERATION_YEAR = 2021;
const ACTIVE_GENERATION_COUNT = 4;
const SEPTEMBER_MONTH_INDEX = 8;

export const ALL_GENERATIONS = "All Gen";

export const getActiveGenerationYears = (
  referenceDate = new Date()
): string[] => {
  const currentYear = referenceDate.getFullYear();
  const newestYear =
    referenceDate.getMonth() >= SEPTEMBER_MONTH_INDEX
      ? currentYear
      : currentYear - 1;

  return Array.from(
    { length: ACTIVE_GENERATION_COUNT },
    (_, index) => String(newestYear - ACTIVE_GENERATION_COUNT + 1 + index)
  );
};

export const getGenerationOptions = (
  referenceDate = new Date()
): string[] => [
  ...getActiveGenerationYears(referenceDate),
  ALL_GENERATIONS,
];

const yearFromGenerationNumber = (generation: number): string =>
  String(FIRST_GENERATION_YEAR + generation - 1);

const generationNumberFromYear = (year: string): number | null => {
  if (!/^\d{4}$/.test(year)) return null;

  const generation = Number(year) - FIRST_GENERATION_YEAR + 1;
  return generation > 0 ? generation : null;
};

const expandGenerationValue = (value: string): string[] => {
  const rangeMatch = /^Gen\s+(\d+)\s*-\s*(?:Gen\s*)?(\d+)$/i.exec(value);

  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);

    if (start <= end) {
      return Array.from(
        { length: end - start + 1 },
        (_, index) => yearFromGenerationNumber(start + index)
      );
    }
  }

  const generationMatch = /^Gen\s+(\d+)$/i.exec(value);
  if (generationMatch) {
    return [yearFromGenerationNumber(Number(generationMatch[1]))];
  }

  return [value];
};

export const normalizeEligibleGenerationYears = (value: unknown): string[] => {
  const values = Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : typeof value === "string"
      ? value.split(",")
      : [];

  const normalized = values
    .map((item) => item.trim())
    .filter(Boolean)
    .flatMap(expandGenerationValue);

  return [...new Set(normalized)];
};

export const formatEligibleGenerations = (value?: string): string => {
  if (!value) return "";

  const years = normalizeEligibleGenerationYears(value);
  if (years.includes(ALL_GENERATIONS)) return ALL_GENERATIONS;

  const generationNumbers = years
    .map(generationNumberFromYear)
    .filter((generation): generation is number => generation !== null)
    .sort((left, right) => left - right);

  const unknownValues = years.filter(
    (year) => generationNumberFromYear(year) === null
  );

  const labels: string[] = [];
  let start = generationNumbers[0];
  let end = start;

  for (const generation of generationNumbers.slice(1)) {
    if (generation === end + 1) {
      end = generation;
      continue;
    }

    labels.push(start === end ? `Gen ${start}` : `Gen ${start} - ${end}`);
    start = generation;
    end = generation;
  }

  if (start !== undefined) {
    labels.push(start === end ? `Gen ${start}` : `Gen ${start} - ${end}`);
  }

  return [...labels, ...unknownValues].join(", ");
};
