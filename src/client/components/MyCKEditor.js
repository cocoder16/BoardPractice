import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
 
const MyCKEditor = ({
    onChange, contents
}) => {
    return (
        <CKEditor
            data={contents}
            onInit={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={( event, editor ) => {
                const data = event.editor.getData();
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
                    // ckfinder: {
                    //     uploadUrl: '/upload/test'
                    // }
                    resize_enabled: false
                }
            }
        />
    );
}

export default MyCKEditor;