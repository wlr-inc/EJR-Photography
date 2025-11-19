# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Emma Ratkowski Photography

A modern, responsive photography portfolio and contact website built with React, TypeScript, Tailwind CSS, and Firebase.

## About

Professional photography website for Emma Ratkowski, specializing in:

- Portrait Photography
- Lifestyle Photography
- Event Photography
- Nature Photography

## Features

- **Responsive Design**: Beautiful, mobile-first design using Tailwind CSS
- **Portfolio Management**: Admin panel for uploading and managing photos
- **Firebase Integration**: Authentication and cloud storage for photos
- **Static Site Generation**: Optimized for performance and SEO
- **Contact Form**: Professional contact form for client inquiries
- **Modern Animations**: Smooth animations using Framer Motion

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd photoz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Set up Firebase Storage
   - Get your Firebase configuration

4. Configure Firebase:

   - Open `src/lib/firebase.ts`
   - Replace the placeholder config with your actual Firebase configuration:

   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id",
   };
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:5173 in your browser

### Firebase Setup

1. **Authentication**:

   - Go to Firebase Console > Authentication > Sign-in method
   - Enable "Email/Password" sign-in method
   - Add your admin email in the Users tab

2. **Firestore Database**:

   - Go to Firebase Console > Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

3. **Storage**:
   - Go to Firebase Console > Storage
   - Set up storage bucket
   - Configure security rules

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to photos
    match /photos/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Usage

### Admin Panel

1. Navigate to `/login`
2. Sign in with your admin credentials
3. Access the admin panel at `/admin`
4. Upload and manage your photos

### Customization

1. **Branding**: Update the site name and contact information in:

   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`
   - `src/pages/Contact.tsx`

2. **Colors**: Modify the color scheme in `tailwind.config.js`

3. **Content**: Update the text content in the page components

4. **Photography Categories**: Modify categories in:
   - `src/pages/Portfolio.tsx`
   - `src/pages/Admin.tsx`

## Building for Production

1. Build the project:

   ```bash
   npm run build
   ```

2. Preview the build:

   ```bash
   npm run preview
   ```

3. Deploy to your hosting platform (Netlify, Vercel, Firebase Hosting, etc.)

## Deployment

### Firebase Hosting

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Initialize hosting:

   ```bash
   firebase init hosting
   ```

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

### Other Platforms

- **Netlify**: Connect your GitHub repo and deploy automatically
- **Vercel**: Import your project and deploy with zero configuration
- **GitHub Pages**: Use GitHub Actions for automated deployment

## Folder Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Layout.tsx
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── lib/               # Utility libraries
│   └── firebase.ts
├── pages/             # Page components
│   ├── Home.tsx
│   ├── Portfolio.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   └── Admin.tsx
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Features to Add

- [ ] Image optimization and lazy loading
- [ ] Photo categories and filtering
- [ ] Client galleries with password protection
- [ ] SEO optimization with metadata
- [ ] Blog/news section
- [ ] Social media integration
- [ ] Email notifications for contact form
- [ ] Advanced photo editing tools
- [ ] Booking calendar integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact [your-email@example.com]

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
