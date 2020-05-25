const MeasureRunTime = {
    tests: [],
    start (name) {
        this.tests.push({
            name: name,
            startTime: new Date().getTime(),
            endTime: 0
        });
        console.log(`******* "${name}" 측정 시작`);
    },
    end (name) {
        const {tests} = this;
        const endTime = new Date().getTime();
        for (let i = 0; i < this.tests.length; i++) {
            if (tests[i].name === name) {
                console.log(`******* "${tests[i].name}" 실행 시간 : ${endTime - tests[i].startTime} ms`);
                this.tests.splice(i, 1);
                break;
            }
        }
    }
};

export default MeasureRunTime;