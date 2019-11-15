import React, {useState, useEffect} from 'react';
import DropDown from 'components/DropDown';
import { ListItem } from 'components/DropDown/types';

function App() {
    const [selectedItem1, setSelectedItem1] = useState('');
    const [selectedItem2, setSelectedItem2] = useState('');
    const [selectedItem3, setSelectedItem3] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [itemList, setItemList] = useState<ListItem[]>([]);

    useEffect(() => {
        setItemList(Array.from({length: 2000000}).map((_, idx) => ({value: idx.toString(), key: idx, focused: false})));
        setIsLoading(false);
    }, [])

    const onBlur = () => {}
    const onFocus = () => {}
    const onSelect1 = (v: string) => {setSelectedItem1(v)}
    const onSelect2 = (v: string) => {setSelectedItem2(v)}
    const onSelect3 = (v: string) => {setSelectedItem3(v)}

    return (
        <>
            <p>{'[1]: ' + selectedItem1 +' [2]: ' + selectedItem2 + ' [3]: ' +selectedItem3}</p>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div style={ {width: 300, display: 'inline-block'} }>
                <DropDown
                    height={200}
                    itemList={itemList}
                    placeholder="Type..."
                    noDataMessage="Empty"
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect1}
                    loading={isLoading}
                ></DropDown>
            </div>
            <div style={ {width: 300, display: 'inline-block', marginLeft: 10} }>
                <DropDown
                    height={200}
                    itemList={Array.from({length: 1000}).map((_, idx) => ({value: idx.toString(), key: idx, focused: false}))}
                    placeholder="Type..."
                    noDataMessage="Empty"
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect2}
                    loading={isLoading}
                ></DropDown>
            </div>
            <div style={ {width: 300, display: 'inline-block', marginLeft: 10} }>
                <DropDown
                    height={200}
                    itemList={Array.from({length: 100}).map((_, idx) => ({value: idx.toString(), key: idx, focused: false}))}
                    placeholder="Type..."
                    noDataMessage="Empty"
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect3}
                    loading={isLoading}
                ></DropDown>
            </div>
        </>
    );
}

export default App;