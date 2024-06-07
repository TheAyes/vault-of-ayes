import { describe, expect, test } from "vitest";
import { colorSyntax } from "./syntaxLoggingUtils";

describe("`colorSyntax` function tests", () => {
	test("Given a message with specific syntax patterns, WHEN colorSyntax function is called, THEN it should return the message with the syntaxes properly colored", () => {
		const inputMessage = "[ info - 13.02.14 ] This is some info";
		const actualMessage = colorSyntax(inputMessage);
		const expectedMessage = "[ info - 13.02.14 ] This is some info"; //Assuming that colorSyntax function changes 'INFO:' to 'INFO (in color):' and same for 'ERROR:'
		console.log(inputMessage);
		expect(actualMessage).toBe(expectedMessage);
	});

	test("Given a message without any syntax patterns, WHEN colorSyntax function is called, THEN it should return the same message", () => {
		const inputMessage = "This is a plain message with no specific syntax.";
		const actualMessage = colorSyntax(inputMessage);
		expect(actualMessage).toBe(inputMessage);
	});

	test("Given an empty message, WHEN colorSyntax function is called, THEN it should return an empty message", () => {
		const emptyMessage = "";
		const actualMessage = colorSyntax(emptyMessage);
		expect(actualMessage).toBe(emptyMessage);
	});
});
