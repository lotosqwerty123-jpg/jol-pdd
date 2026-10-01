import type { Lang } from '@/i18n/types';

export type DrivingCategory =
  | 'A' | 'A1' | 'B' | 'B1' | 'C' | 'C1' | 'D' | 'D1'
  | 'BE' | 'CE' | 'C1E' | 'DE' | 'D1E';

export const DRIVING_CATEGORIES: DrivingCategory[] = [
  'A', 'A1', 'B', 'B1', 'C', 'C1', 'D', 'D1', 'BE', 'CE', 'C1E', 'DE', 'D1E',
];

type L = { ru: string; ky: string; en: string };

type RuleSectionSource = {
  id: string;
  number: number;
  title: L;
  summary: L;
  highlights: L[];
  sourceUrl: string;
  sourceLabel: L;
};

export type RuleSection = {
  id: string;
  number: number;
  title: string;
  summary: string;
  highlights: string[];
  sourceUrl: string;
  sourceLabel: string;
};

const l = (ru: string, en: string, ky: string): L => ({ ru, en, ky });
const base = 'https://www.guobdd.kg/trafficregulationsitem/';
const sourceLabel = l(
  'ГУОБДД МВД Кыргызской Республики · ПДД КР',
  'Main Traffic Safety Directorate of the Kyrgyz Republic · KR Road Rules',
  'Кыргыз Республикасынын ЖКККББ · КР ЖЭЭ',
);

