# Domain Marketplace

A React Native mobile application for a domain marketplace with real-time bidding functionality.

## Features

- **Animated Splash Screen** with first-time onboarding
- **User Authentication** with email/password login and 2-step OTP verification
- **Domain Marketplace** with Active, Upcoming, and Closed domains
- **Real-time Bidding** using Laravel Echo and WebSocket
- **Live Updates** when new bids are placed
- **Clean Architecture** with Redux Toolkit for state management

## Tech Stack

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management with Thunk middleware
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **React Navigation** - Navigation
- **NativeWind** - Tailwind CSS for React Native
- **Axios** - HTTP client
- **Laravel Echo** - Real-time WebSocket communication
- **Pusher** - WebSocket protocol
- **AsyncStorage** - Local storage



## Installation

### Prerequisites

- Node.js >= 20
- npm or yarn
- React Native development environment setup
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK

### Steps

1. **Clone the repository**
   ```bash
   cd /Users/Mont/Desktop/Projects/DomainMarketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Run the application**

   **iOS:**
   ```bash
   npm run ios
   ```

   **Android:**
   ```bash
   npm run android
   ```


## Features Breakdown

### 1. Splash Screen
- Animated welcome screen
- First-time user onboarding modal
- Auto-navigate to login after 2 seconds

### 2. Login Screen
- Email and password validation
- Error handling for backend validation
- Automatic navigation to verification on success

### 3. 2-Step Verification
- 4-digit OTP input
- Auto-submit on completion
- Visual OTP boxes for better UX

### 4. Marketplace Screen
- Tabbed interface (Active/Upcoming/Closed)
- Pull-to-refresh functionality
- Domain cards with countdown timers
- Real-time updates via WebSocket

### 5. Auction Screen
- Domain details and current bid
- Countdown timer
- Bid placement form
- Validation for minimum bid
- Real-time bid updates
- Bid history display

## State Management

The app uses Redux Toolkit with the following structure:

- **authSlice**: User authentication state
- **domainsSlice**: Domains and bidding state

Async operations are handled with Redux Thunk middleware.

## Styling

The app uses NativeWind (Tailwind CSS for React Native) for styling:

- Utility-first CSS classes
- Responsive design
- Custom theme colors
- Consistent spacing and typography

## Error Handling

- API errors are caught and displayed using Toast notifications
- Form validation errors shown inline
- Network errors handled gracefully
- Authentication errors trigger logout

## Development

### Running the App

```bash
npm start
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## License

This project is private and proprietary.
