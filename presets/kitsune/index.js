import badge from './badge/index.js';
import button from './button/index.js';
import card from './card/index.js';
import checkbox from './checkbox/index.js';
import dialog from './dialog/index.js';
import fieldwrapper from './fieldwrapper/index.js';
import global from './global.js';
import radiobutton from './radiobutton/index.js';
import baseinput from './baseinput/index.js';
import toggleswitch from './toggleswitch/index.js';
import tooltip from './tooltip/index.js';

const directives = {
  tooltip,
};

const kitsune = {
  global,
  ...directives,

  // Forms
  checkbox,
  baseinput,
  fieldwrapper,

  // Buttons
  button,
  radiobutton,
  toggleswitch,

  // Data

  // Panels
  dialog,

  // Menu

  // Overlays

  // Messages
  card,

  // Media

  // Misc
  badge,
};

export default kitsune;
