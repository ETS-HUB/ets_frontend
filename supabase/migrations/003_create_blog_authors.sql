-- Create blog_authors table
-- Links to auth.users so authors can log in and their name is appended to articles
CREATE TABLE IF NOT EXISTS blog_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;

-- Everyone can read authors
CREATE POLICY "Public read authors" ON blog_authors
  FOR SELECT USING (true);

-- Authenticated users can manage author profiles
CREATE POLICY "Authenticated manage authors" ON blog_authors
  FOR ALL USING (auth.role() = 'authenticated');

-- Authors can update their own profile
CREATE POLICY "Authors update own profile" ON blog_authors
  FOR UPDATE USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE TRIGGER update_blog_authors_updated_at
  BEFORE UPDATE ON blog_authors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
