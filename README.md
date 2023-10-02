# SnapLine - AI-Powered Creativity and Prompts Platform

![SnapLine Logo](/screenshots/2.png)

Welcome to **SnapLine**, an innovative platform that leverages AI to ignite creativity through thought-provoking prompts. Whether you're a writer, artist, or enthusiast looking for inspiration, SnapLine is designed to spark your imagination and fuel your creative journey.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Environment Variables](#environment-variables)

## Features

- Access a diverse range of AI-generated prompts for various creative domains.
- Explore categories such as writing, art, music, and more.
- Create an account to save and share your favorite prompts.
- Collaborate with AI to generate unique and innovative content.
- Engage with a dynamic community of creative minds.

## Getting Started

These instructions will guide you through setting up and running the SnapLine project locally for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (Installed globally)
- [Docker](https://www.docker.com/) (Optional, for containerization)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/codebyps/SnapLine.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd SnapLine
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

### Usage

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the application in your web browser:**

   ```
   http://localhost:3000
   ```

### Technologies Used

SnapLine is built using a modern technology stack:

- Next.js 13
- MongoDB
- Prisma
- Docker (for containerization)
- Shadcn UI
- React
- Node.js
- TypeScript

## Contributing

We welcome and appreciate contributions from the community! Here's how you can contribute:

1. **Fork the repository.**

2. **Create a new branch:**

   ```bash
   git checkout -b feature-name
   ```

3. **Make your changes and commit them:**

   ```bash
   git commit -m "Add new feature"
   ```

4. **Push your changes to the branch:**

   ```bash
   git push origin feature-name
   ```

5. **Create a pull request on GitHub.**

   We'll review your changes and merge them if they align with our project goals.

6. **Join the discussion:**

   Participate in discussions, share your ideas, and help us improve SnapLine together.

7. **Report issues:**

   If you encounter bugs or have suggestions, please open an issue on our GitHub repository.

## Environment Variables

To configure SnapLine, you need to set up the following environment variables. You can create a `.env` file in the project root and add these variables with your values:

```env
DATABASE_URL=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
NEXT_PUBLIC_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

Please make sure to replace the values with your actual configuration.

## Contact

Have questions or feedback? Reach out to us:

- GitHub: [@p7uverma](https://github.com/p7uverma)
- Email: hello@antrikshdev.tech

## License

This project is now open-source and is released under the [MIT License](LICENSE).
