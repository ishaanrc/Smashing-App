import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, TouchableOpacity, Alert} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";


export default function FriendItem({ item, friendsPessHandler, acceptPessHandler, removeFriend, addFrendPressHandler, pendingPessHandler, challengePressHandler, removeChalHandler, acceptChalPressHandler}) {
  // console.log(item.name);
  // console.log(item.friend_status);
  // console.log(item.challenge);
  // console.log(" winner" + item.winner);
  if (item.winner === undefined){
    if (item.friend_status == 2 && item.challenge == 0){ //they are both friends
      return (
            <LinearGradient
            colors={["#DC2424", "#4A569D"]}
            style={styles.friendContainer}
            >
                    <View style={styles.friendList}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                      <Entypo name='user' size={50} color='white' />
                    </View>
                    <View style={styles.friendList}>
                    <TouchableOpacity style={styles.adtouch} onPress={() => {challengePressHandler(item.name)}}>
                        <View style={styles.friendsButton}>
                          <Text style={styles.buttonText}>Challenge</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.adtouch} onPress={() => {friendsPessHandler(item.name)}}>
                        <View style={styles.friendsButton}>
                          <Text style={styles.buttonText}>Friends</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
               
              </LinearGradient>
      )
    }else if (item.friend_status == 2){ //they are both friends
      return (
            <LinearGradient
            colors={["#DC2424", "#4A569D"]}
            style={styles.friendContainer}
            >
                    <View style={styles.friendList}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                      <Entypo name='user' size={50} color='white' />
                    </View>
                    <View style={styles.friendList}>
                      <TouchableOpacity style={styles.touch} onPress={() => {friendsPessHandler(item.name)}}>
                        <View style={styles.friendsButton}>
                          <Text style={styles.buttonText}>Friends</Text>
                        {/* <Button title='Friends' /> */}
                        {/* <Button title='Challenge' /> */}
                        </View>
                      </TouchableOpacity>
                    </View>
               
              </LinearGradient>
      )
    } else if (item.friend_status == 1 && item.name == item.action_user){ //pending friend request accept or deny
      return (
        <LinearGradient
          colors={["#DC2424", "#4A569D"]}
          style={styles.friendContainer}
          >
                    <View style={styles.friendList}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                      <Entypo name='user' size={50} color='white' />
                    </View>
                    <View style={styles.friendList}>
                      <TouchableOpacity style={styles.adtouch} onPress={() => {removeFriend(item.name)}}>
                          <View style={styles.declineButton}>
                            <Text style={styles.buttonText}>Decline</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.adtouch} onPress={() => {acceptPessHandler(item.name, item.friend_status)}}>
                          <View style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Accept</Text>
                          </View>
                      </TouchableOpacity>
                    </View>
          </LinearGradient>
      )
    } else if (item.friend_status == 1 && item.name != item.action_user){ //pending friend request waiting for other user
      return (
        <LinearGradient
        colors={["#DC2424", "#4A569D"]}
        style={styles.friendContainer}
        >
                <View style={styles.friendList}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                  <Entypo name='user' size={50} color='white' />
                </View>
                <View style={styles.friendList}>
                  <TouchableOpacity style={styles.touch} onPress={() => {pendingPessHandler(item.name)}}>
                    <View style={styles.pendingButton}>
                      <Text style={styles.buttonText}>Pending</Text>
                    {/* <Button title='Friends' /> */}
                    {/* <Button title='Challenge' /> */}
                    </View>
                  </TouchableOpacity>
                </View>
           
          </LinearGradient>
      )
    } else if (item.friend_status == 0){
      return (
        <LinearGradient
        colors={["#DC2424", "#4A569D"]}
        style={styles.friendContainer}
        >
                <View style={styles.friendList}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                  <Entypo name='user' size={50} color='white' />
                </View>
                <View style={styles.friendList}>
                  <TouchableOpacity style={styles.addtouch} onPress={() => {addFrendPressHandler(item.name)}}>
                    <View style={styles.addButton}>
                      <Text style={styles.buttonText}>Add Friend</Text>
                    {/* <Button title='Friends' /> */}
                    {/* <Button title='Challenge' /> */}
                    </View>
                  </TouchableOpacity>
                </View>
           
          </LinearGradient>
  )
    }
  }else{
    if (item.chal_status == 2 && item.winner == null){
      return (
        <LinearGradient
        colors={["#DC2424", "#4A569D"]}
        style={styles.friendContainer}
        >
                <View style={styles.friendList}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                  <Entypo name='user' size={50} color='white' />
                </View>
                <View style={styles.friendList}>
                  <Text>In Progress</Text>
                </View>
           
          </LinearGradient>
        )
    }else if (item.chal_status == 2 && item.winner != null){
      return (
        <LinearGradient
          colors={["#DC2424", "#4A569D"]}
          style={styles.friendContainer}
          >
                    <View style={styles.friendList}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                      <Entypo name='user' size={50} color='white' />
                    </View>
                    <View style={styles.friendList}>
                      <TouchableOpacity style={styles.adtouch} onPress={() => {removeChalHandler(item.name)}}>
                          <View style={styles.declineButton}>
                            <Text style={styles.buttonText}>Done</Text>
                          </View>
                      </TouchableOpacity>
                      <Text>Winner {item.winner}   </Text>
                    </View>
          </LinearGradient>
        )
    }else if (item.chal_status == 1 && item.name == item.action_user){
      return (
        <LinearGradient
          colors={["#DC2424", "#4A569D"]}
          style={styles.friendContainer}
          >
                    <View style={styles.friendList}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                      <Entypo name='user' size={50} color='white' />
                    </View>
                    <View style={styles.friendList}>
                      <TouchableOpacity style={styles.adtouch} onPress={() => {removeChalHandler(item.name)}}>
                          <View style={styles.declineButton}>
                            <Text style={styles.buttonText}>Decline</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.adtouch} onPress={() => {acceptChalPressHandler(item.name)}}>
                          <View style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Accept</Text>
                          </View>
                      </TouchableOpacity>
                    </View>
          </LinearGradient>
        )
    }else if (item.chal_status == 1 && item.name != item.action_user){
      return (
        <LinearGradient
        colors={["#DC2424", "#4A569D"]}
        style={styles.friendContainer}
        >
                <View style={styles.friendList}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                  <Entypo name='user' size={50} color='white' />
                </View>
                <View style={styles.friendList}>
                  <TouchableOpacity style={styles.touch} onPress={() => {removeChalHandler(item.name)}}>
                    <View style={styles.pendingButton}>
                      <Text style={styles.buttonText}>Pending</Text>
                    {/* <Button title='Friends' /> */}
                    {/* <Button title='Challenge' /> */}
                    </View>
                  </TouchableOpacity>
                </View>
           
          </LinearGradient>
        )
    }
  }

  


}


const styles = StyleSheet.create({
    friendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        padding: 10,
        flex: 1
      },
      friendList:{
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
      },
      friendsButton: {
        backgroundColor: '#107be6',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 5
      },
      pendingButton: {
        backgroundColor: '#DDDDC1',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 5
      },
      addButton: {
        backgroundColor: '#107be6',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 5
      },
      buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20
      },
      acceptButton: {
        backgroundColor: 'green',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        marginRight: 5
      },
      declineButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 5,
        width: '100%',
        height: '100%',
      },
      touch: {
        height: '100%',
        width: '50%',
      },
      adtouch: {
        height: '100%',
        width: '36%',
        marginRight: 5
      },
      addtouch: {
        height: '100%',
        width: '60%',
      },
})