/* eslint-disable max-len */

export const mockIncidents = [
  { id: 1,
    title: 'Incident 1',
    lat: 1.30063255,
    lng: 103.75444641,
    description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.',
  },
  { id: 2,
    title: 'Incident 2',
    lat: 1.30163255,
    lng: 103.95444641,
    description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.',
  },
  { id: 3,
    title: 'Incident 3',
    lat: 1.30263255,
    lng: 103.75444641,
    description: 'Lorem ipsum dolor sit amet, ex est vide possim copiosae, omnesque efficiendi vix id. Suavitate disputando id ius, ludus possim imperdiet pro ea, pro vidisse forensibus at.',
  },
];

export const shelterMarkers = [
  { position: { lat: 1.30863255, lng: 103.85444641 },
    title: 'Shelter 1' },
  { position: { lat: 1.3669815, lng: 103.92757416 },
    title: 'Shelter 2' },
  { position: { lat: 1.39821478, lng: 103.75831604 },
    title: 'Shelter 3' },
  { position: { lat: 1.31378104, lng: 103.67385864 },
    title: 'Shelter 4' },
];

export const mapSectors = [
  {
    fillColor: '#33cc33',
    strokeColor: '#006633',
    coords: [ // top right
      { lat: 1.349820, lng: 103.842773 },
      { lat: 1.472692, lng: 103.840714 },
      { lat: 1.436312, lng: 103.882599 },
      { lat: 1.434253, lng: 103.932037 },
      { lat: 1.423270, lng: 103.998642 },
      { lat: 1.448668, lng: 104.039154 },
      { lat: 1.433566, lng: 104.076920 },
      { lat: 1.406109, lng: 104.093399 },
      { lat: 1.350507, lng: 104.078979 },
    ],
  },
  {
    fillColor: '#ff80ff',
    strokeColor: '#b300b3',
    coords: [ // down right
      { lat: 1.348447, lng: 103.842773 },
      { lat: 1.196736, lng: 103.844833 },
      { lat: 1.276368, lng: 104.078979 },
      { lat: 1.349820, lng: 104.078979 },
    ],
  },
  {
    fillColor: '#ffff00',
    strokeColor: '#999900',
    coords: [ // top left
      { lat: 1.349820, lng: 103.841400 },
      { lat: 1.472692, lng: 103.839340 },
      { lat: 1.480243, lng: 103.806381 },
      { lat: 1.455532, lng: 103.768616 },
      { lat: 1.450727, lng: 103.745956 },
      { lat: 1.461023, lng: 103.725357 },
      { lat: 1.450040, lng: 103.699265 },
      { lat: 1.432193, lng: 103.674545 },
      { lat: 1.351193, lng: 103.631973 },
    ],
  },
  {
    fillColor: '#db4d29',
    strokeColor: '#c12c07',
    coords: [ // down left
      { lat: 1.348447, lng: 103.841400 },
      { lat: 1.195363, lng: 103.844147 },
      { lat: 1.121221, lng: 103.645020 },
      { lat: 1.209093, lng: 103.598328 },
      { lat: 1.277055, lng: 103.600388 },
      { lat: 1.323735, lng: 103.615494 },
      { lat: 1.349820, lng: 103.631287 },
    ],
  },
];

/* eslint-disable */
export const mapTheme2 = [
  {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 13
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#144b53"
          },
          {
              "lightness": 14
          },
          {
              "weight": 1.4
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "administrative.province",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "administrative.locality",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#08304b"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#0c4152"
          },
          {
              "lightness": 5
          }
      ]
  },
  {
      "featureType": "poi.attraction",
      "elementType": "labels",
      "stylers": [
          {
              "invert_lightness": true
          }
      ]
  },
  {
      "featureType": "poi.attraction",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "invert_lightness": true
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text",
      "stylers": [
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#0b434f"
          },
          {
              "lightness": 25
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
          {
              "lightness": "0"
          },
          {
              "saturation": "0"
          },
          {
              "invert_lightness": true
          },
          {
              "visibility": "simplified"
          },
          {
              "hue": "#00e9ff"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "road.highway.controlled_access",
      "elementType": "labels.text",
      "stylers": [
          {
              "color": "#a1f7ff"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#0b3d51"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
          {
              "invert_lightness": true
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "invert_lightness": true
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "color": "#146474"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#021019"
          }
      ]
  }
];
/* eslint-enable */

export const mapTheme = [
  {
    'featureType': 'all',
    'elementType': 'all',
    'stylers': [
      { 'invert_lightness': true },
      { 'saturation': 10 },
      { 'lightness': 30 },
      { 'gamma': 0.5 },
      { 'hue': '#435158' },
    ],
  },
];

export const mapNightModeStyles = [
  { elementType: 'geometry', stylers: [{ color: '#334152' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#334152' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

/* eslint-enable max-len */
