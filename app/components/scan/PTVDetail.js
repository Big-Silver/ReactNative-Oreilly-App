import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Platform,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';

import ConfirmVehicle from './ConfirmVehicle';
import config from '../../config/default.json';

const WINDOW = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0
  },
  header: {
    backgroundColor: '#006447',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  actionIcon: {
    color: '#fff',
    fontSize: 24,
  },
  submitText: {
    fontSize: 16,
    color: '#fff'
  },
  headerTextArea: {
    position: 'absolute',
    width: '100%',
    height: 65,
    left: 15,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  details: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flex: 1,
  },
  ptvImage: {
    resizeMode: 'contain',
    transform: [{ rotate: '0deg' }]
  },
  inputArea: {
    paddingTop: 20
  },
  label: {
    fontSize: 15,
    color: '#777',
    backgroundColor: 'transparent'
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
  },
  correctModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  correctModalContainer: {
    width: 300,
    height: 180,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  correctModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 30
  },
  correctModalSubtitle: {
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
    lineHeight: 40
  },
  modalActionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalAction: {
    marginLeft: 40,
    marginRight: 20
  },
  modalActionText: {
    fontSize: 15,
    color: '#006447',
    textAlign: 'right'
  },
  verticalCenter: {
    height: '100%',
    justifyContent: 'center'
  }
});

export default class PTVDetail extends React.Component {
  state = {
    correctModalVisible: false,
    confirmModalVisible: false,
    plateNumber: this.props.data && this.props.data.plateNumber ? this.props.data.plateNumber : '',
    region: this.props.data && this.props.data.region ? this.props.data.region.toUpperCase() : '',
    topSubmitText: 'SUBMIT',
    submitBtnText: 'SUBMIT',
    pictureWidth: 100,
    pictureHeight: 100,
  }

  componentDidMount() {
    Image.getSize(this.props.uri, (width, height) => {
      this.setState({ pictureWidth: width, pictureHeight: height });
    }, (error) => {
      console.error(`Couldn't get the image size: ${error.message}`);
    });
  }

  onSubmit = () => {
    if (this.state.topSubmitText === 'SAVE') {
      this.setState({ confirmModalVisible: true });
    } else {
      const { plateNumber, region } = this.state;
      console.log(`${config.decodePlateApiUrl}?plateNumber=${plateNumber}&state=${region}`);
      fetch(`${config.decodePlateApiUrl}?plateNumber=${plateNumber}&state=${region}`)
        .then(result => result.json())
        .then((response) => {
          console.log('Plate decode result:', response);
          if (response && response.length > 0) {
            const {
              plate, vin, vinPattern, state, year, vinQuerySet
            } = response[0];
            const details = vinQuerySet[0];
            const { vehicle, attributes } = details;
            this.setState({
              data: {
                plate,
                vinCode: vin,
                vinPattern,
                state,
                year,
                make: vehicle.make,
                model: vehicle.model,
                vehicleId: vehicle.vehicleId,
                subModel: this.getDisplayDescriptionByAttributeName(attributes, 'Submodel'),
                engine: this.getDisplayDescriptionByAttributeName(attributes, 'Engine'),
                scanAt: moment().format('M/D/YYYY')
              },
              correctModalVisible: true
            });
          }
        })
        .catch((error) => {
          console.log('Plate number decode error:', error);
          alert(`Failed in decoding the plate number due to the error:${error.toString()}`);
        });
    }
  }

  getDisplayDescriptionByAttributeName = (source, attr) => {
    let ret = '';
    if (source && attr) {
      const attributeData = source.find(x => x.description === attr);
      if (attributeData.values) {
        const valueData = attributeData.values.find(x => x.attributeId === attributeData.attributeId);
        if (valueData) {
          ret = valueData.displayDescription;
        }
      }
    }
    return ret;
  }

