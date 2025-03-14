
import React from 'react';
import { cn } from '@/lib/utils';

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number | string;
  [key: string]: any;
}

interface FlexBetweenProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  items = 'start',
  gap,
  ...props
}) => {
  const directionClass = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  }[direction];

  const wrapClass = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  }[wrap];

  const justifyClass = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify];

  const itemsClass = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  }[items];

  let gapClass = '';
  if (gap !== undefined) {
    if (typeof gap === 'number') {
      gapClass = `gap-${gap}`;
    } else {
      gapClass = `gap-[${gap}]`;
    }
  }

  return (
    <div
      className={cn(
        'flex',
        directionClass,
        wrapClass,
        justifyClass,
        itemsClass,
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const FlexBetween: React.FC<FlexBetweenProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Flex
      justify="between"
      items="center"
      className={className}
      {...props}
    >
      {children}
    </Flex>
  );
};
