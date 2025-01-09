import express from "express";
import env from "dotenv";
import pg from "pg";

const app = express();
const port = 4000;

env.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/api", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs");
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs WHERE id = $1", [req.params.id]);
    const data = result.rows;
    if (data.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(data[0]); // Return the single post
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/add", async (req, res) => {
  try {
    await db.query(
      "INSERT INTO blogs (title, content, date, author) VALUES ($1, $2, $3, $4)",
      [req.body.title, req.body.content, new Date().toISOString(), req.body.author]
    );
    res.json({ message: "Posted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/api/edit/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs WHERE id = $1", [req.params.id]);
    const data = result.rows;
    
    if (data.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post with new values or keep existing ones
    await db.query(
      `UPDATE blogs SET 
        title = COALESCE($1, title), 
        content = COALESCE($2, content), 
        date = $3, 
        author = COALESCE($4, author) 
      WHERE id = $5`,
      [
        req.body.title,
        req.body.content,
        new Date().toISOString(),
        req.body.author,
        req.params.id
      ]
    );
    
    res.json({ message: "Patched" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM blogs WHERE id = $1", [req.params.id]);
    
    // if (result.rowCount === 0) {
    //   return res.status(404).json({ message: "Post not found" });
    // }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
