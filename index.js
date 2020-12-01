function createEmployeeRecord(arr){
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(arr){
    return arr.map(x => createEmployeeRecord(x))
}

function createTimeInEvent(emp, str){
    let dateArr = str.split(" ") 
    let newEvent = {
        type: "TimeIn",
        hour: parseInt(dateArr[1], 10),
        date: dateArr[0]
    }
    emp.timeInEvents.push(newEvent)
    return emp
}

function createTimeOutEvent(emp, str){
    let arr = str.split(" ")
    let event = {
        type: "TimeOut",
        hour: parseInt(arr[1], 10),
        date: arr[0]
    }
    emp.timeOutEvents.push(event)
    return emp
}

function hoursWorkedOnDate(emp, str){
    let ins = emp.timeInEvents.find(x => x.date === str)
    let out = emp.timeOutEvents.find(x => x.date === str)
    return (out.hour/100) - (ins.hour/100)
}

function wagesEarnedOnDate(emp, str){
    return emp.payPerHour * hoursWorkedOnDate(emp, str)
}

function allWagesFor(emp){
    return emp.timeInEvents.map(x => wagesEarnedOnDate(emp, x.date)).reduce((x,y) => x += y)
}

function calculatePayroll(arr){
    return arr.map(x => allWagesFor(x)).reduce((x,y) => x += y)
}

function findEmployeeByFirstName(emps, str){
    return emps.find(x => x.firstName === str)
}