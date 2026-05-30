# Aydence Booking Platform

This is the booking and landing page platform for **Aydence**, built with [Next.js](https://nextjs.org/) and Prisma. 

## 🚀 Getting Started Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   This project uses a local **SQLite** database (`dev.db`) to keep costs at zero.
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠 Developer Cheat Sheet: How to Make Changes

If you want to edit the website, here is exactly where you need to go:

### 1. Changing the Design & Global Layouts
* **Change the Logo or Menu Links:** Open `app/components/Navbar.tsx`.
* **Change Footer Links or Text:** Open `app/components/Footer.tsx`.
* **Change Global Colors, Fonts, or Backgrounds:** Open `app/globals.css`. Look for the CSS variables (like `--c-accent-primary`) at the top of the file to tweak the main brand colors.
* **Add a new script (like Google Analytics) to every page:** Open `app/layout.tsx`.

### 2. Editing the Main Home Page (`/`)
Open `app/page.tsx` first. To change text/images, edit the specific components:
* **The top banner (Hero):** Edit `app/components/HomeHero.tsx`
* **The "About the Doctor" section:** Edit `app/components/AboutDrShoba.tsx`
* **The list of upcoming course batches:** Edit `app/components/UpcomingBatches.tsx`
* **The floating WhatsApp button:** Edit `app/components/WhatsAppButton.tsx`

### 3. Editing the "Advanced German" Page (`/advanced-german`)
Open `app/advanced-german/page.tsx`. To edit the actual content, open these files in `app/components/`:
* **The main headline/video:** `HeroSection.tsx`
* **The "How It Works" steps:** `HowItWorks.tsx`
* **The course pricing tables:** `PricingSection.tsx`
* **The "Who is this for?" section:** `WhoIsThisFor.tsx`

### 4. Changing Courses & Pricing (Razorpay)
* **To change Course Names, Descriptions, or Prices (INR):** Open `app/payment/page.tsx`. Right at the top, there is an array called `COURSES`. Edit the details there.
* **To change the Razorpay API Key:** Open `app/payment/page.tsx` and scroll down to the `handlePay()` function. Replace `key: 'rzp_test_YourKeyHere'` with your live key.

### 5. Modifying the Booking System
* **To change the Booking UI (Calendar):** Open `app/components/BookingCalendar.tsx`.
* **To add new fields to the Booking Form (like 'Company Name'):** 
  1. Add the input field in `app/components/CheckoutForm.tsx`.
  2. Update the backend rules in `app/lib/validation.ts`.
* **To view submitted bookings:** Go to the `/admin` URL in your browser.

### 6. Editing Automated Emails & Calendar Invites
* **To change the text inside the Confirmation Email:** Open `app/lib/email.ts`. 
* **To change the Google Calendar Event details:** Open `app/api/bookings/route.ts` and `app/lib/calendar.ts`.

### 7. Changing the Database Schema
Because you are using Prisma, any changes to tables must be done in your `prisma/schema.prisma` file. After editing the schema, run:
```bash
npx prisma db push
```
