import { useEffect, useRef, useState } from "react";
import {
  site,
  accessoryMessage,
  priceLabel,
  whatsappUrl,
  formatSourceDate,
} from "./data/site";
import { Icon } from "./components/Icon";
import Diagnostic from "./components/Diagnostic";
import type { DiagnosticSelection } from "./components/Diagnostic";
import Comparison from "./components/Comparison";
import PrivacyDialog from "./components/PrivacyDialog";

const navigation = [
  { title: "Услуги", href: "#services" },
  { title: "Цены", href: "#prices" },
  { title: "Как ремонтируем", href: "#process" },
  { title: "Отзывы", href: "#reviews" },
  { title: "Контакты", href: "#contacts" },
];
const mascot = `${import.meta.env.BASE_URL}assets/sotremont-logo-official.jpg`;

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div className="topbar">
        <div className="container">
          <a href={site.links.route} target="_blank" rel="noreferrer">
            <Icon name="pin" size={14} /> Казань, {site.address.short}
          </a>
          <span>Ремонт телефонов. И немного заботы.</span>
          <a href={site.links.phone}>{site.phone}</a>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="СотРемонт — на главную">
            <span className="brand-mark">
              <img src={mascot} alt="" width="42" height="42" />
            </span>
            <span>
              Сот<span className="brand-blue">Ремонт</span>
              <small>СВОЙ МАСТЕР В КАЗАНИ</small>
            </span>
          </a>
          <nav
            className={`nav ${open ? "is-open" : ""}`}
            id="main-navigation"
            aria-label="Основная навигация"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <a className="mobile-nav-phone" href={site.links.phone}>
              {site.phone}
            </a>
          </nav>
          <a
            className="button header-cta yellow"
            href={site.links.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Написать мастеру <Icon name="diagonal" size={18} />
          </a>
          <button
            ref={menuRef}
            className="icon-button menu-toggle"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  const rating = site.ratings[0];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> РЕМОНТ ТЕЛЕФОНОВ В КАЗАНИ
          </div>
          <h1 id="hero-title">
            Вернём
            <br />
            телефон
            <br />
            <span>
              в строй<span className="yellow-stop">.</span>
            </span>
          </h1>
          <p className="hero-description">
            Разбит экран? Не держит заряд?
            <br />
            Выберите проблему — подскажем возможный ремонт и свяжем с мастером.
          </p>
          <div className="hero-actions">
            <a className="button yellow" href="#diagnostic">
              Узнать стоимость <Icon name="arrow" size={20} />
            </a>
            <a
              className="button outlined"
              href={site.links.telegram}
              target="_blank"
              rel="noreferrer"
            >
              Написать мастеру <Icon name="telegram" size={19} />
            </a>
          </div>
          <div className="hero-trust">
            {rating && (
              <a
                className="hero-rating"
                href={rating.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="rating-number">{rating.value.toFixed(1)}</span>
                <span>
                  <span className="stars" aria-label={`${rating.value} из 5`}>
                    {"★".repeat(Math.round(rating.value))}
                  </span>
                  <span className="rating-meta">
                    {rating.ratingCount} оценок в {rating.platform}{" "}
                    <Icon name="diagonal" size={13} />
                  </span>
                </span>
              </a>
            )}
            <span className="trust-divider" />
            <div className="hero-location">
              <Icon name="pin" size={21} />
              <span>
                {site.address.short}
                <small>{site.address.landmark}</small>
              </span>
            </div>
          </div>
          {rating && (
            <p className="source-date">
              Рейтинг проверен {formatSourceDate(rating.checkedOn)}
            </p>
          )}
        </div>
        <div className="hero-workshop">
          <div className="workshop-top">
            <span>СОТРЕМОНТ / КАЗАНЬ</span>
            <Icon name="tool" size={20} />
          </div>
          <span className="workshop-cross cross-one" aria-hidden="true">
            +
          </span>
          <span className="workshop-cross cross-two" aria-hidden="true">
            +
          </span>
          <div className="mascot-frame">
            <img
              src={mascot}
              alt="Фирменная жёлтая утка-мастер СотРемонт в очках, с пропеллером, телефоном и отвёрткой"
              width="800"
              height="800"
              fetchPriority="high"
            />
          </div>
          <div className="duck-label">
            <span>ТЕХНИКА КАПРИЗНИЧАЕТ?</span>
            <strong>Разберёмся.</strong>
            <svg viewBox="0 0 90 22" aria-hidden="true">
              <path d="M3 15C22 7 52 5 85 11M74 3l11 8-10 8" />
            </svg>
          </div>
          <a className="workshop-bottom" href="#diagnostic">
            <span>
              <span className="mini-spark">✳</span> УТКА-ДИАГНОСТ
            </span>
            <span>
              Начать знакомство <Icon name="arrow" size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Services({ onSelect }: { onSelect: (service: string) => void }) {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ПО ДЕЛУ И ПО ДЕТАЛЯМ</span>
            <h2>
              Знакомая проблема?
              <br />
              <span className="blue-text">Поможем разобраться.</span>
            </h2>
          </div>
          <p>
            От треснувшего стекла до телефона,
            <br className="desktop-break" /> который решил не включаться.
          </p>
        </div>
        <div id="prices" className="price-intro">
          <span>
            <Icon name="tool" size={18} /> Популярные услуги
          </span>
          <a href={site.pricing.source} target="_blank" rel="noreferrer">
            Цены из 2ГИС <Icon name="diagonal" size={15} />
          </a>
        </div>
        <div className="services-grid">
          {site.services.map((service) => (
            <article
              className={`service-card ${service.price === null ? "price-unknown" : ""}`}
              key={service.id}
            >
              <div className="service-card-top">
                <Icon name={service.icon} size={33} />
                <span className="service-corner" aria-hidden="true">
                  +
                </span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">
                <span>
                  {service.price !== null &&
                  !site.pricing.fixedPriceIds.includes(service.id)
                    ? "от "
                    : ""}
                  {priceLabel(service.price)}
                </span>
                <button
                  className="round-arrow"
                  onClick={() => onSelect(service.id)}
                  aria-label={`Уточнить цену: ${service.title}`}
                >
                  <Icon name="diagonal" size={20} />
                </button>
              </div>
              <span className="service-time">
                {service.duration ?? "Срок после диагностики"}
              </span>
            </article>
          ))}
        </div>
        <p className="price-note">{site.pricing.note}</p>
        <div className="brands">
          <span>Знакомы с вашей техникой</span>
          <div className="brand-names">
            {site.displayBrands.map((brand) => (
              <b key={brand.label} className={brand.className}>
                {brand.label}
              </b>
            ))}
          </div>
          <p>
            Другие смартфоны и компьютеры — уточните ремонт модели. Планшет или
            смарт-часы?{" "}
            <a href={site.links.telegram} target="_blank" rel="noreferrer">
              Спросите мастера <Icon name="diagonal" size={14} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">БЕЗ ТЕХНИЧЕСКОГО ТУМАНА</span>
            <h2>
              Вы — о проблеме.
              <br />
              Мы — о решении.
            </h2>
          </div>
          <p>
            Понятный путь от «что-то сломалось»
            <br className="desktop-break" /> до встречи с вашим устройством.
          </p>
        </div>
        <ol className="process-steps">
          {site.process.map((step, index) => (
            <li key={step.title}>
              <div className="process-step-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {index < site.process.length - 1 && (
                  <Icon name="arrow" size={23} />
                )}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="advantages">
          {site.advantages.map((item) => (
            <div key={item.title}>
              <Icon name={item.icon} size={27} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workshop() {
  const master = site.masters[0] ?? site.masterFallback;
  return (
    <section className="section workshop-section">
      <div className="container workshop-layout">
        <Comparison />
        <div className="workshop-copy">
          <span className="eyebrow">МАСТЕРСКАЯ, А НЕ КОЛЛ-ЦЕНТР</span>
          <h2>
            За ремонтом —<br />
            <span className="blue-text">живой человек.</span>
          </h2>
          <p>
            У телефона своя история. И прежде чем браться за инструменты, её
            нужно услышать.
          </p>
          <p>
            Расскажите, когда появилась проблема, что уже пробовали и что важно
            сохранить. Можно без технических терминов — поймём.
          </p>
          <div className="master-profile">
            {master.photo ? (
              <img
                src={master.photo}
                alt={master.name ?? master.role}
                loading="lazy"
                width="52"
                height="52"
              />
            ) : (
              <span className="master-avatar">
                <Icon name="tool" size={25} />
              </span>
            )}
            <div>
              <strong>{master.name ?? master.role}</strong>
              <span>
                {master.name
                  ? master.role
                  : "На связи по телефону и в мессенджерах"}
              </span>
              {master.experience && <span>{master.experience}</span>}
              {master.specialties.length > 0 && (
                <span>{master.specialties.join(" · ")}</span>
              )}
            </div>
          </div>
          <a
            className="text-link"
            href={site.links.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Написать мастеру <Icon name="diagonal" size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">СЛОВО КЛИЕНТАМ</span>
            <h2>
              Репутация —<br />в реальных историях.
            </h2>
          </div>
          <div className="platform-ratings">
            {site.ratings.map((item) => (
              <a
                href={item.url}
                key={item.platform}
                target="_blank"
                rel="noreferrer"
              >
                <span className="platform-score">
                  {item.value.toFixed(1)} <span aria-label="звёзд">★</span>
                </span>
                <strong>
                  {item.platform} <Icon name="diagonal" size={14} />
                </strong>
                <small>
                  {item.reviewCount} отзывов · {item.ratingCount} оценок
                </small>
              </a>
            ))}
          </div>
        </div>
        <div className="reviews-grid">
          {site.reviews.map((review, index) => (
            <article className="review-card" key={review.author}>
              <div className="review-top">
                <span className={`review-avatar avatar-${index}`}>
                  {review.author.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <h3>{review.author}</h3>
                  <span>
                    {review.date ?? "Публичный отзыв"}
                    {review.excerpt ? " · фрагмент" : ""}
                  </span>
                </div>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
              </div>
              <blockquote>{review.text}</blockquote>
              <a href={review.sourceUrl} target="_blank" rel="noreferrer">
                Читать в источнике · {review.source}{" "}
                <Icon name="diagonal" size={14} />
              </a>
            </article>
          ))}
        </div>
        <div className="reviews-footer">
          <p>
            Публичные отзывы и рейтинги проверены{" "}
            {site.ratings[0]
              ? formatSourceDate(site.ratings[0].checkedOn)
              : "по ссылкам на источники"}
            . Значения на картах могут измениться.
          </p>
          <a
            className="text-link"
            href={site.links.yandex}
            target="_blank"
            rel="noreferrer"
          >
            Все отзывы на Яндекс Картах <Icon name="diagonal" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Accessories() {
  return (
    <section className="section accessories-section" id="accessories">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">НЕ ТОЛЬКО РЕМОНТ</span>
            <h2>
              Мелочи, которые
              <br />
              <span className="blue-text">берегут телефон.</span>
            </h2>
          </div>
          <p>
            Стекло, чехол или новый кабель.
            <br />
            Напишите модель — уточним наличие.
          </p>
        </div>
        <div className="accessories-grid">
          {site.accessories.map((item) => (
            <a
              className={`accessory-card accessory-${item.id}`}
              key={item.id}
              href={whatsappUrl(accessoryMessage(item.title))}
              target="_blank"
              rel="noreferrer"
            >
              <div className="accessory-art" aria-hidden="true">
                <Icon name={item.icon} size={68} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="accessory-action">
                Уточнить наличие <Icon name="diagonal" size={17} />
              </span>
            </a>
          ))}
        </div>
        <p className="accessory-note">
          Наличие, совместимость, стоимость и бронирование подтверждает мастер в
          переписке.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq-section">
      <div className="container faq-layout">
        <div>
          <span className="eyebrow">ПОГОВОРИМ ОБ ЭТОМ</span>
          <h2>
            Нормальные
            <br />
            вопросы.
          </h2>
          <p>
            Если вашего здесь нет —<br />
            просто напишите мастеру.
          </p>
          <a
            className="text-link"
            href={site.links.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Написать мастеру <Icon name="diagonal" size={18} />
          </a>
        </div>
        <div className="faq-list">
          {site.faq.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Icon name="plus" size={20} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section className="section contacts-section" id="contacts">
      <div className="container contacts-layout">
        <div className="contacts-copy">
          <span className="eyebrow">УВИДИМСЯ В МАСТЕРСКОЙ</span>
          <h2>
            Мы тут.
            <br />
            <span>Заходите.</span>
          </h2>
          <address>
            <strong>Казань, {site.address.short}</strong>
            <span>{site.address.landmark}</span>
            <small>
              {site.address.country}, {site.address.region}
            </small>
          </address>
          <div className="contact-hours">
            <Icon name="clock" size={21} />
            <div>
              <strong>{site.hours.label}</strong>
              <small>{site.hours.note}</small>
            </div>
          </div>
          <a className="contact-phone" href={site.links.phone}>
            {site.phone} <Icon name="diagonal" size={22} />
          </a>
          <div className="contact-messengers">
            <a href={site.links.telegram} target="_blank" rel="noreferrer">
              <Icon name="telegram" size={19} /> Telegram
            </a>
            <a href={site.links.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="chat" size={19} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="route-card">
          <div className="route-illustration" aria-hidden="true">
            <span className="map-road road-one" />
            <span className="map-road road-two" />
            <span className="map-road road-three" />
            <span className="map-block block-one" />
            <span className="map-block block-two" />
            <span className="map-block block-three" />
            <span className="map-street">СИБИРСКИЙ ТРАКТ</span>
            <div className="map-location">
              <Icon name="pin" size={32} />
              <span>
                СотРемонт<b>7/6</b>
              </span>
            </div>
            <span className="map-label">КАЗАНЬ</span>
          </div>
          <div className="route-card-content">
            <span className="route-caption">
              Схема-иллюстрация. Точный маршрут — на картах.
            </span>
            <h3>Ориентир — «Хлебозавод № 3»</h3>
            <p>
              Если не нашли вход, позвоните.
              <br />
              Мастер подскажет, как пройти.
            </p>
            {site.address.entrancePhoto && (
              <img
                src={site.address.entrancePhoto}
                alt="Вход в СотРемонт, Сибирский Тракт, 7/6"
                loading="lazy"
                className="entrance-photo"
              />
            )}
            <a
              className="button yellow"
              href={site.links.route}
              target="_blank"
              rel="noreferrer"
            >
              Построить маршрут <Icon name="diagonal" size={19} />
            </a>
            <div className="map-links">
              <a href={site.links.yandex} target="_blank" rel="noreferrer">
                Яндекс Карты <Icon name="diagonal" size={14} />
              </a>
              <a href={site.links.dgis} target="_blank" rel="noreferrer">
                2ГИС <Icon name="diagonal" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selection, setSelection] = useState<DiagnosticSelection | null>(null);
  const [privacy, setPrivacy] = useState<"privacy" | "consent" | null>(null);
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <div className="workshop-ribbon">
          <div className="container">
            <span>
              <Icon name="screen" size={20} /> Ремонт телефонов
            </span>
            <span className="ribbon-plus" aria-hidden="true">
              +
            </span>
            <span>
              <Icon name="shield" size={20} /> Аксессуары и защита
            </span>
            <span className="ribbon-plus" aria-hidden="true">
              +
            </span>
            <span>
              <Icon name="chat" size={20} /> Прямо к мастеру
            </span>
            <a href="#contacts">
              Свой сервис в Казани <Icon name="diagonal" size={18} />
            </a>
          </div>
        </div>
        <Diagnostic selection={selection} />
        <Services
          onSelect={(service) => {
            setSelection({ service, nonce: Date.now() });
            document.getElementById("diagnostic")?.scrollIntoView({
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
              block: "start",
            });
          }}
        />
        <Process />
        <Workshop />
        <Reviews />
        <Accessories />
        <FAQ />
        <Contacts />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="footer-brand" href="#">
              СотРемонт<span>Ремонт телефонов. Казань.</span>
            </a>
            <p>
              {site.legalName}
              <br />
              <a href={site.links.phone}>{site.phone}</a>
            </p>
            <div className="footer-links">
              <a href={site.links.telegram} target="_blank" rel="noreferrer">
                Telegram ↗
              </a>
              <a href={site.links.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp ↗
              </a>
              <a href={site.links.yandex} target="_blank" rel="noreferrer">
                Яндекс Карты ↗
              </a>
              <a href={site.links.dgis} target="_blank" rel="noreferrer">
                2ГИС ↗
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} СотРемонт</span>
            <button onClick={() => setPrivacy("privacy")}>
              Политика конфиденциальности
            </button>
            <button onClick={() => setPrivacy("consent")}>
              Обработка данных заявки
            </button>
            <span>
              Сделано с характером{" "}
              <span className="footer-spark" aria-hidden="true">
                ✳
              </span>
            </span>
          </div>
        </div>
      </footer>
      <nav className="mobile-bottom" aria-label="Быстрая связь">
        <a href={site.links.phone}>
          <Icon name="call" size={21} />
          <span>Позвонить</span>
        </a>
        <a href={site.links.telegram} target="_blank" rel="noreferrer">
          <Icon name="telegram" size={21} />
          <span>Telegram</span>
        </a>
        <a href={site.links.route} target="_blank" rel="noreferrer">
          <Icon name="pin" size={21} />
          <span>Маршрут</span>
        </a>
      </nav>
      <PrivacyDialog kind={privacy} onClose={() => setPrivacy(null)} />
    </>
  );
}
