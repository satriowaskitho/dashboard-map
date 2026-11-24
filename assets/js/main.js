// =============================================
// Dashboard Indikator Strategis Kepulauan Riau
// Main Logic — Uses BPS template style-N classes
// =============================================

// State
let data = null;
let selectedRegion = 'kepri';
let selectedIndicator = null;

// Indicator icon SVGs (inline for marquee)
const INDICATOR_ICONS = {
  pertumbuhan_ekonomi: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  tpt: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  pdrb_per_kapita: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg>',
  ipm: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>',
  aps: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  ipg: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>',
  kemiskinan: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
  gini: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  inflasi: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E37F2A" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>'
};

// ------- Init -------
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

async function loadData() {
  try {
    const response = await fetch('./assets/data/indicators.json');
    data = await response.json();
    initDropdown();
    renderMarqueeIcons();
  } catch (error) {
    console.error('Gagal memuat data:', error);
  }
}

// ------- Dropdown -------
function initDropdown() {
  const select = document.getElementById('region-select');
  if (!select) return;

  select.innerHTML = '';
  data.regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region.id;
    option.textContent = region.name;
    if (region.id === selectedRegion) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    selectedRegion = e.target.value;
    if (selectedIndicator) {
      renderDetailCard(selectedIndicator);
    }
  });
}

// ------- Marquee Indicator Icons -------
function renderMarqueeIcons() {
  const container = document.getElementById('indicators-marquee');
  if (!container) return;

  const indicatorKeys = Object.keys(data.indicator_meta);

  // Build icon items HTML (duplicated twice for marquee effect)
  const buildIcons = () => indicatorKeys.map(key => {
    const meta = data.indicator_meta[key];
    return `
      <div style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 16px;cursor:pointer;min-width:120px;text-align:center;transition:transform 0.3s;"
           onclick="selectIndicator('${key}')" data-indicator="${key}" class="indicator-marquee-item">
        <div style="width:72px;height:72px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);margin-bottom:8px;">
          ${INDICATOR_ICONS[key] || ''}
        </div>
        <span style="color:#fff;font-size:0.75rem;font-weight:500;max-width:100px;line-height:1.3;">${meta.name}</span>
      </div>
    `;
  }).join('');

  // Two groups for infinite marquee feel
  container.innerHTML = `
    <div class="style-73">${buildIcons()}</div>
    <div class="style-92">${buildIcons()}</div>
  `;
}

// ------- Select Indicator -------
function selectIndicator(indicatorKey) {
  selectedIndicator = indicatorKey;

  // Visual feedback on selected icon
  document.querySelectorAll('.indicator-marquee-item').forEach(el => {
    const isActive = el.dataset.indicator === indicatorKey;
    const meta = data.indicator_meta[indicatorKey];
    const isPair = meta.pair && el.dataset.indicator === meta.pair;

    if (isActive || isPair) {
      el.querySelector('div').style.boxShadow = '0 0 0 4px #fff, 0 0 0 8px rgba(255,255,255,0.3)';
      el.style.transform = 'scale(1.1)';
    } else {
      el.querySelector('div').style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      el.style.transform = 'scale(1)';
    }
  });

  renderDetailCard(indicatorKey);

  // Scroll to detail
  const detailContainer = document.getElementById('detail-card-container');
  if (detailContainer) {
    setTimeout(() => {
      detailContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

// ------- Render Detail Card -------
function renderDetailCard(indicatorKey) {
  const container = document.getElementById('detail-card-container');
  if (!container) return;

  const meta = data.indicator_meta[indicatorKey];
  const region = data.regions.find(r => r.id === selectedRegion);
  if (!region) return;

  const indicators = [indicatorKey];
  if (meta.pair) indicators.push(meta.pair);

  container.innerHTML = `
    <div class="style-133">
      ${indicators.map(key => {
    const indMeta = data.indicator_meta[key];
    const indData = region.indicators[key];
    const trendUp = indData.trend > 0;

    const invertedIndicators = ['kemiskinan', 'tpt', 'gini', 'inflasi'];
    const isInverted = invertedIndicators.includes(key);
    const isPositiveTrend = isInverted ? !trendUp : trendUp;

    return `
          <div style="text-align:left;width:100%;padding:16px 0;border-bottom:1px solid #eee;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="width:48px;height:48px;background:#FDF3EA;border-radius:12px;display:flex;align-items:center;justify-content:center;">
                ${INDICATOR_ICONS[key] ? INDICATOR_ICONS[key].replace('width="48"', 'width="24"').replace('height="48"', 'height="24"') : ''}
              </div>
              <span style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.5px;color:#6c757d;font-weight:600;">${indMeta.name}</span>
            </div>
            <div style="font-size:2.5rem;font-weight:800;color:#212529;line-height:1;">${formatValue(indData.value, key)}</div>
            <div style="font-size:0.85rem;color:#6c757d;margin:4px 0 8px;">${indMeta.scale}</div>
            <span style="display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:800px;font-size:0.8rem;font-weight:600;background:${isPositiveTrend ? 'rgba(40,167,69,0.1)' : 'rgba(220,53,69,0.1)'};color:${isPositiveTrend ? '#28A745' : '#DC3545'}">
              ${trendUp ? '▲' : '▼'} ${trendUp ? '+' : ''}${indData.trend}${key === 'gini' ? '' : (indData.unit ? ' ' + indData.unit : '')} YoY
            </span>
            <div style="font-size:0.8rem;color:#6c757d;margin-top:8px;">Data Tahun ${indData.year} — ${region.name}</div>
            <div style="font-size:0.8rem;color:#adb5bd;margin-top:8px;border-top:1px solid #eee;padding-top:8px;">${indMeta.description}</div>
          </div>
        `;
  }).join('')}
    </div>
  `;
}

// ------- Format Value -------
function formatValue(value, key) {
  if (key === 'gini') return value.toFixed(3);
  if (key === 'pdrb_per_kapita') return value.toFixed(2);
  return value.toFixed(2);
}
