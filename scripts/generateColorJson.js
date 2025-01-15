const fs = require("fs");

function toCamelCase(str) {
	return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function cssToJson(css) {
	const result = { light: {}, dark: {} };

	const lightMatch = css.match(/:root\s*{([^}]+)}/);
	if (lightMatch) {
		lightMatch[1].split(";").forEach((line) => {
			const match = line.match(/--([^:]+):\s*([^;]+)/);
			if (match) {
				const key = toCamelCase(match[1].trim());
				result.light[key] = `hsl(${match[2].trim()})`;
			}
		});
	}

	// Extract dark theme
	const darkMatch = css.match(/\.dark:root\s*{([^}]+)}/);
	if (darkMatch) {
		darkMatch[1].split(";").forEach((line) => {
			const match = line.match(/--([^:]+):\s*([^;]+)/);
			if (match) {
				const key = toCamelCase(match[1].trim());
				result.dark[key] = `hsl(${match[2].trim()})`;
			}
		});
	}

	return result;
}

const css = fs.readFileSync("global.css", "utf8");

const json = cssToJson(css);

fs.writeFileSync("@/lib/colors.json", JSON.stringify(json, null, 2));
