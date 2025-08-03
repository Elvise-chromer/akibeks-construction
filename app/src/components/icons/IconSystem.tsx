import React from 'react';
import {
  // Navigation & Layout
  HiHome,
  HiMenu,
  HiX,
  HiChevronDown,
  HiChevronUp,
  HiChevronLeft,
  HiChevronRight,
  HiArrowLeft,
  HiArrowRight,
  HiArrowUp,
  HiArrowDown,
  
  // Business & Construction
  HiOfficeBuilding,
  HiHome as HiHouse,
  HiCog,
  HiBriefcase,
  HiClipboard,
  HiClipboardList,
  HiClipboardCheck,
  HiDocumentText,
  HiDocument,
  HiDocumentDownload,
  HiDocumentAdd,
  HiFolder,
  HiFolderOpen,
  HiFolderAdd,
  
  // Communication
  HiPhone,
  HiMail,
  HiChat,
  HiChatAlt,
  HiChatAlt2,
  HiSpeakerphone,
  
  // Users & People
  HiUser,
  HiUsers,
  HiUserAdd,
  HiUserRemove,
  HiUserCircle,
  HiUserGroup,
  
  // Actions
  HiPlus,
  HiMinus,
  HiPencil,
  HiPencilAlt,
  HiTrash,
  HiDuplicate,
  HiRefresh,
  HiDownload,
  HiUpload,
  HiSave,
  HiPrinter,
  HiShare,
  HiExternalLink,
  
  // Status & Indicators
  HiCheck,
  HiCheckCircle,
  HiX as HiClose,
  HiXCircle,
  HiExclamation,
  HiExclamationCircle,
  HiInformationCircle,
  HiQuestionMarkCircle,
  HiEye,
  HiEyeOff,
  HiBell,
  
  // UI Elements
  HiSearch,
  HiFilter,
  HiSortAscending,
  HiSortDescending,
  HiCalendar,
  HiClock,
  HiAdjustments,
  HiColorSwatch,
  HiPhotograph,
  HiCamera,
  HiFilm,
  HiPlay,
  HiPause,
  HiStop,
  
  // Security & Settings
  HiLockClosed,
  HiLockOpen,
  HiKey,
  HiShieldCheck,
  HiShieldExclamation,
  HiFingerPrint,
  HiGlobe,
  
  // Data & Analytics
  HiChartBar,
  HiChartPie,
  HiTrendingUp,
  HiTrendingDown,
  HiDatabase,
  HiServer,
  HiCloud,
  HiCloudDownload,
  HiCloudUpload,
  
  // Geography & Location
  HiLocationMarker,
  HiMap,
  HiGlobeAlt,
  
  // Financial
  HiCash,
  HiCreditCard,
  HiReceiptTax,
  HiCalculator,
  
  // Tools & Construction Specific
  HiCog as HiWrench,
  HiCube,
  HiCubeTransparent,
  HiPuzzle,
  HiBeaker,
  HiLightBulb,
  HiSparkles,
  
  // Social & Media
  HiHeart,
  HiStar,
  HiBookmark,
  HiFlag,
  HiTag,
  HiHashtag,
  
  // Time & Scheduling
  HiCalendar as HiCalendarDays,
  HiClock as HiTime,
  HiClock as HiStopwatch,
  
  // Misc
  HiAcademicCap,
  HiBackspace,
  HiQrcode,
  HiCursorClick,
  HiDesktopComputer,
  HiDeviceMobile,
  HiDesktopComputer as HiDeviceTablet,
  HiSupport,
  HiCake,
  HiGift,
  HiLightningBolt,
  HiMoon,
  HiSun,
  HiVariable,
  HiViewGrid,
  HiViewList,
  HiZoomIn,
  HiZoomOut,
  HiAnnotation,
  HiBadgeCheck,
  HiCollection,
  HiCurrencyDollar,
  HiTemplate,
  HiBookOpen,
  HiLibrary,
  HiScale,
  HiSwitchHorizontal,
  HiSwitchVertical,
  HiThumbUp,
  HiThumbDown,
  HiVolumeUp,
  HiVolumeOff,
  HiWifi,
  HiChip,
  HiCode
} from 'react-icons/hi';

// Define icon categories for better organization
export const IconCategories = {
  NAVIGATION: 'navigation',
  BUSINESS: 'business',
  COMMUNICATION: 'communication',
  USERS: 'users',
  ACTIONS: 'actions',
  STATUS: 'status',
  UI: 'ui',
  SECURITY: 'security',
  DATA: 'data',
  LOCATION: 'location',
  FINANCIAL: 'financial',
  TOOLS: 'tools',
  SOCIAL: 'social',
  TIME: 'time',
  MISC: 'misc'
} as const;

