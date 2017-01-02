<?php
use infrajs\event\Event;
use infrajs\view\View;
use infrajs\load\Load;
use infrajs\config\Config;

Event::one('Layer.onshow', function (&$layer) {
	if (empty($layer['checkversion'])) return; //Контроль версий не включён
	$data = Config::pub('checkversion');
	$data['time'] = time();
	$data = Load::json_encode($data);
	$html = '<script>window.checkversion='.$data.';';
	$html .= Load::loadTEXT('-checkversion/check.js');
	$html .= '</script>';
	View::head($html, true);
});