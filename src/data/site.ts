export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number | null;
  duration: string | null;
}
export interface Master {
  name: string | null;
  role: string;
  experience: string | null;
  photo: string | null;
  specialties: string[];
}

// Единственный источник бизнес-данных. null никогда не означает бесплатную услугу.
export const site = {
  name: "СотРемонт",
  description: "Ремонт телефонов, продажа аксессуаров и электроники.",
  legalName: "Сафин Фаннур Фанилович",
  phone: "+7 995 942-13-38",
  address: {
    country: "Россия",
    region: "Республика Татарстан",
    city: "Казань",
    street: "улица Сибирский Тракт, 7/6",
    short: "Сибирский Тракт, 7/6",
    landmark: "магазин «Хлебозавод № 3»",
    postalCode: "420029",
    full: "Россия, Республика Татарстан, Казань, улица Сибирский Тракт, 7/6, магазин «Хлебозавод № 3».",
    entrancePhoto: null as string | null, // TODO: подтвердить у владельца фото и точное расположение входа.
  },
  links: {
    phone: "tel:+79959421338",
    telegram: "https://t.me/sotremont",
    whatsapp: "https://wa.me/79959421338",
    yandex: "https://yandex.ru/maps/org/sotremont/196388969596/",
    dgis: "https://2gis.ru/kazan/firm/70000001083733393",
    route:
      "https://yandex.ru/maps/?mode=routes&rtext=~Казань%2C%20Сибирский%20Тракт%2C%207%2F6&rtt=auto",
    original: "https://sotremont.clients.site/",
  },
  hours: {
    label: "Ежедневно, 10:00–19:00",
    opens: "10:00",
    closes: "19:00",
    source: "https://2gis.ru/kazan/firm/70000001083733393",
    checkedOn: "2026-09-05",
    note: "График по 2ГИС. Перед визитом в праздники уточните время у мастера.",
    // TODO: подтвердить у владельца праздничный график. Статус «открыто сейчас» намеренно не рассчитывается.
  },
  ratings: [
    {
      platform: "2ГИС",
      value: 5.0,
      ratingCount: 135,
      reviewCount: 131,
      url: "https://2gis.ru/kazan/firm/70000001083733393",
      checkedOn: "2026-09-05",
    },
    {
      platform: "Яндекс Карты",
      value: 5.0,
      ratingCount: 126,
      reviewCount: 118,
      url: "https://yandex.ru/maps/org/sotremont/196388969596/",
      checkedOn: "2026-09-05",
    },
  ],
  services: [
    {
      id: "display",
      title: "Замена дисплея",
      description: "Трещины, полосы или экран не реагирует на касания.",
      icon: "screen",
      price: 990,
      duration: null,
    },
    {
      id: "battery",
      title: "Замена аккумулятора",
      description: "Заряд заканчивается быстрее, чем ваш день.",
      icon: "battery",
      price: 690,
      duration: null,
    },
    {
      id: "charging",
      title: "Ремонт разъёма зарядки",
      description:
        "Не видит кабель. Цена для Android; iPhone — уточните у мастера.",
      icon: "charging",
      price: 890,
      duration: null,
    },
    {
      id: "back",
      title: "Замена заднего стекла",
      description: "Вернём корпусу аккуратный вид.",
      icon: "phone",
      price: null,
      duration: null,
    }, // TODO: подтвердить у владельца, совпадает ли эта работа с «заменой задней крышки» в прайсе.
    {
      id: "camera",
      title: "Ремонт камеры",
      description:
        "Размытые снимки. Цена основной камеры Android; iPhone — уточните.",
      icon: "camera",
      price: 890,
      duration: null,
    },
    {
      id: "speaker",
      title: "Чистка динамиков",
      description: "Собеседника плохо слышно, звук стал тише.",
      icon: "sound",
      price: 490,
      duration: null,
    },
    {
      id: "glass",
      title: "Установка защитного стекла",
      description: "Подберём защиту под вашу модель.",
      icon: "shield",
      price: null,
      duration: null,
    },
    {
      id: "diagnostic",
      title: "Диагностика устройства",
      description: "Разберёмся, что случилось и что можно сделать.",
      icon: "tool",
      price: null,
      duration: null,
    },
  ] satisfies Service[], // TODO: подтвердить у владельца сроки и доступность каждой работы для модели.
  pricing: {
    source: "https://2gis.ru/kazan/firm/70000001083733393/tab/prices",
    updatedOn: "2026-06-14",
    checkedOn: "2026-09-05",
    fixedPriceIds: ["speaker"],
    note: "По прайсу 2ГИС от 14.06.2026. Цена зависит от модели и деталей. Что входит в сумму и итоговую стоимость подтвердит мастер после диагностики.",
  },
  categories: [
    { id: "phone", label: "Смартфон", icon: "phone" },
    { id: "tablet", label: "Планшет", icon: "tablet" },
    { id: "watch", label: "Смарт-часы", icon: "watch" },
    { id: "computer", label: "Компьютер", icon: "computer" },
  ], // TODO: подтвердить у владельца перечень ремонта планшетов и часов; выбор формирует запрос, а не обещание ремонта.
  displayBrands: [
    { label: "iPhone", className: "" },
    { label: "SAMSUNG", className: "" },
    { label: "xiaomi", className: "xiaomi-name" },
    { label: "HONOR", className: "" },
    { label: "HUAWEI", className: "" },
    { label: "realme", className: "realme-name" },
  ],
  brands: [
    "Apple / iPhone",
    "Samsung",
    "Xiaomi",
    "Honor",
    "Huawei",
    "Realme",
    "Другой бренд",
  ],
  brandModels: {
    "Apple / iPhone": [
      "iPhone 16",
      "iPhone 16 Pro",
      "iPhone 15",
      "iPhone 15 Pro",
      "iPhone 14",
      "iPhone 13",
      "iPhone 12",
      "iPhone 11",
      "iPhone SE",
    ],
    Samsung: [
      "Galaxy S25",
      "Galaxy S24",
      "Galaxy S23",
      "Galaxy A55",
      "Galaxy A54",
      "Galaxy A35",
    ],
    Xiaomi: [
      "Xiaomi 14",
      "Xiaomi 13",
      "Redmi Note 13",
      "Redmi Note 12",
      "POCO X6",
    ],
    Honor: ["Honor 200", "Honor 90", "Honor X9"],
    Huawei: ["Huawei Pura 70", "Huawei P60", "Huawei Nova 12"],
    Realme: ["Realme 12", "Realme 11", "Realme C67"],
  } as Record<string, string[]>,
  symptoms: [
    {
      id: "screen",
      label: "Разбит экран",
      service: "display",
      advice:
        "Возможно, потребуется замена дисплея. Мастер проверит изображение, сенсор и состояние корпуса.",
    },
    {
      id: "back",
      label: "Разбито заднее стекло",
      service: "back",
      advice:
        "Возможно, потребуется замена заднего стекла или крышки. Мастер проверит корпус и подскажет подходящий вариант для вашей модели.",
    },
    {
      id: "charging",
      label: "Не заряжается",
      service: "charging",
      advice:
        "Понадобится проверить разъём, аккумулятор и цепь питания. Причина может быть и в кабеле — точнее скажет диагностика.",
    },
    {
      id: "battery",
      label: "Быстро разряжается",
      service: "battery",
      advice:
        "Возможно, потребуется замена аккумулятора. Сначала мастер проверит его состояние и причину расхода заряда.",
    },
    {
      id: "camera",
      label: "Не работает камера",
      service: "camera",
      advice:
        "Понадобится проверить камеру и её подключение. После диагностики станет понятно, нужен ли новый модуль.",
    },
    {
      id: "sound",
      label: "Нет звука",
      service: "speaker",
      advice:
        "Мастер проверит динамик, микрофон и настройки. Может потребоваться чистка или ремонт модуля.",
    },
    {
      id: "water",
      label: "Попала вода",
      service: "diagnostic",
      advice:
        "Не заряжайте устройство и не включайте его для проверки. Если это безопасно, выключите его. Не сушите феном: как можно скорее обратитесь к мастеру.",
    },
    {
      id: "glass",
      label: "Нужно защитное стекло",
      service: "glass",
      advice:
        "Уточним модель и подберём совместимое стекло. Наличие и стоимость установки подтвердит мастер.",
    },
    {
      id: "other",
      label: "Другая проблема",
      service: "diagnostic",
      advice:
        "Опишите, что произошло. Мастер уточнит детали и подскажет, с чего начать проверку.",
    },
  ],
  advantages: [
    {
      icon: "chat",
      title: "На связи с мастером",
      text: "Позвоните или напишите в мессенджер. Можно сразу рассказать о проблеме и задать вопросы.",
    },
    {
      icon: "star",
      title: "Отзывы можно проверить",
      text: "Реальные истории клиентов — на Яндекс Картах и в 2ГИС. Все ссылки открыты.",
    },
    {
      icon: "pin",
      title: "Рядом, в Казани",
      text: "Сибирский Тракт, 7/6. Ориентир — магазин «Хлебозавод № 3».",
    },
  ],
  process: [
    {
      title: "Рассказываете о проблеме",
      text: "Выберите симптомы на сайте или напишите мастеру своими словами.",
    },
    {
      title: "Мастер проводит диагностику",
      text: "Уточните условия диагностики перед передачей устройства.",
    },
    {
      title: "Согласовываете цену и срок",
      text: "Обсудите нужные работы, детали и стоимость с мастером.",
    },
    {
      title: "Получаете устройство",
      text: "Проверьте работу устройства вместе с мастером и уточните рекомендации.",
    },
  ],
  unconfirmed: {
    approvalBeforeRepair: null,
    warranty: null,
    returnsOldPart: null,
    repairWhileWaiting: null,
    payments: ["Карта", "Наличные", "Перевод", "QR-код"],
    computers: true,
  }, // TODO: подтвердить у владельца правила согласования, гарантию, возврат деталей, оплату и ремонт компьютеров.
  masters: [
    {
      name: null,
      role: "Ваш мастер в СотРемонт",
      experience: null,
      photo: null,
      specialties: [],
    },
  ] satisfies Master[],
  masterFallback: {
    name: null,
    role: "Ваш мастер в СотРемонт",
    experience: null,
    photo: null,
    specialties: [],
  } as Master,
  // TODO: подтвердить у владельца имя, роль, опыт и специализации; получить разрешение на фото.
  beforeAfter: {
    before: null as string | null,
    after: null as string | null,
    caption: null as string | null,
  },
  // TODO: подтвердить у владельца права и описание реальных фотографий до/после.
  reviews: [
    {
      author: "Яр Оразов",
      date: "30 июня",
      text: "Заменили аккум на 16 про, спасибо большое мастеру Фаннуру спец своего дела 🙏",
      source: "Яндекс Карты",
      sourceUrl: "https://sotremont.clients.site/#rating",
      checkedOn: "2026-09-05",
      excerpt: false,
    },
    {
      author: "валерия",
      date: "29 июня",
      text: "Всё подробно объяснили и сразу взялись за работу.",
      source: "Яндекс Карты",
      sourceUrl: "https://sotremont.clients.site/#rating",
      checkedOn: "2026-09-05",
      excerpt: true,
    },
    {
      author: "Степан Плотников",
      date: null,
      text: "качественный сервис быстро сделали самсунг, вежливые сотрудники все по факту",
      source: "2ГИС",
      sourceUrl: "https://2gis.ru/kazan/firm/70000001083733393/tab/reviews",
      checkedOn: "2026-09-05",
      excerpt: true,
    },
  ], // Дословный публичный отзыв (15 слов); год в источнике не показан. Аватары не используются.
  accessories: [
    {
      id: "glass",
      title: "Защитные стёкла",
      subtitle: "Защита на каждый день",
      icon: "shield",
    },
    {
      id: "case",
      title: "Чехлы",
      subtitle: "Под вашу модель и стиль",
      icon: "phone",
    },
    {
      id: "cable",
      title: "Кабели",
      subtitle: "Для зарядки и подключения",
      icon: "charging",
    },
    {
      id: "charger",
      title: "Зарядные устройства",
      subtitle: "Подберём совместимое",
      icon: "plug",
    },
    {
      id: "headphones",
      title: "Наушники",
      subtitle: "Музыка и разговоры",
      icon: "headphones",
    },
    {
      id: "other",
      title: "Другие аксессуары",
      subtitle: "Спросите, что ищете",
      icon: "grid",
    },
  ], // TODO: подтвердить у владельца ассортимент, цены и наличие. Категории служат запросом, не складским остатком.
  faq: [
    {
      question: "Сколько занимает диагностика?",
      answer:
        "Зависит от устройства и проблемы. Опишите симптомы мастеру: он уточнит условия, стоимость и ориентировочное время диагностики.",
    },
    {
      question: "Можно ли узнать цену заранее?",
      answer:
        "Можно обсудить предварительную стоимость по модели и симптомам. Точную цену мастер назовёт после диагностики: одинаковые симптомы иногда имеют разные причины.",
    },
    {
      question: "Что делать, если телефон попал в воду?",
      answer:
        "Не заряжайте и не включайте телефон для проверки. Если это безопасно, выключите его. Не нагревайте, не разбирайте и как можно скорее свяжитесь с мастером.",
    },
    {
      question: "Сохранятся ли данные?",
      answer:
        "Это зависит от неисправности и работ. Заранее сообщите, какие данные важны. Если устройство работает и это безопасно, сделайте резервную копию. Сохранность данных нужно обсудить до ремонта.",
    },
    {
      question: "Есть ли гарантия?",
      answer:
        "Условия зависят от работы и установленных деталей. Уточните срок, ограничения и документ о гарантии у мастера до начала ремонта.",
    },
    {
      question: "Какие способы оплаты доступны?",
      answer:
        "Уточните актуальные способы оплаты по телефону или в мессенджере перед визитом.",
    },
    {
      question: "Можно ли приехать без записи?",
      answer:
        "Свяжитесь с мастером перед поездкой, чтобы уточнить загрузку, график и возможность принять ваше устройство.",
    },
    {
      question: "Где находится вход?",
      answer:
        "Наш адрес — Казань, Сибирский Тракт, 7/6. Ориентир — магазин «Хлебозавод № 3». Если не получается найти вход, позвоните: мастер подскажет.",
    },
  ],
  seo: {
    title: "СотРемонт — ремонт телефонов в Казани | Сибирский Тракт, 7/6",
    description:
      "Ремонт телефонов и аксессуары в Казани. Опишите проблему, узнайте возможный ремонт и свяжитесь с мастером СотРемонт. Сибирский Тракт, 7/6. +7 995 942-13-38.",
    canonicalUrl: null as string | null, // TODO: подтвердить у владельца адрес нового сайта; не подставлять старый или вымышленный домен.
    socialImage: "/assets/sotremont-logo-official.jpg",
    metrikaId: null as number | null, // TODO: подтвердить у владельца ID и правила согласия до подключения Метрики.
  },
};

export const whatsappUrl = (message: string) =>
  `${site.links.whatsapp}?text=${encodeURIComponent(message)}`;
export const accessoryMessage = (category: string) =>
  `Здравствуйте! Хочу уточнить наличие и возможность бронирования: ${category}. Подскажите доступные варианты, совместимость и стоимость.`;
export const priceLabel = (value: number | null) =>
  value === null
    ? "Уточнить цену"
    : `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
export const formatSourceDate = (value: string) =>
  new Intl.DateTimeFormat("ru-RU", { timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`),
  );