// Main icon registry with categorization
export const IconRegistry = {
  // Navigation & Layout
  home: HiHome,
  house: HiHouse,
  menu: HiMenu,
  close: HiX,
  chevronDown: HiChevronDown,
  chevronUp: HiChevronUp,
  chevronLeft: HiChevronLeft,
  chevronRight: HiChevronRight,
  arrowLeft: HiArrowLeft,
  arrowRight: HiArrowRight,
  arrowUp: HiArrowUp,
  arrowDown: HiArrowDown,
  
  // Business & Construction
  building: HiOfficeBuilding,
  office: HiOfficeBuilding,
  gear: HiCog,
  settings: HiCog,
  briefcase: HiBriefcase,
  clipboard: HiClipboard,
  clipboardList: HiClipboardList,
  clipboardCheck: HiClipboardCheck,
  document: HiDocumentText,
  documentText: HiDocumentText,
  documentPlain: HiDocument,
  documentDownload: HiDocumentDownload,
  documentAdd: HiDocumentAdd,
  folder: HiFolder,
  folderOpen: HiFolderOpen,
  folderAdd: HiFolderAdd,
  
  // Communication
  phone: HiPhone,
  email: HiMail,
  mail: HiMail,
  chat: HiChat,
  chatAlt: HiChatAlt,
  chatAlt2: HiChatAlt2,
  announcement: HiSpeakerphone,
  
  // Users & People
  user: HiUser,
  users: HiUsers,
  userAdd: HiUserAdd,
  userRemove: HiUserRemove,
  userCircle: HiUserCircle,
  userGroup: HiUserGroup,
  team: HiUserGroup,
  
  // Actions
  add: HiPlus,
  plus: HiPlus,
  minus: HiMinus,
  subtract: HiMinus,
  edit: HiPencil,
  pencil: HiPencil,
  pencilAlt: HiPencilAlt,
  delete: HiTrash,
  trash: HiTrash,
  duplicate: HiDuplicate,
  copy: HiDuplicate,
  refresh: HiRefresh,
  reload: HiRefresh,
  download: HiDownload,
  upload: HiUpload,
  save: HiSave,
  print: HiPrinter,
  share: HiShare,
  externalLink: HiExternalLink,
  
  // Status & Indicators
  check: HiCheck,
  checkCircle: HiCheckCircle,
  success: HiCheckCircle,
  x: HiClose,
  xCircle: HiXCircle,
  error: HiXCircle,
  exclamation: HiExclamation,
  exclamationCircle: HiExclamationCircle,
  warning: HiExclamationCircle,
  info: HiInformationCircle,
  question: HiQuestionMarkCircle,
  help: HiQuestionMarkCircle,
  eye: HiEye,
  eyeOff: HiEyeOff,
  visible: HiEye,
  hidden: HiEyeOff,
  bell: HiBell,
  notification: HiBell,
  
  // UI Elements
  search: HiSearch,
  filter: HiFilter,
  sortAsc: HiSortAscending,
  sortDesc: HiSortDescending,
  calendar: HiCalendar,
  clock: HiClock,
  time: HiClock,
  adjustments: HiAdjustments,
  color: HiColorSwatch,
  photo: HiPhotograph,
  image: HiPhotograph,
  camera: HiCamera,
  video: HiFilm,
  play: HiPlay,
  pause: HiPause,
  stop: HiStop,
  
  // Security & Settings
  lock: HiLockClosed,
  locked: HiLockClosed,
  unlock: HiLockOpen,
  unlocked: HiLockOpen,
  key: HiKey,
  shieldCheck: HiShieldCheck,
  security: HiShieldCheck,
  shieldExclamation: HiShieldExclamation,
  fingerprint: HiFingerPrint,
  globe: HiGlobe,
  
  // Data & Analytics
  chart: HiChartBar,
  chartBar: HiChartBar,
  chartPie: HiChartPie,
  analytics: HiChartBar,
  trending: HiTrendingUp,
  trendingUp: HiTrendingUp,
  trendingDown: HiTrendingDown,
  database: HiDatabase,
  server: HiServer,
  cloud: HiCloud,
  cloudDownload: HiCloudDownload,
  cloudUpload: HiCloudUpload,
  
  // Geography & Location
  location: HiLocationMarker,
  marker: HiLocationMarker,
  map: HiMap,
  globeAlt: HiGlobeAlt,
  
  // Financial
  cash: HiCash,
  money: HiCash,
  creditCard: HiCreditCard,
  tax: HiReceiptTax,
  receipt: HiReceiptTax,
  calculator: HiCalculator,
  
  // Tools & Construction Specific
  wrench: HiWrench,
  tool: HiWrench,
  cube: HiCube,
  cubeTransparent: HiCubeTransparent,
  puzzle: HiPuzzle,
  beaker: HiBeaker,
  lightbulb: HiLightBulb,
  idea: HiLightBulb,
  sparkles: HiSparkles,
  
  // Social & Media
  heart: HiHeart,
  like: HiHeart,
  star: HiStar,
  bookmark: HiBookmark,
  flag: HiFlag,
  tag: HiTag,
  hashtag: HiHashtag,
  
  // Time & Scheduling
  calendarDays: HiCalendarDays,
  schedule: HiCalendarDays,
  stopwatch: HiStopwatch,
  
  // Misc
  academic: HiAcademicCap,
  education: HiAcademicCap,
  backspace: HiBackspace,
  qr: HiQrcode,
  qrcode: HiQrcode,
  cursor: HiCursorClick,
  desktop: HiDesktopComputer,
  mobile: HiDeviceMobile,
  tablet: HiDeviceTablet,
  support: HiSupport,
  cake: HiCake,
  gift: HiGift,
  lightning: HiLightningBolt,
  fast: HiLightningBolt,
  moon: HiMoon,
  sun: HiSun,
  variable: HiVariable,
  grid: HiViewGrid,
  list: HiViewList,
  zoomIn: HiZoomIn,
  zoomOut: HiZoomOut,
  annotation: HiAnnotation,
  note: HiAnnotation,
  verified: HiBadgeCheck,
  badge: HiBadgeCheck,
  collection: HiCollection,
  dollar: HiCurrencyDollar,
  currency: HiCurrencyDollar,
  template: HiTemplate,
  book: HiBookOpen,
  library: HiLibrary,
  scale: HiScale,
  balance: HiScale,
  switchHorizontal: HiSwitchHorizontal,
  switchVertical: HiSwitchVertical,
  thumbUp: HiThumbUp,
  thumbDown: HiThumbDown,
  volume: HiVolumeUp,
  volumeOff: HiVolumeOff,
  wifi: HiWifi,
  chip: HiChip,
  code: HiCode
};

