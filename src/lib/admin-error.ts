export async function logAndAlert(subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Sean Schaeffer <sean@montereygolftours.com>',
      to: ['digitalalchemistalex@gmail.com'],
      subject: '[MGTS ADMIN ALERT] ' + subject,
      text: body,
    }),
  })
}
