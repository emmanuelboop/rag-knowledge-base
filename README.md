# RAG Knowledge Base

A production-ready full-stack **Retrieval-Augmented Generation (RAG)** application that enables users to upload documents, ask natural language questions, and receive AI-generated answers grounded in the contents of their documents using semantic search.

Built with **React, TypeScript, Express.js, PostgreSQL (pgvector), and OpenAI APIs**.

---

## Live Demo

🌐 Frontend: https://rag-knowledge-base-43xu.vercel.app/

⚙️ Backend API: https://rag-knowledge-base-production-1844.up.railway.app

---

## Preview

> Add screenshots or a short GIF demonstrating:
>
> - User registration/login
> - Uploading a document
> - Chatting with the uploaded document
> - Renaming/deleting documents

---

# Features

### Authentication

- Secure JWT authentication
- User registration and login
- Protected API routes

### Document Management

- Upload PDF and DOCX files
- Extract document text automatically
- Rename uploaded documents
- Delete uploaded documents
- Persistent document library

### AI & Retrieval

- Automatic document chunking
- OpenAI Embeddings API integration
- Vector storage using PostgreSQL + pgvector
- Semantic similarity search
- Retrieval-Augmented Generation (RAG)
- Context-aware responses using OpenAI Chat Completions

### Conversations

- Persistent chat history
- Conversations scoped to individual documents
- Modern ChatGPT-inspired interface

---

# Architecture

```
                Upload Document
                       │
                       ▼
             Extract Document Text
                       │
                       ▼
               Split Into Chunks
                       │
                       ▼
        Generate OpenAI Embeddings
                       │
                       ▼
      Store Chunks + Vectors (pgvector)
                       │
──────────────────────────────────────────────
                       │
                 User asks question
                       │
                       ▼
      Generate Question Embedding
                       │
                       ▼
      PostgreSQL Vector Similarity Search
                       │
                       ▼
       Retrieve Most Relevant Chunks
                       │
                       ▼
    Send Context + Question to OpenAI
                       │
                       ▼
             AI Generates Response
```

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Backend

- Node.js
- Express.js
- PostgreSQL
- pgvector
- JWT Authentication
- Multer
- Mammoth
- PDF-Parse
- OpenAI API

## AI

- OpenAI Embeddings API
- OpenAI Chat Completions API
- Semantic Vector Search
- Retrieval-Augmented Generation (RAG)

---

# Project Structure

```text
rag-knowledge-base/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── assets/
│   │
│   └── package.json
│
├── server/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── package.json
│   └── index.js
│
└── README.md
```

---

# Database Design

The application uses a relational PostgreSQL database consisting of four primary tables.

### users

Stores user authentication information.

### documents

Stores uploaded document metadata.

### document_chunks

Stores each extracted document chunk together with its vector embedding.

### conversations

Stores conversation history associated with individual documents.

---

# Engineering Challenges Solved

This project demonstrates several real-world AI engineering concepts:

- Built a complete Retrieval-Augmented Generation (RAG) pipeline from scratch
- Implemented semantic search using PostgreSQL and pgvector
- Designed an efficient document chunking strategy
- Generated vector embeddings using the OpenAI Embeddings API
- Performed cosine similarity search directly in PostgreSQL
- Designed a normalized relational database schema
- Implemented secure JWT authentication
- Built document upload, rename, and delete functionality
- Maintained persistent chat history for each document
- Integrated a React frontend with a RESTful Express backend
- Deployed a production-ready full-stack application using Railway and Vercel
- Configured CORS, environment variables, and production deployment

---

# Installation

Clone the repository.

```bash
git clone https://github.com/emmanuelboop/rag-knowledge-base.git
```

Install frontend dependencies.

```bash
cd client
npm install
```

Install backend dependencies.

```bash
cd ../server
npm install
```

---

# Environment Variables

## Server

Create a `.env` file inside the `server` directory.

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=http://localhost:5173
```

## Client

Create a `.env` file inside the `client` directory.

```env
VITE_API_URL=http://localhost:5000
```

---

# Running the Project

Start the backend.

```bash
cd server
npm start
```

Start the frontend.

```bash
cd client
npm run dev
```

---

# Future Improvements

- AI response streaming
- Multi-document retrieval
- Document previews
- Drag-and-drop uploads
- Folder organization
- Shareable knowledge bases
- Source citations
- Hybrid keyword + semantic search
- Response caching
- OCR support for scanned PDFs

---

# Lessons Learned

Developing this project provided hands-on experience with:

- Retrieval-Augmented Generation (RAG)
- Vector databases
- Semantic search
- OpenAI APIs
- PostgreSQL pgvector
- Full-stack authentication
- File processing pipelines
- Production deployment with Railway and Vercel
- Environment variable management
- Cross-Origin Resource Sharing (CORS)
- GitHub secret scanning and deployment best practices

---

# Screenshots

## Login

*(Add screenshot)*

---

## Document Library

*(Add screenshot)*

---

## Chat Interface

*(Add screenshot)*

---

## Retrieval Pipeline

*(Add architecture diagram)*

---

# Author

**Emmanuel Olabisi**

AI & Full-Stack Developer

GitHub: https://github.com/emmanuelboop

LinkedIn: https://www.linkedin.com/in/emmanuel-olabisi-4901b2236/

---

# License

This project is licensed under the MIT License.