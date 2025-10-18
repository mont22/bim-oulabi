import React from 'react';
import {Text, View} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate?: string;
  label?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({targetDate, label}) => {
  const {hours, minutes, seconds, isExpired} = useCountdown(targetDate);

  if (!targetDate || isExpired) {
    return (
      <Text className="text-sm text-text-tertiary">
        {label ? `${label}: ` : ''}Expired
      </Text>
    );
  }

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <View className="flex-row items-center">
      {label && <Text className="text-sm font-medium mr-2">{label}: </Text>}
      <Text className="text-[15px] leading-[26px] font-bold text-[#676767]">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

export default CountdownTimer;

