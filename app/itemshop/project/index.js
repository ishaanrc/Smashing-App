import React, { Component } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";

import CheckoutPage from "./CheckoutPage";
import DescriptionModal from "./DescriptionModal";
import PurchaseModal from "./PurchaseModal";
import NavigationButtons, { Pages, PAGES } from "./NavigationButtons";
import ShopList from "./ShopList";

import axios from 'axios';

import { connect } from 'react-redux';

import {loadItems, unloadItems} from "../../redux/actions";

// Styles corresponding to the different views on the page
const viewStyles = StyleSheet.create({
  Header: {
    flex: 1
  },
  Body: {
    flex: 8
  },
  Footer: {
    flex: 1
  }
});

const headerStyles = StyleSheet.create({
  Title: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});

/**
 * Item Shop Page
 */
class ItemShop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      purchaseModalVisible: false,
      selectedItemID: null,
      checkoutItems: [],
      page: PAGES.BROWSE
    };

    this.getPageToRender = this.getPageToRender.bind(this);
    this.onItemClicked = this.onItemClicked.bind(this);
    this.onItemConfirmPurchaseClicked = this.onItemConfirmPurchaseClicked.bind(
      this
    );
    this.onItemPurchaseClicked = this.onItemPurchaseClicked.bind(this);
    this.setModalVisibility = this.setModalVisibility.bind(this);
    this.setPage = this.setPage.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  componentDidMount(){

    // First unload the previous items, to show we are loading the store
    this.props.unloadItems();

    axios.get("http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/itemShop/Browse.php")
    .then(
      (res) => {
        // Store the items into redux
        this.props.loadItems(res.data.items);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Adds the item id to the shopping cart
   * @param {string} itemID
   */
  onItemConfirmPurchaseClicked(itemID) {
    let { checkoutItems } = this.state;
    // Add the item to the checkout list
    checkoutItems.push(itemID);

    console.log(checkoutItems);

    // Reset the state
    this.setState({ checkoutItems });
  }

  /**
   * Sets the modal visibility and
   * item id.
   *
   * @param {boolean} visible
   * @param {string} itemID
   */
  onItemClicked(visible, itemID) {
    this.setState({ modalVisible: visible, selectedItemID: itemID });
  }

  /**
   * Purchase for the itemID was selected.
   *
   * @param {String} itemID
   */
  onItemPurchaseClicked(itemID) {
    this.setState({ purchaseModalVisible: true, selectedItemID: itemID });
  }

  /**
   * Sets modal visibility
   * @param {boolean} visible
   */
  setModalVisibility(visible) {
    this.setState({ modalVisible: visible });
  }

  /**
   * Changes the viewed page
   *
   * Page values are determined by the navigation buttons. You
   * can see the values in the PAGES export in NavigationButtons.js
   *
   * @param {integer} page
   */
  setPage(page) {
    this.setState({ page });
  }

  onRemoveItem(itemID) {
    console.log("Removing: ", itemID);
    let { checkoutItems } = this.state;
    checkoutItems = checkoutItems.filter(item => {
      return item !== itemID;
    });
    this.setState({ checkoutItems });
  }

  /**
   * Gets the page to render
   */
  getPageToRender() {
    const { page, checkoutItems } = this.state;

    const data = this.props.items.data? this.props.items.data: null

    console.log("CHECKOUT ITEMS");
    console.log(checkoutItems);

    switch (page) {
      case PAGES.BROWSE:
        return (
          <ShopList
            data={data}
            onItemClicked={this.onItemClicked}
            onItemPurchaseClicked={this.onItemPurchaseClicked}
          />
        );
      case PAGES.CHECKOUT:
        return (
          <CheckoutPage
            data={data}
            checkoutItems={checkoutItems}
            onRemoveItem={this.onRemoveItem}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { modalVisible, selectedItemID } = this.state;

    console.log(selectedItemID);

    // Get the selected item
    const selectedItem = this.props.items.data?
    this.props.items.data.find(
      element => element.ID === selectedItemID
    )
    :
    null;

    // Check if we have the store data
    if(!this.props.items.data){
      return (
        <View style={{ flex: 1 }}>
          <View style={viewStyles.Header}>
            <Text style={headerStyles.Title}>Item Shop!</Text>
          </View>

          <View style={viewStyles.Body}>
            <Text>
              Loading Store Data ...
            </Text>
          </View>

          <View style={viewStyles.Footer} />
          <NavigationButtons onPageSelect={this.setPage} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={viewStyles.Header}>
          <Text style={headerStyles.Title}>Item Shop!</Text>
        </View>

        <View style={viewStyles.Body}>{this.getPageToRender()}</View>

        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisibility(false);
          }}
        >
          <DescriptionModal
            name={selectedItemID ? selectedItem.Name : null}
            description={selectedItem ? selectedItem.Description : null}
            setModalVisible={this.setModalVisibility}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={this.state.purchaseModalVisible}
          onRequestClose={() => {
            this.setState({ purchaseModalVisible: false });
          }}
        >
          <PurchaseModal
            name={selectedItemID ? selectedItem.Name : null}
            description={null}
            itemID={selectedItemID}
            closeModal={() => {
              this.setState({ purchaseModalVisible: false });
            }}
            onConfirm={this.onItemConfirmPurchaseClicked}
          />
        </Modal>

        <View style={viewStyles.Footer} />
        <NavigationButtons onPageSelect={this.setPage} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {items} = state;
  return {
    items
  };
}

const mapDispatchToProps = {
  loadItems,
  unloadItems
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemShop);