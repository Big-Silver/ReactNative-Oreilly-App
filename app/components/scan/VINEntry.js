import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

import ConfirmVehicle from './ConfirmVehicle';
import config from '../../config/default.json';

const HeaderHeight = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: Platform.OS === 'ios' ? Constants.statusBarHeight : 0
  },
  header: {
    backgroundColor: '#006447',
    width: '100%',
    height: HeaderHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  leftSide: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightSide: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  submitText: {
    fontSize: 15,
    color: '#fff',
    marginRight: 15,
    marginTop: 12
  },
  leftIcon: {
    marginLeft: 10,
    marginTop: 10
  },
  headerText: {
    width: '50%',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 7
  },
  details: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  inputArea: {
    paddingTop: 10,
    paddingBottom: 30
  },
  label: {
    fontSize: 15,
    color: '#777'
  },
  inputBox: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.38)'
  },
  submitBtn: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderColor: 'rgba(0,0,0,.6)',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fdb015',
    width: '100%'
  },
  submitBtnText: {
    color: 'rgba(0,0,0,.6)',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'Roboto',
    textAlign: 'center'
  }
});

export default class VINEntry extends React.Component {
  state = {
    confirmModalVisible: false,
    vincode: this.props.code,
    notes: null,
    vehicleInfo: null
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ vincode: nextProps.code });
  }

  openConfirmModal = () => {
    if (!this.state.vincode) {
      alert('Please enter VIN Code.');
      return;
    }
    // Should be implemented with O'reilly's api
    // The following code throws the error as ios does not support to fetch http vs local json file
    const body = {
      platform: Platform.OS,
      deviceId: 'mobile-id', // = Expo.Constants.deviceId
      accountNumber: '347974',
      vinCode: this.state.vincode,
      shopId: '1'
    };
    fetch(config.decodeVinApiUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch((error) => {
        console.log('VIN decode error:', error);
        alert(`Faild in decoding VIN due to the error:${error.toString()}`);
      })
      .then(res => res.json())
      .catch(error => console.log('No response from VIN decode API. error:', error))
      .then((response) => {
        console.log('VIN decode result:', response);
        if (!response.result || response.result === 'false') {
          alert(response.message);
        } else {
          this.setState({
            vehicleInfo: {
              ...response,
              scanAt: moment().format('M/D/YYYY')
            },
            confirmModalVisible: true
          });
        }
      });
  }

  closeConfirmModal = () => {
    this.setState({ confirmModalVisible: false });
  }

  saveNewVehicle = () => {
    const { vehicleInfo, notes } = this.state;
    this.setState({ confirmModalVisible: false });
    this.props.onSave({ ...vehicleInfo, notes });
  }

  render() {
    const { onClose } = this.props;
    const {
      vincode,
      notes,
      vehicleInfo,
      confirmModalVisible
    } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.leftSide}>
            <TouchableOpacity onPress={onClose}>
              <View style={styles.leftIcon}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>VIN Entry</Text>
          <View style={styles.rightSide}>
            <TouchableOpacity onPress={this.openConfirmModal}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.details}>

          <View style={styles.inputArea}>
            <Text style={styles.label}>VIN Code</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder=""
              value={vincode}
              onChangeText={text => this.setState({ vincode: text })}
              style={styles.inputBox}
            />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder=""
              value={notes}
              onChangeText={text => this.setState({ notes: text })}
              style={styles.inputBox}
            />
          </View>

          <TouchableOpacity onPress={this.openConfirmModal} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" transparent visible={confirmModalVisible} onRequestClose={() => console.log('Modal has been closed.')}>
          <ConfirmVehicle data={vehicleInfo} onSave={this.saveNewVehicle} onCancel={this.closeConfirmModal} />
        </Modal>

      </View>
    );
  }
}
