# RYT Payment Assessment

---

## 🚀 Setup Instructions

Follow these steps to get the app up and running on your machine:

1. **Switch to the `main` branch**

   ```bash
   git checkout main
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the Android app**

   ```bash
   pnpm android
   ```

4. **Run the iOS app**
   ```bash
   pnpm ios
   ```

---

## 🔑 Demo Accounts

You can log in using any of the mock users below. Feel free to perform transfers between users during your testing.

| Username   | Password      | Balance | Full Name      |
| ---------- | ------------- | ------- | -------------- |
| user001    | 12345678      | 1000    | Test User      |
| john_doe   | password123   | 1500    | John Doe       |
| jane_smith | securePass456 | 2700    | Jane Smith     |
| robert_j   | robert2023    | 950     | Robert Johnson |
| emily_d    | emilyPass789  | 3200    | Emily Davis    |
| michael_w  | mikeWilson123 | 5000    | Michael Wilson |

---

## ✨ Features

- User authentication
- Account balance overview
- Money transfers between users
- Transaction history
- Quick transaction re-send based on transaction history
- Secure biometrics verification

---

## 🛠 Tech Stack

- React Native
- Expo
- TypeScript
- PNPM
- Zustand
- React Hook Form
- Zod

---

## 📱 Video Showcase

### Android
🎥 [Click to watch the demo video](./assets/video/android.mp4)

---

## 🧠 Challenges

- Unable to showcase fingerprint / FaceID authentication in simulator
- No backend API integration, everything needs to be in mock data.
