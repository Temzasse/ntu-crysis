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
    fillColor: '#3366ff',
    strokeColor: '#002699',
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

/* eslint-enable max-len */
