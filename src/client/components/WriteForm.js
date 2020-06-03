import React from 'react';
import MyCKEditor from './MyCKEditor';

const WriteForm = ({
    goBack, onTitleChange, onContentsChange, onSubmit, contents
}) => {
    return (
        <div>
            <form className='write' onSubmit={onSubmit}>
                <input type='text' name='title' placeholder='제목을 입력해 주세요.' onChange={onTitleChange}/>
                <MyCKEditor onChange={onContentsChange} contents={contents}/>
                <input type='button' value='취소' onClick={goBack}/>
                <input type='submit' value='등록'/>
            </form>
        </div>
    )
};

export default WriteForm;