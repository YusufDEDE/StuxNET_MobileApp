const fs = require('fs');

function camelize(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
}

const imageFileNames = () => {
  const array = fs
    .readdirSync('res/images')
    .filter(file => {
      return file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.gif');
    })
    .map(file => {
      return file.replace('@2x.png', '.png').replace('@3x.png', '.png');
    });
  return Array.from(new Set(array));
};

const generate = () => {
  let properties = imageFileNames()
    .map(name => {
      const identifier = camelize(name)
        .replace('.png', '')
        .replace('.jpg', '')
        .replace('.gif', '');
      return `${identifier}: require('./images/${name}'),`;
    })
    .join('\n  ');
  const string = `const images = {
  ${properties}
};
export default images;
`;
  fs.writeFileSync('res/images.js', string, 'utf8');
};
generate();
