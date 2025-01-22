((Prism) => {
	const operator = /==|!=|<=|>=|>|<|=|\+|\.|-|\*|\/|%|\|/;
	const number = [
		/-?\bbx[01]+\b/,
		/-?\b0x[a-f0-9]+\b/,
		/-?\box[0-7]+\b/,
		/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	];
	const lang = {
		string: {
			pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"/,
			lookbehind: !0,
			greedy: !0,
		},
		comment: { pattern: /#.*/, greedy: !0 },
		key: { pattern: /@\w+\b/, greedy: !0, alias: "atrule" },
		variable: { pattern: /\$.*\$/, inside: { number, operator } },
		function: { pattern: /@\\?/, alias: "function-definition" },
		number,
		punctuation: /[{}[\],]/,
		operator,
		boolean: /\b(?:yes|no)\b/i,
		keyword: [
			// xxx:xxx
			/trigger\:|event_target\:/,
			// deref & ref
			/\b((from)+|(prev)+)\b/,
			// language operator
			/\b(root|this|not|or|and|nand|nor|if|else_if|else|factor)\b/i,
			// common keywords
			/\b(null|namespace|id|limit|is_triggered_only|mean_time_to_happen|name)\b/,
			// special config fields
			/\b(title|desc|option|trigger|before|immediate|after)\b/,
			// events
			/\b(country|planet|fleet|ship|pop|pop_faction)_event\b/,
			/\b(event)\b/,
		],
	};
	Prism.languages.pdx_lang = lang;
	Prism.languages.pdxlang = lang;
	Prism.languages.pdx = lang;
})(Prism);
