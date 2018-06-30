Event.one('Controller.oninit', function () {
	//autoedit
	if (infra.theme.prefix) return;
	if (Access.debug()) infra.theme.prefix = 'infrajs=a&-nostore=true';//fix mod security
});