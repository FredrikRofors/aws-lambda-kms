const {
    buildClient, 
    CommitmentPolicy,
    KmsKeyringNode
} = require('@aws-crypto/client-node');

const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

// https://eu-west-1.console.aws.amazon.com/kms/home?region=eu-west-1#/kms/keys/e05d9179-ab12-45f3-afb2-36ee3a477d5b/aliases
const generatorKeyId = 'arn:aws:kms:eu-west-1:502270545588:alias/FRY_Demo';
const keyIds = [
    'arn:aws:kms:eu-west-1:502270545588:key/e05d9179-ab12-45f3-afb2-36ee3a477d5b',
];

exports.handler = async (event, context, callbacks) => {   
    if (!event || !event.encryptedData) {
        return {
            statusCode: 500,
            body: JSON.stringify('No encryptedData parameter found in the event JSON input.')
        };
    }

    const base64EncryptedData = event.encryptedData;
    console.log('Input: base64EncryptedData=', base64EncryptedData);    
    const clearText = await decryptWithKmsSimple(base64EncryptedData);
    console.log('Output: clearText=', clearText);    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            clearText: clearText
        }),
    };
    
    return response;
}

async function decryptWithKmsSimple(base64EncryptedData) {   
    const keyring = new KmsKeyringNode({ generatorKeyId, keyIds });           

    // decrypt the data
    const { plaintext, messageHeader } = await decrypt(keyring, Buffer.from(base64EncryptedData, 'base64'));   

    console.log('plaintext=', plaintext);
    console.log('plaintext.toString()=', plaintext.toString());

    return plaintext.toString();
}