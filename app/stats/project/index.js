import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions, Button, Alert, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { connect } from 'react-redux'
import { userMoney, userStatsRefresh } from '../../redux/actions';

const numColumns = 4;

class Stats extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modified: false, // If modified is true, it means one of the stats has been upgraded
      originalStats: {}, 
      currentStats: {} 
    };

    // Reset
    //this.setState({currentStats: this.state.originalStats});
   
    // apply
    //this.setState({originalStats: this.state.currentStats});

    // Define "this" keyword for function
    this.generateListData = this.generateListData.bind(this);
  }

  componentDidMount = () => {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/test/user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'stats',
        username: this.props.user.username,
      })
    }).then((response) => response.json())
      .then((res) => {
          const { money, hp, agi, drn, spd, str} = res;
          const stats = {Money: money, HP: hp, AGI: agi, DRN: drn, SPD: spd, STR: str}
          this.setState({ originalStats: stats, currentStats: stats, modified: false });
      })
  }
 
  generateListData(){
    const {HP, STR, AGI, SPD, DRN} = this.state.currentStats;

    return [
      { key: 'statLabel', val: "Stat", type: 'label' },
      { key: 'levelLabel', val: "Level", type: 'label' },
      { key: 'buttonLabel', val: "    ", type: 'label' },
      { key: 'costLabel', val: "Cost", type: 'label' },

      { key: 'HPlab', val: "HP", type: 'item' },
      { key: 'HPval', val: HP, type: 'item' },
      { key: 'HPbut', val: '+', type: 'button' },
      { key: 'HPcost', val: 10*this.state.currentStats["HP"], type: 'item' },

      { key: 'STRlab', val: "STR", type: 'item' },
      { key: 'STRval', val: STR, type: 'item' },
      { key: 'STRbut', val: "+", type: 'button' },
      { key: 'STRcost', val: 10*this.state.currentStats["STR"], type: 'item' },

      { key: 'AGIlab', val: "AGI", type: 'item' },
      { key: 'AGIval', val: AGI, type: 'item' },
      { key: 'AGIbut', val: "+", type: 'button' },
      { key: 'AGIcost', val: 10*this.state.currentStats["AGI"], type: 'item' },

      { key: 'SPDlab', val: "SPD", type: 'item' },
      { key: 'SPDval', val: SPD, type: 'item' },
      { key: 'SPDbut', val: "+", type: 'button' },
      { key: 'SPDcost', val: 10*this.state.currentStats["SPD"], type: 'item' },

      { key: 'DRNlab', val: "DRN", type: 'item' },
      { key: 'DRNval', val: DRN, type: 'item' },
      { key: 'DRNbut', val: "+", type: 'button' },
      { key: 'DRNcost', val: 10*this.state.currentStats["DRN"], type: 'item' },

      { key: 'apply', val: "APPLY", type: 'applyButton' },
      { key: 'reset', val: "RESET", type: 'resetButton' },

    ];
  }

  applyStat() {
    fetch('http://www-student.cse.buffalo.edu/CSE442-542/2020-spring/cse-442ad/user/user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: 'update stats',
        Money: this.state.currentStats["Money"],
        HP: this.state.currentStats["HP"],
        STR: this.state.currentStats["STR"],
        AGI: this.state.currentStats["AGI"],
        SPD: this.state.currentStats["SPD"],
        DRN: this.state.currentStats["DRN"],
        Money: this.state.currentStats["Money"],
        User: this.props.user.username,

        message: '',
      })
    }).then((response) => response.json())
      .then((res) => {
        if (res.message === 'Stats Successfully Updated') {
          alert(res.message),
          this.props.parentCallback();
        } else {
          alert(res.message)
        }
      })
    this.setState({originalStats: this.state.currentStats});
    this.props.userStatsRefresh(this.state.currentStats)
  }

  resetStat() {
    this.setState({currentStats: this.state.originalStats});
  }

  incrementStat(key){
    const {HP, AGI, STR, SPD, DRN, Money} = this.state.currentStats;
    switch (key)
    {
      case 'HPbut':
        if(this.state.currentStats["HP"]*10 <= this.state.currentStats["Money"]){
          const HPnextCurrentStats = Object.assign({}, this.state.currentStats, {HP: HP+1, Money: Money-(HP*10)});
          this.setState({currentStats: HPnextCurrentStats});
        }
      break;
      case 'AGIbut':
        if(this.state.currentStats["AGI"]*10 <= this.state.currentStats["Money"]){
          const AGInextCurrentStats = Object.assign({}, this.state.currentStats, {AGI: AGI+1, Money: Money-(AGI*10)});
          this.setState({currentStats: AGInextCurrentStats});
        }
      break;
      case 'STRbut':
        if(this.state.currentStats["STR"]*10 <= this.state.currentStats["Money"]){
          const STRnextCurrentStats = Object.assign({}, this.state.currentStats, {STR: STR+1, Money: Money-(STR*10)});
          this.setState({currentStats: STRnextCurrentStats});
        }
      break;
      case 'SPDbut':
        if(this.state.currentStats["SPD"]*10 <= this.state.currentStats["Money"]){
          const SPDnextCurrentStats = Object.assign({}, this.state.currentStats, {SPD: SPD+1, Money: Money-(SPD*10)});
          this.setState({currentStats: SPDnextCurrentStats});
        }
      break;
      case 'DRNbut':
        if(this.state.currentStats["DRN"]*10 <= this.state.currentStats["Money"]){
          const DRNnextCurrentStats = Object.assign({}, this.state.currentStats, {DRN: DRN+1, Money: Money-(DRN*10)});
          this.setState({currentStats: DRNnextCurrentStats});
        }
      break;
    }

  }

  renderItem = ({ item }) => {
    if (item.type === "item") {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.val}</Text>
        </View>
      )
    } else if (item.type === "label") {
      return (
        <View style={styles.label}>
          <Text style={styles.labelText}>{item.val}</Text>
        </View>
      )
    } else if (item.type === "button") {
      return (
        <TouchableWithoutFeedback onPress={() =>this.incrementStat(item.key)}> 
          <View style={styles.button}>
              <Text style={{color: "white"}}>{item.val}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    } else if (item.type === "applyButton") {
      return (
        <TouchableWithoutFeedback onPress={() => this.applyStat()}>
          <View style={styles.button}>
              <Text style={{color: "white"}}>{item.val}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    } else if (item.type === "resetButton") {
      return (
        <TouchableWithoutFeedback onPress={() => this.resetStat()}>
          <View style={styles.button}>
              <Text style={{color: "white"}}>{item.val}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }
  render() {
    const data = this.generateListData();

    return (
      <LinearGradient
        colors={["#283c86", "#45a247"]}
        style={styles.linearGradient}
      >
        <React.Fragment>
          <View style={styles.margin}>
            <Text style={styles.title}>
              STATS
        </Text>
        <Text style={styles.labelText}>
            Currency: {this.state.currentStats.Money}
        </Text>
          </View>
            <FlatList
              data={data}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
        </React.Fragment>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / numColumns / 2,
  },
  itemText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / numColumns / 2, // approximate a square
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 2,
    marginBottom: 5,
    borderColor: '#DDD',
    borderRadius: 10,
    height: Dimensions.get('window').width / numColumns / 2, // approximate a square
  },

  labelText: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  margin: {
  },
  title: {
    marginTop: '15%',
    marginBottom: "10%",
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fff'
  },
  linearGradient: {
    flex: 1
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
}


const mapDispatchToProps = {
  userMoney,
  userStatsRefresh
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);