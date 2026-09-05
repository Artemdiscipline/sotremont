import { useEffect, useRef } from "react";
import { site } from "../data/site";
import { Icon } from "./Icon";

export default function PrivacyDialog({
  kind,
  onClose,
}: {
  kind: "privacy" | "consent" | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (kind) ref.current?.showModal();
    else ref.current?.close();
  }, [kind]);
  return (
    <dialog
      className="privacy-dialog"
      ref={ref}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="privacy-title"
    >
      <div className="dialog-content">
        <button
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Icon name="close" />
        </button>
        <span className="eyebrow">СОТРЕМОНТ</span>
        <h2 id="privacy-title">
          {kind === "consent"
            ? "Обработка данных заявки"
            : "Конфиденциальность"}
        </h2>
        <p>
          Публичное наименование организации: {site.legalName}. Адрес:{" "}
          {site.address.full}
        </p>
        <h3>Как работает заявка</h3>
        <p>
          Выбранное устройство, модель и описание проблемы используются только в
          вашем браузере для составления сообщения. У сайта нет серверной формы
          приёма заявок: введённые сведения не сохраняются в базе, cookies или
          локальном хранилище.
        </p>
        <h3>Переход в мессенджер</h3>
        <p>
          По нажатию кнопки WhatsApp текст передаётся в ссылке выбранному
          сервису. При переходе в Telegram сайт пытается скопировать заявку в
          буфер обмена. Сообщение мастеру отправляете вы самостоятельно.
          Дальнейшая обработка регулируется правилами выбранного мессенджера и
          договорённостями с получателем.
        </p>
        <h3>Технические данные</h3>
        <p>
          Сайт не использует аналитику и рекламные cookies. При обращении к
          сайту его хостинг может получать технические данные соединения,
          например IP-адрес. Шрифты и изображения загружаются с сайта без
          обращений к внешним фотосервисам.
        </p>
        <h3>Ваш выбор</h3>
        <p>
          Вы можете не пользоваться диагностикой и позвонить мастеру. Не
          указывайте пароли, коды разблокировки, платёжные сведения или другие
          конфиденциальные данные в заявке.
        </p>
        <p>
          Вопросы об обработке данных:{" "}
          <a href={site.links.phone}>{site.phone}</a> или{" "}
          <a href={site.links.telegram} target="_blank" rel="noreferrer">
            Telegram сервиса
          </a>
          .
        </p>
        <button className="button yellow" onClick={onClose}>
          Понятно <Icon name="check" size={18} />
        </button>
      </div>
    </dialog>
  );
}
