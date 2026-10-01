import { getRuleSections } from '@/features/rules/rule-catalog';
import type { Lang } from '@/i18n/types';

const SMALL_TALK = [
  'привет', 'как дела', 'кто ты', 'что делаешь',
  'hello', 'hi', 'who are you',
  'салам', 'кандайсың',
];

type Topic = {
  sectionId: string;
  aliases: string[];
};

const TOPICS: Topic[] = [
  { sectionId: 'speed', aliases: ['скорость', 'скорост', 'км/ч', 'лимит скорости', 'speed', 'speed limit', 'km/h', 'ылдамдык', 'км/саат'] },
  { sectionId: 'overtake', aliases: ['обгон', 'обгонять', 'озуп', 'озуп өт', 'overtak', 'passing'] },
  { sectionId: 'driver', aliases: ['дтп', 'авария', 'аварию', 'столкнов', 'crash', 'accident', 'жко', 'кырсык'] },
  { sectionId: 'pedestrians', aliases: ['пешеход', 'пешеходы', 'pedestrian', 'жөө жүргүнчү', 'жөө жүргүнчүлөр'] },
  { sectionId: 'parking', aliases: ['парковка', 'стоянка', 'остановка', 'parking', 'stopping', 'токтотуу', 'токтоп туруу'] },
  { sectionId: 'signals', aliases: ['светофор', 'регулировщик', 'сигнал светофора', 'traffic light', 'traffic signal', 'светофор сигнал', 'жөнгө салуучу'] },
  { sectionId: 'railway', aliases: ['переезд', 'железнодорож', 'railway', 'railroad crossing', 'темир жол'] },
  { sectionId: 'crossroads', aliases: ['перекрест', 'перекрёст', 'пересечен', 'intersection', 'crossroads', 'кесилиш'] },
  { sectionId: 'crosswalk', aliases: ['пешеходный переход', 'переход для пешеход', 'зебра', 'crosswalk', 'pedestrian crossing', 'жөө өтмөк'] },
  { sectionId: 'maneuver', aliases: ['маневр', 'поворот', 'разворот', 'перестро', 'turn', 'u-turn', 'lane change', 'маневр', 'бурулуш', 'кайрылуу', 'тилке алмаш'] },
  { sectionId: 'lanes', aliases: ['полоса', 'ряд движения', 'lane', 'road lane', 'тилке'] },
  { sectionId: 'motorway', aliases: ['автомагистрал', 'магистраль', 'motorway', 'highway', 'автомагистраль'] },
  { sectionId: 'residential', aliases: ['жилая зона', 'двор', 'residential', 'courtyard', 'турак жай', 'короо'] },
  { sectionId: 'lights', aliases: ['фары', 'дальний свет', 'ближний свет', 'ослеп', 'headlight', 'high beam', 'dipped beam', 'фара', 'алыс жарык', 'жакын жарык'] },
  { sectionId: 'public', aliases: ['автобус', 'троллейбус', 'трамвай', 'маршрут', 'bus', 'trolleybus', 'tram', 'автобус', 'троллейбус'] },
  { sectionId: 'towing', aliases: ['буксир', 'буксировка', 'tow', 'towing', 'сүйрөө'] },
  { sectionId: 'cargo', aliases: ['груз', 'багаж', 'load', 'cargo', 'жүк'] },
  { sectionId: 'people', aliases: ['перевозка людей', 'пассажир', 'passenger', 'carrying people', 'адам ташуу', 'жүргүнчү'] },
  { sectionId: 'bikes', aliases: ['велосипед', 'мопед', 'самокат', 'bicycle', 'moped', 'велосипед', 'мопед'] },
  { sectionId: 'hazard', aliases: ['аварийная сигнализация', 'аварийка', 'аварийный знак', 'hazard lights', 'warning triangle', 'авариялык сигнал'] },
];

