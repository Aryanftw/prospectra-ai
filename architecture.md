# Prospectra — System Architecture

**Tagline:** Find the signal. Win the deal.

**Status:** Initial architecture  
**Purpose:** Source of truth for architecture decisions and implementation boundaries.

---

## 1. Product Overview

Prospectra is an AI-powered B2B sales intelligence platform that helps businesses discover potential customers, research their public online presence, evaluate their fit against an Ideal Customer Profile (ICP), and generate personalized outreach drafts.

### Example use case

A web development agency wants to find textile manufacturers in Surat that could benefit from better websites.

The user specifies:
- Target location: Surat, Gujarat, India.
- Industry: Textile manufacturing.
- Service offered: Website development.
- Ideal customer profile: Businesses with an outdated website, weak online presence, or other observable opportunities for improvement.

Prospectra discovers candidate businesses, researches their public online presence, evaluates their fit, presents supporting evidence, and generates personalized outreach drafts.

**Important distinction:** An identified business opportunity is not proof that the business intends to purchase a service. Prospectra must distinguish observable facts from inferred opportunities and confirmed buying intent.

### Core product principles

1. Evidence-backed research.
2. Transparent qualification decisions.
3. Useful, personalized outreach.
4. Clear separation between verified facts and AI-generated inferences.
5. Bounded, observable, and recoverable AI workflows.
6. Reliable data ownership and workspace isolation.
7. Fast iteration without unnecessary infrastructure.

---

## 2. Technology Stack

The following choices are established for the initial implementation.

| Layer | Technology |
|---|---|
| Frontend | Next.js with App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Design guidance | UI UX Pro Max |
| Icons | Lucide React |
| Animations | Motion |
| Authentication | Clerk |
| Primary database | Neon PostgreSQL |
| ORM | Prisma |
| AI backend | Python with FastAPI |
| AI orchestration | LangGraph |
| AI integrations | LangChain where useful |
| LLM | Google Gemini |
| Web research | Tavily |
| Vector database | Chroma Cloud |
| Frontend hosting | Vercel |
| Backend hosting | Render |

### Technology selection rules

- Prefer the selected stack over introducing competing technologies.
- Do not add dependencies without a concrete requirement.
- Do not introduce another ORM or database access layer.
- Keep infrastructure minimal until actual product requirements justify expansion.
- Verify current SDK compatibility, API availability, model capabilities, and deployment constraints before implementation.
- Treat free-tier quotas and limits as configurable external constraints rather than guaranteed capacity.

Redis and a dedicated worker system are not yet mandatory dependencies. Their introduction must follow the background-job design and operational requirements.

Google Places API is excluded from the initial MVP. Business discovery begins with Tavily, and its effectiveness must be evaluated before considering dedicated business-directory providers.

---

## 3. High-Level Architecture

```text
                         USER
                          |
                          v
               +----------------------+
               |     Next.js App      |
               |                      |
               | UI and Dashboard     |
               | Clerk Authentication |
               | Application API      |
               +----------+-----------+
                          |
             +------------+-------------+
             |                          |
             v                          v
    +----------------+       +-------------------+
    | Clerk          |       | Neon PostgreSQL   |
    | Authentication |       | Access via Prisma |
    +----------------+       +-------------------+
                                        ^
                                        |
                              +---------+---------+
                              | Next.js Internal  |
                              | API Routes        |
                              +---------+---------+
                                        ^
                                        |
                              Authenticated HTTP
                                        |
                              +---------+---------+
                              | FastAPI Backend   |
                              |                   |
                              | Research Workflow |
                              | LangGraph         |
                              | LangChain         |
                              +----+----+----+----+
                                   |    |    |
                    +--------------+    |    +--------------+
                    |                   |                   |
                    v                   v                   v
              +-----------+      +-------------+      +-------------+
              | Tavily    |      | Gemini      |      | Chroma Cloud|
              | Web Search|      | LLM         |      | Vector DB   |
              +-----------+      +-------------+      +-------------+
```

The diagram represents logical responsibilities. It does not prescribe the exact internal implementation of every component.

### Core architectural decision

**Next.js is the application's database access boundary. Prisma is the sole ORM used for PostgreSQL access.**

FastAPI does not connect directly to PostgreSQL.

FastAPI reads and writes application data through authenticated internal Next.js API endpoints. This preserves a single database access layer and keeps database operations, ownership checks, and application-level authorization centralized.

---

## 4. Service Responsibilities

