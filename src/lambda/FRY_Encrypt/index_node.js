const crypto = require('crypto');

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

exports.handler = async (event, context, callbacks) => {   
    
    console.log('Using same IV but different keys.');

    const encryptedData = encrypt('Fredrik Rofors, Adelgade 138, 4720 Præstø');
    console.log('encryptedData=', encryptedData);

    const decryptedData = decrypt(encryptedData);
    console.log('decryptedData=', decryptedData);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from FRY_Encrypt (Node crypto version)!'),
    };
    return response;
}

function encrypt(cleartext) {   
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(cleartext);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return { 
        iv: iv.toString('hex'), 
        encryptedText: encrypted.toString('hex') 
    };
}

function decrypt(encryptedData) {    
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(encryptedData.encryptedText, 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
