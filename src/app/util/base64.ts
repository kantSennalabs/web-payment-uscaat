export async function getBase64FromDatabase(base64Prepend: string, arrayBuffer: ArrayBuffer) {
	const buffer = Buffer.from(arrayBuffer);
	return base64Prepend.concat(',', buffer.toString('base64'));
}

export function getBase64FromFile(file: File): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() ?? '');
		reader.onerror = (error) => reject(error);
	});
}