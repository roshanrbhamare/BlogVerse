# BlogVerse

**BlogVerse** is a full-stack web application for creating, managing, and displaying blog posts. It uses a PostgreSQL database for storage, an Express.js server for the backend API, and a lightweight frontend served via Express. The project demonstrates CRUD (Create, Read, Update, Delete) operations, form handling, and integration with a relational database.

---

## Features

- **View Blogs**: Retrieve and display a list of all blogs.
- **Add Blogs**: Create new blog posts with title, content, and author.
- **Edit Blogs**: Update existing blog posts.
- **Delete Blogs**: Remove blog posts permanently.
- **Error Handling**: Provides informative feedback for invalid operations.

---

## Technologies Used

### Backend:
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg** (PostgreSQL client for Node.js)

### Frontend:
- **EJS** (Embedded JavaScript templates for rendering HTML)

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **PostgreSQL**
- **npm** (Node Package Manager)

---

## Installation and Setup

### Step 1: Clone the Repository
```bash
$ git clone https://github.com/your-username/BlogVerse.git
$ cd BlogVerse
```

### Step 2: Install Dependencies
```bash
$ npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=blogverse
```

### Step 4: Set Up the Database
1. Log in to PostgreSQL and create a database:
   ```sql
   CREATE DATABASE blogverse;
   ```
2. Create the `blogs` table:
   ```sql
   CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE,
    content TEXT,
    date TIMESTAMPTZ,
    author TEXT
);

   ```

### Step 5: Run the Application
1. Start the backend API server:
   ```bash
   $ node index.js
   ```
2. Start the frontend server:
   ```bash
   $ node server.js
   ```

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Usage

### Add a New Blog Post
1. Click on the "Add New Blog" button.
2. Fill in the title, content, and author fields.
3. Click "Commit" to save the post.

### Edit an Existing Blog Post
1. Navigate to the blog you want to edit.
2. Click the "Edit" button.
3. Update the fields and click "Commit Change."

### Delete a Blog Post
1. Navigate to the blog you want to delete.
2. Click the "Delete" button to permanently remove the post.

---

## API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Routes

#### GET `/api`
- Retrieves a list of all blog posts.

#### GET `/api/:id`
- Retrieves a single blog post by ID.

#### POST `/api/add`
- Adds a new blog post.
  - **Body Parameters:**
    ```json
    {
      "title": "Your Blog Title",
      "content": "Your Blog Content",
      "author": "Your Name"
    }
    ```

#### PATCH `/api/edit/:id`
- Updates an existing blog post by ID.
  - **Body Parameters:**
    ```json
    {
      "title": "Updated Title",
      "content": "Updated Content",
      "author": "Updated Author"
    }
    ```

#### DELETE `/api/delete/:id`
- Deletes a blog post by ID.

---

## Known Issues
- Ensure the PostgreSQL sequence is in sync with the `id` column to avoid duplicate key errors.

---

## Contributing
Feel free to submit issues or pull requests to improve the project. Contributions are always welcome!

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

