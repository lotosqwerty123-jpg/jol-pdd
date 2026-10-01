import type { Lang } from '@/i18n/types';

export type JourneyCopy = {
  brandLabel: string;
  stageNames: string[];
  introHint: string;
  languageEyebrow: string;

  theme: {
    title: string;
    subtitle: string;
    dark: string;
    darkSub: string;
    light: string;
    lightSub: string;
  };

  name: {
    title: string;
    subtitle: string;
    placeholder: string;
  };

  category: {
    title: string;
    subtitle: string;
    note: string;
  };

  date: {
    title: string;
    subtitle: string;
    placeholder: string;
    unknown: string;
    unknownSelected: string;
  };

  goal: {
    title: string;
    subtitle: string;
    minutes: string;
    finish: string;
  };
};

const copies: Record<Lang, JourneyCopy> = {
  ru: {
    brandLabel: 'ПДД',
    stageNames: [
      'ЯЗЫК',
      'ТЕМА',
      'ИМЯ',
      'КАТЕГОРИЯ',
      'ДАТА',
      'ЦЕЛЬ',
    ],

    introHint: 'Персональный путь до готовности',
    languageEyebrow: 'НАЧАЛО МАРШРУТА',

    theme: {
      title: 'Как выглядит твой маршрут?',
      subtitle:
        'Выбери оформление. Его всегда можно изменить позже.',
      dark: 'Тёмная',
      darkSub: 'Сосредоточенность и контраст',
      light: 'Светлая',
      lightSub: 'Чистота и больше света',
    },

    name: {
      title: 'Как тебя зовут?',
      subtitle:
        'JOL будет использовать имя во время подготовки.',
      placeholder: 'Твоё имя',
    },

    category: {
      title: 'К какой категории идём?',
      subtitle:
        'Выбери категорию водительских прав.',
      note:
        'Доступны категории и подкатегории: A, A1, B, B1, C, C1, D, D1 и прицепные категории.',
    },

    date: {
      title: 'Когда экзамен?',
      subtitle:
        'Дата поможет построить темп подготовки. Если её пока нет — это нормально.',
      placeholder: 'Например: 15.10.2026',
      unknown: 'Пока не знаю дату',
      unknownSelected:
        'Маршрут будет строиться без конечной даты',
    },

    goal: {
      title: 'Твой ежедневный темп',
      subtitle:
        'Выбери реалистичную цель. Её можно изменить позже.',
      minutes: 'минут в день',
      finish: 'Построить маршрут',
    },
  },

  ky: {
    brandLabel: 'ЖЭЭ',
    stageNames: [
      'ТИЛ',
      'ТЕМА',
      'АТЫ',
      'КАТЕГОРИЯ',
      'КҮН',
      'МАКСАТ',
    ],

    introHint: 'Даярдыкка чейинки жеке жол',
    languageEyebrow: 'МАРШРУТТУН БАШТАЛЫШЫ',

    theme: {
      title: 'Маршрутуң кандай көрүнөт?',
      subtitle:
        'Көрүнүштү танда. Аны кийин өзгөртүүгө болот.',
      dark: 'Караңгы',
      darkSub:
        'Контрасттуу караңгы интерфейс',
      light: 'Жарык',
      lightSub: 'Таза жарык интерфейс',
    },

    name: {
      title: 'Атың ким?',
      subtitle:
        'JOL даярдануу учурунда атыңды колдонот.',
      placeholder: 'Сенин атың',
    },

    category: {
      title: 'Кайсы категорияга баратабыз?',
      subtitle:
        'Айдоочулук күбөлүктүн категориясын танда.',
      note:
        'A, A1, B, B1, C, C1, D, D1 жана чиркегич категориялары жеткиликтүү.',
    },

    date: {
      title: 'Экзамен качан?',
      subtitle:
        'Күнү даярдык темпин түзүүгө жардам берет. Азырынча билбесең болот.',
      placeholder: 'Мисалы: 15.10.2026',
      unknown: 'Азырынча билбейм',
      unknownSelected:
        'Маршрут акыркы күнсүз түзүлөт',
    },

    goal: {
      title: 'Күнүмдүк темпиң',
      subtitle:
        'Ыңгайлуу күнүмдүк максатты танда.',
      minutes: 'мүнөт күнүнө',
      finish: 'Маршрутту түзүү',
    },
  },

  en: {
    brandLabel: 'ROAD RULES',
    stageNames: [
      'LANGUAGE',
      'THEME',
      'NAME',
      'CATEGORY',
      'DATE',
      'GOAL',
    ],

    introHint:
      'Your personal route to readiness',

    languageEyebrow: 'ROUTE START',

    theme: {
      title:
        'What should your route look like?',
      subtitle:
        'Choose your appearance. You can change it later.',
      dark: 'Dark',
      darkSub:
        'Focused, high-contrast interface',
      light: 'Light',
      lightSub:
        'Clean interface with more light',
    },

    name: {
      title: 'What is your name?',
      subtitle:
        'JOL will use it while guiding your preparation.',
      placeholder: 'Your name',
    },

    category: {
      title:
        'Which category are we heading toward?',
      subtitle:
        'Choose your driving licence category.',
      note:
        'A, A1, B, B1, C, C1, D, D1 and trailer categories are available.',
    },

    date: {
      title: 'When is your exam?',
      subtitle:
        'The date helps set your pace. It is fine if you do not know it yet.',
      placeholder:
        'For example: 15.10.2026',
      unknown: "I don't know yet",
      unknownSelected:
        'Your route will be built without a final date',
    },

    goal: {
      title: 'Your daily pace',
      subtitle:
        'Choose a realistic goal. You can change it later.',
      minutes: 'minutes per day',
      finish: 'Build my route',
    },
  },
};

export function getJourneyCopy(lang: Lang) {
  return copies[lang];
}