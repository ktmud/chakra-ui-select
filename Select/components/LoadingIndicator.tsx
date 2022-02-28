import { chakra } from '@chakra-ui/react';
import FlashingDots from 'components/common/FlashingDots';
import { SelectOption, SelectRendererProps } from '../types';

export type LoadingIndicatorProps<Item extends SelectOption> =
  SelectRendererProps<Item, 'loadingIndicator'>;

export default function LoadingIndicator<Item extends SelectOption>({
  isLoading,
  styles,
}: LoadingIndicatorProps<Item>) {
  return isLoading ? (
    <chakra.div
      __css={{
        ...styles.indicator,
        ...styles.loadingIndicator,
      }}
    >
      <FlashingDots
        width={5}
        dotSize={4}
        color="gray.500"
        endColor="gray.100"
      />
    </chakra.div>
  ) : null;
}
