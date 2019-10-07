const fs = require('fs');

function camelize(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
}

const fontFileNames = () => {
  const array = fs.readdirSync('res/fonts').map(file => {
    return file.replace('.ttf', '').replace('.otf', '');
  });
  return Array.from(new Set(array));
};

const generate = () => {
  const properties = fontFileNames()
    .map(name => {
      const identifier = camelize(name);
      return `${identifier}: '${name}',`;
    })
    .join('\n  ');
  const string = `const fonts = {
  ${properties}
};
export default fonts;
`;
  fs.writeFileSync('res/fonts.js', string, 'utf8');
};
generate();
