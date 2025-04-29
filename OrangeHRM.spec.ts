import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { employees, credentials } from '../utils/data';

test('Orange HRM Workflow Automation', async ({ page }) => {
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const pimPage = new PIMPage(page);
  
  // Step 1: Automate Login Flow
  await loginPage.navigate();
  await loginPage.login(credentials.username, credentials.password);
  
  // Verify successful login by checking URL
  expect(page.url()).toContain('/dashboard/index');
  console.log('Successfully logged in to Orange HRM');
  
  // Step 2: Navigate to PIM module
  await dashboardPage.navigateToPIM();
  console.log('Successfully navigated to PIM module');
  
  // Step 3: Add Employees
  for (const employee of employees) {
    await pimPage.navigateToAddEmployee();
    await pimPage.addEmployee(employee.firstName, employee.middleName, employee.lastName);
    console.log(`Added employee: ${employee.fullName}`);
  }
  
  // Step 4: Verify Employees in the list
//   await pimPage.navigateToEmployeeList();
//   console.log('Navigated to Employee List');
for (const employee of employees) {
     await pimPage.clickEmployeeList()
     await pimPage.SearchEmployeName(employee.fullName);
     await pimPage.clickSearch()
}
  // Check if each employee is in the list
  for (const employee of employees) {
    const isVerified = await pimPage.verifyEmployee(employee.fullName);
    expect(isVerified).toBeTruthy();
  }
  
  // Step 5: Logout from Dashboard
  await dashboardPage.logout();
  console.log('Successfully logged out from Orange HRM');
  
  // Verify logout is successful by checking URL
  expect(page.url()).toContain('/auth/login');
});
