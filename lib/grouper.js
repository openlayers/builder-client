
const defs = [{
  name: 'Core',
  match: /(ol.Map\b)|(ol.View\b)|(ol.Object\b)|(ol.Observable\b)/
}, {
  name: 'Layers and Sources',
  match: /(ol.layer\b)|(ol.source\b)/
}, {
  name: 'Controls and Interactions',
  match: /(ol.control\b)|(ol.interaction\b)/
}, {
  name: 'Formats',
  match: /(ol.format\b)/
}, {
  name: 'Geometry, Feature, and Style',
  match: /(ol.geom\b)|(ol.Feature\b)|(ol.style\b)/
}, {
  name: 'Projections and Extents',
  match: /(ol.proj\b)|(ol.extent\b)/
}, {
  name: 'Misc.',
  match: /.*/
}];

function byName(a, b) {
  return a.name < b.name ? -1 : 1;
}

function getClassName(name) {
  const parts = name.split('#');
  if (parts.length === 2) {
    return parts[0];
  } else {
    return null;
  }
}

export default function(symbols) {
  const groups = defs.map(def => ({name: def.name, classLookup: {}, functions: []}));

  symbols.slice().sort(byName).forEach(symbol => {
    for (let g = 0, gg = groups.length; g < gg; ++g) {
      if (!defs[g].match.test(symbol.name)) {
        continue;
      }
      const group = groups[g];
      if (symbol.kind === 'class') {
        group.classLookup[symbol.name] = {
          name: symbol.name,
          description: symbol.description,
          methods: [symbol]
        };
      } else if (symbol.kind === 'function') {
        const className = getClassName(symbol.name);
        if (className) {
          if (!(className in group.classLookup)) {
            // constructor not exportable
            group.classLookup[className] = {
              name: className,
              methods: []
            };
          }
          group.classLookup[className].methods.push(symbol);
        } else {
          group.functions.push(symbol);
        }
      }
      break;
    }
  });

  // assign sorted classes to groups
  groups.forEach(group => {
    group.classes = Object.keys(group.classLookup)
        .map(name => group.classLookup[name])
        .sort(byName);
  });

  return groups;
}
