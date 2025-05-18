import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  useRef,
} from "react";

import { useCodeSpotlight } from "./useCodeSpotlight";

interface CodeSpotlightContextType {
  ref: React.RefObject<HTMLPreElement> | null;
  id: string;
  mode: CodeSpotlightMode;
}

export type CodeSpotlightMode = "equal" | "include";

const CodeSpotlightContext = createContext<CodeSpotlightContextType>({
  ref: null,
  id: "",
  mode: "equal",
});

export function useCodeSpotlightContext() {
  const context = useContext(CodeSpotlightContext);

  if (!context) {
    console.error(
      "[code-spotlight] useCodeSpotlight must be used within a CodeSpotlightProvider"
    );
  }

  return context;
}

export function CodeSpotlight({
  children,
  mode = "include",
}: {
  children: React.ReactNode;
  mode?: CodeSpotlightMode;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const id = useId();

  const value = useMemo(() => ({ id, mode, ref: preRef }), [id, mode, preRef]);

  return (
    <CodeSpotlightContext.Provider value={value}>
      {React.Children.map(children, (child) => {
        if (
          typeof child === "object" &&
          child !== null &&
          "type" in child &&
          child.type === "pre"
        ) {
          return React.cloneElement(child as React.ReactElement, {
            id,
            className:
              child.props &&
              typeof child.props === "object" &&
              "className" in child.props
                ? `${child.props.className} code-spotlight-container`
                : "code-spotlight-container",
            ref: preRef,
          });
        }
        return child;
      })}
    </CodeSpotlightContext.Provider>
  );
}

export function CodeSpotlightTrigger({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) {
  const { focusTarget, unfocusTarget } = useCodeSpotlight();

  return (
    <code
      className="code-spotlight-trigger"
      onMouseEnter={() => focusTarget(target)}
      onMouseLeave={unfocusTarget}
    >
      {children}
    </code>
  );
}

CodeSpotlight.Trigger = CodeSpotlightTrigger;
