import type { Meta, StoryObj } from '@storybook/react';

import { useDraggable } from './useDraggable';
import type { DragPos, DragState } from './useDraggable';

const meta: Meta = {
  title: 'Hooks/useDraggable',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useDraggable** provides pointer-event-based drag handling using \`setPointerCapture\` — no HTML drag-and-drop API. Returns position state and spread-ready event handlers.

\`\`\`ts
const { pos, dragging, handlers } = useDraggable(initial: DragPos): DragState;

interface DragPos {
  x: number;  // left offset from parent
  y: number;  // top offset from parent
}

interface DragState {
  pos: DragPos;
  dragging: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
  };
}
\`\`\`

- Position is **relative to the offset parent** (the nearest positioned ancestor).
- Uses \`setPointerCapture\` so dragging continues even when the cursor leaves the element.
- Spread \`{...handlers}\` onto the draggable element to wire all events at once.
- The draggable element should be \`position: absolute\` inside a \`position: relative\` container.

> Works with both mouse and touch/stylus input (pointer events are device-agnostic).
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// Suppress unused import warning — types are re-exported for docs
type _DragPos = DragPos;
type _DragState = DragState;

// ---------------------------------------------------------------------------
// Default — draggable colored box, shows x/y position
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const { pos, dragging, handlers } = useDraggable({ x: 80, y: 80 });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-[360px] h-[280px] rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50 overflow-hidden select-none">
        <p className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-neutral-400 dark:text-neutral-500">drag area</p>
        <div
          {...handlers}
          style={{ position: 'absolute', left: pos.x, top: pos.y }}
          className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-grab active:cursor-grabbing select-none transition-shadow ${
            dragging
              ? 'bg-violet-600 shadow-2xl shadow-violet-500/40 scale-105'
              : 'bg-violet-500 shadow-lg shadow-violet-500/30'
          }`}
        >
          <span className="text-white text-2xl">⠿</span>
          <span className="text-white text-xs font-mono opacity-80">drag me</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-3 text-center">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-0.5">X</p>
          <p className="text-lg font-bold tabular-nums text-neutral-900 dark:text-white">{Math.round(pos.x)}</p>
        </div>
        <div className="rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-3 text-center">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-0.5">Y</p>
          <p className="text-lg font-bold tabular-nums text-neutral-900 dark:text-white">{Math.round(pos.y)}</p>
        </div>
        <div className={`rounded-lg border p-3 text-center transition-colors ${dragging ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-700' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'}`}>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-0.5">State</p>
          <p className={`text-sm font-semibold ${dragging ? 'text-violet-600 dark:text-violet-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
            {dragging ? 'dragging' : 'idle'}
          </p>
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drag the violet box around the dashed canvas. X and Y positions update in real-time. The box turns brighter and scales up slightly while being dragged.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// DraggableCard — realistic card on a canvas
// ---------------------------------------------------------------------------
function DraggableCardDemo() {
  const { pos, dragging, handlers } = useDraggable({ x: 40, y: 40 });

  return (
    <div className="relative w-[480px] h-[340px] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden select-none">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-neutral-400 dark:text-neutral-500 select-none">
        Drag the card anywhere on the canvas
      </p>

      {/* Draggable card */}
      <div
        {...handlers}
        style={{ position: 'absolute', left: pos.x, top: pos.y }}
        className={`w-52 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
          dragging ? 'shadow-2xl rotate-1' : 'shadow-lg'
        }`}
      >
        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            PA
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">Priya Bagus</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">Backend Engineer</p>
          </div>
          <div className="ml-auto text-neutral-300 dark:text-neutral-600 cursor-grab">⠿</div>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Current task</p>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">Implement approval workflow for asset registration</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">In Progress</span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">Due Dec 15</span>
          </div>
        </div>
      </div>

      {/* Position indicator */}
      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/20 dark:bg-black/40 text-xs font-mono text-white/80">
        ({Math.round(pos.x)}, {Math.round(pos.y)})
      </div>
    </div>
  );
}

export const DraggableCard: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'A realistic team member card that can be dragged anywhere on the dot-grid canvas. The card slightly rotates while being dragged for a natural feel.',
      },
    },
  },
  render: () => <DraggableCardDemo />,
};

// ---------------------------------------------------------------------------
// MultiDraggable — 3 independent draggable elements
// ---------------------------------------------------------------------------
interface DraggableNoteProps {
  initial: DragPos;
  color: string;
  label: string;
  content: string;
}

function DraggableNote({ initial, color, label, content }: DraggableNoteProps) {
  const { pos, dragging, handlers } = useDraggable(initial);

  return (
    <div
      {...handlers}
      style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex: dragging ? 10 : 1 }}
      className={`w-36 rounded-xl p-3 cursor-grab active:cursor-grabbing select-none transition-all ${color} ${
        dragging ? 'shadow-2xl rotate-2 scale-105' : 'shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-semibold opacity-70">{label}</p>
        <span className="text-xs opacity-50">⠿</span>
      </div>
      <p className="text-xs leading-relaxed opacity-80">{content}</p>
    </div>
  );
}

