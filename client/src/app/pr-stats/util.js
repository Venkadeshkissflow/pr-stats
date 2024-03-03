function padTo2Digits(num) {
	return num.toString().padStart(2, "0");
}

export function convertMsToTime(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	return `${padTo2Digits(hours)}h :${padTo2Digits(minutes)}m`;
}

export function getFormattedDate(originalData) {
	const date = new Date(originalData);

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	return `${day}/${month}/${year}`;
}
