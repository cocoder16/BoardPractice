const Exception = {
    _400 (err, logMessage) {
        console.log(logMessage);
        console.log(err);
        return { status: 400 }
    },
    _400URL (err, logMessage, url) {
        console.log(logMessage);
        console.log(err);
        return { status: 400, data: { url }}
    }
}

export default Exception;