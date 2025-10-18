import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Domain, DomainStatus, AuctionResult} from '../types/domain.types';
import CountdownTimer from './CountdownTimer';
import {TimerIcon, MoneyIcon} from './icons';

interface DomainCardProps {
  domain: Domain;
  onPress?: () => void;
}

const DomainCard: React.FC<DomainCardProps> = ({domain, onPress}) => {
  const isClickable = domain.status === DomainStatus.ACTIVE;

  const renderContent = () => {
    switch (domain.status) {
      case DomainStatus.ACTIVE:
        return (
          <>
            <View className="flex-1">
              <Text className="text-[24px] leading-[28px] font-bold mb-2 text-text-primary">
                {domain.domain}
              </Text>

              <View className="flex-row items-center gap-[21px]">
                <View className="flex-row items-center w-[101px] h-[30px]">
                  <View className="mr-2">
                    <TimerIcon width={17} height={17} color="#676767" />
                  </View>
                  <CountdownTimer targetDate={domain.ending_date} />
                </View>

                <View className="flex-row items-center w-[162px] h-[30px]">
                  <View className="mr-[13px]">
                    <MoneyIcon width={14} height={14} color="#676767" />
                  </View>
                  <Text className="text-[15px] leading-[26px] font-bold text-[#676767]">
                    Last bid: ${domain.latest_bid?.amount?.toLocaleString() || domain.target.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );

      case DomainStatus.UPCOMING:
        return (
          <>
            <View className="flex-1">
              <Text className="text-[24px] leading-[28px] font-bold mb-2 text-text-primary">
                {domain.domain}
              </Text>

              <View className="flex-row items-center w-[101px] h-[30px]">
                <View className="mr-2">
                  <TimerIcon width={17} height={17} color="#676767" />
                </View>
                <CountdownTimer targetDate={domain.starting_date} />
              </View>
            </View>
          </>
        );

      case DomainStatus.CLOSED:
        return (
          <>
            <View className="flex-1">
              <Text className="text-[24px] leading-[28px] font-bold mb-2 text-text-secondary">
                {domain.domain}
              </Text>

              <View className="flex-row items-center w-[162px] h-[30px]">
                <View className="mr-[13px]">
                  <MoneyIcon width={14} height={14} color="#676767" />
                </View>
                <Text className="text-[15px] leading-[26px] font-bold text-[#676767]">
                  Last bid: KWD {domain.latest_bid?.toLocaleString() || domain.target.toLocaleString()}
                </Text>
              </View>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  const Wrapper = isClickable ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={isClickable ? onPress : undefined}
      activeOpacity={0.7}
      className="bg-white rounded-2xl px-[18px] py-[19px] mb-3 min-h-[97px] flex-row items-center shadow-sm">
      {renderContent()}
    </Wrapper>
  );
};

export default DomainCard;

