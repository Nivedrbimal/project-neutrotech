const def = getId();
function getId() {
    // ---------- Supporter ----------
    const isNum = v => v !== null && v !== '' && !Number.isNaN(Number(v));
    const toNum = v => isNum(v) ? Number(v) : null;
    const known = x => x !== null && x !== undefined && !isNaN(x);
    const deg2rad = d => d * Math.PI / 180;
    const rad2deg = r => r * 180 / Math.PI;
    function fmt(v) { v = Number(v); if (isNaN(v)) return 0; return Number(v.toFixed(6)); }

    return {
        isNum, toNum, known, deg2rad, rad2deg, fmt
    }
}
