export type Difficulty = "Asan" | "Orta" | "Çətin";

export type MathTask = {
  id: string;
  grade: number;
  topicSlug: string;
  topicTitle: string;
  skill: string;
  difficulty: Difficulty;
  sourceStyle: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type TopicPack = {
  grade: number;
  slug: string;
  title: string;
  description: string;
  lesson: string;
  example: string;
  xp: number;
  tasks: MathTask[];
};

const sourceStyles = ["Azərbaycan kurikulumu", "PISA tipli düşünmə", "TIMSS tipli test", "Olimpiada başlanğıc", "Real həyat məsələsi"];

function task(input: Omit<MathTask, "id" | "sourceStyle"> & { index: number }) {
  return {
    ...input,
    id: `g${input.grade}-${input.topicSlug}-${input.index}`,
    sourceStyle: sourceStyles[input.index % sourceStyles.length]
  };
}

function numericOptions(answer: number, spread = 2) {
  return [answer, answer + spread, Math.max(0, answer - spread), answer + spread * 2].map(String);
}

function arithmeticPack(grade: number): TopicPack {
  const a = grade * 7 + 8;
  const b = grade * 5 + 6;
  const c = grade + 3;
  const slug = "hesab-emelleri";
  const title = "Hesab əməlləri və çevik hesablama";
  const tasks = [
    task({ grade, topicSlug: slug, topicTitle: title, index: 0, skill: "Toplama", difficulty: "Asan", question: `${a} + ${b} neçədir?`, options: numericOptions(a + b, grade + 1), answer: String(a + b), explanation: `${a} üzərinə ${b} əlavə edirik: ${a} + ${b} = ${a + b}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 1, skill: "Çıxma", difficulty: "Asan", question: `${a + b + 20} - ${b} neçədir?`, options: numericOptions(a + 20, c), answer: String(a + 20), explanation: `Çıxma toplamanın tərsidir: ${a + b + 20} - ${b} = ${a + 20}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 2, skill: "Vurma", difficulty: "Orta", question: `${c} × ${grade + 4} neçədir?`, options: numericOptions(c * (grade + 4), grade), answer: String(c * (grade + 4)), explanation: `${c} ədədini ${grade + 4} dəfə toplayırıq: nəticə ${c * (grade + 4)}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 3, skill: "Əməl ardıcıllığı", difficulty: "Orta", question: `${c} + ${grade + 2} × 3 ifadəsinin qiyməti neçədir?`, options: numericOptions(c + (grade + 2) * 3, 3), answer: String(c + (grade + 2) * 3), explanation: `Əvvəl vurma aparılır: ${grade + 2} × 3 = ${(grade + 2) * 3}, sonra ${c} əlavə olunur.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 4, skill: "Məntiqi hesablama", difficulty: "Çətin", question: `Bir şagird ${grade + 4} gün hər gün ${c} məsələ həll etdi. Cəmi neçə məsələdir?`, options: numericOptions((grade + 4) * c, 4), answer: String((grade + 4) * c), explanation: `Hər gün eyni sayda məsələdirsə, gün sayı ilə gündəlik sayı vururuq: ${grade + 4} × ${c}.` })
  ];
  return { grade, slug, title, description: "Sürətli, dəqiq və məntiqli hesablamanı möhkəmləndir.", lesson: "Əvvəl əməl ardıcıllığını yoxla: mötərizə, vurma-bölmə, sonra toplama-çıxma. Real məsələlərdə verilənləri ayrıca yazmaq səhvi azaldır.", example: `${c} + ${grade + 2} × 3 = ${c + (grade + 2) * 3}`, xp: 80, tasks };
}

function fractionsPack(grade: number): TopicPack {
  const slug = "kesrler";
  const title = "Kəsrlər, nisbət və faiz";
  const d = grade + 4;
  const n = Math.max(1, grade - 2);
  const tasks = [
    task({ grade, topicSlug: slug, topicTitle: title, index: 0, skill: "Eyni məxrəc", difficulty: "Asan", question: `${n}/${d} + 2/${d} neçədir?`, options: [`${n + 2}/${d}`, `${n + 2}/${d + 2}`, `${n}/${d + 2}`, `${n + 1}/${d}`], answer: `${n + 2}/${d}`, explanation: "Məxrəclər eynidirsə, yalnız surətləri toplayırıq və məxrəci saxlayırıq." }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 1, skill: "Sadələşdirmə", difficulty: "Orta", question: `${2 * n}/${2 * d} kəsrinin sadə forması hansıdır?`, options: [`${n}/${d}`, `${2 * n}/${d}`, `${n}/${2 * d}`, `${d}/${n}`], answer: `${n}/${d}`, explanation: `Surət və məxrəc 2-yə bölünür: ${2 * n}/${2 * d} = ${n}/${d}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 2, skill: "Faiz", difficulty: "Orta", question: `${grade * 10}% ədədinin onluq yazılışı hansıdır?`, options: [`${grade / 10}`, `${grade}`, `0.0${grade}`, `${grade * 10}`], answer: `${grade / 10}`, explanation: "Faizi onluğa çevirmək üçün 100-ə bölürük." }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 3, skill: "Nisbət", difficulty: "Çətin", question: `Sinifdə oğlan:qız nisbəti ${grade}:${grade + 2}-dir. Qızlar ${grade + 2} hissədirsə, ümumi hissə neçədir?`, options: numericOptions(2 * grade + 2, 2), answer: String(2 * grade + 2), explanation: `Ümumi hissə nisbətin hissələrinin cəmidir: ${grade} + ${grade + 2} = ${2 * grade + 2}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 4, skill: "Müqayisə", difficulty: "Çətin", question: `Hansı daha böyükdür: ${n}/${d} yoxsa ${n + 1}/${d}?`, options: [`${n + 1}/${d}`, `${n}/${d}`, "Bərabərdir", "Müqayisə etmək olmaz"], answer: `${n + 1}/${d}`, explanation: "Məxrəclər eyni olduqda surəti böyük olan kəsr daha böyükdür." })
  ];
  return { grade, slug, title, description: "Kəsr, faiz və nisbət suallarını addım-addım həll et.", lesson: "Kəsrdə məxrəc bütövün neçə hissəyə bölündüyünü, surət isə neçə hissə götürüldüyünü göstərir. Faiz isə 100 üzərindən pay deməkdir.", example: `${n}/${d} + 2/${d} = ${n + 2}/${d}`, xp: 100, tasks };
}

