<?php
	require 'PHPMailerAutoload.php';


    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
            $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

	$mail = new PHPMailer();

	$mail->SMTPDebug = 3;                               // Enable verbose debug output

// mail.chrislacaille.com 
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'ns8341.hostgator.com; ns8342.hostgator.com';       // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'chris@chrislacaille.com';                 // SMTP username
	$mail->Password = 'saitek150';                           // SMTP password
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;      							// TCP port to connect to

	
	$mail->setFrom($email, $name);

	$mail->addAddress('chrislacaille5@gmail.com');               // Name is optional

	$mailsubject =  $name . '-' . $email;

	$mail->Subject = $mailsubject;
	$mail->Body    = $message;

	if(!$mail->send()) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
	    echo 'Message has been sent';
	}
