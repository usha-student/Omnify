import { Page } from '@playwright/test';

export class PIMPage {
  private page: Page;
  
  // Locators
  private addEmployeeButton = 'a:has-text("Add Employee")';
  //private employeeListButton = 'a:has-text("Employee List")';
  private firstNameInput = 'input[name="firstName"]';
  private middleNameInput = 'input[name="middleName"]';
  private lastNameInput = 'input[name="lastName"]';
  private saveButton = 'button[type="submit"]';
  private employeeTable = '.oxd-table-body';
  private employeeRows = '.oxd-table-card';
  private employeeNameCells = '.oxd-table-cell:nth-child(3)';
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async navigateToAddEmployee() {
    await this.page.click(this.addEmployeeButton);
    await this.page.waitForURL('**/pim/addEmployee');
  }
  
  async addEmployee(firstName: string, middleName: string, lastName: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.middleNameInput, middleName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.click(this.saveButton);
    
    // Wait for employee details page to load
    //await this.page.waitForURL('**/pim/viewPersonalDetails**');
  }
  
  // async navigateToEmployeeList() {
  //   await this.page.click(this.employeeListButton);
  //   await this.page.waitForURL('**/pim/viewEmployeeList');
  // }
  
  async clickEmployeeList(){
    await this.page.getByRole('link', { name: 'Employee List' }).click()
  }
  async SearchEmployeName(empname:string){
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(empname);
  }
  async clickSearch(){
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyEmployee(fullName: string) {
    // Wait for the employee table to be visible
    await this.page.waitForSelector(this.employeeTable);
    
    const nameFound = await this.findEmployeeInTable(fullName);
    
    if (nameFound) {
      console.log(`Name Verified: ${fullName}`);
      return true;
    }
    
    return false;
  }
  
  private async findEmployeeInTable(fullName: string): Promise<boolean> {
    // Get all employee rows
    const rows = await this.page.$$(this.employeeRows);
    
    for (const row of rows) {
      const nameCell = await row.$(this.employeeNameCells);
      if (nameCell) {
        const name = await nameCell.textContent();
        if (name && name.trim().includes(fullName)) {
          return true;
        }
      }
    }
    
    return false;
  }
}
