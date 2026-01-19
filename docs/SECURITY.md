# Security Policy

## The "Secret Case" Strategy
Pluxo uses a multi-layered security approach to protect intellectual property and user data:
- **Sensitive Logic Isolation**: All core prediction engines and administrative validations reside exclusively on the server side (`/backend`).
- **Secret Management**: API keys, database credentials, and signing secrets are never stored in the repository. They are managed via environment variables.
- **Client-Side Sanitization**: The frontend (`/frontend`) acts as a pure presentation layer. It contains no sensitive logic or hardcoded secrets.

## Reporting a Vulnerability
If you discover a security vulnerability, please report it privately. Do not open a public issue.
- **Email**: security@pluxo.com
- **Response Time**: We aim to acknowledge reports within 48 hours.

## Prohibited Actions
- Publicly disclosing vulnerabilities before they are patched.
- Attempting to exploit vulnerabilities on production systems.
- Reverse engineering the backend prediction models.

## Environment Setup
Any contributor must create a `.env.local` file based on `.env.example` in their local development environment.
