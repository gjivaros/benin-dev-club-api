export function boolVal(val: unknown): boolean {
	if (typeof val === "boolean") return val;
	if (val === 0 || val === "0" || val === "f" || val === "false") return false;
	if (val === 1 || val === "1" || val === "t" || val === "true") return true;
	if (val === undefined || val === null) throw new Error("Missing boolean value");
	return !!val;
}

export function boolValOrUndef(val: unknown): boolean | undefined {
	return val === undefined || val === null ? undefined : boolVal(val);
}

export function strVal(val: unknown): string {
	if (val === undefined || val === null || val === "") throw new Error("Missing string value");
	if (typeof val === "string") return val;
	return (val as object).toString();
}

export function strValOrUndef(val: unknown): string | undefined {
	return val === undefined || val === null || val === "" ? undefined : strVal(val);
}

export function numberVal(val: unknown): number {
	if (typeof val === "number") return val;
	if (val === undefined || val === null) throw new Error("Missing number value");
	if (typeof val === "string") return parseInt(val, 10);
	throw new Error(`Cannot convert the value to integer (${typeof val})`);
}

export function numberValOrUndef(val: unknown): number | undefined {
	return val === undefined || val === null ? undefined : numberVal(val);
}

export function bufferVal(val: unknown): Buffer {
	if (val === undefined || val === null || !(val instanceof Buffer))
		throw new Error("Missing buffer value");
	return val;
}

export function bufferValOrUndef(val: unknown): Buffer | undefined {
	return val === undefined || val === null ? undefined : bufferVal(val);
}

export function dateTimeValAsIsoString(val: unknown): string {
	return `${toDate(val).toISOString().substring(0, 19)}Z`; // without milliseconds
}

export function dateTimeValAsIsoStringOrUndef(val: unknown): string | undefined {
	return val === undefined || val === null ? undefined : dateTimeValAsIsoString(val);
}

export function dateValAsIsoString(val: unknown): string {
	return toDate(val).toISOString().substring(0, 10);
}

export function dateValAsIsoStringOrUndef(val: unknown): string | undefined {
	return val === undefined || val === null ? undefined : dateValAsIsoString(val);
}

export function toDate(val: unknown): Date {
	if (val instanceof Date) return val;
	if (val === undefined || val === null) throw new Error("Missing value for date");
	if (typeof val === "string" || typeof val === "number") return new Date(val);
	throw new Error(`Cannot convert the value to date (${typeof val})`);
}

export function prettyPrintedDate(val?: unknown) {
	return val ? toDate(val).toString() : "";
}

export function nbVal(val: unknown): number {
	if (typeof val === "number") return val;
	if (val === undefined || val === null) throw new Error("Missing number value");
	if (typeof val === "string" && isNumeric(val)) return Number(val);
	throw new Error(`Cannot convert the value to number '${typeof val}'`);
}

export function nbValOrUndef(val: unknown): number | undefined {
	return val === undefined || val === null || val === "" ? undefined : nbVal(val);
}

export function dateVal(val: unknown): Date {
	if (val instanceof Date) return val;
	if (val === undefined || val === null || val === "") throw new Error("Missing number value");
	if (typeof val === "string") return new Date(val);
	if (typeof val === "number") return new Date(val);
	throw new Error(`Cannot convert the value to date '${typeof val}'`);
}

export function dateValOrUndef(val: unknown): Date | undefined {
	return val === undefined || val === null || val === "" ? undefined : dateVal(val);
}

export function listVal<T>(val: unknown, valueFormater: (val: unknown) => T): T[] {
	if (!Array.isArray(val)) throw new Error(`Invalid array '${typeof val}'`);
	return val.map(valueFormater);
}

export function listValOrUndef<T>(
	val: unknown,
	valueFormater: (val: unknown) => T,
): T[] | undefined {
	return val === undefined || val === null ? undefined : listVal(val, valueFormater);
}

/**
 * @see https://stackoverflow.com/a/175787/3786294
 */
export function isNumeric(str: string): boolean {
	return (
		// use type coercion to parse the _entirety_ of the string (`parseFloat` alone does
		// not do this)...
		!(isNaN(str as any as number) || isNaN(parseFloat(str)))
	); // ... and ensure strings of whitespace fail
}
