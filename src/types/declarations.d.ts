declare module 'maath/random/dist/maath-random.esm' {
  export function inSphere(array: Float32Array, options?: { radius?: number }): Float32Array;
  export function inCircle(array: Float32Array, options?: { radius?: number }): Float32Array;
  export function inBox(array: Float32Array, options?: { sides?: number[] }): Float32Array;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'react-vertical-timeline-component/style.min.css';

declare module 'react-vertical-timeline-component' {
  import { ReactNode, CSSProperties, FC } from 'react';

  export interface VerticalTimelineProps {
    animate?: boolean;
    className?: string;
    layout?: '1-column' | '2-columns' | '1-column-left' | '1-column-right';
    lineColor?: string;
    children?: ReactNode;
  }

  export interface VerticalTimelineElementProps {
    className?: string;
    contentArrowStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    date?: string;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconOnClick?: () => void;
    iconStyle?: CSSProperties;
    position?: 'left' | 'right' | '';
    style?: CSSProperties;
    textClassName?: string;
    visible?: boolean;
    intersectionObserverProps?: {
      rootMargin?: string;
      triggerOnce?: boolean;
    };
    children?: ReactNode;
  }

  export const VerticalTimeline: FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: FC<VerticalTimelineElementProps>;
}
