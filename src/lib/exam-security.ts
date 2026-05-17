export function shuffleForExam<T>(items: T[], enabled = true) {
  if (!enabled) return [...items];
  return [...items].sort(() => Math.random() - 0.5);
}

export function computeViolationRisk(violations: number, submittedLate: boolean) {
  if (submittedLate || violations >= 5) return "HIGH";
  if (violations >= 2) return "MEDIUM";
  return "LOW";
}
