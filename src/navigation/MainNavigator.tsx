import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import {MainTabParamList} from './types';
import HomeNavigator from './HomeNavigator';
import {HomeIcon, ProfileIcon, WalletIcon} from '../components/icons';
import WalletBottomSheet from '../components/WalletBottomSheet';

const Tab = createBottomTabNavigator<MainTabParamList>();

const WalletPlaceholder = () => null;
const ProfilePlaceholder = () => null;

const MainNavigator = () => {
  const walletBottomSheetRef = useRef<any>(null);

  const handleWalletPress = () => {
    walletBottomSheetRef.current?.show();
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 90,
          paddingTop: 10,
          paddingBottom: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 10,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#919EAB',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Wallet"
        component={WalletPlaceholder}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleWalletPress();
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{position: 'relative', width: 54, height: 33}}>
              <WalletIcon color={'#000000'} />
              <View
                style={{
                  position: 'absolute',
                  top: 2,
                  left: 12,
                  backgroundColor: '#DED3F1',
                  paddingHorizontal: 6,
                  paddingVertical: 1,
                  borderRadius: 10,
                  width: 42,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#5119B7',
                    fontFamily: 'Barlow',
                    lineHeight: 14,
                  }}>
                  SOON
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                marginTop: -40,
              }}>
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePlaceholder}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <ProfileIcon color={'#000000'} />
          ),
        }}
      />
    </Tab.Navigator>
    <WalletBottomSheet ref={walletBottomSheetRef} />
    </>
  );
};

export default MainNavigator;