function geometryPack(grade: number): TopicPack {
  const slug = "hendese";
  const title = "Həndəsə və ölçmə";
  const l = grade + 5;
  const w = grade + 2;
  const tasks = [
    task({ grade, topicSlug: slug, topicTitle: title, index: 0, skill: "Perimetr", difficulty: "Asan", question: `Uzunluğu ${l} sm, eni ${w} sm olan düzbucaqlının perimetri neçə sm-dir?`, options: numericOptions(2 * (l + w), 4), answer: String(2 * (l + w)), explanation: `Düzbucaqlının perimetri 2 × (uzunluq + en): 2 × (${l}+${w}) = ${2 * (l + w)}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 1, skill: "Sahə", difficulty: "Orta", question: `Uzunluğu ${l} sm, eni ${w} sm olan düzbucaqlının sahəsi neçə sm²-dir?`, options: numericOptions(l * w, 5), answer: String(l * w), explanation: `Sahə uzunluq × en ilə tapılır: ${l} × ${w} = ${l * w}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 2, skill: "Bucaq", difficulty: "Orta", question: `Üçbucağın iki bucağı ${40 + grade}° və ${50 + grade}°-dir. Üçüncü bucaq neçə dərəcədir?`, options: numericOptions(180 - (90 + 2 * grade), 5), answer: String(180 - (90 + 2 * grade)), explanation: `Üçbucağın daxili bucaqlarının cəmi 180°-dir.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 3, skill: "Həcm", difficulty: "Çətin", question: `Kənarı ${grade + 1} sm olan kubun həcmi neçə sm³-dir?`, options: numericOptions((grade + 1) ** 3, grade + 3), answer: String((grade + 1) ** 3), explanation: `Kubun həcmi a³-dür: ${grade + 1}³ = ${(grade + 1) ** 3}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 4, skill: "Koordinat", difficulty: "Çətin", question: `A(${grade}, ${grade + 2}) nöqtəsi sağa 3 vahid sürüşdürülür. Yeni x koordinatı neçədir?`, options: numericOptions(grade + 3, 1), answer: String(grade + 3), explanation: "Sağa sürüşmə x koordinatını artırır, y dəyişmir." })
  ];
  return { grade, slug, title, description: "Fiqurlar, ölçülər, sahə, həcm və bucaq əlaqələri.", lesson: "Həndəsə suallarında əvvəl fiquru təsəvvür et, verilən ölçüləri yaz, sonra uyğun düsturu seç.", example: `P = 2 × (${l}+${w}) = ${2 * (l + w)}`, xp: 90, tasks };
}

