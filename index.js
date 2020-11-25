// Your code here
const createEmployeeRecord = (array) =>{
    let info = {}
    info["firstName"] = array[0]
    info["familyName"] = array[1]
    info["title"] = array[2]
    info["payPerHour"] = array[3]
    info["timeInEvents"] = []
    info["timeOutEvents"] = []
    return info
}

const createEmployeeRecords = (array) => {
    return array.map (arr =>createEmployeeRecord(arr))
} 

const createTimeInEvent =(empObj,date) =>{
    let obj = {
        type : "TimeIn",
        date : date.split(" ")[0],
        hour : parseInt(date.split(" ")[1])
    }
    empObj.timeInEvents.push(obj)
    return empObj;
}

const createTimeOutEvent = (empObj,date) => {
    let obj = {
        type : "TimeOut",
        date : date.split(" ")[0],
        hour : parseInt(date.split(" ")[1])
    }
    empObj.timeOutEvents.push(obj)
    return empObj;
}

const hoursWorkedOnDate =(empObj,date) =>{
    let start = empObj.timeInEvents.find(e => e.date === date)
    let end = empObj.timeOutEvents.find(e => e.date === date)
    return (end.hour - start.hour)/100 
}

const wagesEarnedOnDate = (empObj,date) =>{
    return hoursWorkedOnDate(empObj,date) * empObj.payPerHour
}

const allWagesFor = (empObj) =>{
    let total = 0
    empObj.timeOutEvents.forEach(day => {
        total += wagesEarnedOnDate(empObj,day.date)
    })
    return total
}

const findEmployeeByFirstName = (array, name) =>{
   return array.find(emp => emp.firstName === name)
}

const calculatePayroll= (array) => {
    let total = 0
    array.forEach(emp => {
        total += allWagesFor(emp)
    })
    return total
}
