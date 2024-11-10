import express from "express";
import { Server } from "socket.io";
import chalk from "chalk";
import path from "path";

const app = express();
const __dirname = path.resolve();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on` + chalk.red.bold(` http://localhost:${PORT}`)
  );
});

// Route to render the chat page
app.get("/chat", (req, res) => {
  res.render("chat"); // Ensure there's a "chat.ejs" in the "views" folder
});

// Enable server to support socket connection
const io = new Server(server);

io.on("connection", (socket) => {
  console.warn(chalk.blue("New client connected", socket.id));
});
