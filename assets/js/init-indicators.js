document.addEventListener('DOMContentLoaded', () => {
    // Helper to format numbers like 1.845,00
    const formatNum = (num, minFrac = 2, maxFrac = 2) => {
        return num.toLocaleString('id-ID', { minimumFractionDigits: minFrac, maximumFractionDigits: maxFrac });
    };

    // Helper to extract region key from openModal call
    const extractRegion = (onclickAttr) => {
        const match = onclickAttr.match(/openModal\s*\(\s*['"][^'"]+['"]\s*,\s*['"]([^'"]+)['"]/);
        return match ? match[1] : null;
    };

    // Extract the latest valid value and its corresponding month-year string
    const getLatestMonthlyData = (tahunan) => {
        const monthsStr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        let latestVal = null;
        let latestLabel = '-';

        // Check 2025 and 2026 arrays exactly as structured
        ['2025', '2026'].forEach(year => {
            if (tahunan && tahunan[year]) {
                tahunan[year].forEach((val, idx) => {
                    if (val !== null && val !== undefined && val !== 0) {
                        latestVal = val;
                        latestLabel = `${monthsStr[idx]} ${year}`;
                    }
                });
            }
        });
        return { val: latestVal, label: latestLabel };
    };

    const updateEkonomi = (card, region) => {
        if (typeof dataEkonomi !== 'undefined' && dataEkonomi.wilayah[region]) {
            const arr = dataEkonomi.wilayah[region].tahunan;
            const tahunArr = dataEkonomi.tahun;
            if (arr && arr.length > 0) {
                const val = arr[arr.length - 1];
                const year = tahunArr[tahunArr.length - 1];
                const valEl = card.querySelector('.indikator-value');
                const dateEl = card.querySelector('.indikator-date');
                if (valEl) valEl.innerHTML = `${formatNum(val)}%`;
                if (dateEl) dateEl.innerText = year;
            }
        }
    };

    const updatePdrb = (card, region) => {
        if (typeof dataPdrb !== 'undefined' && dataPdrb[region]) {
            const arr = dataPdrb[region];
            if (arr && arr.length > 0) {
                const val = arr[arr.length - 1];
                const valEl = card.querySelector('.indikator-value');
                const dateEl = card.querySelector('.indikator-date');
                if (valEl) valEl.innerHTML = `${formatNum(val, 0, 0)}<br><span>Ribu Rupiah</span>`;
                if (dateEl) dateEl.innerText = '2025';
            }
        }
    };

    // Generic updater for monthly structured data (inflasi, ekspor, impor, wisman)
    const updateMonthly = (card, region, dataObj, unitHtml, formatConfig) => {
        if (typeof dataObj !== 'undefined' && dataObj.wilayah && dataObj.wilayah[region]) {
            const { val, label } = getLatestMonthlyData(dataObj.wilayah[region].tahunan);
            const valEl = card.querySelector('.indikator-value');
            const dateEl = card.querySelector('.indikator-date');
            if (val !== null) {
                if (valEl && formatConfig) {
                    valEl.innerHTML = `${formatNum(val, formatConfig.min, formatConfig.max)}<br><span>${unitHtml}</span>`;
                }
                if (dateEl) dateEl.innerText = label;
            }
        }
    };

    // Main Loop
    const cards = document.querySelectorAll('.indikator-card');
    cards.forEach(card => {
        const onclickAttr = card.getAttribute('onclick');
        if (!onclickAttr) return;

        const region = extractRegion(onclickAttr) || 'kepulauan_riau';

        if (onclickAttr.includes("'ekonomi'")) updateEkonomi(card, region);
        if (onclickAttr.includes("'pdrb'")) updatePdrb(card, region);
        if (onclickAttr.includes("'inflasi'")) updateMonthly(card, region, typeof dataInflasi !== 'undefined' ? dataInflasi : undefined, 'persen', { min: 2, max: 2 });
        if (onclickAttr.includes("'wisman'")) updateMonthly(card, region, typeof dataWisman !== 'undefined' ? dataWisman : undefined, '', { min: 0, max: 0 });

        // Ekspor / Impor are only shown for province
        if (region === 'kepulauan_riau') {
            if (onclickAttr.includes("'ekspor'")) updateMonthly(card, region, typeof dataEkspor !== 'undefined' ? dataEkspor : undefined, 'Juta USD', { min: 2, max: 2 });
            if (onclickAttr.includes("'impor'")) updateMonthly(card, region, typeof dataImpor !== 'undefined' ? dataImpor : undefined, 'Juta USD', { min: 2, max: 2 });
        }
    });
});
