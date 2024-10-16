import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { users, data } from "./data";

const app: Application = express();

// Cors
app.use(cors());
//configure env;
dotenv.config();
// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret-key";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "12h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as any;
    next();
  });
}

app.get("/games", authenticateToken, (req: Request, res: Response) => {
  res.json(data);
});

app.listen(PORT, async () => {
  console.log(`🗄️  Server runs on http://localhost:${PORT}`);
});
