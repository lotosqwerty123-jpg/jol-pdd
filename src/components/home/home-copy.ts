import type {
    Lang,
} from '@/i18n/types';
  
  export type HomeCopy = {
    eyebrow: string;
  
    greeting: (
      name: string,
    ) => string;
  
    routeTitle: string;
  
    routeNoData: string;
  
    routeHint: string;
  
    currentPoint: string;
  
    currentTitle: string;
  
    currentText: string;
  
    continueRoute: string;
  
    category: string;
  
    exam: string;
  
    noDate: string;
  
    dailyGoal: string;
  
    minutesShort: string;
  
    today: string;
  
    todayTitle: string;
  
    todayText: string;
  
    readiness: string;
  
    readinessValue: string;
  
    mockExam: string;
  
    mockExamText: string;
  
    openExam: string;
  
    stages: string[];
  };
  
  const copies:
    Record<Lang, HomeCopy> = {
      ru: {
        eyebrow:
          'JOL · ТВОЙ МАРШРУТ',
  
        greeting: (name) =>
          name
            ? `Привет, ${name}`
            : 'Привет',
  
        routeTitle:
          'Продолжай движение',
  
        routeNoData:
          'JOL изучает твой уровень',
  
        routeHint:
          'Первые ответы помогут определить слабые темы и построить персональный путь.',
  
        currentPoint:
          'СЕЙЧАС НА МАРШРУТЕ',
  
        currentTitle:
          'Основы',
  
        currentText:
          'Начни практику — маршрут будет двигаться вместе с реальным прогрессом.',
  
        continueRoute:
          'Продолжить маршрут',
  
        category:
          'Категория',
  
        exam:
          'Экзамен',
  
        noDate:
          'Без даты',
  
        dailyGoal:
          'Темп',
  
        minutesShort:
          'мин/день',
  
        today:
          'СЕГОДНЯ',
  
        todayTitle:
          'Первый участок',
  
        todayText:
          'Короткая практика даст JOL первые данные о твоей готовности.',
  
        readiness:
          'Готовность',
  
        readinessValue:
          'Мало данных',
  
        mockExam:
          'Пробный экзамен',
  
        mockExamText:
          '20 вопросов · 25 минут',
  
        openExam:
          'Открыть',
  
        stages: [
          'СТАРТ',
          'ОСНОВЫ',
          'ПРАКТИКА',
          'ОШИБКИ',
          'ПРОБНЫЙ',
          'ГОТОВ',
          'ЭКЗАМЕН',
        ],
      },
  
      ky: {
        eyebrow:
          'JOL · СЕНИН МАРШРУТУҢ',
  
        greeting: (name) =>
          name
            ? `Салам, ${name}`
            : 'Салам',
  
        routeTitle:
          'Жолду улант',
  
        routeNoData:
          'JOL деңгээлиңди изилдеп жатат',
  
        routeHint:
          'Алгачкы жооптор алсыз темаларды аныктап, жеке маршрут түзүүгө жардам берет.',
  
        currentPoint:
          'АЗЫР МАРШРУТТА',
  
        currentTitle:
          'Негиздер',
  
        currentText:
          'Практиканы башта — маршрут чыныгы прогрессиң менен бирге жылат.',
  
        continueRoute:
          'Маршрутту улантуу',
  
        category:
          'Категория',
  
        exam:
          'Экзамен',
  
        noDate:
          'Күнү жок',
  
        dailyGoal:
          'Темп',
  
        minutesShort:
          'мүн/күн',
  
        today:
          'БҮГҮН',
  
        todayTitle:
          'Биринчи бөлүк',
  
        todayText:
          'Кыска практика JOL үчүн даярдык боюнча алгачкы маалымат берет.',
  
        readiness:
          'Даярдык',
  
        readinessValue:
          'Маалымат аз',
  
        mockExam:
          'Сынак экзамен',
  
        mockExamText:
          '20 суроо · 25 мүнөт',
  
        openExam:
          'Ачуу',
  
        stages: [
          'БАШТОО',
          'НЕГИЗ',
          'ПРАКТИКА',
          'КАТАЛАР',
          'СЫНОО',
          'ДАЯР',
          'ЭКЗАМЕН',
        ],
      },
  
      en: {
        eyebrow:
          'JOL · YOUR ROUTE',
  
        greeting: (name) =>
          name
            ? `Hi, ${name}`
            : 'Hi',
  
        routeTitle:
          'Keep moving',
  
        routeNoData:
          'JOL is learning your level',
  
        routeHint:
          'Your first answers will reveal weak topics and begin building a personal route.',
  
        currentPoint:
          'CURRENT POSITION',
  
        currentTitle:
          'Basics',
  
        currentText:
          'Start practising — the route will move with your real progress.',
  
        continueRoute:
          'Continue route',
  
        category:
          'Category',
  
        exam:
          'Exam',
  
        noDate:
          'No date',
  
        dailyGoal:
          'Pace',
  
        minutesShort:
          'min/day',
  
        today:
          'TODAY',
  
        todayTitle:
          'First segment',
  
        todayText:
          'A short practice session gives JOL its first readiness data.',
  
        readiness:
          'Readiness',
  
        readinessValue:
          'Not enough data',
  
        mockExam:
          'Mock exam',
  
        mockExamText:
          '20 questions · 25 min',
  
        openExam:
          'Open',
  
        stages: [
          'START',
          'BASICS',
          'PRACTICE',
          'MISTAKES',
          'MOCK',
          'READY',
          'EXAM',
        ],
      },
    };
  
  export function getHomeCopy(
    lang: Lang,
  ) {
    return copies[lang];
  }