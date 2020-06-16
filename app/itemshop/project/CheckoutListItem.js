import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "react-native-elements";

const bodyStyles = StyleSheet.create({
  ListView: {
    backgroundColor: "#C0C0C0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row"
  },
  ListItemName: {
    fontSize: 20
  },
  ListItemNameView: {
    flex: 2
  }
});

/**
 * List element for item shop
 */
class CheckoutListItem extends Component {
  render() {
    return (
      <View style={bodyStyles.ListView}>
        <View style={bodyStyles.ListItemNameView}>
          <Text style={bodyStyles.ListItemName}>{this.props.name}</Text>
        </View>
        <View style={bodyStyles.ListItemNameView}>
          <Text style={bodyStyles.ListItemName}>{this.props.price}</Text>
        </View>
        <View style={bodyStyles.ListItemNameView}>
          <Button
            title="REMOVE"
            type="outline"
            onPress={() => {
              this.props.removeItem(this.props.itemID);
            }}
          />
        </View>
      </View>
    );
  }
}

export default CheckoutListItem;
