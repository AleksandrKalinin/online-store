export function logResponseTime(req, res, next) {
	const startTime = process.hrtime();
	res.on('finish', () => {
		const endTime = process.hrtime(startTime);
		const timeInMiliseconds = endTime[0] * 1000 + endTime[1] / 1000000
		console.log(`Response logger: request to ${req.path} endpoint elapsed in ${timeInMiliseconds} miliseconds`);
	});
	next();
}
