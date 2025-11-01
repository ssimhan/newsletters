---
title: "Evals, error analysis, and better prompts: A systematic approach to improving your AI products | Hamel Husain (ML …"
from: "\"Lenny's Newsletter\" <lenny+how-i-ai@substack.com>"
received_at: "2025-10-13T04:03:43-07:00"
source: "email"
tags: ["newsletter"]
---
View this post on the web at https://www.lennysnewsletter.com/p/evals-error-analysis-and-better-prompts

Why is this in your inbox? Because How I AI [ https://substack.com/redirect/739d4ea3-7f70-457b-a78a-6ee38be57b98?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ], hosted by Claire Vo, is part of the Lenny’s Podcast Network. Every Monday, we share a 30- to 45-minute episode with a new guest demoing a practical, impactful way they’ve learned to use AI in their work or life. No pontificating—just specific and actionable advice. Prefer to skip future episode drops? Unsubscribe from How I AI podcast notifications here [ https://substack.com/redirect/5f1523ec-1248-49c8-8386-4327bccfe238?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ].
Watch or listen now:
YouTube [ https://substack.com/redirect/918603bb-4934-4108-a37b-1f423a1d7eb5?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]  //  Spotify [ https://substack.com/redirect/0b88b752-595b-4522-a2f9-2fd8bf0457e8?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]  //  Apple [ https://substack.com/redirect/c66088c2-1653-4476-a062-1ca954675936?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Brought to you by:
GoFundMe Giving Funds [ https://substack.com/redirect/d44fccc3-76b6-4396-b03e-94d08dff6cb0?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]—One account. Zero hassle.
Persona [ https://substack.com/redirect/4398ee1e-2c72-4598-9f93-1ecc32bb5a1c?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]—Trusted identity verification for any use case
Hamel Husain, an AI consultant and educator, shares his systematic approach to improving AI product quality through error analysis, evaluation frameworks, and prompt engineering. In this episode, he demonstrates how product teams can move beyond “vibe checking” their AI systems to implement data-driven quality improvement processes that identify and fix the most common errors. Using real examples from client work with Nurture Boss (an AI assistant for property managers), Hamel walks through practical techniques that product managers can implement immediately to dramatically improve their AI products.
What you’ll learn:
A step-by-step error analysis framework that helps identify and categorize the most common AI failures in your product
How to create custom annotation systems that make reviewing AI conversations faster and more insightful
Why binary evaluations (pass/fail) are more useful than arbitrary quality scores for measuring AI performance
Techniques for validating your LLM judges to ensure they align with human quality expectations
A practical approach to prioritizing fixes based on frequency counting rather than intuition
Why looking at real user conversations (not just ideal test cases) is critical for understanding AI product failures
How to build a comprehensive quality system that spans from manual review to automated evaluation
Where to find Hamel Husain:
Website: https://hamel.dev/ [ https://substack.com/redirect/2a9a8968-470a-49d8-8019-ae8dd505cad7?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Twitter: https://twitter.com/HamelHusain [ https://substack.com/redirect/ec2c8216-31ef-4096-b48f-ce8c78e3820f?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Course: https://maven.com/parlance-labs/evals [ https://substack.com/redirect/625490e0-982e-4ddf-bdb2-2d01d88f0e79?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
GitHub: https://github.com/hamelsmu [ https://substack.com/redirect/01dd481a-3cb5-4bbf-8323-06ad461fcace?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Where to find Claire Vo:
ChatPRD: https://www.chatprd.ai/ [ https://substack.com/redirect/b7e96511-f08c-40ac-a49b-e6747d723874?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Website: https://clairevo.com/ [ https://substack.com/redirect/6b06e321-8ce0-4dd8-ac1c-ae8149e46adf?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
LinkedIn: https://www.linkedin.com/in/clairevo/ [ https://substack.com/redirect/3aefc45e-56d9-4711-a687-c7ce8c43671b?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
X: https://x.com/clairevo [ https://substack.com/redirect/3a4d1b4d-5efa-4a0e-8447-800c146730d1?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
In this episode, we cover:
(00:00 [ https://substack.com/redirect/3817447c-b50b-45fc-a8f0-3729d7013008?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Introduction to Hamel Husain
(03:05 [ https://substack.com/redirect/798fb5d3-b90e-4ebf-9a95-9478c001f1e4?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) The fundamentals: why data analysis is critical for AI products
(06:58 [ https://substack.com/redirect/230ec40f-ea2c-469e-a20a-f2bec1c8c058?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Understanding traces and examining real user interactions
(13:35 [ https://substack.com/redirect/10d8d5f7-5361-4951-886a-4414d924d473?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Error analysis: a systematic approach to finding AI failures
(17:40 [ https://substack.com/redirect/f8319553-8609-44ad-b404-7f25a9303f59?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Creating custom annotation systems for faster review
(22:23 [ https://substack.com/redirect/542d4eab-f469-4d38-b2a9-e2b960d2b4ec?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) The impact of this process
(25:15 [ https://substack.com/redirect/733a7bf3-2ff0-443c-8136-757493ca6a0a?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Different types of evaluations
(29:30 [ https://substack.com/redirect/14171c81-daac-49b8-a068-16f03b6cc9f8?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) LLM-as-a-Judge
(33:58 [ https://substack.com/redirect/05a4c026-784c-4e03-aaa4-4f70b42eba39?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Improving prompts and system instructions
(38:15 [ https://substack.com/redirect/9d01f0e4-4faf-41d8-8bb0-5f18e877e4b3?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Analyzing agent workflows
(40:38 [ https://substack.com/redirect/4e02888c-397d-4326-91e0-ff6d54d17af4?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Hamel’s personal AI tools and workflows
(48:02 [ https://substack.com/redirect/1e48d44d-ea1d-40a6-89c4-9339f59fe9ee?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]) Lighting round and final thoughts
Tools referenced:
• Claude: https://claude.ai/ [ https://substack.com/redirect/f1bd4a68-2f07-4b74-b705-99c6674ffb78?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Braintrust: https://www.braintrust.dev/docs/start [ https://substack.com/redirect/44bf02e0-7563-4f27-b5ea-403fd8d47afa?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Phoenix: https://phoenix.arize.com/ [ https://substack.com/redirect/17c940c6-2aad-487d-ad93-cb535c2f784f?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• AI Studio: https://aistudio.google.com/ [ https://substack.com/redirect/f0484c80-ec3a-4585-967a-cb12a9ae61ec?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• ChatGPT: https://chat.openai.com/ [ https://substack.com/redirect/9d5783d5-8918-44b5-be1d-ea63141cc727?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Gemini: https://gemini.google.com/ [ https://substack.com/redirect/6e1c3b00-8dea-446c-abfa-52615d30bd94?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Other references:
• Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences: https://dl.acm.org/doi/10.1145/3654777.3676450 [ https://substack.com/redirect/0c9ff846-b745-41ac-b2a5-029c61f5b773?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Nurture Boss: https://nurtureboss.io [ https://substack.com/redirect/a175759d-bb52-4f81-b0dd-096e483ca367?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Rechat: https://rechat.com/ [ https://substack.com/redirect/e17d14d5-cfa5-45f5-8d04-6b2d2f4d67a4?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Your AI Product Needs Evals: https://hamel.dev/blog/posts/evals/ [ https://substack.com/redirect/1eb36c93-3a9b-4ba3-a31b-50a023a7234c?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• A Field Guide to Rapidly Improving AI Products: https://hamel.dev/blog/posts/field-guide/ [ https://substack.com/redirect/1088e417-8316-45d6-9d3d-1d33907e9259?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Creating a LLM-as-a-Judge That Drives Business Results: https://hamel.dev/blog/posts/llm-judge/ [ https://substack.com/redirect/8b4f93d7-e1d8-4b99-826b-4c699543ae47?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
• Lenny’s List on Maven: https://maven.com/lenny [ https://substack.com/redirect/fb9cc4cf-6c8f-483b-b57f-187881039f96?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]
Production and marketing by https://penname.co/ [ https://substack.com/redirect/979fbed6-658a-4d07-997e-cfa9b5515852?j=eyJ1IjoiMTdxcWYifQ.MfxQ_MIi__85hddye3ASgY7Mnmj6Wchtq0jhU4BE8CA ]. For inquiries about sponsoring the podcast, email jordan@penname.co.

Unsubscribe https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly93d3cubGVubnlzbmV3c2xldHRlci5jb20vYWN0aW9uL2Rpc2FibGVfZW1haWw_dG9rZW49ZXlKMWMyVnlYMmxrSWpveU1EUXdPRFUxTENKd2IzTjBYMmxrSWpveE56VTNNekUwTURVc0ltbGhkQ0k2TVRjMk1ETTFOREExTXl3aVpYaHdJam94TnpreE9Ea3dNRFV6TENKcGMzTWlPaUp3ZFdJdE1UQTRORFVpTENKemRXSWlPaUprYVhOaFlteGxYMlZ0WVdsc0luMC5DYU9HRTVmaHdhTmhZajltQjhYLWFPM2Z2N1NfeWxURDFFMk12Zi0yQ1ZFIiwicCI6MTc1NzMxNDA1LCJzIjoxMDg0NSwiZiI6dHJ1ZSwidSI6MjA0MDg1NSwiaWF0IjoxNzYwMzU0MDUzLCJleHAiOjIwNzU5MzAwNTMsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.Zdr8ZcQLpw3sL6tWwbQMa03BIRGyOXyCzDIK8UVcoOo?
