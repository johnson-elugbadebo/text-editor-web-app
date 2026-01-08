# Text Editor Web

A collaborative, real-time text editor built with React and Convex, featuring rich text editing capabilities, document management, and multi-user collaboration.

## 📁 Folder Structure

```
text-editor-web/
├── client/                          # Frontend application
│   ├── convex/                      # Convex backend functions (co-located with frontend)
│   │   ├── _generated/              # Auto-generated Convex types
│   │   ├── auth.config.ts           # Authentication configuration
│   │   ├── documents.ts             # Document queries and mutations
│   │   ├── http.ts                  # HTTP routes configuration
│   │   ├── liveblocks.ts            # Liveblocks authentication handler
│   │   └── schema.ts                # Database schema definitions
│   ├── public/                      # Static assets
│   │   └── *.svg                    # Document templates and logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/                # Authentication components
│   │   │   ├── Editor/              # Editor-related components
│   │   │   │   ├── Editor.tsx       # Main editor component
│   │   │   │   ├── Toolbar.tsx      # Editor toolbar
│   │   │   │   ├── Ruler.tsx        # Document ruler
│   │   │   │   ├── Threads.tsx      # Collaboration threads
│   │   │   │   ├── LiveBlocksWrapper.tsx  # Liveblocks provider
│   │   │   │   └── *Button.tsx      # Toolbar button components
│   │   │   ├── Home/                # Home page components
│   │   │   │   ├── DocumentsTable.tsx  # Document list view
│   │   │   │   ├── TemplateGallery.tsx # Document templates
│   │   │   │   └── *Dialog.tsx      # Action dialogs
│   │   │   └── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── constants/               # Application constants
│   │   ├── extensions/              # TipTap editor extensions
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility libraries
│   │   ├── pages/                   # Page components
│   │   ├── store/                   # Zustand state management
│   │   ├── utils/                   # Helper functions and types
│   │   ├── App.tsx                  # Root application component
│   │   └── main.tsx                 # Application entry point
│   ├── index.html                   # HTML template
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   └── package.json                 # Frontend dependencies
├── server/                          # Empty Folder (using Convex instead of traditional backend for now)
│   └── README.md                    # Note about using Convex instead
└── package.json                     # Root workspace configuration
```

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **TipTap** - Rich text editor framework
- **Liveblocks** - Real-time collaboration
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend

- **Convex** - Backend-as-a-Service (BaaS)
  - Database (serverless)
  - Real-time queries and mutations
  - Authentication integration
  - HTTP actions for custom endpoints
  - File storage

> **Note:** The `server/` folder is currently empty as the app uses Convex for all backend functionality. Convex provides a complete backend solution including database, authentication, real-time subscriptions, and serverless functions.

### Authentication

- **Clerk** - User authentication and management
- Integrated with Convex via JWT tokens

## 🔧 Toolchain

### Build Tools

- **Vite 7** - Fast build tool and dev server
- **TypeScript 5.9** - Static type checking
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

### Package Management

- **Yarn 4** - Fast, reliable package manager
- **Volta** - Node.js version manager (Node 22.20.0)

### Styling

- **TailwindCSS 4** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **class-variance-authority** - Component variant management
- **clsx** / **tailwind-merge** - Conditional class utilities

### Development

- **React DevTools** - React debugging
- **TypeScript Language Server** - IDE integration
- **Hot Module Replacement (HMR)** - Fast refresh during development

## 🔌 VS Code / Cursor Setup

### Recommended Extensions

This project includes a curated list of recommended VS Code extensions to enhance your development experience. Please see `.vscode/extensions.json` for the complete list of recommended extensions.

When you open this project, VS Code will prompt you to install the recommended extensions. You can also view them by:

1. Opening the Extensions view (`Ctrl+Shift+X`)
2. Typing `@recommended` in the search box
3. Installing from the "Workspace Recommendations" section

### Workspace Settings

The project includes comprehensive workspace settings optimized for this tech stack. Please see `.vscode/settings.json` for the complete configuration.

**Key configurations include:**

- **Editor Settings** - Auto-formatting, bracket colorization, font ligatures
- **TypeScript/JavaScript** - Inlay hints, auto-imports, module resolution
- **Prettier** - Consistent code formatting (130 char line width, JSX single quotes)
- **ESLint** - Automatic linting and fixing on save
- **Yarn PnP** - Proper TypeScript SDK and search exclusions
- **Extension Configurations** - Pre-configured settings for Error Lens, Better Comments, and more

## 🚀 Getting Started

### Prerequisites

- Node.js 22.20.0 (managed via Volta)
- Yarn 4.10.3

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd text-editor-web
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the `client/` directory:

```env
VITE_CONVEX_URL=<your-convex-url>
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-key>
```

4. Start the development server:

```bash
cd client
yarn dev
```

5. Start Convex (in a separate terminal):

```bash
cd client
npx convex dev
```

The application will be available at `http://localhost:5173`

## 📝 Features

- **Rich Text Editing** - Full-featured text editor with formatting options
- **Real-time Collaboration** - Multiple users can edit simultaneously
- **Document Management** - Create, rename, delete, and organize documents
- **Template Gallery** - Pre-built document templates
- **Authentication** - Secure user authentication via Clerk
- **Organization Support** - Multi-tenant document sharing
- **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Architecture

This application uses a modern, serverless architecture:

- **Frontend**: React SPA served via Vite
- **Backend**: Convex handles all server-side logic
- **Database**: Convex's built-in database
- **Real-time**: Liveblocks for collaborative editing
- **Auth**: Clerk for user management, integrated with Convex

## 📦 Key Dependencies

| Package              | Purpose                    |
| -------------------- | -------------------------- |
| `@tiptap/*`          | Rich text editor framework |
| `@liveblocks/*`      | Real-time collaboration    |
| `@clerk/clerk-react` | Authentication             |
| `convex`             | Backend-as-a-Service       |
| `react-router-dom`   | Client-side routing        |
| `zustand`            | State management           |
| `@radix-ui/*`        | Accessible UI primitives   |
| `lucide-react`       | Icons                      |

## 📄 License

Copyright (c) 2025 Johnson Elugbadebo. All rights reserved.

This is proprietary software. See the [LICENSE](LICENSE) file for details.

## 👥 Contributors

Johnson Elugbadebo
