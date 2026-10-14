# ✈️ Авиабилеты — Next.js + Mock Server

Учебный проект поиска и бронирования авиабилетов на Next.js (App Router).
Данные о рейсах отдаёт mock-сервер на базе JSON Server.

## Стек

- **Next.js 15** (App Router, Server & Client Components)
- **TypeScript**
- **Tailwind CSS**
- **JSON Server** — mock-API с рейсами
- **React Context + localStorage** — корзина

## Требования

Перед запуском установите:

- **Node.js** 18.17 или выше (рекомендуется 20+) — [скачать](https://nodejs.org)
- **npm** (идёт вместе с Node.js)
- **Git** — [скачать](https://git-scm.com/downloads)

Проверить установку:

```bash
node -v
npm -v
git --version
```

## Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/rizoom3-max/flights-app.git
cd flights-app
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Создать файл `.env.local`

В корне проекта создайте файл `.env.local` со следующим содержимым:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Этот файл не хранится в репозитории (он в `.gitignore`), поэтому его нужно создать вручную.

### 4. Запустить mock-сервер

Откройте **отдельный терминал** (в VS Code: `Ctrl + Shift + ~`) и выполните:

```bash
npx json-server mock/flights.json --port 4000
```

Сервер поднимется на `http://localhost:4000`.
Проверьте, что эндпоинт доступен: [http://localhost:4000/flights](http://localhost:4000/flights)

В выводе должно быть:

```
Endpoints:
http://localhost:4000/flights
```

> Если видите `/0`, `/1`, `/2` — значит файл `mock/flights.json` имеет неверную структуру. Он должен быть объектом с ключом `flights`:
> ```json
> { "flights": [ { "id": 1, ... } ] }
> ```

### 5. Запустить Next.js

В **первом терминале**:

```bash
npm run dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000)

## Итог: два процесса должны работать одновременно

| Терминал | Команда | Порт | Назначение |
|----------|---------|------|------------|
| 1 | `npm run dev` | 3000 | Next.js приложение |
| 2 | `npx json-server mock/flights.json --port 4000` | 4000 | Mock-API с рейсами |

Откройте [http://localhost:3000](http://localhost:3000) — увидите список рейсов.

## Функционал

- 📋 Список рейсов с авиакомпанией, временем вылета, маршрутом и ценой
- 🔍 Фильтр по городу прибытия (на лету, без перезагрузки)
- 🔀 Переключатель «прямые / с пересадкой / все»
- ↕️ Сортировка: по цене (возрастание/убывание), по популярности
- 🛒 Корзина: добавление рейсов, подсчёт суммы, оформление заказа
  - Сохраняется в `localStorage`
  - Счётчик с анимацией в хедере
- 📄 Страница отдельного рейса

## Структура проекта

```
flights-app/
├── app/
│   ├── cart/                # Страница корзины
│   ├── components/          # Переиспользуемые компоненты
│   ├── context/             # CartContext (глобальный стейт корзины)
│   ├── flights/[id]/        # Страница отдельного рейса
│   ├── lib/                 # API-клиент (fetch к mock-серверу)
│   ├── types/               # TypeScript-типы
│   ├── layout.tsx           # Обёртка всех страниц
│   └── page.tsx             # Главная страница (список рейсов)
├── mock/
│   └── flights.json         # Mock-данные рейсов
├── public/                  # Статика
└── package.json
```

## Mock-данные

Файл `mock/flights.json` — массив рейсов вида:

```json
{
  "flights": [
    {
      "id": 1,
      "from": "Москва",
      "to": "Сочи",
      "price": 5000,
      "isDirect": true,
      "bookings": 320,
      "airline": "Аэрофлот",
      "departure": "08:00",
      "arrival": "10:30"
    }
  ]
}
```

JSON Server автоматически создаёт REST-эндпоинты:

- `GET /flights` — все рейсы
- `GET /flights/:id` — рейс по id
- `GET /flights?from=Москва&to=Сочи` — фильтр по полям

## Возможные проблемы

**`node` или `npm` не распознаётся**
→ Node.js не установлен или терминал не перезапущен после установки. Перезапустите VS Code или компьютер.

**Ошибка `npm.ps1 cannot be loaded` в PowerShell**
→ Выполните один раз:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**Страница 500 или `fetch failed`**
→ Mock-сервер не запущен. Проверьте [http://localhost:4000/flights](http://localhost:4000/flights) в браузере.

**Карточки пустые, в консоли JSON Server видны эндпоинты `/0`, `/1`**
→ Неверная структура `mock/flights.json`. Нужна обёртка `{ "flights": [...] }`.

**Порт 3000 или 4000 занят**
→ Закройте старое окно терминала с работающим процессом или укажите другой порт: `npm run dev -- -p 3001`.

## Скрипты

```bash
npm run dev      # Запуск dev-сервера Next.js
npm run build    # Продакшен-сборка
npm run start    # Запуск продакшен-сборки
npm run lint     # Проверка кода ESLint
```

## Лицензия

Учебный проект. Свободное использование в образовательных целях.