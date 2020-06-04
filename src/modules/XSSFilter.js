//    & : &amp;
//    < : &lt;
//    > : &gt;
//    ( : &#40;
//    ) : &#41;
//    " : &quot;
//    ' : &#x27;
//    / : &#x2F;

import './replaceAll';

const XSSFilter = (str) => {
    return str.replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('(', '&#40;')
    .replaceAll(')', '&#41;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')
    .replaceAll('/', '&#x2F')
    ;
};

export default XSSFilter;