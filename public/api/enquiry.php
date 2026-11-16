<?php
/**
 * Enquiry endpoint for Hostinger. Mirrors api/enquiry.js, which serves the
 * same route in local development. Keep the two in step: tests/enquiry.test.js
 * checks that the recipients and interest options match.
 */
declare(strict_types=1);

const PARVATH_ENQUIRY = true;
const MAX_BODY_BYTES = 8192;
const ENQUIRY_RECIPIENTS = [
    'varalakshmi@parvathfinserv.com',
    'contact@parvathfinserv.com',
];
const INTEREST_OPTIONS = [
    'Wealth Creation',
    'Retirement Planning',
    'Life Insurance',
    'Health Insurance',
    'Bonds & Deposits',
    'Legacy Planning',
    'Employer-Employee Insurance',
    'Group Gratuity',
    'General Enquiry',
];
const EMAIL_PATTERN = '/^[^\s@,<>"]+@[^\s@,<>"]+\.[a-z]{2,}$/i';
const PHONE_PATTERN = '/^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/';

function reply(int $status, bool $ok): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['ok' => $ok]);
    exit;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8');
}

/** Same layout as server/enquiryEmail.js. */
function enquiry_email(bool $isContact, string $name, string $phone, string $email, string $interest, string $message): array
{
    $title = $isContact ? 'New website enquiry' : 'New callback request';
    $fields = [
        'Name' => $name,
        'Phone' => $phone,
        'Email' => $email !== '' ? $email : 'Not provided',
        'Interested in' => $interest,
    ];
    $linkStyle = 'color:#173f35;text-decoration:underline;';

    $rows = '';
    $text = [$title, ''];
    foreach ($fields as $label => $value) {
        $text[] = "$label: $value";
        $content = escape_html($value);
        if ($label === 'Phone') {
            $number = preg_replace('/[^+0-9]/', '', $value);
            $content = "<a href=\"tel:$number\" style=\"$linkStyle\">$content</a>";
        }
        if ($label === 'Email' && $email !== '') {
            $address = str_replace('%40', '@', rawurlencode($email));
            $content = "<a href=\"mailto:$address\" style=\"$linkStyle\">$content</a>";
        }
        $rows .= "<tr><th scope=\"row\" align=\"left\" valign=\"top\" width=\"100\" style=\"padding:10px 12px 10px 0;border-bottom:1px solid #e1e6df;font-weight:normal;color:#475d54;\">$label</th>"
            . "<td valign=\"top\" style=\"padding:10px 0;border-bottom:1px solid #e1e6df;color:#173f35;overflow-wrap:anywhere;word-break:break-word;\">$content</td></tr>";
    }

    $messageSection = '';
    if ($isContact) {
        array_push($text, '', 'Message', $message);
        $safeMessage = preg_replace('/\r\n?|\n/', '<br>', escape_html($message));
        $messageSection = '<h2 style="margin:26px 0 10px;font-size:16px;line-height:22px;color:#173f35;">Message</h2>'
            . "<div style=\"padding:14px 16px;border-left:3px solid #a98842;background-color:#f4f5f0;color:#203a31;overflow-wrap:anywhere;word-break:break-word;\">$safeMessage</div>";
    }

    $html = <<<HTML
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>$title</title></head>
<body style="margin:0;background-color:#f4f5f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f0;">
    <tr><td align="center" style="padding:16px 10px;">
      <!--[if mso]><table role="presentation" width="560" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e1e6df;text-align:left;font-family:Arial,sans-serif;font-size:15px;line-height:23px;">
        <tr><td bgcolor="#173f35" style="padding:22px 24px;border-top:4px solid #a98842;background-color:#173f35;color:#ffffff;">
          <p style="margin:0 0 6px;color:#e4d2a6;font-size:13px;line-height:19px;">Parvath Life and Legacy Advisors</p>
          <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:34px;font-weight:normal;color:#ffffff;">$title</h1>
        </td></tr>
        <tr><td style="padding:16px 24px 24px;">
          <table aria-label="Contact details" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:15px;line-height:23px;">$rows</table>
          $messageSection
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>
HTML;

    return ['subject' => $title, 'text' => implode("\n", $text), 'html' => $html];
}

/** Read one SMTP reply (which may span several lines) and return its code. */
function smtp_read($socket): int
{
    $code = 0;
    while (($line = fgets($socket, 1024)) !== false) {
        $code = (int) substr($line, 0, 3);
        if (strlen($line) < 4 || $line[3] !== '-') break;
    }
    return $code;
}

function smtp_command($socket, string $command, array $expected): void
{
    fwrite($socket, $command . "\r\n");
    $code = smtp_read($socket);
    if (!in_array($code, $expected, true)) {
        throw new RuntimeException("SMTP reply $code");
    }
}

/**
 * Send one message over an authenticated SMTP connection. Throws unless the
 * server accepts every recipient and the message itself.
 */
