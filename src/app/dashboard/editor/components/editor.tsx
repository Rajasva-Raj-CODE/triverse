"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import "tui-image-editor/dist/tui-image-editor.css";

export default function EditorClient() {
    const editorRef = useRef<HTMLDivElement>(null);
    const imageEditorInstanceRef = useRef<any>(null);
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get("img") || "/images/fallback.jpg";

    useEffect(() => {
        import("tui-image-editor").then((module) => {
            const ImageEditor = module.default;

            imageEditorInstanceRef.current = new ImageEditor(editorRef.current!, {
                includeUI: {
                    loadImage: {
                        path: imageUrl,
                        name: "SelectedImage",
                    },
                    theme: {},
                    menu: ["crop", "flip", "rotate", "draw", "shape", "icon", "text", "filter"],
                    initMenu: "",
                    uiSize: {
                        width: "100%",
                        height: "100vh",
                    },
                    menuBarPosition: "left",
                },
                cssMaxWidth: 9999,
                cssMaxHeight: 9999,
                selectionStyle: {
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                },
            });
        });

        return () => {
            if (imageEditorInstanceRef.current) {
                imageEditorInstanceRef.current.destroy();
                imageEditorInstanceRef.current = null;
            }
        };
    }, [imageUrl]);

    return (
        <div className="editor-wrapper">
            <div ref={editorRef} className="editor-container" />

            <style>{`
        /* Remove default margin/padding and scroll */
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        /* Outer wrapper */
        .editor-wrapper {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        /* TUI container */
        .editor-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Hide the Toast UI header */
        .tui-image-editor-header {
          display: none !important;
        }

        /* Limit image editor to screen width/height */
        .tui-image-editor {
          width: 100% !important;
          height: 100% !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          overflow: hidden !important;
        }

        .tui-image-editor-canvas-container {
          max-width: 1000px !important;
          display: flex !important;
          justify-content: center !important;
          margin: auto !important;
          max-height: 90% !important;
          overflow: hidden !important;
          scroll: hidden !important;
        }

        /* Optional: prevent toolbar overflow */
        .tui-image-editor-menu {
          max-width: 100%;
          overflow-x: hidden !important;
        }
        // * {
        //   scrollbar-width: none !important;
        //   -ms-overflow-style: none !important;
        // }
        //
        // *::-webkit-scrollbar {
        //   display: none !important;
        // }
            
      `}</style>
        </div>
    );
}
