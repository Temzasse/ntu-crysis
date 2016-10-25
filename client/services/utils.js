import weatherAbbreviations from '../static/weatherAbbreviations';

export function isNarrowLayout() {
  return !!window.matchMedia('screen and (max-width: 34em)').matches;
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function range(num) {
  return Array.from(Array(num).keys());
}

export function parseWeatherXMLtoJS(xml) {
  const data = [];

  try {
    const areas = xml.getElementsByTagName('area');

    for (const area of areas) {
      const dataItem = {};
      for (const attr of area.attributes) {
        if (attr.name === 'forecast') {
          dataItem[`${attr.name}`] = {
            abbrev: attr.nodeValue,
            value: weatherAbbreviations[attr.nodeValue],
          } || {};
        } else {
          dataItem[`${attr.name}`] = attr.nodeValue;
        }
      }
      data.push(dataItem);
    }
  } catch (e) { console.error('Failed to parse weather xml data: ', e); }

  return data;
}

export function arrayToObject(arr) {
  return arr.reduce((o, v, i) => {
    console.log(o, v, i);
    o[v.id] = v; // eslint-disable-line
    return o;
  }, {});
}

export function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}
