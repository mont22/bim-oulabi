import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {fetchDomainsThunk} from '../store/thunks/domainsThunks';
import {setActiveTab} from '../store/slices/domainsSlice';
import {DomainStatus} from '../types/domain.types';
import DomainCard from '../components/DomainCard';
import {useWebSocket} from '../hooks/useWebSocket';
import {ClockIcon, CheckIcon, ActiveIcon} from '../components/icons';

type Props = NativeStackScreenProps<HomeStackParamList, 'Marketplace'>;

const MarketplaceScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {domains, isLoading, activeTab} = useAppSelector(
    state => state.domains,
  );
  const [refreshing, setRefreshing] = useState(false);

  useWebSocket();

  useEffect(() => {
    dispatch(fetchDomainsThunk());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchDomainsThunk());
    setRefreshing(false);
  };

  const handleTabPress = (tab: DomainStatus) => {
    dispatch(setActiveTab(tab));
  };

  const handleDomainPress = (domainId: number) => {
    navigation.navigate('Auction', {domainId});
  };

  const filteredDomains = domains.filter(
    domain => domain.status === activeTab,
  );

  const renderTab = (
    tab: DomainStatus,
    label: string,
    IconComponent?: React.FC<{color?: string; width?: number; height?: number}>,
  ) => (
    <TouchableOpacity
      onPress={() => handleTabPress(tab)}
      className={`w-[118px] h-[38px] px-4 rounded-lg flex-row justify-center items-center gap-2 ${
        activeTab === tab ? 'bg-text-secondary' : 'bg-transparent'
      }`}
      activeOpacity={0.7}>
      {IconComponent && (
        <IconComponent
          color={activeTab === tab ? '#FFFFFF' : '#919EAB'}
          width={20}
          height={20}
        />
      )}
      <Text
        className={`text-[15px] leading-[26px] font-bold ${
          activeTab === tab ? 'text-white' : 'text-text-tertiary'
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="bg-white px-6 pt-14 pb-4">
        <Text className="text-[28px] font-bold text-black leading-tight">
          Marketplace
        </Text>
      </View>

      <View className="bg-[#F4F6F8] mx-4 mt-4 mb-4 rounded-lg py-[5px] px-[7px] flex-row gap-[10px]">
        {renderTab(DomainStatus.ACTIVE, 'Active', ActiveIcon)}
        {renderTab(DomainStatus.UPCOMING, 'Upcoming', ClockIcon)}
        {renderTab(DomainStatus.CLOSED, 'Closed', CheckIcon)}
      </View>

      {isLoading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00A76F" />
        </View>
      ) : (
        <FlatList
          data={filteredDomains}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <DomainCard
              domain={item}
              onPress={
                item.status === DomainStatus.ACTIVE
                  ? () => handleDomainPress(item.id)
                  : undefined
              }
            />
          )}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 100}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#00A76F']}
            />
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-text-tertiary text-base">
                No domains found in this category
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default MarketplaceScreen;

