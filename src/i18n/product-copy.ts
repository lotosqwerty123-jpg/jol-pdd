import type { Lang } from '@/i18n/types';

export type ProductCopy = {
  home: {
    live: string;
    waiting: string;
    passed: string;
    readiness: (value: number) => string;
    dataHint: string;
    started: string;
    mastered: (done: number, total: number) => string;
    offlineHint: string;
    last: (score: number, total: number) => string;
    currentStart: string;
    currentProgress: (done: number, total: number) => string;
    currentMistakes: (count: number) => string;
    currentExam: (score: number, total: number) => string;
    currentReady: string;
  };
  network: {
    online: string;
    offline: string;
    checking: string;
    title: string;
    body: string;
    onlineMode: string;
    offlineMode: string;
    onlineHint: string;
    offlineHint: string;
    forcedOfflineHint: string;
    autoOfflineHint: string;
    noInternetTitle: string;
    noInternetBody: string;
    dismiss: string;
  };
  exam: {
    eyebrow: string;
    title: string;
    subtitle: string;
    practiceTitle: string;
    practiceBody: string;
    practiceButton: string;
    strictTitle: string;
    strictBody: string;
    strictButton: string;
    beta: string;
    questions: string;
    minutes: string;
    pass: string;
    latest: string;
    attemptsLabel: string;
    bestLabel: string;
    historyLabel: string;
    noQuestions: string;
    passed: string;
    failed: string;
    historyHint: string;
    noHistory: string;
    mistakes: string;
    mistakesShort: string;
    noMistakes: string;
    mistakesCount: (count: number) => string;
    lockedAnswer: string;
    forwardOnly: string;
    answered: (count: number, total: number) => string;
    next: string;
    finish: string;
    finishNow: string;
    exitTitle: string;
    exitBody: string;
    exitCancel: string;
    exitConfirm: string;
    normalLabel: string;
    strictLabel: string;
    resultTitle: string;
    resultPassed: string;
    resultFailed: string;
    passHint: string;
    saved: string;
    savedHint: string;
    review: (count: number) => string;
    retry: string;
    home: string;
  };
  strict: {
    eyebrow: string;
    title: string;
    body: string;
    cameraTitle: string;
    cameraBody: string;
    privacy: string;
    request: string;
    ready: string;
    checking: string;
    denied: string;
    blocked: string;
    requesting: string;
    retry: string;
    requestFailed: string;
    requestFailedHint: string;
    missing: string;
    settings: string;
    settingsHint: string;
    start: string;
    back: string;
    cameraBadge: string;
    faceTarget: string;
    faceHint: string;
    faceDetected: string;
    faceMissing: string;
    faceChecking: string;
    facePreviewOnly: string;
    faceMissingCountdown: (seconds: number) => string;
    faceMonitoringActive: string;
    faceMonitoringApk: string;
    faceApkHint: string;
    faceViolations: (count: number, total: number) => string;
    cameraUnavailable: string;
  };
  profile: {
    eyebrow: string;
    title: string;
    subtitle: string;
    readiness: string;
    attempts: string;
    best: string;
    mistakes: string;
    personal: string;
    name: string;
    category: string;
    examDate: string;
    noDate: string;
    pace: string;
    minDay: string;
    language: string;
    appearance: string;
    dark: string;
    light: string;
    history: string;
    noHistory: string;
    resetProgress: string;
    replay: string;
    defaultName: string;
    resetTitle: string;
    resetBody: string;
    resetCancel: string;
    resetConfirm: string;
    replayTitle: string;
    replayBody: string;
    replayConfirm: string;
  };
  ai: {
    eyebrow: string;
    title: string;
    subtitle: string;
    offline: string;
    online: string;
    onlineBeta: string;
    placeholder: string;
    onlineTitle: string;
    onlineBody: string;
    networkOnline: string;
    networkOffline: string;
    networkChecking: string;
    networkOnlineHint: string;
    networkOfflineHint: string;
    offlineScope: string;
    question: string;
    openRule: string;
    related: string;
    allRules: string;
    quick: string[];
  };
  rules: {
    eyebrow: string;
    title: string;
    subtitle: string;
    section: string;
    main: string;
    source: string;
    sourceDescription: (section: string) => string;
    openSource: string;
    checking: string;
    noInternetTitle: string;
    noInternetBody: string;
    note: string;
    back: string;
    notFound: string;
  };
};

