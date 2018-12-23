/**
 * Generates Random String
 * @param   {int}     sectionCount
 * @return  {string}
 */
export default function generateUUID(sectionCount?: number): string {
	var d = new Date().getTime();
	var textData = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

	if (sectionCount === 1) {
		textData = 'xxxxxxxx';
	}

	if (sectionCount === 2) {
		textData = 'xxxxxxxx-xxxx';
	}

	if (sectionCount === 3) {
		textData = 'xxxxxxxx-xxxx-4xxx';
	}

	if (sectionCount === 4) {
		textData = 'xxxxxxxx-xxxx-4xxx-yxxx';
	}

	var uuid = textData.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);

		return (
		c === 'x' ?
		r :
		(r & 0x7 | 0x8)).toString(16);
	});
	return uuid;
};