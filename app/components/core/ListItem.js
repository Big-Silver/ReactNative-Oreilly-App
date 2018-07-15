import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WINDOW = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontSize: 18,
    color: '#383838'
  },
  itemContent: {
    fontSize: 16,
    color: '#8b8b8b',
    width: WINDOW.width - 88
  },
  itemLink: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    width: 32
  },
  itemInfo: {
    marginRight: 20
  }
});

export default class Item extends React.Component {
  render() {
    const {
      title, desc, scanAt, linkIcon, onPressItem, onPressIcon
    } = this.props;

    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.itemInfo} onPress={onPressItem}>
          <Text style={styles.itemTitle} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
          <Text style={[styles.itemContent, { paddingVertical: 2 }]} ellipsizeMode="tail" numberOfLines={1}>{desc}</Text>
          <Text style={styles.itemContent} ellipsizeMode="tail" numberOfLines={1}>{scanAt}</Text>
        </TouchableOpacity>
        <View style={styles.itemLink}>
          <TouchableOpacity onPress={onPressIcon}>
            <MaterialIcons name={linkIcon} size={24} color="#006447" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
