import type { Lang } from '@/i18n/types';

export interface JolDict {
  common: {
    back: string;
    next: string;
    continue: string;
    skip: string;
    close: string;
    comingSoon: string;
  };
  splash: {
    tagline: string;
  };
  language: {
    title: string;
    subtitle: string;
    options: { id: Lang; title: string; subtitle: string }[];
  };
  onboarding: {
    name: { title: string; subtitle: string; placeholder: string };
    ctaFinish: string;
    hint: string;
  };
  nav: {
    home: string;
    learn: string;
    exam: string;
    ai: string;
    profile: string;
  };
  home: {
    greeting: string;
    destination: string;
    placeholder: string;
  };
  question: {
    title: string;
    placeholder: string;
    openExplain: string;
  };
  explain: {
    header: string;
    placeholder: string;
  };
  aiTutor: {
    title: string;
    placeholder: string;
  };
  examHub: {
    title: string;
    subtitle: string;
    mockTitle: string;
    resultTitle: string;
    mistakesTitle: string;
  };
  mockExam: {
    title: string;
    placeholder: string;
  };
  examResult: {
    title: string;
    placeholder: string;
  };
  mistakeReview: {
    title: string;
    placeholder: string;
  };
  profile: {
    title: string;
    name: string;
    language: string;
    theme: string;
    dark: string;
    light: string;
    resetOnboarding: string;
  };
}

