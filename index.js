// Your code here
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

function createEmployeeRecords(arrays){
    return arrays.map(row => createEmployeeRecord(row))
}

function createTimeInEvent(record, date){
    let newDate = date.split(" ")
    let obj = {
        type: "TimeIn",
        hour: parseInt(newDate[1]),
        date: newDate[0]
    }
    record.timeInEvents.push(obj)
    return record 
}

function createTimeOutEvent(record, date){
    let newDate = date.split(" ")
    let obj = {
        type: "TimeOut",
        hour: parseInt(newDate[1]),
        date: newDate[0]
    }
    record.timeOutEvents.push(obj)
    return record 
}

function hoursWorkedOnDate(record, date){
    let timeIn = record.timeInEvents.find(el => el.date == date).hour
    let timeOut = record.timeOutEvents.find(el => el.date == date).hour

    return (parseInt(timeOut) - parseInt(timeIn))/100
}

function wagesEarnedOnDate(object, date){
    let hours = hoursWorkedOnDate(object, date)
    return hours * object.payPerHour
}

function allWagesFor(object){
    let dates = object.timeInEvents.map(e => e.date)
    let payable = dates.reduce(function (acc, cv){ return acc + wagesEarnedOnDate(object, cv)}.bind(object), 0)
    return payable
}

function findEmployeeByFirstName(array, name){
    return array.find(function(employee){return employee.firstName == name })
}

function calculatePayroll(array){
    return array.reduce(function(acc, cv){
        return acc + allWagesFor(cv)
    }, 0)
}