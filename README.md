# 🛒 Intouch Gadgets E-Commerce Platform

A full-stack, modern e-commerce web application built for **Intouch Gadgets** (Bangladesh). Features a high-performance Next.js App Router frontend, a Node.js + Express backend powered by MongoDB, and an advanced **Meta Ads Full-Funnel Tracking Engine** (Meta Pixel + Conversions API / CAPI with automatic Event Deduplication).

---

## 🌟 Key Features

* **🎨 Modern Responsive UI:** Next.js 15 (App Router), Tailwind CSS, smooth micro-animations, and Gravity UI Icons.
* **📦 Dynamic E-Commerce Catalog:** Real-time featured categories, product detail pages, and dynamic search/filtering.
* **🛒 Shopping Cart & Checkout:** Seamless Cart Context state management, checked items selection, delivery fee estimation (Inside/Outside Dhaka), coupon discounts, and order placement.
* **🧾 Dynamic Thank You Page:** Custom order confirmation page fetching real-time order details from MongoDB.
* **🎯 Meta Ads Tracking (Pixel + CAPI):**
  * **Client-Side Meta Pixel:** Loads asynchronously in `RootLayout` (`PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase`).
  * **Server-Side Conversions API (CAPI):** Directly dispatches server events to Meta Graph API (`v19.0`), bypassing ad blockers and iOS 14.5+ restrictions.
  * **Event Deduplication:** Matches browser and server events using unique `event_id` keys (`orderId`, `view_{id}`, `addtocart_{timestamp}`).
  * **React StrictMode Guard:** 2-second timestamp deduplication window to prevent duplicate fires during development re-renders.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
* **Framework:** Next.js 15 (App Router)
* **UI & Styling:** React 19, Tailwind CSS, `@gravity-ui/icons`
* **State Management:** React Context (`CartContext`)
* **Meta Tracking:** Custom `fpixel` client utility with automatic CAPI proxy dispatching

### Backend (`/server`)
* **Runtime:** Node.js & Express.js
* **Database:** MongoDB Atlas (Native Driver)
* **API Architecture:** RESTful Endpoints (`/api/products`, `/api/orders`, `/api/meta-capi`)
* **Integrations:** Meta Graph API (v19.0 Conversions API)

---

## 📁 Repository Structure

```
Intouch-Gadgets-Ecom/
├── client/                     # Next.js App Router Frontend
│   ├── public/                 # Static assets & images
│   ├── src/
│   │   ├── app/                # Next.js App Router pages & layouts
│   │   │   ├── layout.js       # Root Layout + Meta Pixel Injection
│   │   │   ├── page.js         # Homepage
│   │   │   ├── product/[id]/   # Dynamic Product Details Page
│   │   │   ├── checkout/       # Checkout & Order Placement Page
│   │   │   └── thankyou/       # Order Confirmation Page
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Shopping Cart Context Provider
│   │   └── lib/                # Actions, API fetchers & Meta Pixel helper (`fpixel.js`)
│   ├── .env.local              # Client environment variables
│   └── package.json
│
├── server/                     # Node.js + Express Backend API
│   ├── controllers/            # Route controllers (products, orders)
│   ├── routes/                 # Express API endpoints
│   ├── utils/                  # Meta CAPI server utility (`metaCapi.js`)
│   ├── db.js                   # MongoDB connection client
│   ├── index.js                # Express app entrypoint & /api/meta-capi route
│   ├── .env                    # Server environment variables
│   └── package.json
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v18.x or higher
* **npm:** v9.x or higher
* **MongoDB:** Active MongoDB Atlas URI or local instance

---

### 1. Environment Setup

#### Client Configuration (`client/.env.local`)
Create a `.env.local` file inside the `client` directory:
```env
NEXT_PUBLIC_META_PIXEL_ID=28506982922219919
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### Server Configuration (`server/.env`)
Create a `.env` file inside the `server` directory:
```env
PORT=8080
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
META_PIXEL_ID=28506982922219919
META_CAPI_ACCESS_TOKEN=your_meta_capi_access_token
# Optional: Set for live testing in Meta Events Manager -> Test Events Tab
# META_TEST_EVENT_CODE=TEST12345
```

---

### 2. Installation & Running Locally

#### Terminal 1: Backend Server
```bash
cd server
npm install
npm run dev
# Server will run at http://localhost:8080
```

#### Terminal 2: Frontend Client
```bash
cd client
npm install
npm run dev
# Client will run at http://localhost:3000
```

---

## 📊 Meta Tracking Architecture (Pixel + CAPI)

The application implements a **Full-Funnel Dual-Dispatch System**:

| Event Name | Browser Pixel Trigger | Server CAPI Trigger | Deduplication `event_id` |
|---|---|---|---|
| **`PageView`** | Root `layout.js` on every page load | N/A | Default URL timestamp |
| **`ViewContent`** | Product detail page load (`ProductDetails.jsx`) | `getProductById` in `productsController.js` | `view_{productId}` |
| **`AddToCart`** | Clicking "Add to Order" / "Buy Now" | `/api/meta-capi` proxy route | `addtocart_{timestamp}_{hash}` |
| **`InitiateCheckout`** | Navigating to `/checkout` page | `/api/meta-capi` proxy route | `initiatecheckout_{timestamp}_{hash}` |
| **`Purchase`** | Submitting checkout form | `createOrder` in `ordersController.js` | Custom `orderId` (e.g. `IT-482910`) |

---

## 🧪 Testing & Verification

### 1. Real-Time Terminal Logs
When users navigate product pages or complete orders, the Express backend logs CAPI dispatches:
```text
[CAPI Server Dispatch] Event: ViewContent | EventID: view_6a75c504... | Status: ✅ Success
[CAPI Server Dispatch] Event: AddToCart | EventID: addtocart_17232... | Status: ✅ Success
[CAPI Server Dispatch] Event: InitiateCheckout | EventID: initiatecheckout_17232... | Status: ✅ Success
[CAPI Server Dispatch] Event: Purchase | EventID: IT-482910 | Status: ✅ Success
```

### 2. Browser Verification (Meta Pixel Helper)
Install the **Meta Pixel Helper** Chrome extension. Visit `http://localhost:3000` to verify green checkmarks for `PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`, and `Purchase`.

### 3. Meta Events Manager Test Tool
1. Go to [Meta Events Manager](https://eventsmanager.facebook.com/).
2. Select Pixel ID `28506982922219919`.
3. Open the **Test Events** tab to monitor live Browser and Server event streams with deduplication badges.

---

## 📄 License
This project is proprietary and maintained for **Intouch Gadgets**.
