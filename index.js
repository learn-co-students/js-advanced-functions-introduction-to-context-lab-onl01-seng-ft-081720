function createEmployeeRecord(worker) {
    return {
        firstName: worker[0],
        familyName: worker[1],
        title: worker[2],
        payPerHour: worker[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(workers) {
    return workers.map(function(worker) {
        return createEmployeeRecord(worker);
    });
};

function createTimeInEvent(worker, time) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(time.slice(11)),
        date: time.slice(0, 10)
    };

    worker.timeInEvents.push(timeIn);
    return worker;
};

function createTimeOutEvent(worker, time) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(time.slice(11)),
        date: time.slice(0, 10)
    };

    worker.timeOutEvents.push(timeOut);
    return worker;
};

function hoursWorkedOnDate(worker, date) {
    let timeIn = worker.timeInEvents.find(w => w.date === date).hour;
    let timeOut = worker.timeOutEvents.find(w => w.date === date).hour;
    
    return (timeOut - timeIn) / 100;
};

function wagesEarnedOnDate(worker, date) {
    let hoursWorked = hoursWorkedOnDate(worker, date);
    return hoursWorked * worker.payPerHour;
}

function allWagesFor(worker) {
    let index = -1;

    let timeIns = worker.timeInEvents.map(day => day.hour);
    let timeOuts = worker.timeOutEvents.map(day => day.hour);

    return timeIns.reduce(function(acc, curr) {
        index += 1;

        return acc + (timeOuts[index] - curr) / 100;
    }, 0) * worker.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(worker => worker.firstName === firstName);
};

function calculatePayroll(records) {
    return records.reduce(function(acc, curr) {
        let hours = 0;
        curr.timeInEvents.forEach(event => hours += wagesEarnedOnDate(curr, event.date));
        return acc + hours;
    }, 0);
};