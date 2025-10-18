# Domain Auction Screen Implementation

## Overview
Implemented the Domain Auction screen based on the Figma design with pixel-perfect accuracy and real-time bidding functionality using WebSockets (Laravel Echo with Reverb).

## Figma Design Match - Detailed Specifications

### Layout Structure
From Figma analysis:
- **Container**: 393px × 852px (mobile frame)
- **Content padding**: Top 32px, Horizontal 9px, Bottom 32px for scroll area
- **Inner padding**: Additional 7px horizontal for domain header alignment

### Domain Header Section
- **Position**: Top of scroll content
- **Spacing**: 12px gap between back button and domain name
- **Margin bottom**: 32px (mb-8)
- **Back Arrow**:
  - Size: 24px container, 16px arrow
  - Border: 1.5px width
  - Rotation: 45deg for left arrow
  - Position: Slightly offset (marginLeft: 3px, marginTop: -1.5px)
- **Domain Text**:
  - Font: Barlow, 600 weight (semibold)
  - Size: 35px
  - Line height: 33px (0.94em)
  - Letter spacing: 4px (11.4%)
  - Color: #000000

### Main Auction Container
- **Border**: 1px solid #A8B2BC
- **Border radius**: 8px (rounded-lg)
- **Overflow**: Hidden

### Time Left Section
- **Container padding**: 23px horizontal, 21px vertical
- **Gap between sections**: 28px (gap-7)
- **Purple Badge**:
  - Background: #5119B7
  - Padding: 10px horizontal, 4px vertical
  - Border radius: 4px
  - Font: Barlow 600, 26px, line-height 33px, tracking 4px
  - Text color: #FFFFFF
- **Timer Display**:
  - Font: Barlow 600, 41px, line-height 33px, tracking 12px (29.3%)
  - Color: #000000
  - Format: DD:HH:MM:SS (padded with zeros)
  - Margin bottom: 12px
- **Time Labels** (days, hours, min, sec):
  - Font: Barlow 600, 20px, line-height 33px, tracking 2px (10%)
  - Color: #232020
  - Exact positioning from Figma:
    - "days" at x: 4, width: 47px
    - "hours" at x: 97, width: 58px
    - "min" at x: 202, width: 37px
    - "sec" at x: 295, width: 36px

### Current Bid Section
- **Purple Badge**: Same styling as Time Left badge
- **Bid Amount**:
  - Font: Barlow 600, 55px, line-height 33px, tracking 12px (21.8%)
  - Color: #000000
  - Format: "SAR {amount}"

### Bid Input Form
- **Container**: flex-row with 11px gap
- **Input Field**:
  - Background: rgba(145, 158, 171, 0.08)
  - Border radius: 8px
  - Padding: 12px horizontal
  - Height: 53px
  - Font: Public Sans 400, 14px
  - Text color: #212B36
  - Placeholder color: #919EAB
- **Place Bid Button**:
  - Width: 103px
  - Height: 53px
  - Background: #00A76F (enabled), #9CA3AF (disabled)
  - Border radius: 8px
  - Font: Public Sans 700, 15px, line-height 26px
  - Text color: #FFFFFF

### Latest Bids Section
- **Container padding**: 23px horizontal, 21px vertical
- **Gap between title and list**: 10px
- **Purple Badge**: Same styling as other badges
- **Bid List**:
  - Gap between rows: 9px
  - Row padding: 16px horizontal, 4px vertical
  - Alternating backgrounds: #F2F2F2 (even), #E6E6E6 (odd)
  - Items aligned to flex-end
  - **Name column**: width 114px, left-aligned
  - **Amount column**: width 155px, center-aligned
  - **Time column**: width 150px, right-aligned
  - Font: Barlow 400, 14px, line-height 33px (2.36em)
  - Color: #000000

## Features Implemented

