import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyCKEditor = ({
    onChange, contents
}) => {
    console.log(contents);
    return (
        <CKEditor
            editor={ ClassicEditor }
            data={contents}
            onInit={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                onChange(data);
            }}
            onBlur={( event, editor ) => {
                console.log('Blur.', editor );
            }}
            onFocus={( event, editor ) => {
                console.log('Focus.', editor );
            }}
            config={
                {
                    ckfinder: {
                        uploadUrl: '/upload/test'
                    },
                }
            }
        />
    );
}

export default MyCKEditor;