const SECTIONS: RuleSectionSource[] = [
  {
    id:'general', number:1,
    title:l('Общие положения','General provisions','Жалпы жоболор'),
    summary:l('Основные понятия ПДД, единый порядок движения, обязанности участников и базовые определения.','Core road-rule concepts, the common traffic order, road-user duties and basic definitions.','ЖЭЭнин негизги түшүнүктөрү, кыймылдын жалпы тартиби, катышуучулардын милдеттери жана негизги аныктамалар.'),
    highlights:[
      l('Термины: водитель, дорога, перекрёсток, остановка, стоянка, приоритет.','Key terms include driver, road, intersection, stopping, parking and priority.','Негизги терминдер: айдоочу, жол, кесилиш, токтоо, токтотуп туруу, артыкчылык.'),
      l('На дорогах действует правостороннее движение.','Traffic keeps to the right.','Жолдордо оң тараптуу кыймыл колдонулат.'),
      l('Участники обязаны соблюдать сигналы, знаки, разметку и требования регулировщика.','Road users must obey signals, signs, markings and traffic-controller instructions.','Катышуучулар сигналдарды, белгилерди, чийиндерди жана жөнгө салуучунун талаптарын сактоого милдеттүү.'),
    ], sourceUrl:base+'1', sourceLabel,
  },
  {
    id:'driver', number:2,
    title:l('Общие обязанности водителей','General duties of drivers','Айдоочулардын жалпы милдеттери'),
    summary:l('Документы, техническое состояние транспорта, ремни и шлемы, действия при ДТП и запреты для водителя.','Documents, vehicle condition, belts and helmets, crash duties and driver prohibitions.','Документтер, унаанын техникалык абалы, курлар жана каскалар, ЖКО учурундагы аракеттер жана айдоочуга тыюулар.'),
    highlights:[
      l('Перед выездом водитель проверяет техническое состояние транспорта.','Before driving, the driver checks the vehicle’s technical condition.','Жолго чыгар алдында айдоочу унаанын техникалык абалын текшерет.'),
      l('При ДТП водитель обязан остановиться и выполнить предусмотренные ПДД действия.','After a crash, the driver must stop and follow the required road-rule procedure.','ЖКО болгондо айдоочу токтоп, ЖЭЭде каралган аракеттерди аткарууга милдеттүү.'),
      l('Управление в состоянии опьянения запрещено.','Driving while intoxicated is prohibited.','Мас абалда унаа башкарууга тыюу салынат.'),
    ], sourceUrl:base+'2', sourceLabel,
  },
  {
    id:'special', number:3,
    title:l('Применение специальных сигналов','Use of special signals','Атайын сигналдарды колдонуу'),
    summary:l('Преимущество оперативного транспорта и действия остальных участников при специальных световых и звуковых сигналах.','Priority for emergency vehicles and how other road users must react to special light and sound signals.','Ыкчам транспорттун артыкчылыгы жана атайын жарык/үн сигналдарында башка катышуучулардын аракеттери.'),
    highlights:[
      l('Транспорт со спецсигналами может получать преимущество при соблюдении установленных условий.','Vehicles using special signals may receive priority under the stated conditions.','Атайын сигналдары бар транспорт белгиленген шарттарда артыкчылык ала алат.'),
      l('Другие водители обязаны обеспечить беспрепятственный проезд.','Other drivers must allow unobstructed passage.','Башка айдоочулар тоскоолдуксуз өтүүгө шарт түзүүгө милдеттүү.'),
    ], sourceUrl:base+'3', sourceLabel,
  },
  {
    id:'pedestrians', number:4,
    title:l('Права и обязанности пешеходов','Rights and duties of pedestrians','Жөө жүргүнчүлөрдүн укуктары жана милдеттери'),
    summary:l('Где должны двигаться пешеходы, как переходить дорогу и как действовать в регулируемых и нерегулируемых местах.','Where pedestrians should move, how to cross roads and how to act at controlled and uncontrolled locations.','Жөө жүргүнчүлөр кайда жүрүшү керек, жолду кантип өтүү жана жөнгө салынган/салынбаган жерлердеги аракеттер.'),
    highlights:[
      l('Переход осуществляется в установленных местах, а при их отсутствии — по правилам раздела.','Cross at designated places; if none exist, follow the section’s rules.','Белгиленген жерден өтүү керек, ал жок болсо бөлүмдүн эрежелерин сактоо зарыл.'),
      l('Пешеход обязан оценивать безопасность выхода на проезжую часть.','A pedestrian must assess whether entering the carriageway is safe.','Жөө жүргүнчү жолдун жүрүү бөлүгүнө чыгуу коопсуз экенин баалоого милдеттүү.'),
    ], sourceUrl:base+'4', sourceLabel,
  },
  {
    id:'passengers', number:5,
    title:l('Обязанности пассажиров','Duties of passengers','Жүргүнчүлөрдүн милдеттери'),
    summary:l('Посадка, высадка, ремни безопасности, мотошлемы и безопасное поведение пассажиров.','Boarding, alighting, seat belts, motorcycle helmets and safe passenger behaviour.','Отуруу, түшүү, коопсуздук курлары, мотошлемдер жана жүргүнчүлөрдүн коопсуз жүрүм-туруму.'),
    highlights:[
      l('Пассажиры обязаны пользоваться ремнями и мотошлемами в предусмотренных случаях.','Passengers must use seat belts and helmets where required.','Жүргүнчүлөр талап кылынган учурларда коопсуздук курун жана мотошлемди колдонууга милдеттүү.'),
      l('Посадка и высадка выполняются безопасным способом.','Boarding and alighting must be done safely.','Отуруу жана түшүү коопсуз түрдө аткарылышы керек.'),
    ], sourceUrl:base+'5', sourceLabel,
  },
  {
    id:'signals', number:6,
    title:l('Сигналы светофора или регулировщика','Traffic lights and traffic-controller signals','Светофордун же жөнгө салуучунун сигналдары'),
    summary:l('Значения сигналов светофора, стрелок, мигающих сигналов и жестов регулировщика.','Meaning of traffic lights, arrows, flashing signals and traffic-controller gestures.','Светофор сигналдарынын, жебелердин, күйүп-өчкөн сигналдардын жана жөнгө салуучунун жаңсоолорунун мааниси.'),
    highlights:[
      l('Зелёный разрешает движение, красный запрещает.','Green permits movement; red prohibits it.','Жашыл кыймылга уруксат берет, кызыл тыюу салат.'),
      l('Требования регулировщика имеют приоритет в предусмотренных правилами случаях.','A traffic controller’s instructions take priority in the cases set by the rules.','Эрежеде каралган учурларда жөнгө салуучунун талаптары артыкчылыктуу.'),
    ], sourceUrl:base+'6', sourceLabel,
  },
  {
    id:'hazard', number:7,
    title:l('Аварийная сигнализация и знак аварийной остановки','Hazard lights and warning triangle','Авариялык сигнал жана авариялык токтоо белгиси'),
    summary:l('Когда включается аварийная сигнализация и когда выставляется знак аварийной остановки.','When hazard warning lights must be used and when a warning triangle must be placed.','Авариялык сигнал качан күйгүзүлөт жана авариялык токтоо белгиси качан коюлат.'),
    highlights:[
      l('Аварийная сигнализация применяется при ДТП и в других предусмотренных случаях.','Hazard lights are used after a crash and in other specified cases.','Авариялык сигнал ЖКОдо жана башка каралган учурларда колдонулат.'),
      l('Знак аварийной остановки выставляется по требованиям раздела.','The warning triangle is placed as required by this section.','Авариялык токтоо белгиси бөлүмдүн талаптарына ылайык коюлат.'),
    ], sourceUrl:base+'7', sourceLabel,
  },
  {
    id:'maneuver', number:8,
    title:l('Начало движения, маневрирование','Starting and manoeuvring','Кыймылды баштоо жана маневр жасоо'),
    summary:l('Повороты, перестроения, развороты, выезд с прилегающей территории и сигналы указателями поворота.','Turns, lane changes, U-turns, leaving adjacent territory and turn-indicator signals.','Бурулуштар, тилке алмаштыруу, кайрылуу, жанаша аймактан чыгуу жана бурулуш көрсөткүчтөрү.'),
    highlights:[
      l('Сигнал поворота подаётся заранее и не даёт преимущества.','Signal before the manoeuvre; signalling does not give priority.','Бурулуш сигналы алдын ала берилет жана артыкчылык бербейт.'),
      l('Манёвр должен быть безопасным и не создавать помех.','A manoeuvre must be safe and must not create an obstruction.','Маневр коопсуз болуп, тоскоолдук жаратпоого тийиш.'),
      l('При выезде с прилегающей территории нужно уступить участникам на дороге.','When leaving adjacent territory, give way to road users already on the road.','Жанаша аймактан чыкканда жолдогу катышуучуларга жол берүү керек.'),
    ], sourceUrl:base+'8', sourceLabel,
  },
  {
    id:'lanes', number:9,
    title:l('Расположение транспортных средств на проезжей части','Vehicle position on the carriageway','Транспорт каражаттарынын жолдогу жайгашуусу'),
    summary:l('Полосы движения, встречное направление, выбор полосы и движение по многополосным дорогам.','Traffic lanes, opposing traffic, lane choice and multilane-road positioning.','Кыймыл тилкелери, каршы багыт, тилкени тандоо жана көп тилкелүү жолдо жүрүү.'),
    highlights:[
      l('На четырёхполосной двусторонней дороге запрещён выезд на встречную сторону.','On a four-lane two-way road, entering the opposing side is prohibited.','Төрт тилкелүү эки багыттуу жолдо каршы тарапка чыгууга тыюу салынат.'),
      l('Вне населённых пунктов следует по возможности держаться ближе к правому краю.','Outside built-up areas, keep as close to the right edge as practicable.','Калктуу конуштан тышкары мүмкүн болушунча оң четке жакын жүрүү керек.'),
    ], sourceUrl:base+'9', sourceLabel,
  },
  {
    id:'speed', number:10,
    title:l('Скорость движения и дистанция','Speed and following distance','Кыймыл ылдамдыгы жана аралык'),
    summary:l('Ограничения скорости, выбор безопасной скорости, дистанция и действия при возникновении опасности.','Speed limits, safe speed choice, following distance and actions when danger appears.','Ылдамдык чектөөлөрү, коопсуз ылдамдыкты тандоо, аралык жана коркунуч жаралганда аракеттер.'),
    highlights:[
      l('В населённых пунктах базовое ограничение — 60 км/ч, если знаками не установлено иное.','The basic built-up-area limit is 60 km/h unless signs state otherwise.','Калктуу конушта белгилер башкача көрсөтпөсө, негизги чектөө 60 км/саат.'),
      l('Скорость должна позволять постоянно контролировать транспорт.','Speed must allow continuous control of the vehicle.','Ылдамдык унааны дайыма көзөмөлдөөгө мүмкүнчүлүк бериши керек.'),
      l('При опасности водитель снижает скорость вплоть до остановки.','When danger appears, reduce speed up to a complete stop if necessary.','Коркунуч пайда болгондо айдоочу токтоого чейин ылдамдыкты азайтат.'),
    ], sourceUrl:base+'10', sourceLabel,
  },
  {
    id:'overtake', number:11,
    title:l('Обгон, встречный разъезд','Overtaking and passing oncoming traffic','Озуп өтүү жана каршы өтүү'),
    summary:l('Условия безопасного обгона, стороны обгона, обязанности обгоняемого и места запрета.','Conditions for safe overtaking, sides of overtaking, duties of the overtaken driver and prohibited locations.','Коопсуз озуп өтүү шарттары, озуп өтүү тарабы, озулуп жаткан айдоочунун милдеттери жана тыюу салынган жерлер.'),
    highlights:[
      l('Перед обгоном водитель обязан убедиться в безопасности манёвра.','Before overtaking, the driver must make sure the manoeuvre is safe.','Озуп өтөр алдында айдоочу маневр коопсуз экенин текшерүүгө милдеттүү.'),
      l('Обгоняемому запрещено препятствовать обгону повышением скорости.','The driver being overtaken must not obstruct the manoeuvre by accelerating.','Озулуп жаткан айдоочуга ылдамдыкты көбөйтүү менен тоскоолдук кылууга тыюу салынат.'),
    ], sourceUrl:base+'11', sourceLabel,
  },
  {
    id:'parking', number:12,
    title:l('Остановка, стоянка (парковка)','Stopping and parking','Токтоо жана токтотуп туруу (парковка)'),
    summary:l('Где разрешены остановка и стоянка, способы постановки транспорта и места запрета.','Where stopping and parking are allowed, how to position vehicles and where stopping is prohibited.','Токтоого жана токтотуп турууга уруксат берилген жерлер, унааны жайгаштыруу жана тыюу салынган жерлер.'),
    highlights:[
      l('Обычно остановка и стоянка выполняются справа на обочине или у края проезжей части.','Stopping and parking are generally on the right shoulder or at the edge of the carriageway.','Адатта токтоо жана токтотуп туруу оң жактагы жол жээгинде же жүрүү бөлүгүнүн четинде жүргүзүлөт.'),
      l('На железнодорожных переездах и в тоннелях остановка запрещена.','Stopping is prohibited on railway crossings and in tunnels.','Темир жол өтмөктөрүндө жана туннелдерде токтоого тыюу салынат.'),
    ], sourceUrl:base+'12', sourceLabel,
  },
  {
    id:'crossroads', number:13,
    title:l('Проезд перекрёстков','Intersections','Кесилиштерден өтүү'),
    summary:l('Регулируемые и нерегулируемые перекрёстки, очередность движения и обязанности при повороте.','Controlled and uncontrolled intersections, priority order and turning duties.','Жөнгө салынган жана жөнгө салынбаган кесилиштер, өтүү кезеги жана бурулуштагы милдеттер.'),
    highlights:[
      l('При повороте водитель уступает пешеходам на дороге, на которую поворачивает.','When turning, give way to pedestrians on the road you are entering.','Бурулганда айдоочу кирип жаткан жолдогу жөө жүргүнчүлөргө жол берет.'),
      l('Нельзя выезжать на перекрёсток, если впереди затор.','Do not enter an intersection if congestion ahead will block it.','Алдыда тыгын болуп, кесилиште туруп калсаңыз, кесилишке чыгууга болбойт.'),
    ], sourceUrl:base+'13', sourceLabel,
  },
  {
    id:'crosswalk', number:14,
    title:l('Пешеходные переходы и остановки маршрутного транспорта','Pedestrian crossings and public-transport stops','Жөө өтмөктөр жана маршруттук транспорт аялдамалары'),
    summary:l('Приоритет пешеходов и правила проезда зон остановок общественного транспорта.','Pedestrian priority and rules for passing public-transport stop areas.','Жөө жүргүнчүлөрдүн артыкчылыгы жана коомдук транспорт аялдамаларынан өтүү эрежелери.'),
    highlights:[
      l('Водитель обязан выполнять требования раздела при приближении к пешеходному переходу.','Drivers must follow the section’s requirements when approaching a pedestrian crossing.','Жөө өтмөккө жакындаганда айдоочу бөлүмдүн талаптарын аткарууга милдеттүү.'),
      l('Особое внимание требуется в местах остановок маршрутного транспорта.','Extra attention is required near public-transport stops.','Маршруттук транспорт аялдамаларында өзгөчө көңүл буруу керек.'),
    ], sourceUrl:base+'14', sourceLabel,
  },
  {
    id:'railway', number:15,
    title:l('Движение через железнодорожные пути','Railway crossings','Темир жол аркылуу өтүү'),
    summary:l('Проезд железнодорожных переездов, сигналы, шлагбаумы, запреты и действия при заторе.','How to use railway crossings, signals and barriers, prohibitions and what to do in congestion.','Темир жол өтмөктөрүнөн өтүү, сигналдар, шлагбаумдар, тыюулар жана тыгын учурундагы аракеттер.'),
    highlights:[
      l('Пути пересекают только по железнодорожным переездам.','Cross railway tracks only at designated railway crossings.','Темир жолду темир жол өтмөктөрү аркылуу гана кесип өтүү керек.'),
      l('Нельзя выезжать при закрывающемся шлагбауме или запрещающем сигнале.','Do not enter when the barrier is closing or a prohibiting signal is active.','Шлагбаум жабылып жатканда же тыюу салуучу сигналда өтүүгө болбойт.'),
      l('Нельзя останавливаться на переезде из-за затора впереди.','Do not enter if congestion ahead would force you to stop on the crossing.','Алдыдагы тыгын өтмөктө токтотууга мажбур кылса, өтмөккө кирүүгө болбойт.'),
    ], sourceUrl:base+'15', sourceLabel,
  },
  {
    id:'motorway', number:16,
    title:l('Движение по автомагистралям','Motorways','Автомагистралдардагы кыймыл'),
    summary:l('Особые требования и запреты, действующие на автомагистралях.','Special requirements and prohibitions that apply on motorways.','Автомагистралдарда колдонулуучу атайын талаптар жана тыюулар.'),
    highlights:[l('На автомагистрали действуют специальные ограничения по остановке, движению отдельных участников и манёврам.','Motorways have special restrictions on stopping, certain road users and manoeuvres.','Автомагистралда токтоо, айрым катышуучулардын кыймылы жана маневрлер боюнча атайын чектөөлөр бар.')],
    sourceUrl:base+'16', sourceLabel,
  },
  {
    id:'residential', number:17,
    title:l('Движение в жилых зонах','Residential zones','Турак жай зоналарындагы кыймыл'),
    summary:l('Приоритет пешеходов, ограничение скорости и специальные запреты в жилых и дворовых территориях.','Pedestrian priority, speed limits and special restrictions in residential and courtyard areas.','Жөө жүргүнчүлөрдүн артыкчылыгы, ылдамдык чектөөсү жана турак жай/короо аймактарындагы атайын тыюулар.'),
    highlights:[
      l('Максимальная скорость в жилой зоне — 20 км/ч.','Maximum speed in a residential zone is 20 km/h.','Турак жай зонасында максималдуу ылдамдык — 20 км/саат.'),
      l('Пешеходы имеют преимущество.','Pedestrians have priority.','Жөө жүргүнчүлөр артыкчылыкка ээ.'),
      l('При выезде из жилой зоны водитель уступает другим участникам.','When leaving a residential zone, the driver gives way to other road users.','Турак жай зонасынан чыкканда айдоочу башка катышуучуларга жол берет.'),
    ], sourceUrl:base+'17', sourceLabel,
  },
  {
    id:'public', number:18,
    title:l('Приоритет маршрутных транспортных средств','Priority of public transport','Маршруттук транспорттун артыкчылыгы'),
    summary:l('Преимущество трамваев, автобусов и троллейбусов и правила использования выделенных полос.','Priority rules for trams, buses and trolleybuses and the use of dedicated lanes.','Трамвай, автобус, троллейбустардын артыкчылыгы жана бөлүнгөн тилкелерди колдонуу эрежелери.'),
    highlights:[
      l('В населённых пунктах нужно уступать автобусам и троллейбусам, начинающим движение от обозначенной остановки.','In built-up areas, give way to buses and trolleybuses pulling away from a marked stop.','Калктуу конушта белгиленген аялдамадан кыймылын баштаган автобус жана троллейбуска жол берүү керек.'),
      l('На выделенных полосах действуют специальные ограничения.','Dedicated lanes are subject to special restrictions.','Бөлүнгөн тилкелерде атайын чектөөлөр колдонулат.'),
    ], sourceUrl:base+'18', sourceLabel,
  },
  {
    id:'lights', number:19,
    title:l('Пользование внешними световыми приборами','Use of exterior lights','Сырткы жарык приборлорун колдонуу'),
    summary:l('Ближний и дальний свет, противотуманные фары, габаритные огни и действия при ослеплении.','Dipped and main beam, fog lights, position lights and what to do when dazzled.','Жакын/алыс жарык, туманга каршы фаралар, габариттик жарыктар жана көз уялганда аракеттер.'),
    highlights:[
      l('В темноте и при недостаточной видимости должны использоваться предусмотренные световые приборы.','Use the required lights in darkness and poor visibility.','Караңгыда жана көрүү начар болгондо тиешелүү жарык приборлорун колдонуу керек.'),
      l('Дальний свет переключают на ближний минимум за 150 м при встречном разъезде.','Switch from main beam to dipped beam at least 150 m before meeting oncoming traffic.','Каршы өтүүдө кеминде 150 м калганда алыс жарыкты жакын жарыкка которуу керек.'),
      l('При ослеплении включают аварийную сигнализацию и снижают скорость без смены полосы.','If dazzled, switch on hazard lights and reduce speed without changing lanes.','Көз уялганда авариялык сигналды күйгүзүп, тилкени өзгөртпөстөн ылдамдыкты азайтуу керек.'),
    ], sourceUrl:base+'19', sourceLabel,
  },
  {
    id:'towing', number:20,
    title:l('Буксировка механических транспортных средств','Towing motor vehicles','Механикалык транспорт каражаттарын сүйрөө'),
    summary:l('Гибкая и жёсткая сцепка, расстояние между автомобилями, перевозка людей и случаи запрета буксировки.','Flexible and rigid towing, spacing, carrying people and cases where towing is prohibited.','Ийкемдүү жана катуу чиркегич, унаалардын аралыгы, адамдарды ташуу жана сүйрөөгө тыюу салынган учурлар.'),
    highlights:[
      l('При гибкой сцепке расстояние должно быть 4–6 м.','With a flexible link, distance must be 4–6 m.','Ийкемдүү чиркегичте аралык 4–6 м болушу керек.'),
      l('На жёсткой сцепке — не более 4 м.','With a rigid link, no more than 4 m.','Катуу чиркегичте — 4 мден ашпайт.'),
      l('Буксировка двух и более транспортных средств запрещена.','Towing two or more vehicles is prohibited.','Эки же андан көп транспорт каражатын сүйрөөгө тыюу салынат.'),
    ], sourceUrl:base+'20', sourceLabel,
  },
  {
    id:'training', number:21,
    title:l('Учебная езда','Driving instruction','Окуу айдоосу'),
    summary:l('Требования к обучающему, обучаемому, учебному автомобилю и местам проведения обучения.','Requirements for instructor, learner, training vehicle and places where instruction may occur.','Үйрөтүүчүгө, үйрөнүүчүгө, окуу унаасына жана окуу өткөрүлүүчү жерлерге талаптар.'),
    highlights:[l('Учебная езда проводится с соблюдением специальных требований раздела.','Driving instruction must follow the special requirements of this section.','Окуу айдоосу бөлүмдүн атайын талаптарын сактоо менен жүргүзүлөт.')],
    sourceUrl:base+'21', sourceLabel,
  },
  {
    id:'people', number:22,
    title:l('Перевозка людей','Carrying passengers','Адамдарды ташуу'),
    summary:l('Требования к водителю, оборудованию транспорта, количеству пассажиров и безопасности перевозки.','Requirements for the driver, vehicle equipment, passenger count and transport safety.','Айдоочуга, унаанын жабдылышына, жүргүнчүлөрдүн санына жана ташуу коопсуздугуна талаптар.'),
    highlights:[
      l('Число людей не должно превышать число оборудованных мест в предусмотренных случаях.','The number of people must not exceed the number of equipped seats where the rules require it.','Эрежеде каралган учурларда адамдардын саны жабдылган орундардын санынан ашпоого тийиш.'),
      l('Перед поездкой водитель обязан обеспечить безопасные условия перевозки.','Before setting off, the driver must ensure safe conditions for passengers.','Жолго чыгар алдында айдоочу адамдарды ташуунун коопсуз шарттарын камсыз кылууга милдеттүү.'),
    ], sourceUrl:base+'22', sourceLabel,
  },
  {
    id:'cargo', number:23,
    title:l('Перевозка грузов','Carrying loads','Жүк ташуу'),
    summary:l('Масса и размещение груза, крепление, габариты, обозначение выступающего груза и безопасность.','Load weight and placement, securing, dimensions, marking projecting loads and safety.','Жүктүн салмагы жана жайгашуусу, бекитүү, габариттер, чыгып турган жүктү белгилөө жана коопсуздук.'),
    highlights:[
      l('Груз не должен ограничивать обзор или нарушать устойчивость автомобиля.','A load must not obstruct the driver’s view or compromise vehicle stability.','Жүк айдоочунун көрүнүшүн чектебөөгө жана унаанын туруктуулугун бузбоого тийиш.'),
      l('Выступающий груз обозначается в случаях, предусмотренных ПДД.','Projecting loads must be marked where required by the road rules.','Чыгып турган жүк ЖЭЭде каралган учурларда белгиленет.'),
    ], sourceUrl:base+'23', sourceLabel,
  },
  {
    id:'bikes', number:24,
    title:l('Велосипеды, мопеды, гужевые повозки и прогон животных','Bicycles, mopeds, animal-drawn vehicles and animals','Велосипеддер, мопеддер, арабалар жана жаныбарларды айдап өтүү'),
    summary:l('Дополнительные требования для велосипедистов, водителей мопедов, гужевого транспорта и прогона животных.','Additional requirements for cyclists, moped riders, animal-drawn vehicles and moving animals.','Велосипедчилерге, мопед айдоочуларга, арабага жана жаныбарларды айдап өтүүгө кошумча талаптар.'),
    highlights:[l('Для этих участников действуют дополнительные требования к месту движения и манёврам.','These road users have additional rules governing where they may travel and how they manoeuvre.','Бул катышуучулар үчүн кыймыл орду жана маневрлер боюнча кошумча талаптар колдонулат.')],
    sourceUrl:base+'24', sourceLabel,
  },
];

function localize(section: RuleSectionSource, lang: Lang): RuleSection {
  return {
    id: section.id,
    number: section.number,
    title: section.title[lang],
    summary: section.summary[lang],
    highlights: section.highlights.map((item) => item[lang]),
    sourceUrl: section.sourceUrl,
    sourceLabel: section.sourceLabel[lang],
  };
}

export function getRuleSections(lang: Lang): RuleSection[] {
  return SECTIONS.map((section) => localize(section, lang));
}

export function getRuleSection(id: string | undefined, lang: Lang): RuleSection | undefined {
  const section = SECTIONS.find((item) => item.id === id);
  return section ? localize(section, lang) : undefined;
}

export function searchRuleSections(query: string, lang: Lang = 'ru'): RuleSection[] {
  const normalized = query.trim().toLowerCase();
  const sections = getRuleSections(lang);
  if (!normalized) return sections;
  return sections.filter((item) =>
    [item.title, item.summary, ...item.highlights].some((text) => text.toLowerCase().includes(normalized)),
  );
}
