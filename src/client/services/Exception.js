const Exception = {
    basicRedirect () {
        window.location.replace('/');
    },
    logAlertRedirect (err, alertMessage, redirectMethod=this.basicRedirect) {
        console.log(err);
        alert(alertMessage);
        redirectMethod();
    }
}

export default Exception;