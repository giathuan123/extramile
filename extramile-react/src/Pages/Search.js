import {CreateRecordForm, SearchForm} from '../Forms';
import Card from '../components/Card';
import React from 'react';
import ModalContainer from '../ModalContainer'

function Search() {
    return (
        <React.Fragment>
            <ModalContainer triggerText={'Add a Record'}>
                <CreateRecordForm/>
            </ModalContainer>
            <SearchForm />
            <Card />
        </React.Fragment>
    );
}

export default Search;