import nodemailer from "nodemailer"

export default async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { server, from },
}) {
  const { host } = new URL(url)
  const transport = nodemailer.createTransport(server)
  await transport.sendMail({
    to: email,
    from,
    subject: `Connexion à Njörd`,
    text: text({ url, host }),
    html: html({ url, host, email }),
  })
}

// Email HTML body
function html({ url, email }: Record<"url" | "host" | "email", string>) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`

  const backgroundColor = "#18191a"
  const textColor = "#adadad"
  const mainBackgroundColor = "#212422"
  const buttonBackgroundColor = "#378f6a"
  const buttonBorderColor = "#378f6a"
  const buttonTextColor = "white"

  return `
<body style="background: ${backgroundColor};margin:0;padding: 15px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>Njörd | ARRD</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td 
              align="center"
              style="border-radius: 5px;"
              bgcolor="${buttonBackgroundColor}">
              <a 
                href="${url}" 
                target="_self"
                ref="opener"
                style="
                  font-size: 18px;
                  font-family: Helvetica, Arial, sans-serif;
                  color: ${buttonTextColor};
                  text-decoration: none;
                  border-radius: 5px;
                  padding: 10px 20px;
                  border: 1px solid ${buttonBorderColor};
                  display: inline-block; font-weight: bold;">
                Se connecter
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td 
        align="center"
        style="
          padding: 0px 0px 10px 0px;
          font-size: 16px;
          line-height: 22px;
          font-family: Helvetica, Arial, sans-serif;
          color: ${textColor};"
      >
        Si vous n'avez pas tenté de vous connecter, ignorer cette email.
      </td>
    </tr>
  </table>
</body>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<"url" | "host", string>) {
  return `Sign in to ${host}\n${url}\n\n`
}