<p align="center">
  <picture>
    <source srcset="public/zeit.svg" media="(prefers-color-scheme: dark)">
    <img src="public/zeit.svg" alt="ZEIT Logo" width="64" />
  </picture>
</p>

<h1 align="center">ZEIT</h1>
<p align="center">Open source time tracking for modern teams</p>

<p align="center">
  <a href="https://github.com/zeitgg/zeit/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://github.com/zeitgg/zeit/stargazers"><img src="https://img.shields.io/github/stars/zeitgg/zeit" alt="GitHub stars"></a>
  <a href="https://github.com/zeitgg/zeit/network/members"><img src="https://img.shields.io/github/forks/zeitgg/zeit" alt="GitHub forks"></a>
</p>

---

ZEIT is a privacy-compliant employee time tracking platform built with Next.js and TypeScript. Designed for modern teams who need accurate time tracking without complexity.

## Features

### 🔒 **Compliance & Privacy**

- Fully compliant with § 16 ArbZG (German Working Time Act)
- GDPR-compliant by design with data protection built-in
- Audit-ready exports for legal documentation

### ⏱️ **Smart Time Tracking**

- One-click start/stop tracking with automatic detection
- Manual time entries with approval workflows
- Real-time synchronization across all devices

### 📊 **Analytics & Insights**

- Detailed productivity reports and analytics
- PDF and CSV exports for HR and payroll
- Team performance dashboards

### 👥 **Team Management**

- Role-based access control and departments
- Manager dashboards with team overview
- Approval workflows for time entries

### 🌐 **Cross-Platform**

- Web application with responsive design
- Desktop and mobile support
- Offline capabilities with sync

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React, React Icons
- **Build Tool**: Bun
- **Deployment**: Vercel-ready

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zeitgg/zeit.git
   cd zeit
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # UI components
│   ├── ui/             # shadcn components
│   ├── marketing/      # Landing page components
│   └── brand/          # Branding components
├── lib/                # Utility functions
└── styles/             # Global styles
```

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our development process and how to submit pull requests.

### Development Commands

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun type-check` - Run TypeScript checks

## Legal Compliance

ZEIT is built with legal compliance in mind:

- **German Working Time Act (§ 16 ArbZG)** compliance for German companies
- **GDPR** compliance with privacy by design
- **Audit trails** for all time tracking activities
- **Data export** capabilities for legal requirements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/zeitgg/zeit/wiki)
- 🐛 [Issue Tracker](https://github.com/zeitgg/zeit/issues)
- 💬 [Discussions](https://github.com/zeitgg/zeit/discussions)
- 🐦 [Twitter](https://x.com/zeitdotgg)

---

<p align="center">
  Made with ❤️ by the ZEIT team and contributors
</p>
