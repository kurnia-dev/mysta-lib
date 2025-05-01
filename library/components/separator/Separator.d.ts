declare const ORIENTATIONS: readonly ['horizontal', 'vertical'];
type Orientation = (typeof ORIENTATIONS)[number];

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
}

export declare const Separator: (props: SeparatorProps) => JSX.Element;