const STOPWORDS: Record<Lang, Set<string>> = {
  ru: new Set(['как', 'что', 'где', 'когда', 'можно', 'нельзя', 'правильно', 'нужно', 'надо', 'при', 'если', 'это', 'для', 'или', 'по', 'на', 'в', 'и', 'а', 'ли', 'дорогу', 'дорога']),
  ky: new Set(['кантип', 'эмне', 'кайда', 'качан', 'болобу', 'туура', 'керек', 'эгер', 'үчүн', 'же', 'жол', 'жолду', 'жолдо']),
  en: new Set(['how', 'what', 'where', 'when', 'can', 'should', 'correctly', 'properly', 'the', 'a', 'an', 'to', 'on', 'in', 'at', 'or', 'and', 'road']),
};

export type OfflineGuideAnswer = {
  kind: 'empty' | 'scope' | 'match' | 'multi' | 'fallback';
  title: string;
  text: string;
  sectionId?: string;
  suggestedSectionIds: string[];
};

const GENERIC = {
  ru: {
    emptyTitle: 'Задай вопрос по ПДД',
    emptyText: 'Например: какая скорость в городе, где запрещён обгон или что делать при ДТП.',
    scopeTitle: 'Я работаю только с ПДД',
    scopeText: 'Сейчас JOL отвечает по локальному справочнику правил и материалам подготовки к экзамену.',
    fallbackTitle: 'Нужно чуть уточнить',
    fallbackText: 'Я не хочу угадывать правило. Уточни ситуацию: перекрёсток, пешеходный переход, поворот, скорость, обгон, парковка или другое действие.',
    multiTitle: 'Здесь возможны несколько ситуаций',
    multiText: 'Если речь о проезде перекрёстка — открой правила перекрёстков. Если о пешеходном переходе — правила переходов и обязанностей перед пешеходами. Если о повороте, развороте или перестроении — раздел маневрирования.',
  },
  ky: {
    emptyTitle: 'ЖЭЭ боюнча суроо бер',
    emptyText: 'Мисалы: шаардагы ылдамдык, озуп өтүү, ЖКО же светофор жөнүндө сура.',
    scopeTitle: 'Мен ЖЭЭ боюнча гана жардам берем',
    scopeText: 'Азыр JOL жергиликтүү эрежелер маалымдамасы жана экзаменге даярдык материалдары боюнча жооп берет.',
    fallbackTitle: 'Суроону бир аз такта',
    fallbackText: 'Эрежени божомолдогум келбейт. Кырдаалды такта: кесилиш, жөө өтмөк, бурулуш, ылдамдык, озуп өтүү, токтотуу же башка аракет.',
    multiTitle: 'Бул суроо бир нече кырдаалды билдириши мүмкүн',
    multiText: 'Эгер кесилиштен өтүү жөнүндө болсо — кесилиш эрежелерин кара. Жөө өтмөк жөнүндө болсо — жөө өтмөк жана жөө жүргүнчүлөр алдындагы милдеттерди кара. Бурулуш, кайрылуу же тилке алмаштыруу жөнүндө болсо — маневр эрежелерин кара.',
  },
  en: {
    emptyTitle: 'Ask a road-rules question',
    emptyText: 'For example: city speed limit, overtaking, a crash, traffic lights or parking.',
    scopeTitle: 'I only help with road rules',
    scopeText: 'JOL currently answers from the local rules guide and exam-preparation content.',
    fallbackTitle: 'Please narrow the situation',
    fallbackText: 'I do not want to guess the rule. Specify whether you mean an intersection, pedestrian crossing, turn, speed, overtaking, parking or another action.',
    multiTitle: 'This could mean several road situations',
    multiText: 'If you mean driving through an intersection, use the intersection rules. If you mean a pedestrian crossing, check crossing and pedestrian-priority rules. If you mean turning, making a U-turn or changing lanes, use the manoeuvring rules.',
  },
} as const;

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[’'`]/g, '')
    .replace(/\s+/g, ' ');
}

