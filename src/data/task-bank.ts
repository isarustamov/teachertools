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
const difficulties: Difficulty[] = ["Asan", "Orta", "Orta", "Çətin"];

type TopicMeta = {
  slug: string;
  title: string;
  description: string;
  lesson: string;
  example: string;
  xp: number;
  builder: (grade: number, index: number, meta: TopicMeta) => Omit<MathTask, "id" | "grade" | "topicSlug" | "topicTitle" | "sourceStyle">;
};

function uniqueOptions(values: Array<number | string>, answer: number | string) {
  const normalized = [answer, ...values].map(String);
  const unique = Array.from(new Set(normalized));
  while (unique.length < 4) unique.push(`${answer}-${unique.length}`);
  return unique.slice(0, 4);
}

function task(grade: number, index: number, meta: TopicMeta): MathTask {
  const built = meta.builder(grade, index, meta);
  return {
    ...built,
    id: `g${grade}-${meta.slug}-${index}`,
    grade,
    topicSlug: meta.slug,
    topicTitle: meta.title,
    sourceStyle: sourceStyles[index % sourceStyles.length]
  };
}

function arithmeticBuilder(grade: number, index: number) {
  const a = grade * 10 + index * 3 + 8;
  const b = grade * 4 + index + 6;
  const mode = index % 4;
  if (mode === 0) {
    const answer = a + b;
    return { skill: "Toplama", difficulty: difficulties[index % 4], question: `${a} + ${b} neçədir?`, options: uniqueOptions([answer + 4, answer - 3, answer + 9], answer), answer: String(answer), explanation: `Toplama aparırıq: ${a} + ${b} = ${answer}.` };
  }
  if (mode === 1) {
    const answer = a - b;
    return { skill: "Çıxma", difficulty: difficulties[index % 4], question: `${a} - ${b} neçədir?`, options: uniqueOptions([answer + 5, answer - 2, answer + 10], answer), answer: String(answer), explanation: `Böyük ədəddən kiçik ədədi çıxırıq: ${a} - ${b} = ${answer}.` };
  }
  if (mode === 2) {
    const x = grade + 2 + (index % 6);
    const y = 3 + (index % 7);
    const answer = x * y;
    return { skill: "Vurma", difficulty: difficulties[index % 4], question: `${x} × ${y} neçədir?`, options: uniqueOptions([answer + y, answer - x, answer + x], answer), answer: String(answer), explanation: `${x} ədədini ${y} dəfə götürürük: ${answer}.` };
  }
  const answer = (grade + index) + (grade + 2) * 3;
  return { skill: "Əməl ardıcıllığı", difficulty: "Çətin" as Difficulty, question: `${grade + index} + ${grade + 2} × 3 ifadəsinin qiyməti neçədir?`, options: uniqueOptions([answer + 3, answer - 3, (grade + index + grade + 2) * 3], answer), answer: String(answer), explanation: `Əvvəl vurma: ${grade + 2}×3=${(grade + 2) * 3}, sonra toplama: nəticə ${answer}.` };
}

