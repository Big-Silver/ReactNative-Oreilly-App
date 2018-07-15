import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight, TouchableWithoutFeedback, Image, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Constants } from 'expo';

const logo = require('../public/logo.png');

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  topBanner: {
    height: 174,
    backgroundColor: '#006447'
  },
  btmHeader: {
    backgroundColor: '#006447',
    paddingTop: 10,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderTopColor: '#fff',
    borderTopWidth: 3,
    marginBottom: 50
  },
  btmHeaderText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  container: {
    flex: 1,
    top: Constants.statusBarHeight,
    backgroundColor: '#fff',
    paddingBottom: 20
  },
  textContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingTop: 16,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderBottomColor: '#929292',
    borderBottomWidth: 2,
    marginLeft: 18,
    marginBottom: 18,
    marginRight: 18
  },
  textContainerFocused: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderStyle: 'solid',
    borderBottomColor: '#006447',
    borderBottomWidth: 2,
    marginLeft: 18,
    marginBottom: 18,
    marginRight: 18
  },
  passContainer: {
    marginBottom: 0
  },
  textLabel: {
    color: '#006447',
    marginLeft: 15,
    marginBottom: 2,
    height: 14
  },
  hideTextLabel: {
    display: 'none'
  },
  textInput: {
    fontSize: 20,
    paddingBottom: 7,
    paddingLeft: 15,
    color: '#adadad',
    paddingRight: 15
  },
  loginButton: {
    backgroundColor: '#fdb014',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
    paddingTop: 18,
    paddingBottom: 18
  },
  loginAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 18,
    marginLeft: 18,
    paddingBottom: 10
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  checkboxInput: {
    borderWidth: 0,
    width: 150,
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent'
  },
  checkboxText: {
    fontWeight: 'normal',
    fontSize: 16
  },
  forgotPassword: {
    color: '#006447',
    fontSize: 16
  },
  bottomDisclaimer: {
    marginTop: 40,
    alignItems: 'center'
  },
  disclaimer: {
    fontSize: 16
  },
  requestAccess: {
    marginTop: 20,
    marginBottom: 25,
    color: '#006447',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTouched: false,
      passTouched: false,
      userVal: '',
      passVal: '',
      keepLoggedIn: false
    };
  }

  onLogin = () => {
    const { userVal, passVal } = this.state;
    const request = {
      username: userVal,
      password: passVal
    };
    this.props.navigation.navigate('Menu');
    console.log(request);
  }

  onBlur = (prop) => {
    this.setState({ [prop]: false });
  }

  onFocus = (prop) => {
    this.setState({ [prop]: true });
  }

  onChange = (val, prop) => {
    this.setState({ [prop]: val });
  }

  render() {
    const {
      userTouched,
      passTouched,
      userVal,
      passVal,
      keepLoggedIn
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topBanner}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.btmHeader}>
            <Text style={styles.btmHeaderText}>FOR PROFESSIONALS</Text>
          </View>
          <View style={userTouched ? styles.textContainerFocused : styles.textContainer}>
            <Text style={userTouched ? styles.textLabel : styles.hideTextLabel}>{userTouched ? 'Username' : ''}</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
              onFocus={() => { this.onFocus('userTouched'); }}
              onBlur={() => { this.onBlur('userTouched'); }}
              onChangeText={(text) => { this.onChange(text, 'userVal'); }}
              value={userVal}
              placeholder={userTouched ? '' : 'Username'}
            />
          </View>
          <View style={passTouched ? styles.textContainerFocused : styles.textContainer}>
            <Text style={passTouched ? styles.textLabel : styles.hideTextLabel}>{passTouched ? 'Password' : ''}</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
              onFocus={() => { this.onFocus('passTouched'); }}
              onBlur={() => { this.onBlur('passTouched'); }}
              secureTextEntry={passTouched || passVal.length > 0}
              onChangeText={(text) => { this.onChange(text, 'passVal'); }}
              value={passVal}
              placeholder={passTouched ? '' : 'Password'}
            />
          </View>
          <View style={styles.loginAction}>
            <CheckBox
              component={TouchableWithoutFeedback}
              checkedIcon="check-square"
              containerStyle={styles.checkboxInput}
              textStyle={styles.checkboxText}
              title="Stay Signed In"
              onPress={() => { this.onChange(!keepLoggedIn, 'keepLoggedIn'); }}
              checked={keepLoggedIn}
            />
            <Text style={styles.forgotPassword} onPress={() => Linking.openURL('https://www.oreillyauto.com/')}>Forgot Password?</Text>
          </View>
          <TouchableHighlight onPress={this.onLogin} underlayColor="white">
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.bottomDisclaimer}>
            <Text style={styles.disclaimer}>Not signed up for First Call Online?</Text>
            <Text style={styles.requestAccess} onPress={() => Linking.openURL('https://www.oreillyauto.com/')}>REQUEST ACCESS&nbsp;&gt;</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
