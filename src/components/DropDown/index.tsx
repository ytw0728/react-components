import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DropDownProps} from './types'
import DropDownWrapper from './DropDownWrapper';

function DropDown(props: DropDownProps) {
    const [userTxt, setUserTxt] = useState('');
    const itemList = props.itemList.filter((v) => v.value.includes(userTxt))

    return (
        <DropDownWrapper
            height={props.height}
            itemList={itemList}
            userTxt={userTxt}
            setUserTxt={setUserTxt}
            placeholder="Type..."
            noDataMessage="Empty"
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            onSelect={props.onSelect}
            rootLoading={props.loading}
        ></DropDownWrapper>
    )
}

DropDown.propTypes = {
    placeholder: PropTypes.string,
    noDataMessage: PropTypes.string,
    selectedItem: PropTypes.string,
    itemList: PropTypes.arrayOf(PropTypes.object),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSelect: PropTypes.func,

    loading: PropTypes.bool,
}
export default DropDown;