<?php
if(isset($_POST["email"])){
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["text"];
    
    $toemail = "stamateuz38@gmail.com";
    $subject = "Wiadomość ze strony od: $name";

    $headers = "From: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $email_message = '<html><body>';
    $email_message .= '<h2>Formularz kontaktowy</h2>';
    $email_message .= '<p><b>Imię:</b> ' . $name . '</p>';
    $email_message .= '<p><b>E-mail:</b> ' . $email . '</p>';
    $email_message .= '<p><b>Telefon:</b> ' . $phone . '</p>';
    $email_message .= '<p><b>Wiadomość:</b> ' . $message . '</p>';
    $email_message .= '</body></html>';

    if(mail($toemail, $subject, $email_message, $headers)){
        header("Location: https://optymalizujprojekt.pl/success.html");
        die();
    }else{
        header("Location: https://optymalizujprojekt.pl/failure.html");
    }
}
?>