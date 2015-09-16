
const defs = [{
  name: 'Core',
  match: /^(ol.Map\b)|(ol.View\b)|(ol.Object\b)|(ol.Observable\b)|(ol.Collection\b)/
}, {
  name: 'Layers',
  match: /^ol.layer\./
}, {
  name: 'Sources',
  match: /^ol.source\./
}, {
  name: 'Controls',
  match: /^ol.control\./
}, {
  name: 'Interactions',
  match: /^ol.interaction\./
}, {
  name: 'Formats',
  match: /^ol.format\./
}, {
  name: 'Geometry and Feature',
  match: /^(ol.geom\.)|(ol.Feature\b)/
}, {
  name: 'Style',
  match: /^ol.style\./
}, {
  name: 'Projections and Extents',
  match: /(ol.proj\.)|(ol.extent\.)/
}, {
  name: 'Misc.',
  match: /.*/
}];

function byName(a, b) {
  return a.name < b.name ? -1 : 1;
}

export function getClassName(name) {
  const parts = name.split('#');
  if (parts.length === 2) {
    return parts[0];
  } else {
    return null;
  }
}

export default function(info) {
  const groups = defs.map(def => ({
    name: def.name,
    items: []
  }));

  const grouped = {};

  info.symbols.slice().sort(byName).forEach(symbol => {
    if (!(symbol.kind === 'function' || symbol.kind === 'class')) {
      return;
    }
    const className = getClassName(symbol.name);
    if (className && (className in grouped)) {
      return;
    }

    for (let i = 0, ii = groups.length; i < ii; ++i) {
      if (defs[i].match.test(symbol.name)) {
        const itemName = className || symbol.name;
        grouped[itemName] = true;
        groups[i].items.push(itemName);
        break;
      }
    }
  });

  return groups;
}