### 4.1 Next.js Application

Next.js is responsible for:

- Rendering the application interface.
- Managing pages, layouts, and reusable UI components.
- Integrating Clerk authentication.
- Exposing application-facing API endpoints.
- Validating incoming application requests.
- Enforcing user and workspace authorization.
- Managing database access through Prisma.
- Exposing restricted internal API endpoints for FastAPI.
- Calling FastAPI for AI research operations.
- Returning research results and job status to the frontend.

The browser should communicate with Next.js for application operations rather than accessing internal services directly.

Secrets and privileged credentials must remain server-side.

### 4.2 FastAPI Backend

FastAPI is responsible for:

- Running AI-powered research workflows.
- Coordinating LangGraph execution.
- Calling Tavily and Gemini.
- Performing evidence extraction and qualification.
- Using Chroma Cloud when semantic retrieval is useful.
- Generating personalized outreach drafts.
- Validating structured AI outputs.
- Reporting workflow progress and failures.
- Requesting authorized data reads and writes through Next.js internal APIs.

FastAPI must not use Prisma directly or open a separate PostgreSQL connection.

### 4.3 Prisma and Neon PostgreSQL

Prisma is the sole ORM for application database operations.

Neon PostgreSQL is the persistent source of truth for application records.

The coding agent is responsible for designing the detailed database schema, relationships, constraints, indexes, and migrations according to the product requirements.

Database design should support workspace isolation, traceable research runs, saved prospects, source evidence, and generated outreach.

Do not create a second database access layer simply to accommodate Python.

### 4.4 Tavily

Tavily is the initial web discovery and research provider.

It is used to:
- Discover candidate businesses through web search.
- Find relevant public webpages.
- Gather information that can support business research.
- Provide source URLs and available metadata for downstream evaluation.

Tavily is a web search provider, not a guaranteed comprehensive business directory.

The system must handle weak discovery coverage, duplicate results, missing pages, outdated information, and insufficient evidence.

Keep the discovery integration modular enough to support another provider in the future.

### 4.5 Google Gemini

Gemini performs tasks such as:
- Extracting structured information from research.
- Evaluating prospects against an ICP.
- Summarizing relevant evidence.
- Producing personalized outreach drafts.

Use structured output schemas wherever appropriate.

Model selection must account for current API availability, supported features, latency, context limits, and quotas.

Never assume the model's output is correct simply because it is syntactically valid.

### 4.6 LangGraph and LangChain

LangGraph coordinates the bounded research workflow.

LangChain may be used for model integrations, retrieval utilities, and other abstractions when it provides concrete value.

Do not add unnecessary abstraction layers around straightforward API calls.

LangGraph should represent explicit workflow stages, conditional transitions, failure paths, and retry limits.

### 4.7 Chroma Cloud

Chroma Cloud provides vector storage and semantic retrieval.

Potential uses include:
- Retrieving relevant passages from previously indexed research.
- Searching accumulated research semantically.
- Supplying relevant context to downstream AI operations.

PostgreSQL remains the authoritative store for application records.

Chroma is not a replacement for PostgreSQL, and the system must not assume every research request requires vector search.

Define the embedding model, document chunking strategy, metadata filters, and retrieval behavior when implementing the actual retrieval use case.

### 4.8 Clerk

Clerk handles user authentication.

The application remains responsible for authorization: authentication alone does not grant access to arbitrary prospects, workspaces, or research reports.

### 4.9 Deployment

- Deploy the Next.js application on Vercel.
- Deploy the FastAPI service on Render.
- Use Neon for PostgreSQL.
- Use Chroma Cloud for vector storage.

Configure production secrets through the relevant deployment environment settings.

Do not commit credentials, production secrets, API keys, or local environment files to version control.

---

## 5. API Boundaries

There are two primary HTTP boundaries.

### 5.1 Browser to Next.js

The frontend uses Next.js application endpoints for:
- Creating and managing searches.
- Viewing search progress.
- Retrieving prospects and reports.
- Saving and viewing outreach drafts.
- Performing other authenticated application operations.

All protected operations must verify authentication and enforce resource ownership.

### 5.2 FastAPI to Next.js Internal APIs

FastAPI communicates with PostgreSQL indirectly through internal Next.js endpoints.

These endpoints may support operations such as:
- Creating and updating research runs.
- Retrieving authorized research-run information.
- Persisting discovered prospects.
- Saving research evidence and reports.
- Saving generated outreach drafts.
- Recording failures and partial results.