### 1. **UI/UX Implementation (Pixel-Perfect Figma Match)**
   - ✅ Exact padding and spacing from Figma specs
   - ✅ Correct font families (Barlow for display, Public Sans for body)
   - ✅ Precise font sizes, weights, line heights, and letter spacing
   - ✅ Accurate color scheme (#5119B7 purple, #00A76F green)
   - ✅ Proper border styling and border radius
   - ✅ Exact component dimensions and positioning
   - ✅ Alternating row colors in bid list
   - ✅ Custom back arrow with correct rotation

### 2. **Functionality**

#### Bid Validation:
- ✅ Validates numeric input
- ✅ Checks if bid is greater than current bid
- ✅ Shows error toast: "Your bid is less than or equal to the current bid"

#### Bid Success:
- ✅ Resets form after successful bid
- ✅ Shows success toast: "You are the highest bidder!" when user becomes highest bidder
- ✅ Updates UI with new bid information

#### Domain Status Check:
- ✅ Only shows active domains
- ✅ Redirects to NotFound screen for upcoming or closed domains
- ✅ Created NotFoundScreen component with navigation back to Marketplace

### 3. **Real-time Updates via WebSocket**

#### WebSocket Configuration (Exact as per requirements):
```javascript
{
  broadcaster: 'reverb',
  key: 'assessment',
  wsHost: 'api-assessment.steerhubs.com',
  wsPath: '/ws',
  forceTLS: true,
  authEndpoint: 'https://api-assessment.steerhubs.com/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
  },
}
```

#### Event Handling:
- ✅ Listens to `bid.created` event on private `bids` channel
- ✅ Updates domain details in real-time when new bids are placed
- ✅ Automatically refreshes current bid, bid history, and countdown
- ✅ Updates Redux store via `updateDomainFromWebSocket` action

### 4. **Responsive Design**
- ✅ Mobile-optimized layout (393px width)
- ✅ ScrollView with proper content padding
- ✅ Overflow handling for long bid lists
- ✅ Proper touch targets for interactive elements

## Files Modified/Created

### Created:
1. `/src/screens/NotFoundScreen.tsx` - Screen for invalid/unavailable domains
2. `/AUCTION_IMPLEMENTATION.md` - This documentation

### Modified:
1. `/src/screens/AuctionScreen.tsx` - Complete redesign to match Figma pixel-perfectly
2. `/src/screens/index.ts` - Added NotFoundScreen export
3. `/src/navigation/HomeNavigator.tsx` - Added NotFound route
4. `/src/constants/config.ts` - Updated WebSocket authEndpoint to use assessment API

### Key Components Used:
- `useWebSocket` hook for real-time bidding updates
- Redux Toolkit for state management (domains slice)
- React Native Toast for notifications
- Custom countdown timer logic with real-time updates

## Design Specifications Summary

### Colors:
- **Purple badge**: `#5119B7`
- **Green button**: `#00A76F`
- **Gray button (disabled)**: `#9CA3AF`
- **Light gray bid rows**: `#F2F2F2` (even), `#E6E6E6` (odd)
- **Text colors**: `#000000` (primary), `#232020` (labels), `#212B36` (input), `#919EAB` (placeholder)
- **Input background**: `rgba(145, 158, 171, 0.08)`
- **Border**: `#A8B2BC`

### Typography:
- **Font families**: Barlow (display), Public Sans (body/button)
- **Domain name**: 35px, 600 weight, 33px line-height, 4px tracking
- **Timer**: 41px, 600 weight, 33px line-height, 12px tracking
- **Current bid**: 55px, 600 weight, 33px line-height, 12px tracking
- **Labels/badges**: 26px, 600 weight, 33px line-height, 4px tracking
- **Time units**: 20px, 600 weight, 33px line-height, 2px tracking
- **Bid list**: 14px, 400 weight, 33px line-height
- **Button**: 15px, 700 weight, 26px line-height
- **Input**: 14px, 400 weight

### Spacing (from Figma):
- **Content padding**: 32px top, 9px horizontal, 32px bottom
- **Section padding**: 23px horizontal, 21px vertical
- **Section gaps**: 28px vertical (gap-7)
- **Element gaps**: 11px (input/button), 10px (title/list), 9px (list rows)
- **Border**: 1px solid
- **Border radius**: 8px (rounded-lg), 4px (badges)

## API Integration

### Endpoints Used:
1. `GET /domains/{id}` - Fetch domain details
2. `POST /bids` - Place a new bid
   - Body: `{ domain_id: number, amount: number }`
   - Response: `{ bid: Bid, domain: DomainDetail }`

### WebSocket Events:
1. **Channel**: `private-bids`
2. **Event**: `bid.created`
3. **Payload**: `{ domain: DomainDetail }`

## Testing Checklist

- [ ] Test placing a valid bid
- [ ] Test placing a bid lower than current bid (should show error)
- [ ] Test placing a bid equal to current bid (should show error)
- [ ] Test placing an invalid amount (non-numeric)
- [ ] Test navigation to expired/upcoming domains (should redirect)
- [ ] Test real-time updates when another user places a bid
- [ ] Test countdown timer accuracy (updates every second)
- [ ] Test responsive layout matches Figma design
- [ ] Test loading states during bid placement
- [ ] Test error handling for API failures
- [ ] Test back button navigation
- [ ] Test bid list display with 0, 1, and 7+ bids
- [ ] Test relative time formatting for bids
- [ ] Test WebSocket connection and disconnection

## Implementation Notes

1. **Currency**: Changed from KWD to SAR to match Figma design
2. **Time Format**: 
   - Countdown uses DD:HH:MM:SS format with zero padding
   - Bid times use relative format (e.g., "2 minutes ago") for recent bids
   - Full timestamp for older bids (>24 hours)
3. **Bid History**: Shows latest 7 bids with alternating row colors
4. **WebSocket**: Automatically connects when user is authenticated and disconnects on unmount
5. **Form Reset**: Input field clears after successful bid placement
6. **Back Arrow**: Custom implementation using border styling and rotation
7. **Spacing**: Used exact pixel values from Figma instead of approximations
8. **Typography**: Matched exact font sizes, weights, line heights, and letter spacing from Figma

## Differences from Previous Implementation

1. **Layout**: Changed from card-based to single bordered container
2. **Padding**: Updated to exact Figma specifications (23px vs 24px)
3. **Typography**: Corrected all font sizes and spacing to match Figma
4. **Timer Labels**: Positioned with exact pixel spacing from Figma
5. **Button Gap**: Changed from 12px to 11px to match Figma
6. **Bid List**: Exact column widths (114px, 155px, 150px) from Figma
7. **Colors**: Using exact hex values from Figma design tokens

