import { test, expect } from '@playwright/test';

/**
 * Demo Tests - TodoMVC Application
 * 
 * Using Playwright's official demo site: https://demo.playwright.dev/todomvc/
 * 
 * Showcases:
 * - Form interactions (input, submit)
 * - CRUD operations (Create, Read, Update, Delete)
 * - Element assertions and visibility checks
 * - Real-world testing patterns
 */

test.describe('TodoMVC Demo - Basic CRUD Operations', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to TodoMVC before each test
    await page.goto('https://demo.playwright.dev/todomvc/');
  });

  test('should display empty todo list on initial load', async ({ page }) => {
    // Verify the main section is not visible when no todos
    const mainSection = page.locator('.main');
    await expect(mainSection).toBeHidden();
    
    // Verify the input placeholder
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await expect(newTodoInput).toBeVisible();
  });

  test('should add new todo items', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    
    // Add first todo
    await newTodoInput.fill('Buy groceries');
    await newTodoInput.press('Enter');
    
    // Add second todo
    await newTodoInput.fill('Write test cases');
    await newTodoInput.press('Enter');
    
    // Verify todos are added
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(2);
    
    // Verify todo content
    await expect(todoItems.first()).toContainText('Buy groceries');
    await expect(todoItems.last()).toContainText('Write test cases');
    
    // Verify counter shows 2 items left
    await expect(page.locator('.todo-count')).toContainText('2 items left');
  });

  test('should mark todo as completed', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    
    // Add a todo
    await newTodoInput.fill('Complete Playwright framework');
    await newTodoInput.press('Enter');
    
    // Mark as completed
    const checkbox = page.locator('.todo-list li .toggle');
    await checkbox.check();
    
    // Verify todo is marked as completed
    const todoItem = page.locator('.todo-list li');
    await expect(todoItem).toHaveClass(/completed/);
    
    // Verify counter shows 0 items left
    await expect(page.locator('.todo-count')).toContainText('0 items left');
  });

  test('should delete todo item', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    
    // Add a todo
    await newTodoInput.fill('Todo to be deleted');
    await newTodoInput.press('Enter');
    
    // Hover to show delete button
    const todoItem = page.locator('.todo-list li');
    await todoItem.hover();
    
    // Click delete button
    await page.locator('.destroy').click();
    
    // Verify todo is deleted
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(0);
    
    // Verify main section is hidden
    const mainSection = page.locator('.main');
    await expect(mainSection).toBeHidden();
  });

  test('should filter todos by status', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    
    // Add multiple todos
    await newTodoInput.fill('Active todo');
    await newTodoInput.press('Enter');
    
    await newTodoInput.fill('Completed todo');
    await newTodoInput.press('Enter');
    
    // Mark second todo as completed
    const secondCheckbox = page.locator('.todo-list li').nth(1).locator('.toggle');
    await secondCheckbox.check();
    
    // Filter by Active
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li')).toContainText('Active todo');
    
    // Filter by Completed
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li')).toContainText('Completed todo');
    
    // Show All
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.locator('.todo-list li')).toHaveCount(2);
  });
});

