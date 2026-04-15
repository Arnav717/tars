import Markdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

function CodeBlockWrapper({ code, language, className, style, tokens, getLineProps, getTokenProps }: any) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code", err);
        }
    };

    return (
        <div className="markdown-code-block" style={{ backgroundColor: "#1d1d1d", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", overflow: "hidden", margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", backgroundColor: "rgba(0, 0, 0, 0.3)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <span style={{ fontSize: "12px", color: "#a1a1aa", fontFamily: "monospace", textTransform: "uppercase" }}>{language}</span>
                <button
                    onClick={handleCopy}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: copied ? "#4ade80" : "#a1a1aa",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        padding: "4px 8px",
                        width: "auto",
                        borderRadius: "4px",
                        transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <pre
                className={`${className} markdown-pre`}
                style={{ ...style, backgroundColor: "transparent", margin: 0, padding: "16px", paddingTop: "12px" }}
            >
                {tokens.map((line: any, i: number) => (
                    <div
                        key={i}
                        {...getLineProps({ line })}
                        className="markdown-code-line"
                    >
                        <span className="markdown-line-number">{i + 1}</span>
                        <span className="markdown-code-content">
                            {line.map((token: any, key: number) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </span>
                    </div>
                ))}
            </pre>
        </div>
    );
}

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    try {
        return (
            <Markdown
                remarkPlugins={[]}
                components={{
                    p: ({ children }) => <p className="markdown-p">{children}</p>,
                    h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
                    h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
                    h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
                    strong: ({ children }) => (
                        <strong className="markdown-strong">{children}</strong>
                    ),
                    em: ({ children }) => <em className="markdown-em">{children}</em>,
                    ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
                    ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
                    li: ({ children }) => <li className="markdown-li">{children}</li>,
                    pre: (props) => {
                        const children = props.children as any;

                        let code = "";
                        let language = "javascript";

                        if (Array.isArray(children) && children.length > 0) {
                            const codeElement = children[0];
                            if (codeElement?.props?.className) {
                                const childrenContent = codeElement.props.children;
                                if (typeof childrenContent === "string") {
                                    code = childrenContent;
                                } else if (Array.isArray(childrenContent)) {
                                    code = childrenContent
                                        .map((child: any) =>
                                            typeof child === "string"
                                                ? child
                                                : child?.props?.children || ""
                                        )
                                        .join("");
                                } else {
                                    code = childrenContent || "";
                                }
                                language =
                                    codeElement.props.className.replace("language-", "") ||
                                    "javascript";
                            }
                        } else if (children?.props?.className) {
                            const childrenContent = children.props.children;
                            if (typeof childrenContent === "string") {
                                code = childrenContent;
                            } else if (Array.isArray(childrenContent)) {
                                code = childrenContent
                                    .map((child: any) =>
                                        typeof child === "string"
                                            ? child
                                            : child?.props?.children || ""
                                    )
                                    .join("");
                            } else {
                                code = childrenContent || "";
                            }
                            language =
                                children.props.className.replace("language-", "") ||
                                "javascript";
                        } else if (typeof children === "string") {
                            code = children;
                        } else if (children?.props?.children) {
                            const childrenContent = children.props.children;
                            if (typeof childrenContent === "string") {
                                code = childrenContent;
                            } else if (Array.isArray(childrenContent)) {
                                code = childrenContent
                                    .map((child: any) =>
                                        typeof child === "string"
                                            ? child
                                            : child?.props?.children || ""
                                    )
                                    .join("");
                            } else {
                                code = childrenContent || "";
                            }
                        }

                        return (
                            <Highlight
                                theme={themes.oneDark}
                                code={code}
                                language={language}
                            >
                                {(props) => <CodeBlockWrapper code={code} language={language} {...props} />}
                            </Highlight>
                        );
                    },
                    code: ({ children }) => (
                        <code className="markdown-inline-code">{children}</code>
                    ),
                    table: ({ children }) => (
                        <div className="markdown-table-wrapper">
                            <table className="markdown-table">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="markdown-thead">{children}</thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="markdown-tbody">{children}</tbody>
                    ),
                    tr: ({ children }) => <tr className="markdown-tr">{children}</tr>,
                    th: ({ children }) => <th className="markdown-th">{children}</th>,
                    td: ({ children }) => <td className="markdown-td">{children}</td>,
                }}
            >
                {content}
            </Markdown>
        );
    } catch (error) {
        console.error("Markdown rendering error:", error);
        return (
            <div className="markdown-fallback">
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {content}
                </pre>
            </div>
        );
    }
}
