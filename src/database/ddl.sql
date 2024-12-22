-- Create table: "user"
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table: "hotel"
CREATE TABLE "hotel" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(150) NOT NULL,
    total_rooms INTEGER NOT NULL CHECK (total_rooms > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table: "booking"
CREATE TABLE "booking" (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL REFERENCES hotel (id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
    rooms INTEGER NOT NULL CHECK (rooms > 0),
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add indexes for common queries
CREATE INDEX idx_booking_user_id ON booking(user_id);
CREATE INDEX idx_booking_hotel_id ON booking(hotel_id);
