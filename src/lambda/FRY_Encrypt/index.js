const {
    buildClient, 
    CommitmentPolicy,
    KmsKeyringNode,
} = require('@aws-crypto/client-node');

const { encrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

// https://eu-west-1.console.aws.amazon.com/kms/home?region=eu-west-1#/kms/keys/e05d9179-ab12-45f3-afb2-36ee3a477d5b/aliases
const generatorKeyId = 'arn:aws:kms:eu-west-1:502270545588:alias/FRY_Demo';
const keyIds = [
    'arn:aws:kms:eu-west-1:502270545588:key/e05d9179-ab12-45f3-afb2-36ee3a477d5b',
];

exports.handler = async (event, context, callbacks) => {   
    if (!event || !event.text) {
        return {
            statusCode: 500,
            body: JSON.stringify('No text parameter found in the event JSON input.')
        };
    }

    const clearText = event.text;
    console.log('Input: clearText=', clearText);
    const base64EncryptedData = await encryptWithKmsSimple(clearText);
    console.log('Output: base64EncryptedData=', base64EncryptedData);  
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            clearText: clearText,
            base64EncryptedData: base64EncryptedData
        }),
    };

    return response;
}

async function encryptWithKmsSimple(clearText) {    
    // https://eu-west-1.console.aws.amazon.com/kms/home?region=eu-west-1#/kms/keys/e05d9179-ab12-45f3-afb2-36ee3a477d5b/aliases
    const generatorKeyId = 'arn:aws:kms:eu-west-1:502270545588:alias/FRY_Demo';
    const keyIds = [
        'arn:aws:kms:eu-west-1:502270545588:key/e05d9179-ab12-45f3-afb2-36ee3a477d5b',
    ];
    const keyring = new KmsKeyringNode({ generatorKeyId, keyIds });

    // encrypt the data    
    const { result } = await encrypt(keyring, clearText); 
    const resultBase64Encoded = result.toString('base64');    

    return resultBase64Encoded;
}