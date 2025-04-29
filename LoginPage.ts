import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  
  // Locators
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async navigate() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }
  
  async login(username: string, password: string) {
    await this.page.waitForSelector(this.usernameInput);
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    
    // Wait for dashboard to load
    await this.page.waitForURL('**/dashboard/index');
  }
}
