import type { Lang } from '@/i18n/types';

export type QuestionTopic =
  | 'driver'
  | 'signals'
  | 'emergency'
  | 'speed'
  | 'priority';

export type LocalizedText = {
  ru: string;
  ky: string;
  en: string;
};

export type QuestionOption = {
  id: string;
  text: LocalizedText;
};

export type PddQuestion = {
  id: string;
  category: 'B';
  topic: QuestionTopic;
  prompt: LocalizedText;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: LocalizedText;
  ruleRef: LocalizedText;
  sourceTitle: LocalizedText;
  sourceUrl: string;
};

export type LocalizedQuestion = Omit<
  PddQuestion,
  'prompt' | 'options' | 'explanation' | 'ruleRef' | 'sourceTitle'
> & {
  prompt: string;
  options: { id: string; text: string }[];
  explanation: string;
  ruleRef: string;
  sourceTitle: string;
};

const OFFICIAL_SOURCE = 'https://cbd.minjust.gov.kg/33664/edition/33301/ru';
const SOURCE_TITLE: LocalizedText = {
  ru: 'ПДД Кыргызской Республики — постановление № 421, редакция 31.10.2025',
  ky: 'Кыргыз Республикасынын ЖЭЭ — № 421 токтом, 31.10.2025 редакциясы',
  en: 'Road Rules of the Kyrgyz Republic — Resolution No. 421, edition of 31 Oct 2025',
};

const t = (ru: string, en: string, ky: string): LocalizedText => ({ ru, en, ky });
const ref = (section: string): LocalizedText => ({
  ru: `ПДД КР, п. ${section}`,
  ky: `КР ЖЭЭ, ${section}-пункт`,
  en: `KR Road Rules, sec. ${section}`,
});

