import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner, Camera, Permissions, Constants } from 'expo';

import Header from '../core/Header';
import PTVDetail from './PTVDetail';
import VINEntry from './VINEntry';
import VehicleDetail from '../../screens/VehicleDetail';
import config from '../../config/default.json';

const WINDOW = Dimensions.get('window');
const HeaderHeight = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scanArea: {
    position: 'absolute',
    left: 0,
    top: HeaderHeight + Constants.statusBarHeight,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: -1
  },
  actionArea: {
    position: 'absolute',
    width: 65,
    height: 130,
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  cameraButton: {
    backgroundColor: '#fdb015',
    width: 65,
    height: 65,
    borderRadius: 65,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 2
  },
  cameraIcon: {
    marginTop: 2,
    backgroundColor: 'transparent'
  },
  editArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  editIcon: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  vinScanArea: {
    flex: 1
  },
  scanRect: {
    width: (Platform.OS === 'ios') ? 100 : (WINDOW.width - 40),
    height: (Platform.OS === 'ios') ? (WINDOW.height - (Constants.statusBarHeight * 2) - HeaderHeight) : (WINDOW.height - Constants.statusBarHeight - HeaderHeight - 160),
    position: 'absolute',
    left: (Platform.OS === 'ios') ? (WINDOW.width - 100) / 2 : 20,
    top: (Platform.OS === 'ios') ? Constants.statusBarHeight * 0.5 : 80,
    borderWidth: 3,
    borderColor: 'rgba(255,0,0,.85)'
  },
  centerLine: {
    width: (Platform.OS === 'ios') ? 2 : WINDOW.width,
    height: (Platform.OS === 'ios') ? WINDOW.height - Constants.statusBarHeight - HeaderHeight : 2,
    position: 'absolute',
    left: (Platform.OS === 'ios') ? WINDOW.width * 0.5 : 0,
    top: (Platform.OS === 'ios') ? 0 : (WINDOW.height - Constants.statusBarHeight - HeaderHeight) / 2,
    backgroundColor: 'rgba(212,0,0,0.3)'
  }
});

export default class Scan extends React.Component {
  state = {
    flashStatus: 'off',
    hasCameraPermission: null,
    modalVisible: false,
    scannedCode: null,
    vehicleInfo: null,
    picture: null,
    detailModalVisible: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeRead = ({ type, data }) => {
    console.log(type, data);
    this.setState({
      scannedCode: data.substring(0),
      modalVisible: true
    });
  }

  handleFlash = () => {
    this.setState({ flashStatus: this.state.flashStatus === 'off' ? 'on' : 'off' });
  };

  openDetailModal = () => {
    this.setState({ modalVisible: true });
  }

  closeDetailModal = () => {
    this.setState({ modalVisible: false });
  }

  handleVehicleDetailClose = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('Vehicles');
  }

  takePicture = async () => {
    if (this.camera) {
      this.camera.takePictureAsync().then((data) => {
        if (data) {
          const formData = new FormData();
          formData.append('file', {
            uri: data.uri,
            type: 'image/jpeg',
            name: data.uri.split('/').pop()
          });

          fetch(`${config.apiBaseUrl}/license-plate`, {
            method: 'post',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data;'
            }
          })
            .catch((err) => {
              // alert('We couldn\'t parse your plate, please try with better image');
              console.log('failed in uploading image to api. error:', err);
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then((response) => {
              console.log('successful response: ');
              console.log(response);
              if (response && response.length > 0) {
                const { bestPlate } = response[0];
                this.setState({
                  picture: data.uri,
                  vehicleInfo: {
                    plateNumber: bestPlate.characters,
                    region: response[0].region
                  },
                  modalVisible: true
                });
              } else {
                alert('We couldn\'t find the information for your vehicle. please try again.');
                console.log('The vehicle has not found.');
              }
            });
        }
      });
    }
  };

  handleAddToCart = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('Catalog');
  }

  handleVehicleSave = (vehicleInfo) => {
    setTimeout(() => {
      this.setState({ vehicleInfo, modalVisible: false, detailModalVisible: true });
    }, 100);
  }

  render() {
    const { mode, title, navigation } = this.props;
    const {
      flashStatus, hasCameraPermission, scannedCode, picture, modalVisible, vehicleInfo, detailModalVisible
    } = this.state;

    // console.log('index.js render() vehicleInfo:', vehicleInfo);
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Header title={title} leftIcon="back" navigation={navigation} rightIcon={flashStatus === 'on' ? 'flash' : 'flash-off'} rightAction={this.handleFlash} />
        <View style={styles.scanArea}>
          { mode === 'ptv' ?
            <Camera
              ref={(ref) => { this.camera = ref; }}
              style={{ flex: 1 }}
            />
            : mode === 'vin' || mode === 'shop' ?
              <View style={styles.vinScanArea} >
                <BarCodeScanner
                  onBarCodeRead={this.handleBarCodeRead}
                  torchMode={flashStatus}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.scanRect} />
                <View style={styles.centerLine} />
              </View>
              : null
          }
        </View>
        <View style={styles.actionArea}>
          <View style={styles.editArea}>
            <TouchableOpacity onPress={this.openDetailModal}>
              <View style={styles.editIcon}>
                <MaterialCommunityIcons name="pencil" style={{ backgroundColor: 'transparent' }} size={36} color="#666" />
              </View>
            </TouchableOpacity>
          </View>
          {mode === 'ptv' ?
            <TouchableOpacity onPress={this.takePicture}>
              <View style={styles.cameraButton}>
                <MaterialCommunityIcons name="camera-iris" style={styles.cameraIcon} size={36} color="#fff" />
              </View>
            </TouchableOpacity>
            : null
          }
        </View>

        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={false}
          onRequestClose={() => { console.log('Modal has been closed in Scan.'); }}
        >
          {mode === 'ptv' ?
            <PTVDetail uri={picture} data={vehicleInfo} onClose={this.closeDetailModal} onSave={this.handleVehicleSave} />
            : mode === 'vin' || mode === 'shop' ?
              <VINEntry code={scannedCode} onClose={this.closeDetailModal} onSave={this.handleVehicleSave} />
              : null
          }
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={detailModalVisible}
          onRequestClose={() => { console.log('Modal has been closed in Scan.'); }}
        >
          <VehicleDetail data={vehicleInfo} onClose={this.handleVehicleDetailClose} onAddToCart={this.handleAddToCart} />
        </Modal>

      </View>
    );
  }
}
