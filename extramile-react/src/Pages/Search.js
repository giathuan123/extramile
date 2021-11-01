import './Pages.css';

import React, {useState} from 'react';
import {CreateRecordForm, SearchForm} from '../Forms';
import Card from '../components/Card';
import ModalContainer from '../ModalContainer'

function Search() {
    const [data, setData] = useState([])
    
    return (
        <div className="content-container">
            <ModalContainer triggerText={'Add a Record'}>
                <CreateRecordForm/>
            </ModalContainer>
            <SearchForm setData={setData}/>
            <Card data={data}/>
        </div>
    );
}

export default Search;