#!/bin/bash
set -e

DOCS_DIR="$(cd "$(dirname "$0")" && pwd)"
REPORT="$DOCS_DIR/Digital_Assignment_3_Report.md"
DIAGRAMS_DIR="$DOCS_DIR/rendered_diagrams"
PLANTUML_JAR="$DIAGRAMS_DIR/plantuml.jar"
OUTPUT_MD="$DIAGRAMS_DIR/report_with_images.md"
OUTPUT_PDF="$DOCS_DIR/Digital_Assignment_3_Report.pdf"

mkdir -p "$DIAGRAMS_DIR"

echo "=== Step 1: Extracting and rendering PlantUML diagrams ==="

# Extract plantuml blocks and create .puml files
python3 -c "
import re, sys

with open('$REPORT', 'r') as f:
    content = f.read()

# Find all plantuml blocks
pattern = r'\`\`\`plantuml\n(.*?)\n\`\`\`'
matches = re.findall(pattern, content, re.DOTALL)

for i, match in enumerate(matches):
    fname = f'$DIAGRAMS_DIR/plantuml_{i}.puml'
    with open(fname, 'w') as f:
        f.write(match)
    print(f'  Wrote {fname}')

print(f'  Total: {len(matches)} PlantUML diagrams')
"

# Render each .puml to PNG
for puml in "$DIAGRAMS_DIR"/plantuml_*.puml; do
    if [ -f "$puml" ]; then
        echo "  Rendering $(basename "$puml")..."
        java -jar "$PLANTUML_JAR" -tpng -o "$DIAGRAMS_DIR" "$puml" 2>&1 || true
    fi
done

echo ""
echo "=== Step 2: Extracting and rendering Mermaid diagrams ==="

# Extract mermaid blocks and create .mmd files
python3 -c "
import re

with open('$REPORT', 'r') as f:
    content = f.read()

pattern = r'\`\`\`mermaid\n(.*?)\n\`\`\`'
matches = re.findall(pattern, content, re.DOTALL)

for i, match in enumerate(matches):
    fname = f'$DIAGRAMS_DIR/mermaid_{i}.mmd'
    with open(fname, 'w') as f:
        f.write(match)
    print(f'  Wrote {fname}')

print(f'  Total: {len(matches)} Mermaid diagrams')
"

# Render each .mmd to PNG using npx mmdc
for mmd in "$DIAGRAMS_DIR"/mermaid_*.mmd; do
    if [ -f "$mmd" ]; then
        outpng="${mmd%.mmd}.png"
        echo "  Rendering $(basename "$mmd")..."
        npx -y @mermaid-js/mermaid-cli -i "$mmd" -o "$outpng" -b white --width 1200 -t default 2>&1 | tail -2 || true
    fi
done

echo ""
echo "=== Step 3: Building PDF-ready markdown ==="

# Replace diagram code blocks with rendered images
python3 -c "
import re

with open('$REPORT', 'r') as f:
    content = f.read()

plantuml_idx = [0]
mermaid_idx = [0]

def replace_plantuml(match):
    idx = plantuml_idx[0]
    plantuml_idx[0] += 1
    return f'![PlantUML Diagram](rendered_diagrams/plantuml_{idx}.png)'

def replace_mermaid(match):
    idx = mermaid_idx[0]
    mermaid_idx[0] += 1
    return f'![Mermaid Diagram](rendered_diagrams/mermaid_{idx}.png)'

content = re.sub(r'\`\`\`plantuml\n.*?\n\`\`\`', replace_plantuml, content, flags=re.DOTALL)
content = re.sub(r'\`\`\`mermaid\n.*?\n\`\`\`', replace_mermaid, content, flags=re.DOTALL)

with open('$OUTPUT_MD', 'w') as f:
    f.write(content)

print(f'  Wrote {\"$OUTPUT_MD\"}')
"

echo ""
echo "=== Step 4: Converting to PDF with pandoc ==="

cd "$DOCS_DIR"
pandoc "$OUTPUT_MD" \
    -o "$OUTPUT_PDF" \
    --pdf-engine=xelatex \
    -V geometry:margin=1in \
    -V fontsize=11pt \
    -V linkcolor=blue \
    -V urlcolor=blue \
    -V header-includes="\usepackage{graphicx}\usepackage{float}\let\origfigure\figure\let\endorigfigure\endfigure\renewenvironment{figure}[1][H]{\origfigure[H]}{\endorigfigure}" \
    --highlight-style=tango \
    -f markdown+implicit_figures \
    --resource-path="$DOCS_DIR" \
    2>&1

echo ""
echo "=== Done! ==="
echo "PDF saved to: $OUTPUT_PDF"
ls -lh "$OUTPUT_PDF"
