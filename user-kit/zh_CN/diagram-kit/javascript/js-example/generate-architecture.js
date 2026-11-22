#!/usr/bin/env node
'use strict';

/**
 * Open-source architecture diagram example.
 *
 * This file intentionally uses synthetic workflow names and generic processing
 * concepts. It does not describe a production system or a real customer flow.
 * 需要使用 Node.js 运行：
 * node generate-architecture.js

 * 运行后生成 generic-document-processing-architecture.svg。
 **/

const fs = require('fs');
const path = require('path');

const CANVAS_WIDTH = 2880;
const CANVAS_HEIGHT = 1800;

const COLORS = {
  background: '#F5F7FB',
  panel: '#FFFFFF',
  ink: '#182235',
  muted: '#667085',
  navy: '#355070',
  navySoft: '#E7EDF5',
  blue: '#3A7CA5',
  blueSoft: '#E5F1F8',
  amber: '#D88C2F',
  amberSoft: '#FFF0DB',
  green: '#3A7D5D',
  greenSoft: '#E4F2EA',
  red: '#B54A4A',
  redSoft: '#F8E5E5',
  border: '#D8DEE9'
};

const steps = [
  {
    id: 'request',
    x: 70,
    y: 215,
    w: 420,
    h: 205,
    badge: '1',
    tone: 'navy',
    title: 'Receive Processing Request',
    lines: [
      'Document groups and metadata',
      'Requested fields and output format'
    ]
  },
  {
    id: 'validate',
    x: 640,
    y: 215,
    w: 420,
    h: 205,
    badge: '2',
    tone: 'blue',
    title: 'Validate Request Package',
    lines: [
      'Check required inputs',
      'Resolve enabled processing profiles'
    ]
  },
  {
    id: 'dispatch',
    x: 1210,
    y: 215,
    w: 420,
    h: 205,
    badge: '3',
    tone: 'amber',
    title: 'Dispatch Document Groups',
    lines: [
      'Process each group independently',
      'Apply a bounded concurrency limit'
    ]
  },
  {
    id: 'collect',
    x: 1780,
    y: 215,
    w: 420,
    h: 205,
    badge: '4',
    tone: 'blue',
    title: 'Collect Group Outcomes',
    lines: [
      'Preserve success and failure states',
      'Attach per-group processing context'
    ]
  },
  {
    id: 'respond',
    x: 2350,
    y: 215,
    w: 460,
    h: 205,
    badge: '5',
    tone: 'green',
    title: 'Return Normalized Response',
    lines: [
      'Merge all group outcomes',
      'Emit a stable response contract'
    ]
  },

  {
    id: 'loadGroup',
    x: 70,
    y: 620,
    w: 390,
    h: 215,
    badge: 'A',
    tone: 'navy',
    title: 'Load One Document Group',
    lines: [
      'Resolve the group identifier',
      'Read all attached source files'
    ]
  },
  {
    id: 'inspectFiles',
    x: 535,
    y: 620,
    w: 390,
    h: 215,
    badge: 'B',
    tone: 'blue',
    title: 'Inspect Source Files',
    lines: [
      'Detect supported file types',
      'Check size and page limits'
    ]
  },
  {
    id: 'normalizePages',
    x: 1000,
    y: 620,
    w: 390,
    h: 215,
    badge: 'C',
    tone: 'blue',
    title: 'Normalize Page Assets',
    lines: [
      'Reuse image files directly',
      'Convert documents into page images'
    ]
  },
  {
    id: 'previewText',
    x: 1465,
    y: 620,
    w: 390,
    h: 215,
    badge: 'D',
    tone: 'amber',
    title: 'Extract Preview Text',
    lines: [
      'Read a lightweight text sample',
      'Provide hints for profile selection'
    ]
  },
  {
    id: 'classify',
    x: 1930,
    y: 620,
    w: 390,
    h: 215,
    badge: 'E',
    tone: 'amber',
    title: 'Classify Document Context',
    lines: [
      'Infer the document category',
      'Match an available processing profile'
    ]
  },
  {
    id: 'profileDecision',
    x: 2395,
    y: 620,
    w: 415,
    h: 215,
    badge: 'F',
    tone: 'amber',
    title: 'Matching Profile Available?',
    lines: [
      'Yes: continue extraction',
      'No: return a controlled failure'
    ]
  },

  {
    id: 'selectProfile',
    x: 2200,
    y: 955,
    w: 430,
    h: 260,
    badge: 'G',
    tone: 'blue',
    title: 'Select Extraction Profile',
    lines: [
      'Load profile-specific guidance',
      'Keep only requested fields',
      'Stop if no usable profile exists'
    ]
  },
  {
    id: 'buildPolicy',
    x: 1685,
    y: 955,
    w: 430,
    h: 260,
    badge: 'H',
    tone: 'blue',
    title: 'Build Extraction Policy',
    lines: [
      'Separate summary and line-item fields',
      'Define arrays and nested objects',
      'Constrain types and missing values',
      'Do not invent unavailable data'
    ]
  },
  {
    id: 'composeRequest',
    x: 1170,
    y: 955,
    w: 430,
    h: 260,
    badge: 'I',
    tone: 'blue',
    title: 'Compose Multimodal Request',
    lines: [
      'Combine profile and field rules',
      'Create the target JSON shape',
      'Attach all normalized page images'
    ]
  },
  {
    id: 'runModel',
    x: 655,
    y: 955,
    w: 430,
    h: 260,
    badge: 'J',
    tone: 'green',
    title: 'Run Structured Extraction',
    lines: [
      'Process the complete page set',
      'Extract summary and detail fields',
      'Return structured JSON only'
    ]
  },
  {
    id: 'verifyOutput',
    x: 140,
    y: 955,
    w: 430,
    h: 260,
    badge: 'K',
    tone: 'green',
    title: 'Verify and Normalize Output',
    lines: [
      'Check the model response',
      'Parse and validate JSON',
      'Attach the current group identifier'
    ]
  },

  {
    id: 'exception',
    x: 70,
    y: 1395,
    w: 620,
    h: 230,
    badge: '!',
    tone: 'red',
    title: 'Normalize Processing Exception',
    lines: [
      'File, conversion, or model failure',
      'Extract a readable error summary',
      'Create a failed group outcome'
    ]
  },
  {
    id: 'groupResult',
    x: 850,
    y: 1395,
    w: 980,
    h: 230,
    badge: 'L',
    tone: 'navy',
    title: 'Create Standard Group Result',
    lines: [
      'Success: return structured document data',
      'Failure: return a reason with empty data',
      'Forward the result to the collection stage'
    ]
  },
  {
    id: 'unsupported',
    x: 2070,
    y: 1395,
    w: 740,
    h: 230,
    badge: '×',
    tone: 'red',
    title: 'Return Unsupported-Profile Result',
    lines: [
      'No supported category or profile match',
      'Skip the extraction model call',
      'Create a failed group outcome'
    ]
  }
];

