import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import CheckoutList from "./CheckoutList";

const style = StyleSheet.create({
  Container: {
    alignItems: "stretch",
    flexDirection: "column"
  },
  List: {
    flex: 9,
    alignItems: "stretch"
  },
  PriceText: {
    flex: 1,
    alignItems: "stretch",
    fontSize: 30,
    fontWeight: "bold",
  }
});

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);

    this.getItemData = this.getItemData.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(id) {
    console.log(id);
    this.props.onRemoveItem(id);
  }

  getItemData() {
    const items = this.props.data.filter(item => {
      return this.props.checkoutItems.includes(item.ID);
    });
    return items;
  }

  getTotalPrice (items){
    return items.reduce((accumulator, item)=>{return accumulator + item.Price}, 0);
  }

  render() {
    const items = this.getItemData();
    const price = this.getTotalPrice(items);

    return (
      <View styles={style.Container}>
        <View styles={style.List}>
          <CheckoutList items={items} onRemoveItem={this.removeItem} />
        </View>
        <View styles={style.PriceText}>
          <Text styles={style.PriceText}>Price: {price}</Text>
        </View>
      </View>
    );
  }
}
