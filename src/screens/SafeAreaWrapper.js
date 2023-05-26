import React from 'react';
import { SafeAreaView } from 'react-native';

import globalStyles from '@/styles';

const SafeAreaWrapper = (Screen, navigationOptions) =>
  class extends React.PureComponent {
    static navigationOptions = navigationOptions || {};

    render() {
      return (
        <SafeAreaView style={globalStyles.safeArea}>
          <Screen {...this.props} />
        </SafeAreaView>
      );
    }
  };

export default SafeAreaWrapper;
