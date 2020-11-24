// Your code here
const createEmployeeRecord = employee => {
    const [firstName, familyName, title, payPerHour] = employee
    return {firstName: firstName, familyName: familyName, title: title, payPerHour: payPerHour, timeInEvents: [], timeOutEvents: []}

}
const createEmployeeRecords = employee => {
    employee.map(employeeRow => createEmployeeRecord(employeeRow))
}