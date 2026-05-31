# Contributing to We Love Photos

Thanks for your interest in contributing to **We Love Photos**! Whether it's a bug fix, a feature idea, a UI/UX improvement, or a typo — every contribution matters.

## Code of Conduct

- Be respectful and constructive in all interactions
- Provide clear, helpful feedback
- Use inclusive language
- Focus on what is best for the community

## How You Can Contribute

### 🐛 Bug Fixes

Found a bug? Open an issue with a clear description and steps to reproduce. If you already have a fix, feel free to submit a pull request — just reference the issue.

### 💡 Feature / Code / UI-UX Suggestions

Have an idea? Open an issue first, describe your proposal clearly, and mention `@agilworld` to notify the maintainer. Please wait for approval before implementing — this avoids duplicate work and ensures alignment with the project's direction.

## Getting Started (Quick Setup)

1. Fork the repo via the **Fork** button
2. Clone your fork locally
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b dev/your-branch`
5. Make changes
6. Ensure lint passes: `pnpm lint`
7. Push to your fork and open a Pull Request

## Development Workflow

- **Branch naming**: `dev/<short-description>` or `fix/<short-description>`
- **Commit style**: Keep messages concise and descriptive
- **Pre-commit hook**: Husky runs ESLint automatically on commit
- **PR requirement**: Lint must pass before merging

## Pull Request Guidelines

- Reference related issues (e.g., "Closes #12")
- Describe what changed and why
- For UI changes, include screenshots or recordings
- Keep PRs focused — one feature or fix per PR
- Run `pnpm lint` locally before pushing (the pre-commit hook does this too, but clean code reviews faster)

## Reporting Issues

### Bug Reports

Use GitHub Issues with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, pnpm version, etc.)

### Feature Requests

- Describe your idea clearly and concisely
- Explain the use case and value
- Mention `@agilworld` to notify the maintainer
- Wait for approval before implementing

## Need Help?

- Check existing [Issues](../../issues) for similar discussions
- Mention `@agilworld` in issues or PRs to get direct attention
- Review the codebase for patterns and conventions

---

Thanks for making We Love Photos better! 🚀