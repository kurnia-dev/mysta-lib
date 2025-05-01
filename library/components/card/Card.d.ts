import { Severities } from '../../utils';
import { FC, HTMLAttributes, DragEvent } from 'react';
import { SeparatorProps } from '../separator/Separator.d';
import { Icons } from '../icon/Icon.d';

export interface KanbanDropEvent {
  originalEvent: DragEvent<HTMLDivElement>;
  destinationId?: string;
  destinationGroupId?: string;
}

export interface KanbanDragStartEvent {
  originalEvent: DragEvent<HTMLDivElement>;
  draggedId?: string;
  draggedGroupId?: string;
}

export interface CardData {
  originalEvent: MouseEvent;
  cardId?: string;
  groupId?: string;
}

/**
 * A single entry in a card's context menu, rendered in a popover.
 */
export interface CardPopoverMenu extends HTMLAttributes<HTMLSpanElement> {
  /** Identifier of the icon to display for this menu item */
  icon: Icons;
  /** Visual severity level (affects icon color/style) */
  severity?: Severities;
  /** Action on click */
  command?: (e: CardData) => void;
}

/**
 * Base props shared by all Card modes.
 */
interface BaseCardProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      'content' | 'children' | 'onDrop' | 'onDragStart'
    >,
    CardSeparatorProps {
  /** Optional header text displayed at the top */
  header?: string;
  /** Main body text of the card */
  content?: string;
  /** Optional footer text displayed at the bottom */
  footer?: string;

  /**
   * Unique identifier for the card element.
   *
   * If not provided, a UUID v4 will be generated internally. This can also be
   * set to your own unique ID or an existing ID from backend data (e.g. a database ObjectID) to
   * maintain consistency between server and client.
   */
  id?: string;
  clickable?: boolean;

  severity?: Severities;

  /**
   * @default true
   */
  useSeparator?: boolean;

  slots?: Record<keyof CardSlots, JSX.Element>;

  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full';
}

interface CardKanbanProps extends BaseCardProps {
  onDrop?: (e: KanbanDropEvent) => void;
  onDragStart?: (e: KanbanDragStartEvent) => void;

  mode?: 'kanban';
  menus?: CardPopoverMenu[];

  /**
   * Identifier used to associate this card with a specific group or column.
   *
   * This is particularly useful in Kanban-style layouts where cards are categorized
   * into different columns or swimlanes. The `groupId` helps distinguish the logical
   * grouping and can be used to sort, filter, or control drag-and-drop behavior.
   *
   * Example values might include a column ID like 'todo', 'in-progress', or 'done'.
   */
  groupId?: string;
}

interface CardContainerProps extends BaseCardProps {
  mode?: 'container';
}

export type CardProps = CardKanbanProps | CardContainerProps;

export interface CardSlots {
  header?: JSX.Element;
  content?: JSX.Element;
  footer?: JSX.Element;
}

export interface CardSeparatorProps {
  orientation?: SeparatorProps['orientation'];
  decorative?: SeparatorProps['decorative'];
}

/**
 * Card component for custom section.
 *
 * @component
 */
export const Card: FC<CardProps>;
