
import React from 'react';
import './map.css';
import civil_war_data from '../data/countries.json';
import L from 'leaflet';

const style = {
    width: "100%",
    height: "600px"
  };

  const mapStyle = (feature) => {
    return ({
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.prob)
    });
  }
  
  const getColor = (prob) => {
    return prob > 0.8
        ? "#8B0000" // Dark Red for probability greater than 0.8
        : prob > 0.6
        ? "#B22222" // FireBrick for probability greater than 0.6
        : prob > 0.4
        ? "#CD5C5C" // IndianRed for probability greater than 0.4
        : prob > 0.2
        ? "#F08080" // LightCoral for probability greater than 0.2
        : "#f5f0f0"; //white for probability less than 0.2
}

class Map extends React.Component {
    componentDidMount() {
      // create map
      this.map = L.map("map", {
        center: [0, 0],
        zoom: 4,
        layers: [
          L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmxvcnZhbmRla2VyY2tob3ZlIiwiYSI6ImNqdGZyMmtrejAxYWw0M3A2OGtwdTMxNWEifQ.5U-KSDZfyKNC_Z74fEWj6g",
          {
            maxZoom: 18,
            attribution:
              'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: "streets-v9"
          })
        ]
      });

      this.geojson = L.geoJson(civil_war_data, {
        style: mapStyle,
        onEachFeature: this.onEachFeature
      }).addTo(this.map);

      this.info = L.control();


      this.info.onAdd = function(map) {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
      };

      this.info.update = function(props) {
        this._div.innerHTML =
          "<h4>US Population Density</h4>" +
          (props
            ? "<b>" +
              props.name +
              "</b><br />" +
              props.density +
              " people / mi<sup>2</sup>"
            : "Hover over a state");
      };

      this.info.addTo(this.map);

      this.layer = L.layerGroup().addTo(this.map);
    }

    onEachFeature = (feature, layer) => {
        layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight,
          click: this.zoomToFeature
        });

        layer.bringToFront();

        //this.info.update(layer.feature.properties);
      }

      resetHighlight = (event) => {
        this.geojson.resetStyle(event.target);
      }

      zoomToFeature = (e) => {
        this.map.fitBounds(e.target.getBounds());
      }

      render() {
        return <div id="map" style={style} />;
      }
}

export default Map;


