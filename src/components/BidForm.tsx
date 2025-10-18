import React from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {bidSchema} from '../utils/validation';

interface BidFormProps {
  currentBid?: number;
  currency: string;
  onSubmit: (amount: number) => void;
  isLoading?: boolean;
  minimumBid?: number;
}

interface BidFormData {
  amount: number;
}

const BidForm: React.FC<BidFormProps> = ({
  currentBid,
  currency,
  onSubmit,
  isLoading,
  minimumBid,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<BidFormData>({
    resolver: yupResolver(bidSchema),
    defaultValues: {
      amount: currentBid ? currentBid + 1 : minimumBid || 1,
    },
  });

  const onSubmitForm = (data: BidFormData) => {
    onSubmit(data.amount);
    reset();
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <Text className="text-lg font-bold mb-4 text-gray-900">Place Your Bid</Text>
      
      <View className="mb-4">
        <Controller
          control={control}
          name="amount"
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                <Text className="text-base font-semibold text-gray-700 mr-2">
                  {currency}
                </Text>
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  onBlur={onBlur}
                  onChangeText={text => onChange(text ? parseFloat(text) : 0)}
                  value={value?.toString()}
                  keyboardType="numeric"
                  placeholder="Enter bid amount"
                  editable={!isLoading}
                />
              </View>
              {errors.amount && (
                <Text className="text-danger text-sm mt-1">
                  {errors.amount.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      {currentBid && (
        <Text className="text-sm text-gray-600 mb-4">
          Current bid: {currency} {currentBid.toLocaleString()}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmitForm)}
        disabled={isLoading}
        className={`py-3 rounded-lg ${
          isLoading ? 'bg-gray-400' : 'bg-primary'
        }`}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-bold text-base">
            Place Bid
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BidForm;

