( function ( $ ) {
	'use strict';

	var ruYawerty = {
		id: 'ru-yawerty',
		name: 'Russian YAWERTY',
		description: 'Russian YAWERTY keyboard layout',
		date: '2013-02-12',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Parag Nemade',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '/q', 'ђ' ],
			[ '/w', 'ѓ' ],
			[ '/e', 'є' ],
			[ '/r', 'ѕ' ],
			[ '/t', 'і' ],
			[ '/y', 'ї' ],
			[ '/u', 'ј' ],
			[ '/i', 'љ' ],
			[ '/o', 'њ' ],
			[ '/p', 'ћ' ],
			[ '/a', 'ќ' ],
			[ '/s', 'ў' ],
			[ '/d', 'џ' ],
			[ '/Q', 'Ђ' ],
			[ '/W', 'Ѓ' ],
			[ '/E', 'Є' ],
			[ '/R', 'Ѕ' ],
			[ '/T', 'І' ],
			[ '/Y', 'Ї' ],
			[ '/U', 'Ј' ],
			[ '/I', 'Љ' ],
			[ '/O', 'Њ' ],
			[ '/P', 'Ћ' ],
			[ '/A', 'Ќ' ],
			[ '/S', 'Ў' ],
			[ '/D', 'Џ' ],

			[ '\\=', 'ч' ],
			[ '`', 'ю' ],
			[ 'q', 'я' ],
			[ 'w', 'в' ],
			[ 'e', 'е' ],
			[ 'r', 'р' ],
			[ 't', 'т' ],
			[ 'y', 'ы' ],
			[ 'u', 'у' ],
			[ 'i', 'и' ],
			[ 'o', 'о' ],
			[ 'p', 'п' ],
			[ '\\[', 'ш' ],
			[ '\\]', 'щ' ],
			[ 'a', 'а' ],
			[ 's', 'с' ],
			[ 'd', 'д' ],
			[ 'f', 'ф' ],
			[ 'g', 'г' ],
			[ 'h', 'х' ],
			[ 'j', 'й' ],
			[ 'k', 'к' ],
			[ 'l', 'л' ],
			[ '\\\\', 'э' ],
			[ 'z', 'з' ],
			[ 'x', 'ь' ],
			[ 'c', 'ц' ],
			[ 'v', 'ж' ],
			[ 'b', 'б' ],
			[ 'n', 'н' ],
			[ 'm', 'м' ],
			[ '\\@', 'ё' ],
			[ '\\#', 'ъ' ],
			[ '\\$', 'Ё' ],
			[ '\\+', 'Ч' ],
			[ '\\~', 'Ю' ],
			[ 'Q', 'Я' ],
			[ 'W', 'В' ],
			[ 'E', 'Е' ],
			[ 'R', 'Р' ],
			[ 'T', 'Т' ],
			[ 'Y', 'Ы' ],
			[ 'U', 'У' ],
			[ 'I', 'И' ],
			[ 'O', 'О' ],
			[ 'P', 'П' ],
			[ '\\{', 'Ш' ],
			[ '\\}', 'Щ' ],
			[ 'A', 'А' ],
			[ 'S', 'С' ],
			[ 'D', 'Д' ],
			[ 'F', 'Ф' ],
			[ 'G', 'Г' ],
			[ 'H', 'Х' ],
			[ 'J', 'Й' ],
			[ 'K', 'К' ],
			[ 'L', 'Л' ],
			[ '\\|', 'Э' ],
			[ 'Z', 'З' ],
			[ 'X', 'Ь' ],
			[ 'C', 'Ц' ],
			[ 'V', 'Ж' ],
			[ 'B', 'Б' ],
			[ 'N', 'Н' ],
			[ 'M', 'М' ] ]
	};

	$.ime.register( ruYawerty );
}( jQuery ) );
