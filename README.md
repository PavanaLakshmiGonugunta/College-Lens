<div align="center">
  
  # 🎓 CollegeLens
  
  **Discover, Compare, and Shortlist Your Dream Colleges in India**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

</div>

---

CollegeLens is a premium, data-driven college discovery platform built with modern web technologies. Inspired by the clarity and aesthetics of modern "Lens" interfaces, it empowers students to make informed educational decisions through dynamic search, side-by-side comparisons, and comprehensive analytics.

## ✨ Key Features

- 🔍 **Dynamic Smart Search**: Lightning-fast autocomplete search for colleges, cities, and streams.
- ⚖️ **Side-by-Side Comparison**: Select and compare multiple colleges across metrics like fees, placement packages, ratings, and course offerings.
- 📌 **Personalized Shortlists**: Log in to bookmark favorite colleges and save custom comparison groups.
- 📊 **Detailed College Insights**: Access comprehensive data including rankings, top recruiters, and detailed brochures.
- ⚙️ **Admin Dashboard**: A secure, integrated CMS for administrators to manage college data, edit entries, and add new institutions seamlessly.
- 🎨 **Glassmorphic UI**: A stunning, responsive design that looks perfect on both desktop and mobile devices.

## 🏗️ Technology Stack

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/), React 19, TypeScript
- **Styling**: Tailwind CSS (v4), Lucide React Icons
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js (Credentials Provider)

---

## 🚀 Getting Started

Follow these steps to set up CollegeLens on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (via Docker or local installation)

### 1. Clone the Repository
```bash
git clone https://github.com/PavanaLakshmiGonugunta/College-Lens.git
cd College-Lens
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your configurations:
```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/collegelens"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-string-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup & Seeding
Start your PostgreSQL server. Then, run the following commands to initialize the schema and populate the database with realistic sample data:
```bash
npx prisma db push
npx prisma db seed
```
*(Note: The seed script automatically creates dummy colleges and an Admin user).*

### 5. Start the Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Default Accounts

After running the database seed, you can access the platform using these credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `password123` |
| **User** | `rahul@example.com` | `password123` |

*Logging in as an admin will automatically redirect you to the secure Admin Dashboard.*

---

## 🤝 Contributing

We welcome contributions to make CollegeLens even better! 
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ by Pavana Lakshmi Gonugunta</p>
</div>
