((Prism) => {
	const string = {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"/,
		lookbehind: true,
		greedy: true,
	};

	const lang = {
		record: {
			pattern: /(^|[^\\])"(\\.|[^\\"\r\n])*"\s+"(\\.|[^\\"\r\n])*"/,
			inside: {
				property: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s+"(\\.|[^\\"\r\n])*")/,
				string,
			},
		},
		comment: { pattern: /\/\/.*/, greedy: true },
		// function: {
		//     pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"\s*$/,
		//     greedy: true,
		// }
		function: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s+{)/,
		// string,
	};

	Prism.languages.vdf = lang;
})(Prism);
