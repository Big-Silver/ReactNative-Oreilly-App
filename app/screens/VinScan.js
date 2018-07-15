import React from 'react';
import Scan from '../components/scan';

export default class VinScanScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return <Scan mode="vin" title="VIN Scan" navigation={navigation} />;
  }
}
