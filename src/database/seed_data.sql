-- Insert sample data into "user"
INSERT INTO "user" (username, email, password)
VALUES
    ('john_doe', 'john@example.com', 'password123'),
    ('jane_smith', 'jane@example.com', 'securepassword'),
    ('bob_brown', 'bob@example.com', 'mypassword');

-- Insert sample data into "hotel"
INSERT INTO "hotel" (name, location, total_rooms)
VALUES
    ('Grand Hotel', 'New York', 100),
    ('Ocean View Resort', 'California', 200),
    ('Mountain Retreat', 'Colorado', 50);

-- Insert sample data into "Booking"
INSERT INTO "booking" (hotel_id, user_id, rooms, checkin, checkout, created_at, updated_at)
VALUES
    (1, 1, 2, '2024-12-25', '2024-12-30', NOW(), NOW()),
    (2, 2, 1, '2024-12-20', '2024-12-22', NOW(), NOW()),
    (3, 3, 3, '2024-12-27', '2025-01-02', NOW(), NOW());
