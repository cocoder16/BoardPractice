//    & : &amp;
//    < : &lt;
//    > : &gt;
//    ( : &#40;
//    ) : &#41;
//    " : &quot;
//    ' : &#x27;
//    / : &#x2F;

import './replaceAll';

const XSS = {
    Filter (str) {
        return str.replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('(', '&#40;')
        .replaceAll(')', '&#41;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#x27;')
        .replaceAll('/', '&#x2F')
        ;
    },
    recover (str) {
        return str.replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&#40;', '(')
        .replaceAll('&#41;', ')')
        .replaceAll('&quot;', '"')
        .replaceAll('&#x27;', "'")
        .replaceAll('&#x2F', '/')
        ;
    }
}

export default XSS