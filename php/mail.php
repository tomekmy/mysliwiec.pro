<?php
	$to = 'tomek@mysliwiec.pro'; //Tu wpisz adres e-mail na który mają być wysyłane formularze. Jeśli tego nie zrobisz pojawi się komunikat "Błąd. Wiadomość nie wysłana!".
        
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
	$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
	$subject = filter_input(INPUT_POST, 'msg', FILTER_SANITIZE_STRING);
	$msg = filter_input(INPUT_POST, 'msg', FILTER_SANITIZE_STRING);
        
        $sender = "=?UTF-8?B?".base64_encode($name)."?=";
	
        $headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8'\r\n";
        $headers .= "From:<$email> $sender\r\n";

	$message = 'Imię: '.$name.'<br />E-mail: '.$email.'<br />Temat: '.$subject.'<br />Wiadomość: '.$msg;

	if($name != '' && $email != '' && $msg != '') {
            $ok = mail($to, $sender.'. mysliwiec.pro - Formularz kontaktowy', $message, $headers);
        }

	if ($ok) {
		$info = true;
	}
	else {
		$info = false;
	}
?>

<script type="text/javascript">
	// <![CDATA[

                $('.captcha_info').html('<?php echo $info; ?><br />');

	// ]]>
</script>