# Routing and Scenes

Infer the user's primary goal from the request and supplied materials. Do not require scene names, templates, or a fixed intake form. Ask only for missing information that materially changes the design or deliverable.

## Determine the app type

For a new app, use the type the user chose. If no type is stated and the choice changes the design, ask which type they need before designing. Examples include Workflow, Chatflow, a standalone Agent app, Chatbot, and Text Generator; availability and behavior vary by Dify version. Clarify “Agent” only when it is unclear whether the user means a standalone app, an Agent node, or another agentic design.

For an existing app, identify its type from the request or artifact. Ask only if it cannot be established and it affects the work. Apply Workflow and Chatflow node-canvas guidance to those canvases; for other app types, check the relevant configuration surface and current documentation.

## Choose a scene

Route according to the main requested outcome:

- Diagnose a reported failure before proposing a fix.
- Generate a diagram when requested.
- Modify an existing app or Flow when requested.
- Use an existing Flow as a development reference when requested.
- Build a new app when requested.
- Otherwise, provide read-only analysis, explanation, comparison, tracing, or documentation.

When requests combine outcomes, serve the user's stated priority and include supporting analysis as needed. Scene names are internal shorthand and need not appear in responses.

## Scene1: New app

After identifying the app type, use the request and available materials to establish the goal, inputs, outputs, and required behavior. Ask only about gaps that would materially change the design. A clear request for complete importable YAML authorizes that deliverable; verify current Dify behavior before generating it.

## Scene2: Reference-based development

Read the referenced Flow from the current workspace. Reuse only structures that fit the requested goal, identify business-specific logic and missing dependencies, and proceed with the requested deliverable. Ask about the deliverable only when it is genuinely unclear.

## Scene3: Modify an existing app or Flow

Trace the relevant inputs, outputs, and dependencies, then make the requested scoped change. Preserve unrelated source content. Give a concise change summary; pause for clarification only when the target or behavior is materially ambiguous.

## Scene4: Debug

Use runtime evidence to diagnose the reported failure and distinguish evidence from inference. Apply a source change when the user requested a fix; for diagnosis-only requests, report the findings and suggested fix without modifying the source.

## Scene5: Diagrams

Generate a diagram only when requested. Infer its audience, detail, format, and source from context where possible. Ask only about a missing choice that would materially change the result.

## Scene6: Read-only analysis

Analyze existing Flows without modification unless the user also asks for a change. Return the analysis in chat by default; create a report only when requested. Use a report template as an optional starting point and adapt it to the request.
