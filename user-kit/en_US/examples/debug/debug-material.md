# Debug Material Example

## Flow file

invoice-check.yml

## Failing node

Parse Invoice JSON

## Node type

Code Node using JavaScript

## Error

SyntaxError while parsing fenced JSON.

## Input

    model_output = fenced JSON containing invoice_no and total

## Expected output

Return an invoice_data object.

## Recent change

The LLM prompt was changed to request fenced JSON.
