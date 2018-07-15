import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import Header from '../components/core/Header';
import Item from '../components/core/ListItem';

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

export default class ShopScreen extends React.Component {
  state = {
    shops: [{
      id: 1,
      title: 'Admin Shop #1',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    }, {
      id: 2,
      title: 'Admin Shop #2',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    }, {
      id: 3,
      title: 'Admin Shop #3',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    }, {
      id: 4,
      title: 'Admin Shop #4',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    }, {
      id: 5,
      title: 'Admin Shop #5',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    }, {
      id: 6,
      title: 'Admin Shop #6',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    }]
  };

  goToVehicles = () => {
    this.props.navigation.navigate('Vehicles');
  }

  render() {
    const { shops } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header title="Select a Shop" leftIcon="menu" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            {shops.map(shop =>
              <Item key={shop.id} {...shop} linkIcon="keyboard-arrow-right" onPressItem={this.goToVehicles} onPressIcon={this.goToVehicles} />)}
          </View>
        </ScrollView>
      </View>
    );
  }
}
