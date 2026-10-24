import { useCallback, useEffect, useRef, useState } from "react";

const MOVEMENT_THRESHOLD = 10;

const clampScrollPosition = () => Math.max(window.scrollY, 0);

export default function useScrollAwareNavigation({ interactionLocked, routeKey }) {
  const [navigationState, setNavigationState] = useState("initial");
  const stateRef = useRef("initial");
  const lockedRef = useRef(interactionLocked);
  const lastScrollRef = useRef(0);
  const accumulatedMovementRef = useRef(0);
  const directionRef = useRef(0);
  const frameRef = useRef(0);

  const commitState = useCallback((nextState) => {
    if (stateRef.current === nextState) return;
    stateRef.current = nextState;
    setNavigationState(nextState);
  }, []);

  useEffect(() => {
    lockedRef.current = interactionLocked;
    if (interactionLocked && clampScrollPosition() > window.innerHeight) {
      accumulatedMovementRef.current = 0;
      directionRef.current = 0;
      commitState("visible");
    }
  }, [commitState, interactionLocked]);

  useEffect(() => {
    const currentPosition = clampScrollPosition();
    lastScrollRef.current = currentPosition;
    accumulatedMovementRef.current = 0;
    directionRef.current = 0;
    commitState(currentPosition > window.innerHeight ? "hidden" : "initial");
  }, [commitState, routeKey]);

  useEffect(() => {
    const updateNavigation = () => {
      frameRef.current = 0;
      const currentPosition = clampScrollPosition();
      const previousPosition = lastScrollRef.current;
      const movement = currentPosition - previousPosition;
      const isPastFirstScreen = currentPosition > window.innerHeight;

      lastScrollRef.current = currentPosition;

      if (!isPastFirstScreen) {
        accumulatedMovementRef.current = 0;
        directionRef.current = 0;
        commitState("initial");
        return;
      }

      if (lockedRef.current) {
        accumulatedMovementRef.current = 0;
        directionRef.current = 0;
        commitState("visible");
        return;
      }

      if (stateRef.current === "initial") {
        accumulatedMovementRef.current = 0;
        directionRef.current = 1;
        commitState("hidden");
        return;
      }

      if (!movement) return;

      const nextDirection = Math.sign(movement);
      if (nextDirection !== directionRef.current) {
        accumulatedMovementRef.current = 0;
        directionRef.current = nextDirection;
      }

      accumulatedMovementRef.current += movement;
      if (Math.abs(accumulatedMovementRef.current) < MOVEMENT_THRESHOLD) return;

      commitState(accumulatedMovementRef.current < 0 ? "visible" : "hidden");
      accumulatedMovementRef.current = 0;
    };

    const scheduleUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(updateNavigation);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [commitState]);

  return navigationState;
}
