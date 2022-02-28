import { chakra } from '@chakra-ui/react';
import { SelectOption, SelectRendererProps } from '../types';

export type LabelProps<Item extends SelectOption> = SelectRendererProps<
  Item,
  'label'
>;

/**
 * A contexted label before the Select input.
 */
export default function Label<Item extends SelectOption>({
  label,
  id,
  styles,
}: LabelProps<Item>) {
  return (
    <chakra.label htmlFor={id} __css={styles.label} tabIndex={-1}>
      {label}
    </chakra.label>
  );
}
