<?php

define('SITE_KEY', '6LeS8ygmAAAAAHevT7-0kqokA8gd4n8e2pOxYnvI'); /* ключ сайта reCaptcha */
define('SECRET_KEY', '6LeS8ygmAAAAAEPOT1uc8XGNwLUWAu8Z8Uewjeyg'); /* секретный ключ reCaptcha */
define("TELEGRAM_TOKEN", "");
define("TELEGRAM_CHAT_ID", "");
define("SUBJECT", "Лист з сайту Test"); /* тема письма */
define("EMAIL_TO", "varfolomeisafronov@gmail.com"); /* куда отправляем */


$post = (!empty($_POST)) ? true : false;

if ($post) {
	$name = htmlspecialchars($_POST['name-client']);
	// $email = htmlspecialchars($_POST['email']);
	$phone = htmlspecialchars($_POST['phone-client']);
	// $message = htmlspecialchars($_POST['message']);
	$urlAll = $_POST['url'];
	$error = '';

	/*Создаем функцию которая делает запрос на google сервис*/
	//  function getCaptcha($SecretKey)
	//  {
	//      $Response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . SECRET_KEY . "&response={$SecretKey}");
	//      $Return = json_decode($Response);
	//      return $Return;
	//  }

	/* Производим запрос на google сервис и записываем ответ */
	//  $Return = getCaptcha($_POST['g-recaptcha-response']);
	/*Выводим на экран полученный ответ*/
	//var_dump($Return);

	/*Если запрос удачно отправлен и значение score больше 0,5 выполняем код*/
	//  if ($Return->success == true && $Return->score > 0.5) {
	//      $captcha_success = "captchaOk";
	//      //echo $captcha_success;
	//  } else {
	//      $captcha_success = "captchaError";
	//      //echo $captcha_success;
	//      $error .= 'ошибка reCaptcha';
	//  }



	// сообщение, которое будет отправлено в Telegram
	$text = "Новое сообщение с сайта:\n\nІм\'я: $name\nТелефон: $phone\nСсылка: $urlAll";
	$text = stripslashes($text);


	if (!$error) {
		$to = EMAIL_TO;
		$subject = SUBJECT;
		// текст письма
		$message = '
                <html>
                <head>
                <title>' . SUBJECT . '</title>
                </head>
                <body>
                <table>
                    <tr>
                    <td>Ім\'я</td>
                    <td>' . $name . '</td>
                    </tr>
                    <tr>
                    <td>Телефон</td>
                    <td>' . $phone . '</td>
                    </tr>
                    <tr>
                    <td>Як зв\'язатись?</td>
                    <td>' . $call . '</td>
                    </tr>
                    <tr>
                    <td>Посилання</td>
                    <td>' . $urlAll . '</td>
                    </tr>
                </table>
                </body>
                </html>
                ';
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

		$mail = mail($to, $subject, $message, $headers);

		// отправляем сообщение в Telegram
		$url = "https://api.telegram.org/bot" . TELEGRAM_TOKEN . "/sendMessage?chat_id=" . TELEGRAM_CHAT_ID . "&text=" . urlencode($text);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		curl_close($ch);

		if ($mail) {
			echo 'OK';
		}
	} else {
		echo '<div class="notification_error">' . $error . '</div>';
	}
}
