import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DropDownInputProps } from './types';

const UserInput = styled.input`
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    &:focus {
        outline: 1px solid blue;
    }
`;

const InputArrow = styled.span`
    height: 100%;
    position: absolute;
    top: 1px;
    right: 1px;
    width: 20px;
    outline: none;
    cursor: pointer;
    & > i {
        border-color: #999999 transparent transparent transparent;
        border-style: solid;
        border-width: 5px 4px 0 4px;
        height: 0;
        width: 0;
        margin-left: -4px;
        margin-top: -2px;
        position: absolute;
        top: 50%;
        left: 50%;
    }
    &:hover > i, & > i:hover {
        border-color: #000000 transparent transparent transparent;
    }
`

function DropDownInput(props: DropDownInputProps) {
    let clearOnChange = {clear: () => {}};

    const debouncedOnChange = (value: string, time: number) => {
        const handler = setTimeout(() => {
            props.onChange(value)
        }, time);
        return {clear: () => clearTimeout(handler)};
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearOnChange.clear();
        clearOnChange = debouncedOnChange(e.currentTarget.value, 250);
    }

    useEffect(() => {
        const input = (props.inputRef.current as HTMLInputElement);
        input.value = props.userTxt;
        return () => clearOnChange.clear();
    }, [props.userTxt, props.inputRef, clearOnChange])

    return (
        <>
            <UserInput ref={props.inputRef} disabled={props.loading} placeholder={props.placeholder} onChange={onChange}>
            </UserInput>
            <InputArrow><i></i></InputArrow>
        </>
    )
}

DropDownInput.propTypes = {
    loading: PropTypes.bool,

    placeholder: PropTypes.string,
    userTxt: PropTypes.string,

    focusInput: PropTypes.func,

    onChange: PropTypes.func,
}
export default DropDownInput;