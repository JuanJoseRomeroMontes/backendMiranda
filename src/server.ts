import mongoose from 'mongoose';
import { app } from './app'

const port = process.env.PORT ?? 3000;

const start = async () => {
	try {
		await mongoose.connect(`${process.env.MONGO_URI}/mongoose?authSource=Miranda`);
		app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();