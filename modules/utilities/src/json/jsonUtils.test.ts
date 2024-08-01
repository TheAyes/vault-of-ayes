// Importing necessary modules and functions
import { describe, expect, test } from "vitest";
import { voaParseJson, voaStringify } from "./jsonUtils";

// The voaStringify function convert any JavaScript value to a JSON string
describe("`voaStringify` function tests", () => {
	// Test Case: When passing an object as argument
	test("When an object is passed in, then it should return a corresponding JSON string", () => {
		let result = voaStringify({ name: "John", age: 30 });
		expect(result).to.equal('{\n    "name": "John",\n    "age": 30\n}');
	});

	// Test Case: When passing an array as argument
	test("When an array is passed in, then it should return a corresponding JSON string", () => {
		let result = voaStringify(["John", 30]);
		expect(result).to.equal('[\n    "John",\n    30\n]');
	});

	// Test Case: When passing a boolean as argument
	test("When a boolean is passed in, then it should return a corresponding JSON string", () => {
		let result = voaStringify(true);
		expect(result).to.equal("true");
	});
});

describe("`voaParseJson` function tests", () => {
	// Test case: Given a valid JSON string representing an empty object
	test("Given a JSON string representing an empty object, when parsed, then it should return an empty JS object", () => {
		let result = voaParseJson("{}");
		expect(result).toStrictEqual({});
	});

	// Test case: Given a valid JSON string representing an empty array
	test("Given a JSON string representing an empty array, when parsed, then it should return an empty JS array", () => {
		let result = voaParseJson("[]");
		expect(result).toStrictEqual([]);
	});

	// Test case: Given a valid JSON string representing a string with escape characters
	test("Given a JSON string representing a string with escape characters, when parsed, then it should return the corresponding JS string with escape characters resolved", () => {
		let result = voaParseJson('{"message":"Hello,\\nWorld!"}');
		expect(result).toStrictEqual({ message: "Hello,\nWorld!" });
	});

	// Test case: Given a valid JSON string representing a string with unicode characters
	test("Given a JSON string representing a string with unicode characters, when parsed, then it should return the corresponding JS string with unicode characters resolved", () => {
		let result = voaParseJson('{"emoji":"🙂"}');
		expect(result).toStrictEqual({ emoji: "🙂" });
	});

	// Test case: Given a valid JSON string representing a deeply nested object
	test("Given a JSON string representing a deeply nested object, when parsed, then it should return the corresponding deeply nested JS object", () => {
		let result = voaParseJson('{"a":{"b":{"c":{"d":{"e":{"f":"g"}}}}}}');
		expect(result).toStrictEqual({
			a: { b: { c: { d: { e: { f: "g" } } } } }
		});
	});

	// Test case: Given a valid JSON string representing a large array
	test("Given a JSON string representing a large array, when parsed, then it should return the corresponding large JS array", () => {
		let jsonStr =
			"[" + Array.from({ length: 10000 }, (_, i) => i).join(",") + "]";
		let result = voaParseJson(jsonStr);
		expect(result.length).toBe(10000);
		expect(result[9999]).toBe(9999);
	});
});