function fractionBuilder(grade: number, index: number) {
  const d = grade + 5 + (index % 5);
  const n = 1 + (index % Math.max(2, d - 2));
  if (index % 4 === 0) {
    const answer = `${n + 2}/${d}`;
    return { skill: "Eyni məxrəc", difficulty: "Asan" as Difficulty, question: `${n}/${d} + 2/${d} neçədir?`, options: uniqueOptions([`${n + 1}/${d}`, `${n + 2}/${d + 2}`, `${n}/${d + 2}`], answer), answer, explanation: "Məxrəclər eyni olduğuna görə surətləri toplayırıq, məxrəci saxlayırıq." };
  }
  if (index % 4 === 1) {
    const answer = `${n}/${d}`;
    return { skill: "Sadələşdirmə", difficulty: "Orta" as Difficulty, question: `${2 * n}/${2 * d} kəsrinin sadə forması hansıdır?`, options: uniqueOptions([`${2 * n}/${d}`, `${n}/${2 * d}`, `${d}/${n}`], answer), answer, explanation: `Surət və məxrəc 2-yə bölünür: ${2 * n}/${2 * d} = ${answer}.` };
  }
  if (index % 4 === 2) {
    const percent = (index % 9 + 1) * 10;
    const answer = String(percent / 100);
    return { skill: "Faiz", difficulty: "Orta" as Difficulty, question: `${percent}% onluq yazılışda necədir?`, options: uniqueOptions([percent, percent / 10, `${percent}/10`], answer), answer, explanation: `Faizi onluğa çevirmək üçün 100-ə bölürük: ${percent}/100=${answer}.` };
  }
  const answer = String(2 * grade + index + 3);
  return { skill: "Nisbət", difficulty: "Çətin" as Difficulty, question: `Nisbət ${grade + index}:${grade + 3}-dür. Ümumi hissələrin sayı neçədir?`, options: uniqueOptions([Number(answer) + 2, Number(answer) - 2, grade + index], answer), answer, explanation: `Ümumi hissə nisbətin tərəflərinin cəmidir: ${grade + index}+${grade + 3}=${answer}.` };
}

function geometryBuilder(grade: number, index: number) {
  const l = grade + 5 + index;
  const w = grade + 2 + (index % 6);
  if (index % 4 === 0) {
    const answer = 2 * (l + w);
    return { skill: "Perimetr", difficulty: "Asan" as Difficulty, question: `Uzunluğu ${l} sm, eni ${w} sm olan düzbucaqlının perimetri neçə sm-dir?`, options: uniqueOptions([answer + 4, l * w, answer - 2], answer), answer: String(answer), explanation: `P=2×(uzunluq+en)=2×(${l}+${w})=${answer}.` };
  }
  if (index % 4 === 1) {
    const answer = l * w;
    return { skill: "Sahə", difficulty: "Orta" as Difficulty, question: `${l} sm və ${w} sm tərəfli düzbucaqlının sahəsi neçə sm²-dir?`, options: uniqueOptions([answer + l, 2 * (l + w), answer - w], answer), answer: String(answer), explanation: `Sahə uzunluq×en düsturu ilə tapılır: ${l}×${w}=${answer}.` };
  }
  if (index % 4 === 2) {
    const a = 35 + grade + (index % 10);
    const b = 55 + (index % 8);
    const answer = 180 - a - b;
    return { skill: "Bucaq", difficulty: "Orta" as Difficulty, question: `Üçbucağın iki bucağı ${a}° və ${b}°-dir. Üçüncü bucaq neçə dərəcədir?`, options: uniqueOptions([answer + 5, answer - 5, 180 - a], answer), answer: String(answer), explanation: `Üçbucağın daxili bucaqları 180° edir: 180-${a}-${b}=${answer}.` };
  }
  const side = grade + 1 + (index % 5);
  const answer = side ** 3;
  return { skill: "Həcm", difficulty: "Çətin" as Difficulty, question: `Kənarı ${side} sm olan kubun həcmi neçə sm³-dir?`, options: uniqueOptions([side ** 2, answer + side, answer - side], answer), answer: String(answer), explanation: `Kubun həcmi a³-dür: ${side}³=${answer}.` };
}

function equationBuilder(grade: number, index: number) {
  const x = grade + 2 + (index % 9);
  const b = grade + index + 4;
  if (index % 3 === 0) {
    return { skill: "Sadə tənlik", difficulty: "Asan" as Difficulty, question: `x + ${b} = ${x + b}. x neçədir?`, options: uniqueOptions([x + 1, x - 1, x + 3], x), answer: String(x), explanation: `Hər iki tərəfdən ${b} çıxırıq: x=${x}.` };
  }
  if (index % 3 === 1) {
    const a = 2 + (index % 5);
    return { skill: "Vurma ilə tənlik", difficulty: "Orta" as Difficulty, question: `${a}x = ${a * x}. x neçədir?`, options: uniqueOptions([x + 2, x - 2, a * x], x), answer: String(x), explanation: `Hər iki tərəfi ${a}-ə bölürük: x=${x}.` };
  }
  return { skill: "Mətnli tənlik", difficulty: "Çətin" as Difficulty, question: `Bir ədədin üzərinə ${b} əlavə etdikdə ${x + b} alınır. Ədəd neçədir?`, options: uniqueOptions([x + b, b, x + 1], x), answer: String(x), explanation: `Naməlum ədədi tapmaq üçün ${x + b}-${b}=${x}.` };
}

