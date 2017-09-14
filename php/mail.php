<?php
	$to = 'tomek@mysliwiec.pro'; // Type receiver email address
	
	// Filtering input data
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
	$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
	$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
	$massage = filter_input(INPUT_POST, 'massage', FILTER_SANITIZE_STRING);
	
	// Email encoding and headers
        $sender = "=?UTF-8?B?".base64_encode($name)."?=";
        $headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8'\r\n";
        $headers .= "From:<$email> $sender\r\n";

	// Building message string
	$message = 'Imię: '.$name.'<br />E-mail: '.$email.'<br />Temat: '.$subject.'<br />Wiadomość: '.$massage;

	// Sending email
	if($name != '' && $email != '' && $massage != '' && $subject != '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $ok = mail($to, $sender.'. mysliwiec.pro - Formularz kontaktowy', $message, $headers);
        }

	// Output message if successful or not
	if ($ok) {
		$info = 'OK! Thanks.';
	}
	else {
		$info = 'Ups... Error!';
	}
	echo $info;
?>