The exact endpoint paths and request schemas may be established during implementation.

### Internal API security requirements

1. Internal endpoints must require server-to-server authentication.
2. Service credentials must never be exposed to the browser.
3. Request payloads must be validated.
4. Each operation must enforce the applicable workspace and resource authorization rules.
5. Internal endpoints must not expose unrestricted database queries or arbitrary database operations.
6. Requests must be bounded in size and execution cost.
7. Errors must not disclose secrets, stack traces, or sensitive internal details.
8. Internal API credentials must be stored and rotated through secure environment configuration.

Prefer explicit, task-oriented API operations over a generic endpoint that permits arbitrary reads and writes.

### API contract discipline

The Next.js and FastAPI services must agree on request and response schemas.

Use explicit, typed request and response models. Pydantic should validate FastAPI-side inputs and outputs where applicable.

Document internal API contracts so that changes in one service do not silently break the other.

---

## 6. Research Workflow

The initial research workflow should be bounded and observable.

```text
1. Receive research request
           |
           v
2. Validate inputs and limits
           |
           v
3. Generate search queries
           |
           v
4. Discover candidate businesses
           |
           v
5. Normalize and deduplicate results
           |
           v
6. Research relevant public webpages
           |
           v
7. Extract structured facts and evidence
           |
           v
8. Evaluate fit against the user's ICP
           |
           v
9. Validate claims and source references
           |
           v
10. Generate personalized outreach drafts
           |
           v
11. Persist results and final status
```

The workflow may perform additional targeted searches when evidence is insufficient, subject to configured limits.

The implementation should use explicit LangGraph states, nodes, transitions, and termination conditions.

### Workflow requirements

- Validate user inputs before initiating expensive operations.
- Normalize and deduplicate candidate businesses.
- Keep retrieved source material associated with the claims it supports.
- Distinguish facts, inferences, and unknown information.
- Allow an insufficient-evidence outcome.
- Bound search calls, candidate counts, retries, model calls, and execution time.
- Handle provider failures without unnecessarily discarding completed work.
- Persist progress and final outcomes through the internal API.
- Avoid repeatedly researching the same candidate without a clear reason.
- Return partial results when useful rather than failing an entire run because one candidate failed.

### Prospect qualification

Qualification should evaluate how well a business matches the user's stated criteria.

It must not present an ICP-fit score as:
- A probability of purchasing.
- Proof of purchase intent.
- A verified buying signal without supporting evidence.

The criteria and evidence behind a score should be inspectable.

---

## 7. Background Jobs and Execution Reliability

Research runs may exceed the duration of a normal HTTP request.

The architecture must therefore distinguish job submission from job execution.

### Intended behavior

1. The user submits a research request.
2. Next.js validates the request and initiates the workflow.
3. A research-run record tracks the run's status.
4. FastAPI performs the research.
5. Progress and results are persisted through the internal API.
6. The frontend retrieves status and displays completed results.
7. Failures are recorded and handled according to the retry policy.

Suggested lifecycle states:

- `pending`
- `running`
- `completed`
- `completed_with_errors`
- `failed`
- `cancelled`

These are proposed application states, not an already implemented schema.

### Reliability requirements

- Research execution must have explicit timeouts.
- Retries must be bounded and must not blindly duplicate writes.
- Repeated requests must not accidentally create duplicate results.
- Partial progress should survive individual provider failures.
- Production research jobs should not depend on a short-lived HTTP request remaining open.
- Long-running jobs must have a recovery strategy if the worker restarts.

### Queue decision

A durable background worker and queue are the preferred production approach if research runs are long-running.

Redis and the specific worker technology are not yet locked in. Choose them when implementing job execution, based on deployment compatibility and operational simplicity.

Do not treat an in-process background task as durable execution.

---

## 8. Evidence and Grounding

Evidence quality is a core product requirement.

For relevant research claims, retain source information such as:
- Source URL.
- Page title, when available.
- Relevant excerpt or passage.
- Retrieval timestamp.
- Publication date, when available.
- The claim or finding supported by the evidence.

The implementation must define a consistent representation for evidence and its relationship to research findings.

### Validation requirements

- Source references must correspond to material actually retrieved.
- Evidence excerpts must be traceable to their source content.
- Claims must be evaluated for whether the cited material supports them.
- Unsupported or contradictory claims must not be presented as verified facts.
- Missing evidence must be represented honestly.
- Inferences must be labelled as inferences.

