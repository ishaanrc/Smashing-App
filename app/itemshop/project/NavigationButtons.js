import React, { Component } from 'react';
import {
    ButtonGroup
} from 'react-native-elements';

const buttons = ['Browse', 'Checkout'];

export const PAGES = {
    BROWSE: 0,
    CHECKOUT: 1
}

export default class NavigationButtons extends Component {

    constructor(props){
        super(props);

        this.state ={
            selectedIndex: 0,
        }

        this.onPageSelect = this.onPageSelect.bind(this);
    }

    /**
     * Handle when a page has been clicked.
     * 
     * @param {integer} selectedIndex 
     */
    onPageSelect(selectedIndex){
        this.setState({selectedIndex});
        this.props.onPageSelect(selectedIndex);
    }

    render(){
        const {selectedIndex} = this.state;

        return (
            <ButtonGroup
                onPress={this.onPageSelect}
                buttons={buttons}
                selectedIndex={selectedIndex}
                disabled={[selectedIndex]}
            />
        );
    }
}