const copy: Record<Lang, ProductCopy> = {
  ru: {
    home: {
      live: 'JOL',
      waiting: 'JOL ждёт первые ответы',
      passed: 'Пробный экзамен пройден',
      readiness: (value) => `Готовность по локальной базе: ${value}%`,
      dataHint: 'Практика, ошибки и результаты экзаменов двигают маршрут автоматически.',
      started: 'Начни первый вопрос',
      mastered: (done, total) => `Освоено ${done}/${total}`,
      offlineHint: 'Прогресс, практика и пробный экзамен сохраняются локально и работают офлайн.',
      last: (score, total) => `${score}/${total} последний`,
      currentStart: 'Начни отвечать на вопросы — прогресс сразу сохранится на устройстве.',
      currentProgress: (done, total) => `${done} из ${total} вопросов уже открыты в твоём прогрессе.`,
      currentMistakes: (count) => `${count} вопрос(а) ждут повторения в разделе ошибок.`,
      currentExam: (score, total) => `Последний пробный экзамен: ${score}/${total}.`,
      currentReady: 'Проходной результат достигнут. Теперь закрепи слабые темы.',
    },
    network: {
      online: 'ОНЛАЙН',
      offline: 'ОФЛАЙН',
      checking: 'СЕТЬ…',
      title: 'Режим подключения',
      body: 'JOL сам переходит в офлайн без интернета. При доступной сети можно вручную оставить приложение в офлайн или вернуть онлайн.',
      onlineMode: 'Онлайн',
      offlineMode: 'Офлайн',
      onlineHint: 'Интернет доступен. Сетевые ссылки и функции JOL могут использовать соединение.',
      offlineHint: 'Вопросы, правила, прогресс и локальный помощник продолжают работать без сети.',
      forcedOfflineHint: 'Офлайн включён вручную только внутри JOL — Wi‑Fi телефона не отключается.',
      autoOfflineHint: 'Интернета нет — JOL автоматически работает офлайн.',
      noInternetTitle: 'Нет подключения',
      noInternetBody: 'Чтобы включить онлайн-режим JOL, подключитесь к интернету. Локальные функции продолжат работать офлайн.',
      dismiss: 'Понятно',
    },
    exam: {
      eyebrow: 'JOL · ЭКЗАМЕН', title: 'Выбери режим', subtitle: 'Обычная тренировка или строгий режим с камерой.',
      practiceTitle: 'Пробный экзамен', practiceBody: '20 вопросов · 25 минут · ответы фиксируются · проходной результат 18/20.', practiceButton: 'Начать пробный экзамен',
      strictTitle: 'Строгий экзамен', strictBody: 'Тот же экзамен, но с активной фронтальной камерой. В APK режим контролирует наличие лица локально и фиксирует нарушения 1/3–3/3.', strictButton: 'Открыть строгий режим', beta: 'BETA',
      questions: 'вопросов', minutes: 'минут', pass: 'для сдачи', latest: 'ПОСЛЕДНИЙ РЕЗУЛЬТАТ', attemptsLabel: 'ПОПЫТКИ', bestLabel: 'ЛУЧШИЙ', historyLabel: 'ИСТОРИЯ', noQuestions: 'Нет вопросов для запуска экзамена.', passed: 'СДАН', failed: 'НЕ СДАН', historyHint: 'Открыть результат и ошибки.', noHistory: 'Ты ещё не проходил пробный экзамен.', mistakes: 'Разбор ошибок', mistakesShort: 'Ошибки', noMistakes: 'Ошибок для повторения пока нет', mistakesCount: (count) => `${count} вопрос(а) требуют повторения`,
      lockedAnswer: 'Ответ сохранён. Вернуться и изменить его нельзя.', forwardOnly: 'Экзамен идёт только вперёд: назад и изменение ответа отключены.', answered: (count, total) => `Отвечено: ${count}/${total}`, next: 'Далее →', finish: 'Завершить экзамен', finishNow: 'Завершить экзамен сейчас', exitTitle: 'Выйти из экзамена?', exitBody: 'Попытка завершится сразу. JOL сохранит выбранные ответы и покажет результат с ошибками.', exitCancel: 'Остаться', exitConfirm: 'Завершить и выйти', normalLabel: 'ПРОБНЫЙ ЭКЗАМЕН', strictLabel: 'СТРОГИЙ ЭКЗАМЕН · BETA',
      resultTitle: 'Экзамен завершён', resultPassed: 'ЭКЗАМЕН СДАН', resultFailed: 'ПОКА НЕ СДАН', passHint: 'Для сдачи нужно минимум 18 правильных ответов из 20.', saved: 'Результат сохранён локально', savedHint: 'История экзаменов и ошибки останутся после перезапуска приложения.', review: (count) => `Разобрать ошибки (${count})`, retry: 'Пройти ещё раз', home: 'На главную',
    },
    strict: {
      eyebrow: 'JOL · СТРОГИЙ РЕЖИМ · BETA', title: 'Строгий экзамен', body: 'Камера остаётся активной весь экзамен. Держите лицо в зоне кадра: ответы фиксируются, возврат к прошлому вопросу отключён.', cameraTitle: 'Фронтальная камера', cameraBody: 'Разреши доступ к камере. Видео не записывается и не отправляется в этом MVP.', privacy: 'Кадры не сохраняются и не отправляются. Зона лица используется для визуального контроля; в APK распознавание выполняется локально на устройстве.', request: 'Разрешить камеру', ready: 'Камера готова', checking: 'Проверяем доступ к камере…', denied: 'Доступ к камере не разрешён', blocked: 'Камера заблокирована в настройках', requesting: 'Запрашиваем разрешение…', retry: 'Попробовать снова', requestFailed: 'Не удалось запросить доступ', requestFailedHint: 'Системный запрос не открылся. Попробуй ещё раз; если камера уже запрещена для Expo Go или JOL, открой настройки приложения.', missing: 'Модуль камеры ещё не установлен', settings: 'Открыть настройки', settingsHint: 'Доступ запрещён в системе. Разреши камеру в настройках телефона и вернись в JOL.', start: 'Начать строгий экзамен', back: 'Назад', cameraBadge: 'КАМЕРА · BETA', faceTarget: 'ЗОНА ЛИЦА', faceHint: 'Держите лицо внутри рамки во время строгого экзамена.', faceDetected: 'Лицо в зоне контроля', faceMissing: 'Лицо не найдено', faceChecking: 'Ищем лицо…', facePreviewOnly: 'ЗОНА ЛИЦА · ПРЕДПРОСМОТР', faceMissingCountdown: (seconds) => `Верните лицо в кадр · ${seconds}с`, faceMonitoringActive: 'Контроль лица активен', faceMonitoringApk: 'Контроль лица включится в APK', faceApkHint: 'В Expo Go показываются камера и зона лица. ML-контроль 1/3–3/3 активируется в нативной APK-сборке.', faceViolations: (count, total) => `Нарушения ${count}/${total}`, cameraUnavailable: 'Фронтальная камера недоступна',
    },
    profile: {
      eyebrow: 'JOL · ПРОФИЛЬ', title: 'Твой прогресс', subtitle: 'Настройки, цель и история подготовки в одном месте.', readiness: 'Готовность', attempts: 'Попытки', best: 'Лучший', mistakes: 'Ошибки', personal: 'Подготовка', name: 'Имя', category: 'Категория', examDate: 'Дата экзамена', noDate: 'Без даты', pace: 'Темп', minDay: 'мин/день', language: 'Язык интерфейса', appearance: 'Тема', dark: 'Тёмная', light: 'Светлая', history: 'Последние экзамены', noHistory: 'Истории экзаменов пока нет.', resetProgress: 'Сбросить прогресс обучения', replay: 'Начать JOL с нуля', defaultName: 'Водитель JOL', resetTitle: 'Сбросить прогресс?', resetBody: 'Ответы, ошибки и история экзаменов будут удалены с этого устройства.', resetCancel: 'Отмена', resetConfirm: 'Сбросить', replayTitle: 'Начать JOL с нуля?', replayBody: 'Будут удалены профиль, настройки маршрута, ответы, ошибки и история экзаменов. JOL откроется как при первом запуске.', replayConfirm: 'Удалить всё и начать',
    },
    ai: {
      eyebrow: 'JOL · ПОМОЩНИК', title: 'Помощник по ПДД', subtitle: 'Спроси про ситуацию на дороге — JOL найдёт подходящие правила и связанные разделы ПДД.', offline: 'ОФЛАЙН', online: 'ОНЛАЙН AI', onlineBeta: 'НЕ ПОДКЛЮЧЁН', placeholder: 'Спроси про правило или ситуацию…', onlineTitle: 'Онлайн AI ещё не подключён', onlineBody: 'Мы не выдаём заглушку за настоящий ИИ. До подключения серверной модели используй офлайн-помощник по 24 разделам ПДД.', networkOnline: 'СЕТЬ · ОНЛАЙН', networkOffline: 'СЕТЬ · ОФЛАЙН', networkChecking: 'ПРОВЕРКА СЕТИ', networkOnlineHint: 'Интернет доступен. Ответы пока остаются на проверенной локальной базе ПДД.', networkOfflineHint: 'Интернета нет — локальный помощник продолжает работать без сети.', offlineScope: 'Работает локально по справочнику ПДД', question: 'ТВОЙ ВОПРОС', openRule: 'Открыть соответствующий раздел', related: 'Подходящие разделы', allRules: 'Все 24 раздела ПДД', quick: ['скорость в городе', 'где запрещён обгон', 'что делать при ДТП', 'сигналы светофора'],
    },
    rules: {
      eyebrow: 'JOL · ПДД КР', title: 'Все разделы правил', subtitle: '24 раздела ПДД Кыргызской Республики. Короткие конспекты доступны офлайн.', section: 'РАЗДЕЛ', main: 'Главное', source: 'Источник правила', sourceDescription: (section) => `Раздел «${section}» доступен в JOL офлайн в сокращённом виде. Полный официальный текст открывается через интернет.`, openSource: 'Открыть официальный источник', checking: 'Проверяем соединение…', noInternetTitle: 'Нет подключения', noInternetBody: 'Подключитесь к интернету, чтобы открыть официальный источник.', note: 'Офлайн-конспект создан для подготовки. При спорном вопросе сверяйся с официальным текстом.', back: 'Назад', notFound: 'Раздел не найден',
    },
  },
  ky: {
    home: {
      live: 'JOL', waiting: 'JOL алгачкы жоопторду күтүп жатат', passed: 'Сынак экзамен өттү', readiness: (value) => `Жергиликтүү база боюнча даярдык: ${value}%`, dataHint: 'Практика, каталар жана экзамен жыйынтыктары маршрутту автоматтык жылдырат.', started: 'Биринчи суроону башта', mastered: (done, total) => `Өздѳштүрүлдү ${done}/${total}`, offlineHint: 'Прогресс, практика жана сынак экзамен түзмөктө сакталат жана офлайн иштейт.', last: (score, total) => `Акыркысы ${score}/${total}`, currentStart: 'Суроолорго жооп бере башта — прогресс түзмөктө дароо сакталат.', currentProgress: (done, total) => `${total} суроонун ${done} суроосу прогресске кирди.`, currentMistakes: (count) => `${count} суроо ката бөлүмүндө кайталоону күтүп жатат.`, currentExam: (score, total) => `Акыркы сынак: ${score}/${total}.`, currentReady: 'Өтүү чеги алынды. Эми алсыз темаларды бекемде.',
    },
    network: {
      online: 'ОНЛАЙН',
      offline: 'ОФЛАЙН',
      checking: 'ТАРМАК…',
      title: 'Туташуу режими',
      body: 'Интернет жок болсо JOL автоматтык түрдө офлайнга өтөт. Тармак бар кезде колдонмону кол менен офлайнда калтырууга же онлайнга кайтарууга болот.',
      onlineMode: 'Онлайн',
      offlineMode: 'Офлайн',
      onlineHint: 'Интернет жеткиликтүү. JOL тармактык шилтемелерди жана функцияларды колдоно алат.',
      offlineHint: 'Суроолор, эрежелер, прогресс жана жергиликтүү жардамчы интернетсиз иштей берет.',
      forcedOfflineHint: 'Офлайн режими JOL ичинде гана күйгүзүлдү — телефондун Wi‑Fi байланышы өчүрүлбөйт.',
      autoOfflineHint: 'Интернет жок — JOL автоматтык түрдө офлайн иштеп жатат.',
      noInternetTitle: 'Интернет жок',
      noInternetBody: 'JOLдун онлайн режимин күйгүзүү үчүн интернетке туташыңыз. Жергиликтүү функциялар офлайн иштей берет.',
      dismiss: 'Түшүнүктүү',
    },
    exam: {
      eyebrow: 'JOL · ЭКЗАМЕН', title: 'Режимди танда', subtitle: 'Кадимки сынак же камера менен катуу режим.', practiceTitle: 'Сынак экзамен', practiceBody: '20 суроо · 25 мүнөт · жооптор бекитилет · өтүү чеги 18/20.', practiceButton: 'Сынак экзаменди баштоо', strictTitle: 'Катуу экзамен', strictBody: 'Ошол эле экзамен, бирок алдыңкы камера активдүү. APK ичинде беттин көрүнүшү түзмөктө көзөмөлдөнүп, 1/3–3/3 бузуулар эсептелет.', strictButton: 'Катуу режимди ачуу', beta: 'BETA', questions: 'суроо', minutes: 'мүнөт', pass: 'өтүү үчүн', latest: 'АКЫРКЫ ЖЫЙЫНТЫК', attemptsLabel: 'АРАКЕТ', bestLabel: 'ЭҢ ЖАКШЫ', historyLabel: 'ТАРЫХ', noQuestions: 'Экзаменди баштоо үчүн суроолор жок.', passed: 'ӨТТҮ', failed: 'ӨТПӨДҮ', historyHint: 'Жыйынтык жана каталарды ачуу.', noHistory: 'Сен сынак экзаменди али өтө элексиң.', mistakes: 'Каталарды талдоо', mistakesShort: 'Каталар', noMistakes: 'Кайталоо үчүн ката жок', mistakesCount: (count) => `${count} суроону кайталоо керек`, lockedAnswer: 'Жооп сакталды. Артка кайтып өзгөртүү мүмкүн эмес.', forwardOnly: 'Экзамен алдыга гана жүрөт: артка кайтуу жана жоопту өзгөртүү өчүрүлгөн.', answered: (count, total) => `Жооп берилди: ${count}/${total}`, next: 'Кийинки →', finish: 'Экзаменди бүтүрүү', finishNow: 'Экзаменди азыр бүтүрүү', exitTitle: 'Экзаменден чыгабызбы?', exitBody: 'Аракет дароо аяктайт. JOL тандалган жоопторду сактап, жыйынтыкты жана каталарды көрсөтөт.', exitCancel: 'Калуу', exitConfirm: 'Бүтүрүп чыгуу', normalLabel: 'СЫНОО ЭКЗАМЕН', strictLabel: 'КАТУУ ЭКЗАМЕН · BETA', resultTitle: 'Экзамен аяктады', resultPassed: 'ЭКЗАМЕН ӨТТҮ', resultFailed: 'АЗЫРЫНЧА ӨТПӨДҮ', passHint: 'Өтүү үчүн 20 суроонун кеминде 18ине туура жооп керек.', saved: 'Жыйынтык түзмөктө сакталды', savedHint: 'Экзамен тарыхы жана каталар колдонмо кайра ачылганда да калат.', review: (count) => `Каталарды талдоо (${count})`, retry: 'Дагы бир жолу өтүү', home: 'Башкы бетке',
    },
    strict: {
      eyebrow: 'JOL · КАТУУ РЕЖИМ · BETA', title: 'Катуу экзамен', body: 'Камера экзамен бою активдүү болот. Бетиңизди кадр зонасында кармаңыз: жооптор бекитилет, мурунку суроого кайтуу өчүрүлгөн.', cameraTitle: 'Алдыңкы камера', cameraBody: 'Камерага уруксат бер. Бул MVP видеону жазбайт жана жөнөтпөйт.', privacy: 'Кадрлар сакталбайт жана жөнөтүлбөйт. APK ичинде бетти аныктоо түзмөктүн өзүндө иштейт.', request: 'Камерага уруксат берүү', ready: 'Камера даяр', checking: 'Камерага уруксат текшерилүүдө…', denied: 'Камерага уруксат берилген жок', blocked: 'Камерага системалык жөндөөлөрдөн тыюу салынган', requesting: 'Уруксат суралууда…', retry: 'Кайра аракет кылуу', requestFailed: 'Камерага уруксат суралган жок', requestFailedHint: 'Системалык терезе ачылган жок. Кайра аракет кыл же Expo Go/JOL үчүн камерага уруксатты телефон жөндөөлөрүнөн бер.', missing: 'Камера модулу орнотулган эмес', settings: 'Жөндөөлөрдү ачуу', settingsHint: 'Камерага системадан тыюу салынган. Телефондун жөндөөлөрүнөн уруксат берип, JOLго кайтыңыз.', start: 'Катуу экзаменди баштоо', back: 'Артка', cameraBadge: 'КАМЕРА · BETA', faceTarget: 'БЕТ ЗОНАСЫ', faceHint: 'Катуу экзамен учурунда бетиңизди рамканын ичинде кармаңыз.', faceDetected: 'Бет көзөмөл зонасында', faceMissing: 'Бет табылган жок', faceChecking: 'Бет изделүүдө…', facePreviewOnly: 'БЕТ ЗОНАСЫ · АЛДЫН АЛА КӨРҮҮ', faceMissingCountdown: (seconds) => `Бетиңизди кадрга кайтарыңыз · ${seconds}с`, faceMonitoringActive: 'Бет көзөмөлү активдүү', faceMonitoringApk: 'Бет көзөмөлү APKда иштейт', faceApkHint: 'Expo Go камераны жана бет зонасын көрсөтөт. ML көзөмөлү 1/3–3/3 нативдик APKда активдешет.', faceViolations: (count, total) => `Бузуулар ${count}/${total}`, cameraUnavailable: 'Алдыңкы камера жеткиликсиз',
    },
    profile: {
      eyebrow: 'JOL · ПРОФИЛЬ', title: 'Сенин прогрессиң', subtitle: 'Даярдык, максат жана тарых бир жерде.', readiness: 'Даярдык', attempts: 'Аракет', best: 'Эң жакшы', mistakes: 'Каталар', personal: 'Даярдык', name: 'Аты', category: 'Категория', examDate: 'Экзамен күнү', noDate: 'Күнү жок', pace: 'Темп', minDay: 'мүн/күн', language: 'Интерфейс тили', appearance: 'Тема', dark: 'Караңгы', light: 'Ачык', history: 'Акыркы экзамендер', noHistory: 'Экзамен тарыхы азырынча жок.', resetProgress: 'Окуу прогрессин тазалоо', replay: 'JOLду нөлдөн баштоо', defaultName: 'JOL айдоочусу', resetTitle: 'Прогрессти тазалайлыбы?', resetBody: 'Жооптор, каталар жана экзамен тарыхы бул түзмөктөн өчүрүлөт.', resetCancel: 'Жок', resetConfirm: 'Тазалоо', replayTitle: 'JOLду нөлдөн баштайлыбы?', replayBody: 'Профиль, маршрут жөндөөлөрү, жооптор, каталар жана экзамен тарыхы өчүрүлөт. JOL биринчи ачылгандай башталат.', replayConfirm: 'Баарын өчүрүп баштоо',
    },
    ai: {
      eyebrow: 'JOL · ЖАРДАМЧЫ', title: 'Жол эрежелери боюнча жардамчы', subtitle: 'Жолдогу кырдаал жөнүндө сура — JOL тиешелүү эрежелерди жана байланышкан бөлүмдөрдү табат.', offline: 'ОФЛАЙН', online: 'ОНЛАЙН AI', onlineBeta: 'ТУТАШКАН ЭМЕС', placeholder: 'Эреже же кырдаал жөнүндө сура…', onlineTitle: 'Онлайн AI азырынча туташкан эмес', onlineBody: 'Биз жөнөкөй заглушканы чыныгы AI деп көрсөтпөйбүз. Азыр 24 бөлүм боюнча офлайн жардамчыны колдон.', networkOnline: 'ТАРМАК · ОНЛАЙН', networkOffline: 'ТАРМАК · ОФЛАЙН', networkChecking: 'ТАРМАК ТЕКШЕРИЛҮҮДӨ', networkOnlineHint: 'Интернет жеткиликтүү. Жооптор азырынча текшерилген жергиликтүү ЖЭЭ базасынан берилет.', networkOfflineHint: 'Интернет жок — жергиликтүү жардамчы тармаксыз иштей берет.', offlineScope: 'жол эрежелери маалымдамасы менен жергиликтүү иштейт', question: 'СЕНИН СУРООҢ', openRule: 'Тиешелүү бөлүмдү ачуу', related: 'Тиешелүү бөлүмдөр', allRules: 'Жол эрежелеринин 24 бөлүмү', quick: ['шаардагы ылдамдык', 'кайда озуп өтүүгө болбойт', 'ЖКО болгондо эмне кылуу керек', 'светофор сигналдары'],
    },
    rules: {
      eyebrow: 'JOL · КР ЖЭЭ', title: 'Эрежелердин бардык бөлүмдөрү', subtitle: 'Кыргыз Республикасынын ЖЭЭнин 24 бөлүмү. Кыска конспекттер офлайн жеткиликтүү.', section: 'БӨЛҮМ', main: 'Негизгиси', source: 'Эреженин булагы', sourceDescription: (section) => `«${section}» бөлүмүнүн кыска версиясы JOL ичинде офлайн жеткиликтүү. Толук расмий текст интернет аркылуу ачылат.`, openSource: 'Расмий булакты ачуу', checking: 'Байланыш текшерилүүдө…', noInternetTitle: 'Интернет жок', noInternetBody: 'Расмий булакты ачуу үчүн интернетке туташыңыз.', note: 'Офлайн-конспект даярдануу үчүн. Талаштуу суроодо расмий текстти текшериңиз.', back: 'Артка', notFound: 'Бөлүм табылган жок',
    },
  },
  en: {
    home: {
      live: 'JOL', waiting: 'JOL is waiting for your first answers', passed: 'Mock exam passed', readiness: (value) => `Readiness from the local bank: ${value}%`, dataHint: 'Practice, mistakes and exam results move your route automatically.', started: 'Start your first question', mastered: (done, total) => `Mastered ${done}/${total}`, offlineHint: 'Progress, practice and the mock exam are stored locally and work offline.', last: (score, total) => `Last ${score}/${total}`, currentStart: 'Start answering questions — progress is saved on this device immediately.', currentProgress: (done, total) => `${done} of ${total} questions are now in your progress.`, currentMistakes: (count) => `${count} question(s) are waiting in Mistakes.`, currentExam: (score, total) => `Last mock exam: ${score}/${total}.`, currentReady: 'You reached the pass threshold. Reinforce your weak topics now.',
    },
    network: {
      online: 'ONLINE',
      offline: 'OFFLINE',
      checking: 'NETWORK…',
      title: 'Connection mode',
      body: 'JOL automatically falls back to offline when internet is unavailable. With a connection, you can keep the app offline manually or return online.',
      onlineMode: 'Online',
      offlineMode: 'Offline',
      onlineHint: 'Internet is available. JOL can use network links and online features.',
      offlineHint: 'Questions, rules, progress and the local tutor keep working without internet.',
      forcedOfflineHint: 'Offline mode is forced only inside JOL — your phone Wi‑Fi stays unchanged.',
      autoOfflineHint: 'No internet — JOL automatically works offline.',
      noInternetTitle: 'No connection',
      noInternetBody: 'Connect to the internet to enable JOL online mode. Local features will keep working offline.',
      dismiss: 'Got it',
    },
    exam: {
      eyebrow: 'JOL · EXAM', title: 'Choose a mode', subtitle: 'Standard mock exam or strict camera mode.', practiceTitle: 'Mock exam', practiceBody: '20 questions · 25 minutes · answers lock after selection · pass at 18/20.', practiceButton: 'Start mock exam', strictTitle: 'Strict exam', strictBody: 'The same exam with the front camera active. In the APK, face presence is monitored on-device with a 1/3–3/3 violation counter.', strictButton: 'Open strict mode', beta: 'BETA', questions: 'questions', minutes: 'minutes', pass: 'to pass', latest: 'LAST RESULT', attemptsLabel: 'ATTEMPTS', bestLabel: 'BEST', historyLabel: 'HISTORY', noQuestions: 'No questions are available to start the exam.', passed: 'PASSED', failed: 'FAILED', historyHint: 'Open result and mistakes.', noHistory: 'You have not taken a mock exam yet.', mistakes: 'Mistake review', mistakesShort: 'Mistakes', noMistakes: 'No mistakes to review yet', mistakesCount: (count) => `${count} question(s) need review`, lockedAnswer: 'Answer saved. You cannot go back and change it.', forwardOnly: 'The exam only moves forward: back navigation and answer changes are disabled.', answered: (count, total) => `Answered: ${count}/${total}`, next: 'Next →', finish: 'Finish exam', finishNow: 'Finish exam now', exitTitle: 'Leave the exam?', exitBody: 'The attempt will end immediately. JOL will save your selected answers and show the result with mistakes.', exitCancel: 'Stay', exitConfirm: 'Finish and leave', normalLabel: 'MOCK EXAM', strictLabel: 'STRICT EXAM · BETA', resultTitle: 'Exam complete', resultPassed: 'EXAM PASSED', resultFailed: 'NOT PASSED YET', passHint: 'You need at least 18 correct answers out of 20.', saved: 'Result saved locally', savedHint: 'Exam history and mistakes remain after restarting the app.', review: (count) => `Review mistakes (${count})`, retry: 'Try again', home: 'Home',
    },
    strict: {
      eyebrow: 'JOL · STRICT MODE · BETA', title: 'Strict exam', body: 'The camera stays active throughout the exam. Keep your face inside the frame: answers lock and returning to previous questions is disabled.', cameraTitle: 'Front camera', cameraBody: 'Allow camera access. This MVP does not record or upload video.', privacy: 'Frames are not stored or uploaded. In the APK, face presence detection runs locally on-device.', request: 'Allow camera', ready: 'Camera ready', checking: 'Checking camera access…', denied: 'Camera access not granted', blocked: 'Camera is blocked in system settings', requesting: 'Requesting permission…', retry: 'Try again', requestFailed: 'Could not request camera access', requestFailedHint: 'The system permission dialog did not open. Try again, or enable Camera for Expo Go/JOL in phone settings.', missing: 'Camera module is not installed yet', settings: 'Open settings', settingsHint: 'Camera access is blocked by the system. Allow it in phone settings, then return to JOL.', start: 'Start strict exam', back: 'Back', cameraBadge: 'CAMERA · BETA', faceTarget: 'FACE ZONE', faceHint: 'Keep your face inside the frame throughout the strict exam.', faceDetected: 'Face inside control zone', faceMissing: 'Face not detected', faceChecking: 'Looking for face…', facePreviewOnly: 'FACE ZONE · PREVIEW', faceMissingCountdown: (seconds) => `Return your face to frame · ${seconds}s`, faceMonitoringActive: 'Face monitoring active', faceMonitoringApk: 'Face monitoring activates in APK', faceApkHint: 'Expo Go shows the camera and face zone. Native ML monitoring with 1/3–3/3 violations activates in the APK build.', faceViolations: (count, total) => `Violations ${count}/${total}`, cameraUnavailable: 'Front camera unavailable',
    },
    profile: {
      eyebrow: 'JOL · PROFILE', title: 'Your progress', subtitle: 'Preparation, goals and history in one place.', readiness: 'Readiness', attempts: 'Attempts', best: 'Best', mistakes: 'Mistakes', personal: 'Preparation', name: 'Name', category: 'Category', examDate: 'Exam date', noDate: 'No date', pace: 'Pace', minDay: 'min/day', language: 'Interface language', appearance: 'Theme', dark: 'Dark', light: 'Light', history: 'Recent exams', noHistory: 'No exam history yet.', resetProgress: 'Reset learning progress', replay: 'Start JOL from scratch', defaultName: 'JOL Driver', resetTitle: 'Reset progress?', resetBody: 'Answers, mistakes and exam history will be removed from this device.', resetCancel: 'Cancel', resetConfirm: 'Reset', replayTitle: 'Start JOL from scratch?', replayBody: 'Your profile, route settings, answers, mistakes and exam history will be removed. JOL will reopen like a first launch.', replayConfirm: 'Delete all and restart',
    },
    ai: {
      eyebrow: 'JOL · TUTOR', title: 'Road rules tutor', subtitle: 'Ask about a road situation — JOL will find the relevant rules and related sections.', offline: 'OFFLINE', online: 'ONLINE AI', onlineBeta: 'NOT CONNECTED', placeholder: 'Ask about a rule or road situation…', onlineTitle: 'Online AI is not connected yet', onlineBody: 'We do not present a placeholder as real AI. Use the offline tutor across the 24 local rule sections for now.', networkOnline: 'NETWORK · ONLINE', networkOffline: 'NETWORK · OFFLINE', networkChecking: 'CHECKING NETWORK', networkOnlineHint: 'Internet is available. Answers still use the verified local road-rules knowledge base for now.', networkOfflineHint: 'No internet — the local tutor keeps working offline.', offlineScope: 'Works locally from the rules guide', question: 'YOUR QUESTION', openRule: 'Open matching section', related: 'Relevant sections', allRules: 'All 24 rule sections', quick: ['city speed limit', 'where overtaking is prohibited', 'what to do after a crash', 'traffic light signals'],
    },
    rules: {
      eyebrow: 'JOL · KG ROAD RULES', title: 'All rule sections', subtitle: '24 sections of Kyrgyz Republic road rules. Short notes are available offline.', section: 'SECTION', main: 'Key points', source: 'Rule source', sourceDescription: (section) => `A short version of “${section}” is available offline in JOL. The full official text opens online.`, openSource: 'Open official source', checking: 'Checking connection…', noInternetTitle: 'No connection', noInternetBody: 'Connect to the internet to open the official source.', note: 'Offline notes are for study. For disputed details, check the official text.', back: 'Back', notFound: 'Section not found',
    },
  },
};

export function getProductCopy(lang: Lang): ProductCopy {
  return copy[lang];
}