function smtp_send(string $server, string $user, string $password, array $recipients, string $replyTo, array $mail): void
{
    $socket = @stream_socket_client($server, $errorCode, $errorText, 5);
    if (!$socket) throw new RuntimeException("SMTP connect $errorCode");
    stream_set_timeout($socket, 10);

    try {
        if (smtp_read($socket) !== 220) throw new RuntimeException('SMTP greeting');
        $domain = substr(strrchr($user, '@') ?: '@localhost', 1);
        smtp_command($socket, "EHLO $domain", [250]);
        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($user), [334]);
        smtp_command($socket, base64_encode($password), [235]);
        smtp_command($socket, "MAIL FROM:<$user>", [250]);
        foreach ($recipients as $recipient) {
            smtp_command($socket, "RCPT TO:<$recipient>", [250, 251]);
        }
        smtp_command($socket, 'DATA', [354]);

        $boundary = 'parvath-' . bin2hex(random_bytes(12));
        $headers = [
            'Date: ' . date(DATE_RFC2822),
            "From: <$user>",
            'To: ' . implode(', ', array_map(fn ($address) => "<$address>", $recipients)),
            'Subject: ' . $mail['subject'],
            'Message-ID: <' . bin2hex(random_bytes(16)) . "@$domain>",
            'MIME-Version: 1.0',
            "Content-Type: multipart/alternative; boundary=\"$boundary\"",
        ];
        if ($replyTo !== '') $headers[] = "Reply-To: <$replyTo>";

        $part = fn (string $type, string $content) => "--$boundary\r\n"
            . "Content-Type: $type; charset=utf-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($content), 76, "\r\n");
        // Base64 bodies never start a line with a dot, so no dot-stuffing is needed.
        $data = implode("\r\n", $headers) . "\r\n\r\n"
            . $part('text/plain', $mail['text'])
            . $part('text/html', $mail['html'])
            . "--$boundary--\r\n.";
        smtp_command($socket, $data, [250]);
        fwrite($socket, "QUIT\r\n");
    } finally {
        fclose($socket);
    }
}

function load_config(): array
{
    $config = [];
    $file = __DIR__ . '/enquiry-config.php';
    if (is_file($file)) {
        $loaded = require $file;
        if (is_array($loaded)) $config = $loaded;
    }
    foreach (['SMTP_USER', 'SMTP_PASSWORD', 'SMTP_SERVER'] as $key) {
        $fromEnv = getenv($key);
        if (is_string($fromEnv) && $fromEnv !== '') $config[$key] = $fromEnv;
    }
    return $config;
}

// ---------------------------------------------------------------- request

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, false);
}
$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($contentType !== 'application/json') reply(415, false);
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) reply(413, false);

// Block browser submissions initiated from another site. This supplements,
// but does not replace, host-level rate limiting for non-browser clients.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $originPort = parse_url($origin, PHP_URL_PORT);
    $originAuthority = is_string($originHost) ? strtolower($originHost . ($originPort ? ":$originPort" : '')) : '';
    $host = strtolower($_SERVER['HTTP_X_FORWARDED_HOST'] ?? $_SERVER['HTTP_HOST'] ?? '');
    if ($originAuthority === '' || $originAuthority !== $host) reply(403, false);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false) reply(400, false);
if (strlen($raw) > MAX_BODY_BYTES) reply(413, false);
$body = json_decode($raw, true);
if (!is_array($body) || ($body !== [] && array_keys($body) === range(0, count($body) - 1))) reply(400, false);

// A field hidden from visitors catches simple form-filling bots quietly.
if (is_string($body['website'] ?? null) && trim($body['website']) !== '') reply(200, true);

$field = fn (string $key) => is_string($body[$key] ?? null) ? trim($body[$key]) : '';
$source = $field('source');
$name = $field('name');
$phone = $field('phone');
$email = $field('email');
$interest = $field('interest');
$message = $field('message');
$isContact = $source === 'contact';
$length = fn (string $value) => mb_strlen($value, 'UTF-8');

if (
    (!$isContact && $source !== 'callback')
    || $length($name) < ($isContact ? 2 : 1) || $length($name) > 120
    || !preg_match(PHONE_PATTERN, $phone)
    || (($isContact || $email !== '') && (!preg_match(EMAIL_PATTERN, $email) || strlen($email) > 254))
    || !in_array($interest, INTEREST_OPTIONS, true)
    || ($isContact && ($length($message) < 10 || $length($message) > 2000))
) {
    reply(400, false);
}

$config = load_config();
$user = $config['SMTP_USER'] ?? '';
$password = $config['SMTP_PASSWORD'] ?? '';
if ($user === '' || $password === '') reply(503, false);

try {
    smtp_send(
        $config['SMTP_SERVER'] ?? 'ssl://smtp.hostinger.com:465',
        $user,
        $password,
        ENQUIRY_RECIPIENTS,
        $email,
        enquiry_email($isContact, $name, $phone, $email, $interest, $isContact ? $message : ''),
    );
} catch (Throwable $error) {
    error_log('Enquiry SMTP failed: ' . $error->getMessage());
    reply(502, false);
}

reply(200, true);
