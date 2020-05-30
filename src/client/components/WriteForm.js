import React from 'react';

const WriteForm = ({
    category, goBack, onInputChange, onSubmit
}) => {
    return (
        <div>
            <form className='write' onSubmit={onSubmit}>
                <div>
                    {category}
                </div>
                <input type='text' name='title' placeholder='제목을 입력해 주세요.' onChange={onInputChange}/>
                <textarea name='contents' onChange={onInputChange}></textarea>
                <input type='button' value='취소' onClick={goBack}/>
                <input type='submit' value='등록'/>
            </form>
        </div>
    )
};

export default WriteForm;