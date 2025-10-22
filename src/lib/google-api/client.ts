import { readFileSync, existsSync} from 'fs';
import { JWT } from 'google-auth-library';
import { join } from 'path';

const keysFilePath = join(process.cwd(), './files/key.json');

if(!existsSync(keysFilePath)) {
    throw new Error('Key file not found, add them to files dir')
}

const creds = JSON.parse(readFileSync(keysFilePath).toString());

const client = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]
});

export default client;