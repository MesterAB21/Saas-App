This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the `.env.example` file to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Then update the following environment variables in `.env.local`:

- **Clerk Authentication**: Get your keys from [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys)
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - **Required** for authentication
  - `CLERK_SECRET_KEY` - **Required** for server-side authentication

- **Supabase Database**: Get your keys from [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/api)
  - `NEXT_PUBLIC_SUPABASE_URL` - **Required** for database connection
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - **Required** for database authentication

- **Vapi AI**: Get your token from [Vapi.ai](https://vapi.ai)
  - `NEXT_PUBLIC_VAPI_WEB_TOKEN` - **Required** for voice API

> **Note**: All environment variables are required. You must replace the placeholder values with actual API keys from each service for the application to build and run properly.

### 3. Run the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Adding Environment Variables to Vercel

**Important**: You must add the environment variables to your Vercel deployment for the app to build and run correctly.

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add each environment variable from your `.env.example` file:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - `NEXT_PUBLIC_VAPI_WEB_TOKEN`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (optional)
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (optional)
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` (optional)
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` (optional)
4. Select which environments to apply them to (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application for the changes to take effect

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
