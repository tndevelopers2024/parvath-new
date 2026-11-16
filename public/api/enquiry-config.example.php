<?php
// Copy this file to enquiry-config.php (same folder) and fill in the mailbox.
// enquiry-config.php is ignored by git and blocked by .htaccess.
if (!defined('PARVATH_ENQUIRY')) { http_response_code(404); exit; }

return [
    'SMTP_USER' => '',      // full Hostinger sending mailbox address
    'SMTP_PASSWORD' => '',  // that mailbox's password
];
