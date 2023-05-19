import * as jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/interfaces";

export default (req, res, next) => {
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
	
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

			req.userId = decoded.id;
			next();
		} catch (e) {
			return res.status(403).json({
				message: "Please authenticate",
			});
		}
	} else {
		return res.status(403).json({
			message: "Please authenticate",
		});
	}
};
