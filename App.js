import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

function getApi() {
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=Katowice&units=metric&appid=dbe98c6eabaf54fa682fbca51cdedf80";
    return fetch(apiURL)
        .then((response) => response.json())
        .then((responseJson) => {
            showWeather(responseJson)

        })
        .catch((error) => {
            console.error(error);
        });
}

function showWeather(responseJson) {
    return <Text>{responseJson.name}</Text>
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',

        };
    }

  render() {
    return (

      <View style={styles.container}>

          <View style={styles.searcher}>

              <TextInput
              style={styles.searcherInput} placeholder="Wpisz miasto" onChangeText={(text) => this.setState({text})}/>

              <Button onPress={() => { getApi() }} title="Pokaż pogodę" color="gray" />

          </View>

          <View style={styles.weatherBackground}>

              <Text>{ getApi }</Text>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    searcher: {
        flex: 2.5, backgroundColor: '#1F2021',alignItems: "center", justifyContent: "center"
    },
    searcherInput: {
        width: 250, fontSize: 40, color: "#fff", margin: 10, paddingBottom: 10
    }, weatherBackground: {
        flex: 7, backgroundColor: 'steelblue'
    }
});

