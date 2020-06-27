import React from 'react';
import CKEditor from 'ckeditor4-react';
 
const MyCKEditor = ({
    onChange, contents
}) => {
    return (
        <CKEditor
            data={contents}
            onChange={( event ) => {
                const data = event.editor.getData();
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