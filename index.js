// Your code here
const createEmployeeRecord = function(testEmployee) {
    return{
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [ ],
        timeOutEvents: [ ]
    }
}
// = (testEmployee) => {
//   return firstName testEmployee[0]
//return testEmployee.firstName
const createEmployeeRecords = (employeeRowData) => {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

const createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = (employee, soughtDate) => {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = (employee, dateSought) => {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map(e => {
        return e.date
    })

    let payable = eligibleDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
        }, 0)
        return payable
    }

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

  let calculatePayroll = (arrayOfEmployeeRecords) => {
      return arrayOfEmployeeRecords.reduce((memo, rec) => {
          return memo + allWagesFor(rec)
      }, 0)
  }