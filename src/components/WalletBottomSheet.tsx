import React, {forwardRef} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

type WalletBottomSheetProps = {};

const WalletBottomSheet = forwardRef<any, WalletBottomSheetProps>(
    
  (props, ref) => {
    return (
      <ActionSheet
        ref={ref}
        containerStyle={styles.container}
        indicatorStyle={styles.handleIndicator}
        gestureEnabled={true}
        defaultOverlayOpacity={0.5}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/images/wallet-coming-soon-173b6c.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            Coming Soon:{'\n'}
            Wallet Feature!
          </Text>
          <Text style={styles.description}>
            Easily manage finances and transactions in-app. Stay tuned for
            updates!"
          </Text>
        </View>
      </ActionSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  handleIndicator: {
    backgroundColor: '#D9D9D9',
    width: 66,
    height: 4,
    borderRadius: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 45,
    paddingTop: 20,
    paddingBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Public Sans',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 31,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Public Sans',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: '#696969',
    paddingHorizontal: 1,
  },
});

export default WalletBottomSheet;
