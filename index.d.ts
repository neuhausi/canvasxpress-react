// Type definitions for canvasxpress-react
// Project: https://www.canvasxpress.org
// Definitions: https://github.com/neuhausi/canvasXpress-react

import * as React from 'react';
import * as CanvasXpress from 'canvasxpress';

export = CanvasXpressReact;

interface CanvasXpressReactProps {
  /** DOM id applied to the rendered <canvas> (optional; the component uses an
   *  internal ref, so a unique id is no longer required). */
  target?: string;
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

/**
 * The value resolved by a forwarded `ref`: the live CanvasXpress instance,
 * carrying a `graph` self-alias for backward compatibility with code that read
 * `ref.current.graph` off the previous class component.
 */
type CanvasXpressReactHandle = CanvasXpress.CanvasXpressInstance & {
  /** Self-reference to the CanvasXpress instance (legacy accessor). */
  graph: CanvasXpress.CanvasXpressInstance;
};

declare const CanvasXpressReact: React.ForwardRefExoticComponent<
  CanvasXpressReactProps & React.RefAttributes<CanvasXpressReactHandle>
>;
