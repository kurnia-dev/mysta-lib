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
import CommandPalette from './commandpalette';
import ComparisonTable from './comparisontable';
import CopyButton from './copybutton';
import Dialog from './dialog';
import Dropdown from './dropdown';
import EmptyState from './emptystate';
import FieldWrapper from './fieldwrapper';
import FloatingActionButton from './floatingactionbutton';
import Form from './form';
import global from './global';
import HPBar from './hpbar';
import IconCard from './iconcard';
import KeyboardHelp from './keyboardhelp';
import ListItem from './listitem';
import Pagination from './pagination';
import MobileActionBar from './mobileactionbar';
import PinnedPaper from './pinnedpaper';
import PolaroidCard from './polaroidcard';
import ProgressBar from './progressbar';
import PullToRefresh from './pulltorefresh';
import RadioButton from './radiobutton';
import SearchBar from './searchbar';
import SkeletonLoader from './skeletonloader';
import Slideover from './slideover';
import Spinner from './spinner';
import StickyNote from './stickynote';
import StatCard from './statcard';
import Stepper from './stepper';
import TabMenu from './tabmenu';
import ThemeSwitcher from './themeswitcher';
import Timeline from './timeline';
import Toast from './toast';
import ToggleSwitch from './toggleswitch';
import MultiPhaseToast from './multiphasetoast';
import NumberStepper from './numberstepper';
import PricingCard from './pricingcard';
import Separator from './separator';
import Slider from './slider';
import Tooltip from './tooltip';
// Phase E — new components
import StampBadge from './stampbadge';
import Table from './table';
import TerminalEmbed from './terminalembed';
import Typewriter from './typewriter';

const directives = {
  Tooltip,
};

const yurei = {
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

  // Phase D
  Spinner,
  EmptyState,
  ProgressBar,
  HPBar,
  MobileActionBar,
  CopyButton,
  Pagination,
  Stepper,
  Timeline,
  ComparisonTable,
  ThemeSwitcher,
  IconCard,

  // Phase E — Overlays & Layout
  Slideover,
  KeyboardHelp,
  CommandPalette,
  PolaroidCard,
  PinnedPaper,
  StickyNote,

  // Phase F — Form & Display
  NumberStepper,
  Slider,
  PricingCard,
  MultiPhaseToast,
  Separator,

  // Phase E — new components
  StampBadge,
  Table,
  TerminalEmbed,
  Typewriter,
};

export default yurei;
