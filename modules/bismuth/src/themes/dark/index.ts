import { Theme } from "../themeDef.ts";

export default {
	palette: {
		backgroundColor: "#121223",
		primaryColor: "#004488",

		text: {
			backgroundColor: "none",
			color: "#00ddee",
			contrast: "#004488",

			anchor: {
				backgroundColor: "none",
				color: "00aaff",
				contrast: "#002255"
			}
		},

		states: {
			success: "#318d49",
			error: "cc0000"
		},

		button: {
			backgroundColor: "",
			borderColor: "",

			disabled: {
				backgroundColor: ""
			}
		}
	},

	typography: {
		font: "'Poppins', 'Arial', 'Helvetica', sans-serif",
		fontSize: "2rem"
	}
} satisfies Theme;
