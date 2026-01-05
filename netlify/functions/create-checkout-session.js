const { createClient } = require('@supabase/supabase-js');

exports.handler = async function (event) {
  // This function is a scaffold. For a real Stripe+Supabase integration,
  // implement checkout session creation here and set redirect.
  return {
    statusCode: 501,
    body: JSON.stringify({ error: 'Checkout not implemented. Configure Stripe and implement server-side checkout.' }),
  };
};