import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Svg, Constants } from 'expo';
import SVG from '../components/SVG';

const WINDOW = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    top: Constants.statusBarHeight,
    position: 'relative'
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1
  },
  accordionHeader: {
    height: 130,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  accordionContent: {
    height: WINDOW.height - 130,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    zIndex: 99,
    elevation: 99
  },
  shopTitle: {
    color: '#fff',
    fontSize: 15,
    paddingBottom: 5
  },
  shopDescArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  shopDesc: {
    color: '#8f8f8f',
    width: 250
  },
  label: {
    color: '#8f8f8f',
    paddingTop: 20,
    paddingBottom: 10
  },
  textArea: {
    paddingVertical: 10
  },
  menuArea: {
    position: 'relative',
    height: WINDOW.height - 150
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3c3c3c'
  },
  menuIcon: {
    color: '#8f8f8f',
    width: 30,
    height: 30,
    marginRight: 10
  },
  menuText: {
    color: '#8f8f8f',
    fontSize: 15,
    fontWeight: 'bold'
  },
  logout: {
    position: 'absolute',
    width: '100%',
    bottom: Constants.statusBarHeight - 20,
    borderTopWidth: 1,
    borderTopColor: '#3c3c3c'
  },
  vin_bg: {
    marginLeft: -5,
    marginTop: -5,
    marginRight: 10
  },
  plate_bg: {
    marginLeft: -5
  }
});

export default class MenuContainer extends React.Component {
  state = {
    shopSelected: {
      id: 1,
      title: 'Admin Shop #1',
      desc: '233 S. Patterson Ave, Springfield, MO 65802'
    },
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
  }

  handleSelectShop = (shopId) => {
    this.setState({ shopSelected: this.state.shops.find(shop => shop.id === shopId) });
  }

  renderContent = (section) => {
    return (
      <View style={styles.accordionContent}>
        <Text style={styles.label}>Select a Shop</Text>
        {section.content.map(shop => (
          <TouchableOpacity key={shop.id} onPress={() => section.onSelectShop(shop.id)}>
            <View style={styles.textArea}>
              <Text style={styles.shopTitle}>{shop.title}</Text>
              <Text style={[styles.shopDesc, { width: '100%' }]} numberOfLines={1}>{shop.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  renderHeader = (section, index, isActive) => {
    return (
      <View style={styles.accordionHeader}>
        <View>
          <Text style={styles.shopTitle}>{section.header.title}</Text>
          <View style={styles.shopDescArea}>
            <Text style={styles.shopDesc}>{section.header.desc}</Text>
            <MaterialIcons name={isActive ? 'arrow-drop-up' : 'arrow-drop-down'} size={20} color="#fff" />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { shopSelected, shops } = this.state;
    const SECTIONS = [{
      header: shopSelected,
      content: shops.filter((shop) => { return shop.id !== shopSelected.id; }),
      onSelectShop: this.handleSelectShop
    }];

    return (
      <View style={styles.container}>
        <Svg height={130} width={300} style={styles.gradient}>
          <Svg.Defs>
            <Svg.LinearGradient id="grad" x1="50%" y1="0%" x2="50%" y2="100%">
              <Svg.Stop offset="0" stopColor="#000000" stopOpacity="0" />
              <Svg.Stop offset="1" stopColor="#004D40" stopOpacity="1" />
            </Svg.LinearGradient>
          </Svg.Defs>
          <Svg.Rect
            x="0"
            y="0"
            width={300}
            height={130}
            fill="url(#grad)"
          />
        </Svg>
        <Accordion
          sections={SECTIONS}
          renderHeader={this.renderHeader}
          touchableComponent={TouchableWithoutFeedback}
          renderContent={this.renderContent}
        />
        <View style={styles.menuArea}>
          <TouchableOpacity onPress={() => navigation.navigate('Vehicles', { screenMode: 'history' })}>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons name="car" style={styles.menuIcon} size={30} />
              <Text style={styles.menuText}>Vehicles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('VinScan')}>
            <View style={styles.menuItem}>
              <View style={styles.vin_bg}>
                <SVG name="scan_vin_bg" />
              </View>
              <Text style={styles.menuText}>VIN Scan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PlateScan')}>
            <View style={styles.menuItem}>
              <View style={styles.plate_bg}>
                <SVG name="scan_plate_bg" />
              </View>
              <Text style={styles.menuText}>Plate Scan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons name="cart" style={[styles.menuIcon, { marginLeft: 3, marginRight: 7 }]} size={30} />
              <Text style={styles.menuText}>Catalog</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LogOut')} style={styles.logout}>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons name="exit-to-app" style={styles.menuIcon} size={30} />
              <Text style={styles.menuText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
