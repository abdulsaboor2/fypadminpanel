import React from 'react';
import Button from './Button';

function Search(props) {
    return (
        <form className='form formStyle mb-4' >
            <input style={{height:37}} type={'text'} placeholder=" Search..."
                onChange={props.onChange} />
            <Button onClick={props.onClick} type='submit' className='btn btn-primary mb-1' title="Search" />
        </form>
    );
}

export default Search;