// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour, timeInEvents=[], timeOutEvents=[]]){
    const newRecord = {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": timeInEvents,
        "timeOutEvents": timeOutEvents
    }
    return newRecord
}

function createEmployeeRecords(array){
    let employeeRecords = []
    array.forEach(function(el){
        employeeRecords.push(createEmployeeRecord(el))
    })
    return employeeRecords
}

function createTimeInEvent(record, time){
    let hour = makeTimeFormat(time)
    let hourInt = parseInt(time.split(" ")[1])
    let date = time.split(" ")[0]
    let newDateString = `${date}T${hour}`

    let newTimeStamp = new Date(newDateString)
    newTimeStamp.type = "TimeIn"
    newTimeStamp.hour = hourInt
    newTimeStamp.date = date
    
    record["timeInEvents"].push(newTimeStamp)

    return record
}

function createTimeOutEvent(record, time){
    let hour = makeTimeFormat(time)
    let hourInt = parseInt(time.split(" ")[1])
    let date = time.split(" ")[0]
    let newDateString = `${date}T${hour}`

    let newTimeStamp = new Date(newDateString)
    newTimeStamp.type = "TimeOut"
    newTimeStamp.hour = hourInt
    newTimeStamp.date = date
    
    record["timeOutEvents"].push(newTimeStamp)

    return record
}

function hoursWorkedOnDate(record, date){
    console.log(record)
    
    let timeIn = record.timeInEvents[0].hour
    let timeOut = record.timeOutEvents[0].hour
    return ((timeOut - timeIn)/100)
}

function wagesEarnedOnDate(record, date){
    // console.log(record)
    let hours = hoursWorkedOnDate(record, date)
    let wage = record.payPerHour
    return wage * hours
}

function allWagesFor(record){
    console.log(record)

    
}

function calculatePayroll(arr){
    return arr.reduce(function(sum, el){
        return sum + allWagesFor(el)
    })

}

function findEmployeeByFirstName(array, firstName){
    return array.find(el => el.firstName === firstName)
}

function makeTimeFormat(stringTime){
    let returnStringTime
    stringTime = stringTime.split(" ")[1]
    if (stringTime.length === 4){
      returnStringTime = `${stringTime[0]}${stringTime[1]}:${stringTime[2]}${stringTime[3]}:00`
    } else {
      returnStringTime = `${stringTime[0]}${stringTime[1]}:${stringTime[2]}${stringTime[3]}:00`
    }

    return returnStringTime
  }


