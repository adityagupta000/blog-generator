// api/generate-blog.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel DOES NOT auto-parse JSON, so manually parse:
    const body = req.body || JSON.parse(req.rawBody || "{}");
    const { prompt } = body;

    // Validate prompt
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call GROQ API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `
You are a professional blog writer. Write a polished, structured, 1000-word blog in **clean Markdown** that renders perfectly in ReactMarkdown.

Your response MUST follow this exact structure with correct spacing:

# **Title of the Blog**

A clear, engaging introduction of 3–5 sentences explaining the topic and its importance.

---

## **1. Introduction**

Write 1–2 detailed paragraphs covering background, significance, and relevance.

---

## **2. Key Applications**

### **a. Subheading Title**
Short explanation paragraph.

### **b. Subheading Title**
Short explanation paragraph.

### **c. Subheading Title**
Short explanation paragraph.

(Add more subsections only if needed.)

---

## **3. Benefits**

Write this as a **proper Markdown bullet list**.
You MUST follow the format below EXACTLY:

Example (DO NOT include these exact words):
- This is an example of a correct bullet format.
- Every bullet MUST start with a hyphen "-".
- Never merge bullets into one paragraph.

Now write the actual benefits below, following that format:

- Benefit 1 explanation sentence.
- Benefit 2 explanation sentence.
- Benefit 3 explanation sentence.
- Benefit 4 explanation sentence.

---

## **4. Challenges**

Write this section as a **proper Markdown bullet list**.
Follow the same formatting rules:

Example (DO NOT include these exact words):
- This is an example challenge bullet.
- Each bullet MUST start with a hyphen "-".
- Never place multiple bullets in a single line.
- Never write bullets as paragraphs.

Now write the actual challenges below:

- Challenge 1 explanation sentence.
- Challenge 2 explanation sentence.
- Challenge 3 explanation sentence.
- Challenge 4 explanation sentence.

---

## **5. Future Scope**

Write 1–2 paragraphs describing future possibilities, innovations, and long-term impact.

---

## **6. Conclusion**

Write a final paragraph summarizing the topic clearly and professionally.

---

STRICT RULES:
- ALWAYS add blank lines between headings, paragraphs, and bullets.
- NEVER use "•" bullets. ONLY use "-" for lists.
- NEVER merge multiple bullet points into one paragraph.
- NEVER use HTML.
- Output ONLY the blog. No additional explanation.
- Title, headings, and subheadings MUST match this Markdown structure.

Write the complete blog on the topic: ${prompt}
`,
            },
          ],
          temperature: 0.7,
          max_completion_tokens: 2000,
        }),
      }
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return res.status(500).json({
        error: data.error?.message || "Groq API failed",
      });
    }

    const blogText = data.choices?.[0]?.message?.content || "";

    if (!blogText.trim()) {
      return res.status(500).json({ error: "Empty blog response from model" });
    }

    return res.status(200).json({ blog: blogText });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
