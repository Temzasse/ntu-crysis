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
