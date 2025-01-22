jQuery(document).ready(function ($) {
   // маска телефона
   $('input[type="tel"]').mask("+38(999) 999-99-99");

   // получаем токен от reCaptcha
   //   grecaptcha.ready(function () {
   //      // ключ сайта тут нужно менять
   //      grecaptcha.execute('6LeS8ygmAAAAAHevT7-0kqokA8gd4n8e2pOxYnvI', { action: 'homepage' }).then(function (token) {
   //          console.log(token);
   //          document.getElementById('g-recaptcha-response').value = token;
   //      });
   //  });

   // добавляем адрес в форму (для рекламы)
   let fullURL = window.location.href;
   sessionStorage.setItem("fullURL", fullURL);
   $("input[name='url']").val(sessionStorage.getItem("fullURL"));

   // форма с проверкой
	$("#ajax-contact-form").validate({
		// ... остальные параметры validate ...
		submitHandler: function (form) {
			 var str = $(form).serialize();
  
			 $.ajax({
				  type: "POST",
				  url: "contact.php",
				  data: str,
				  success: function (msg) {
						if (msg == "OK") {
							 // Скрываем текущее модальное окно
							 $.fancybox.close($("#modal-contact-1"));
							 $.fancybox.open($("#modal-thk-1"), {
								smallBtn: false,
								touch: false,
								autoFocus:false
								// Другие параметры по необходимости...
							 });
							 
							 
								$(form).find('input[type="text"], input[type="email"], input[type="tel"]').val('');
  
							 // Дополнительно: можно очистить поля формы
							 // $(form).find('input[type="text"], input[type="email"], input[type="tel"]').val('');
						} else {
							 // Обработка ошибок, если таковые имеются
							 $("#note3").html(msg);
						}
				  },
			 });
			 return false;
		},
  });
  


}); /* //jQuery(document).ready  */
