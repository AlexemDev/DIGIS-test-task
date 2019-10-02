import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {logger} from "redux-logger/src";
import './MapContainer.css'


export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            markers: [
                { lat: 0, lng: 0 }
            ],
            placesNearly: [],
            activeMarker: {},
            selectedPlace: {},
            findPlaces: null,
            zoom: 15
        };

        this.mapContainer = React.createRef();
    }



    componentWillMount() {
        this.getGeoLocation()
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (t, map, coord) => {
            const { latLng } = coord;
            const lat = latLng.lat();
            const lng = latLng.lng();

            this.setState(prev => ({
                markers: [...prev.markers,  {lat: lat, lng: lng}]
            }))

    };

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prev => ({
                        markers: prev.markers.map(
                            obj => Object.assign(obj, {lat: position.coords.latitude, lng: position.coords.longitude} )
                        )
                    }))
                }
            )
        }
    }

    onMapReady = (mapProps, map) => this.searchNearby(map, {lat: this.state.markers[0].lat, lng: this.state.markers[0].lng});

    searchNearby = (map, center) => {
        const { google } = this.props;
        const service = new google.maps.places.PlacesService(map);

        const request = {
            location: center,
            radius: '10000',
            type: [this.state.findPlaces]
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && this.state.findPlaces != null)
                this.setState({ placesNearly: results });
        });
    };

    handleSaveMarkers = e =>{
        e.preventDefault();
        let markersSaved = [];
        this.state.markers.map((marker, index) => (
            markersSaved.push({lat : marker.lat, lng: marker.lng})
        ));
        localStorage.setItem('customMarkers', JSON.stringify(markersSaved));
    }

    handleShowMarkers = e =>{
        e.preventDefault();
        let loadMarkers = JSON.parse(localStorage.getItem('customMarkers'));
        this.setState({
            markers : loadMarkers
        })

    }

    handleZoomLess = e =>{
        e.preventDefault();
        const { zoom } = this.state;
        this.setState({
            zoom : zoom - 1
        })

    }

    handleZoomMore = e =>{
        e.preventDefault();
        const { zoom } = this.state;
        this.setState({
            zoom : zoom + 1
        })

    }

    findNearestPlaces = e =>{
        e.preventDefault();
        this.setState({
            findPlaces : e.target.innerHTML
        })
        this.searchNearby(this.mapContainer.current.map, {lat: this.state.markers[0].lat, lng: this.state.markers[0].lng});


    }

    render() {
        return (
            <div className={'map'}>
                <div className={'map__btn-wrap'}>
                    <a href className={'map__btn'} onClick={this.handleZoomLess}>Zoom -</a>
                    <a href className={'map__btn'} onClick={this.handleSaveMarkers}>Save Markers</a>
                    <a href className={'map__btn'} onClick={this.handleShowMarkers}>Show Markers</a>
                    <a href className={'map__btn'} onClick={this.handleZoomMore}>Zoom +</a>
                </div>

                <div className={'map__btn-wrap'}>
                    <a href className={'map__btn'} onClick={this.findNearestPlaces}>hotel</a>
                    <a href className={'map__btn'} onClick={this.findNearestPlaces}>restaurant</a>
                    <a href className={'map__btn'} onClick={this.findNearestPlaces}>store</a>
                </div>

                <Map ref={this.mapContainer}
                     google={this.props.google}
                     onClick={this.onMapClicked}
                     onReady={this.onMapReady}
                     center={{lat: this.state.markers[0].lat, lng: this.state.markers[0].lng}}
                     zoom={this.state.zoom}>
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            name={'Your location'}
                            position={{lat : marker.lat, lng: marker.lng}}
                        />
                    ))}

                    {this.state.placesNearly.map((marker, index) => (
                        <Marker
                            key={index}
                            name={'Your location'}
                            position={{lat : (marker.geometry.viewport.na.l + marker.geometry.viewport.na.j ) / 2, lng: (marker.geometry.viewport.ga.l + marker.geometry.viewport.ga.j ) / 2}}
                        />
                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDbFdPVZmdDAYRz5NvLYJAdVxEhearPeoE')
})(MapContainer)

