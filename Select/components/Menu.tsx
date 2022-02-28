import { chakra, Button } from '@chakra-ui/react';
import FlashingDots from 'components/common/FlashingDots';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { SelectOption, SelectRendererProps } from '../types';

export type MenuProps<Item extends SelectOption> = SelectRendererProps<
  Item,
  'menu'
>;

export type MenuItemProps<Item extends SelectOption> = SelectRendererProps<
  Item,
  'menuItem'
>;

export type MenuCreateItemProps<Item extends SelectOption> =
  SelectRendererProps<Item, 'menuCreateItem'>;

export function MenuCreateItem<Item extends SelectOption>({
  itemLabel,
}: MenuCreateItemProps<Item>) {
  return <>{`Create "${itemLabel}"`}</>;
}

export function MenuItem<Item extends SelectOption>({
  index,
  createdIndex,
  item,
  itemLabel,
  highlightedIndex,
  render,
  styles,
  getItemProps,
  isItemSelected,
}: MenuItemProps<Item>) {
  const itemProps = getItemProps({
    item,
    index,
  });
  return (
    <Button
      type="button"
      isActive={highlightedIndex === index}
      __css={{
        ...styles.menuItem,
        ...(isItemSelected(item) ? styles.menuItemSelected : undefined),
      }}
      {...itemProps}
    >
      {index === createdIndex
        ? render('menuCreateItem', { item, itemLabel, index, getItemProps })
        : itemLabel}
    </Button>
  );
}

export default function Menu<Item extends SelectOption>({
  render,
  isOpen,
  filteredItems,
  getMenuProps,
  getItemProps,
  itemToString,
  isLoading,
  readOnly,
  menuWidth,
  menuMinWidth,
  menuMaxWidth,
  styles,
}: MenuProps<Item>) {
  const { ref: menuRef, ...menuProps } = getMenuProps({});

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const referenceElement = useRef<HTMLDivElement | null>(null);

  const {
    styles: popperStyles,
    attributes,
    update: updateMenuPosition,
  } = usePopper(referenceElement.current, popperElement, {
    placement: 'bottom-start',
  });

  const menu = useMemo(
    () =>
      !readOnly &&
      isOpen &&
      filteredItems.length > 0 && (
        <chakra.div __css={styles.menuList}>
          {isLoading ? (
            <chakra.div __css={styles.menuItem}>
              <FlashingDots />
            </chakra.div>
          ) : (
            filteredItems.map((item, index) => {
              const itemLabel = itemToString(item);
              const node = render('menuItem', {
                item,
                itemLabel,
                index,
                getItemProps,
                key: itemLabel,
              });
              return node;
            })
          )}
        </chakra.div>
      ),
    [
      filteredItems,
      getItemProps,
      isLoading,
      isOpen,
      itemToString,
      readOnly,
      render,
      styles.menuItem,
      styles.menuList,
    ],
  );

  // adding/removing items may change container height and menu position.
  useEffect(() => {
    if (isOpen && filteredItems.length > 0 && updateMenuPosition) {
      setTimeout(updateMenuPosition, 60);
    }
  }, [filteredItems.length, isOpen, updateMenuPosition]);

  return (
    <chakra.div __css={styles.menuWrap}>
      <div
        ref={elem => {
          referenceElement.current = elem;
        }}
        style={popperStyles.reference}
      />
      <chakra.div
        ref={elem => {
          menuRef(elem);
          setPopperElement(elem);
        }}
        __css={styles.menu}
        width={menuWidth}
        minWidth={menuMinWidth}
        maxWidth={menuMaxWidth}
        style={popperStyles.popper}
        {...attributes.popper}
        {...menuProps}
      >
        {menu}
      </chakra.div>
    </chakra.div>
  );
}
