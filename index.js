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
    // let hour = makeTimeFormat(time)
    let hourInt = parseInt(time.split(" ")[1])
    let date = time.split(" ")[0]
    // let newDateString = `${date}T${hour}`

    let newTimeStamp = {
        type: "TimeIn",
        hour: hourInt,
        date: date
    }
    
    record["timeInEvents"].push(newTimeStamp)

    return record
}

function createTimeOutEvent(record, time){
    // let hour = makeTimeFormat(time)
    let hourInt = parseInt(time.split(" ")[1])
    let date = time.split(" ")[0]
    // let newDateString = `${date}T${hour}`

    let newTimeStamp = {
        type: "TimeOut",
        hour: hourInt,
        date: date
    }
    
    record["timeOutEvents"].push(newTimeStamp)

    return record
}

function hoursWorkedOnDate(record, date){
    let timeInEvents = record.timeInEvents
    let timeOutEvents = record.timeOutEvents
    let timeIn = timeInEvents.find(el => el.date === date)
    let timeOut = timeOutEvents.find(el => el.date === date)
    // console.log(timeIn.hour, timeOut.hour)
    // let timeIn = record.timeInEvents[0].hour
    // let timeOut = record.timeOutEvents[0].hour
    return ((timeOut.hour - timeIn.hour)/100)

}

function wagesEarnedOnDate(record, date){
    // console.log(record)
    let hours = hoursWorkedOnDate(record, date)
    let wage = record.payPerHour
    return wage * hours
}

function allWagesFor(record){
    let timeInEvents = record.timeInEvents
    let allWages = 0
    // let timeOutEvents = record.timeOutEvents


    timeInEvents.forEach(function(event){
        allWages += wagesEarnedOnDate(record, event.date)
        // console.log(wagesEarnedOnDate(record, event.date), allWages)
    })
    // console.log(allWages)
    return allWages
}

function calculatePayroll(array){
    return array.reduce(function(sum, currentEmployee){
        // console.log(allWagesFor(currentEmployee), "YUIP")
        console.log(sum, "SUM")
        // console.log(currentEmployee, "CURRENT")
        return sum + allWagesFor(currentEmployee)
    }, 0)
}

function findEmployeeByFirstName(array, firstName){
    return array.find(el => el.firstName === firstName)
}

// function makeTimeFormat(stringTime){
//     let returnStringTime
//     stringTime = stringTime.split(" ")[1]
//     if (stringTime.length === 4){
//       returnStringTime = `${stringTime[0]}${stringTime[1]}:${stringTime[2]}${stringTime[3]}:00`
//     } else {
//       returnStringTime = `${stringTime[0]}${stringTime[1]}:${stringTime[2]}${stringTime[3]}:00`
//     }

//     return returnStringTime
//   }


