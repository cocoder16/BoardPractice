import React from 'react';
import MyCKEditor from './MyCKEditor';

const WriteForm = ({
    goBack, onTitleChange, onContentsChange, onSubmit, contents
}) => {
    return (
        <div>
            <form className='write' onSubmit={onSubmit}>
                <input type='text' name='title' className='title' placeholder='Title' maxLength='50'
                    onChange={onTitleChange}
                />
                <MyCKEditor onChange={onContentsChange} contents={contents}/>
                <button type='submit'>Post</button>
                <button type='button' onClick={goBack}>Cancel</button>
            </form>
        </div>
    )
};

export default WriteForm;