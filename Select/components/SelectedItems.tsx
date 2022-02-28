import React from 'react';
import { SelectOption, SelectRendererProps } from '../types';

export type SelectedItemsProps<Item extends SelectOption> = SelectRendererProps<
  Item,
  'selectedItems'
>;

export default function SelectedItems<Item extends SelectOption>({
  itemToString,
  selectedItems,
  mode,
  render,
}: SelectedItemsProps<Item>) {
  if (mode === 'keep') {
    return null;
  }
  return (
    <>
      {selectedItems.map((item, index) => {
        const label = itemToString(item);
        return render('selectedItem', {
          key: `selected-item-${label}`,
          index,
          item,
          itemLabel: label,
        });
      })}
    </>
  );
}
