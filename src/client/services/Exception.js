const Exception = {
    basicRedirect (err) {
        window.location.replace('/');
        throw new Error(err);
    },
    logAlertRedirect (err, alertMessage, redirectMethod=this.basicRedirect) {
        alert(alertMessage);
        redirectMethod();
        throw new Error(err);
    }
}

export default Exception;