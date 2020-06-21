import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
 
const MyCKEditor = ({
    onChange, contents
}) => {
    return (
        <CKEditor
            data={contents}
            onChange={( event ) => {
                const data = event.editor.getData();
                console.log('event.editor : ', event.editor);
                onChange(data);
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