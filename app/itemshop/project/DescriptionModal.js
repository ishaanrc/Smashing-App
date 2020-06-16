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
class DescriptionModal extends Component {
  constructor(props) {
    super(props);

    this.onCloseButtonPressed = this.onCloseButtonPressed.bind(this);
  }

  onCloseButtonPressed(){
      this.props.setModalVisible(false);
  }

  render() {
    const element = (
      <View>
        <View style={viewStyles.Header}>
          <Text style={viewStyles.TitleText}>{this.props.name}</Text>
        </View>
        <View style={viewStyles.Body}>
          <Text style={viewStyles.DescriptionText}>{this.props.description}</Text>
        </View>
        <View style={viewStyles.Footer}>
          <Button
            title="Close"
            onPress={this.onCloseButtonPressed}
          />
        </View>
      </View>
    );

    return element;
  }
}

export default DescriptionModal;