Checking that a URL exists or that a quote appears on a page is not sufficient to prove that the source supports the claim.

When evidence cannot support a conclusion, the workflow must be allowed to return an uncertain or insufficient-evidence result.

---

## 9. AI Guardrails and Security

Guardrails must be enforced through code, access controls, validation, and workflow design—not merely through model instructions.

### Input validation

- Validate required research fields.
- Restrict unreasonable candidate counts and query sizes.
- Apply per-user or per-workspace usage limits.
- Reject malformed or unsupported inputs.
- Apply request timeouts and rate limits.

### Prompt-injection protection

Retrieved webpages and other external documents must be treated as untrusted data.

The workflow must not follow instructions embedded in retrieved content.

External content must not be allowed to:
- Override application instructions.
- Obtain API keys or environment secrets.
- Trigger unrestricted tool use.
- Initiate arbitrary external actions.
- Change authorization rules.

### Tool restrictions

- Give models only the tools required for the current task.
- Validate tool arguments.
- Restrict external network access to intended operations.
- Prevent arbitrary shell execution and unrestricted code execution.
- Apply safe URL-fetching rules and protections against SSRF.
- Limit redirects, response sizes, and request duration where applicable.

### Output validation

- Validate structured outputs against explicit schemas.
- Reject malformed or incomplete critical outputs.
- Use only bounded repair or retry attempts.
- Verify that claims and source references satisfy grounding requirements.
- Do not fabricate business details to fill missing fields.

### Data isolation

- Enforce workspace authorization for every protected data operation.
- Never trust a client-provided workspace ID without authorization checks.
- Keep credentials and sensitive configuration server-side.
- Avoid logging secrets or unnecessary personal information.

---

## 10. Vector Retrieval Design

Chroma Cloud should be introduced where it solves a real retrieval problem.

Before implementing a retrieval pipeline, define:
1. What documents or passages will be indexed.
2. How documents are split into chunks.
3. Which embedding model will be used.
4. What metadata is stored with each vector.
5. How queries are filtered by workspace or other access boundaries.
6. How retrieved passages are passed into the research workflow.
7. How stale or deleted documents are handled.

Vector metadata must preserve the relationship between retrieved passages, their source documents, and the relevant application records.

Retrieval must respect workspace isolation. A query must not expose one workspace's private indexed material to another workspace.

Do not duplicate the full application database in Chroma.

---

## 11. Frontend and Design System

Prospectra follows a Swiss modern design direction.

### Visual principles

- Warm, neutral surfaces.
- Near-black typography.
- Restrained signal-red accent.
- Strong typographic hierarchy.
- Precise alignment and structured grids.
- Thin, neutral borders.
- Minimal shadows.
- Restrained corner radii.
- Subtle motion where it improves usability.

Avoid generic AI-product gradients, excessive glassmorphism, oversized rounded cards, and decorative animations without a functional purpose.

### UI engineering principles

- Use reusable components and shared design tokens.
- Keep business logic out of purely presentational components.
- Maintain clear loading, empty, error, and success states.
- Design the dashboard around research progress, evidence, prospect qualification, and useful actions.
- Ensure responsive layouts and accessible interactions.
- Use the UI UX Pro Max skill when available and appropriate.

The visual system should be established before building the full dashboard.

---

## 12. Observability and LLM Evaluation

The system must make it possible to understand what happened during a research run.

### Observability

Track:
- Research-run IDs.
- Workflow stage and status.
- Provider errors and retry counts.
- Execution duration.
- Search and model usage.
- Estimated cost when usage data permits.
- Validation failures.
- Partial completion and failure reasons.

Logs must not expose API keys, credentials, or unnecessary sensitive data.

### Evaluation

Maintain a small, manually reviewed set of representative research requests.

Evaluate:
- Business relevance.
- Geographic correctness.
- Duplicate rate.
- Evidence and citation correctness.
- ICP qualification quality.
- Outreach factuality and personalization.
- Structured-output validity.
- Latency, failure rate, and cost.

Use deterministic checks wherever possible and human review for subjective quality. LLM-as-judge may supplement evaluation but must not be the sole source of truth.

Changes to prompts, models, retrieval, or workflow logic should be tested against the evaluation set.

---

## 13. Configuration and Secrets

Use environment variables for service configuration.

Examples of configuration categories include:

- Clerk authentication configuration.
- Database access configuration for the Next.js service.
- Internal service authentication credentials.
- FastAPI service URL.
- Gemini API configuration.
- Tavily API configuration.
- Chroma Cloud configuration.
- Model selection and workflow limits.

