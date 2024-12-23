# hotel-booking-api
rest api for hotel booking

run `npm install`

Start PostgreSQL Database: Ensure PostgreSQL is running


Ensure .env file is having postgres connection details, if not give credentials in .env file 

    Example given below
    
    'DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=hotel_booking
    DB_USER=postgres
    DB_PASSWORD=root
    '

- Running below script creates 'hotel_booking' database and feeds initial data to it:

`npx ts-node src/database/sync.ts && npx ts-node src/database/seed.ts`

Start the Server:

`npm run dev`

Post collection for testing api available at
`hotel-api-postman-collection.json`
