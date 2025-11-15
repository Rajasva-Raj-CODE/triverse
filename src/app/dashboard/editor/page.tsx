import { Suspense } from "react";
import EditorClient from "./components/editor";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading Editor...</div>}>
            <EditorClient />
        </Suspense>
    );
}
