import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            weather: null,
            city: "",

        }
    }

    getApi() {

        const apiURL = "http://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&units=metric&lang=pl&appid=dbe98c6eabaf54fa682fbca51cdedf80";
        return fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    weather: responseJson
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

  render() {

        let showWeather = null;




        if (this.state.weather) {
            showWeather = ( <View style={{flex:3}}><View style={{alignItems: "center"}}>
                <Text style={{fontSize: 50,color: "white"}}>{this.state.weather ? this.state.weather.name : null} </Text>

                <Text style={{fontSize: 70,color: "white"}}>{this.state.weather ? Math.ceil(this.state.weather.main.temp) : null}°</Text>
            </View>
                <View style={styles.humidity}>
                    <View style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
                    <Image source={require('./img/clouds.png')}
                           style={styles.top}  />
                    <Text style={{fontSize: 32,color: "white",width: 180, textAlign: "center"}}>{this.state.weather ? this.state.weather.weather[0].description : null}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
                    <Image source={require('./img/sun.png')}
                           style={styles.top}  />
                    <Text style={{fontSize: 32,color: "white",width: 180, textAlign: "center"}}>{this.state.weather ? this.state.weather.main.humidity : null}%</Text>
                    </View>

                </View>
                <View style={styles.humidity}>
                    <View style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
                    <Image source={require('./img/windy.png')}
                           style={styles.top}  />
                    <Text style={{fontSize: 32,color: "white",width: 180, textAlign: "center"}}>{this.state.weather ? this.state.weather.wind.speed : null} m/s</Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
                    <Image source={require('./img/pressure.png')}
                           style={styles.top}  />
                        <Text style={{fontSize: 32,color: "white", width: 180, textAlign: "center"}}>{this.state.weather ? this.state.weather.main.pressure : null} hPa</Text>
                    </View>
                </View>
            </View>)

        }





    return (

      <View style={styles.container}>

          <View style={styles.searcher}>

              <TextInput
              style={styles.searcherInput} placeholder="Wpisz miasto" value={this.state.city} onChangeText={(text) => this.setState({city:text})}/>

              <Button onPress={() => { this.getApi() }} title="Pokaż pogodę" color="gray" />

          </View>

          <View style={styles.weatherBackground}>



            {showWeather}

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#3867B1',
  },
    searcher: {
        flex: 2.5, backgroundColor: '#232D52',alignItems: "center", justifyContent: "center",
    },
    searcherInput: {
        width: 250, fontSize: 40, color: "#fff", margin: 10, paddingBottom: 10, textAlign: "center"
    }, weatherBackground: {
        flex: 7, backgroundColor: "#3867B1"

    },
    humidity: {
      width:360, display: "flex", flexDirection: 'row', flex:1, paddingTop: 30

    }, top: {
      width:40, height:40,
    }

});

