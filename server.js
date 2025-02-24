import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.post("/api/cmd", async (req, res) => {
  try {
    const response = await fetch("http://www.asset23d.ir/api/cmd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({error:"Server Error"})
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