const stepById = new Map(
  steps.map((step) => [step.id, step])
);

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function tonePair(tone) {
  return {
    navy: [COLORS.navy, COLORS.navySoft],
    blue: [COLORS.blue, COLORS.blueSoft],
    amber: [COLORS.amber, COLORS.amberSoft],
    green: [COLORS.green, COLORS.greenSoft],
    red: [COLORS.red, COLORS.redSoft]
  }[tone];
}

function wrapWords(text, maxCharacters) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current
      ? `${current} ${word}`
      : word;

    if (candidate.length <= maxCharacters || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function renderCard(step) {
  const [accent, soft] = tonePair(step.tone);
  const headerHeight = 86;

  const titleMaxCharacters = Math.max(
    18,
    Math.floor((step.w - 100) / 14)
  );

  const bodyMaxCharacters = Math.max(
    24,
    Math.floor((step.w - 64) / 11)
  );

  const titleLines = wrapWords(
    step.title,
    titleMaxCharacters
  ).slice(0, 2);

  const title = titleLines
    .map(
      (line, index) =>
        `<text ` +
        `x="${step.x + 72}" ` +
        `y="${step.y + 33 + index * 27}" ` +
        `class="card-title" ` +
        `fill="${COLORS.ink}">` +
        `${escapeXml(line)}` +
        `</text>`
    )
    .join('\n');

  let bodyLineIndex = 0;

  const body = step.lines
    .map((line) => {
      const wrapped = wrapWords(
        line,
        bodyMaxCharacters
      );

      return wrapped
        .map((part, index) => {
          const y =
            step.y + 119 + bodyLineIndex * 28;

          bodyLineIndex += 1;

          const x =
            step.x + (index === 0 ? 32 : 49);

          const bullet =
            index === 0
              ? `<tspan fill="${accent}">•</tspan> `
              : '';

          return (
            `<text ` +
            `x="${x}" ` +
            `y="${y}" ` +
            `class="body" ` +
            `fill="${COLORS.ink}">` +
            `${bullet}${escapeXml(part)}` +
            `</text>`
          );
        })
        .join('\n');
    })
    .join('\n');

  return `
  <g>
    <rect
      x="${step.x}"
      y="${step.y}"
      width="${step.w}"
      height="${step.h}"
      rx="18"
      fill="${COLORS.panel}"
      stroke="${accent}"
      stroke-width="3"
    />

    <rect
      x="${step.x}"
      y="${step.y}"
      width="${step.w}"
      height="${headerHeight}"
      rx="18"
      fill="${soft}"
    />

    <path
      d="M${step.x},${step.y + 62}
         V${step.y + headerHeight}
         H${step.x + step.w}
         V${step.y + 62}"
      fill="${soft}"
    />

    <circle
      cx="${step.x + 36}"
      cy="${step.y + 43}"
      r="22"
      fill="${accent}"
    />

    <text
      x="${step.x + 36}"
      y="${step.y + 51}"
      text-anchor="middle"
      class="step"
      fill="#fff"
    >${escapeXml(step.badge)}</text>

    ${title}
    ${body}
  </g>`;
}

function getAnchor(id, side) {
  const step = stepById.get(id);

  if (!step) {
    throw new Error(`Unknown step id: ${id}`);
  }

  if (side === 'left') {
    return [
      step.x,
      step.y + step.h / 2
    ];
  }

  if (side === 'right') {
    return [
      step.x + step.w,
      step.y + step.h / 2
    ];
  }

  if (side === 'top') {
    return [
      step.x + step.w / 2,
      step.y
    ];
  }

  return [
    step.x + step.w / 2,
    step.y + step.h
  ];
}

function renderArrow(from, to, options = {}) {
  const start = getAnchor(
    from,
    options.from || 'right'
  );

  const end = getAnchor(
    to,
    options.to || 'left'
  );

  const color = options.color || COLORS.navy;

  const marker =
    color === COLORS.red
      ? 'arrow-red'
      : color === COLORS.green
        ? 'arrow-green'
        : 'arrow';

  const dash = options.dash
    ? 'stroke-dasharray="10 9"'
    : '';

  const midpointX =
    (start[0] + end[0]) / 2;

  const midpointY =
    (start[1] + end[1]) / 2;

  const label = options.label
    ? (
      `<rect ` +
      `x="${midpointX - 58}" ` +
      `y="${midpointY - 42}" ` +
      `width="116" ` +
      `height="34" ` +
      `rx="10" ` +
      `fill="${COLORS.background}"` +
      `/>` +
      `<text ` +
      `x="${midpointX}" ` +
      `y="${midpointY - 18}" ` +
      `text-anchor="middle" ` +
      `class="label" ` +
      `fill="${color}">` +
      `${escapeXml(options.label)}` +
      `</text>`
    )
    : '';

  return (
    `<g>` +
    `<line ` +
    `x1="${start[0]}" ` +
    `y1="${start[1]}" ` +
    `x2="${end[0]}" ` +
    `y2="${end[1]}" ` +
    `stroke="${color}" ` +
    `stroke-width="4" ` +
    `${dash} ` +
    `marker-end="url(#${marker})"` +
    `/>` +
    `${label}` +
    `</g>`
  );
}

const connectors = [
  renderArrow('request', 'validate'),
  renderArrow('validate', 'dispatch'),
  renderArrow('dispatch', 'collect'),
  renderArrow('collect', 'respond'),

  renderArrow('loadGroup', 'inspectFiles'),
  renderArrow('inspectFiles', 'normalizePages'),
  renderArrow('normalizePages', 'previewText'),
  renderArrow('previewText', 'classify'),
  renderArrow('classify', 'profileDecision'),

  renderArrow(
    'profileDecision',
    'selectProfile',
    {
      from: 'bottom',
      to: 'top',
      color: COLORS.green,
      label: 'Yes'
    }
  ),

  renderArrow(
    'selectProfile',
    'buildPolicy',
    {
      from: 'left',
      to: 'right'
    }
  ),

  renderArrow(
    'buildPolicy',
    'composeRequest',
    {
      from: 'left',
      to: 'right'
    }
  ),

  renderArrow(
    'composeRequest',
    'runModel',
    {
      from: 'left',
      to: 'right'
    }
  ),

  renderArrow(
    'runModel',
    'verifyOutput',
    {
      from: 'left',
      to: 'right'
    }
  ),

  renderArrow(
    'verifyOutput',
    'groupResult',
    {
      from: 'bottom',
      to: 'top',
      color: COLORS.green
    }
  ),

  renderArrow(
    'profileDecision',
    'unsupported',
    {
      from: 'right',
      to: 'right',
      color: COLORS.red,
      label: 'No'
    }
  ),

  renderArrow(
    'unsupported',
    'groupResult',
    {
      from: 'left',
      to: 'right',
      color: COLORS.red
    }
  ),

  renderArrow(
    'exception',
    'groupResult',
    {
      color: COLORS.red,
      dash: true
    }
  )
];

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${CANVAS_WIDTH}"
  height="${CANVAS_HEIGHT}"
  viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}"
  role="img"
  aria-labelledby="title desc"
