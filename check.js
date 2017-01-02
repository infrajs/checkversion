( function () {
	for (var i in localStorage) break;
	if (!i) {
		localStorage.checkversion_time = window.checkversion.time;
		localStorage.checkversion_name = window.checkversion.name;
		return; //Первый заход
	}
	var destroed = (!localStorage.checkversion_time||!localStorage.checkversion_name);

	var oldhtml = false;
	var notequal = false;
	if (destroed) {
		notequal = true;
	} else {
		var notequal = (localStorage.checkversion_name != window.checkversion.name);
		if (notequal) { //Нештатная ситуация, когда html старей данных в storage
			var oldhtml = localStorage.checkversion_time > window.checkversion.time;
		}
	}

	if (localStorage.checkversion_oldhtml) {
		//Защита от зацикливания, если location.reload будет возвращать кэш с прокси сервера или т.п.
		oldhtml = false;
		localStorage.removeItem('checkversion_oldhtml');
	} else if (oldhtml) {
		localStorage.checkversion_oldhtml = true;
		//Reload без обновления Storage и Cookie чтобы не сбрасывать лишний раз данные, из-за клиентского кэша
		location.reload();
		return;
	}

	if (notequal) {
		localStorage.clear();
		document.cookie.split(";").forEach( function(c) { 
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
		});
		location.reload(); //reload из-за кукисов, которые устанавливает сервер если контент был приватный, и возможного кэша
	}
})();