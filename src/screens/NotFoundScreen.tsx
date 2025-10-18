import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'NotFound'>;

const NotFoundScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Text className="text-6xl mb-4">🔍</Text>
      <Text className="text-2xl font-bold text-[#212B36] mb-2 text-center">
        Domain Not Found
      </Text>
      <Text className="text-base text-[#637381] mb-8 text-center">
        The domain you're looking for is not available, has ended, or hasn't started yet.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Marketplace')}
        className="bg-[#00A76F] px-6 py-3 rounded-lg">
        <Text className="text-white text-base font-bold">
          Go to Marketplace
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;
