import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AuthStackParamList} from '../navigation/types';
import {loginSchema} from '../utils/validation';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {loginThunk} from '../store/thunks/authThunks';
import {clearError} from '../store/slices/authSlice';
import Toast from 'react-native-toast-message';
import {colors, spacing, textStyles} from '../constants/designTokens';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {isLoading, error, tempToken} = useAppSelector(state => state.auth);
  
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const emailLabelAnimation = useState(new Animated.Value(0))[0];
  const passwordLabelAnimation = useState(new Animated.Value(0))[0];

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const emailValue = watch('email');
  const passwordValue = watch('password');

  useEffect(() => {
    if (tempToken) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Please check your email for OTP',
      });
      navigation.navigate('Verification');
    }
  }, [tempToken, navigation]);
  
  useEffect(() => {
    Animated.timing(emailLabelAnimation, {
      toValue: isEmailFocused || emailValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isEmailFocused, emailValue, emailLabelAnimation]);

  useEffect(() => {
    Animated.timing(passwordLabelAnimation, {
      toValue: isPasswordFocused || passwordValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isPasswordFocused, passwordValue, passwordLabelAnimation]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    dispatch(loginThunk(data));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: spacing[6],
        }}
        keyboardShouldPersistTaps="handled">
        <Image
          source={require('../assets/images/logo.png')}
          className="w-[79px] h-[79px] mb-4"
          resizeMode="contain"
        />

        <View className="mb-6 items-center">
          <Text style={[textStyles.h6, {marginBottom: spacing[1]}]}>
            Sign in to your account
          </Text>
        </View>

        <View className="w-full mb-4">
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <View className="bg-background-input rounded-lg h-[53px] justify-center px-3">
                  <Animated.Text 
                    style={{
                      fontSize: emailLabelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [14, 12],
                      }),
                      fontWeight: '600',
                      color: emailLabelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [colors.textTertiary, colors.textSecondary],
                      }),
                      position: 'absolute',
                      left: 12,
                      top: emailLabelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 8],
                      }),
                    }}>
                    Email
                  </Animated.Text>
                  <TextInput
                    className="text-sm text-text-primary p-0"
                    style={{
                      height: 22,
                      marginTop: (isEmailFocused || value) ? 18 : 0,
                    }}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => {
                      setIsEmailFocused(false);
                      onBlur();
                    }}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                </View>
                {errors.email && (
                  <Text className="text-error text-xs mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <View className="w-full mb-4">
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <View className="bg-background-input rounded-lg h-[53px] justify-center px-3">
                  <Animated.Text 
                    style={{
                      fontSize: passwordLabelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [14, 12],
                      }),
                      fontWeight: '600',
                      color: passwordLabelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [colors.textTertiary, colors.textSecondary],
                      }),
                      position: 'absolute',
                      left: 12,
                      top: passwordLabelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 8],
                      }),
                    }}>
                    Password
                  </Animated.Text>
                  <TextInput
                    className="text-sm text-text-primary p-0"
                    style={{
                      height: 22,
                      marginTop: (isPasswordFocused || value) ? 18 : 0,
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => {
                      setIsPasswordFocused(false);
                      onBlur();
                    }}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    editable={!isLoading}
                  />
                </View>
                {errors.password && (
                  <Text className="text-error text-xs mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          className=" w-full h-12 justify-center items-center mb-4"
          style={{
            backgroundColor: isLoading ? colors.textTertiary : colors.primary,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          activeOpacity={0.7}>
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={textStyles.buttonLarge}>Login</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

