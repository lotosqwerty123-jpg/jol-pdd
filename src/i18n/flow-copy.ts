import type { QuestionTopic } from '@/features/questions/question-bank';
import type { Lang } from '@/i18n/types';

const copy = {
  ru: {
    learning: {
      title: 'Обучение', empty: 'Локальная база вопросов пока пуста.', allRules: 'Все правила ПДД', rulesMeta: '24 раздела · офлайн-конспект · официальный источник', practice: 'Практика: вариант можно менять до нажатия «Проверить ответ». После проверки откроется разбор.', eyebrow: 'JOL · ОБУЧЕНИЕ', question: (i:number,t:number)=>`Вопрос ${i} из ${t}`, offline: 'ОФЛАЙН', readiness: (v:number)=>`Готовность по локальному набору: ${v}%`, category: (v:string)=>`Категория ${v}`, correct:'Правильно', error:'Ошибка', correctHint:'Ответ сохранён локально. Можно двигаться дальше.', errorHint:'Ошибка сохранена в разбор. Открой «Почему?», чтобы закрепить правило.', check:'Проверить ответ', why:'Почему?', next:'Следующий вопрос →', previous:'← Предыдущий',
    },
    explain: {
      eyebrow:'JOL · ПОЧЕМУ?', title:'Разбор ответа', missing:'Не удалось найти вопрос для разбора.', back:'Вернуться', question:'ВОПРОС', correct:'Твой ответ правильный', wrong:'Твой ответ неверный', noAnswer:'Ответ не выбран', rightAnswer:'ПРАВИЛЬНЫЙ ОТВЕТ', explanation:'ОБЪЯСНЕНИЕ', source:'ИСТОЧНИК', offline:'Объяснение хранится локально и доступно без интернета', backQuestion:'Вернуться к вопросу',
    },
    mistakes: {
      eyebrow:'JOL · РАЗБОР', title:'Ошибки', count:(n:number)=>`${n} вопрос(а) стоит повторить.`, none:'Сейчас в списке нет ошибок для повторения.', yourAnswer:'Твой ответ', noAnswer:'Нет ответа', correct:'Правильно', why:'Почему', emptyTitle:'Ошибок пока нет', emptyBody:'Отвечай на вопросы в обучении или пройди пробный экзамен — ошибки появятся здесь автоматически.', backLearning:'Вернуться к обучению', mock:'Пробный экзамен',
    },
    topic: { driver:'ВОДИТЕЛЬ', signals:'СИГНАЛЫ', emergency:'БЕЗОПАСНОСТЬ', speed:'СКОРОСТЬ', priority:'ПРИОРИТЕТ' } as Record<QuestionTopic,string>,
    stack: { rules:'ПДД КР', rule:'Правило' },
  },
  ky: {
    learning: {
      title:'Окуу', empty:'Жергиликтүү суроолор базасы азырынча бош.', allRules:'Бардык ЖЭЭ эрежелери', rulesMeta:'24 бөлүм · офлайн-конспект · расмий булак', practice:'Практика: «Жоопту текшерүү» басылганга чейин вариантты өзгөртсө болот. Текшергенден кийин түшүндүрмө ачылат.', eyebrow:'JOL · ОКУУ', question:(i:number,t:number)=>`Суроо ${i} / ${t}`, offline:'ОФЛАЙН', readiness:(v:number)=>`Жергиликтүү топтом боюнча даярдык: ${v}%`, category:(v:string)=>`Категория ${v}`, correct:'Туура', error:'Ката', correctHint:'Жооп түзмөктө сакталды. Кийинки суроого өтсө болот.', errorHint:'Ката талдоого сакталды. Эрежени бекемдөө үчүн «Эмне үчүн?» бөлүмүн ач.', check:'Жоопту текшерүү', why:'Эмне үчүн?', next:'Кийинки суроо →', previous:'← Мурунку',
    },
    explain: {
      eyebrow:'JOL · ЭМНЕ ҮЧҮН?', title:'Жоопту талдоо', missing:'Талдоо үчүн суроо табылган жок.', back:'Артка', question:'СУРОО', correct:'Сенин жообуң туура', wrong:'Сенин жообуң туура эмес', noAnswer:'Жооп тандалган жок', rightAnswer:'ТУУРА ЖООП', explanation:'ТҮШҮНДҮРМӨ', source:'БУЛАК', offline:'Түшүндүрмө түзмөктө сакталат жана интернетсиз жеткиликтүү', backQuestion:'Суроого кайтуу',
    },
    mistakes: {
      eyebrow:'JOL · ТАЛДОО', title:'Каталар', count:(n:number)=>`${n} суроону кайталоо керек.`, none:'Азыр кайталоо үчүн ката жок.', yourAnswer:'Сенин жообуң', noAnswer:'Жооп жок', correct:'Туура жооп', why:'Эмне үчүн', emptyTitle:'Азырынча ката жок', emptyBody:'Окууда суроолорго жооп бер же сынак экзаменден өт — каталар бул жерде автоматтык чыгат.', backLearning:'Окууга кайтуу', mock:'Сынак экзамен',
    },
    topic: { driver:'АЙДООЧУ', signals:'СИГНАЛДАР', emergency:'КООПСУЗДУК', speed:'ЫЛДАМДЫК', priority:'АРТЫКЧЫЛЫК' } as Record<QuestionTopic,string>,
    stack: { rules:'КР ЖЭЭ', rule:'Эреже' },
  },
  en: {
    learning: {
      title:'Learning', empty:'The local question bank is empty.', allRules:'All road rules', rulesMeta:'24 sections · offline notes · official source', practice:'Practice mode: you can change your choice until you tap “Check answer”. The explanation opens after checking.', eyebrow:'JOL · LEARNING', question:(i:number,t:number)=>`Question ${i} of ${t}`, offline:'OFFLINE', readiness:(v:number)=>`Readiness from the local set: ${v}%`, category:(v:string)=>`Category ${v}`, correct:'Correct', error:'Incorrect', correctHint:'Answer saved locally. You can continue.', errorHint:'The mistake was saved for review. Open “Why?” to reinforce the rule.', check:'Check answer', why:'Why?', next:'Next question →', previous:'← Previous',
    },
    explain: {
      eyebrow:'JOL · WHY?', title:'Answer review', missing:'The question could not be found for review.', back:'Back', question:'QUESTION', correct:'Your answer is correct', wrong:'Your answer is incorrect', noAnswer:'No answer selected', rightAnswer:'CORRECT ANSWER', explanation:'EXPLANATION', source:'SOURCE', offline:'This explanation is stored locally and works without internet', backQuestion:'Back to question',
    },
    mistakes: {
      eyebrow:'JOL · REVIEW', title:'Mistakes', count:(n:number)=>`${n} question(s) to review.`, none:'There are no mistakes to review right now.', yourAnswer:'Your answer', noAnswer:'No answer', correct:'Correct answer', why:'Why', emptyTitle:'No mistakes yet', emptyBody:'Answer questions in Learning or take a mock exam — mistakes will appear here automatically.', backLearning:'Back to learning', mock:'Mock exam',
    },
    topic: { driver:'DRIVER', signals:'SIGNALS', emergency:'SAFETY', speed:'SPEED', priority:'PRIORITY' } as Record<QuestionTopic,string>,
    stack: { rules:'KR ROAD RULES', rule:'Rule' },
  },
} as const;

export function getFlowCopy(lang: Lang) { return copy[lang]; }
