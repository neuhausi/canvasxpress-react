// Type definitions for canvasxpress-react
// Project: https://www.canvasxpress.org
// Definitions: https://github.com/neuhausi/canvasXpress-react

import * as React from 'react';
import * as CanvasXpress from 'canvasxpress';

export = CanvasXpressReact;

interface CanvasXpressReactProps {
  /** DOM id assigned to the rendered <canvas>. */
  target: string;
  /** CanvasXpress data object. */
  data?: CanvasXpress.CXData;
  /** CanvasXpress configuration. */
  config?: CanvasXpress.CXConfig;
  /** CanvasXpress event handlers. */
  events?: CanvasXpress.CXEvents;
  /** Canvas width in pixels (default 500). */
  width?: number;
  /** Canvas height in pixels (default 500). */
  height?: number;
  /** Enable responsive resizing (default false). */
  responsive?: boolean;
  /** Aspect ratio for responsive mode, e.g. "1:1" (default "1:1"). */
  aspectratio?: string;
  /** Receives the live CanvasXpress instance on mount, and `undefined` on unmount. */
  onRef?: (instance: CanvasXpress.CanvasXpressInstance | undefined) => void;
}

declare class CanvasXpressReact extends React.Component<CanvasXpressReactProps> {
  /** The live CanvasXpress instance, available after mount. */
  graph?: CanvasXpress.CanvasXpressInstance;
}
