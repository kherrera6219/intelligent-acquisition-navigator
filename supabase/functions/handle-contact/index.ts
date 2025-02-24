
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message } = await req.json()

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert into contact_submissions
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, subject, message }])

    if (dbError) throw dbError

    // Send confirmation email
    const emailResult = await resend.emails.send({
      from: 'ProcurityIQ <onboarding@resend.dev>',
      to: [email],
      subject: `We received your message - ${subject}`,
      html: `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We have received your message and our team will get back to you soon.</p>
        <p>Your message:</p>
        <blockquote>${message}</blockquote>
        <p>Best regards,<br>The ProcurityIQ Team</p>
      `,
    })

    // Send notification to admin
    const adminNotification = await resend.emails.send({
      from: 'ProcurityIQ <onboarding@resend.dev>',
      to: [Deno.env.get('ADMIN_EMAIL') ?? ''],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    })

    return new Response(
      JSON.stringify({ success: true, emailResult, adminNotification }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  } catch (error) {
    console.error('Error in handle-contact function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    )
  }
})
