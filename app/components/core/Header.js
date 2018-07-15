import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Constants } from 'expo';

const HeaderHeight = 45;
const styles = StyleSheet.create({
  header: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#0a6348',
    height: HeaderHeight,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerText: {
    width: '70%',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  leftSide: {
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightSide: {
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  leftIcon: {
    marginLeft: 10
  },
  rightIcon: {
    marginRight: 15
  }
});

export default class Header extends React.Component {
  state = {
    menuStatus: 'DrawerClose'
  };

  toggleMenu = () => {
    const { navigation } = this.props;
    const { menuStatus } = this.state;
    const newMenuState = menuStatus === 'DrawerOpen' ? 'DrawerClose' : 'DrawerOpen';
    navigation.navigate(newMenuState);
  }

  render() {
    const {
      title, leftIcon, rightIcon, rightAction
    } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.leftSide}>
          {(() => {
            switch (leftIcon) {
            case 'menu':
              return (
                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                  <View style={styles.leftIcon}>
                    <MaterialCommunityIcons name="menu" size={30} color="#fff" />
                  </View>
                </TouchableWithoutFeedback>
              );
            case 'back':
              return (
                <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Vehicles', { screenMode: 'history' }); }}>
                  <View style={styles.leftIcon}>
                    <Ionicons name="ios-arrow-back" size={30} color="#fff" />
                  </View>
                </TouchableWithoutFeedback>
              );
            default:
              return null;
            }
          })()}
        </View>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.rightSide}>
          {(() => {
            switch (rightIcon) {
            case 'flash': case 'flash-off': case 'flash-auto':
              return (
                <TouchableOpacity onPress={() => { rightAction(); }}>
                  <View style={styles.rightIcon}>
                    <MaterialCommunityIcons name={rightIcon} size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              );
            case 'search':
              return (
                <TouchableOpacity onPress={() => { rightAction(); }}>
                  <View style={styles.rightIcon}>
                    <MaterialIcons name="search" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              );
            default:
              return null;
            }
          })()}
        </View>
      </View>
    );
  }
}
