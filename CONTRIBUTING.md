# Contributing to SnapLine - AI-Powered Creativity and Prompts Platform

We welcome your contributions to SnapLine! By contributing to this project, you help us make it better and empower creative minds worldwide. Please take a moment to read and follow this guide to ensure a smooth contribution process.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
- [Development Guidelines](#development-guidelines)
  - [Code Structure](#code-structure)
  - [Adding Environment Variables](#adding-environment-variables)
  - [Code Comments](#code-comments)
- [Submitting Changes](#submitting-changes)
- [Contact](#contact)

## Getting Started

Before you start contributing to SnapLine, make sure you have the necessary tools and configurations in place.

### Prerequisites

- [Node.js](https://nodejs.org/) (Installed globally)
- [Docker](https://www.docker.com/) (Optional, for containerization)

### Installation

1. **Fork the repository:** Click the "Fork" button in the upper right corner of this repository's page.

2. **Clone your fork:** In your terminal, use the following command to clone your forked repository:

   ```bash
   git clone https://github.com/your-username/SnapLine.git
   ```

3. **Navigate to the project directory:**

   ```bash
   cd SnapLine
   ```

4. **Install dependencies:**

   ```bash
   yarn
   ```

### Setting Up Environment Variables

To configure SnapLine, you need to set up environment variables. We use a `.env` file to manage these variables. Follow these steps:

1. **Create a `.env` file:** In the project root directory, create a file named `.env`.

2. **Add environment variables:** Add the required environment variables to your `.env` file. Refer to the [README](README.md) for a list of environment variables and their descriptions.

3. **Add comments (important!):** When adding environment variables, it's crucial to provide comments explaining their purpose and any specific configuration details. This helps other developers understand their usage.

Here's an example of how to format your `.env` file:

```env
# MongoDB connection URL
DATABASE_URL="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority"

# Cloudinary configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"

# Public URL of the SnapLine application
NEXT_PUBLIC_URL="http://localhost:3000"

# NextAuth configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth configuration
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

```

## Development Guidelines

### Code Structure

- Follow best practices for TypeScript and React development.
- Maintain a clean and organized code structure.
- Use meaningful variable and function names.

### Adding Environment Variables

When you add new environment variables or update existing ones, make sure to:

- Include comments explaining their purpose and any configuration details.
- Update the [README](README.md) with the newly added environment variables and their descriptions.

### Code Comments

- Add comments to your code, especially for complex logic or non-obvious functionality.
- Document your functions and components with comments explaining their purpose, inputs, and outputs.

## Submitting Changes

1. **Create a new branch:** Before making changes, create a new branch with a descriptive name:

   ```bash
   git checkout -b feature-name
   ```

2. **Make your changes:** Write your code and commit your changes frequently with clear and concise commit messages.

3. **Push your changes:** Push your branch to your fork on GitHub:

   ```bash
   git push origin feature-name
   ```

4. **Create a pull request:** Go to the main SnapLine repository on GitHub and create a pull request from your forked branch. Describe your changes and provide context.

5. **Review and collaboration:** Participate in the review process, respond to feedback, and collaborate with other contributors to ensure your changes align with project goals.

## Contact

Have questions or need assistance? Reach out to us:

- GitHub: [@p7uverma](https://github.com/p7uverma)
- Email: hello@antrikshdev.tech
