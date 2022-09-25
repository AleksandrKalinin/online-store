export function logger(req, res, next) {
	console.log(`Custom logger: request type ${req.method} was called on ${req.path} path with query parameters ${JSON.stringify(req.query)}`);
	next();	
}
