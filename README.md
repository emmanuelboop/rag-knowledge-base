# RAG Knowledge Base

A full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload documents, chat with them using AI, and receive context-aware responses powered by semantic search and OpenAI.

---

## Live Demo

Frontend: *Coming Soon*

Backend API: *Coming Soon*

---

## Features

- User authentication using JWT
- Upload PDF and DOCX documents
- Automatic document text extraction
- Intelligent document chunking
- Generate embeddings using the OpenAI Embeddings API
- Store vector embeddings in PostgreSQL using pgvector
- Perform semantic similarity search
- Context-aware AI responses using OpenAI Chat API
- Persistent chat history for every uploaded document
- Rename uploaded documents
- Delete uploaded documents
- Modern React + Tailwind CSS interface

---

## How It Works

1. User uploads a PDF or DOCX document.
2. The backend extracts all text from the document.
3. The text is split into smaller chunks.
4. Each chunk is converted into an embedding using OpenAI.
5. The chunk text and embeddings are stored in PostgreSQL.
6. When the user asks a question:
   - The question is converted into an embedding.
   - PostgreSQL performs a vector similarity search using pgvector.
   - The most relevant document chunks are retrieved.
   - Those chunks are sent to OpenAI as context.
7. The AI generates an answer using only the retrieved context.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend

- Node.js
- Express.js
- PostgreSQL
- pgvector
- JWT Authentication
- Multer
- Mammoth
- PDF-Parse
- OpenAI API

---

## Folder Structure

```text
rag-knowledge-base/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
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

## Database Design

### users

Stores user accounts.

### documents

Stores uploaded document metadata.

### document_chunks

Stores every document chunk together with its vector embedding.

### conversations

Stores conversation history for each document.

---

## Retrieval Pipeline

```text
Upload Document
       │
       ▼
Extract Text
       │
       ▼
Split Into Chunks
       │
       ▼
Generate Embeddings
       │
       ▼
Store in PostgreSQL (pgvector)
       │
       ▼

User Question
       │
       ▼
Generate Question Embedding
       │
       ▼
Similarity Search
       │
       ▼
Retrieve Top Chunks
       │
       ▼
Send Context + Question to OpenAI
       │
       ▼
AI Response
```

---

## Key Engineering Challenges Solved

- Built a Retrieval-Augmented Generation (RAG) system from scratch
- Designed a semantic search pipeline using pgvector
- Implemented document chunking for improved retrieval quality
- Generated vector embeddings using the OpenAI Embeddings API
- Performed cosine similarity search directly inside PostgreSQL
- Built secure JWT authentication
- Implemented document management (upload, rename, delete)
- Created persistent conversation history per document
- Designed a normalized relational database schema
- Integrated frontend and backend using REST APIs

---

## Installation

### Clone the repository

```bash
git clone https://github.com/emmanuelboop/rag-knowledge-base.git
```

### Install frontend

```bash
cd client
npm install
```

### Install backend

```bash
cd ../server
npm install
```

---

## Environment Variables

### Server

Create a `.env` file inside the `server` directory.

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Client

Create a `.env` file inside the `client` directory.

```env
VITE_API_URL=http://localhost:5000
```

---

## Running the Project

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run dev
```

---

## Future Improvements

- Stream AI responses
- Support additional document formats
- Multi-document retrieval
- Document previews
- Drag-and-drop uploads
- Folder organization
- Shareable knowledge bases
- Citations showing which document chunk answered the question
- Hybrid keyword + semantic search
- Response caching

---

## Screenshots

### Login

_Add screenshot_

### Upload Documents

_Add screenshot_

### Chat Interface

_Add screenshot_

### Semantic Search Workflow

_Add architecture diagram_

---

## Author

**Emmanuel Olabisi**

AI & Full-Stack Developer

GitHub: https://github.com/emmanuelboop

LinkedIn: *(Add your LinkedIn URL)*

---

## License

This project is licensed under the MIT License.