>
  <title id="title">
    Generic Document Processing Architecture
  </title>

  <desc id="desc">
    An illustrative workflow for document intake, preprocessing,
    profile selection, structured extraction, validation,
    and result aggregation.
  </desc>

  <defs>
    <pattern
      id="grid"
      width="36"
      height="36"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M36 0H0V36"
        fill="none"
        stroke="#182235"
        stroke-opacity="0.035"
      />
    </pattern>

    <marker
      id="arrow"
      markerWidth="12"
      markerHeight="12"
      refX="10"
      refY="6"
      orient="auto"
    >
      <path
        d="M0 0L12 6L0 12Z"
        fill="${COLORS.navy}"
      />
    </marker>

    <marker
      id="arrow-red"
      markerWidth="12"
      markerHeight="12"
      refX="10"
      refY="6"
      orient="auto"
    >
      <path
        d="M0 0L12 6L0 12Z"
        fill="${COLORS.red}"
      />
    </marker>

    <marker
      id="arrow-green"
      markerWidth="12"
      markerHeight="12"
      refX="10"
      refY="6"
      orient="auto"
    >
      <path
        d="M0 0L12 6L0 12Z"
        fill="${COLORS.green}"
      />
    </marker>

    <style>
      text {
        font-family:
          Inter,
          "Segoe UI",
          Arial,
          sans-serif;
      }

      .hero {
        font-size: 46px;
        font-weight: 800;
      }

      .subtitle {
        font-size: 30px;
        font-weight: 600;
      }

      .section {
        font-size: 36px;
        font-weight: 800;
      }

      .section-note {
        font-size: 25px;
        font-weight: 600;
      }

      .card-title {
        font-size: 24px;
        font-weight: 800;
      }

      .body {
        font-size: 20px;
        font-weight: 600;
      }

      .step {
        font-size: 24px;
        font-weight: 800;
      }

      .label {
        font-size: 25px;
        font-weight: 800;
      }

      .footer {
        font-size: 22px;
        font-weight: 500;
      }
    </style>
  </defs>

  <rect
    width="${CANVAS_WIDTH}"
    height="${CANVAS_HEIGHT}"
    fill="${COLORS.background}"
  />

  <rect
    width="${CANVAS_WIDTH}"
    height="${CANVAS_HEIGHT}"
    fill="url(#grid)"
  />

  <rect
    x="50"
    y="40"
    width="2780"
    height="112"
    rx="26"
    fill="${COLORS.ink}"
  />

  <text
    x="92"
    y="101"
    class="hero"
    fill="#FFFFFF"
  >
    Generic Document Processing · Reference Architecture
  </text>

  <text
    x="2785"
    y="106"
    text-anchor="end"
    class="subtitle"
    fill="#D5DEEB"
  >
    Intake → Preprocessing → Profile Selection →
    Structured Extraction → Aggregation
  </text>

  <text
    x="70"
    y="195"
    class="section"
    fill="${COLORS.ink}"
  >
    Orchestration Flow
  </text>

  ${connectors.slice(0, 4).join('\n')}
  ${steps.slice(0, 5).map(renderCard).join('\n')}

  <rect
    x="50"
    y="480"
    width="2780"
    height="1200"
    rx="28"
    fill="#FBFCFE"
    fill-opacity="0.95"
    stroke="${COLORS.border}"
    stroke-width="3"
  />

  <text
    x="88"
    y="526"
    class="section"
    fill="${COLORS.ink}"
  >
    Single-Group Processing Flow
  </text>

  <text
    x="2790"
    y="526"
    text-anchor="end"
    class="section-note"
    fill="${COLORS.muted}"
  >
    Preview text supports routing; final extraction uses the
    complete normalized page set.
  </text>

  ${connectors.slice(4).join('\n')}
  ${steps.slice(5).map(renderCard).join('\n')}

  <text
    x="2805"
    y="1750"
    text-anchor="end"
    class="footer"
    fill="${COLORS.muted}"
  >
    Synthetic open-source example · not based on a production workflow
  </text>
</svg>`;

const outputPath = path.join(
  __dirname,
  'generic-document-processing-architecture.svg'
);

fs.writeFileSync(
  outputPath,
  svg,
  'utf8'
);

console.log(`SVG generated: ${outputPath}`);
console.log(
  `Canvas: ${CANVAS_WIDTH} x ${CANVAS_HEIGHT}; ` +
  'minimum font size: 22px'
);
