
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

const STATIC_METHOD_RE = /^(ol\.(\w+\.)?[A-Z]\w+)\.[a-z]\w+$/;

function getClassName(name) {
  let className;
  const parts = name.split('#');
  if (parts.length === 2) {
    className = parts[0];
  } else {
    var match = name.match(STATIC_METHOD_RE);
    if (match) {
      className = match[1];
    } else {
      className = '';
    }
  }
  return className;
}

export default function(info) {

  const index = {
    group: {},
    item: {},
    defines: {}
  };

  const groups = defs.map(def => ({
    name: def.name,
    children: []
  }));

  const groupedClasses = {};

  info.symbols.slice().sort(byName).forEach(symbol => {
    if (!(symbol.kind === 'function' || symbol.kind === 'class')) {
      return;
    }

    for (let i = 0, ii = groups.length; i < ii; ++i) {
      if (defs[i].match.test(symbol.name)) {

        const group = groups[i];
        index.group[symbol.name] = i;

        if (symbol.kind === 'class') {

          const len = group.children.push({
            name: symbol.name,
            children: [{name: symbol.name}]
          });
          groupedClasses[symbol.name] = true;
          index.item[symbol.name] = len - 1;

        } if (symbol.kind === 'function') {

          const className = getClassName(symbol.name);
          if (className) {
            // constructor is not exported or symbol is a class method
            if (!groupedClasses[className]) {
              const len = group.children.push({
                name: className,
                children: [{name: symbol.name}]
              });
              groupedClasses[className] = true;
              index.group[className] = i;
              index.item[className] = len - 1;
              index.item[symbol.name] = len - 1;
            } else {
              const itemIndex = index.item[className];
              group.children[itemIndex].children.push({name: symbol.name});
              index.item[symbol.name] = itemIndex;
            }
          } else {
            // symbol is a function
            const len = group.children.push({
              name: symbol.name,
              children: []
            });
            index.item[symbol.name] = len - 1;
          }
        }

        break;
      }
    }
  });

  // add the special defines group
  groups.push({
    name: 'Flags',
    children: info.defines.map((define, defineIndex) => {
      index.defines[define.name] = defineIndex;
      return {
        name: define.name,
        children: []
      };
    })
  });

  return {groups, index};
}
