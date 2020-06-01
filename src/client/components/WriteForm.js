import React from 'react';
import MyCKEditor from './MyCKEditor';

const WriteForm = ({
    category, goBack, onTitleChange, onContentsChange, onSubmit
}) => {
    return (
        <div>
            <form className='write' onSubmit={onSubmit}>
                <div>
                    {category}
                </div>
                <input type='text' name='title' placeholder='제목을 입력해 주세요.' onChange={onTitleChange}/>
                <MyCKEditor onChange={onContentsChange}/>
                <input type='button' value='취소' onClick={goBack}/>
                <input type='submit' value='등록'/>
            </form>
        </div>
    )
};

export default WriteForm;