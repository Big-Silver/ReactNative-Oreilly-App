import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';

const WINDOW = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: (Platform.OS === 'ios') ? Constants.statusBarHeight : 0
  },
  header: {
    backgroundColor: '#006447',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '100%',
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftActionArea: {
  },
  rightActionArea: {
    width: 140,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  actionIcon: {
    color: '#fff',
    fontSize: 24
  },
  cartButton: {
    position: 'absolute',
    width: 65,
    height: 65,
    top: (Platform.OS === 'ios') ? 105 + Constants.statusBarHeight : 105,
    right: 18,
    backgroundColor: '#fff',
    borderColor: '#006447',
    borderWidth: 1,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    zIndex: 2
  },
  cartIcon: {
    color: '#006447'
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 28
  },
  subtitle: {
    color: 'rgba(205,205,205,0.8)',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5
  },
  details: {
    position: 'absolute',
    top: 140 + ((Platform.OS === 'ios') ? Constants.statusBarHeight : 0),
    paddingHorizontal: 18,
    paddingTop: 18,
    width: '100%',
    height: WINDOW.height - 225 - Constants.statusBarHeight,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  spec: {
    paddingBottom: 18
  },
  value: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22
  },
  label: {
    fontSize: 15,
    color: '#777',
    lineHeight: 20
  },
  moreInfoBtn: {
    position: 'absolute',
    width: 130,
    left: 18,
    bottom: 18,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderColor: '#006447',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  moreInfoText: {
    color: '#006447',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'Roboto',
    textAlign: 'center'
  },
  resendModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  resendContainer: {
    width: 300,
    height: 120,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  resendTitle: {
    fontSize: 16,
    lineHeight: 30
  },
  modalActionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalAction: {
    marginLeft: 30
  },
  modalActionText: {
    fontSize: 15,
    color: '#006447',
    textAlign: 'right'
  }
});

export default class VehicleDetail extends React.Component {
  state = {
    modalVisible: false,
    visibleMoreInfo: false
  };

  toggleMoreInfo = () => {
    this.setState({ visibleMoreInfo: !this.state.visibleMoreInfo });
  }

  flattenArray = (data) => {
    const attributes = [{
      label: 'Year',
      value: data.year
    }, {
      label: 'Make',
      value: data.make
    }, {
      label: 'Model',
      value: data.model
    }, {
      label: 'Submodel',
      value: data.subModel
    }, {
      label: 'Engine',
      value: data.engine
    }, {
      label: 'VIN Code',
      value: data.vinCode
    }];
    if (data.moreInfo && this.state.visibleMoreInfo) {
      attributes.push({
        label: 'More Info',
        value: data.moreInfo
      });
    }
    return attributes;
  }

  keyExtractor = (item, index) => {
    return index;
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.spec}>
        <Text style={styles.value}>{item.value}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );
  }

  render() {
    const { data, onClose, onAddToCart } = this.props;
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.actions}>
            <View style={styles.leftActionArea}>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons name="close" style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.rightActionArea}>
              <TouchableOpacity onPress={() => { alert('Delete this vehicle!'); }}>
                <MaterialCommunityIcons name="delete" style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }); }}>
                <MaterialCommunityIcons name="send" style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { alert('Will you star this vehicle?'); }}>
                <MaterialCommunityIcons name="star-outline" style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.title}>{`${data.year} ${data.make} ${data.model}`}</Text>
            <Text style={styles.subtitle}>{`Scanned ${data.scanAt}`}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onAddToCart} style={styles.cartButton}>
          <MaterialIcons name="add-shopping-cart" size={32} style={styles.cartIcon} />
        </TouchableOpacity>

        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          style={styles.details}
          data={this.flattenArray(data)}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        {data.isMore ?
          <TouchableOpacity onPress={this.toggleMoreInfo} style={styles.moreInfoBtn}>
            <Text style={styles.moreInfoText}>MORE INFO</Text>
          </TouchableOpacity>
          : null}

        <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => console.log('Modal has been closed.')}>
          <View style={styles.resendModal}>
            <View style={styles.resendContainer}>
              <Text style={styles.resendTitle}>Resend vehicle information?</Text>
              <View style={styles.modalActionArea}>
                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); }} style={styles.modalAction}>
                  <Text style={styles.modalActionText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); }} style={styles.modalAction}>
                  <Text style={styles.modalActionText}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
