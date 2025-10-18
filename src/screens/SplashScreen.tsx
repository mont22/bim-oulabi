import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, Image, StatusBar, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/types';
import {storage} from '../utils/storage';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {setToken} from '../store/slices/authSlice';
import {CommonActions} from '@react-navigation/native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const descriptionFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(descriptionFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoFadeAnim, titleFadeAnim, descriptionFadeAnim, buttonFadeAnim]);

  const handleContinue = async () => {
    const token = await storage.getToken();
    
    if (token) {
      dispatch(setToken(token));
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
        <View className="flex-1 bg-white">
          <Animated.View 
            className="absolute w-[79px] h-[79px] top-[300px]"
            style={{
              left: (SCREEN_WIDTH - 79) / 2,
              opacity: logoFadeAnim,
            }}
          >
            <Image
              source={require('../assets/images/logo-splash.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </Animated.View>

          <View 
            className="absolute w-[284px] top-[389px]"
            style={{
              left: (SCREEN_WIDTH - 284) / 2,
            }}
          >
            <Animated.View style={{opacity: titleFadeAnim}}>
              <Text className="text-2xl font-bold leading-7 text-text-primary text-center mb-[11px] font-public-sans">
                Welcome to{'\n'}Domains Marketplace
              </Text>
            </Animated.View>
            
            <Animated.View style={{opacity: descriptionFadeAnim}}>
              <Text className="text-base font-normal leading-[19px] text-text-primary text-center mb-[27px] font-public-sans">
                Discover domains for sale in our Auctions and Buy Now listings
              </Text>
            </Animated.View>
            
            <Animated.View 
              className="items-center"
              style={{opacity: buttonFadeAnim}}
            >
              <TouchableOpacity
                onPress={handleContinue}
                className="rounded-lg justify-center items-center border border-primary-border w-[136px] h-12 px-4"
                activeOpacity={0.7}
              >
                <Text className="text-[15px] font-bold leading-[26px] text-primary font-public-sans">
                  Continue
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
    </View>
  );
};

export default SplashScreen;

