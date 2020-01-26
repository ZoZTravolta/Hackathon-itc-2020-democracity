const base_layer = {
    location: 'HaKovshim Garden',
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 0,
            properties: {},
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [34.76465828703309, 32.067476795393986],
                        [34.76434446857835, 32.06712903081946],
                        [34.76401455686952, 32.06669943746045],
                        [34.76455636309053, 32.06636189840558],
                        [34.7648031263199, 32.06620449340359],
                        [34.765344932540906, 32.0658197876195],
                        [34.765827730163586, 32.0661311891766],
                        [34.766380265220654, 32.066565331183774],
                    ],
                ],
            },
        },
    ],
};

window.onload = () => {
    const maps = {
        map: undefined,

        drawingManager: undefined,

        eventListeners: {
            drawComplete: undefined,
            mapClick: undefined,
        },

        featureList: [],

        mapOptions: {
            zoom: 19,
            center: new google.maps.LatLng(32.06665, 34.765184),
            gestureHandling: 'cooperative',
        },

        drawingManagerOptions: {
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle'],
            },
        },

        geoJsonTemplate: {
            location: 'HaKovshim Garden',
            type: 'FeatureCollection',
            features: [],
        },

        featureTemplate: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon',
                coordinates: [[]],
            },
        },

        initMap: function () {
            this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
        },

        initDrawingManager: function () {
            this.drawingManager = new google.maps.drawing.DrawingManager(this.drawingManagerOptions);
        },

        convertPlanToGeoJson: function () {
            const geoJson = JSON.parse(JSON.stringify(this.geoJsonTemplate));

            this.featureList.forEach(polygon => {
                const feature = JSON.parse(JSON.stringify(this.featureTemplate));
                polygon.overlay
                    .getPath()
                    .getArray()
                    .forEach(latLng => {
                        feature.geometry.coordinates[0].push([latLng.lng(), latLng.lat()]);
                    });
                geoJson.features.push(feature);
            });

            return geoJson;
        },

        prepareGeoJsonForDisplayOnMaps: function (geoJsonObj) {
            geoJsonObj.features.forEach(feature => {
                if (feature.geometry.type === 'Polygon')
                    feature.geometry.coordinates[0].push(feature.geometry.coordinates[0][0]);
            });

            return geoJsonObj;
        },

        displayBase: function (baseGeoJson) {
            const base1 = this.prepareGeoJsonForDisplayOnMaps(baseGeoJson);
            this.map.data.addGeoJson(base1);
        },

        displayPlan: function (geoJson) {
            const plan = this.prepareGeoJsonForDisplayOnMaps(geoJson);
            plan.features.forEach((feature, index) => {
                let shape;
                if (feature.geometry.type === 'Polygon') {
                    shape = new google.maps.Polygon({
                        paths: feature.geometry.coordinates[0].map(coo => ({ lng: coo[0], lat: coo[1] })),
                        zIndex: 5,
                        fillColor: index === 0 ? '#11cdef' : '#2dce89',
                        fillOpacity: '0.8',
                        map: this.map,
                    });
                } else if (feature.geometry.type === 'Polyline') {
                    shape = new google.maps.Polyline({
                        paths: feature.geometry.coordinates[0].map(coo => ({ lng: coo[0], lat: coo[1] })),
                        zIndex: 5,
                        map: this.map,
                    });
                } else if (feature.geometry.type === 'Point') {
                    shape = new google.maps.Marker({
                        position: { lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] },
                        zIndex: 5,
                        map: this.map,
                    });
                } else if (feature.geometry.type === 'LineString')
                    shape = new google.maps.Polyline({
                        path: feature.geometry.coordinates.map(coo => ({ lng: coo[0], lat: coo[1] })),
                        zIndex: 5,
                        map: this.map,
                    });

                this.featureList.push(shape);
            });
        },


        setMarkerMode: function (props) {
            this.eventListeners.mapClick = this.map.addListener('click', e =>
                addMarker({
                    position: e.latLng,
                    ...props,
                })
            );
        },

        addMarker: function (props) {
            const marker = new google.maps.Marker(props);
            this.featureList.push(marker);
        },

        setDraw: () => { },

        initEventListeners: function () {
            this.eventListeners.drawComplete = google.maps.event.addListener(
                drawingManager,
                'overlaycomplete',
                poly => {
                    poly.overlay.setDraggable(true);
                    poly.overlay.setEditable(true);
                    this.featureList.push(poly);
                }
            );
        },

        resetPlanDisplay: function () {
            this.featureList.forEach((feature, index) => {
                feature.setMap(null);
            });
            this.featureList = [];
        },
        removePlanFromDisplay: function () {
            if (this.featureList.length !== 0) {
                this.featureList.forEach((feature, index) => {
                    feature.setMap(null);
                });
                this.featureList = [];
            }
        },
        setEditableTrue: function () {
            this.featureList.forEach(feature => {
                feature.setDraggable(true);
                if (feature.setEditable) feature.setEditable(true);
            });
        },

        setEditableFalse: function () {
            this.featureList.forEach(feature => {
                feature.setDraggable(false);
                if (feature.setEditable) feature.setEditable(false);
            });
        },
    };

    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        maps.removePlanFromDisplay();
        maps.displayPlan(plan2);
    });

    maps.initMap();
    maps.initDrawingManager();
    maps.displayBase(base_layer);

    $('#map1').click((e) => {
        maps.removePlanFromDisplay();
        maps.displayPlan(plan1);
        $('#plan-text').text("Yaakov's plan")
    })
    $('#map2').click((e) => {
        maps.removePlanFromDisplay();
        maps.displayPlan(plan2);
        $('#plan-text').text("Sara's plan")
    })

    $('#map3').click((e) => {
        maps.removePlanFromDisplay();
        maps.displayPlan(plan3);
        $('#plan-text').text("Reli's plan")
    })
    $('#edit-btn').click(() => {
        maps.setEditableTrue()
        editMode()
    })
    $('.btn-save').click(() => {
        maps.setEditableFalse()
        editMode()
    })
};