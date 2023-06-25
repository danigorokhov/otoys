CREATE DATABASE otoys
WITH
    ENCODING = 'UTF8'
    OWNER = otoys;

\connect otoys;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    yid_token VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255)
);

CREATE TABLE documents(
    document_id SERIAL PRIMARY KEY,
    user_id SERIAL NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL UNIQUE
);
