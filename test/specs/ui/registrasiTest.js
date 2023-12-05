// test/specs/ui/registrasiTest.js

describe('Laravel Project Testing - Registration', () => {

it('should not register with empty Nama Lengkap', async () => {
    await testRegistration('', 'chan', '081262665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with empty Username', async () => {
    await testRegistration('park chanyeol', '', '081262665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with empty Nomor HP', async () => {
    await testRegistration('park chanyeol', 'chan', '', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with empty Email', async () => {
    await testRegistration('park chanyeol', 'chan', '081262665380', '', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with empty Password', async () => {
    await testRegistration('park chanyeol', 'chan', '081262665380', 'chan@gmail.com', '', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with Password less than 6 characters', async () => {
    await testRegistration('park chanyeol', 'chan', '081262665380', 'chan@gmail.com', '123', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with invalid Email format', async () => {
    await testRegistration('park chanyeol', 'chan', '081262665380', 'invalid_email', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with Nama Lengkap exceeding character limit', async () => {
    await testRegistration('a'.repeat(256), 'chan', '081262665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with Username exceeding character limit', async () => {
    await testRegistration('park chanyeol', 'a'.repeat(51), '081262665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with invalid Nomor HP format', async () => {
    await testRegistration('park chanyeol', 'chan', 'n09cnjn21', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with special characters in Username', async () => {
    await testRegistration('park chanyeol', 'chan@', '081262665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with invalid characters in Email', async () => {
    await testRegistration('park chanyeol', 'chan', '081262665380', 'chan$gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with invalid characters in Nomor HP', async () => {
    await testRegistration('park chanyeol', 'chan', '08126@2665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should not register with non-integer Nomor HP', async () => {
    await testRegistration('park chanyeol', 'chan', '0812abc665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/authreg');
    await pauseFor5Seconds();
});

it('should register with valid information', async () => {
    await testRegistration('park chanyeol', 'chan', '081262665380', 'chan@gmail.com', 'chanyeol_61', 'http://127.0.0.1:8000/auth'); 
    await pauseFor5Seconds();
});

});

async function testRegistration(namaLengkap, username, nomorHp, email, password, expectedUrl) {
    // Mengunjungi halaman web
    await browser.url('http://127.0.0.1:8000/authreg');
  
    // Mengisi formulir registrasi
    const namaLengkapInput = await $('#input-namalengkap');
    const usernameInput = await $('#input-username');
    const nomorHpInput = await $('#input-nomorhp');
    const emailInput = await $('#input-email');
    const passwordInput = await $('#input-password');
  
    await namaLengkapInput.setValue(namaLengkap);
    await usernameInput.setValue(username);
    await nomorHpInput.setValue(nomorHp);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);
  
    const registerButton = await $('button[type="submit"]');
    await registerButton.click();
  
    await expect(browser).toHaveUrl(expectedUrl);
}

async function pauseFor5Seconds() {
    await browser.pause(5000); 
}