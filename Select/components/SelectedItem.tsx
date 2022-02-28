import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Tag,
  TagLabel,
  TagCloseButton,
  Spacer,
  chakra,
} from '@chakra-ui/react';
import ActionIcon from 'components/common/ActionIcon';
import { SelectOption, SelectRendererProps } from '../types';

export type SelectedItemProps<Item extends SelectOption> = SelectRendererProps<
  Item,
  'selectedItem'
>;

function SelectedItemAsTag<Item extends SelectOption>({
  size,
  index,
  item,
  itemLabel,
  selectedItems,
  render,
  itemToString,
  removeSelectedItem,
}: SelectedItemProps<Item>) {
  return (
    <Tag size={size}>
      <TagLabel>
        {render('selectedItemContent', { index, item, itemLabel }) || itemLabel}
      </TagLabel>
      <TagCloseButton
        onClick={e => {
          const matchingItem = selectedItems.find(
            x => itemToString(x) === itemLabel,
          );
          if (matchingItem) {
            removeSelectedItem(matchingItem, 'x-selected-item');
          }
          e.stopPropagation();
        }}
      />
    </Tag>
  );
}

function SelectedItemAsListItem<Item extends SelectOption>({
  index,
  item,
  itemLabel,
  selectedItems,
  render,
  itemToString,
  removeSelectedItem,
  styles,
}: SelectedItemProps<Item>) {
  return (
    <chakra.div __css={styles.selectedItem} onClick={e => e.stopPropagation()}>
      <Spacer>
        {render('selectedItemContent', { index, item, itemLabel }) || itemLabel}
      </Spacer>
      <ActionIcon
        marginLeft={1}
        marginTop="1px"
        size="xs"
        colorScheme="gray"
        aria-label="Remove"
        icon={<SmallCloseIcon />}
        onClick={e => {
          const matchingItem = selectedItems.find(
            x => itemToString(x) === itemLabel,
          );
          if (matchingItem) {
            removeSelectedItem(matchingItem, 'x-selected-item');
          }
          e.stopPropagation();
        }}
      />
    </chakra.div>
  );
}

export default function SelectedItem<Item extends SelectOption>(
  props: SelectedItemProps<Item>,
) {
  const { mode } = props;
  if (mode === 'list') {
    return <SelectedItemAsListItem {...props} />;
  }
  if (mode === 'inside' || mode === 'tag') {
    return <SelectedItemAsTag {...props} />;
  }
  return (
    <chakra.span __css={props.styles.selectedItem}>
      {props.itemLabel}
    </chakra.span>
  );
}
