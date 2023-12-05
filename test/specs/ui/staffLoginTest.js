describe('Laravel Project Testing', () => {
    it('should not login with empty email and empty password', async () => {
        await testLogin('', '', 'http://127.0.0.1:8000/auth');
        await pauseFor5Seconds();
    });

    it('should not login with valid email and invalid password', async () => {
        await testLogin('staff123@gmail.com', 'staff321', 'http://127.0.0.1:8000/auth');
        await pauseFor5Seconds();
    });

    it('should not login with invalid email and valid password', async () => {
        await testLogin('staff@gmail.com', 'staff123', 'http://127.0.0.1:8000/auth');
        await pauseFor5Seconds();
    });

    it('should not login with invalid email and invalid password', async () => {
        await testLogin('staff@gmail.com', 'staff321', 'http://127.0.0.1:8000/auth');
        await pauseFor5Seconds();
    });

    it('should not login with empty email and valid password', async () => {
        await testLogin('', 'staff123', 'http://127.0.0.1:8000/auth');
        await pauseFor5Seconds();
    });

    it('should not login with valid email and empty password', async () => {
        await testLogin('staff123@gmail.com', '', 'http://127.0.0.1:8000/auth');
        await pauseFor5Seconds();
    });

    it('should login with valid email and valid password', async () => {
        await testLogin('staff123@gmail.com', 'staff123', 'http://127.0.0.1:8000/staff/dashboard');
        await pauseFor5Seconds();
    });

    async function testLogin(email, password, expectedUrl) {
        // Mengunjungi halaman web
        await browser.url('http://127.0.0.1:8000/auth');

        // Mengisi formulir login
        const emailInput = await $('#input-email');
        const passwordInput = await $('#input-password');

        await emailInput.setValue(email);
        await passwordInput.setValue(password);

        const loginButton = await $('button[type="submit"]');
        await loginButton.click();

        await expect(browser).toHaveUrl(expectedUrl);
    }

    async function pauseFor5Seconds() {
        await browser.pause(5000); // Pause for 5 seconds
    }
});
