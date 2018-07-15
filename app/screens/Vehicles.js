import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import SVG from '../components/SVG';
import Header from '../components/core/Header';
import Item from '../components/core/ListItem';
import VehicleDetail from './VehicleDetail';

const WINDOW = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  tabViewWrap: {
    width: '100%',
    flex: 1
  },
  tabBar: {
    height: 80,
    flexDirection: 'row',
    marginTop: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#e4e4e4',
    backgroundColor: '#fff'
  },
  tabButton: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3
  },
  tabButtonText: {
    fontSize: 14
  },
  tabViewContent: {
    flex: 1,
    backgroundColor: '#fff'
  },
  vehicle_bg: {
    width: WINDOW.width,
    height: WINDOW.height,
    backgroundColor: '#f00'
  },
  noVehicles: {
    fontSize: 18,
    textAlign: 'center',
    color: '#989898',
    width: 180,
    paddingTop: 20
  },
  addVehicle: {
    backgroundColor: '#fbaf30',
    width: 70,
    height: 70,
    borderRadius: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 2
  },
  addVehicleIcon: {
    marginTop: 2,
    backgroundColor: 'transparent',
    fontSize: 42
  },
  scanButton: {
    height: 45,
    width: 45,
    borderRadius: 45,
    backgroundColor: '#efefef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  vinScan: {
    position: 'absolute',
    bottom: 160,
    right: 32,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2
  },
  plateScan: {
    position: 'absolute',
    bottom: 100,
    right: 32,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2
  },
  scanText: {
    backgroundColor: '#434343',
    height: 30,
    paddingTop: 6,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 20,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 5
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  vehicleIcon: {
    width: 34,
    height: 34
  }
});

export default class VehiclesScreen extends React.Component {
  state = {
    showScanners: false,
    vehiclesHistory: [{
      id: 1,
      scanAt: '6/22/2017',
      year: '2004',
      make: 'Ford',
      model: 'F-150',
      subModel: 'STX',
      engine: 'V8 - 4.6L 281ci GAS MFI vin W - 2 valve SOHC',
      vinCode: 'KNDMB233X66033879'
    }, {
      id: 2,
      scanAt: '6/22/2017',
      year: '2004',
      make: 'Ford',
      model: 'F-150',
      subModel: 'STX',
      engine: 'V8 - 4.6L 281ci GAS MFI vin W - 2 valve SOHC',
      vinCode: 'KNDMB233X66033879'
    }, {
      id: 3,
      scanAt: '6/22/2017',
      year: '2004',
      make: 'Ford',
      model: 'F-150',
      subModel: 'STX',
      engine: 'V8 - 4.6L 281ci GAS MFI vin W - 2 valve SOHC',
      vinCode: 'KNDMB233X66033879'
    }, {
      id: 4,
      scanAt: '6/22/2017',
      year: '2004',
      make: 'Ford',
      model: 'F-150',
      subModel: 'STX',
      engine: 'V8 - 4.6L 281ci GAS MFI vin W - 2 valve SOHC',
      vinCode: 'KNDMB233X66033879'
    }, {
      id: 5,
      scanAt: '6/22/2017',
      year: '2004',
      make: 'Ford',
      model: 'F-150',
      subModel: 'STX',
      engine: 'V8 - 4.6L 281ci GAS MFI vin W - 2 valve SOHC',
      vinCode: 'KNDMB233X66033879'
    }, {
      id: 6,
      scanAt: '6/22/2017',
      year: '2004',
      make: 'Ford',
      model: 'F-150',
      subModel: 'STX',
      engine: 'V8 - 4.6L 281ci GAS MFI vin W - 2 valve SOHC',
      vinCode: 'KNDMB233X66033879'
    }],
    modalVisible: false,
    chosenVehicle: null
  };

  addVehicle = () => {
    const { showScanners } = this.state;
    this.setState({ showScanners: !showScanners });
  }

  scanVin = () => {
    this.props.navigation.navigate('VinScan');
  }

  scanPlate = () => {
    this.props.navigation.navigate('PlateScan');
  }

  openDetailModal(vehicleInfo) {
    this.setState({ chosenVehicle: vehicleInfo, modalVisible: true });
  }

  closeDetailModal = () => {
    this.setState({ modalVisible: false });
  }

