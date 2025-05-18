import { useCodeSpotlightContext } from "./components";

export const useCodeSpotlight = () => {
  const { id, mode, ref } = useCodeSpotlightContext();

  const focusTarget = (target: string) => {
    const codeBlock = ref?.current;
    if (!codeBlock) return;

    codeBlock.setAttribute("data-hovered", "true");
    const tokens = codeBlock.querySelectorAll("span");
    tokens.forEach((token) => {
      if (mode === "equal" && token.textContent === target) {
        token.classList.add("spotlight-target");
      } else if (mode === "include" && token.textContent?.includes(target)) {
        token.classList.add("spotlight-target");
      } else {
        token.classList.remove("spotlight-target");
      }
    });
  };

  const unfocusTarget = () => {
    const codeBlock = ref?.current;
    if (!codeBlock) return;

    codeBlock.setAttribute("data-hovered", "false");
    const tokens = codeBlock.querySelectorAll("span");
    tokens.forEach((token) => {
      token.classList.remove("spotlight-target");
    });
  };

  return { id, focusTarget, unfocusTarget };
};
