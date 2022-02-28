import { chakra, Icon } from '@chakra-ui/react';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { SelectOption, SelectRendererProps } from '../types';

export type ClearIndicatorProps<Item extends SelectOption> =
  SelectRendererProps<Item, 'clearIndicator'>;

export default function ClearIndicator<Item extends SelectOption>({
  styles,
  resetSelection,
  setIsFocused,
  isFocused,
}: ClearIndicatorProps<Item>) {
  return (
    <chakra.div
      __css={{
        ...styles.indicator,
        ...styles.clearIndicator,
        ...(isFocused
          ? { ...styles.indicatorFocused, ...styles.clearIndicatorFocused }
          : undefined),
      }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        resetSelection();
        setIsFocused(false);
      }}
    >
      <Icon fontSize="11px" as={IoClose} />
    </chakra.div>
  );
}
