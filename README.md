# SwiftBox | High-Fidelity IoT Logistics

SwiftBox is a production-grade, IoT-enabled smart locker ecosystem designed to solve the "Attendance Problem" in institutional and campus logistics. By integrating **ESP32 hardware**, **Firebase Real-time Data**, and a high-fidelity **React interface**, SwiftBox allows for secure, asynchronous parcel exchange through a "Drop and Go" protocol.

## 🏗️ Core Ecosystem

- **IoT Node Management**: Real-time monitoring of battery levels, connectivity, and hardware temperature for all decentralized locker nodes.
- **Secure Parcel Tracking**: End-to-end telemetry for tracking IDs with live status updates and automated verification.
- **Admin Command Center**: A professional suite for managing logistics, infrastructure, financials, and team authorization.
- **Editorial Hub**: An integrated newsroom for official system transmissions and technical updates.

## 🛠️ Technical Stack

- **Frontend**: React 18 + Vite (High-Performance HMR)
- **Styling**: Vanilla CSS + Tailwind Core (Standardized Utilities)
- **Database**: Firebase Real-time DB (Low-Latency Synchronization)
- **Animations**: Framer Motion (System Immersion Transitions)
- **Hardware**: ESP32 Nodes with 12V Solenoid Locking Systems
- **Icons**: Lucide React (Technical Symbolism)

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and populate it with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_DATABASE_URL=your_db_url
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Local Development
Run the high-speed development server:
```bash
npm run dev
```

## 🔐 Administrative Access

The **SwiftBox Terminal** (Admin Dashboard) is secured via encrypted session tokens. Authorization requires a verified project key.

- Navigate to `/admin` to access the login gateway.
- Authorized team members can manage the **Infrastructure**, **Financials**, and **News** archive.
- System logs and telemetry are synchronized in real-time with the physical ESP32 nodes.

## 🌐 Deployment

The web portal is optimized for production deployment on **Vercel** or **Netlify**.

```bash
npm run build
```

---
**Developed for Pagadian Capitol College Institutional Logistics.**
*High-Fidelity Engineering by SwiftBox Team.*
