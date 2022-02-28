import { chakra, Input as BaseInput } from '@chakra-ui/react';
import AutosizeInput from 'react-input-autosize';
import { SelectOption } from '../types';
import { InputContainerProps } from './Container';

export type InputProps<Item extends SelectOption> = Omit<
  InputContainerProps<Item>,
  'onClick'
>;

export default function Input<Item extends SelectOption>({
  variant,
  size,
  mode,
  styles,
  isMulti,
  isFocused,
  selectedItems,
  inputProps,
}: InputProps<Item>) {
  if (mode === 'inside') {
    if (!isMulti && selectedItems.length > 0) {
      return <div {...inputProps} />;
    }
    return (
      <chakra.div
        __css={{
          ...styles.fauxInput,
          ...(isFocused ? styles.fauxInputFocused : undefined),
          ...(!isFocused && selectedItems.length > 0
            ? styles.inputHasValue
            : undefined),
          minWidth: `${(inputProps.placeholder?.length || 0) / 2}em`,
        }}
        as={AutosizeInput}
        {...inputProps}
      />
    );
  }
  return (
    <BaseInput
      size={size}
      variant={variant}
      // must use `sx` to override the default Charak Input style
      sx={{
        ...styles.input,
        ...(!isFocused && selectedItems.length > 0
          ? styles.inputHasValue
          : undefined),
      }}
      {...inputProps}
    />
  );
}
