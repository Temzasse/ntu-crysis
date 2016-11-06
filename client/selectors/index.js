export const getWeatherMarkers = (state) => {
  const { forecast } = state.weather;
  return forecast.map(item => (
    {
      position: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      },
      title: `${item.forecast.value} - (${item.name})`,
      abbrev: item.forecast.abbrev,
    }
  ));
};

export const getIncidentMarkers = (state) => {
  return Object.values(state.incident.all)
    .filter(i => !i.resolved)
    .map(({ latitude, longitude, title, id }) => ({
      position: { lat: latitude, lng: longitude },
      title,
      id,
    }));
};

export const getIncidentsArray = (state) => {
  return Object.values(state.incident.all).filter(i => !i.resolved);
};

export const getResponseUnitsArray = (state) => {
  return Object.values(state.responseunits.all);
};

export const getCrisisArray = (state) => {
  return Object.values(state.crisis.all)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

export const getCurrentCrisis = (state) => {
  return state.crisis.current;
};
