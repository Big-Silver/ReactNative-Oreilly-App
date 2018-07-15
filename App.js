import React from 'react';
import { StyleSheet, View, Linking, Platform, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import QueryString from 'query-string';
import moment from 'moment';
import Config from './app/config/default.json';
import { OReillyApp } from './app/config/router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default class App extends React.Component {
  state = {
    isLoggedIn: true,
  };

  componentDidMount() {
    if (!this.state.isLoggedIn) {
      this.authenticate();
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  getAuthorization = (code) => {
    console.log('OAuth getToken Url: ', Config.oauth.tokenUrl);
    const body = {
      redirect_uri: Constants.linkingUri,
      client_id: Config.oauth.clientId,
      grant_type: 'authorization_code',
      code,
      scope: Config.oauth.scope
    };
    return fetch(Config.oauth.tokenUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  checkTokenExpired = () => {
    if (moment().unix() > this.auth.expiresAt) {
      return true;
    }
    return false;
  }

  doLoginWithToken = () => {
    if (this.checkTokenExpired()) {
      console.log('The access_token has expired. try to get new token with refresh_token.');
    } else {
      this.setState({ isLoggedIn: true });
    }
  }

  handleOpenURL = (event) => {
    console.log(`handleOpenURL(${JSON.stringify(event)})`);
    const query = event.url.match(/\?(.*)/);
    if (query) {
      const { code, state } = QueryString.parse(query[1]);
      console.log(`code:${code}, state:${state}`);

      if (code && state && state === Config.oauth.state) {
        if (state === Config.oauth.state) {
          const body = {
            redirect_uri: Constants.linkingUri,
            client_id: Config.oauth.clientId,
            grant_type: 'authorization_code',
            code,
            scope: Config.oauth.scope
          };
          fetch(Config.oauth.tokenUrl, {
            method: 'POST',
            body: QueryString.stringify(body),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response => {
            console.log('authorized:', response);
            this.auth = { ...response };
            this.auth.expiresAt = moment().unix() + auth.expires_in;
            this.doLoginWithToken();
            if (Platform.OS === 'ios') {
              // Linking.removeEventListener('url', this.handleOpenURL);
            }
          }).catch(error => {
            console.log('getAuthorization() error:', error.request);
          });
        }
      }
    }
  }

  authenticate() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        this.handleOpenURL({ url });
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }

    const authUrl = `${Config.oauth.authorizationUrl}?${QueryString.stringify({
      client_id: Config.oauth.clientId,
      redirect_uri: Constants.linkingUri,
      response_type: Config.oauth.response_type,
      scope: Config.oauth.scope,
      state: Config.oauth.state
    })}`;

    Linking.canOpenURL(authUrl).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${authUrl}`);
      } else {
        console.log(`Redirecting to ${authUrl}`);
        Linking.openURL(authUrl)
          .catch(error => console.log(`Can't open url: ${error}`))
          .then(() => {
            console.log('success in linking');
          });
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <View style={styles.container}>
        { isLoggedIn ?
          <OReillyApp />
          :
          <ActivityIndicator size="large" color="#00ff00" />
        }
      </View>
    );
  }
}