// Icon size variants
export const IconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
  '3xl': 'h-12 w-12'
} as const;

// Icon color variants
export const IconColors = {
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  accent: 'text-accent-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  gray: 'text-gray-600',
  white: 'text-white',
  black: 'text-black',
  current: 'text-current'
} as const;

// Props for the Icon component
interface IconProps {
  name: keyof typeof IconRegistry;
  size?: keyof typeof IconSizes;
  color?: keyof typeof IconColors;
  className?: string;
  title?: string;
  'aria-label'?: string;
  onClick?: () => void;
}

// Main Icon component
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'current',
  className = '',
  title,
  'aria-label': ariaLabel,
  onClick
}) => {
  const IconComponent = IconRegistry[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return <HiQuestionMarkCircle className={`${IconSizes[size]} ${IconColors[color]} ${className}`} />;
  }

  const iconClasses = `${IconSizes[size]} ${IconColors[color]} ${className} ${onClick ? 'cursor-pointer' : ''}`.trim();

  return (
    <IconComponent
      className={iconClasses}
      title={title}
      aria-label={ariaLabel || title}
      onClick={onClick}
    />
  );
};

// Helper component for icon buttons
interface IconButtonProps extends IconProps {
  variant?: 'ghost' | 'solid' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'ghost',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...iconProps
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    ghost: 'hover:bg-gray-100 focus:ring-gray-500',
    solid: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 focus:ring-gray-500'
  };

  const sizeClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-3',
    '2xl': 'p-3.5',
    '3xl': 'p-4'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[iconProps.size || 'md']}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      title={iconProps.title}
      aria-label={iconProps['aria-label'] || iconProps.title}
    >
      {loading ? (
        <Icon name="refresh" size={iconProps.size} className="animate-spin" />
      ) : (
        <Icon {...iconProps} className="" />
      )}
    </button>
  );
};

// Icon list component for browsing available icons
export const IconBrowser: React.FC<{
  onIconSelect?: (iconName: keyof typeof IconRegistry) => void;
  selectedIcon?: keyof typeof IconRegistry;
}> = ({ onIconSelect, selectedIcon }) => {
  const iconNames = Object.keys(IconRegistry) as Array<keyof typeof IconRegistry>;

  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 p-4">
      {iconNames.map((iconName) => (
        <button
          key={iconName}
          onClick={() => onIconSelect?.(iconName)}
          className={`
            p-3 rounded-lg border transition-colors
            ${selectedIcon === iconName 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
          title={iconName}
        >
          <Icon name={iconName} size="lg" className="mx-auto" />
          <div className="text-xs mt-1 truncate">{iconName}</div>
        </button>
      ))}
    </div>
  );
};

// Utility function to get icon by name
export const getIcon = (name: keyof typeof IconRegistry) => {
  return IconRegistry[name] || HiQuestionMarkCircle;
};

// Utility function to check if icon exists
export const hasIcon = (name: string): name is keyof typeof IconRegistry => {
  return name in IconRegistry;
};

export default Icon;