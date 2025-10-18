import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {fetchDomainByIdThunk, placeBidThunk, fetchBidsByDomainIdThunk} from '../store/thunks/domainsThunks';
import {clearError} from '../store/slices/domainsSlice';
import {DomainStatus} from '../types/domain.types';
import {useWebSocket} from '../hooks/useWebSocket';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<HomeStackParamList, 'Auction'>;

const AuctionScreen: React.FC<Props> = ({route, navigation}) => {
  const {domainId} = route.params;
  const dispatch = useAppDispatch();
  const {currentDomain, isLoading, error} = useAppSelector(
    state => state.domains,
  );
  const [bidAmount, setBidAmount] = useState('');
  
  useWebSocket();

  useEffect(() => {
    dispatch(fetchDomainByIdThunk(domainId));
    dispatch(fetchBidsByDomainIdThunk(domainId));
  }, [domainId, dispatch]);

  const handlePlaceBid = async () => {
    if (!currentDomain || !bidAmount) return;

    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount) || amount <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please enter a valid bid amount',
      });
      return;
    }

    const currentBid = currentDomain.latest_bid?.amount || currentDomain.target;
    if (amount <= currentBid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Bid',
        text2: 'Your bid is less than or equal to the current bid',
      });
      return;
    }

    const result = await dispatch(
      placeBidThunk({domain_id: domainId, amount}),
    );

    if (placeBidThunk.fulfilled.match(result)) {
      setBidAmount('');
      
      dispatch(fetchDomainByIdThunk(domainId));
      
      dispatch(fetchBidsByDomainIdThunk(domainId));
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Bid placed successfully!',
      });
    }
  };

  const calculateTimeLeft = () => {
    if (!currentDomain?.ending_date) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }

    const now = new Date().getTime();
    const target = new Date(currentDomain.ending_date).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {days, hours, minutes, seconds};
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDomain?.ending_date]);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  const formatBidTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  if (isLoading && !currentDomain) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#00A76F" />
      </View>
    );
  }

  if (!currentDomain) {
    return null;
  }

  const currentBid = currentDomain.latest_bid?.amount || currentDomain.target;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        className="flex-1 pb-8 px-[9px]">
        <View className="flex-1">
          <View className="flex-row items-center gap-3 mb-8 px-[7px]">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-6 h-6 justify-center items-center">
              <View className="w-4 h-4 border-l-[1.5px] border-b-[1.5px] border-black rotate-45 ml-[3px] -mt-[1.5px]" />
            </TouchableOpacity>
            <Text className="text-[35px] font-semibold leading-[33px] tracking-[4px] text-black">
              {currentDomain.domain}
            </Text>
          </View>

          <View className="border border-[#A8B2BC] rounded-lg overflow-hidden">
            <View className="px-[23px] py-[21px] gap-7 bg-white">
              <View>
                <View className="bg-[#5119B7] px-[10px] py-1 rounded self-start mb-3">
                  <Text className="text-white text-[26px] font-semibold leading-[33px] tracking-[4px]">
                    Time Left
                  </Text>
                </View>
                <Text className="text-[30px] font-semibold leading-[33px] tracking-[12px] text-black mb-3">
                  {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </Text>
                <View className="flex-row gap-2 ml-1">
                  <Text className="text-[20px] font-semibold leading-[33px] tracking-[2px] text-[#232020] w-[47px]" >
                    days
                  </Text>
                  <Text className="text-[20px] font-semibold leading-[33px] tracking-[2px] text-[#232020] w-[58px]">
                    hours
                  </Text>
                  <Text className="text-[20px] font-semibold leading-[33px] tracking-[2px] text-[#232020] w-[37px]">
                    min
                  </Text>
                  <Text className="text-[20px] font-semibold leading-[33px] tracking-[2px] text-[#232020] w-[48px]">
                    sec
                  </Text>
                </View>
              </View>

              <View>
                <View className="bg-[#5119B7] px-[10px] py-1 rounded self-start mb-3">
                  <Text className="text-white text-[26px] font-semibold leading-[33px] tracking-[4px]">
                    Current Bid
                  </Text>
                </View>
                <Text className="text-[40px] font-semibold leading-[33px] tracking-[12px] text-black pt-2">
                  SAR {currentBid.toLocaleString()}
                </Text>
              </View>

              <View className="flex-row gap-[11px]">
                <View className="flex-1">
                  <TextInput
                    className="bg-[rgba(145,158,171,0.08)] rounded-lg px-3 h-[53px] text-[14px] text-[#212B36]"
                    placeholder={`SAR ${(currentBid + (currentDomain.minimum_bid || 100)).toLocaleString()}`}
                    placeholderTextColor="#919EAB"
                    value={bidAmount.toLocaleString()}
                    onChangeText={setBidAmount}
                    keyboardType="numeric"
                    editable={!isLoading}
                  />
                </View>
                <TouchableOpacity
                  onPress={handlePlaceBid}
                  disabled={isLoading || !bidAmount}
                  className={`rounded-lg justify-center items-center w-[103px] h-[53px] ${isLoading || !bidAmount ? 'bg-gray-400' : 'bg-[#00A76F]'}`}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text className="text-white text-[15px] font-bold leading-[26px]">
                      Place bid
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View className="px-[23px] py-[21px] bg-white gap-[10px]">
              <View className="bg-[#5119B7] px-[10px] py-1 rounded self-start">
                <Text className="text-white text-[26px] font-semibold leading-[33px] tracking-[4px]">
                  Latest Bids
                </Text>
              </View>

              <View className="gap-[9px]">
                {currentDomain.bids && currentDomain.bids.length > 0 ? (
                  currentDomain.bids.slice(0, 7).map((bid, index) => (
                    <View
                      key={bid.id}
                      className={`flex-row justify-between items-end px-4 py-1 ${index % 2 === 0 ? 'bg-[#F2F2F2]' : 'bg-[#E6E6E6]'}`}>
                      <Text className="text-[14px] font-normal leading-[33px] text-black">
                        {bid.user?.name || 'Anonymous'}
                      </Text>
                      <Text className="text-[14px] font-normal leading-[33px] text-black text-center">
                        SAR {bid.amount.toLocaleString()}
                      </Text>
                      <Text className="text-[14px] font-normal leading-[33px] text-black text-right">
                        {formatBidTime(bid.created_at)}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View className="px-4 py-6">
                    <Text className="text-[14px] text-[#919EAB] text-center">
                      No bids yet. Be the first to bid!
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuctionScreen;