function algebraPack(grade: number): TopicPack {
  const slug = "tenlikler-cebr";
  const title = "Tənliklər və cəbr";
  const x = grade + 2;
  const a = grade - 3;
  const b = grade + 5;
  const tasks = [
    task({ grade, topicSlug: slug, topicTitle: title, index: 0, skill: "Xətti tənlik", difficulty: "Asan", question: `x + ${b} = ${x + b}. x neçədir?`, options: numericOptions(x, 2), answer: String(x), explanation: `Hər iki tərəfdən ${b} çıxırıq: x = ${x + b} - ${b} = ${x}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 1, skill: "Vurma ilə tənlik", difficulty: "Orta", question: `${a}x = ${a * x}. x neçədir?`, options: numericOptions(x, 1), answer: String(x), explanation: `Hər iki tərəfi ${a}-ə bölürük və x = ${x} alınır.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 2, skill: "İfadə", difficulty: "Orta", question: `a=${a}, b=${b} olarsa, 2a+b neçədir?`, options: numericOptions(2 * a + b, 3), answer: String(2 * a + b), explanation: `2a+b = 2×${a}+${b} = ${2 * a + b}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 3, skill: "Kvadrat tənlik", difficulty: "Çətin", question: `x² - ${2 * x}x + ${x * x} = 0 tənliyinin kökü hansıdır?`, options: [String(x), String(x + 1), String(x - 1), "0"], answer: String(x), explanation: `Bu ifadə (x-${x})² formasındadır, ona görə kök ${x}-dir.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 4, skill: "Mətnli tənlik", difficulty: "Çətin", question: `Bir ədədin ${a} misli ${a * x}-dir. Ədəd neçədir?`, options: numericOptions(x, 2), answer: String(x), explanation: `Naməlum ədədə x desək, ${a}x=${a * x}; bölmə ilə x=${x}.` })
  ];
  return { grade, slug, title, description: "Naməlumu tap, ifadəni sadələşdir və model qur.", lesson: "Tənlik tərəzidir: bir tərəfdə etdiyin əməli eyni şəkildə digər tərəfdə də etməlisən. Məqsəd naməlumu tək saxlamaqdır.", example: `x + ${b} = ${x + b} → x=${x}`, xp: 120, tasks };
}

function functionsPack(grade: number): TopicPack {
  const slug = "funksiyalar";
  const title = "Funksiyalar və qrafik düşüncə";
  const m = grade - 6;
  const k = grade + 1;
  const val = 3;
  const tasks = [
    task({ grade, topicSlug: slug, topicTitle: title, index: 0, skill: "Funksiya qiyməti", difficulty: "Asan", question: `f(x)=${m}x+${k}. f(${val}) neçədir?`, options: numericOptions(m * val + k, 2), answer: String(m * val + k), explanation: `x yerinə ${val} yazırıq: ${m}×${val}+${k}=${m * val + k}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 1, skill: "Meyl", difficulty: "Orta", question: `y=${m}x+${k} düz xəttinin meyli hansıdır?`, options: [String(m), String(k), String(m + k), "0"], answer: String(m), explanation: "y=mx+b formasında m düz xəttin meylidir." }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 2, skill: "Kəsişmə", difficulty: "Orta", question: `y=${m}x+${k} qrafiki y oxunu hansı nöqtədə kəsir?`, options: [String(k), String(m), String(-k), String(m * k)], answer: String(k), explanation: "x=0 olduqda y sərbəst həddə bərabər olur." }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 3, skill: "Ardıcıllıq", difficulty: "Çətin", question: `${k}, ${k + m}, ${k + 2 * m}, ... ardıcıllığında növbəti hədd hansıdır?`, options: [String(k + 3 * m), String(k + 2 * m + 1), String(k + m), String(k + 4 * m)], answer: String(k + 3 * m), explanation: `Hər dəfə ${m} əlavə olunur, növbəti hədd ${k + 3 * m}-dir.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 4, skill: "Model", difficulty: "Çətin", question: `Taksi haqqı ${k} AZN başlanğıc və hər km üçün ${Math.abs(m) + 1} AZN-dir. 3 km üçün neçə AZN?`, options: numericOptions(k + 3 * (Math.abs(m) + 1), 2), answer: String(k + 3 * (Math.abs(m) + 1)), explanation: `Model: ${k}+3×${Math.abs(m) + 1}=${k + 3 * (Math.abs(m) + 1)}.` })
  ];
  return { grade, slug, title, description: "Qrafik, ardıcıllıq və real həyat modelləri.", lesson: "Funksiya girişlə çıxış arasındakı qaydadır. Qaydanı tapmaq üçün x-in dəyişməsi ilə y-in necə dəyişdiyini izləyirik.", example: `f(${val})=${m}×${val}+${k}`, xp: 130, tasks };
}

