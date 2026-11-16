const escapeCharacters = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => escapeCharacters[character])
}

export function enquiryEmail({ isContact, name, phone, email, interest, message }) {
  const title = isContact ? 'New website enquiry' : 'New callback request'
  const contactEmail = email || 'Not provided'
  const fields = [
    ['Name', name],
    ['Phone', phone],
    ['Email', contactEmail],
    ['Interested in', interest],
  ]

  const rows = fields.map(([label, value]) => {
    const safeValue = escapeHtml(value)
    const linkStyle = 'color:#173f35;text-decoration:underline;'
    let content = safeValue
    if (label === 'Phone') {
      const number = value.replace(/[^+0-9]/g, '')
      content = `<a href="tel:${number}" style="${linkStyle}">${safeValue}</a>`
    }
    if (label === 'Email' && email) {
      const address = encodeURIComponent(email).replace('%40', '@')
      content = `<a href="mailto:${address}" style="${linkStyle}">${safeValue}</a>`
    }
    return `<tr><th scope="row" align="left" valign="top" width="100" style="padding:10px 12px 10px 0;border-bottom:1px solid #e1e6df;font-weight:normal;color:#475d54;">${label}</th>
      <td valign="top" style="padding:10px 0;border-bottom:1px solid #e1e6df;color:#173f35;overflow-wrap:anywhere;word-break:break-word;">${content}</td></tr>`
  }).join('')

  const messageSection = isContact
    ? `<h2 style="margin:26px 0 10px;font-size:16px;line-height:22px;color:#173f35;">Message</h2>
      <div style="padding:14px 16px;border-left:3px solid #a98842;background-color:#f4f5f0;color:#203a31;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(message).replace(/\r\n?|\n/g, '<br>')}</div>`
    : ''

  return {
    subject: title,
    text: [title, '', ...fields.map(([label, value]) => `${label}: ${value}`), ...(isContact ? ['', 'Message', message] : [])].join('\n'),
    html: `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;background-color:#f4f5f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f0;">
    <tr><td align="center" style="padding:16px 10px;">
      <!--[if mso]><table role="presentation" width="560" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e1e6df;text-align:left;font-family:Arial,sans-serif;font-size:15px;line-height:23px;">
        <tr><td bgcolor="#173f35" style="padding:22px 24px;border-top:4px solid #a98842;background-color:#173f35;color:#ffffff;">
          <p style="margin:0 0 6px;color:#e4d2a6;font-size:13px;line-height:19px;">Parvath Life and Legacy Advisors</p>
          <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:34px;font-weight:normal;color:#ffffff;">${title}</h1>
        </td></tr>
        <tr><td style="padding:16px 24px 24px;">
          <table aria-label="Contact details" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:15px;line-height:23px;">${rows}</table>
          ${messageSection}
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`,
  }
}
