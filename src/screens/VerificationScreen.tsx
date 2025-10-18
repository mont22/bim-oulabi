import React, {useEffect, useRef} from 'react';
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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AuthStackParamList} from '../navigation/types';
import {otpSchema} from '../utils/validation';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {verifyOtpThunk} from '../store/thunks/authThunks';
import {clearError} from '../store/slices/authSlice';
import Toast from 'react-native-toast-message';
import {colors, spacing, textStyles} from '../constants/designTokens';

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

interface OtpFormData {
  otp: string;
}

const VerificationScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {isLoading, error, isAuthenticated} = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otpValue = watch('otp');
  const inputRef = useRef<TextInput>(null);

  const onSubmit = async (data: OtpFormData) => {
    dispatch(verifyOtpThunk(data));
  };

  useEffect(() => {
    if (otpValue?.length === 4) {
      handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  const renderOtpBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      boxes.push(
        <View
          key={i}
          className="w-[70px] h-[53px] bg-background-input rounded-lg justify-center items-center mx-[5px]">
          <Text 
            className="text-2xl font-bold"
            style={{
              color: otpValue?.[i] ? colors.textPrimary : colors.textTertiary,
            }}>
            {otpValue?.[i] || ''}
          </Text>
        </View>,
      );
    }
    return boxes;
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

        <View className="mb-6 items-center w-full">
          <Text style={[textStyles.h6, {marginBottom: spacing[2]}]}>
            Verify your account
          </Text>
          <Text className="text-sm text-text-secondary text-center leading-[22px]">
            An OTP has been sent to your phone number +96650******** to verify your login:
          </Text>
        </View>

        <Controller
          control={control}
          name="otp"
          render={({field: {onChange, value}}) => (
            <View className="w-full mb-6">
              <TouchableOpacity
                onPress={() => inputRef.current?.focus()}
                className="flex-row justify-center mb-4">
                {renderOtpBoxes()}
              </TouchableOpacity>
              <TextInput
                ref={inputRef}
                className="absolute opacity-0"
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                maxLength={4}
                editable={!isLoading}
                autoFocus
              />
              {errors.otp && (
                <Text className="text-error text-xs mt-1 text-center">
                  {errors.otp.message}
                </Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          className=" w-full h-12 justify-center items-center"
          style={{
            backgroundColor: isLoading ? colors.textTertiary : colors.primary,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          activeOpacity={0.7}>
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={textStyles.buttonLarge}>Verify</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;