function probabilityPack(grade: number): TopicPack {
  const slug = "statistika-ehtimal";
  const title = "Statistika və ehtimal";
  const red = grade + 1;
  const blue = grade + 3;
  const total = red + blue;
  const nums = [grade, grade + 2, grade + 4, grade + 6];
  const mean = nums.reduce((sum, item) => sum + item, 0) / nums.length;
  const tasks = [
    task({ grade, topicSlug: slug, topicTitle: title, index: 0, skill: "Ehtimal", difficulty: "Asan", question: `Qutuda ${red} qırmızı və ${blue} göy top var. Qırmızı top seçmə ehtimalı hansıdır?`, options: [`${red}/${total}`, `${blue}/${total}`, `${total}/${red}`, `1/${total}`], answer: `${red}/${total}`, explanation: `Ehtimal əlverişli hallar / bütün hallar = ${red}/${total}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 1, skill: "Orta qiymət", difficulty: "Orta", question: `${nums.join(", ")} ədədlərinin ədədi ortası neçədir?`, options: [String(mean), String(mean + 1), String(mean - 1), String(mean * 2)], answer: String(mean), explanation: `Ədədləri toplayıb sayına bölürük: ${nums.reduce((s, n) => s + n, 0)}/4=${mean}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 2, skill: "Median", difficulty: "Orta", question: `${nums.join(", ")} sıralamasında median neçədir?`, options: [String((nums[1] + nums[2]) / 2), String(nums[1]), String(nums[2]), String(mean + 2)], answer: String((nums[1] + nums[2]) / 2), explanation: "Dörd ədəd olduqda median ortadakı iki ədədin ortasıdır." }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 3, skill: "Faizli artım", difficulty: "Çətin", question: `${grade * 10} göstəricisi 10% artdı. Yeni göstərici neçədir?`, options: [String(grade * 11), String(grade * 10 + 10), String(grade * 9), String(grade * 12)], answer: String(grade * 11), explanation: `10% artım 1.1-ə vurmaqdır: ${grade * 10}×1.1=${grade * 11}.` }),
    task({ grade, topicSlug: slug, topicTitle: title, index: 4, skill: "Məlumat oxuma", difficulty: "Çətin", question: `Bir həftədə həll olunan testlər: ${grade}, ${grade + 1}, ${grade + 2}, ${grade + 3}. Ən böyük və ən kiçik fərqi neçədir?`, options: ["3", "4", "2", String(grade)], answer: "3", explanation: `Fərq maksimum-minimumdur: ${grade + 3}-${grade}=3.` })
  ];
  return { grade, slug, title, description: "Məlumatı oxu, ehtimalı hesabla və nəticə çıxar.", lesson: "Statistika məlumatdan nəticə çıxarmaq üçündür. Ehtimal isə bir hadisənin baş vermə şansını ölçür.", example: `P(qırmızı)=${red}/${total}`, xp: 110, tasks };
}

function gradePacks(grade: number): TopicPack[] {
  if (grade <= 4) return [arithmeticPack(grade), geometryPack(grade), probabilityPack(grade), fractionsPack(grade)];
  if (grade <= 7) return [fractionsPack(grade), algebraPack(grade), geometryPack(grade), probabilityPack(grade)];
  if (grade <= 9) return [algebraPack(grade), functionsPack(grade), geometryPack(grade), probabilityPack(grade)];
  return [functionsPack(grade), algebraPack(grade), geometryPack(grade), probabilityPack(grade)];
}

export const taskBank: TopicPack[] = Array.from({ length: 11 }, (_, index) => gradePacks(index + 1)).flat();

export function getTopicsForGrade(grade: number) {
  return taskBank.filter((topic) => topic.grade === grade);
}

export function getTopicPack(grade: number, slug: string) {
  return taskBank.find((topic) => topic.grade === grade && topic.slug === slug);
}
