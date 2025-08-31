(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/json-ld.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>JSONLD)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$client$2d$only$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function JSONLD({ schemaData }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JSONLD.useEffect": ()=>{
            const newJsonLDSript = document.createElement('script');
            newJsonLDSript.type = 'application/ld+json';
            newJsonLDSript.textContent = JSON.stringify(schemaData);
            const oldJsonLDScript = document.querySelector('script[type="application/ld+json"]');
            if (!!oldJsonLDScript) {
                oldJsonLDScript.remove();
            }
            document.head.appendChild(newJsonLDSript);
        }
    }["JSONLD.useEffect"], [
        schemaData
    ]);
    return null;
}
_s(JSONLD, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = JSONLD;
var _c;
__turbopack_context__.k.register(_c, "JSONLD");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_json-ld_tsx_81de360e._.js.map