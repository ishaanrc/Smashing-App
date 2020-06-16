import React, { Component } from "react";

import { FlatList } from "react-native";

import CheckoutListItem from "./CheckoutListItem";

/**
 * Renders the checkout item list
 *
 * Each item within the checkout page can be removed.
 * Also the sum of all the items is tabulated here
 */
export default class CheckoutList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CheckoutListItem
            name={item.Name}
            price={item.Price}
            itemID={item.ID}
            removeItem={this.props.onRemoveItem}
          />
        )}
      />
    );
  }
}
