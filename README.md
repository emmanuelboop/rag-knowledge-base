\# RAG Knowledge Base



A full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload their own documents and chat with an AI assistant that answers questions using only the uploaded document as context.



Built with React, Express, PostgreSQL, pgvector, OpenAI Embeddings, and JWT Authentication.



\---



\## Demo



\*\*Frontend:\*\* \*(Add your Vercel URL here)\*



\*\*Backend API:\*\* \*(Add your Railway/Render URL here)\*



\---



\## Features



\- User authentication with JWT

\- Upload DOCX documents

\- Automatic document text extraction

\- Document chunking

\- Embedding generation using OpenAI

\- Vector storage with PostgreSQL + pgvector

\- Semantic similarity search

\- AI responses grounded in uploaded documents

\- Persistent chat history

\- Multiple documents per user

\- Rename documents

\- Delete documents

\- Responsive chat interface



\---



\## How It Works



\### 1. Upload



When a document is uploaded:



\- The server stores the file

\- Extracts the text from the DOCX file

\- Splits the document into smaller chunks

\- Generates an embedding for every chunk using OpenAI's Embedding API

\- Stores each chunk and its embedding inside PostgreSQL using pgvector



```

DOCX

&#x20;  ↓

Extract Text

&#x20;  ↓

Chunk Text

&#x20;  ↓

Generate Embeddings

&#x20;  ↓

Store in PostgreSQL

```



\---



\### 2. Retrieval



When the user asks a question:



\- Generate an embedding for the user's question

\- Compare it against every stored document chunk using pgvector similarity search

\- Retrieve the most relevant chunks

\- Inject those chunks into the prompt as context

\- Send the conversation to the OpenAI Chat API



```

User Question

&#x20;     ↓

Generate Embedding

&#x20;     ↓

Vector Similarity Search

&#x20;     ↓

Retrieve Relevant Chunks

&#x20;     ↓

Send Context + Conversation

&#x20;     ↓

OpenAI Response

```



\---



\## Tech Stack



\### Frontend



\- React

\- TypeScript

\- Vite

\- Tailwind CSS

\- shadcn/ui



\### Backend



\- Node.js

\- Express

\- PostgreSQL

\- pgvector

\- JWT Authentication

\- Multer

\- Mammoth (DOCX text extraction)



\### AI



\- OpenAI GPT

\- OpenAI Embeddings (`text-embedding-3-small`)



\---



\## Database Schema



\### Users



```

id

name

email

password

```



\### Documents



```

id

user\_id

file\_name

file\_path

uploaded\_at

```



\### Document Chunks



```

id

document\_id

chunk\_text

embedding (pgvector)

created\_at

```



\### Conversations



```

id

user\_id

document\_id

role

message

created\_at

```



\---



\## Folder Structure



```

client/

&#x20;   src/

&#x20;       components/

&#x20;       pages/

&#x20;       services/

&#x20;       types/



server/

&#x20;   routes/

&#x20;   services/

&#x20;   uploads/

&#x20;   db/

```



\---



\## Key Engineering Challenges Solved



\- Implemented Retrieval-Augmented Generation (RAG) from scratch

\- Built a semantic search pipeline using pgvector

\- Designed a relational database supporting users, documents, conversations, and vector embeddings

\- Generated embeddings for document chunks using the OpenAI Embedding API

\- Performed cosine similarity search directly in PostgreSQL

\- Maintained secure authentication using JWT

\- Built reusable React components with TypeScript

\- Designed REST APIs for document management and conversations



\---



\## Running Locally



\### Clone



```bash

git clone https://github.com/emmanuelboop/rag-knowledge-base.git

```



\### Frontend



```bash

cd client

npm install

npm run dev

```



\### Backend



```bash

cd server

npm install

npm start

```



\---



\## Environment Variables



Backend:



```

OPENAI\_API\_KEY=

DATABASE\_URL=

JWT\_SECRET=

```



Frontend:



```

VITE\_API\_URL=

```



\---



\## Future Improvements



\- PDF support

\- Streaming AI responses

\- Document citations

\- Drag-and-drop uploads

\- Delete conversations

\- Full-text document search

\- Hybrid keyword + vector retrieval

\- Document summaries

\- Conversation titles

\- Support for multiple LLM providers



\---



\## Skills Demonstrated



\- Retrieval-Augmented Generation (RAG)

\- Vector Databases

\- Embeddings

\- Semantic Search

\- PostgreSQL

\- pgvector

\- REST API Design

\- Authentication

\- React

\- TypeScript

\- Express

\- Node.js

\- Prompt Engineering

\- OpenAI API Integration



\---



\## Author



\*\*Emmanuel Olabisi\*\*



AI / Full-Stack Developer



GitHub: https://github.com/emmanuelboop



LinkedIn: \*(Add your LinkedIn URL)\*