  addToCart = () => {
    this.props.navigation.navigate('Catalog');
  }

  render() {
    const { showScanners, vehiclesHistory } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title="Vehicles" leftIcon="menu" rightIcon="search" navigation={navigation} />

        {navigation.state.params && navigation.state.params.screenMode === 'history' ?
          <View style={styles.tabViewWrap}>
            <ScrollableTabView
              initialPage={0}
              renderTabBar={() => <VehiclesTabBar />}
            >
              <View tabLabel="history" style={styles.tabViewContent}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <View>
                    {vehiclesHistory.map(vehicleInfo =>
                      (<Item
                        key={vehicleInfo.id}
                        linkIcon="add-shopping-cart"
                        scanAt={vehicleInfo.scanAt}
                        title={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
                        desc={[vehicleInfo.model, vehicleInfo.subModel, vehicleInfo.engine, vehicleInfo].join(' ')}
                        onPressItem={() => { this.openDetailModal(vehicleInfo); }}
                        onPressIcon={this.addToCart}
                      />))}
                  </View>
                </ScrollView>
              </View>
              <View tabLabel="star" style={styles.tabViewContent}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <View>
                    {vehiclesHistory.map(vehicleInfo =>
                      (<Item
                        key={vehicleInfo.id}
                        linkIcon="add-shopping-cart"
                        scanAt={vehicleInfo.scanAt}
                        title={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
                        desc={[vehicleInfo.model, vehicleInfo.subModel, vehicleInfo.engine, vehicleInfo].join(' ')}
                        onPressItem={() => { this.openDetailModal(vehicleInfo); }}
                        onPressIcon={this.addToCart}
                      />))}
                  </View>
                </ScrollView>
              </View>
            </ScrollableTabView>
          </View>
          :
          <View style={{ alignItems: 'center' }}>
            <SVG name="vehicle_page_bg" style={styles.vehicle_bg} />
            <Text style={styles.noVehicles}>You haven&#39;t scanned any vehicles yet</Text>
          </View>
        }

        {showScanners ?
          <TouchableWithoutFeedback onPress={this.addVehicle}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          : null
        }

        {showScanners ?
          <TouchableWithoutFeedback onPress={this.scanVin}>
            <View style={styles.vinScan}>
              <Text style={styles.scanText}>Vin Scan</Text>
              <View style={styles.scanButton}>
                <SVG name="scan_vin_bg" style={styles.vin_bg} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          : null
        }

        {showScanners ?
          <TouchableWithoutFeedback onPress={this.scanPlate}>
            <View style={styles.plateScan}>
              <Text style={styles.scanText}>Plate Scan</Text>
              <View style={styles.scanButton}>
                <SVG name="scan_plate_bg" style={styles.plate_bg} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          : null
        }

        <TouchableWithoutFeedback onPress={this.addVehicle}>
          <View style={styles.addVehicle}>
            {showScanners ?
              <MaterialCommunityIcons name="close" style={styles.addVehicleIcon} size={50} color="#fff" />
              :
              <MaterialCommunityIcons name="plus" style={styles.addVehicleIcon} size={50} color="#fff" />
            }
          </View>
        </TouchableWithoutFeedback>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log('Modal has been closed.'); }}
        >
          <VehicleDetail data={this.state.chosenVehicle} onClose={this.closeDetailModal} navigation={navigation} />
        </Modal>
      </View>
    );
  }
}

class VehiclesTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.icons = [];
  }
  getActiveColor(tabIndex) {
    return this.props.activeTab === tabIndex ? 'rgb(0,100,71)' : 'rgb(164,164,164)';
  }

  icons = [];

  render() {
    return (
      <View style={[styles.tabBar, this.props.style]}>
        {this.props.tabs.map((tab, i) => (
          <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={[styles.tabButton, { borderBottomColor: this.props.activeTab === i ? 'rgb(0,100,1)' : 'transparent' }]}>
            <MaterialCommunityIcons
              name={tab}
              size={28}
              color={this.getActiveColor(i)}
              ref={(icon) => { this.icons[i] = icon; }}
            />
            <Text style={[styles.tabButtonText, { color: this.getActiveColor(i) }]}>{tab === 'history' ? 'HISTORY' : 'FAVORITES'}</Text>
          </TouchableOpacity>))
        }
      </View>
    );
  }
}
