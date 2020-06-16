import React, { Component, useState } from 'react';
import { Button, ScrollView, Text, View, StyleSheet, Alert, TextInput, Keyboard, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import FriendItem from './friendItem';
import { LinearGradient } from "expo-linear-gradient";


import { connect } from "react-redux";
import { loginUser } from '../../redux/actions';

var friend = {name: '', friend_status: 0, action_user: '', challenge: null};
var challenger = {name: '', chal_status: 0, action_user: '', winner: null};

class FriendsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      friendslist: [],
      friendcount: 0,
      frienddisplay: true,
      Search: '',
      searchlist: [],
      searchcount: 0,
      searchdisplay: false,
      challengelist: [],
      challengedisplay: false,
      challenge_count: 0
    };
    this.renderList = this.renderList.bind(this);
    this.fetchFriends = this.fetchFriends.bind(this);
    this.acceptPessHandler = this.acceptPessHandler.bind(this);
    this.challengePressHandler = this.challengePressHandler.bind(this);
    this.fetchChallenges = this.fetchChallenges.bind(this);
  }

  componentDidMount = () => {
    this.fetchFriends();
  }

  fetchFriends = () =>{
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/friend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'friends',
        user: this.props.user.username,
      })
    }).then((response) => response.json())
      .then((res) => {
          //console.log( res.friends);
          let i = 0;
          var count = 0;
          var chal_count = 0;
          var newFriendlist = [];
          for (i in res.friends){
            count = count + 1;
            //console.log("in loop");
            let j = 0;
            for (j in res.friends[i].friendstats){
              //console.log("inner loop");
              //console.log(j + ' ' + res.friends[i].friendstats[j]);
              if (j == "username"){
                friend_name = res.friends[i].friendstats[j];
                console.log(j + ' ' + res.friends[i].friendstats[j]);
              }
            }
            friend = {name: friend_name, friend_status: res.friends[i].STATUS, action_user: res.friends[i].ACTION_USER, challenge: res.friends[i].CHALLENGE}; 
            newFriendlist.push(friend);
            if (res.friends[i].CHALLENGE != 0){
              chal_count++;
            }
          }
          this.setState({friendslist: newFriendlist});
          this.setState({friendcount: count});
          this.setState({challenge_count: chal_count});
          this.setState({frienddisplay: true});
          this.setState({searchdisplay: false});
          this.setState({challengedisplay: false});
      })
  }
  

  renderList = () => {
    if (this.state.frienddisplay){
      return (
        <FlatList
        keyExtractor={(item) => item.name}
        data = {this.state.friendslist}
        renderItem={({ item }) => (
          <FriendItem item={item} friendsPessHandler={this.friendsPessHandler} acceptPessHandler={this.acceptPessHandler} removeFriend={this.removeFriend} addFrendPressHandler={this.addFrendPressHandler} pendingPessHandler={this.pendingPessHandler} challengePressHandler={this.challengePressHandler}/>
        )}
        />
      );
    }else if (this.state.searchdisplay){
      if(this.state.renderList === undefined || this.state.renderList.length == 0){
        return (<Text>No users found for that search</Text>);
      }
      return (
        <FlatList
        keyExtractor={(item) => item.name}
        data = {this.state.renderList}
        renderItem={({ item }) => (
          <FriendItem item={item} friendsPessHandler={this.friendsPessHandler} acceptPessHandler={this.acceptPessHandler} removeFriend={this.removeFriend} addFrendPressHandler={this.addFrendPressHandler} pendingPessHandler={this.pendingPessHandler} challengePressHandler={this.challengePressHandler}/>
        )}
        />
      );
    }else {
      return (
        <FlatList
        keyExtractor={(item) => item.name}
        data = {this.state.challengelist}
        renderItem={({ item }) => (
          <FriendItem item={item} friendsPessHandler={this.friendsPessHandler} acceptPessHandler={this.acceptPessHandler} removeFriend={this.removeFriend} addFrendPressHandler={this.addFrendPressHandler} pendingPessHandler={this.pendingPessHandler} challengePressHandler={this.challengePressHandler} acceptChalPressHandler={this.acceptChalPressHandler} removeChalHandler={this.removeChalHandler}/>
        )}
        />
      );
    }
  }

  challengePressHandler = (name) => {
    Alert.alert(
      'Challenge friend?',
      'Challenge ' + name + ' to a burn off? First to 1000 caloires wins!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed')
        },
        {
          text: 'Confirm',
          onPress: () => {this.challengeFriend(name)}
        }
      ]
    )
  }

  challengeFriend = (name) => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/challenge.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'challenge',
        requester: this.props.user.username,
        requestie: name,
        challengestat: 0,
      })
    }).then((response) => response.json())
      .then((res) => {
         
      })
    this.setState({searchdisplay: false});
    this.fetchFriends();
  }

  fetchChallenges = () => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/challenge.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'challenges',
        user: this.props.user.username
      })
    }).then((response) => response.json())
      .then((res) => {
          let i = 0;
          var newSearchlist = [];
          for (i in res.challengers){   
            if (this.state.userName != res.challengers[i].USER_ONE){
              challenger = {name: res.challengers[i].USER_TWO, chal_status: res.challengers[i].STATUS, action_user: res.challengers[i].ACTION_USER, winner: res.challengers[i].WINNER}; 
              newSearchlist.push(challenger);
            }else {
              challenger = {name: res.challengers[i].USER_ONE, chal_status: res.challengers[i].STATUS, action_user: res.challengers[i].ACTION_USER, winner: res.challengers[i].WINNER}; 
              newSearchlist.push(challenger);
            }
          }
          this.setState({challenge_count: res.challenge_count});
          this.setState({challengelist: newSearchlist});
          this.setState({challengedisplay: true});
          this.setState({searchdisplay: false});
          this.setState({frienddisplay: false});
      })
  }

  acceptChalPressHandler = (name) => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/challenge.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'challenge',
        requester: this.props.user.username,
        requestie: name,
        challengestat: 1,
      })
    }).then((response) => response.json())
      .then((res) => {
         console.log("here");
      })
    this.setState({searchdisplay: false});
    this.setState({challengedisplay: true});
    this.setState({frienddisplay: false});
    this.fetchChallenges();
  }

  removeChalHandler = (name) => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/challenge.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'remove',
        deleter: this.props.user.username,
        deletie: name,
      })
    }).then((response) => response.json())
      .then((res) => {
         
      })
    this.setState({searchdisplay: false});
    this.setState({challengedisplay: true});
    this.setState({frienddisplay: false});
    this.fetchChallenges();
  }
  

  friendsPessHandler = (name) => {
    Alert.alert(
      'Remove friend?',
      'Are you sure you want to remove ' + name + ' as a friend?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed')
        },
        {
          text: 'Confirm',
          onPress: () => {this.removeFriend(name)}
        }
      ]
    )
  }

  pendingPessHandler = (name) => {
    Alert.alert(
      'Revoke friend request?',
      'Are you sure you want to revoke friend request to ' + name + '?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed')
        },
        {
          text: 'Confirm',
          onPress: () => {this.removeFriend(name)}
        }
      ]
    )
  }

  addFrendPressHandler = (name) => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/friend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'add friend',
        requester: this.props.user.username,
        requestie: name,
        friendstatus: 0,
      })
    }).then((response) => response.json())
      .then((res) => {
         console.log("here");
      })
    this.setState({searchdisplay: false});
    this.setState({challengedisplay: false});
    this.setState({frienddisplay: true});
    this.fetchFriends();
  }

  removeFriend = (name) => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/friend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'remove',
        deleter: this.props.user.username,
        deletie: name,
      })
    }).then((response) => response.json())
      .then((res) => {
         
      })
    this.setState({searchdisplay: false});
    this.setState({challengedisplay: false});
    this.setState({frienddisplay: true});
    this.fetchFriends();
  }

  acceptPessHandler = (name, status) => {
    console.log('accepted friend request');
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/friend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'add friend',
        requester: this.props.user.username,
        requestie: name,
        friendstatus: status,
      })
    }).then((response) => response.json())
      .then((res) => {
         
      })
    this.fetchFriends();
  }

  onSearch = () => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/friend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'search friend',
        user: this.props.user.username,
        search: this.state.Search,
      })
    }).then((response) => response.json())
      .then((res) => {
          let i = 0;
          var newSearchlist = [];
          for (i in res.results){      
            user = {name: res.results[i].username, friend_status: res.results[i].friendstatus, action_user: res.results[i].action_user}; 
            newSearchlist.push(user);
          }
          this.setState({renderList: newSearchlist});
          this.setState({searchcount: res.resultscount});
          this.setState({searchdisplay: true});
          this.setState({challengedisplay: false});
          console.log(this.state.searchcount);
      })
  }

  render() {
    return (
      // <TouchableWithoutFeedback onPress={() =>{
      //   Keyboard.dismiss();
      // }}>
        <View style={styles.container}>

            <View style={styles.tabView}>
              <Text style={styles.userName}>{this.props.user.username}</Text>
              <EvilIcons name='user' size={50} color='black' />
            </View>

            <View style={styles.friendNav}>
              <TouchableWithoutFeedback onPress={() => {this.setState({searchdisplay: false}); this.setState({challengedisplay: false}); this.setState({frienddisplay: true}); this.fetchFriends()}}>
                <View style={[
                    this.state.frienddisplay ?  {
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    } : {
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }
                  ]}>
                  <Text style={[
                    this.state.frienddisplay ?  {
                      fontSize: 18,
                      fontWeight: 'bold',
                    } : {
                      color: '#D5D5C8',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }
                  ]}>{this.state.friendcount} Friends</Text>
                </View>
                </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.setState({searchdisplay: true}); this.setState({challengedisplay: false}); this.setState({frienddisplay: false});}}>
                <View style={[
                    this.state.searchdisplay ?  {
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    } : {
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }
                  ]}>
                  <Text style={[
                    this.state.searchdisplay ?  {
                      fontSize: 18,
                      fontWeight: 'bold',
                    } : {
                      color: '#D5D5C8',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }
                  ]}>Searched</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.setState({searchdisplay: false}); this.setState({challengedisplay: true}); this.setState({frienddisplay: false}); this.fetchChallenges()}}>
              <View style={[
                    this.state.challengedisplay ?  {
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    } : {
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }
                  ]}>
                  <Text style={[
                    this.state.challengedisplay ?  {
                      fontSize: 18,
                      fontWeight: 'bold',
                    } : {
                      color: '#D5D5C8',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }
                  ]}>{this.state.challenge_count} Challenges</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.searchBarView}>
              <TextInput 
              style={styles.searchBar}
              placeholder='Search Friends' 
              hitSlop={{ top: 10, left: 2000, bottom: 10, right: 2000 }}
              maxLength={40}
              onChangeText={(Search) => { this.setState({ Search: Search }) }}
              />
              <EvilIcons name='search' size={45} color='black' onPress={() => { this.onSearch(); this.setState({challengedisplay: false}); this.setState({frienddisplay: false}); }}/>
            </View>

        
            {this.renderList()}

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  tabView: {
    color: 'black',
    backgroundColor: 'white',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6E3'
  },
  userName: {
    color: 'black',
    paddingLeft: 50,
    fontWeight: 'bold',
    fontSize: 18,
  },
  friendNav: {
    alignItems: 'center',
    height: '8%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5C8',
    justifyContent: 'space-evenly',

  },
  friendNum: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggested: {
    color: '#D5D5C8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendSelected: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  notSelected: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchBar: {
    fontSize: 14,
		paddingHorizontal: 8,
    paddingLeft: 30,
    alignContent: 'center',
    flex: 1,
  },
  searchBarView: {
    flexDirection: 'row',
    height: '8%',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 10,
    marginRight: 30,
  },
  friendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'pink',
    fontSize: 20,
  },
  friendList:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
}


//const mapDispatchToProps = {
//  loginUser,
//}

export default connect(mapStateToProps, null)(FriendsList);