module.exports = {

"[project]/src/components/json-ld.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>JSONLD)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$client$2d$only$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function JSONLD({ schemaData }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const newJsonLDSript = document.createElement('script');
        newJsonLDSript.type = 'application/ld+json';
        newJsonLDSript.textContent = JSON.stringify(schemaData);
        const oldJsonLDScript = document.querySelector('script[type="application/ld+json"]');
        if (!!oldJsonLDScript) {
            oldJsonLDScript.remove();
        }
        document.head.appendChild(newJsonLDSript);
    }, [
        schemaData
    ]);
    return null;
}
}}),

};

//# sourceMappingURL=src_components_json-ld_tsx_cafd7722._.js.map