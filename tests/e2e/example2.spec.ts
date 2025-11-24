import { TestUsers } from '../../data/test-data';
import { test, expect } from '../../fixtures/test-fixtures';

test.describe('my test', () => {
    test('lets do first', async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login(TestUsers.invalidUser.username, TestUsers.invalidUser.password);
        const errorr = await loginPage.getErrorMessage();
        expect(errorr).toContain('invalid');    
    })
})