function statisticsBuilder(grade: number, index: number) {
  const nums = [grade + index, grade + index + 2, grade + index + 4, grade + index + 6];
  const mean = nums.reduce((sum, item) => sum + item, 0) / nums.length;
  if (index % 3 === 0) return { skill: "Ədədi orta", difficulty: "Orta" as Difficulty, question: `${nums.join(", ")} ədədlərinin ədədi ortası neçədir?`, options: uniqueOptions([mean + 1, mean - 1, mean + 2], mean), answer: String(mean), explanation: `Cəm ${nums.reduce((s, n) => s + n, 0)}-dir, 4-ə bölürük: ${mean}.` };
  if (index % 3 === 1) return { skill: "Median", difficulty: "Orta" as Difficulty, question: `${nums.join(", ")} verilənlərində median neçədir?`, options: uniqueOptions([nums[1], nums[2], mean + 2], mean), answer: String(mean), explanation: "Dörd ədəd olduqda median ortadakı iki ədədin ortasıdır." };
  const answer = nums[3] - nums[0];
  return { skill: "Dəyişmə aralığı", difficulty: "Asan" as Difficulty, question: `${nums.join(", ")} verilənlərində ən böyük və ən kiçik fərqi neçədir?`, options: uniqueOptions([answer + 1, answer - 1, nums[3]], answer), answer: String(answer), explanation: `Aralıq maksimum-minimumdur: ${nums[3]}-${nums[0]}=${answer}.` };
}

function probabilityBuilder(grade: number, index: number) {
  const red = grade + 1 + (index % 6);
  const blue = grade + 3 + (index % 5);
  const total = red + blue;
  if (index % 2 === 0) {
    const answer = `${red}/${total}`;
    return { skill: "Ehtimal", difficulty: "Orta" as Difficulty, question: `Qutuda ${red} qırmızı və ${blue} göy top var. Qırmızı seçmə ehtimalı hansıdır?`, options: uniqueOptions([`${blue}/${total}`, `1/${total}`, `${total}/${red}`], answer), answer, explanation: `Ehtimal əlverişli hallar / bütün hallar = ${red}/${total}.` };
  }
  const answer = `${blue}/${total}`;
  return { skill: "Əks hadisə", difficulty: "Çətin" as Difficulty, question: `Qutuda ${red} qırmızı və ${blue} göy top var. Göy top seçmə ehtimalı hansıdır?`, options: uniqueOptions([`${red}/${total}`, `1/${total}`, `${total}/${blue}`], answer), answer, explanation: `Göy topların sayı ${blue}, bütün toplar ${total}-dir; ehtimal ${answer}.` };
}

function functionBuilder(grade: number, index: number) {
  const m = Math.max(1, grade - 5 + (index % 4));
  const k = grade + index;
  const x = 2 + (index % 5);
  const answer = m * x + k;
  return { skill: index % 2 ? "Qrafik qaydası" : "Funksiya qiyməti", difficulty: index % 3 ? "Orta" as Difficulty : "Çətin" as Difficulty, question: `f(x)=${m}x+${k}. f(${x}) neçədir?`, options: uniqueOptions([answer + m, answer - m, k], answer), answer: String(answer), explanation: `x yerinə ${x} yazırıq: ${m}×${x}+${k}=${answer}.` };
}

function logicBuilder(grade: number, index: number) {
  const start = grade + index;
  const step = 2 + (index % 5);
  const answer = start + step * 4;
  return { skill: "Ardıcıllıq", difficulty: index % 3 ? "Orta" as Difficulty : "Çətin" as Difficulty, question: `${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ... növbəti ədəd hansıdır?`, options: uniqueOptions([answer + step, answer - step, start + step * 5], answer), answer: String(answer), explanation: `Ardıcıllıqda hər dəfə ${step} artır, növbəti hədd ${answer}-dir.` };
}

