import React from 'react';
import Scan from '../components/scan';

export default class PlateScanScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return <Scan mode="ptv" title="Plate Scan" navigation={navigation} />;
  }
}
