import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const bodyStyles = StyleSheet.create({
  ListView: {
    backgroundColor: "#C0C0C0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  ListItemName: {
    fontSize: 20
  },
  ListItemNameView: {
    flex: 2
  },
  ListItemPriceView: {
    flex: 1,
    backgroundColor: "gold",
    borderRadius: 20
  },
  ListItemPriceText: {
    textAlign: "center"
  }
});

/**
 * List element for item shop
 */
class ShopListItem extends Component {
  render() {
    return (
      <View style={bodyStyles.ListView}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={bodyStyles.ListItemNameView}>
            <TouchableOpacity
              onPress={() => {
                this.props.onItemClicked(true, this.props.itemID);
              }}
            >
              <Text style={bodyStyles.ListItemName}>{this.props.name}</Text>
            </TouchableOpacity>
          </View>

          <View style={bodyStyles.ListItemPriceView}>
            <TouchableOpacity
              onPress={() => {
                this.props.onItemPurchaseClicked(this.props.itemID);
              }}
            >
              <Text style={bodyStyles.ListItemPriceText}>
                {this.props.price}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ShopListItem;
