import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import Header from '../components/core/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#0a6348',
    height: 65,
    width: '100%'
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 65,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default class VinScanScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header title="Catalog Lookup" leftIcon="menu" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View />
        </ScrollView>
      </View>
    );
  }
}
