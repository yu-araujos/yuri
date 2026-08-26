"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppId, useOSStore } from "@/store/useOSStore";
import { AboutApp } from "./apps/AboutApp";
import { ContactApp } from "./apps/ContactApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { WindowControls } from "./window/WindowControls";
import {
  TITLE_MAP,
  windowContainerVariants,
  windowHeaderVariants,
  windowContentVariants,
  windowTitleVariants,
} from "./window/Window.variants";

interface WindowProps {
  id: AppId;
}

export function Window({ id }: WindowProps) {
  const windowState = useOSStore((state) => state.windows[id]);
  const { maximizeApp, focusApp } = useOSStore();
  const { isMinimized, isMaximized } = windowState;
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const containerMode = !isDesktop
    ? "mobile"
    : isMaximized
      ? "maximized"
      : id === "contact"
        ? "contact"
        : "standard";

  const contentType =
    id === "contact" ? "contact" : isMaximized ? "maximized" : "standard";

  return (
    <AnimatePresence>
      {windowState.isOpen && !isMinimized && (
        <motion.div
          layout={isDesktop}
          drag={isDesktop && !isMaximized}
          dragMomentum={false}
          onMouseDown={() => focusApp(id)}
          initial={{ opacity: 0, scale: isDesktop && !isMaximized ? 0.95 : 1 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: isDesktop && !isMaximized ? 0.95 : 1 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          style={{ zIndex: windowState.zIndex }}
          className={windowContainerVariants({ mode: containerMode })}
        >
          {isMaximized && (
            <div className="absolute top-6 right-8 flex items-center space-x-3 z-50">
              <WindowControls id={id} />
            </div>
          )}

          <AnimatePresence>
            {!isMaximized && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={windowHeaderVariants({
                  app: id === "contact" ? "contact" : "default",
                })}
                onDoubleClick={() => id !== "contact" && maximizeApp(id)}
              >
                <WindowControls id={id} allowMaximize={id !== "contact"} />

                <div className="flex-1 text-center font-mono text-xs tracking-widest text-zinc-400 font-medium uppercase">
                  {TITLE_MAP[id]}
                </div>
                <div className="w-16" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className={windowContentVariants({ type: contentType })}
          >
            <motion.div
              initial={false}
              animate={{ y: isMaximized ? 20 : 0, opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className={windowTitleVariants({ type: contentType })}>
                {TITLE_MAP[id]}
              </h2>

              {id === "about" ? (
                <AboutApp />
              ) : id === "contact" ? (
                <ContactApp />
              ) : id === "projects" ? (
                <ProjectsApp />
              ) : (
                <div className="space-y-4">
                  <p>Welcome to the {TITLE_MAP[id]} section.</p>
                  <p className="text-zinc-500">
                    (The real content for this tab will be added here soon...)
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
