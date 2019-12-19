( function ( $ ) {
	'use strict';

	var eoPlena = {
		id: 'eo-plena',
		name: 'Esperanto plena',
		description: 'writing Esperanto-letters with the fundamental system and the X-system, like the default of EK.',
		date: '2013-02-12',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Parag Nemade',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'ĉx', 'cx' ],
			[ 'ĝx', 'gx' ],
			[ 'ĥx', 'hx' ],
			[ 'ĵx', 'jx' ],
			[ 'ŝx', 'sx' ],
			[ 'ŭx', 'ux' ],
			[ 'Ĉx', 'Cx' ],
			[ 'Ĝx', 'Gx' ],
			[ 'Ĥx', 'Hx' ],
			[ 'Ĵx', 'Jx' ],
			[ 'Ŝx', 'Sx' ],
			[ 'Ŭx', 'Ux' ],
			[ 'ĈX', 'CX' ],
			[ 'ĜX', 'GX' ],
			[ 'ĤX', 'HX' ],
			[ 'ĴX', 'JX' ],
			[ 'ŜX', 'SX' ],
			[ 'ŬX', 'UX' ],

			[ 'ĉh', 'ch' ],
			[ 'ĝh', 'gh' ],
			[ 'ĥh', 'hh' ],
			[ 'ĵh', 'jh' ],
			[ 'ŝh', 'sh' ],
			[ 'aŭu', 'au' ],
			[ 'eŭu', 'eu' ],
			[ 'Ĉh', 'Ch' ],
			[ 'Ĝh', 'Gh' ],
			[ 'Ĥh', 'Hh' ],
			[ 'Ĵh', 'Jh' ],
			[ 'Ŝh', 'Sh' ],
			[ 'Aŭu', 'Au' ],
			[ 'Eŭu', 'Eu' ],
			[ 'ĈH', 'CH' ],
			[ 'ĜH', 'GH' ],
			[ 'ĤH', 'HH' ],
			[ 'ĴH', 'JH' ],
			[ 'ŜH', 'SH' ],
			[ 'AŬU', 'AU' ],
			[ 'EŬU', 'EU' ],

			[ 'cx', 'ĉ' ],
			[ 'gx', 'ĝ' ],
			[ 'hx', 'ĥ' ],
			[ 'jx', 'ĵ' ],
			[ 'sx', 'ŝ' ],
			[ 'ux', 'ŭ' ],
			[ 'Cx', 'Ĉ' ],
			[ 'Gx', 'Ĝ' ],
			[ 'Hx', 'Ĥ' ],
			[ 'Jx', 'Ĵ' ],
			[ 'Sx', 'Ŝ' ],
			[ 'Ux', 'Ŭ' ],
			[ 'CX', 'Ĉ' ],
			[ 'GX', 'Ĝ' ],
			[ 'HX', 'Ĥ' ],
			[ 'JX', 'Ĵ' ],
			[ 'SX', 'Ŝ' ],
			[ 'UX', 'Ŭ' ],

			[ 'ch', 'ĉ' ],
			[ 'gh', 'ĝ' ],
			[ 'hh', 'ĥ' ],
			[ 'jh', 'ĵ' ],
			[ 'sh', 'ŝ' ],
			[ 'au', 'aŭ' ],
			[ 'eu', 'eŭ' ],
			[ 'Ch', 'Ĉ' ],
			[ 'Gh', 'Ĝ' ],
			[ 'Hh', 'Ĥ' ],
			[ 'Jh', 'Ĵ' ],
			[ 'Sh', 'Ŝ' ],
			[ 'Au', 'Aŭ' ],
			[ 'Eu', 'Eŭ' ],
			[ 'CH', 'Ĉ' ],
			[ 'GH', 'Ĝ' ],
			[ 'HH', 'Ĥ' ],
			[ 'JH', 'Ĵ' ],
			[ 'SH', 'Ŝ' ],
			[ 'AU', 'AŬ' ],
			[ 'EU', 'EŬ' ]
		]
	};

	$.ime.register( eoPlena );
}( jQuery ) );
