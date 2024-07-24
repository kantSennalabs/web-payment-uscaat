export function getBase64FromDatabase(arrayBuffer: ArrayBuffer) {
	const buffer = Buffer.from(arrayBuffer);
	return 'data:image/png;base64,' + buffer.toString('base64');
	// return buffer.toString('base64');
}