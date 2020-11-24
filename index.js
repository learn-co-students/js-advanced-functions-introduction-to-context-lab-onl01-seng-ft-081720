// Your code here
const createEmployeeRecord = employee => {
    const [firstName, familyName, title, payPerHour] = employee
    return {firstName: firstName, familyName: familyName, title: title, payPerHour: payPerHour, timeInEvents: [], timeOutEvents: []}

}
const createEmployeeRecords = employees => {
    // employees.map(employee => createEmployeeRecord(employee))
    const employeesAr = []
    for(const employee in employee) {
       employee.push(createEmployeeRecord(employee))
    }
}