export const dictionaries: Record<Lang, JolDict> = {
  ru: {
    common: {
      back: 'Назад',
      next: 'Далее',
      continue: 'Продолжить',
      skip: 'Пропустить',
      close: 'Закрыть',
      comingSoon: 'Скоро',
    },
    splash: { tagline: 'Ваш маршрут до экзамена' },
    language: {
      title: 'Выберите язык интерфейса',
      subtitle: 'Тил тандаңыз · Choose your language',
      options: [
        { id: 'ru', title: 'Русский', subtitle: 'Продолжить на русском' },
        { id: 'ky', title: 'Кыргызча', subtitle: 'Кыргыз тилинде улантуу' },
        { id: 'en', title: 'English', subtitle: 'Continue in English' },
      ],
    },
    onboarding: {
      name: {
        title: 'Как к вам обращаться?',
        subtitle: 'Это поможет сделать подготовку более личной.',
        placeholder: 'Ваше имя',
      },
      ctaFinish: 'Начать подготовку',
      hint: 'Полный онбординг (категория, дата, темп) будет на следующем этапе.',
    },
    nav: { home: 'Главная', learn: 'Обучение', exam: 'Экзамен', ai: 'AI-наставник', profile: 'Профиль' },
    home: {
      greeting: 'Доброе утро',
      destination: 'Экзамен',
      placeholder: 'Домашний экран будет перенесён на следующем этапе.',
    },
    question: {
      title: 'Обучение',
      placeholder: 'Экран вопроса будет перенесён на следующем этапе.',
      openExplain: 'AI Explain',
    },
    explain: {
      header: 'Разбор ответа',
      placeholder: 'Экран AI Explain будет перенесён на следующем этапе.',
    },
    aiTutor: {
      title: 'AI-наставник JOL',
      placeholder: 'Чат наставника будет перенесён на следующем этапе.',
    },
    examHub: {
      title: 'Экзамен',
      subtitle: 'Выберите режим подготовки к экзамену',
      mockTitle: 'Пробный экзамен',
      resultTitle: 'Результат экзамена',
      mistakesTitle: 'Разбор ошибок',
    },
    mockExam: {
      title: 'Пробный экзамен',
      placeholder: 'Логика пробного экзамена будет на следующем этапе.',
    },
    examResult: {
      title: 'Результат экзамена',
      placeholder: 'Экран результата будет перенесён на следующем этапе.',
    },
    mistakeReview: {
      title: 'Разбор ошибок',
      placeholder: 'Разбор ошибок будет перенесён на следующем этапе.',
    },
    profile: {
      title: 'Профиль',
      name: 'Имя',
      language: 'Язык интерфейса',
      theme: 'Тема оформления',
      dark: 'Тёмная',
      light: 'Светлая',
      resetOnboarding: 'Пройти онбординг заново',
    },
  },
  ky: {
    common: {
      back: 'Артка',
      next: 'Кийинки',
      continue: 'Улантуу',
      skip: 'Өткөрүп жиберүү',
      close: 'Жабуу',
      comingSoon: 'Жакында',
    },
    splash: { tagline: 'Экзаменге чейинки маршрутуңуз' },
    language: {
      title: 'Тил тандаңыз',
      subtitle: 'Выберите язык · Choose your language',
      options: [
        { id: 'ru', title: 'Русский', subtitle: 'Продолжить на русском' },
        { id: 'ky', title: 'Кыргызча', subtitle: 'Кыргыз тилинде улантуу' },
        { id: 'en', title: 'English', subtitle: 'Continue in English' },
      ],
    },
    onboarding: {
      name: {
        title: 'Сизди кантип атайлы?',
        subtitle: 'Бул даярданууну жекелештирет.',
        placeholder: 'Атыңыз',
      },
      ctaFinish: 'Даярданууну баштоо',
      hint: 'Толук онбординг (категория, дата, темп) кийинки этапта болот.',
    },
    nav: { home: 'Башкы', learn: 'Окуу', exam: 'Экзамен', ai: 'AI-насаатчы', profile: 'Профиль' },
    home: {
      greeting: 'Кайырлуу таң',
      destination: 'Экзамен',
      placeholder: 'Башкы экран кийинки этапта өткөрүлөт.',
    },
    question: {
      title: 'Окуу',
      placeholder: 'Суроо экраны кийинки этапта өткөрүлөт.',
      openExplain: 'AI Explain',
    },
    explain: {
      header: 'Жоопту талдоо',
      placeholder: 'AI Explain экраны кийинки этапта өткөрүлөт.',
    },
    aiTutor: {
      title: 'JOL AI-насаатчысы',
      placeholder: 'Насаатчы чаты кийинки этапта өткөрүлөт.',
    },
    examHub: {
      title: 'Экзамен',
      subtitle: 'Даярдануу режимин тандаңыз',
      mockTitle: 'Сынак экзамен',
      resultTitle: 'Экзамен жыйынтыгы',
      mistakesTitle: 'Каталарды талдоо',
    },
    mockExam: {
      title: 'Сынак экзамен',
      placeholder: 'Сынак экзамендин логикасы кийинки этапта болот.',
    },
    examResult: {
      title: 'Экзамен жыйынтыгы',
      placeholder: 'Жыйынтык экраны кийинки этапта өткөрүлөт.',
    },
    mistakeReview: {
      title: 'Каталарды талдоо',
      placeholder: 'Каталарды талдоо кийинки этапта өткөрүлөт.',
    },
    profile: {
      title: 'Профиль',
      name: 'Аты',
      language: 'Интерфейс тили',
      theme: 'Көрүнүш темасы',
      dark: 'Караңгы',
      light: 'Ачык',
      resetOnboarding: 'Онбордингди кайра өтүү',
    },
  },
  en: {
    common: {
      back: 'Back',
      next: 'Next',
      continue: 'Continue',
      skip: 'Skip',
      close: 'Close',
      comingSoon: 'Coming soon',
    },
    splash: { tagline: 'Your route to the exam' },
    language: {
      title: 'Choose your language',
      subtitle: 'Выберите язык · Тил тандаңыз',
      options: [
        { id: 'ru', title: 'Русский', subtitle: 'Continue in Russian' },
        { id: 'ky', title: 'Кыргызча', subtitle: 'Continue in Kyrgyz' },
        { id: 'en', title: 'English', subtitle: 'Continue in English' },
      ],
    },
    onboarding: {
      name: {
        title: 'What should we call you?',
        subtitle: 'This helps make preparation feel more personal.',
        placeholder: 'Your name',
      },
      ctaFinish: 'Start preparing',
      hint: 'Full onboarding (category, date, pace) comes in the next stage.',
    },
    nav: { home: 'Home', learn: 'Learn', exam: 'Exam', ai: 'AI Tutor', profile: 'Profile' },
    home: {
      greeting: 'Good morning',
      destination: 'Exam',
      placeholder: 'The home screen will be migrated in the next stage.',
    },
    question: {
      title: 'Learn',
      placeholder: 'The question screen will be migrated in the next stage.',
      openExplain: 'AI Explain',
    },
    explain: {
      header: 'Answer breakdown',
      placeholder: 'The AI Explain screen will be migrated in the next stage.',
    },
    aiTutor: {
      title: 'JOL AI Tutor',
      placeholder: 'The tutor chat will be migrated in the next stage.',
    },
    examHub: {
      title: 'Exam',
      subtitle: 'Choose your exam preparation mode',
      mockTitle: 'Mock exam',
      resultTitle: 'Exam result',
      mistakesTitle: 'Mistake review',
    },
    mockExam: {
      title: 'Mock exam',
      placeholder: 'Mock exam logic comes in the next stage.',
    },
    examResult: {
      title: 'Exam result',
      placeholder: 'The result screen will be migrated in the next stage.',
    },
    mistakeReview: {
      title: 'Mistake review',
      placeholder: 'Mistake review will be migrated in the next stage.',
    },
    profile: {
      title: 'Profile',
      name: 'Name',
      language: 'Interface language',
      theme: 'Appearance',
      dark: 'Dark',
      light: 'Light',
      resetOnboarding: 'Replay onboarding',
    },
  },
};

export function getDict(lang: Lang): JolDict {
  return dictionaries[lang];
}
