import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {GoogleMap, Marker, useLoadScript, InfoWindow} from "@react-google-maps/api";
import {formatRelative} from "date-fns";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxOption, ComboboxList} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import logo1 from "./compass.png";
import logo2 from "./map.svg";
import logo3 from "./location.png";
import Input from "react-validation/build/input";
import axios from 'axios';

import authHeader from "../services/auth-header";
const API_URL = 'http://localhost:8080/api/test/';
const libraries = ["places"];
const center = {
    lat: 52.089707,
    lng: 5.108907,
};


export default function Map () {


    const {isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAE20e5KXrruU6CtQzm-8djoxTPLWmcemo", libraries,
    });
    // const [markers, setMarkers] = useState([]);
    // const [selected, setSelected] = useState(null);
    //
    // const onMapClick = React.useCallback((event) => {
    //     setMarkers((current) => [...current,
    //         {
    //             lat: event.latLng.lat(),
    //             lng: event.latLng.lng(),
    //             time: new Date(),
    //         },
    //     ]);
    //     setSelected( {
    //         lat: event.latLng.lat(),
    //         lng: event.latLng.lng(),
    //         time: new Date(),
    //     });
    // }, []);


    const [locations, setLocations] = useState([]);
    const[error, setError] = useState();

    useEffect(() =>
    {
        loadData();
    }, []);

    const loadData = async () => {
        try{
            const result = await axios.get("http://localhost:8080/api/test/get-post");
            setLocations(result.data);
            // console.log(result.data)
            // console.log(location.lat)

        } catch (error) {
            setError(error);
        }
    };

    const[selectedLocation, setSelectedLocation] = useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(18);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    const mapContainerStyle = {
        maxWidth: "100%",
        height: "700px"
    };



    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    }





    return (
        <div className="googleMapWrapper">

            <div className="mapHeader">
                <h2 className="locallyLogo">Locally</h2>
                <Search panTo={panTo}/>
                <Locate panTo={panTo}/>
            </div>



            <GoogleMap
                className="googleMap"
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                // onClick={onMapClick}
                onLoad={onMapLoad}
            >

                {locations.map(location => (
                    <Marker
                        key={location.postId}
                        icon={logo3}
                        label={"#23" + location.postId.toString()}
                        position={{
                            lat: location.lat,
                            lng: location.lng
                        }}
                        onClick={() => {
                            setSelectedLocation(location);
                        }}
                    />
                ))}

                {selectedLocation && (
                    <InfoWindow
                        // className="picturePostMarker"
                        position={{
                            lat: selectedLocation.lat,
                            lng: selectedLocation.lng
                        }}
                        onCloseClick={() =>{
                            setSelectedLocation(null);
                        }}
                    >
                        <div>
                            <h6>{selectedLocation.locatieInfo}</h6>
                            <img className="picturePostMarker" src={selectedLocation.locatieFoto}/>
                        </div>

                    </InfoWindow>
                )}


                {/*{markers.map((marker) => (*/}
                {/*    <Marker*/}
                {/*        key={marker.time.toISOString()}*/}
                {/*        position={{ lat: marker.lat, lng: marker.lng }}*/}
                {/*        icon={logo3}*/}
                {/*        onClick={() => {*/}
                {/*            setSelected(marker);*/}
                {/*        }}*/}
                {/*    />*/}

                ))}

                {/*{selected ? (*/}

                {/*    //maak state variabele voor elk input veld*/}
                {/*    //zorg dat elk inputveld de waarde van de state gebruikt, en op de onChange de waarde veranderd*/}
                {/*    //als de gebruiker op de knop drukt roep functie aan waarin 'axios.post' request wordt gedaan en de state variabele worden meegestuurd*/}
                {/*    <form>*/}
                {/*        <InfoWindow className="InfoWindow"*/}
                {/*                    position={{ lat: selected.lat, lng: selected.lng }}*/}
                {/*                    onCloseClick={() => {setSelected(null)}}*/}
                {/*        >*/}

                {/*            <div className="InfoWindowBox">*/}
                {/*                <p className="info-tekst">{locations.locatieInfo}</p>*/}


                {/*            </div>*/}

                {/*        </InfoWindow>*/}
                {/*    </form>*/}
                {/*) : null}*/}

            </GoogleMap>
        </div>
    );
}

function Locate({panTo}) {
    return (
        <button className="locate" onClick={() =>{
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })}, () => null,);
        }}>
            <img className="compassLogo" src={logo1} alt="compass - locate me"/>
        </button>
    );

}


function Search({ panTo }) {
    const {ready, value, suggestions:{status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 52.089707, lng: () => 5.108907,},
            //200km radius voor autocomplete zoekresultaten
            radius: 200 * 1000,
        },
    });

    return (
        <div className="MapSearchBar">
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions()
                    try {
                        const results = await getGeocode({address});
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                    } catch (error) {
                        console.log("error!")
                    }
                }}
            >

                <ComboboxInput
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    disabled={!ready}
                    placeholder={"Zoek hier op adres..."}
                />

                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({id, description}) =>
                            <ComboboxOption
                                key={id}
                                value={description}/>)}
                    </ComboboxList>
                </ComboboxPopover>

            </Combobox>
        </div>
    );
}


// import React from "react";
// import { compose, withProps } from "recompose";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
//
// const MyMapComponent = compose(
//     withProps({
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
// )((props) =>
//     <GoogleMap
//         defaultZoom={10}
//         defaultCenter={{ lat: 52.089707, lng: 5.108907 }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: 52.089707, lng: 5.108907 }} onClick={props.onMarkerClick} />}
//     </GoogleMap>
// );
//
// class MyFancyComponent extends React.PureComponent {
//     state = {
//         isMarkerShown: false,
//     }
//
//     componentDidMount() {
//         this.delayedShowMarker()
//     }
//
//     delayedShowMarker = () => {
//         setTimeout(() => {
//             this.setState({ isMarkerShown: true })
//         }, 3000)
//     }
//
//     handleMarkerClick = () => {
//         this.setState({ isMarkerShown: false })
//         this.delayedShowMarker()
//     }
//
//     render() {
//         return (
//             <MyMapComponent
//                 isMarkerShown={this.state.isMarkerShown}
//                 onMarkerClick={this.handleMarkerClick}
//             />
//         )
//     }
// }
// export default MyMapComponent;

