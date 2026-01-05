const { createClient } = require('@supabase/supabase-js');

exports.handler = async function (event) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return {
      statusCode: 501,
      body: JSON.stringify({ error: 'Supabase not configured on server. Set SUPABASE_URL and SUPABASE_KEY.' }),
    };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  try {
    const { httpMethod, body } = event;
    if (httpMethod === 'GET') {
      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    if (httpMethod === 'POST') {
      const payload = JSON.parse(body || '{}');
      const { data, error } = await supabase.from('notes').insert(payload).select();
      if (error) throw error;
      return { statusCode: 201, body: JSON.stringify(data) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
  }
};