export const QUESTION_BANK: PddQuestion[] = [
  {
    id: 'signals-green', category: 'B', topic: 'signals',
    prompt: t('Что означает зелёный сигнал светофора?', 'What does a green traffic light mean?', 'Светофордун жашыл сигналы эмнени билдирет?'),
    options: [
      { id: 'a', text: t('Разрешает движение', 'Movement is permitted', 'Кыймылга уруксат берет') },
      { id: 'b', text: t('Запрещает движение', 'Movement is prohibited', 'Кыймылга тыюу салат') },
      { id: 'c', text: t('Требует обязательно остановиться', 'You must stop', 'Сөзсүз токтоону талап кылат') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 6.2 ПДД КР: зелёный сигнал разрешает движение.', 'Section 6.2: a green signal permits movement.', 'КР ЖЭЭнин 6.2-пункту: жашыл сигнал кыймылга уруксат берет.'),
    ruleRef: ref('6.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'signals-red', category: 'B', topic: 'signals',
    prompt: t('Что означает красный, в том числе мигающий, сигнал светофора?', 'What does a red traffic light, including a flashing red signal, mean?', 'Светофордун кызыл, анын ичинде күйүп-өчкөн кызыл сигналы эмнени билдирет?'),
    options: [
      { id: 'a', text: t('Разрешает движение с осторожностью', 'Movement is permitted with caution', 'Этияттык менен кыймылга уруксат берет') },
      { id: 'b', text: t('Запрещает движение', 'Movement is prohibited', 'Кыймылга тыюу салат') },
      { id: 'c', text: t('Разрешает движение только направо', 'Only a right turn is permitted', 'Оңго гана бурулууга уруксат берет') },
    ],
    correctOptionId: 'b',
    explanation: t('Пункт 6.2 ПДД КР: красный сигнал, в том числе мигающий, запрещает движение.', 'Section 6.2: a red signal, including a flashing red signal, prohibits movement.', 'КР ЖЭЭнин 6.2-пункту: кызыл, анын ичинде күйүп-өчкөн кызыл сигнал кыймылга тыюу салат.'),
    ruleRef: ref('6.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'signals-green-flash', category: 'B', topic: 'signals',
    prompt: t('Что означает мигающий зелёный сигнал светофора?', 'What does a flashing green traffic light mean?', 'Светофордун күйүп-өчкөн жашыл сигналы эмнени билдирет?'),
    options: [
      { id: 'a', text: t('Запрещает движение', 'Movement is prohibited', 'Кыймылга тыюу салат') },
      { id: 'b', text: t('Разрешает движение и предупреждает, что время зелёного заканчивается', 'Movement is permitted, but the green phase is about to end', 'Кыймылга уруксат берет жана жашыл сигналдын убактысы бүтүп жатканын эскертет') },
      { id: 'c', text: t('Означает неисправность светофора', 'The traffic light is faulty', 'Светофор бузулганын билдирет') },
    ],
    correctOptionId: 'b',
    explanation: t('По п. 6.2 зелёный мигающий сигнал разрешает движение и информирует о скором включении запрещающего сигнала.', 'Under section 6.2, a flashing green signal permits movement and warns that a prohibiting signal will appear soon.', '6.2-пункт боюнча күйүп-өчкөн жашыл сигнал кыймылга уруксат берет жана жакында тыюу салуучу сигнал күйөрүн билдирет.'),
    ruleRef: ref('6.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'signals-yellow-flash', category: 'B', topic: 'signals',
    prompt: t('Что означает мигающий жёлтый сигнал светофора?', 'What does a flashing yellow traffic light mean?', 'Светофордун күйүп-өчкөн сары сигналы эмнени билдирет?'),
    options: [
      { id: 'a', text: t('Разрешает движение и предупреждает об опасности или нерегулируемом участке', 'Movement is permitted, with a warning about danger or an uncontrolled area', 'Кыймылга уруксат берет жана коркунуч же жөнгө салынбаган участок жөнүндө эскертет') },
      { id: 'b', text: t('Всегда требует полной остановки', 'A complete stop is always required', 'Ар дайым толук токтоону талап кылат') },
      { id: 'c', text: t('Разрешает движение только маршрутному транспорту', 'Only public transport may proceed', 'Маршруттук транспортко гана кыймылга уруксат берет') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 6.2: жёлтый мигающий разрешает движение и информирует о нерегулируемом перекрёстке или пешеходном переходе, предупреждая об опасности.', 'Section 6.2: a flashing yellow signal permits movement and warns about an uncontrolled intersection, pedestrian crossing or other danger.', '6.2-пункт: күйүп-өчкөн сары сигнал кыймылга уруксат берип, жөнгө салынбаган кесилиш же жөө өтмөк жана коркунуч жөнүндө эскертет.'),
    ruleRef: ref('6.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'signals-yellow-exception', category: 'B', topic: 'signals',
    prompt: t('Можно ли продолжить движение при включении жёлтого сигнала, если остановиться можно только экстренным торможением?', 'May you continue when the light turns yellow if stopping would require emergency braking?', 'Сары сигнал күйгөндө, токтоо үчүн шашылыш тормоздоо гана керек болсо, кыймылды улантууга болобу?'),
    options: [
      { id: 'a', text: t('Да, в предусмотренном правилами случае', 'Yes, in the case provided by the rules', 'Ооба, эрежеде каралган учурда') },
      { id: 'b', text: t('Нет, никогда', 'No, never', 'Жок, эч качан') },
      { id: 'c', text: t('Только если сзади нет автомобилей', 'Only if there are no vehicles behind', 'Артта унаа жок болсо гана') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 6.14 разрешает дальнейшее движение водителю, который при включении жёлтого не может остановиться в установленном месте без экстренного торможения.', 'Section 6.14 allows a driver to continue if the yellow signal appears and the vehicle cannot stop at the required place without emergency braking.', '6.14-пункт сары сигнал күйгөндө белгиленген жерде шашылыш тормоздоосуз токтой албаган айдоочуга кыймылды улантууга уруксат берет.'),
    ruleRef: ref('6.14'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'signals-regulator-priority', category: 'B', topic: 'signals',
    prompt: t('Что имеет приоритет, если распоряжение регулировщика противоречит сигналу светофора?', 'What takes priority if a traffic controller’s instruction conflicts with a traffic light?', 'Жөнгө салуучунун көрсөтмөсү светофордун сигналына каршы келсе, кайсынысы артыкчылыктуу?'),
    options: [
      { id: 'a', text: t('Сигнал светофора', 'The traffic light', 'Светофордун сигналы') },
      { id: 'b', text: t('Распоряжение регулировщика', 'The traffic controller’s instruction', 'Жөнгө салуучунун көрсөтмөсү') },
      { id: 'c', text: t('Дорожная разметка', 'Road markings', 'Жол чийиндери') },
    ],
    correctOptionId: 'b',
    explanation: t('Пункт 6.15: водители и пешеходы обязаны выполнять требования регулировщика, даже если они противоречат сигналам светофора, знакам или разметке.', 'Section 6.15: drivers and pedestrians must follow a traffic controller’s instructions even when they conflict with traffic lights, signs or markings.', '6.15-пункт: айдоочулар жана жөө жүргүнчүлөр жөнгө салуучунун талаптарын, алар светофорго, белгилерге же чийиндерге каршы келсе да, аткарууга милдеттүү.'),
    ruleRef: ref('6.15'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'emergency-crash-hazard', category: 'B', topic: 'emergency',
    prompt: t('Нужно ли включать аварийную световую сигнализацию при ДТП?', 'Must the hazard lights be switched on after a road crash?', 'Жол кырсыгы болгондо авариялык жарык сигналын күйгүзүү керекпи?'),
    options: [
      { id: 'a', text: t('Да', 'Yes', 'Ооба') },
      { id: 'b', text: t('Нет', 'No', 'Жок') },
      { id: 'c', text: t('Только ночью', 'Only at night', 'Түнкүсүн гана') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 7.1 прямо требует включить аварийную световую сигнализацию при дорожно-транспортном происшествии.', 'Section 7.1 explicitly requires the hazard warning lights to be switched on after a road crash.', '7.1-пункт жол кырсыгы болгондо авариялык жарык сигналын сөзсүз күйгүзүүнү талап кылат.'),
    ruleRef: ref('7.1'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'emergency-blinded', category: 'B', topic: 'emergency',
    prompt: t('Нужно ли включать аварийную сигнализацию при ослеплении водителя светом фар?', 'Must hazard lights be switched on if the driver is dazzled by headlights?', 'Айдоочунун көзүн фаранын жарыгы уялтканда авариялык сигналды күйгүзүү керекпи?'),
    options: [
      { id: 'a', text: t('Да', 'Yes', 'Ооба') },
      { id: 'b', text: t('Нет', 'No', 'Жок') },
      { id: 'c', text: t('Только вне населённого пункта', 'Only outside a built-up area', 'Калктуу конуштан тышкары гана') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 7.1 включает ослепление водителя светом фар в перечень случаев обязательного включения аварийной сигнализации.', 'Section 7.1 includes being dazzled by headlights among the cases when hazard warning lights must be switched on.', '7.1-пункт айдоочунун көзүн фара жарыгы уялткан учурду авариялык сигнал милдеттүү күйгүзүлчү учурлардын катарына киргизет.'),
    ruleRef: ref('7.1'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'emergency-towing', category: 'B', topic: 'emergency',
    prompt: t('На каком транспортном средстве при буксировке должна быть включена аварийная сигнализация?', 'Which vehicle must have its hazard lights on during towing?', 'Сүйрөө учурунда авариялык сигнал кайсы транспорт каражатында күйгүзүлүшү керек?'),
    options: [
      { id: 'a', text: t('На буксируемом', 'On the vehicle being towed', 'Сүйрөлүп бара жаткан унаада') },
      { id: 'b', text: t('Только на буксирующем', 'Only on the towing vehicle', 'Сүйрөп бара жаткан унаада гана') },
      { id: 'c', text: t('Ни на одном', 'On neither vehicle', 'Эч биринде') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 7.1: при буксировке аварийная световая сигнализация включается на буксируемом транспортном средстве.', 'Section 7.1: during towing, the hazard warning lights are switched on on the vehicle being towed.', '7.1-пункт: сүйрөөдө авариялык жарык сигналы сүйрөлүп бара жаткан транспорт каражатында күйгүзүлөт.'),
    ruleRef: ref('7.1'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'emergency-sign-crash', category: 'B', topic: 'emergency',
    prompt: t('После ДТП нужно ли выставить знак аварийной остановки?', 'After a road crash, must you place a warning triangle?', 'Жол кырсыгынан кийин авариялык токтоо белгисин коюу керекпи?'),
    options: [
      { id: 'a', text: t('Да, незамедлительно', 'Yes, immediately', 'Ооба, дароо') },
      { id: 'b', text: t('Только если повреждены фары', 'Only if the headlights are damaged', 'Фаралар бузулса гана') },
      { id: 'c', text: t('Нет, достаточно аварийной сигнализации', 'No, hazard lights are enough', 'Жок, авариялык сигнал жетиштүү') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 7.2 требует незамедлительно выставить знак аварийной остановки при ДТП.', 'Section 7.2 requires a warning triangle to be placed immediately after a road crash.', '7.2-пункт жол кырсыгы болгондо авариялык токтоо белгисин дароо коюуну талап кылат.'),
    ruleRef: ref('7.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'driver-crash-first-action', category: 'B', topic: 'driver',
    prompt: t('Какое действие обязан выполнить водитель, причастный к ДТП?', 'What must a driver involved in a road crash do first?', 'Жол кырсыгына катышкан айдоочу биринчи кезекте эмне кылууга милдеттүү?'),
    options: [
      { id: 'a', text: t('Сразу покинуть место происшествия', 'Leave the scene immediately', 'Окуя болгон жерден дароо кетүү') },
      { id: 'b', text: t('Немедленно остановить транспортное средство', 'Stop the vehicle immediately', 'Транспорт каражатын дароо токтотуу') },
      { id: 'c', text: t('Сначала переставить автомобиль в удобное место', 'First move the vehicle to a more convenient place', 'Адегенде унааны ыңгайлуу жерге жылдыруу') },
    ],
    correctOptionId: 'b',
    explanation: t('Пункт 2.6 требует немедленно остановить транспортное средство, включить аварийную сигнализацию и выставить знак аварийной остановки.', 'Section 2.6 requires the driver to stop immediately, switch on the hazard lights and place a warning triangle.', '2.6-пункт транспорт каражатын дароо токтотуп, авариялык сигналды күйгүзүп жана авариялык токтоо белгисин коюуну талап кылат.'),
    ruleRef: ref('2.6'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'driver-seatbelt', category: 'B', topic: 'driver',
    prompt: t('Что обязан делать водитель при движении на автомобиле, оборудованном ремнями безопасности?', 'What must a driver do when driving a vehicle fitted with seat belts?', 'Коопсуздук куру менен жабдылган унаада айдоочу эмне кылууга милдеттүү?'),
    options: [
      { id: 'a', text: t('Быть пристёгнутым и не перевозить непристёгнутых пассажиров, кроме предусмотренных исключений', 'Wear a seat belt and not carry unbelted passengers except where the rules provide an exception', 'Коопсуздук курун тагынуу жана эрежеде каралган учурлардан тышкары куру тагылбаган жүргүнчүлөрдү ташыбоо') },
      { id: 'b', text: t('Пристёгиваться только за городом', 'Wear a seat belt only outside towns', 'Калктуу конуштан тышкары гана куру тагынуу') },
      { id: 'c', text: t('Ремень обязателен только пассажирам', 'Seat belts are mandatory only for passengers', 'Коопсуздук куру жүргүнчүлөргө гана милдеттүү') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 2.1.2 устанавливает обязанность водителя быть пристёгнутым и не перевозить непристёгнутых пассажиров, за исключением прямо предусмотренных случаев.', 'Section 2.1.2 requires the driver to wear a seat belt and not carry unbelted passengers except in the specifically permitted cases.', '2.1.2-пункт айдоочуга коопсуздук курун тагынууну жана атайын каралган учурлардан тышкары куру тагылбаган жүргүнчүлөрдү ташыбоону милдеттендирет.'),
    ruleRef: ref('2.1.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'priority-special-vehicle', category: 'B', topic: 'priority',
    prompt: t('Что обязан сделать водитель при приближении автомобиля с включённым синим и/или красным маячком и специальным звуковым сигналом?', 'What must a driver do when a vehicle approaches with a blue and/or red beacon and a special audible signal?', 'Көк жана/же кызыл маягы жана атайын үн сигналы күйгөн унаа жакындаганда айдоочу эмне кылууга милдеттүү?'),
    options: [
      { id: 'a', text: t('Уступить дорогу, а при необходимости остановиться', 'Give way and stop if necessary', 'Жол берип, зарыл болсо токтоо') },
      { id: 'b', text: t('Увеличить скорость', 'Increase speed', 'Ылдамдыкты көбөйтүү') },
      { id: 'c', text: t('Продолжить движение без изменений', 'Continue without changing anything', 'Кыймылды өзгөртпөстөн улантуу') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 3.3 требует уступить дорогу для беспрепятственного проезда такого транспорта, а при необходимости остановиться.', 'Section 3.3 requires drivers to give way so the special vehicle can pass freely and to stop if necessary.', '3.3-пункт мындай транспорт тоскоолдуксуз өтүшү үчүн жол берүүнү, зарыл болсо токтоону талап кылат.'),
    ruleRef: ref('3.3'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'priority-standing-blue', category: 'B', topic: 'priority',
    prompt: t('Как действовать, приближаясь к стоящему автомобилю с включённым синим проблесковым маячком?', 'What should you do when approaching a stationary vehicle with a blue flashing beacon?', 'Көк жаркылдоочу маягы күйгөн токтоп турган унаага жакындаганда кандай аракет кылуу керек?'),
    options: [
      { id: 'a', text: t('Снизить скорость, чтобы при необходимости немедленно остановиться', 'Reduce speed so you can stop immediately if necessary', 'Зарыл болсо дароо токтой ала тургандай ылдамдыкты азайтуу') },
      { id: 'b', text: t('Обязательно подать звуковой сигнал', 'You must sound the horn', 'Сөзсүз үн сигналын берүү') },
      { id: 'c', text: t('Увеличить скорость и быстрее проехать', 'Increase speed and pass more quickly', 'Ылдамдыкты көбөйтүп тезирээк өтүү') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 3.4 требует снизить скорость так, чтобы иметь возможность немедленно остановиться.', 'Section 3.4 requires speed to be reduced enough to allow an immediate stop if necessary.', '3.4-пункт зарыл болсо дароо токтой ала тургандай ылдамдыкты азайтууну талап кылат.'),
    ruleRef: ref('3.4'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'speed-settlement', category: 'B', topic: 'speed',
    prompt: t('Какова общая максимальная скорость в населённых пунктах, если иное не установлено знаками?', 'What is the general maximum speed in built-up areas unless signs set another limit?', 'Белгилер башка чектөө койбосо, калктуу конуштардагы жалпы максималдуу ылдамдык канча?'),
    options: [
      { id: 'a', text: t('40 км/ч', '40 km/h', '40 км/саат') },
      { id: 'b', text: t('60 км/ч', '60 km/h', '60 км/саат') },
      { id: 'c', text: t('90 км/ч', '90 km/h', '90 км/саат') },
    ],
    correctOptionId: 'b',
    explanation: t('Пункт 10.2: в населённых пунктах разрешается движение со скоростью не более 60 км/ч, если специальными знаками не установлен иной режим.', 'Section 10.2: in built-up areas the maximum speed is 60 km/h unless traffic signs set another limit.', '10.2-пункт: калктуу конуштарда атайын белгилер башка режимди белгилебесе, 60 км/сааттан ашпаган ылдамдыкка уруксат берилет.'),
    ruleRef: ref('10.2'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'speed-outside-road', category: 'B', topic: 'speed',
    prompt: t('Какова максимальная скорость легкового автомобиля вне населённого пункта на обычной дороге?', 'What is the maximum speed for a passenger car on a normal road outside a built-up area?', 'Калктуу конуштан тышкары кадимки жолдо жеңил унаанын максималдуу ылдамдыгы канча?'),
    options: [
      { id: 'a', text: t('70 км/ч', '70 km/h', '70 км/саат') },
      { id: 'b', text: t('90 км/ч', '90 km/h', '90 км/саат') },
      { id: 'c', text: t('110 км/ч', '110 km/h', '110 км/саат') },
    ],
    correctOptionId: 'b',
    explanation: t('Пункт 10.3: для легковых автомобилей вне населённых пунктов на остальных дорогах (не автомагистралях) — не более 90 км/ч.', 'Section 10.3: passenger cars are limited to 90 km/h on roads outside built-up areas other than motorways.', '10.3-пункт: калктуу конуштардан тышкары автомагистраль эмес жолдордо жеңил унаалар үчүн ылдамдык 90 км/сааттан ашпоого тийиш.'),
    ruleRef: ref('10.3'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'speed-motorway', category: 'B', topic: 'speed',
    prompt: t('Какова максимальная скорость легкового автомобиля на автомагистрали вне населённого пункта?', 'What is the maximum speed for a passenger car on a motorway outside a built-up area?', 'Калктуу конуштан тышкары автомагистралда жеңил унаанын максималдуу ылдамдыгы канча?'),
    options: [
      { id: 'a', text: t('90 км/ч', '90 km/h', '90 км/саат') },
      { id: 'b', text: t('100 км/ч', '100 km/h', '100 км/саат') },
      { id: 'c', text: t('110 км/ч', '110 km/h', '110 км/саат') },
    ],
    correctOptionId: 'c',
    explanation: t('Пункт 10.3: легковым автомобилям на автомагистралях вне населённых пунктов разрешено движение со скоростью не более 110 км/ч.', 'Section 10.3: passenger cars may travel at up to 110 km/h on motorways outside built-up areas.', '10.3-пункт: калктуу конуштардан тышкары автомагистралдарда жеңил унааларга 110 км/сааттан ашпаган ылдамдыкка уруксат берилет.'),
    ruleRef: ref('10.3'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'speed-new-driver', category: 'B', topic: 'speed',
    prompt: t('Какова максимальная скорость для транспортного средства, которым управляет водитель со стажем до двух лет?', 'What is the maximum speed for a vehicle driven by someone with less than two years of driving experience?', 'Айдоочулук стажы эки жылга жетпеген айдоочу башкарган транспорттун максималдуу ылдамдыгы канча?'),
    options: [
      { id: 'a', text: t('Не более 70 км/ч на всех дорогах', 'No more than 70 km/h on all roads', 'Бардык жолдордо 70 км/сааттан ашпайт') },
      { id: 'b', text: t('Не более 90 км/ч только за городом', 'No more than 90 km/h only outside towns', 'Калктуу конуштан тышкары гана 90 км/сааттан ашпайт') },
      { id: 'c', text: t('Ограничений по стажу нет', 'There is no experience-based limit', 'Стажга байланыштуу чектөө жок') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 10.3 устанавливает для водителей со стажем до двух лет ограничение не более 70 км/ч на всех дорогах.', 'Section 10.3 sets a 70 km/h maximum on all roads for drivers with less than two years of experience.', '10.3-пункт айдоочулук стажы эки жылга жетпеген айдоочулар үчүн бардык жолдордо 70 км/сааттан ашпаган чектөө белгилейт.'),
    ruleRef: ref('10.3'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'speed-towing', category: 'B', topic: 'speed',
    prompt: t('Какова максимальная скорость транспортного средства при буксировке другого механического транспортного средства?', 'What is the maximum speed when towing another motor vehicle?', 'Башка механикалык транспорт каражатын сүйрөп бара жатканда максималдуу ылдамдык канча?'),
    options: [
      { id: 'a', text: t('50 км/ч', '50 km/h', '50 км/саат') },
      { id: 'b', text: t('70 км/ч', '70 km/h', '70 км/саат') },
      { id: 'c', text: t('90 км/ч', '90 km/h', '90 км/саат') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 10.3: транспортным средствам, буксирующим механические транспортные средства, разрешается скорость не более 50 км/ч.', 'Section 10.3: a vehicle towing another motor vehicle is limited to 50 km/h.', '10.3-пункт: механикалык транспорт каражатын сүйрөп бара жаткан унаага 50 км/сааттан ашпаган ылдамдыкка уруксат берилет.'),
    ruleRef: ref('10.3'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
  {
    id: 'priority-turn-pedestrian', category: 'B', topic: 'priority',
    prompt: t('Кому водитель обязан уступить дорогу при повороте направо или налево?', 'Who must a driver give way to when turning right or left?', 'Оңго же солго бурулганда айдоочу кимге жол берүүгө милдеттүү?'),
    options: [
      { id: 'a', text: t('Пешеходам, переходящим дорогу, на которую он поворачивает, а также пересекающим её по велодорожке велосипедистам и пользователям СИМ', 'Pedestrians crossing the road being entered, and cyclists or personal-mobility users crossing it on a cycle path', 'Бурулуп кирген жолду өтүп жаткан жөө жүргүнчүлөргө, ошондой эле веложол менен кесип өтүп жаткан велосипедчилерге жана жеке мобилдүүлүк каражаттарын колдонгондорго') },
      { id: 'b', text: t('Никому, если включён указатель поворота', 'Nobody, if the turn signal is on', 'Бурулуш көрсөткүчү күйүп турса, эч кимге') },
      { id: 'c', text: t('Только встречным автомобилям', 'Only oncoming vehicles', 'Каршы келе жаткан унааларга гана') },
    ],
    correctOptionId: 'a',
    explanation: t('Пункт 13.1 обязывает при повороте уступить пешеходам, переходящим проезжую часть дороги, на которую водитель поворачивает, а также указанным участникам на велосипедной дорожке.', 'Section 13.1 requires a turning driver to give way to pedestrians crossing the road being entered and to the specified users on a cycle path.', '13.1-пункт бурулуп жаткан айдоочуну кирип жаткан жолдун жүрүү бөлүгүн өтүп жаткан жөө жүргүнчүлөргө жана веложолдогу көрсөтүлгөн катышуучуларга жол берүүгө милдеттендирет.'),
    ruleRef: ref('13.1'), sourceTitle: SOURCE_TITLE, sourceUrl: OFFICIAL_SOURCE,
  },
];

export function localizeText(value: LocalizedText, lang: Lang): string {
  return value[lang];
}

export function getLocalizedQuestion(question: PddQuestion, lang: Lang): LocalizedQuestion {
  return {
    ...question,
    prompt: localizeText(question.prompt, lang),
    options: question.options.map((option) => ({ id: option.id, text: localizeText(option.text, lang) })),
    explanation: localizeText(question.explanation, lang),
    ruleRef: localizeText(question.ruleRef, lang),
    sourceTitle: localizeText(question.sourceTitle, lang),
  };
}

export function getQuestionById(id: string): PddQuestion | undefined {
  return QUESTION_BANK.find((question) => question.id === id);
}

export function getLearningQuestions(_category?: string | null): PddQuestion[] {
  return QUESTION_BANK;
}

export function getMockExamQuestions(count = 20): PddQuestion[] {
  return QUESTION_BANK.slice(0, Math.min(count, QUESTION_BANK.length));
}
