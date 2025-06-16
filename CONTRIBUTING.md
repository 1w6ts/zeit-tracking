# Contributing to ZEIT

ZEIT is an open source time tracking application built with Next.js and TypeScript. We welcome contributions from the community to help make time tracking better for everyone.

## Development Setup

### Prerequisites

- Node.js 18+ or Bun
- Git

### Local Development

1. Fork and clone the repository:

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

4. Visit `http://localhost:3000` to see your changes.

## Contributing Guidelines

### Issues

Before creating a new issue:

- Search existing issues to avoid duplicates
- Use issue templates when available
- Provide clear reproduction steps for bugs
- Include relevant system information (OS, browser, Node.js version)

### Pull Requests

1. **Fork the repository** and create a feature branch from `master`
2. **Make your changes** following our coding standards
3. **Test thoroughly** - ensure your changes work locally
4. **Write clear commit messages** using conventional commits format:
   ```
   feat(ui): add responsive navigation menu
   fix(api): resolve authentication token refresh
   docs: update installation instructions
   ```
5. **Update documentation** if your changes affect public APIs
6. **Submit a pull request** with a clear description of changes

### Code Standards

- Follow existing code style and formatting
- Use TypeScript for type safety
- Write self-documenting code with clear variable names
- Add comments for complex logic
- Ensure responsive design for UI components
- Test changes across different screen sizes

### File Structure

```
src/
├── components/          # UI components
│   ├── ui/             # shadcn components
│   ├── marketing/      # Landing page components
│   └── brand/          # Branding related components
├── lib/                # Utility functions
└── styles/             # Global styles
```

### Design Principles

ZEIT follows these design principles:

- **Clean and minimal** - Remove unnecessary complexity
- **Professional appearance** - Suitable for business environments
- **Responsive first** - Mobile and desktop optimized
- **Performance focused** - Fast loading and smooth interactions

## Getting Help

- Check existing documentation and issues first
- Join discussions in GitHub Discussions
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## Recognition

Contributors are recognized in our README and release notes. We appreciate every contribution, whether it's code, documentation, bug reports, or feature suggestions.

---

By contributing to ZEIT, you agree that your contributions will be licensed under the same license as the project.
