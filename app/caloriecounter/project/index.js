import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import Coin from "./assets/coin.gif"

import { connect } from "react-redux";
import { userMoney } from '../../redux/actions';



const DATA = [
  {key: 'Money',name: 'Wallet',value: '',},
  {key: "Money", name: 'Todays',value: 1234,},
  {key: "Money",name: 'Test', value: 1234,},
];



class CalorieCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Money: '',
      Todays: 5,
      Username: '',
    };
  }

  componentDidMount = () => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/test/user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'money',
        username: this.props.user.username,
      })
    }).then((response) => response.json())
      .then((res) => {
          this.setState({Money: res.money})
          this.setState({Todays: this.props.user.todays})
          this.props.userMoney(this.state.Money); //money saved this.props.user.money
      })
  }

  renderItem = ({ item }) => {

    if (item.name == "Wallet") {
      return (
        <React.Fragment>
          <View style={css.separator}>
            <Text style={css.name}>{item.name}</Text>
          </View>
          <View style={css.separator}>
            <Text
              style={css.name}
              numColumns={2}
            >{this.state.Money}</Text>
          </View>
        </React.Fragment>
      )
    }
    else if (item.name == "Todays") {
      return (
        <React.Fragment>
          <View style={css.separator}>
            <Text style={css.name}>{item.name}</Text>
          </View>
          <View style={css.separator}>
            <Text
              style={css.name}
              numColumns={2}
            >{this.state.Todays}</Text>
          </View>
        </React.Fragment>
      )
    }

  }
  render() {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <LinearGradient
          colors={["#283c86", "#45a247"]}
          style={css.linearGradient}
        >
          <View style={css.header}>
            <Text style={css.topfont}>Currency Counter</Text>
            {/* <Text style={css.topfont}>{this.props.user.username}</Text> */}
          </View>
          <FlatList
            data={DATA}
            contentContainerStyle={{ flexDirection: "column" }}
            renderItem={this.renderItem}
            numColumns={2}
          />
          <Image style={css.coin} source={Coin} />
        </LinearGradient>
      </React.Fragment>
    );
  }
}



const css = StyleSheet.create({
  name: {
    flex: 1,
    fontSize: 23.5,
    textAlign: "center",
    color: 'white',
  },
  value: {
    flex: 1,
    fontSize: 22,
    textAlign: "center",
    color: 'blue',
  },
  separator: {
    flex: 2,
    borderWidth: 3,
    borderColor: 'black',
    textAlign: "center",
    marginBottom: "40%",
  },
  linearGradient: {
    height: 3,
    flex: 1,
  },
  linearGradient2: {
    flex: 1,
    borderRadius: 20,
  },
  header: {
    flexBasis: 60,
    borderWidth: 3,
    borderColor: 'black',
    height: 26,
    margin: 45,
    borderRadius: 26,
  },
  topfont: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 34,
    color: 'white',
  },
  coin: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "25%"
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
}


const mapDispatchToProps = {
  userMoney,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalorieCounter);