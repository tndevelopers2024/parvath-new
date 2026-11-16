export async function submitEnquiry(source, values) {
  // Avoid leaving the form permanently in its sending state on a hung connection.
  const response = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, ...values }),
    signal: AbortSignal.timeout(25000),
  })

  if (!response.ok || !(await response.json()).ok) {
    throw new Error('Enquiry submission failed')
  }
}