function tokenize(value: string, lang: Lang) {
  return normalize(value)
    .split(/[^\p{L}0-9/]+/u)
    .filter((token) => token.length >= 3 && !STOPWORDS[lang].has(token));
}

function isGenericRoadQuestion(query: string, lang: Lang) {
  const q = normalize(query);
  const generic =
    lang === 'ru'
      ? /(проез|ехать|двигат).*(дорог|улиц)|(?:дорог|улиц).*(проез|ехать|двигат)/
      : lang === 'ky'
        ? /(жол).*(өт|айда|жүр)|(?:өт|айда|жүр).*(жол)/
        : /(drive|go|cross|pass).*(road|street)|(?:road|street).*(drive|go|cross|pass)/;

  if (!generic.test(q)) return false;

  const specificAliases = TOPICS
    .filter((topic) => ['crossroads', 'crosswalk', 'maneuver', 'signals', 'lanes', 'overtake', 'railway'].includes(topic.sectionId))
    .flatMap((topic) => topic.aliases)
    .map(normalize);

  return !specificAliases.some((alias) => alias && q.includes(alias));
}

function rankSections(query: string, lang: Lang) {
  const normalized = normalize(query);
  const tokens = tokenize(query, lang);
  const sections = getRuleSections(lang);

  return sections
    .map((section) => {
      const haystack = normalize([section.title, section.summary, ...section.highlights].join(' '));
      const topic = TOPICS.find((item) => item.sectionId === section.id);
      let score = 0;

      if (topic) {
        for (const rawAlias of topic.aliases) {
          const alias = normalize(rawAlias);
          if (!alias) continue;
          if (normalized.includes(alias)) {
            score += alias.includes(' ') ? 8 : 6;
          }
        }
      }

      for (const token of tokens) {
        if (haystack.includes(token)) score += 1.4;
        if (section.title.toLowerCase().includes(token)) score += 1.2;
      }

      return { section, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.section.number - b.section.number);
}

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids)).slice(0, 3);
}

export function answerOfflineRuleQuestion(query: string, lang: Lang = 'ru'): OfflineGuideAnswer {
  const g = GENERIC[lang];
  const normalized = normalize(query);
  const sections = getRuleSections(lang);

  if (!normalized) {
    return { kind: 'empty', title: g.emptyTitle, text: g.emptyText, suggestedSectionIds: [] };
  }

  if (SMALL_TALK.some((item) => normalized.includes(item))) {
    return { kind: 'scope', title: g.scopeTitle, text: g.scopeText, suggestedSectionIds: [] };
  }

  if (isGenericRoadQuestion(normalized, lang)) {
    return {
      kind: 'multi',
      title: g.multiTitle,
      text: g.multiText,
      suggestedSectionIds: ['crossroads', 'crosswalk', 'maneuver'],
    };
  }

  const ranked = rankSections(normalized, lang);
  const first = ranked[0];
  const second = ranked[1];

  if (!first || first.score < 1.4) {
    return { kind: 'fallback', title: g.fallbackTitle, text: g.fallbackText, suggestedSectionIds: [] };
  }

  const closeCompetition = Boolean(
    second &&
    first.score < 6 &&
    first.score - second.score < 1.6,
  );

  if (closeCompetition) {
    const ids = uniqueIds(ranked.slice(0, 3).map((item) => item.section.id));
    return {
      kind: 'multi',
      title: g.multiTitle,
      text: g.fallbackText,
      suggestedSectionIds: ids,
    };
  }

  const section = first.section;
  const relatedIds = uniqueIds([
    section.id,
    ...ranked.slice(1, 4).filter((item) => item.score >= Math.max(1.4, first.score * 0.28)).map((item) => item.section.id),
  ]);

  return {
    kind: 'match',
    title: section.title,
    text: `${section.summary}\n\n${section.highlights.slice(0, 2).join(' ')}`.trim(),
    sectionId: section.id,
    suggestedSectionIds: relatedIds,
  };
}
