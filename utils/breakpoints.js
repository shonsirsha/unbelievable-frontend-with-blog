export const size = {
	// Extra small devices (portrait phones, less than 576px)
	// No media query since this is the default in Bootstrap
	extraSmall: 0,
	// Small devices (landscape phones, 576px and up)
	small: 576,
	// Medium devices (tablets, 768px and up)
	medium: 768,
	// Large devices (desktops, 992px and up)
	large: 992,
	// Extra large devices (large desktops, 1200px and up)
	extraLarge: 1200,
};

// prettier-ignore
export const mediaBreakpoint = {
  up: {
    xs: ` (min-width: ${size.extraSmall}px)`,
    sm: ` (min-width: ${size.small}px)`,
    md: ` (min-width: ${size.medium}px)`,
    lg: ` (min-width: ${size.large}px)`,
    xl: ` (min-width: ${size.extraLarge}px)`,
  },
  down: {
    xs: ` (max-width: ${size.extraSmall - 1}px)`,
    sm: ` (max-width: ${size.small - 1}px)`,
    md: ` (max-width: ${size.medium - 1}px)`,
    lg: ` (max-width: ${size.large - 1}px)`,
    xl: ` (max-width: ${size.extraLarge - 1}px)`,
  },
  only: {
    xs: ` (max-width: ${size.extraSmall - 1}px)`,
    sm: ` (min-width: ${size.small}px) and (max-width: ${size.medium - 1}px))`,
    md: ` (min-width: ${size.medium}px) and (max-width: ${size.large - 1}px))`,
    lg: ` (min-width: ${size.large}px) and (max-width: ${size.extraLarge - 1}px))`,
    xl: ` (min-width: ${size.extraLarge}px)`,
  },
}
