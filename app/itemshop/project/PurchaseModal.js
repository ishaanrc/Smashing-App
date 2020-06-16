import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// Views for the different components of the modal
const viewStyles = StyleSheet.create({
  Header: {},
  Body: {},
  Footer: {},
  TitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center"
  },
  DescriptionText:{
    fontSize: 20
  }
});

/**
 * Modal for displaying descriptions of items.
 **/
class PurchaseModal extends Component {
  constructor(props) {
    super(props);

    this.onCloseButtonPressed = this.onCloseButtonPressed.bind(this);
    this.onCancelButtonPressed = this.onCancelButtonPressed.bind(this);
    this.onConfirmButtonPressed = this.onConfirmButtonPressed.bind(this);
  }

  onCloseButtonPressed(){
      this.props.closeModal();
  }

  onCancelButtonPressed(){
    this.props.closeModal();
  }

  onConfirmButtonPressed(){
    this.props.onConfirm(this.props.itemID);
    this.props.closeModal();
  }

  render() {
    const element = (
      <View>
        <View style={viewStyles.Header}>
          <Text style={viewStyles.TitleText}>Add to cart</Text>
        </View>
        <View style={viewStyles.Body}>
          <Text style={viewStyles.DescriptionText}>{"Add " + this.props.name + " to cart?"}</Text>
        </View>
        <View style={viewStyles.Footer}>
          <Button
            title="Cancel"
            onPress={this.onCancelButtonPressed}
          />
          <Button
            title="Confirm"
            onPress={this.onConfirmButtonPressed}
          />
        </View>
      </View>
    );

    return element;
  }
}

export default PurchaseModal;