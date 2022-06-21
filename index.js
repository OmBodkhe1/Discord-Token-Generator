const fetch = require('node-fetch')
const ac = require('ombodkhe');
const names = require("boy-names");
var colors = require('colors');
const config = require('./config.json')
var fs = require('fs')
var logger = fs.createWriteStream('tokens.txt', {
    flags: 'a'
})

const register = async () => {
    console.log('\n')
    var write = (line) => logger.write(`\n${line}`);
    ac.setAPIKey(config.captcha_key);
    const response = await fetch('https://discord.com/api/v9/experiments', { method: 'get', });
    const data1 = await response.json()
    console.log(`${colors.red(`[!]`)} Fingerprint: ${colors.green(`${data1.fingerprint}`)}`)
    const name = names.boysname();
    console.log(`${colors.red(`[!]`)} Name: ${colors.green(`${name}`)}`)
    const email = `${Math.random().toString(36).substr(2, 10)}@gmail.com`
    const password = Math.random().toString(36).substr(2, 10)
    console.log(`${colors.red(`[!]`)} Email: ${colors.green(`${email}`)}`)
    const captcha = await ac.solveHCaptchaProxyless('https://discord.com', '4c672d35-0701-42b2-88c3-78380b0db560', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36")
    console.log(`${colors.red(`[+]`)} Captcha Solved`)
    const body = {
        "username": name,
        "email": email,
        "password": password,
        "date_of_birth": "1977-03-15",
        "fingerprint": data1.fingerprint,
        "gift_code_sku_id": null,
        "invite": null,
        "consent": true,
        "captcha_key": captcha
    }
    const res = await fetch("https://discord.com/api/v9/auth/register", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application-json",
            "origin": "https://discord.com",
            "referer": "https://discord.com/register",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36",
            "x-fingerprint": data1.fingerprint,
            "x-super-properties": "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkNocm9tZSIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJ6aC1DTiIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85OS4wLjQ4NDQuNzQgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6Ijk5LjAuNDg0NC43NCIsIm9zX3ZlcnNpb24iOiIxMC4xNS43IiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjExOTc2MSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=",
        }
    })
    const data = await res.json()
    console.log(`${colors.red(`[+]`)} Token Created: ${colors.yellow(`${data.token}`)}\n`)
    write(`${email}:${password}:${data.token}`)
}

register()