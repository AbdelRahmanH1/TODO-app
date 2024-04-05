import app from "./src/index.js";
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
