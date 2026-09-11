CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100),
  price_range VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO services (name, description, icon, price_range) VALUES
  ('Web Development', 'Custom websites and web applications built with modern frameworks for performance and scalability.', 'Globe', 'From $250'),
  ('AI Solutions', 'Agentic AI, chatbots, RAG systems, and intelligent automation tailored to your business.', 'Brain', 'Custom Quote'),
  ('UI/UX Design', 'User-centered design that converts visitors into customers with beautiful interfaces.', 'Palette', 'Custom Quote'),
  ('Cloud & DevOps', 'Cloud infrastructure, CI/CD pipelines, and scalable deployments on AWS, GCP, and Azure.', 'Cloud', 'Custom Quote'),
  ('Cybersecurity', 'Security audits, penetration testing, and compliance solutions to protect your digital assets.', 'Shield', 'Custom Quote'),
  ('Digital Marketing', 'SEO, content strategy, and paid campaigns to grow your online presence.', 'Megaphone', 'Custom Quote'),
  ('Licensing & Compliance', 'Software licensing solutions and regulatory compliance for your business.', 'FileCheck', 'Custom Quote'),
  ('Graphic Design', 'Brand identity, logos, and visual assets that make your business stand out.', 'Palette', 'Custom Quote');
