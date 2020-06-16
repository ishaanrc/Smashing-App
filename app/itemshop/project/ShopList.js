import React, { Component } from "react";

import { FlatList } from "react-native";

import ShopListItem from "./ShopListItem";

/**
 * Renders the item shop list
 *
 * Each item within the shop can be added to the checkout
 * page or can be viewed for additional details.
 */
export default class ShopList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ShopListItem
            name={item.Name}
            price={item.Price}
            itemID={item.ID}
            onItemClicked={this.props.onItemClicked}
            onItemPurchaseClicked={this.props.onItemPurchaseClicked}
          />
        )}
      />
    );
  }
}
