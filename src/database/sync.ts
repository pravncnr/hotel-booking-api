import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const createDatabaseAndTables = async () => {
    const dbConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    };

    const databaseName = process.env.DB_NAME;

    // Step 1: Connect to PostgreSQL to create the database
    const client = new Client(dbConfig);
    try {
        console.log('Connecting to PostgreSQL...');
        await client.connect();

        // Create the database
        console.log(`Creating database "${databaseName}"...`);
        await client.query(`CREATE DATABASE ${databaseName};`);
        console.log(`Database "${databaseName}" created successfully!`);
    } catch (error: any) {
        if (error.code === '42P04') {
            console.log(`Database "${databaseName}" already exists.`);
        } else {
            console.error('Error creating database:', error.message);
            process.exit(1);
        }
    } finally {
        await client.end();
    }

    // Step 2: Connect to the newly created database to create tables
    const dbClient = new Client({
        ...dbConfig,
        database: databaseName,
    });

    // Read the DDL from ddl.sql
    const ddlFilePath = join(__dirname, 'ddl.sql');
    let createTablesSQL: string;
    try {
        console.log(`Reading DDL from file: ${ddlFilePath}`);
        createTablesSQL = readFileSync(ddlFilePath, 'utf-8');
    } catch (error: any) {
        console.error('Error reading DDL file:', error.message);
        process.exit(1);
    }

    try {
        console.log(`Connecting to the "${databaseName}" database...`);
        await dbClient.connect();

        console.log('Creating tables...');
        await dbClient.query(createTablesSQL);
        console.log('Tables created successfully!');
    } catch (error: any) {
        console.error('Error creating tables:', error.message);
        process.exit(1);
    } finally {
        await dbClient.end();
    }
};

createDatabaseAndTables().catch((err) => {
    console.error('Unhandled error:', err.message);
    process.exit(1);
});