function wordProblemBuilder(grade: number, index: number) {
  const days = 3 + (index % 8);
  const daily = grade + 4 + (index % 7);
  const answer = days * daily;
  return { skill: "Mətnli məsələ", difficulty: difficulties[index % 4], question: `Bir şagird ${days} gün hər gün ${daily} tapşırıq həll etdi. Cəmi neçə tapşırıq həll etdi?`, options: uniqueOptions([answer + daily, answer - days, days + daily], answer), answer: String(answer), explanation: `Eyni say hər gün təkrarlandığı üçün vururuq: ${days}×${daily}=${answer}.` };
}

function trigonometryBuilder(grade: number, index: number) {
  const angle = [30, 45, 60, 90][index % 4];
  const answers: Record<number, string> = { 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1" };
  const answer = answers[angle];
  return { skill: grade < 9 ? "Bucaq nisbətinə hazırlıq" : "Triqonometriya", difficulty: grade < 9 ? "Orta" as Difficulty : "Çətin" as Difficulty, question: `${angle}° bucağı üçün sin(${angle}°) qiyməti hansıdır?`, options: uniqueOptions(["0", "√3/2", "√2/2", "1/2"], answer), answer, explanation: `Standart bucaq qiymətlərindən sin(${angle}°)=${answer}.` };
}

const sharedAdvancedTopics: TopicMeta[] = [
  { slug: "hesab-emelleri", title: "Ədədlər və hesab əməlləri", description: "Natural, tam və rasional ədədlərlə hesablamalar.", lesson: "Əməl ardıcıllığını gözlə: mötərizə, vurma-bölmə, sonra toplama-çıxma.", example: "8 + 4 × 3 = 20", xp: 80, builder: arithmeticBuilder },
  { slug: "kesrler-faiz", title: "Kəsrlər, nisbət və faiz", description: "Kəsr, faiz, nisbət və proporsional düşünmə.", lesson: "Kəsr bütövün hissəsini, faiz isə 100 üzərindən payı göstərir.", example: "25% = 0.25", xp: 100, builder: fractionBuilder },
  { slug: "hendese-olcme", title: "Həndəsə və ölçmə", description: "Fiqurlar, perimetr, sahə, həcm və bucaqlar.", lesson: "Fiquru təsəvvür et, verilənləri yaz və uyğun düsturu seç.", example: "P = 2(a+b)", xp: 90, builder: geometryBuilder },
  { slug: "tenlikler", title: "Tənliklər", description: "Naməlumun tapılması və tənlik qurma bacarığı.", lesson: "Tənlik tərəzi kimidir: bir tərəfdə etdiyini digər tərəfdə də et.", example: "x + 7 = 15 → x = 8", xp: 120, builder: equationBuilder },
  { slug: "cebr", title: "Cəbri ifadələr", description: "Dəyişənlər, ifadələr və sadələşdirmə.", lesson: "Dəyişən ədədin yerini tutan hərfdir; qiyməti yerinə yazaraq ifadəni hesablayırıq.", example: "2a+b", xp: 120, builder: equationBuilder },
  { slug: "funksiyalar", title: "Funksiyalar və qrafiklər", description: "Qayda, qrafik düşüncə və funksiya qiyməti.", lesson: "Funksiya girişlə çıxış arasındakı qaydadır.", example: "f(x)=2x+3", xp: 130, builder: functionBuilder },
  { slug: "mentiq", title: "Məntiq və ardıcıllıqlar", description: "Qanunauyğunluq tapma və riyazi düşünmə.", lesson: "Ədədlərin necə dəyişdiyini izləyərək qaydanı tap.", example: "3, 6, 9, 12, ...", xp: 110, builder: logicBuilder },
  { slug: "metnli-meseleler", title: "Mətnli məsələlər", description: "Real həyat situasiyalarını riyazi modelə çevir.", lesson: "Verilənləri ayır, soruşulanı tap və əməli seç.", example: "5 gün × 8 tapşırıq", xp: 110, builder: wordProblemBuilder },
  { slug: "statistika", title: "Statistika", description: "Orta qiymət, median, aralıq və məlumat oxuma.", lesson: "Statistika məlumatı oxuyub nəticə çıxarmağa kömək edir.", example: "Orta = cəm / say", xp: 110, builder: statisticsBuilder },
  { slug: "ehtimal", title: "Ehtimal", description: "Hadisənin baş vermə şansını hesabla.", lesson: "Ehtimal əlverişli halların bütün hallara nisbətidir.", example: "P = əlverişli / bütün", xp: 115, builder: probabilityBuilder },
  { slug: "trigonometriya-olimpiada", title: "Triqonometriya", description: "Bucaq nisbətləri və standart qiymətlər.", lesson: "Triqonometriyada standart bucaq qiymətlərini fiqur üzərində tətbiq edirik.", example: "sin30° = 1/2", xp: 150, builder: trigonometryBuilder }
];

const gradeTopicOverrides: Record<number, TopicMeta[]> = {
  1: [
    { slug: "sayma-0-20", title: "0–20 arası sayma", description: "Əşyaları sayma, sıra və miqdar anlayışı.", lesson: "Ədədləri soldan sağa say və hər əşyanı bir dəfə hesabla.", example: "5 alma + 2 alma = 7 alma", xp: 60, builder: arithmeticBuilder },
    { slug: "toplama-20", title: "20-yə qədər toplama", description: "Kiçik ədədlərin toplanması.", lesson: "Toplama iki qrupu birləşdirmək deməkdir.", example: "6 + 3 = 9", xp: 70, builder: arithmeticBuilder },
    { slug: "cixma-20", title: "20-yə qədər çıxma", description: "Qalan miqdarı tapma.", lesson: "Çıxma verilən miqdardan bir hissəni ayırmaqdır.", example: "9 - 4 = 5", xp: 70, builder: arithmeticBuilder },
    { slug: "muqayise", title: "Ədədlərin müqayisəsi", description: "Böyük, kiçik və bərabər anlayışları.", lesson: "Ədəd oxunda sağda olan ədəd daha böyükdür.", example: "12 > 8", xp: 65, builder: logicBuilder },
    { slug: "onluq-teklik", title: "Onluq və təklik", description: "İkirəqəmli ədədlərin quruluşu.", lesson: "18 ədədi 1 onluq və 8 təklikdən ibarətdir.", example: "18 = 10 + 8", xp: 75, builder: arithmeticBuilder },
    { slug: "fiqurlar", title: "Sadə həndəsi fiqurlar", description: "Dairə, üçbucaq, kvadrat və düzbucaqlı.", lesson: "Fiqurları tərəf və künclərinə görə tanı.", example: "Kvadratın 4 bərabər tərəfi var", xp: 75, builder: geometryBuilder },
    { slug: "olcme", title: "Uzunluq və ölçmə", description: "Santimetr, müqayisə və sadə ölçmələr.", lesson: "Uzunluğu ölçərkən başlanğıcı 0 nöqtəsinə qoy.", example: "5 sm + 3 sm = 8 sm", xp: 70, builder: geometryBuilder },
    { slug: "vaxt", title: "Vaxt anlayışı", description: "Gün, həftə və saatla tanışlıq.", lesson: "Saat vaxtı ölçmək üçündür; günlər ardıcıllıqla təkrarlanır.", example: "1 həftə = 7 gün", xp: 70, builder: arithmeticBuilder },
    { slug: "pul", title: "Pul və alış-veriş", description: "Manat, qəpik və sadə alış-veriş məsələləri.", lesson: "Qiymətləri toplamaq ümumi məbləği tapmağa kömək edir.", example: "3 qəpik + 5 qəpik = 8 qəpik", xp: 70, builder: wordProblemBuilder },
    { slug: "melumat", title: "Şəkilli məlumat", description: "Sadə cədvəl və şəkilli diaqram oxuma.", lesson: "Məlumatı say və ən çox/ən az olanı tap.", example: "3 top, 5 kitab", xp: 70, builder: statisticsBuilder },
    { slug: "mentiqi-oyunlar", title: "Məntiqi oyunlar", description: "Ardıcıllıq və uyğunluq tapşırıqları.", lesson: "Qaydanı tapmaq üçün şəkillərin və ədədlərin necə dəyişdiyini izlə.", example: "2, 4, 6, ...", xp: 80, builder: logicBuilder }
  ],
  2: [
    { slug: "sayma-100", title: "100-ə qədər ədədlər", description: "İkirəqəmli ədədlər, onluq və təkliklər.", lesson: "Ədədi onluq və təkliklərə ayırmaq hesablamanı asanlaşdırır.", example: "47 = 4 onluq + 7 təklik", xp: 70, builder: arithmeticBuilder },
    { slug: "toplama-cixma-100", title: "100-ə qədər toplama və çıxma", description: "Sütunla və şifahi hesablamalar.", lesson: "Əvvəl təklikləri, sonra onluqları hesabla.", example: "36 + 24 = 60", xp: 80, builder: arithmeticBuilder },
    { slug: "vurma-hazirliq", title: "Vurmaya hazırlıq", description: "Təkrar toplama və qruplaşdırma.", lesson: "Eyni saylı qrupları toplamaq vurmanın başlanğıcıdır.", example: "3+3+3 = 3×3", xp: 80, builder: arithmeticBuilder },
    { slug: "bolmeye-hazirliq", title: "Bölməyə hazırlıq", description: "Bərabər bölüşdürmə və qruplama.", lesson: "Bölmə əşyaları bərabər qruplara ayırmaqdır.", example: "12 alma 3 uşağa → 4 alma", xp: 80, builder: wordProblemBuilder },
    { slug: "eded-oxu", title: "Ədəd oxu və müqayisə", description: "Ədədləri sıralama və müqayisə etmə.", lesson: "Ədəd oxunda sağa getdikcə ədədlər artır.", example: "58 > 49", xp: 70, builder: logicBuilder },
    { slug: "fiqurlar-2", title: "Fiqurlar və tərəflər", description: "Çoxbucaqlılar, tərəf və künclər.", lesson: "Fiqurları tərəflərinin və künclərinin sayına görə ayır.", example: "Üçbucağın 3 tərəfi var", xp: 75, builder: geometryBuilder },
    { slug: "perimetr-hazirliq", title: "Perimetrə hazırlıq", description: "Tərəflərin uzunluqlarını toplama.", lesson: "Fiqurun ətraf uzunluğu tərəflərin cəmidir.", example: "3+3+3+3=12", xp: 80, builder: geometryBuilder },
    { slug: "vaxt-teqvim", title: "Vaxt və təqvim", description: "Saat, gün, həftə və ay anlayışları.", lesson: "Təqvim hadisələrin ardıcıllığını göstərir.", example: "1 saat = 60 dəqiqə", xp: 75, builder: arithmeticBuilder },
    { slug: "pul-meseleleri", title: "Pul məsələləri", description: "Qiymət, qalıq və ümumi məbləğ.", lesson: "Alış-verişdə ümumi məbləği toplama ilə tapırıq.", example: "20 qəpik + 30 qəpik = 50 qəpik", xp: 75, builder: wordProblemBuilder },
    { slug: "melumat-cədvəl", title: "Cədvəl və məlumat", description: "Sadə cədvəl və diaqramlardan nəticə çıxarma.", lesson: "Cədvəldə sətir və sütunları diqqətlə oxu.", example: "Ən çox seçilən rəng", xp: 75, builder: statisticsBuilder },
    { slug: "mentiq-2", title: "Məntiq və nümunələr", description: "Qanunauyğunluq və uyğunluq tapma.", lesson: "Əvvəl dəyişən hissəni tap, sonra növbəti addımı yaz.", example: "5, 10, 15, ...", xp: 85, builder: logicBuilder }
  ],
  3: [
    { slug: "ededler-1000", title: "1000-ə qədər ədədlər", description: "Üçrəqəmli ədədlərin oxunuşu və yazılışı.", lesson: "Üçrəqəmli ədəd yüzlük, onluq və təkliklərdən ibarətdir.", example: "345 = 300+40+5", xp: 80, builder: arithmeticBuilder },
    { slug: "toplama-cixma-1000", title: "1000-ə qədər toplama və çıxma", description: "Sütunla toplama və çıxma.", lesson: "Mərtəbələr üzrə hesabla: təklik, onluq, yüzlük.", example: "245+128", xp: 90, builder: arithmeticBuilder },
    { slug: "vurma-cədvəli", title: "Vurma cədvəli", description: "2–10 vurma cədvəli və tətbiqi.", lesson: "Vurma eyni ədədin təkrar toplanmasıdır.", example: "7×8=56", xp: 95, builder: arithmeticBuilder },
    { slug: "bolme", title: "Bölmə", description: "Bərabər bölüşdürmə və qalıqsız bölmə.", lesson: "Bölmə vurmanın tərs əməlidir.", example: "36÷6=6", xp: 95, builder: wordProblemBuilder },
    { slug: "kesr-anlayisi", title: "Kəsr anlayışı", description: "Yarım, üçdəbir, dörddəbir və sadə kəsrlər.", lesson: "Kəsr bütövün bərabər hissələrindən bir neçəsini göstərir.", example: "1/2", xp: 90, builder: fractionBuilder },
    { slug: "olcme-vahidleri", title: "Ölçü vahidləri", description: "Uzunluq, kütlə və tutum vahidləri.", lesson: "Vahidləri müqayisə edərkən eyni vahidə çevir.", example: "1 m = 100 sm", xp: 85, builder: geometryBuilder },
    { slug: "perimetr", title: "Perimetr", description: "Çoxbucaqlıların perimetrinin tapılması.", lesson: "Perimetr bütün tərəflərin uzunluqları cəmidir.", example: "P=2(a+b)", xp: 90, builder: geometryBuilder },
    { slug: "sahe-hazirliq", title: "Sahəyə hazırlıq", description: "Kvadrat vahidlər və örtmə modeli.", lesson: "Sahə fiqurun tutduğu yeri göstərir.", example: "sm²", xp: 90, builder: geometryBuilder },
    { slug: "vaxt-meseleleri", title: "Vaxt məsələləri", description: "Saat, dəqiqə və zaman fərqi.", lesson: "Vaxt fərqini tapmaq üçün başlanğıc və son vaxtı müqayisə et.", example: "1 saat = 60 dəq", xp: 80, builder: arithmeticBuilder },
    { slug: "melumat-diaqram", title: "Məlumat və diaqram", description: "Diaqram oxuma və müqayisə.", lesson: "Diaqram sütunlarının hündürlüyü miqdarı göstərir.", example: "Sütunlu diaqram", xp: 80, builder: statisticsBuilder },
    { slug: "metnli-meseleler-3", title: "Mətnli məsələlər", description: "Çoxaddımlı sadə məsələlər.", lesson: "Hər cümlədə verilən ədədi və soruşulanı qeyd et.", example: "Əvvəl topla, sonra böl", xp: 95, builder: wordProblemBuilder }
  ],
  4: [
    { slug: "coxreqemli-ededler", title: "Çoxrəqəmli ədədlər", description: "Minliklər, mərtəbə qiyməti və yuvarlaqlaşdırma.", lesson: "Ədədi mərtəbələrə ayırmaq böyük hesablamanı sadələşdirir.", example: "12 345", xp: 90, builder: arithmeticBuilder },
    { slug: "toplama-cixma-coxreqemli", title: "Çoxrəqəmli toplama və çıxma", description: "Böyük ədədlərlə yazılı hesablamalar.", lesson: "Hesablamanı mərtəbə-mərtəbə apar.", example: "2450+1380", xp: 95, builder: arithmeticBuilder },
    { slug: "vurma-bolme", title: "Vurma və bölmə", description: "Bir və iki rəqəmli ədədə vurma, bölmə.", lesson: "Vurma və bölmə bir-birinin tərsidir.", example: "144÷12", xp: 100, builder: arithmeticBuilder },
    { slug: "kesrler", title: "Kəsrlər", description: "Bərabər kəsrlər, müqayisə və sadə əməliyyatlar.", lesson: "Məxrəclər eyni olduqda surətləri müqayisə edirik.", example: "3/8 < 5/8", xp: 100, builder: fractionBuilder },
    { slug: "onluq-kesr-hazirliq", title: "Onluq kəsrə hazırlıq", description: "Onda bir və yüzdə bir hissələr.", lesson: "Onluq kəsr kəsrin başqa yazılış formasıdır.", example: "0.5 = 1/2", xp: 100, builder: fractionBuilder },
    { slug: "perimetr-sahe", title: "Perimetr və sahə", description: "Düzbucaqlı və kvadratın perimetri, sahəsi.", lesson: "Sahə a×b, perimetr 2(a+b) düsturu ilə tapılır.", example: "S=a×b", xp: 100, builder: geometryBuilder },
    { slug: "bucaqlar", title: "Bucaqlar və fiqurlar", description: "Düz, iti, kor bucaq və fiqur təsnifatı.", lesson: "Bucağın növünü ölçüsünə görə müəyyən edirik.", example: "90° düz bucaq", xp: 95, builder: geometryBuilder },
    { slug: "olcu-cevirmeleri", title: "Ölçü çevirmələri", description: "Uzunluq, kütlə, tutum və vaxt vahidləri.", lesson: "Eyni tip vahidləri çevirmək üçün əlaqəni yadda saxla.", example: "1 km = 1000 m", xp: 90, builder: arithmeticBuilder },
    { slug: "statistika-4", title: "Statistika", description: "Cədvəl, diaqram və orta qiymətə hazırlıq.", lesson: "Məlumatı qruplaşdırmaq nəticə çıxarmağı asanlaşdırır.", example: "Ən çox / ən az", xp: 90, builder: statisticsBuilder },
    { slug: "mentiq-4", title: "Məntiq və qanunauyğunluq", description: "Ardıcıllıq və strategiya məsələləri.", lesson: "Kiçik nümunələri yoxla və qaydanı tap.", example: "2, 5, 8, 11", xp: 95, builder: logicBuilder },
    { slug: "metnli-meseleler-4", title: "Mətnli məsələlər", description: "Çoxaddımlı real həyat məsələləri.", lesson: "Məsələni planla: verilənlər, əməl, cavab.", example: "Alış-veriş və qalıq", xp: 100, builder: wordProblemBuilder }
  ]
};

function topicMetasForGrade(grade: number) {
  if (gradeTopicOverrides[grade]) return gradeTopicOverrides[grade];
  if (grade <= 8) return sharedAdvancedTopics.filter((topic) => topic.slug !== "trigonometriya-olimpiada").concat({ slug: "koordinat", title: "Koordinat müstəvisi", description: "Nöqtələr, oxlar və qrafik təsəvvür.", lesson: "Koordinatda əvvəl x, sonra y oxunur.", example: "A(2;3)", xp: 120, builder: functionBuilder });
  return sharedAdvancedTopics;
}

function buildTopicPack(grade: number, meta: TopicMeta): TopicPack {
  return {
    grade,
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    lesson: meta.lesson,
    example: meta.example,
    xp: meta.xp,
    tasks: Array.from({ length: 20 }, (_, index) => task(grade, index, meta))
  };
}

export const taskBank: TopicPack[] = Array.from({ length: 11 }, (_, index) => topicMetasForGrade(index + 1).map((meta) => buildTopicPack(index + 1, meta))).flat();

export function getTopicsForGrade(grade: number) {
  return taskBank.filter((topic) => topic.grade === grade);
}

export function getTopicPack(grade: number, slug: string) {
  return taskBank.find((topic) => topic.grade === grade && topic.slug === slug);
}

export function getTaskCountForGrade(grade: number) {
  return getTopicsForGrade(grade).reduce((sum, topic) => sum + topic.tasks.length, 0);
}
