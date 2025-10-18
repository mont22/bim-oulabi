/**
 * Design Tokens from Figma
 * Auctions Website - Mobile Design System
 */

export const colors = {
  // Primary
  primary: '#00A76F', // Main green color
  primaryLight: 'rgba(0, 167, 111, 0.08)',
  primaryBorder: '#00A76F',
  
  // Status Colors
  secondary: '#8E33FF', // Purple for ongoing status
  secondaryLight: 'rgba(142, 51, 255, 0.16)',
  error: '#B71D18',
  errorLight: 'rgba(255, 86, 48, 0.16)',
  success: '#118D57',
  successLight: 'rgba(34, 197, 94, 0.16)',
  
  // Text Colors
  textPrimary: '#212B36',
  textSecondary: '#637381',
  textTertiary: '#919EAB',
  textDisabled: 'rgba(145, 158, 171, 0.48)',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundGray: '#F9FAFB',
  backgroundInput: 'rgba(145, 158, 171, 0.08)',
  backgroundCard: '#FFFFFF',
  
  // Border Colors
  border: '#A8B2BC',
  borderLight: 'rgba(145, 158, 171, 0.32)',
  
  // Other
  black: '#000000',
  white: '#FFFFFF',
  overlay: 'rgba(119, 119, 119, 0.5)',
  cardShadow: 'rgba(145, 158, 171, 0.12)',
} as const;

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'Public Sans',
    display: 'Barlow',
    system: 'SF Pro Text', // For status bar
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 15,
    base: 16,
    lg: 18,
    xl: 24,
    '2xl': 26,
    '3xl': 35,
    '4xl': 60,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
  
  // Line Heights
  lineHeight: {
    tight: 1,
    normal: 1.5,
    relaxed: 2,
  },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#919EAB',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  navbar: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  wallet: {
    shadowColor: '#919EAB',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.23,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const dimensions = {
  // Mobile screen
  mobileWidth: 393,
  mobileHeight: 852,
  
  // Status bar
  statusBarHeight: 45,
  
  // Navbar
  navbarHeight: 131,
  
  // Components
  inputHeight: 53,
  buttonHeightSmall: 38,
  buttonHeightMedium: 48,
  buttonHeightLarge: 53,
  
  // Domain Card
  domainCardHeight: 97,
  domainCardWidth: 390,
} as const;

export const textStyles = {
  // Headings
  h6: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  
  // Body
  body1: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  body2: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  
  // Components
  buttonLarge: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 26,
    color: colors.white,
  },
  inputLabel: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: 12,
    color: colors.textSecondary,
  },
  labelText: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 20,
    color: colors.secondary,
  },
  
  // Domain specific
  domainTitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  domainBid: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 26,
    color: colors.textSecondary,
  },
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  dimensions,
  textStyles,
} as const;

export default designTokens;
