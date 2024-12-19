import { createApp } from './createApp';
import { connectDatabase } from '@config';

const app = createApp();
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Running on Port ${process.env.PORT}`);
});
