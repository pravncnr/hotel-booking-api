import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const createInitialData = async () => {
    const dbConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    };

    const databaseName = process.env.DB_NAME;

    // Step 1: Connect to the newly created database to insert records
    const dbClient = new Client({
        ...dbConfig,
        database: databaseName,
    });

    // Read the DDL from ddl.sql
    const ddlFilePath = join(__dirname, 'seed_data.sql');
    let initialDataSQL: string;
    try {
        console.log(`Reading DDL from file: ${ddlFilePath}`);
        initialDataSQL = readFileSync(ddlFilePath, 'utf-8');
    } catch (error: any) {
        console.error('Error reading DDL file:', error.message);
        process.exit(1);
    }

    try {
        console.log(`Connecting to the "${databaseName}" database...`);
        await dbClient.connect();

        console.log('Inserting initial values to tables...');
        await dbClient.query(initialDataSQL);
        console.log('data inserted successfully!');
    } catch (error: any) {
        console.error('Error inserting data:', error.message);
        process.exit(1);
    } finally {
        await dbClient.end();
    }
};

createInitialData().catch((err) => {
    console.error('Unhandled error:', err.message);
    process.exit(1);
});
