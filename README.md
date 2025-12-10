# AI Blog Generator 

A professional web application that transforms simple text prompts into well-structured, 1000-word blog posts using AI.

##  Live Demo

**Deployed Link:** [https://blog-generator-hpa0sbps5-adityas-projects-24603081.vercel.app/]

##  Overview

This project is a fullstack blog generation platform where users enter a topic or prompt, and the AI generates a comprehensive, properly formatted blog post in seconds. Built as part of the FlocCare Fullstack Developer assignment.

##  Features

- **AI-Powered Writing** - Generates professional 1000+ word blogs instantly
- **Structured Output** - Properly formatted with headings, sections, and bullet points
- **Dual View Modes** - Preview rendered markdown or view raw markdown
- **Blog Metrics** - Shows word count, character count, reading time, and generation time
- **Copy & Download** - Easy export options for generated content
- **Example Prompts** - Quick-start templates for users
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Feedback** - Loading states and toast notifications

##  Tech Stack

### Frontend
- **React** - UI library for component-based architecture
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built, accessible UI components
- **React Markdown** - Renders markdown to HTML

### Backend
- **Vercel Serverless Functions** - API endpoint hosting
- **Groq API** - LLM inference provider
- **Llama 3.3 70B** - Language model for blog generation

##  AI Model Choice

**Model:** Llama 3.3 70B Versatile (via Groq API)

**Why This Model?**
-  **Free API Access** - Generous free tier with no credit card required
-  **Fast Inference** - Groq's LPU delivers 5-10 second generation times
-  **High Quality** - 70B parameters ensure professional writing quality
-  **Structured Output** - Excellent at following formatting instructions
-  **No Setup Required** - Cloud-based, no local model deployment needed

##  Architecture

```
User Input → React Frontend → Vercel API → Groq API (Llama 3.3) → Formatted Blog → Display
```

1. User enters a prompt in the React interface
2. Frontend sends request to Vercel serverless function
3. Backend calls Groq API with structured prompt template
4. Llama 3.3 70B generates formatted markdown blog
5. Response is processed and displayed with metrics
6. User can preview, copy, or download the blog


##  Project Structure

```
blog-generator/
├── api/
│   └── generate-blog.js       # Serverless API endpoint
├── src/
│   ├── components/
│   │   ├── blog-generator/    # Main blog components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API service layer
│   ├── utils/                 # Helper functions
│   └── App.jsx               # Main app component
├── .env                       # Environment variables
└── vercel.json               # Vercel deployment config
```

##  Key Implementation Details

### Prompt Engineering
The system uses a carefully crafted prompt template that instructs the LLM to:
- Generate exactly 1000 words
- Follow a specific markdown structure
- Use proper heading hierarchy
- Format lists correctly with bullet points
- Include introduction, key sections, benefits, challenges, and conclusion

### Error Handling
- Input validation (minimum 10 characters)
- API timeout handling (30 seconds)
- User-friendly error messages
- Loading states for better UX

### Performance Optimizations
- React.memo for component optimization
- useCallback hooks to prevent unnecessary re-renders
- Local storage for prompt persistence
- Debounced API calls

##  Responsive Design

The application is fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

##  Security

- API key stored in environment variables
- Server-side API calls (key never exposed to client)
- Input sanitization and validation
- CORS and rate limiting on Vercel


##  Assignment Submission

This project was created as part of the Fullstack Development position assignment for **FlocCare, Mangalore**.

**Assignment Requirements:**
-  Text prompt to blog platform
-  1000-word blog generation
-  Free LLM API integration
-  Proper blog formatting
-  Functional UX
-  Deployed and accessible

**Note:** This is a demonstration project created for the FlocCare technical assignment. I am excited about the opportunity to work with FlocCare in Mangalore and contribute to building innovative healthcare solutions.
