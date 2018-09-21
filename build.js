const fs = require('fs');
const path = require('path');
const tinycolor = require('tinycolor2');
const yaml = require('js-yaml');

const THEME_DIR = path.join(__dirname, 'theme');
const THEME_YAML_FILE = path.join(__dirname, 'src', 'plane.yml');
const THEME_YAML_FILE_LIGHT = path.join(__dirname, 'src', 'plane-light.yml');

if (!fs.existsSync(THEME_DIR)) {
    fs.mkdirSync(THEME_DIR);
}

const withAlphaType = new yaml.Type('!alpha', {
    kind: 'sequence',
    construct: data => {
        return data[0] + data[1];
    },
    represent: data => {
        return [data[0], data[1]];
    },
});
const schema = yaml.Schema.create([withAlphaType]);
const standard = fs.readFileSync(THEME_YAML_FILE, 'utf8');
const standard_light = fs.readFileSync(THEME_YAML_FILE_LIGHT, 'utf8');


fs.writeFileSync(
    path.join(THEME_DIR, 'plane.json'),
    JSON.stringify(yaml.load(standard, { schema }), null, 4)
);
fs.writeFileSync(
    path.join(THEME_DIR, 'plane-light.json'),
    JSON.stringify(yaml.load(standard_light, { schema }), null, 4)
);
