import { useEffect, useRef, useState } from "react";
import { site, whatsappUrl } from "../data/site";
import { Icon } from "./Icon";

export interface DiagnosticSelection {
  service: string;
  nonce: number;
}

export default function Diagnostic({
  selection,
}: {
  selection: DiagnosticSelection | null;
}) {
  const [category, setCategory] = useState("phone");
  const [brand, setBrand] = useState("Apple / iPhone");
  const [model, setModel] = useState("");
  const [symptom, setSymptom] = useState("");
  const [detail, setDetail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [manualTelegram, setManualTelegram] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const selectedSymptom = site.symptoms.find((item) => item.id === symptom);
  const selectedCategory = site.categories.find(
    (item) => item.id === category,
  )!;
  const service = site.services.find(
    (item) => item.id === selectedSymptom?.service,
  );
  const message = `Здравствуйте! Хочу уточнить возможность ремонта.\nУстройство: ${selectedCategory.label}.\nБренд: ${brand}.\nМодель: ${model.trim() || "не знаю модель"}.\nПроблема: ${selectedSymptom?.label ?? "нужна консультация"}.${symptom === "other" && detail.trim() ? `\nПодробности: ${detail.trim()}` : ""}\nПодскажите, пожалуйста, условия диагностики, ориентировочную стоимость и срок.`;

  useEffect(() => {
    if (!selection) return;
    setSymptom(
      selection.service === "diagnostic"
        ? "other"
        : (site.symptoms.find((item) => item.service === selection.service)
            ?.id ?? "other"),
    );
    setDetail("");
    setShowResult(false);
    modelRef.current?.focus({ preventScroll: true });
  }, [selection]);

  const resetResult = () => {
    setShowResult(false);
    setCopyStatus("");
    setManualTelegram(false);
  };
  const copyMessage = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message);
      setCopyStatus("Заявка скопирована. Вставьте её в чат с мастером.");
      return true;
    } catch {
      setCopyStatus(
        "Автоматическое копирование недоступно. Выделите текст заявки и скопируйте его вручную.",
      );
      textRef.current?.focus();
      textRef.current?.select();
      return false;
    }
  };
  const copyAndOpenTelegram = async () => {
    // Резервируем вкладку в пользовательском событии, чтобы браузер не блокировал переход после await.
    const copying = copyMessage(); // Clipboard вызывается, пока исходная вкладка ещё в фокусе.
    const tab = window.open("about:blank", "_blank");
    if (tab) tab.opener = null;
    const copied = await copying;
    if (copied && tab) tab.location.replace(site.links.telegram);
    else {
      tab?.close();
      setManualTelegram(true);
    }
  };

  return (
    <section
      className="diagnostic-section section"
      id="diagnostic"
      aria-labelledby="diagnostic-title"
    >
      <div className="container diagnostic-layout">
        <div className="diagnostic-intro">
          <span className="eyebrow">
            <span className="tiny-cross">✳</span> УТКА-ДИАГНОСТ
          </span>
          <h2 id="diagnostic-title">
            Ну что,
            <br />
            что случилось?
          </h2>
          <p>
            Пара деталей — и мастеру будет проще помочь. Начнём с вашего
            устройства.
          </p>
          <div className="diagnostic-note">
            <Icon name="chat" />
            <p>
              Это предварительная подсказка.
              <br />
              Точную причину определит мастер.
            </p>
          </div>
          <div className="diagnostic-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <form
          className="diagnostic-form"
          onSubmit={(event) => {
            event.preventDefault();
            setShowResult(true);
            setCopyStatus("");
            requestAnimationFrame(() => {
              resultRef.current?.focus({ preventScroll: true });
              resultRef.current?.scrollIntoView({
                block: "nearest",
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              });
            });
          }}
        >
          <fieldset>
            <legend>
              <span className="step-dot">1</span> Какое устройство?
            </legend>
            <div className="device-options">
              {site.categories.map((item) => (
                <label
                  className={`device-option ${category === item.id ? "selected" : ""}`}
                  key={item.id}
                >
                  <input
                    type="radio"
                    name="category"
                    value={item.id}
                    checked={category === item.id}
                    onChange={() => {
                      setCategory(item.id);
                      setModel("");
                      resetResult();
                    }}
                  />
                  <Icon name={item.icon} size={20} />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className="step-dot">2</span> Бренд и модель
            </legend>
            <div className="model-fields">
              <label>
                Бренд
                <select
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                    setModel("");
                    resetResult();
                  }}
                >
                  {site.brands.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Модель <span className="optional">если знаете</span>
                <input
                  ref={modelRef}
                  name="model"
                  list="model-suggestions"
                  placeholder={
                    category === "phone"
                      ? "Например, iPhone 14"
                      : "Укажите модель"
                  }
                  value={model}
                  onChange={(event) => {
                    setModel(event.target.value);
                    resetResult();
                  }}
                  maxLength={100}
                  autoComplete="off"
                />
                <datalist id="model-suggestions">
                  {(category === "phone"
                    ? (site.brandModels[brand] ?? [])
                    : []
                  ).map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span className="step-dot">3</span> Что беспокоит?
            </legend>
            <div className="symptom-options">
              {site.symptoms.map((item) => (
                <label
                  key={item.id}
                  className={`symptom-option ${symptom === item.id ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="symptom"
                    required
                    value={item.id}
                    checked={symptom === item.id}
                    onChange={() => {
                      setSymptom(item.id);
                      resetResult();
                    }}
                  />
                  {item.label}
                  {symptom === item.id && <Icon name="check" size={14} />}
                </label>
              ))}
            </div>
            {symptom === "other" && (
              <label className="detail-label">
                Расскажите подробнее
                <textarea
                  value={detail}
                  onChange={(event) => {
                    setDetail(event.target.value);
                    resetResult();
                  }}
                  maxLength={1000}
                  rows={3}
                  placeholder="Что произошло и как ведёт себя устройство?"
                />
              </label>
            )}
          </fieldset>
          <div className="diagnostic-submit">
            <button className="button yellow" type="submit">
              Подсказать ремонт <Icon name="arrow" size={20} />
            </button>
            <span>
              Без номера телефона
              <br />и обязательной записи
            </span>
          </div>
          {showResult && selectedSymptom && (
            <div className="diagnostic-result" ref={resultRef} tabIndex={-1}>
              <span className="eyebrow">ВОЗМОЖНОЕ РЕШЕНИЕ</span>
              <h3>{service?.title ?? "Диагностика устройства"}</h3>
              <p>{selectedSymptom.advice}</p>
              <p className="result-caveat">
                Точная стоимость определяется после диагностики. Возможность
                ремонта вашей модели и срок подтвердит мастер.
              </p>
              <label htmlFor="request-message">Ваша заявка мастеру</label>
              <textarea
                id="request-message"
                ref={textRef}
                value={message}
                readOnly
                rows={6}
                onFocus={(event) => event.target.select()}
              />
              <div className="result-actions">
                <a
                  className="button yellow"
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Отправить в WhatsApp <Icon name="diagonal" size={18} />
                </a>
                <button
                  className="button outlined"
                  type="button"
                  onClick={() => {
                    void copyAndOpenTelegram();
                  }}
                >
                  Скопировать заявку и открыть Telegram{" "}
                  <Icon name="copy" size={18} />
                </button>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => {
                    void copyMessage();
                  }}
                >
                  <Icon name="copy" size={17} /> Скопировать текст заявки
                </button>
              </div>
              <p role="status" className="copy-status">
                {copyStatus}
              </p>
              {manualTelegram && (
                <a
                  className="text-link manual-telegram"
                  href={site.links.telegram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть Telegram <Icon name="diagonal" size={18} />
                </a>
              )}
              <small>
                Сайт не отправляет и не сохраняет заявку. Сообщение отправите вы
                в выбранном мессенджере. Не добавляйте пароли и другие
                конфиденциальные данные.
              </small>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
