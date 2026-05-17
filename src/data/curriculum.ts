export const grades = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  label: `${index + 1}-ci sinif`,
  focus: ["Ədədlər", "Məntiq", "Məsələ həlli", "Riyazi düşüncə"][Math.min(index, 3)]
}));

export const topicMap = [
  "Hesab əməlləri",
  "Kəsrlər və onluq ədədlər",
  "Həndəsə",
  "Cəbr",
  "Funksiyalar",
  "Ehtimal",
  "Triqonometriya",
  "Tənliklər",
  "Məntiq",
  "Mətnli məsələlər",
  "Statistika",
  "Olimpiada hazırlığı"
];

export const sampleLessons = [
  {
    grade: 6,
    topic: "Kəsrlər",
    title: "Kəsrlərin toplanması",
    explanation: "Məxrəclər eyni olduqda surətləri toplayırıq, məxrəci saxlayırıq. Məxrəclər fərqlidirsə, əvvəl ortaq məxrəc tapırıq.",
    example: "1/4 + 2/4 = 3/4"
  },
  {
    grade: 9,
    topic: "Kvadrat tənliklər",
    title: "Diskriminant üsulu",
    explanation: "ax²+bx+c=0 formasında D=b²-4ac hesablanır. D müsbətdirsə iki kök, sıfırdırsa bir kök, mənfidirsə real kök yoxdur.",
    example: "x²-5x+6=0 üçün D=1, köklər 2 və 3-dür."
  }
];

export const sampleQuiz = [
  { question: "3/5 + 1/5 neçədir?", options: ["4/5", "4/10", "3/10", "1"], answer: "4/5" },
  { question: "2x + 6 = 14 tənliyində x neçədir?", options: ["3", "4", "5", "8"], answer: "4" },
  { question: "Üçbucağın daxili bucaqlarının cəmi neçə dərəcədir?", options: ["90", "180", "270", "360"], answer: "180" }
];
