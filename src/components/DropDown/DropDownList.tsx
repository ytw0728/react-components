import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropDownListProps } from './types';


const DropDownWrapper = styled.div`
    position: absolute;
    z-index: 1000;
    background: white;
    box-sizing: border-box;
    top: 34px;
    left: 0;
    width: 100%;
    border: 1px solid #000;
    overflow: auto;
`;
const DropDownUl = styled.ul`
    position: relative
    width: 100%;
    max-height: 1500000px;
    overflow: hidden;
    display: inline-block;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;
const ListWrapItem = styled.li`
    position: absolute;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
`;
const ItemOption = styled.option`
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    line-height: 34px;
    padding: 0;
    padding-left: 1rem;
    margin: 0;
    background: none;
    outline: none;
    border: none;
    text-align: left;

    &:hover{
        cursor: pointer;
    }
    &:hover, &:focus, &.focused {
        background: #5897fb;
        color: white;
    }
`;

function DropDownList(props: DropDownListProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (wrapperRef && wrapperRef.current) {
            wrapperRef.current.scrollTop = props.scrollTop;
        }
    }, [props.scrollTop])
    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        props.setScrollTop(e.currentTarget.scrollTop);
        e.preventDefault();
    }
    const onItemClick = (e: React.MouseEvent<HTMLOptionElement>, v: string) => {props.onSelect(v);}
    const topV = props.range[3];

    const itemLists = props.itemList.map((v, idx) => {
        return (
            <ListWrapItem key={v.key} style={{top: topV + idx * props.itemSize}}>
                <ItemOption className={v.key === props.focusedItem || v.focused ? 'focused' : ''}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => onItemClick(e, v.value)}>
                    {v.value}
                </ItemOption>
            </ListWrapItem>
        )
    });

    return (
        <DropDownWrapper ref={wrapperRef} style={{height: props.height}} onScroll={onScroll} onMouseDown={(e) => e.preventDefault()}>
            {
                props.loading ? 'Loading...' :
                <DropDownUl ref={ulRef} style={{height: props.scrollHeight, minHeight: props.height}}>
                    {itemLists.length ? itemLists : props.noDataMessage}
                </DropDownUl>
            }
        </DropDownWrapper>
    );
}

DropDownList.propTypes = {
    loading: PropTypes.bool,

    height: PropTypes.number,
    itemSize: PropTypes.number,
    scrollTop: PropTypes.number,
    scrollHeight: PropTypes.number,
    setScrollTop: PropTypes.func,
    focusedItem: PropTypes.number,
    range: PropTypes.arrayOf(PropTypes.number),
    
    itemList: PropTypes.arrayOf(PropTypes.object),

    noDataMessage: PropTypes.string,
    onSelect: PropTypes.func,
}

export default DropDownList;





