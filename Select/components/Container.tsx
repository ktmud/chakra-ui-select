/* eslint-disable no-underscore-dangle */
import { chakra } from '@chakra-ui/react';
import { useRef } from 'react';
import { SelectOption, SelectRendererProps } from '../types';

export type InputContainerProps<Item extends SelectOption> =
  SelectRendererProps<Item, 'container'>;

export default function InputContainer<Item extends SelectOption>({
  render,
  styles,
  selectedItems,
  onClick,
  isFocused,
  inputProps,
  inputRef,
  readOnly,
  setIsHovering,
}: InputContainerProps<Item>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <chakra.div
      ref={containerRef}
      __css={{
        ...styles.container,
        ...(isFocused
          ? {
              ...(styles.container as any)._focus,
              _hover: {
                ...(styles.container as any)._focus,
              },
            }
          : undefined),
        ...(selectedItems.length > 0 ? styles.containerHasSelected : undefined),
      }}
      onClick={
        readOnly
          ? undefined
          : e => {
              // clicking on ghost input and blankspaces within input container
              // should always open the menu
              inputRef.current?.focus();
              if (onClick) {
                onClick(e);
              }
              e.preventDefault();
            }
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {render('selectedItems', { selectedItems })}
      {render('input', { inputProps })}
      {render('indicators')}
    </chakra.div>
  );
}
