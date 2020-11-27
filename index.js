// Your code here
let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(nest_arr) {
    let records = []
    for(const arr of nest_arr) {
        records.push(createEmployeeRecord(arr))
    }
    return records
}

let createTimeInEvent = function(employeeRec, timeIn) {
    let inObj = {
        type: 'TimeIn',
        hour: parseInt(timeIn.split(' ')[1]),
        date: timeIn.split(' ')[0]
    }
    employeeRec.timeInEvents.push(inObj)
    return employeeRec
}

let createTimeOutEvent = function(employeeRec, timeIn) {
    let outObj = {
        type: 'TimeOut',
        hour: parseInt(timeIn.split(' ')[1]),
        date: timeIn.split(' ')[0]
    }
    employeeRec.timeOutEvents.push(outObj)
    return employeeRec
}

let hoursWorkedOnDate = function(employeeRec, date) {
    let i = employeeRec.timeInEvents.find(e => e.date === date)
    let o = employeeRec.timeOutEvents.find(e => e.date === date)
    return (o.hour - i.hour) / 100
}

let wagesEarnedOnDate = function(employeeRec, date) {
    let pay = employeeRec.payPerHour
    let hours = hoursWorkedOnDate(employeeRec, date)
    return pay * hours
}

let allWagesFor = function(employeeRec) {
    let wages = []
    for(const day of employeeRec.timeInEvents) {
        wages.push(wagesEarnedOnDate(employeeRec, day.date))
    }
    return wages.reduce((a, b) => a + b, 0)
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(arr, firstName) {
    return arr.find(function(rec){
      return rec.firstName === firstName
    })
  }
