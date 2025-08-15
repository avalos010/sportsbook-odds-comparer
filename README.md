# 🏈 Sportsbook Odds Comparer

A modern, responsive web application for comparing sports betting odds across different sportsbooks. Built with cutting-edge technologies and comprehensive testing.

[![Live Site](https://img.shields.io/badge/Live%20Site-View%20App-blue?style=for-the-badge)](https://sportsbook-odds-comparer.vercel.app/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-green?style=for-the-badge)](https://github.com/features/actions)
[![Testing](https://img.shields.io/badge/Testing-Cypress%20E2E-orange?style=for-the-badge)](https://www.cypress.io/)

## ✨ Features

### 🎯 Core Functionality

- **Multi-Sport Support**: NBA, NFL, NHL, MLB, MMA, and more
- **Odds Comparison**: View and compare odds across multiple sportsbooks
- **Betting Markets**: Moneyline, Spread, Points, and Player Props
- **Real-time Data**: Live odds updates from sportsbook APIs

### 🎮 Player Props (Advanced Feature)

- **Dynamic Market Selection**: Choose from various player prop markets
- **Real-time Odds**: Live player prop odds from multiple bookmakers
- **Interactive UI**: Modern combobox interface for easy navigation
- **Comprehensive Coverage**: Batter hits, passing yards, and more

### 🧭 Navigation & UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes for user preference
- **Intuitive Navigation**: Easy switching between sports and markets
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### State Management & Data

- **SWR** - Data fetching and caching
- **UUID** - Unique identifier generation
- **Class Variance Authority** - Component variant management

### Testing & Quality

- **Cypress 14** - End-to-end testing
- **ESLint** - Code quality and consistency
- **TypeScript** - Static type checking

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🧪 Testing

### E2E Tests with Cypress

Comprehensive test coverage including:

```typescript
// Example test structure
describe("Sportsbook Odds", () => {
  it("loads and displays odds", () => {
    cy.visit("/");
    cy.get('[data-cy="odds-ml-item"]').should("be.visible");
  });

  it("navigates between sports correctly", () => {
    // Navigation tests
  });
});

describe("Player Props", () => {
  it("displays player props for selected markets", () => {
    // Player props functionality tests
  });
});
```

### Test Coverage

- ✅ **Page Loading**: Homepage and odds pages
- ✅ **Navigation**: Sport switching and market navigation
- ✅ **Player Props**: Market selection and data display
- ✅ **Responsive Design**: Mobile and desktop interactions
- ✅ **Data Integration**: API responses and error handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sportsbook-odds-comparer.git
cd sportsbook-odds-comparer

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Cypress tests
pnpm cypress:open # Open Cypress test runner
```

## 🏗️ Project Structure

```
sportsbook-odds-comparer/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── odds/           # Odds comparison pages
│   │   │   ├── [sport]/    # Dynamic sport routes
│   │   │   └── playerProps/ # Player props functionality
│   │   └── layout.tsx      # Root layout
│   ├── components/          # Reusable components
│   │   ├── ui/             # Base UI components
│   │   ├── OddsTable.tsx   # Main odds display
│   │   ├── PlayerProp.tsx  # Player props component
│   │   └── ThemeToggle.tsx # Theme switching
│   └── lib/                # Utilities and API
├── cypress/                 # E2E testing
├── public/                  # Static assets
└── .github/workflows/       # CI/CD pipelines
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

- **Automated Testing**: Runs Cypress tests on every deployment
- **Quality Checks**: ESLint and TypeScript validation
- **Deployment Integration**: Tests against live deployed applications
- **Smart Caching**: Optimized dependency and build caching

### Workflow Features

- **Event-Driven**: Triggers on successful deployments
- **E2E Testing**: Comprehensive testing against live applications
- **Fail-Fast**: Immediate feedback on deployment issues
- **Resource Efficient**: Optimized for speed and cost

## 🌟 What's Next

### Planned Features

- **Personal Betting Tracker**: Track your bets and performance
- **Daily Picks**: Curated betting recommendations
- **Sports Bettor Profiles**: Featured handicapper picks
- **Advanced Analytics**: Betting performance insights
- **Mobile App**: Native mobile experience

### Technical Improvements

- **Performance Optimization**: Core Web Vitals improvements
- **SEO Enhancement**: Better search engine optimization
- **PWA Features**: Progressive web app capabilities
- **Real-time Updates**: WebSocket integration for live odds

## 🤝 Contributing

This is a personal project, but contributions are welcome!

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Maintain accessibility standards
- Use conventional commit messages

## 📱 Live Demo

**Visit the live application**: [https://sportsbook-odds-comparer.vercel.app/](https://sportsbook-odds-comparer.vercel.app/)

## 📄 License

This project is for personal use and educational purposes.

---

**Built with ❤️ using Next.js, React, and modern web technologies**
