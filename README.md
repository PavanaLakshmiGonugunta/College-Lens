<div align="center">
  
  # CollegeLens
  
  **Data-Driven College Discovery and Comparison Platform**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

</div>

---

CollegeLens is a web application designed to facilitate the discovery and evaluation of higher education institutions in India. It provides structured search, tabular comparisons, and persistence of user preferences through a custom backend integration.

## Key Features

- **Search Engine**: Indexed search supporting queries by institution name, city, and academic stream with autocomplete functionality.
- **Comparative Analysis**: Matrix-style comparison engine evaluating metrics such as tuition fees, placement statistics, rating indexes, and programmatic offerings.
- **Data Persistence**: State-managed session tracking allowing authenticated users to store bookmarked institutions and specific comparison configurations.
- **Administration Panel**: Integrated CMS supporting CRUD operations for the underlying PostgreSQL college database.
- **Interface Design**: Responsive UI optimized for desktop and mobile devices.

## Technology Stack

- **Core**: [Next.js 15 (App Router)](https://nextjs.org/), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **Database Architecture**: PostgreSQL managed via Prisma ORM
- **Authentication**: NextAuth.js (Session-based Credentials Provider)

---

## Architecture Overview

### Project Structure

```text
src/
├── app/               # Next.js App Router (Pages, Layouts, API Routes)
│   ├── admin/         # CMS and administrative endpoints
│   ├── api/           # Backend REST/JSON endpoints
│   ├── colleges/      # College directory and details
│   └── compare/       # Comparison engine interface
├── components/        # Reusable React components (Auth, Layout, UI)
├── lib/               # Utility functions and Prisma client instance
└── types/             # TypeScript type definitions and interfaces
prisma/
├── schema.prisma      # Database schema definitions
└── seed.ts            # Development data population script
```

### Database Schema Preview

The primary entities in the PostgreSQL database are structured as follows:

- **`User`**: Manages authentication profiles and role-based access (`USER`, `ADMIN`).
- **`College`**: Core institution entity containing metadata (name, location, fees, streams).
- **`SavedCollege`**: Relational table mapping users to bookmarked institutions.
- **`SavedComparison`**: Serialization table storing custom comparison matrix states.

### API Overview

Backend endpoints follow standard RESTful conventions:

- `GET /api/colleges` - Retrieve paginated list of colleges (supports `search`, `stream` parameters)
- `GET /api/colleges/[slug]` - Retrieve distinct college profiles
- `POST /api/admin/colleges` - Create a new institution record (Admin only)
- `POST /api/saved` - Persist a college bookmark to a user session

---


## Local Development

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance (Docker recommended)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/PavanaLakshmiGonugunta/College-Lens.git
   cd College-Lens
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Duplicate `.env.example` to `.env` and assign valid credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/collegelens"
   NEXTAUTH_SECRET="your-super-secret-string-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Initialization**
   Apply schema migrations and seed the database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`.

### Default Environments

Development seed includes the following test accounts:
- **Admin Access**: `admin@gmail.com` / `password123`
- **Standard User**: `janeDoe@example.com` / `password123`

---

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewEndpoint`)
3. Commit your changes (`git commit -m 'feat: implement new endpoint'`)
4. Push to the branch (`git push origin feature/NewEndpoint`)
5. Open a Pull Request for review
