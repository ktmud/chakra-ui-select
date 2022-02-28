import { chakra, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoCaretDown } from '@react-icons/all-files/io5/IoCaretDown';
import { SelectOption, SelectRendererProps } from '../types';

export type DropdownIndicatorProps<Item extends SelectOption> =
  SelectRendererProps<Item, 'dropdownIndicator'>;

export default function DropdownIndicator<Item extends SelectOption>({
  styles,
  variant,
  isOpen,
  isFocused,
  needBlur,
  openMenu,
  closeMenu,
  inputRef,
}: DropdownIndicatorProps<Item>) {
  const isBorderLessVariant = variant === 'borderless' || variant === 'flushed';
  return (
    <chakra.div
      __css={{
        ...styles.indicator,
        ...styles.dropdownIndicator,
        ...(isFocused
          ? { ...styles.indicatorFocused, ...styles.dropdownIndicatorFocused }
          : undefined),
      }}
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.button === 0) {
          // eslint-disable-next-line no-param-reassign
          needBlur.current = false;
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
            inputRef.current?.focus();
          }
        }
      }}
    >
      <Icon
        fontSize={isBorderLessVariant ? '11px' : '13px'}
        as={isBorderLessVariant ? IoCaretDown : ChevronDownIcon}
      />
    </chakra.div>
  );
}
