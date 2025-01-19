# Google Calendar Events Viewer

A modern web application built with Next.js that allows users to view and filter their Google Calendar events. The application features Google SSO authentication and provides an intuitive interface for managing calendar events.

## Features

- 🔐 Google Single Sign-On (SSO) Authentication
- 📅 Display Google Calendar Events
- 🔍 Filter events by date using calendar or date input

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   git clone https://github.com/yourusername/google-calendar-events.git
   cd google-calendar-events

2. Install dependencies:
   npm install

3. Set up your Google OAuth credentials:

   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google Calendar API
   - Configure the OAuth consent screen
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URIs:
     - For development: http://localhost:3000/api/auth/callback/google
     - For production: https://your-domain.com/api/auth/callback/google

4. Create a `.env.local` file in the root directory:
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000

5. Run the development server:
   npm run dev

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Import your project to Vercel:

   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Click "Import"

3. Configure environment variables in Vercel:

   - Add all required environment variables
   - Update NEXTAUTH_URL to your production URL
   - Update Google OAuth credentials with production URLs

4. Deploy the application:
   - Vercel will automatically build and deploy your application
   - Your application will be available at your Vercel URL

### Post-Deployment Setup

1. Add your production domain to Google OAuth credentials:

   - Go back to Google Cloud Console
   - Add your production domain to authorized JavaScript origins
   - Add your production OAuth callback URL

2. Configure test users:
   - In Google Cloud Console, go to OAuth consent screen
   - Add test users' email addresses

### Key Components

- `app/page.tsx`: Main page component
- `components/calendar-events.tsx`: Calendar events display and filtering
- `components/header.tsx`: Application header with authentication status
- `app/api/auth/[...nextauth]/route.ts`: NextAuth.js configuration
