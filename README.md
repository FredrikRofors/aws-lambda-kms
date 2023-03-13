# About this repo
Simple demo of how to use the <strong>AWS KMS (Key Management Service)</strong> and the <strong>AWS Encryption SDK for Javascript for Node.js</strong> to perform encryption/decryption of a  string using a symmetric key managed by KMS.

The project consists of two Lambda functions; one responsible for encrypting some data (FRY_Encrypt), and a separate function that consumes/decrypts the encrypted data (FRY_Decrypt). The encrypted data blob is base64 encoded so it can be shared between the two lambdas as a string.

<ul>
    <li>
        <strong>FRY_Encrypt</strong> Takes a JSON input param named 'text' which is the cleartext to encrypt. Outputs a base64 encoded encryption blob object.
    </li> 
    <li>
        <strong>FRY_Decrypt</strong> Takes the base64 encoded string as input and decodes and decrypts the blob back to cleartext.
    </li>
</ul>

## How to setup and deploy the Lambdas
<ol>   
    <li>Since both Lamdas depend on the <a href="https://www.npmjs.com/package/@aws-crypto/client-node">@aws-crypto/client-node</a> package (not automatically available in the AWS Lambda Node-runtime environment), the lambdas are deployed as zip-files (feel free to prep a Lambda Layer instead).</li>
    <li>Run `npm install` in the src/lambda/FRY_Encrypt and src/lambda/FRY_Decrypt folders.</li>
    <li>Create a symmetric KMS key via the AWS Console and configure the generatorKeyId and keyIds settings in the .../FRY_Encrypt/index.js and .../FRY_Decrupt/index.js files.</li>
    <li>Run `sh deploy.sh` in the .../FRY_Encrypt and .../FRY_Decrypt folder to generate the deployment zip-files.</li>
    <li>Create two Lambda functions via the AWS Console and choose 'Upload from .zip files'</li>
</ol>
