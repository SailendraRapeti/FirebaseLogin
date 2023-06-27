import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

type Props = {
  route: any;
};

class HomeScreen extends Component<Props> {
  render() {
    const {user} = this.props.route.params.userInfo;
    console.log('sai', user.email);
    console.log('photo', user.photo);

    return (
      <View style={styles.container}>
        <Text style={{color: 'black', fontSize: 24}}>user Details</Text>
        <Image style={styles.Photo} source={{uri: `${user.photo}`}} />

        <Text style={{color: 'green', fontSize: 18}}>User Email:</Text>
        <Text style={{color: 'black', fontSize: 15}}> {user.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Photo: {
    height: 150,
    width: 150,
  },
});
export default HomeScreen;