  states = [
    {
      value: '',
      label: 'Select a State'
    }, {
      value: 'AL',
      label: 'Alabama'
    }, {
      value: 'AK',
      label: 'Alaska'
    }, {
      value: 'AZ',
      label: 'Arizona'
    }, {
      value: 'AR',
      label: 'Arkansas'
    }, {
      value: 'CA',
      label: 'California'
    }, {
      value: 'CO',
      label: 'Colorado'
    }, {
      value: 'CT',
      label: 'Connecticut'
    }, {
      value: 'DE',
      label: 'Delaware'
    }, {
      value: 'DC',
      label: 'District Of Columbia'
    }, {
      value: 'FL',
      label: 'Floridaz'
    }, {
      value: 'GA',
      label: 'Georgia'
    }, {
      value: 'HI',
      label: 'Hawaii'
    }, {
      value: 'ID',
      label: 'Idaho'
    }, {
      value: 'IL',
      label: 'Illinois'
    }, {
      value: 'IN',
      label: 'Indiana'
    }, {
      value: 'IA',
      label: 'Iowa'
    }, {
      value: 'KS',
      label: 'Kansas'
    }, {
      value: 'KY',
      label: 'Kentucky'
    }, {
      value: 'LA',
      label: 'Louisiana'
    }, {
      value: 'ME',
      label: 'Maine'
    }, {
      value: 'MD',
      label: 'Maryland'
    }, {
      value: 'MA',
      label: 'Massachusetts'
    }, {
      value: 'MI',
      label: 'Michigan'
    }, {
      value: 'MN',
      label: 'Minnesota'
    }, {
      value: 'MS',
      label: 'Mississippi'
    }, {
      value: 'MO',
      label: 'Missouri'
    }, {
      value: 'MT',
      label: 'Montana'
    }, {
      value: 'NE',
      label: 'Nebraska'
    }, {
      value: 'NV',
      label: 'Nevada'
    }, {
      value: 'NH',
      label: 'New Hampshire'
    }, {
      value: 'NJ',
      label: 'New Jersey'
    }, {
      value: 'NM',
      label: 'New Mexico'
    }, {
      value: 'NY',
      label: 'New York'
    }, {
      value: 'NC',
      label: 'North Carolina'
    }, {
      value: 'ND',
      label: 'North Dakota'
    }, {
      value: 'OH',
      label: 'Ohio'
    }, {
      value: 'OK',
      label: 'Oklahoma'
    }, {
      value: 'OR',
      label: 'Oregon'
    }, {
      value: 'PA',
      label: 'Pennsylvania'
    }, {
      value: 'RI',
      label: 'Rhode Island'
    }, {
      value: 'SC',
      label: 'South Carolina'
    }, {
      value: 'SD',
      label: 'South Dakota'
    }, {
      value: 'TN',
      label: 'Tennessee'
    }, {
      value: 'TX',
      label: 'Texas'
    }, {
      value: 'UT',
      label: 'Utah'
    }, {
      value: 'VT',
      label: 'Vermont'
    }, {
      value: 'VA',
      label: 'Virginia'
    }, {
      value: 'WA',
      label: 'Washington'
    }, {
      value: 'WV',
      label: 'West Virginia'
    }, {
      value: 'WI',
      label: 'Wisconsin'
    }, {
      value: 'WY',
      label: 'Wyoming'
    }
  ];

  handleYesClick = () => {
    this.setState({
      topSubmitText: 'SAVE',
      submitBtnText: 'SAVE VEHICLE',
      correctModalVisible: false,
      confirmModalVisible: true
    });
  }

  closeCorrectModal = () => {
    this.setState({ correctModalVisible: false });
  }

  openConfirmModal = () => {
    if (!this.state.plateNumber) {
      alert('Please enter Plate Number.');
    } else {
      this.setState({ confirmModalVisible: true });
    }
  }

  closeConfirmModal = () => {
    this.setState({ confirmModalVisible: false });
  }

  saveNewVehicle = () => {
    const { plateNumber, region, data } = this.state;
    this.setState({ confirmModalVisible: false });
    this.props.onSave({ ...data, plateNumber, region });
  }

  render() {
    const { uri, onClose } = this.props;
    const {
      plateNumber,
      region,
      topSubmitText,
      submitBtnText,
      correctModalVisible,
      confirmModalVisible,
      data,
      pictureWidth,
      pictureHeight
    } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.headerTextArea}>
            <View style={styles.verticalCenter}>
              <Text style={styles.headerText}>PTV Details</Text>
            </View>
          </View>
          <View style={styles.verticalCenter}>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.verticalCenter}>
            <TouchableOpacity onPress={this.onSubmit}>
              <Text style={styles.submitText}>{ topSubmitText }</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.details}>
          <ScrollView style={{ flex: 1 }}>
            {uri ?
              <View style={{ height: ((WINDOW.width - 36) / pictureWidth) * pictureHeight, width: WINDOW.width - 36 }}>
                <Image source={{ uri }} style={[styles.ptvImage, { width: WINDOW.width - 36, height: ((WINDOW.width - 36) / pictureWidth) * pictureHeight }]} />
              </View>
              : null}

            <View style={styles.inputArea}>
              <Text style={styles.label}>Plate Number</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Plate Number"
                value={plateNumber}
                onChangeText={text => this.setState({ plateNumber: text })}
                style={styles.inputBox}
              />
            </View>

            <View style={styles.inputArea}>
              <Dropdown
                label="State"
                labelFontSize={15}
                data={this.states.map(x => ({ value: x.label }))}
                value={this.states.find(x => x.value === region).label}
                onChangeText={itemValue => this.setState({ region: this.states.find(x => x.label === itemValue).value })}
                rippleOpacity={0}
                animationDuration={0}
              />
            </View>

            <TouchableOpacity onPress={this.onSubmit} style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>{submitBtnText}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Modal animationType="fade" transparent visible={correctModalVisible} onRequestClose={() => console.log('Modal has been closed.')}>
          <CorrectVehicle data={data} onNo={this.closeCorrectModal} onYes={this.handleYesClick} />
        </Modal>

        <Modal animationType="fade" transparent visible={confirmModalVisible} onRequestClose={() => console.log('Modal has been closed.')}>
          <ConfirmVehicle data={data} onSave={this.saveNewVehicle} onCancel={this.closeConfirmModal} />
        </Modal>

      </View>
    );
  }
}

class CorrectVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, onNo, onYes } = this.props;
    console.log(data);
    return (
      <View style={styles.correctModal}>
        <View style={styles.correctModalContainer}>
          <Text style={styles.correctModalTitle}>Is this the correct vehicle?</Text>
          <Text style={styles.correctModalSubtitle}>{`${data.year} ${data.make} ${data.model}`}</Text>
          <View style={styles.modalActionArea}>
            <TouchableOpacity onPress={onNo} style={styles.modalAction}>
              <Text style={styles.modalActionText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onYes} style={styles.modalAction}>
              <Text style={styles.modalActionText}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
