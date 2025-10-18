import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Verification: undefined;
};

export type MainTabParamList = {
  Wallet: undefined;
  Home: NavigatorScreenParams<HomeStackParamList>;
  Profile: undefined;
};

export type HomeStackParamList = {
  Marketplace: undefined;
  Auction: {domainId: number};
  NotFound: undefined;
};

export type MainStackParamList = HomeStackParamList;

