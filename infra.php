<?php
use infrajs\event\Event;
use infrajs\view\View;
use infrajs\load\Load;
use infrajs\access\Access;
use infrajs\once\Once;
use MatthiasMullie\Minify;
use infrajs\config\Config;

Event::one('Layer.onshow', function (&$layer) {
	if (empty($layer['checkversion'])) return; //Контроль версий не включён

	$html = Access::cache(__FILE__, function () {
		$data = Config::pub('checkversion');
		$data['time'] = time();
		$data = Load::json_encode($data);
		$html = '<script>';
		$code = 'window.checkversion='.$data.';';
		$code .= Load::loadTEXT('-checkversion/check.js');
		$min = new Minify\JS($code);
		$code = $min->minify();
		$html .= $code;
		$html .= '</script>';
		return $html;
	});
	Once::exec(__FILE__, function () use ($html) {
		View::head($html, true);
	});
}, 'checkversion:tpl');