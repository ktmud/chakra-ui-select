import {
  useMultiStyleConfig,
  HTMLChakraProps,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { RendererProps } from 'hooks/useRenderers';
import {
  UseComboboxReturnValue,
  UseComboboxStateChangeTypes,
  UseMultipleSelectionStateChangeTypes,
} from 'downshift';
import { MutableRefObject, MouseEventHandler, ReactNode } from 'react';

export type MultiStyles = ReturnType<typeof useMultiStyleConfig>;

export type StrictSelectOption = { label: string; value: any } | { id: string };
export type SelectOption = string | StrictSelectOption;
export type OptionValue<T extends SelectOption> = T extends { value: any }
  ? T['value']
  : T;

export type ChangeTriggerType =
  | UseComboboxStateChangeTypes
  | UseMultipleSelectionStateChangeTypes
  | 'backspace-delete'
  | 'x-selected-item';

export type ChoiceLoader<Item> = (
  searchInput: string,
) => Item[] | Promise<Item[]>;

export type FauxSelectVariant =
  | 'outline'
  | 'filled'
  | 'unstyled'
  | 'borderless';

export type MultiSelectMode = 'tag' | 'inside' | 'list' | 'keep';

/**
 * Shared props of both SingleSelect and MultiSelect.
 */
export type CommonSelectProps<
  Item extends SelectOption,
  ItemValue = OptionValue<Item>,
> = Pick<HTMLChakraProps<'div'>, 'width' | 'minWidth' | 'maxWidth'> & {
  id?: string;
  /**
   * URL param name.
   */
  name: string;
  /**
   * Control label. Defaults to capitalized `name`.
   */
  label?: ReactNode;
  choices?: Item[] | ChoiceLoader<Item>;
  placeholder?: string;
  readOnly?: boolean;
  initialIsOpen?: boolean;
  menuWidth?: string | number;
  menuMinWidth?: string | number;
  menuMaxWidth?: string | number;
  /**
   * Whether to allow creating a new item from typed string.
   */
  creatable?: boolean;
  itemToString?: (item: Item) => string;
  /**
   * Convert an newly created value into a new item.
   */
  stringToItem?: (text: string) => Item;
  /**
   * Convert selected item to value type passed to `onChange`.
   */
  getItemValue?: (item: Item) => ItemValue;
  filterItems?: (items: Item[], search: string) => Item[];
  onInputChange?: (inputString?: string) => void;
  size?: ChakraInputProps['size'];
  variant?: FauxSelectVariant;
  /**
   * Whether to remove the whitespaces around the input text.
   */
  trimInput?: boolean;
  /**
   * Whether to close menu when an item is selected.
   */
  closeOnSelect?: boolean;
  /**
   * Whether to clear search input when an item is selected.
   */
  clearSearchOnSelect?: boolean;
};

export type RendererSharedProps<Item extends SelectOption> = {
  variant?: string;
  size?: string;
  mode?: string;
  styles: MultiStyles;
  isAsync: boolean;
  isFocused: boolean;
  isHovering: boolean;
  isLoading: boolean | undefined;
  isMulti?: boolean;
  isItemSelected: (item: Item) => boolean;
  itemToString: (item: Item) => string;
  createdIndex: number;
  highlightedIndex: number;
  choices: Item[];
  filteredItems: Item[];
  selectedItems: Item[];
  setIsFocused: (isFocused: boolean) => void;
  setIsHovering: (isHovering: boolean) => void;
  addSelectedItem: (item: Item, eventType: ChangeTriggerType) => void;
  removeSelectedItem: (item: Item, eventType: ChangeTriggerType) => void;
  resetSelection: () => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  needBlur: MutableRefObject<boolean>;
  readOnly: boolean;
} & Pick<
  UseComboboxReturnValue<Item>,
  'openMenu' | 'closeMenu' | 'toggleMenu' | 'isOpen'
>;

export type AllSelectRendererKeys =
  | 'label'
  | 'container'
  | 'input'
  | 'indicators'
  | 'dropdownIndicator'
  | 'clearIndicator'
  | 'loadingIndicator'
  | 'menu'
  | 'menuItem'
  | 'menuCreateItem'
  | 'selectedItems'
  | 'selectedItem'
  | 'selectedItemContent';

type InputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  ref: (node: HTMLInputElement | null) => void;
};

type ItemProps<Item extends SelectOption> = {
  index: number;
  item: Item;
  itemLabel: string;
};

type MenuItemProps<Item extends SelectOption> = Pick<
  UseComboboxReturnValue<Item>,
  'getItemProps'
> &
  ItemProps<Item>;

/**
 * Extra props for the sub components.
 */
export type SelectRendererExtraProps<Item extends SelectOption> = Record<
  AllSelectRendererKeys,
  {}
> & {
  label: {
    id?: string;
    name?: string;
    label?: ReactNode;
    inputValue: string;
  };
  container: {
    onClick: MouseEventHandler<HTMLDivElement>;
    inputProps: InputProps;
  };
  input: {
    inputProps: InputProps;
  };
  menu: Pick<UseComboboxReturnValue<Item>, 'getItemProps' | 'getMenuProps'> & {
    menuWidth?: string | number;
    menuMinWidth?: string | number;
    menuMaxWidth?: string | number;
  };
  menuItem: MenuItemProps<Item>;
  menuCreateItem: MenuItemProps<Item>;
  dropdownIndicator: {
    isFocused?: boolean;
  };
  selectedItem: ItemProps<Item>;
  selectedItemContent: ItemProps<Item>;
  selectedItems: {
    selectedItems: Item[];
  };
};

export type SelectRendererProps<
  Item extends SelectOption,
  Key extends AllSelectRendererKeys = AllSelectRendererKeys,
> = RendererSharedProps<Item> &
  RendererProps<Key, never, SelectRendererExtraProps<Item>>;
