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
  return Object.values(state.incident.all).map(
    ({ latitude, longitude, title, id }) => ({
      position: { lat: latitude, lng: longitude },
      title,
      id,
    }));
};

export const getIncidentsArray = (state) => {
  return Object.values(state.incident.all);
};

export const getResponseUnitsArray = (state) => {
  return Object.values(state.responseunits.all);
};

export const getSelectedIncident = (state) => {
  return Number.isFinite(state.incident.selected) ?
    state.incident.all[state.incident.selected] :
    null;
};

export const getActiveIncident = (state) => {
  return Number.isFinite(state.incident.active) ?
    state.incident.all[state.incident.active] :
    null;
};
