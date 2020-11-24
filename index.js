// Your code here
const createEmployeeRecord = employee => {
    const [firstName, familyName, title, payPerHour] = employee
    return {firstName: firstName, familyName: familyName, title: title, payPerHour: payPerHour, timeInEvents: [], timeOutEvents: []}

}

const createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)	        
    })	
} 

const createTimeInEvent = (employee, dateTime) => {
    const [date, hour] = dateTime.split(" ")
        employee.timeInEvents.push({
            type: "TimeIn", 
            date: date,
            hour: parseInt(hour)
        })
        return employee
}

const createTimeOutEvent = (employee, dateTime) => {
    const [date, hour] = dateTime.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut", 
        date: date,
        hour: parseInt(hour)
    })
    return employee
}

const hoursWorkedOnDate = (employee, dateString) => {
    const timeIn = employee.timeInEvents.find(e => {
        return e.date === dateString
    })
    const timeOut = employee.timeOutEvents.find(e => {	  
        return e.date === dateString	       
    })	   
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (employee, dateString) => {
    const wage = hoursWorkedOnDate(employee, dateString) * employee.payPerHour
    return parseFloat(wage.toString())
}

const allWagesFor = employee => {
    const allDates = employee.timeInEvents.map(e => {
        return e.date
    })

    const allMoney = allDates.reduce( (money, date) => {
        return money + wagesEarnedOnDate(employee, date)
    }, 0)

    return allMoney
}

const calculatePayroll = employeeRecords => {
    return employeeRecords.reduce( (money, employee) => {
        return money + allWagesFor(employee)
    }, 0)
}

const findEmployeeByFirstName = (employeeRecords, firstName) => {
    return employeeRecords.find(employee => {
        return employee.firstName === firstName
    })
}