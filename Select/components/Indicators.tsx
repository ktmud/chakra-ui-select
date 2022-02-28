import { SelectOption, SelectRendererProps } from '../types';

export type ClearIndicatorProps<Item extends SelectOption> =
  SelectRendererProps<Item, 'indicators'>;

export default function Indicators<Item extends SelectOption>({
  render,
  mode,
  isAsync,
  isLoading,
  isHovering,
  selectedItems,
  isFocused,
}: ClearIndicatorProps<Item>) {
  return (
    <>
      {isLoading
        ? render('loadingIndicator')
        : (mode === 'inside' || mode === 'keep') &&
          (!isAsync || !isLoading) &&
          (isFocused || (isHovering && selectedItems.length > 0))
        ? render('clearIndicator')
        : render('dropdownIndicator')}
    </>
  );
}
