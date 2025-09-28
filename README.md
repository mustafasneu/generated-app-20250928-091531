# Wrangler Forge

An elegant, interactive cheatsheet and command builder for the Cloudflare Wrangler CLI.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mustafasneu/generated-app-20250928-091531)

Wrangler Forge is a single-page web application designed to be an interactive cheatsheet and command builder for the Cloudflare Wrangler CLI. It provides developers with a streamlined, visually appealing interface to quickly find, construct, and copy complex Wrangler commands, eliminating the need to constantly refer to documentation.

The application features a minimalist design aesthetic with a focus on clarity, usability, and visual polish. The core interface is split into three main parts: a searchable list of Wrangler commands, a dynamic form builder that presents options for the selected command, and a real-time output display that shows the fully constructed command string, ready to be copied.

## Key Features

-   **Interactive Command List**: Quickly search and filter through a comprehensive list of Wrangler commands.
-   **Dynamic Form Builder**: Selecting a command instantly generates a user-friendly form to configure its arguments and flags.
-   **Real-Time Output**: See the command string build in real-time as you fill out the form.
-   **One-Click Copy**: Copy the complete, syntactically correct command to your clipboard with a single click.
-   **Minimalist & Responsive UI**: A clean, modern, and fully responsive interface that looks great on any device.
-   **Client-Side Logic**: Fast and seamless experience with no backend communication required.

## Technology Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/wrangler-forge.git
    cd wrangler-forge
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Run the development server:**
    ```sh
    bun dev
    ```

The application should now be running on `http://localhost:3000`.

## Usage

1.  **Find a Command**: Use the search bar or scroll through the list on the left to find the Wrangler command you need.
2.  **Select a Command**: Click on a command to load its details and configuration options in the main panel.
3.  **Configure Options**: Fill in the required arguments and toggle any optional flags. The command output at the bottom will update in real-time.
4.  **Copy Command**: Once the command is constructed, click the "Copy" button to copy it to your clipboard. A notification will confirm the action.
5.  **Paste and Run**: Paste the command into your terminal and execute it.

## Development

This project is built with Vite for a fast and efficient development experience.

### Project Structure

-   `src/pages/HomePage.tsx`: The main component that orchestrates the entire application layout and state.
-   `src/lib/wrangler-commands.ts`: Contains the static data definitions for all supported Wrangler commands, their arguments, and flags.
-   `src/components/CommandOutput.tsx`: The reusable component for displaying the formatted, copyable command string.
-   `src/components/ui/`: Contains all the `shadcn/ui` components used in the project.

### Available Scripts

-   `bun dev`: Starts the development server with hot-reloading.
-   `bun build`: Builds the application for production.
-   `bun lint`: Lints the codebase using ESLint.
-   `bun deploy`: Builds the project and deploys it to Cloudflare Pages.

## Deployment

This application is optimized for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

### Deploy with Wrangler CLI

1.  **Login to Wrangler:**
    ```sh
    npx wrangler login
    ```

2.  **Run the deploy script:**
    ```sh
    bun run deploy
    ```

Wrangler will build the application and deploy it. You will be provided with a unique URL for your deployment.

### Deploy with a Git Push

Alternatively, you can connect your Git repository (GitHub, GitLab) to Cloudflare Pages for automatic deployments on every push.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mustafasneu/generated-app-20250928-091531)

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add more commands, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.