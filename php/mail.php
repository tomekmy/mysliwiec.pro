<?php
	$to = 'tomek@mysliwiec.pro'; //Tu wpisz adres e-mail na który mają być wysyłane formularze. Jeśli tego nie zrobisz pojawi się komunikat "Błąd. Wiadomość nie wysłana!".
        
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
	$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
	$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_NUMBER_INT);
	$msg = filter_input(INPUT_POST, 'msg', FILTER_SANITIZE_STRING);
        $file = filter_input(INPUT_POST, 'file', FILTER_SANITIZE_STRING);
        if($file != '') {
                $file = date("Y-m-d_H:i:s").'_'.$file;
        }
        
        $sender = "=?UTF-8?B?".base64_encode($name)."?=";
	
        $headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8'\r\n";
        $headers .= "From:<$email> $sender\r\n";

	$message = 'Imię: '.$name.'<br />E-mail: '.$email.'<br />Telefon: '.$phone.'<br />Wiadomość: '.$msg.'<br />Plik: '.$file;

	if($name != '' && $email != '' && $msg != '') {
            $ok = mail($to, $sender.'. TM Systems - Formularz kontaktowy', $message, $headers);
        }

	if ($ok) {
		$info = 'Wiadomość wysłana.';
	}
	else {
		$info = 'Błąd. Wiadomość nie wysłana!';
	}
?>

<script type="text/javascript">
	// <![CDATA[

		$('.captcha_info').html('<?php echo $info; ?><br />');
                $("input[name='imie']").val('Twoje imię*');
                $("input[name='mail']").val('E-mail*');
                $("input[name='phone']").val('Telefon');
                $(".message textarea").val('Wiadomość*');
                $("input[name='sum']").val('Wynik*');
                $(".fakefile").val('Prześlij plik. (Pliki graficzne, max 2MB)');
                $(".upload").val('');
                var wynik = count();

	// ]]>
</script>