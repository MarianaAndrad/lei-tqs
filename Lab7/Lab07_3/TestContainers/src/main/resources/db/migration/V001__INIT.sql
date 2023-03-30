CREATE Table If Not Exists books (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255) NOT NULL
);