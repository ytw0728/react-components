interface IItem {
    value: string;
    key: number;
    focused: boolean;
};

interface IDropDownInputProps {
    placeholder: string;
};

interface IDropDownListProps {
    noDataMessage: string;
    itemList: IItem[];
    height: number;
};

interface IDropDownListWrapperProps extends IDropDownListProps {}
interface IDropDownWrapperProps extends IDropDownInputProps, IDropDownListWrapperProps {}
interface IDropDownProps extends IDropDownWrapperProps {}

// types
export type DropDownProps = IDropDownProps & {
    loading: boolean;

    onFocus?: () => void;
    onBlur?: () => void;
    onSelect?: (v: string) => void;
};

export type DropDownWrapperProps = IDropDownWrapperProps & {
    rootLoading: boolean;

    userTxt: string;
    setUserTxt: (v: string) => void;

    onFocus?: () => void;
    onBlur?: () => void;
    onSelect?: (v: string) => void;
};

export type DropDownInputProps = IDropDownInputProps & {
    inputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    userTxt: string;

    onChange: (v: string) => void;
};

export type DropDownListWrapperProps = IDropDownListWrapperProps & {
    loading: boolean;
    focusedIdx: number;
    setFocusedIdx: (v: number) => void;

    onSelect: (v: string) => void;
};

export type DropDownListProps = IDropDownListProps & {
    loading: boolean;

    itemSize: number;
    scrollHeight: number;
    scrollTop: number;
    focusedItem: number;
    range: [number, number, number, number]; //start, end, length, firstTopV

    setScrollTop: (v: number) => void;

    onSelect: (v: string) => void;
};

export type ListItem = IItem;