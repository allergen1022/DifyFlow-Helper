# Debug Material Example

## Flow file

document-parser.yml

## Failing node

Parse Document Output

## Node type

Code Node using JavaScript

## Error

SyntaxError while parsing fenced JSON.

## Input

    model_output = text followed by fenced JSON containing document_type and extracted_text

## Expected output

Return a document_data object.

## Recent change

The LLM prompt was changed to request fenced JSON.
