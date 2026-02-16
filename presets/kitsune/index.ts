import AppHeader from './appheader';
import Badge from './badge';
import BaseInput from './baseinput';
import BottomNavigation from './bottomnavigation';
import BottomSheet from './bottomsheet';
import Button from './button';
import Calendar from './calendar';
import Card from './card';
import Checkbox from './checkbox';
import Chip from './chip';
import Dialog from './dialog';
import Dropdown from './dropdown';
import FieldWrapper from './fieldwrapper';
import FloatingActionButton from './floatingactionbutton';
import Form from './form';
import global from './global';
import ListItem from './listitem';
import PullToRefresh from './pulltorefresh';
import RadioButton from './radiobutton';
import SearchBar from './searchbar';
import SkeletonLoader from './skeletonloader';
import StatCard from './statcard';
import TabMenu from './tabmenu';
import Toast from './toast';
import ToggleSwitch from './toggleswitch';
import Tooltip from './tooltip';

const directives = {
  Tooltip,
};

const kitsune = {
  global,
  ...directives,

  // Forms
  Form,
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
  Dropdown,

  // Menu
  TabMenu,

  // Overlays
  Toast,

  // Messages
  Card,

  // Media
  SkeletonLoader,

  // Misc
  Badge,
  Chip,
  PullToRefresh,

  // Mobile
  AppHeader,
  BottomNavigation,
  BottomSheet,
  Calendar,
  FloatingActionButton,
  ListItem,
  SearchBar,
  StatCard,
};

export default kitsune;
