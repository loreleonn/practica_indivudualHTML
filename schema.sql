-- Create the records table for inventory
CREATE TABLE records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT,
    price REAL,
    stock INTEGER DEFAULT 0,
    image_path TEXT,
    description TEXT
);

-- Insert sample data based on your website
INSERT INTO records (title, artist, genre, price, stock, image_path, description) VALUES
('La Nube en el Jardín', 'Ed Maverick', 'Indie', 25.99, 10, './imagenes/la-nube.webp', 'A beautiful indie record'),
('Spanish Leather', 'Guitarricadelafuente', 'Folk', 22.50, 15, './imagenes/spanish-leather.avif', 'Folk album with unique sound'),
('Kansas Anymore', 'Role Model', 'Pop', 20.00, 20, './imagenes/kansas-anymore.jpg', 'Popular pop record');

-- You can add more records as needed