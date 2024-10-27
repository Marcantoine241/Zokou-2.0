const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUJ5b3NxNGtpWmp0TGtqTGVFTWh5ZW41bVJOeDFwM0dPSWwxY0dVWHYyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmQ3TndIaDZJY0hjTzdCZDBNYk1rZHoxbnZXeTQwWTdwS0phMVBpa3NDST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRUNnYWhydnBiY2JzYkg3aTMxallUWGJXZkw0Ylk5SjgyS3FVUzArQUdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFMENyYnU1cFNPTHdiakpwQnJBSFB1UUhIeEpnbGVDN3JzTERObG9UVlh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllHYzV1elZFb3RPcEJHcjE2dFN6azRpSWloZFdvL0k3b0Q4aFhqQ1ZsM2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik95UThFaFZvMmpkQnJCTEtCQ3piUkdxZjBDbGtpZUI1SEdZbkU0alIxeEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUNicUdzNlVZSWlJZFlGMEJ4T1B5Q0lHSVJHSkNmVG8wei9menpWY21VZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2JNQWdad25JQzZxbnVvbUtjTEZ5Zkw3RkJmZ3A4dkNJVUw0M2NZSDJ4VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpiaGRIdFF2QzBpRlMyZ2M0WU92SS92MWt6OEZjQ0g4NTc3SHV4SmVIeDZvQ1ZiNWJQTStDR0grVUFXbHBBYlRGeDREVitDYXNkMGJFbFhhZ0lGRGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzIsImFkdlNlY3JldEtleSI6IjFqZmtPTktpS2Z6OENkdWZCUHMwWm1HVFFTV1FwMkhNVkFsR1VabVJGd1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjQxNzYzNDQ4MTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTYxN0U0MkYyOEI2NjE3QkVFQzA2Qjg0NERGOUQ5RjcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMDAyMTM4Nn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjQxNzYzNDQ4MTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUFFNTE0N0I5MjE1NDI0RUJCNTBFNTNDNjExNEZBM0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMDAyMTM4Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZFRpM25DcFFUTnljN2stbndfaHVGUSIsInBob25lSWQiOiI0ZjVjYzU2Ni0wODhlLTRkYmUtYjM3Ny0zNDVlMTA5NDNkNzkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3hXTXBYOGRNNnRTWW1zaVRwVi82R2hHWmEwPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJBakxWRi9CTUZycnhsN210N1A2YTdxK1lHUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJZRzZGRTUzWiIsImxhc3RQcm9wSGFzaCI6IjJaTjZpdiIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibWUiOnsiaWQiOiIyNDE3NjM0NDgxMToxNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNYXJjIiwibGlkIjoiMjYyNTU2MTk5NDI0MjMxOjE2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUENUcWNFREVJS1ErTGdHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL0NSU0RzN2hwS2xTZ1QyNWEzQjJGdzZ5S09XbmM4UHdFK0lpRTRXTWVTaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMHdUTzN3NjBrVmVCemdDSEoyZXZIbFlHNWZ3QWx6N3hQbUUvYURjSEtqTUNPZVRJTnY2cDFLei9sSWtPbm0xVDEwK1krZ3Z4MUtSdVJwMkk1K2xMQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IkJEakZ1TjFjcDZtRDhtWTVlcVJJZGJwSzA3Z3V3VkQ0OG5XTVBXbTQyWHcycGNFL1ZUODlFcS9YZlQ2Rmprd1JHd3U5dmo2QVZTNVVuOE9FbHBxWWlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQxNzYzNDQ4MTE6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZndrVWc3TzRhU3BVb0U5dVd0d2RoY09zaWpscDNQRDhCUGlJaE9GakhrcCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDAyMTM4MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLSDcifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Marc-bot",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'oui',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
