import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import Login from '../../loginpage/project';



const data = [
  { key: 'UserLabel', val: "Username", type: 'text' },
  { key: 'PassLabel', val: "Password", type: 'text' },
  { key: 'PassConfLabel', val: "ConfirmPass", type: 'text' },
  { key: 'SubmitButt', val: 'Create Account', type: 'button' },
];

const numColumns = 1;
export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      message: '',
    }
  }






  onPressButton = () => {
    if (this.state.password === this.state.confirm) {
      console.log(this.state)
      fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: 'register',
          username: this.state.username,
          password: this.state.password,
          message: '',
        })
      }).then((response) => response.json())
        .then((res) => {
          if (res.message === 'Account Successfully Created') {
            alert(res.message),
            this.props.parentCallback();
          } else {
            alert(res.message)
          }
        })
    }
    else {
      alert("Passwords Don't Match, Try Again")
    }
  }




  renderItem = ({ item }) => {
    let { username, password, confirm } = this.state;
    if (item.type === "text") {
      if (item.val == "Username") {
        return (
          <View style={styles.item}>
            <TextInput
              style={{ color: "white" }}
              placeholder={item.val}
              maxLength={15}
              onChangeText={(username) => { this.setState({ username: username }) }}
            />
          </View>
        )
      }
      else if (item.val == "Password") {
        return (
          <View style={styles.item}>
            <TextInput
              secureTextEntry={true}
              style={{ color: "white" }}
              placeholder={item.val}
              maxLength={25}
              onChangeText={(password) => { this.setState({ password: password }) }}
            />
          </View>
        )
      }
      else if (item.val == "ConfirmPass") {
        return (
          <View style={styles.item}>
            <TextInput
              secureTextEntry={true}
              style={{ color: "white" }}
              placeholder={item.val}
              maxLength={25}
              onChangeText={(confirm) => { this.setState({ confirm: confirm }) }}
            />
          </View>
        )
      }
    } else if (item.type === "label") {
      return (
        <View style={styles.label}>
          <Text style={styles.labelText}>{item.val}</Text>
        </View>
      )
    } else if (item.type === "button") {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            hitSlop={{ top: 10, left: 2000, bottom: 10, right: 2000 }}
            onPress={() => { this.onPressButton() }}
          >
            <Text style={{ color: "white" }}
            >{item.val}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  render() {
    if (this.state.toLogin === true) {
      //return <Redirect to='/Login' />
      return(
        this.state.View = <Login/>
      )
    }
    else {
      return (
        <LinearGradient
          colors={["#283c86", "#45a247"]}
          style={styles.linearGradient}
        >
          <React.Fragment>
            <View style={styles.margin}>
              <Text style={styles.title}>
                Create Account
        </Text>
            </View>
            <FlatList
              data={data}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </React.Fragment>
        </LinearGradient>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / numColumns / 8,
  },
  itemText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / numColumns / 2, // approximate a square
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 2,
    marginBottom: 5,
    borderColor: '#DDD',
    borderRadius: 10,
    height: Dimensions.get('window').width / numColumns / 8,
  },

  labelText: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  margin: {
  },
  title: {
    marginTop: '60%',
    marginBottom: "10%",
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fff'
  },
  linearGradient: {
    flex: 1
  },
});