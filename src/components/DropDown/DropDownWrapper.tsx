import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { DropDownWrapperProps } from './types';
import DropDownInput from './DropDownInput';
import DropDownList from './DropDownList';

const maximumSize = 1.5e6; //33445500; // chrome
const itemSize = 34;
const throttlingThredholds = 1.5e6;
function getItemTop(topIdx: number, len: number, scrollTop: number, scrollHeight: number, idx: number = 0): number {
    const topV = topIdx * itemSize;
    const st = scrollTop * len * itemSize / scrollHeight;
    const diff = topV - st;
    return scrollTop + diff + idx * itemSize;
}

function DropDownWrapper(props: DropDownWrapperProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const viewWindow = Math.ceil(props.height / itemSize * 2);

    const [listVisible, setListVisible] = useState(false);
    const [focusedItem, setFocusedItem] = useState(-1);
    const [scrollTop, setScrollTop] = useState(0);

    
    const throttlingTimeout = props.itemList.length > throttlingThredholds ? 50 : 0;
    let lockOnKeyDown = true;
    setTimeout(() => lockOnKeyDown = false, throttlingTimeout);

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setListVisible(true);
        if (props.onFocus)
            props.onFocus()
    }
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node))
            return;
        setListVisible(false);
        setFocusedItem(-1);
        if (props.onBlur)
            props.onBlur()
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (props.itemList.length === 0 || lockOnKeyDown) {
            lockOnKeyDown && e.preventDefault();
            return false;
        }
        const keyCode = e.keyCode;
        const isCtrl = e.ctrlKey;

        const nowIdx = focusedItem > -1 ? props.itemList.findIndex( (v) => v.key === focusedItem) : 0;
        const nowItem = focusedItem;

        if (keyCode === 16 || keyCode === 17) { // shift, ctrl
            return true;
        } else if ((33 <= keyCode && keyCode <= 36) || (37 <= keyCode && keyCode <= 40)) {
            if (keyCode === 35 /* end */ || keyCode === 36 /* home */||
                keyCode === 38 /*up*/|| keyCode === 40 /*down*/ ||
                keyCode === 33 /*pageUp*/ || keyCode === itemSize/*pageDown*/
            ) {
                let idx = nowIdx;
                if (nowItem > -1) {
                    switch(keyCode) {
                        case 35: idx = isCtrl ? props.itemList.length - 1 : idx; break;
                        case 36: idx = isCtrl ? 0 : idx; break;
                        case 33: idx -= 6; break;
                        case 34: idx += 6; break;
                        case 38: idx--; break;
                        case 40: idx++; break;
                    }
                }
                
                if ((nowIdx === 0 && idx === 0) || idx !== nowIdx) {
                    idx = idx >= 0 ? idx : props.itemList.length + idx;
                    idx %= props.itemList.length;
                    setFocusedItem(props.itemList[idx].key);
                }
                e.preventDefault();
            }
            return true;
        } else if (keyCode === 13 ) { // enter
            let item;
            if (nowItem > -1 && (item = props.itemList[nowIdx])) {
                listOnSelect(item.value);
            }
        }
    }

    const inputOnChange = (v: string) => {
        props.setUserTxt(v);
    }
    const listOnSelect = (v: string) => {
        props.setUserTxt(v);
        if (props.onSelect)
            props.onSelect(v);
    }

    const scrollHeight = Math.min(props.itemList.length * itemSize, maximumSize);
    const scrollMax = scrollHeight - props.height;

    const vItemSize = props.itemList.length * itemSize > maximumSize ? maximumSize / props.itemList.length : itemSize;
    const vScrollHeight = scrollHeight - props.height + vItemSize * Math.floor(props.height / itemSize);
    const vScrollTop = scrollTop * props.itemList.length * itemSize / vScrollHeight;
    const start = (vScrollTop / itemSize) - (vScrollTop / itemSize % Math.floor(viewWindow / 2));
    const end = Math.min(start + viewWindow, props.itemList.length);
    const startIdx = Math.round(start);
    const endIdx = Math.round(end);
    const firstTopV = getItemTop(startIdx, props.itemList.length, scrollTop, vScrollHeight);

    useEffect(() => {
        let idx = focusedItem > -1 ? props.itemList.findIndex(v => v.key === focusedItem) : 0;
        const itemTop = getItemTop(startIdx, props.itemList.length, scrollTop, vScrollHeight, idx - start);
        if (itemTop < scrollTop) {
            const newTopV = idx * vItemSize / scrollHeight * vScrollHeight;
            setScrollTop(newTopV);
        } else if (itemTop + itemSize > scrollTop + props.height) {
            const newTopV = idx * vItemSize / scrollHeight * vScrollHeight;
            setScrollTop(newTopV);
        }
    }, [focusedItem, props.itemList]);

    useEffect(() => {
        setFocusedItem(-1);
    }, [props.itemList]);


    return (
        <div style={{width: 300, position: 'relative', height: itemSize}} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown}>
            <DropDownInput
                inputRef={inputRef}
                placeholder={props.placeholder}
                userTxt={props.userTxt}
                onChange={inputOnChange}
                loading={props.rootLoading}
            ></DropDownInput>
            {
                listVisible &&
                <DropDownList
                    itemList={props.itemList.slice(startIdx,endIdx + 1)}
                    range={[start, end, props.itemList.length, firstTopV]}
                    focusedItem={focusedItem}

                    height={props.height}
                    itemSize={itemSize}
                    scrollHeight={scrollHeight}
                    scrollTop={scrollTop}
                    setScrollTop={(v) => setScrollTop(v > scrollMax ? scrollMax : v)}
                    noDataMessage={props.noDataMessage}

                    onSelect={listOnSelect}
                    loading={props.rootLoading}
                ></DropDownList>
            }
        </div>
    );
}


DropDownWrapper.propTypes = {
    height: PropTypes.number,

    placeholder: PropTypes.string,
    noDataMessage: PropTypes.string,
    userTxt: PropTypes.string,
    setUserTxt: PropTypes.func,
    itemList: PropTypes.arrayOf(PropTypes.object),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSelect: PropTypes.func,
}
export default DropDownWrapper;