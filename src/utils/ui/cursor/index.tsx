// Types imports
import { CursorCallback } from 'utils/types/ui';

export const setupCustomCursor = (
  cursorRef: React.RefObject<HTMLElement | null>,
  addPin: boolean,
  setAddPin: (value: boolean) => void
): CursorCallback => {
  const offsetX = 30;
  const offsetY = 30;

  const moveCursor = (e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.pageX - offsetX}px`;
      cursorRef.current.style.top = `${e.pageY - offsetY}px`;
    }
  };

  const cleanup = () => {
    window.removeEventListener('click', moveCursor);
    window.removeEventListener('mousemove', moveCursor);
    window.removeEventListener('keydown', handleEscape);
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setAddPin(false);
    }
  };

  if (addPin) {
    window.addEventListener('click', moveCursor, { once: true });
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('keydown', handleEscape);
  }

  return cleanup;
};