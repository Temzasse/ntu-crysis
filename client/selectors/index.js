export const getWeatherMarkers = (state) => {
  const { forecast } = state.weather;
  return forecast.map(item => (
    {
      position: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      },
      title: `${item.forecast.value} - (${item.name})`,
    }
  ));
};


export const getIncidentMarkers = (state) => {
  return state.incident.all.map(({ latitude, longitude, title }) => (
    {
      position: { lat: latitude, lng: longitude },
      title,
    }
  ));
};
