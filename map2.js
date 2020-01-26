
let map2;

window.onload = () => {
    const BASE_URL = 'http://192.168.0.92';

    function post(payload) {
        axios.post(BASE_URL + '/add-base', payload);
    }

    const polylist = [];

    const options = {
        zoom: 19,
        center: new google.maps.LatLng(32.06665, 34.765184),
        gestureHandling: 'cooperative',
    };
    function initMap(options) {
        map2 = new google.maps.Map(document.getElementById('map2'), options);

        const drawingManagerOptions = {
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle'],
            },
            // markerOptions: {
            // 	icon:
            // 		'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            // },
            // circleOptions: {
            // 	fillColor: '#ffff00',
            // 	fillOpacity: 1,
            // 	strokeWeight: 5,
            // 	clickable: false,
            // 	editable: true,
            // 	zIndex: 1,
            // },
        };

        const drawingManager = new google.maps.drawing.DrawingManager(drawingManagerOptions);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', poly => {
            poly.overlay.setDraggable(true);
            poly.overlay.setEditable(true);
            polylist.push(poly);
        });

        drawingManager.setMap(map2);

        const geoJsonTemplate = {
            location: 'HaKovshim Garden',
            type: 'FeatureCollection',
            features: [],
        };

        const featureTemplate = {
            type: 'Feature',
            properties: {
                // stroke: '#d1f56b',
                // 'stroke-width': 2,
                // 'stroke-opacity': 0.5,
                // fill: '#000000',
                // 'fill-opacity': 0.5,
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[]],
            },
        };

        function prepareGeoJsonForMaps(geoJsonObj) {
            geoJsonObj.features.forEach(feature => {
                feature.geometry.coordinates[0].push(feature.geometry.coordinates[0][0]);
            });

            return geoJsonObj;
        }

        function convertPlanToGeoJson(polygonList) {
            const geoJson = JSON.parse(JSON.stringify(geoJsonTemplate));

            polygonList.forEach(polygon => {
                const feature = JSON.parse(JSON.stringify(featureTemplate));
                polygon.overlay
                    .getPath()
                    .getArray()
                    .forEach(latLng => {
                        feature.geometry.coordinates[0].push([latLng.lng(), latLng.lat()]);
                    });
                geoJson.features.push(feature);
            });

            return geoJson;
        }

        // map.data.addGeoJson(prepareGeoJsonForMaps(convertPlanToGeoJson(polylist)))

        document.getElementsByTagName('button')[0].addEventListener('click', () => {
            console.log(convertPlanToGeoJson(polylist));
            map2.data.addListener('click', event => {
                console.log(event);
                map2.data.overrideStyle(event.feature, { fillColor: 'red' });
            });
        });

        document.getElementsByTagName('button')[1].addEventListener('click', () => {
            console.log(polylist);
            map2.data.addGeoJson(prepareGeoJsonForMaps(convertPlanToGeoJson(polylist)));
        });

        document.getElementsByTagName('button')[2].addEventListener('click', () => {
            deleteMode(polylist);
        });

        document.getElementsByTagName('button')[3].addEventListener('click', () => {
            turnOffDeleteMode(polylist);
        });

        function deleteMode(polygonList) {
            polygonList.forEach((polygon, index) => {
                google.maps.event.addListener(polygon.overlay, 'click', () => {
                    polygon.overlay.setMap(null);
                    polygonList.splice(index, 1);
                });
            });
        }

        function turnOffDeleteMode(polygonList) {
            polygonList.forEach(({ overlay }) => {
                google.maps.event.clearListeners(overlay, 'click');
            });
        }
        function hakovshimBase() {
            return {
                location: 'HaKovshim Garden',
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    [
                                        34.76465828703309,
                                        32.067476795393986
                                    ],
                                    [
                                        70.76434446857835,
                                        32.06712903081946
                                    ],
                                    [
                                        70.76401455686952,
                                        32.06669943746045
                                    ],
                                    [
                                        233.76455636309053,
                                        32.06636189840558
                                    ],
                                    [
                                        232.7648031263199,
                                        32.06620449340359
                                    ],
                                    [
                                        34.765344932540906,
                                        32.0658197876195
                                    ],
                                    [
                                        34.765827730163586,
                                        32.0661311891766
                                    ],
                                    [
                                        34.766380265220654,
                                        32.066565331183774
                                    ],
                                    [
                                        34.76465828703309,
                                        32.067476795393986
                                    ]
                                ]
                            ]
                        }
                    }
                ]
            }
        }


        map2.data.addGeoJson(hakovshimBase())
    }

    initMap(options);
};