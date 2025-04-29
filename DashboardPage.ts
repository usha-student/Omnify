import { Page } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  
  // Locators
  private userDropdown = '.oxd-userdropdown-tab';
  private logoutButton = 'text=Logout';
  private pimMenuItem = 'a:has-text("PIM")';
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async navigateToPIM() {
    await this.page.hover(this.pimMenuItem);
    await this.page.click(this.pimMenuItem);
    
    // Wait for PIM page to load
    await this.page.waitForURL('**/pim/viewEmployeeList');
  }
  
  async logout() {
    await this.page.click(this.userDropdown);
    await this.page.click(this.logoutButton);
    
    // Wait for login page to load after logout
    await this.page.waitForURL('**/auth/login');
  }
}
