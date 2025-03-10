# GitHub Repositories Explorer

## Overview

GitHub Repositories Explorer is a React application that allows users to search for GitHub users by their username and view their repositories. The app is built with modern technologies to ensure a fast and responsive experience.

## Features

- Search for GitHub users by username (up to 5 results).
- Click on a user to display their public repositories.
- Responsive design with a user-friendly interface.
- Error handling and loading states for a smooth experience.

## Tech Stack

- **Vite** - Fast and modern development setup.
- **React.js** - UI framework.
- **TypeScript** - Strongly typed JavaScript.
- **Tailwind CSS** - Utility-first styling.
- **React Query** - Efficient data fetching and caching.
- **ShadCN** - UI components.
- **GitHub API** - Fetching user and repository data.

## Installation

### Prerequisites

Ensure you have **pnpm** installed globally:

```sh
npm install -g pnpm
```

### Clone the Repository

```sh
git clone https://github.com/ridhosatriawan/github-repository-explorer.git
cd github-repository-explorer
```

### Install Dependencies

```sh
pnpm install
```

### Start the Development Server

```sh
pnpm dev
```

## Deployment

The application is deployed and accessible at:
🔗 [Live Demo](https://github-repository-explorer.satriawans.xyz/)

## Usage

1. Enter a GitHub username in the search bar.
2. Select a user from the list.
3. View the user's public repositories.

## API Reference

This project uses the **GitHub REST API v3** :

- **Search users** : `GET https://api.github.com/search/users?q={query}&per_page=5`
- **Get repositories** : `GET https://api.github.com/users/{username}/repos`

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is open-source and available under the [MIT License](https://chatgpt.com/c/LICENSE).

---

**Author:** Ridho Satriawan

📧 Contact: ridho[@satriawans.xyz](mailto:your.email@example.com)
