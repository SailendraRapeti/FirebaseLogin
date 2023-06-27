import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Image} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {TouchableOpacity} from 'react-native-gesture-handler';
import google from './images/google.png';
import facebook from './images/faceBook.png';

interface Iprops {
  navigation: any;
}
// GoogleSignin.configure()
class LoginScreen extends Component<Iprops> {
  state = {
    email: '',
    password: '',
    userDetails: '',
  };

  componentDidMount() {
    GoogleSignin.configure();
  }

  googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("user:",userInfo);
      this.setState({userDetails:userInfo},()=>this.props.navigation.navigate("HomeScreen",{userInfo}))
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => this.setState({email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({password: text})}
        />
        <TouchableOpacity style={styles.input} onPress={this.googleLogin}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 230,
            }}>
            <Image source={google} />
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Login with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={this.googleLogin}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 260,
            }}>
            <Image source={facebook} />
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Login with Facebook
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default LoginScreen;
