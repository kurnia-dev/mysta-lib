import Badge from './badge';
import BaseInput from './baseinput';
import Button from './button';
import Card from './card';
import Checkbox from './checkbox';
import Dialog from './dialog';
import FieldWrapper from './fieldwrapper';
import global from './global';
import RadioButton from './radiobutton';
import ToggleSwitch from './toggleswitch';
import Tooltip from './tooltip';

const directives = {
  Tooltip,
};

const inari = {
  global,
  ...directives,

  // Forms
  Checkbox,
  BaseInput,
  FieldWrapper,

  // Buttons
  Button,
  RadioButton,
  ToggleSwitch,

  // Data

  // Panels
  Dialog,

  // Menu

  // Overlays

  // Messages
  Card,

  // Media

  // Misc
  Badge,
};

export default inari;
