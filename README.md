# Sensei's Desk 📂

![hoshino-mid-autumn-blue-archive-moewalls-com](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTk3N2dvNmZuczFteGNyczJ1anNrbWtvNDZkODFsZ2NrODZ6eWEzYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Tn2tvmRCmHrlGKscu5/giphy.gif)


**Sensei's Desk** is a personal blog and archive system themed around _Blue Archive_ (Schale/Kivotos). Built with modern web technologies, it features a clean, student-council-inspired administrative dashboard and a sleek public-facing blog.

> "A quiet corner amidst the chaos of Kivotos, accessed via the Shittim Chest."

## 🚀 Tech Stack

**The TALL Stack (Modern Variation):**

- **Backend:** [Laravel 12](https://laravel.com) (PHP 8.4+)
- **Frontend:** [React](https://react.dev) (TypeScript) via [Inertia.js v2](https://inertiajs.com)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **Database:** SQLite (Default) / MySQL Compatible
- **Tools:** Vite, TypeScript, Ziggy, Fortify

## ✨ Features

- **Blue Archive Themed UI**: Custom fonts, colors, and layouts inspired by the game's aesthetic.
- **Inertia.js Monolith**: Single-page application (SPA) feel without the complexity of a separate API.
- **Admin Dashboard**:
    - Create, Edit, and Delete Posts.
    - Rich Text Editor (Tiptap) with image support.
    - Markdown-style content management.
- **Background Music (BGM)**: Integrated YouTube iframe player with persistent audio state across navigation ("Constant Moderato Chill Edition").
- **Secure Authentication**: Powered by Laravel Fortify.

## � Project Structure

```
sensei-desk/
├── app/                 # Laravel Backend Logic (Controllers, Models)
├── config/              # Application Configuration
├── database/            # Migrations, Seeders, & SQLite DB
├── public/              # Static Assets (Images, Builds)
├── resources/
│   ├── css/             # Tailwind & Global Styles
│   ├── js/
│   │   ├── Components/  # Reusable React UI (Shadcn + Custom)
│   │   ├── Layouts/     # Main Layouts (Public & Admin)
│   │   ├── Pages/       # Application Views (Inertia)
│   │   ├── app.tsx      # Main React Entry Point
│   │   └── ssr.tsx      # Server Side Rendering Entry
│   └── views/           # Blade Templates (Root View)
├── routes/              # Web & API Routes
└── vite.config.ts       # Frontend Build Configuration
```

## �🛠️ Installation (Local Development)

Follow these steps to deploy the Shittim Chest OS locally on your machine.

### Prerequisites

- PHP 8.4 or higher
- Composer
- Node.js & NPM

### 1. Clone the Repository

```bash
git clone https://github.com/Ikhsaaan334/sensei-desk.git
cd sensei-desk
```

### 2. Install Dependencies

**Backend:**

```bash
composer install
```

**Frontend:**

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and generate the application key.

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Database Setup

By default, the project is configured to use **SQLite**.
Create the database file (if it doesn't exist):

- **Windows (PowerShell):** `New-Item database/database.sqlite`
- **Mac/Linux:** `touch database/database.sqlite`

Run migrations and seed default data:

```bash
php artisan migrate:fresh --seed
```

### 5. Start the Server

You need two terminals running simultaneously:

**Terminal 1 (Vite Development Server):**

```bash
npm run dev
```

**Terminal 2 (Laravel Server):**

```bash
php artisan serve
```

Access the application at `http://localhost:8000`.

## 🔑 Default Credentials (Seeder)

The `DatabaseSeeder` creates a default Sensei (Admin) account for you.

- **Email:** `Sensei@SchaleSensei.com`
- **Password:** `shirokomybeloved`
- **Environment Variable:** You can override the password in `.env` using `ADMIN_PASSWORD`.

## 📦 Deployment (Hosting)

This project is optimized for viewing on **VPS** or **Shared Hosting** (e.g., Niagahoster, Railway, Fly.io).

1.  **Build Assets:** `npm run build`
2.  **Upload:** Upload the contents to your server.
3.  **Public Folder:** Ensure your domain points to the `public/` directory.
4.  **Database:** Migrate your production database.

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🎨 Credits & Disclaimer

- **Blue Archive** is a registered trademark of Yostar & Nexon Games. This project is a fan-made creation and is not affiliated with the official developers.
- **UI/Design Inspiration**: In-game UI of Blue Archive (Schale Office).
