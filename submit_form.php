<?php
$recaptchaSecret = "YOUR_SECRET_KEY";
$recaptchaResponse = $_POST['g-recaptcha-response'];

$recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
$recaptchaData = [
    'secret' => $recaptchaSecret,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR'],
];

$recaptchaOptions = [
    'http' => [
        'method' => 'POST',
        'content' => http_build_query($recaptchaData),
    ],
];

$recaptchaContext = stream_context_create($recaptchaOptions);
$recaptchaResult = file_get_contents($recaptchaUrl, false, $recaptchaContext);
$recaptchaResult = json_decode($recaptchaResult);

if ($recaptchaResult->success == false) {
    echo "reCAPTCHA verification failed. Please try again.";
    // You might choose to exit the script here or handle it differently.
} else {
    // Continue processing the form data and sending emails.
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Retrieve user inputs
        $name = htmlspecialchars($_POST["name"]);
        $email = htmlspecialchars($_POST["email"]);
        $message = htmlspecialchars($_POST["message"]);
    
        // Validate the data (you can add more rigorous validation)
        if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Please fill in all fields with valid data.";
        } else {
            // Destination email address
            $to = "princetiko56@gmail.com";
    
            // Subject of the email
            $subject = "New contact form submission from $name";
    
            // Email message
            $email_message = "Name: $name\n";
            $email_message .= "Email: $email\n";
            $email_message .= "Message:\n$message";
    
            // Additional headers
            $headers = "From: $email\r\nReply-To: $email";
    
            // Send the email
            if (mail($to, $subject, $email_message, $headers)) {
                echo "Message sent successfully. We'll get back to you soon!";
            } else {
                echo "Sorry, there was an error while sending your message.";
            }
        }
    } else {
        echo "Access denied.";
    }
}
?>
