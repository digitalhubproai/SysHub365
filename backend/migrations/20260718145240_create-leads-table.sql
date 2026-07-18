CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(50) NOT NULL DEFAULT 'chatbot',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  session_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now()
);