function MultiDraggableDemo() {
  const NOTES = [
    {
      initial: { x: 20, y: 20 },
      color: 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100',
      label: 'To-Do',
      content: 'Review IAM service middleware auth flow',
    },
    {
      initial: { x: 180, y: 60 },
      color: 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100',
      label: 'In Progress',
      content: 'Implement JSONB snapshot for approval data',
    },
    {
      initial: { x: 60, y: 160 },
      color: 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100',
      label: 'Done',
      content: 'Add AES-256-GCM payload codec to ts-utils',
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-[380px] h-[280px] rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50 overflow-hidden">
        <p className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-neutral-400 dark:text-neutral-500 select-none whitespace-nowrap">
          3 independent draggable sticky notes
        </p>
        {NOTES.map((note) => (
          <DraggableNote key={note.label} {...note} />
        ))}
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Each note has its own \`useDraggable\` instance with independent position state.
      </p>
    </div>
  );
}

export const MultiDraggable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three independent sticky notes each powered by their own `useDraggable` instance. Drag any note independently — positions do not affect each other.',
      },
    },
  },
  render: () => <MultiDraggableDemo />,
};

// ---------------------------------------------------------------------------
// WithBounds — dragging constrained to container bounds
// ---------------------------------------------------------------------------
function WithBoundsDemo() {
  const { pos, dragging, handlers } = useDraggable({ x: 140, y: 90 });

  const CONTAINER_W = 360;
  const CONTAINER_H = 240;
  const BOX_W = 64;
  const BOX_H = 64;

  const clampedX = Math.max(0, Math.min(pos.x, CONTAINER_W - BOX_W));
  const clampedY = Math.max(0, Math.min(pos.y, CONTAINER_H - BOX_H));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative select-none overflow-hidden rounded-xl border-2 border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/10"
        style={{ width: CONTAINER_W, height: CONTAINER_H }}>
        <p className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-violet-400 dark:text-violet-500 select-none whitespace-nowrap">
          bounded drag area
        </p>

        <div
          {...handlers}
          style={{ position: 'absolute', left: clampedX, top: clampedY, width: BOX_W, height: BOX_H }}
          className={`rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-shadow ${
            dragging ? 'bg-violet-600 shadow-2xl shadow-violet-500/40' : 'bg-violet-500 shadow-md'
          }`}
        >
          <span className="text-white text-2xl select-none">⠿</span>
        </div>
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center max-w-[360px]">
        Position is clamped using <code className="font-mono">Math.max / Math.min</code> — the element stays within the container even when the cursor exits.
      </p>
    </div>
  );
}

export const WithBounds: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drag the box — it cannot leave the violet container. Bounds are enforced by clamping `pos.x` and `pos.y` between `0` and `container − elementSize`. This is applied at render time, not in the hook.',
      },
    },
  },
  render: () => <WithBoundsDemo />,
};
