( function ( $ ) {
	'use strict';

	var orLekhani = {
		id: 'or-lekhani',
		name: 'ଫୋନେଟିକ',
		description: 'Odia Lekhani phonetic input method',
		date: '2012-10-14',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Junaid P V, Subhashish Panigrahi and Jnanaranjan Sahu',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 4,
		maxKeyLength: 2,
		patterns: [
			[ '\\\\([A-Za-z\\>_~\\.0-9])', '\\\\', '$1' ],

			[ '([କ-ହୟୱଡ଼ଢ଼ଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍ଜ])a', '$1ା' ],
			[ '([କ-ଳଲନ୍ଧଥଡ଼ଢ଼ହୟୱରକ୍ଷଶସଷଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍ଜ])i', '$1\u0b3f' ],
			[ '([କ-ହୟୱଡ଼ଢ଼ଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍])I', '$1ୀ' ],
			[ '([କ-ହୟୱଡ଼ଢ଼ଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍])u', '$1\u0b41' ],
			[ '([କ-ହୟୱ])(U|\u0b41u)', '$1\u0b42' ],
			[ '([କ-ହୟୱ])R', '$1\u0b43' ],
			[ '([କ-ହୟୱ])\u0b43R', '$1\u0b44' ],
			[ '([କ-ହୟୱ])୍ଳ୍l', '$1ୢ' ],
			[ '([କ-ହୟୱ])ୢl', '$1ୣ' ],
			[ '([କ-ହୟୱଡ଼ଢ଼ଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍])e', '$1େ' ],
			[ '([କ-ହୟୱଡ଼ଢ଼ଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍])o', '$1ୋ' ],
			[ '([କ-ହୟୱଡ଼ଢ଼ଙ୍କଙ୍ଖଙ୍ଗଙ୍ଘଞ୍ଚଞ୍ଛଞ୍ଝଣ୍ଟଣ୍ଠଣ୍ଡଣ୍ଢନ୍ତନ୍ଥନ୍ଦନ୍ଧମ୍ପମ୍ଫମ୍ବମ୍ଭଞ୍])(ାu|ୋu)', '$1ୌ' ],
			[ '([କ-ହୟୱ])E', '$1\u0B48' ],
			[ '([କ-ହୟୱ])(w|v)', '$1୍ୱ' ],
			[ '([କ-ହୟୱ])~', '$1\u200C' ],

			[ '([କ-ହୱ])y', '$1୍ୟ' ], // <consonant>y

			[ 'z', '୍' ], // halanta
			[ '\\.', '।' ], // purnacheda
			[ 'ଅa', 'ଆ' ],
			[ 'ଏe', 'ଐ' ],
			[ '(ଅu|O)', 'ଔ' ],
			[ 'ଋR', 'ୠ' ], // RR
			[ 'ଳl', 'ଌ' ], // Ll
			[ 'ଌl', 'ୡ' ], // Lll
			[ 'ଞ୍ଚh', 'ଞ୍ଛ' ], // nch
			[ 'ଞ୍ଜh', 'ଞ୍ଝ' ], // njh
			[ 'ଙ୍କh', 'ଙ୍ଖ' ], // nkh
			[ 'ଙ୍ଗh', 'ଙ୍ଘ' ], // ngh
			[ 'ମ୍ବh', 'ମ୍ଭ' ], // mbh or nbh
			[ 'ଣ୍ଡai', 'ଣ୍ଡାଇ' ], // NDai
			[ 'ଜ୍ଜh', 'ଜ୍ଝ' ], // jjh
			[ 'ଚ୍ଚh', 'ଚ୍ଛ' ], // cch

			[ 'ଣG', 'ଙ' ], // NG
			[ 'ଣg', 'ଞ' ], // Ng
			[ 'କh', 'ଖ' ], // kh
			[ 'ଗh', 'ଘ' ], // gh
			[ 'ନc', 'ଞ୍ଚ' ], // nc
			[ 'ନg', 'ଙ୍ଗ' ], // ng
			[ 'ଚh', 'ଛ' ], // ch
			[ 'C', 'ଛ' ], // ch
			[ 'ଜh', 'ଝ' ], // jh
			[ 'ନj', 'ଞ୍ଜ' ], // nj
			[ 'ନk', 'ଙ୍କ' ], // nk
			[ 'ନd', 'ନ୍ଦ' ], // nd
			[ 'ନD|ଣD', 'ଣ୍ଡ' ], // nd
			[ 'ଣDh', 'ଣ୍ଢ' ], // ndh
			[ 'ନdh', 'ନ୍ଧ' ], // ndht
			[ 'ଟh', 'ଠ' ], // Th
			[ 'ଡh', 'ଢ' ], // Dh
			[ 'ତh', 'ଥ' ], // th
			[ 'ଦh', 'ଧ' ], // dh
			[ '(f|ପh|P)', 'ଫ' ], // ph or f
			[ 'ବh', 'ଭ' ], // bh
			[ 'ସh', 'ଷ' ], // sh
			[ 'ମb', 'ମ୍ବ' ], // mb or nb
			[ 'ଣT', 'ଣ୍ଟ' ], // NT
			[ 'ଣTh', 'ଣ୍ଠ' ], // NTh
			[ '(ଷ|ମ)p', '$1୍ପ' ], // sp/shp
			[ 'shp', 'ଷ୍ପ' ], // sp
			[ 'ଂM', 'ଁ' ], // MM

			[ 'କk', 'କ୍କ' ], // kk
			[ 'ଗg', 'ଗ୍ଗ' ], // gg
			[ 'ଚc', 'ଚ୍ଚ' ], // cc
			[ 'ଜj', 'ଜ୍ଜ' ], // jj
			[ 'ଦd', 'ଦ୍ଦ' ], // dd
			[ 'ଟT', 'ଟ୍ଟ' ], // TT
			[ 'ଡD', 'ଡ୍ଡ' ], // DD
			[ 'ତt', 'ତ୍ତ' ], // tt
			[ 'ଲl', 'ଲ୍ଲ' ], // ll
			[ 'ପp', 'ପ୍ପ' ], // pp
			[ '_', '\u200c' ],

			[ 'ଆ\\\\', '\u0B3E' ], // aa sign
			[ 'ଇ\\\\', '\u0B3F' ], // i sign
			[ 'ଈ\\\\', '\u0B40' ], // I sign
			[ 'ଉ\\\\', '\u0B41' ], // u sign
			[ 'ଉ\\\\', '\u0B42' ], // U sign
			[ 'ଋ\\\\', '\u0B43' ], // R sign
			[ 'ୠ\\\\', '\u0B44' ], // RR sign
			[ 'ଌ\\\\', '\u0B62' ], // L sign
			[ 'ୡ\\\\', '\u0B63' ], // LL sign
			[ 'ଏ\\\\', '\u0B47' ], // e sign
			[ 'ଐ\\\\', '\u0B48' ], // ai sign
			[ 'ଓ\\\\', '\u0B4B' ], // o sign
			[ 'ଔ\\\\', '\u0B4C' ], // au sign

			[ '\u200c?a', 'ଅ' ],
			[ 'b', 'ବ' ],
			[ 'c', '', 'ଚ' ],
			[ 'd', 'ଦ' ],
			[ '\u200c?e', 'ଏ' ],
			[ 'g', 'ଗ' ],
			[ 'G', 'ଘ' ],
			[ 'h', 'ହ' ],
			[ '\u200c?i', 'ଇ' ],
			[ 'j', 'ଜ' ],
			[ 'k', 'କ' ],
			[ 'l', 'ଲ' ],
			[ 'm', 'ମ' ],
			[ 'n', 'ନ' ],
			[ '\u200c?o', 'ଓ' ],
			[ 'p', 'ପ' ],
			[ 'q', 'ଡ଼' ],
			[ 'r', 'ର' ],
			[ 's', 'ସ' ],
			[ 't', 'ତ' ],
			[ '\u200c?u', 'ଉ' ],
			[ '[vwVW]', 'ୱ' ],
			[ 'x', 'କ୍ଷ' ],
			[ '[Y]', 'ୟ' ],
			[ '[y]', 'ଯ' ],
			[ '\u200c?A', 'ଆ' ],
			[ 'B', 'ବ' ],
			[ 'C', 'ଛ' ],
			[ 'D', 'ଡ' ],
			[ '\u200c?E', 'ଐ' ],
			[ 'F', 'ଫ' ],
			[ 'G', 'ଗ' ],
			[ 'H', 'ଃ' ],
			[ '\u200c?I', 'ଈ' ],
			[ 'J', 'ଯ' ],
			[ 'K', 'ଖ' ],
			[ 'L', 'ଳ' ],
			[ 'M', 'ଂ' ],
			[ 'N', 'ଣ' ],
			[ '\u200c?O', 'ଔ' ],
			[ 'P', 'ଫ' ],
			[ 'Q', 'ଢ଼' ],
			[ 'R', 'ଋ' ],
			[ 'S', 'ଶ' ],
			[ 'T', 'ଟ' ],
			[ '\u200c?U', 'ଊ' ],
			[ 'X', 'ଁ' ],
			[ 'Z', 'ଜ୍ଞ' ],
			[ '//', '୍ର' ],

			[ '0', '୦' ],
			[ '1', '୧' ],
			[ '2', '୨' ],
			[ '3', '୩' ],
			[ '4', '୪' ],
			[ '5', '୫' ],
			[ '6', '୬' ],
			[ '7', '୭' ],
			[ '8', '୮' ],
			[ '9', '୯' ]
		]
	};

	$.ime.register( orLekhani );
}( jQuery ) );
