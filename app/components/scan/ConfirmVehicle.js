import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 30,
    paddingVertical: 60
  },
  content: {
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'left',
    color: '#000',
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 'bold'
  },
  details: {
    paddingHorizontal: 18,
    overflow: 'hidden'
  },
  valueLine: {
    paddingVertical: 8
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
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 18
  },
  action: {
    marginLeft: 40,
    marginRight: 20
  },
  actionText: {
    fontSize: 15,
    color: '#006447',
    textAlign: 'right'
  }
});

export default class ConfirmVehicle extends React.Component {
  render() {
    const { data, onCancel, onSave } = this.props;

    console.log(data);
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Confirm New Vehicle</Text>

          <ScrollView contentContainerStyle={styles.details}>
            <View style={styles.valueLine}>
              <Text style={styles.value}>{ data.year }</Text>
              <Text style={styles.label}>Year</Text>
            </View>
            <View style={styles.valueLine}>
              <Text style={styles.value}>{ data.make }</Text>
              <Text style={styles.label}>Make</Text>
            </View>
            <View style={styles.valueLine}>
              <Text style={styles.value}>{ data.model }</Text>
              <Text style={styles.label}>Model</Text>
            </View>
            <View style={styles.valueLine}>
              <Text style={styles.value}>{ data.subModel }</Text>
              <Text style={styles.label}>Submodel</Text>
            </View>
            <View style={styles.valueLine}>
              <Text style={styles.value}>{ data.engine }</Text>
              <Text style={styles.label}>Engine</Text>
            </View>
            <View style={styles.valueLine}>
              <Text style={styles.value}>{ data.vinCode }</Text>
              <Text style={styles.label}>VIN Code</Text>
            </View>
          </ScrollView>

          <View style={styles.actionArea}>
            <TouchableOpacity onPress={onCancel} style={styles.action}>
              <Text style={styles.actionText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} style={styles.action}>
              <Text style={styles.actionText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