Use separate environment configurations for local development and deployment.

Requirements:
- Commit an `.env.example` containing placeholder values only.
- Keep real `.env` files out of version control.
- Validate required environment variables at startup.
- Fail with actionable configuration errors.
- Never pass privileged credentials to client-side code.
- Never log secrets.

The exact environment-variable names should be established consistently during implementation.

---

## 14. Error Handling and API Contracts

All services should return predictable errors.

The implementation should distinguish:
- Invalid user input.
- Authentication and authorization failures.
- Missing resources.
- External provider failures.
- Rate limits and quota exhaustion.
- Timeouts.
- Structured-output validation failures.
- Internal application errors.

Do not expose raw internal exceptions to the frontend.

Where possible, errors should include a safe message and a traceable request or research-run identifier.

Provider failures should be handled locally where possible instead of unnecessarily failing unrelated workflow stages.

---

## 15. Testing Strategy

### Frontend and Next.js

- Linting and type checking.
- Build validation.
- API input-validation tests.
- Authentication and authorization tests.
- Internal API authentication tests.
- Database access and persistence tests.

### FastAPI

- Input and output schema tests.
- Workflow transition tests.
- Retry and timeout tests.
- Provider-failure tests.
- Evidence-validation tests.
- Prompt-injection resilience tests.
- Partial-result tests.

### Integration

Test the end-to-end flow:

1. Submit a research request.
2. Create and track a research run.
3. Discover candidate businesses.
4. Extract evidence.
5. Evaluate fit.
6. Generate outreach drafts.
7. Persist the results.
8. Retrieve them through the application.
9. Verify that unauthorized workspaces cannot access them.

External providers should be mocked for deterministic tests where appropriate.

---

## 16. Deployment and Operational Constraints

The deployment architecture uses Vercel for Next.js and Render for FastAPI.

Before enabling production research jobs, verify:
- Request and execution time limits.
- Background-worker support.
- Network connectivity between services.
- Environment-variable configuration.
- Provider quotas and rate limits.
- Health checks and logging.
- Database connection behavior.
- Recovery behavior after process restarts.

Do not assume that a local execution model will work unchanged in production.

The background-job implementation must fit the actual capabilities of the selected hosting configuration.

---

## 17. Explicitly Out of Scope for the Initial MVP

Unless a concrete requirement changes the priority, do not implement these as part of the initial foundation:

- Automatic email sending.
- Google Places integration.
- Billing and subscription management.
- Complex team administration.
- Multiple competing ORM layers.
- A second database access layer.
- Unrestricted autonomous agents.
- Unbounded research loops.
- Complex caching infrastructure.
- A large microservices architecture.
- A comprehensive analytics platform.

Keep future extensions possible without implementing them prematurely.

---

## 18. Engineering Rules for the Coding Agent

1. Read this document before implementing architectural changes.
2. Inspect the existing repository before overwriting or restructuring it.
3. Preserve the agreed technology choices.
4. Keep Next.js and FastAPI responsibilities separate.
5. Use Prisma as the sole PostgreSQL ORM.
6. Route FastAPI database operations through authenticated Next.js internal APIs.
7. Never expose secrets or bypass authorization.
8. Prefer small, coherent implementation tasks over one enormous implementation.
9. Validate inputs and outputs at service boundaries.
10. Bound AI workflows, retries, resource usage, and execution time.
11. Preserve evidence provenance and distinguish facts from inferences.
12. Add dependencies only when justified.
13. Test changes and fix issues introduced by the implementation.
14. Document material architecture changes rather than silently changing established decisions.
15. Do not implement deferred features merely because they are listed as possible future extensions.

---

## 19. Architecture Decisions Still Open

The following details may be finalized during implementation without blocking the initial project bootstrap:

- Exact database schema and relationships.
- Internal API paths and detailed request/response contracts.
- Durable queue and worker technology.
- Exact Gemini model and embedding model.
- Chroma document schema and retrieval strategy.
- Workflow limits and usage quotas.
- Logging and evaluation tooling.
- Exact production environment-variable names.

Any decision that changes the agreed service boundaries or database ownership must be reviewed before implementation.

---

## Final Principle

**Build the smallest reliable version of Prospectra that can discover businesses, research them, qualify them using evidence, and generate useful outreach drafts.**

Favor clarity, testability, evidence quality, and a fast development cycle over unnecessary infrastructure or premature abstraction.