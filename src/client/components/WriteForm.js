import React from 'react';
import MyCKEditor from './MyCKEditor';

const WriteForm = ({
    goBack, onTitleChange, onContentsChange, onSubmit, contents
}) => {
    return (
        <div>
            <form className='write' onSubmit={onSubmit}>
                <input type='text' name='title' className='title' placeholder='제목을 입력해 주세요.' maxLength='50'
                    onChange={onTitleChange}
                />
                <MyCKEditor onChange={onContentsChange} contents={contents}/>
                <button type='button' onClick={goBack}>취소</button>
                <button type='submit'>등록</button>
            </form>
        </div>
    )
};

export default WriteForm;