Chart.register(ChartDataLabels);
let modalChartInstance = null;
const isMobile = () => window.innerWidth <= 767;
const labelSize = () => isMobile() ? 11 : 20;
const labelSizeSm = () => isMobile() ? 10 : 13;

const indicatorInfo = {
  ekonomi: {
    def: "Indikator ekonomi makro yang menggambarkan seberapa jauh keberhasilan pembangunan suatu daerah dalam periode waktu tertentu",
    img: "assets/img/pertumbuhan ekonomi.jpg",
    insight: (rn) =>
      `Pertumbuhan ekonomi di ${rn} meningkat pada tahun 2025 yaitu sebesar 6,94%.`,
  },
  tpt: {
    def: "Persentase jumlah pengangguran terhadap jumlah angkatan kerja",
    img: "assets/img/TPT.jpg",
    insight: (rn) => `TPT menunjukkan tren menurun dari 2021 hingga 2024.`,
  },
  pdrb: {
    def: "Nilai PDRB dibagi jumlah penduduk dalam suatu wilayah pada periode tertentu",
    img: "assets/img/PDRB perkapita.jpg",
    insight: (rn) =>
      `PDRB per kapita ${rn} meningkat dari tahun 2020 ke tahun 2025.`,
  },
  ipm: {
    def: "Indikator yang mengukur kualitas hidup penduduk berdasarkan kesehatan, pendidikan, dan standar hidup layak.",
    img: "assets/img/IPM.jpg",
    insight: (rn) =>
      `IPM di ${rn} meningkat dari tahun ke tahun yang menunjukkan perbaikan berkelanjutan dalam kualitas hidup masyarakat.`,
  },
  aps: {
    def: "Persentase penduduk usia sekolah SMA/SMK yang sedang menempuh pendidikan tingkat menengah atas.",
    img: "assets/img/APS.jpg",
    insight: (rn) =>
      `Angka partisipasi sekolah (APS) SMA/SMK (16-18 tahun) di ${rn} semakin meningkat.`,
  },
  ipg: {
    def: "Indikator yang mengukur kesetaraan capaian pembangunan manusia antara laki-laki dan perempuan.",
    img: "assets/img/IPG.jpeg",
    insight: (rn) =>
      `IPG di ${rn} menunjukkan tren meningkat yang menunjukkan kesetaraan capaian pembangunan antara laki-laki dan perempuan semakin membaik`,
  },
  kemiskinan: {
    def: "Persentase penduduk yang memiliki pengeluaran per kapita sebulan kurang dari garis kemiskinan.",
    img: "assets/img/kemiskinan.jpg",
    insight: (rn) =>
      `Pada September 2025, jumlah penduduk miskin (penduduk dengan pengeluaran per kapita per bulan di bawah Garis Kemiskinan) di Provinsi Kepulauan Riau mencapai 114,55 ribu orang (4,26 persen), berkurang 2,7 ribu orang dibandingkan dengan kondisi Maret 2025 yang sebesar 117,28 ribu orang (4,44 persen)`,
  },
  gini: {
    def: "Indikator yang menunjukkan tingkat ketimpangan pengeluaran secara menyeluruh",
    img: "assets/img/giniratio.jpeg",
    insight: (rn) =>
      `Gini Ratio Kepulauan Riau pada September 2025 sebesar 0,385.`,
  },
  inflasi: {
    def: "Persentase kenaikan harga barang dan jasa secara umum dan terus-menerus dalam periode tertentu.",
    img: "assets/img/inflasi.jpeg",
    insight: (rn) =>
      `Pada Februari 2026, inflasi di Kepulauan Riau sebesar 3,54 persen.`,
  },
  penduduk: {
    def: "Total orang yang tinggal dan menetap di suatu wilayah pada waktu tertentu.",
    img: "assets/img/penduduk.jpeg",
    insight: (rn) => `Jumlah penduduk pada tahun 2020 sebesar 2.064.564 jiwa.`,
  },
  wisman: {
    def: "Jumlah kunjungan wisatawan asing ke suatu wilayah dalam periode tertentu.",
    img: "assets/img/wisata.jpeg",
    insight: (rn) => `Kunjungan wisman di ${rn} meningkat diakhir tahun 2025`,
  },
  ekspor: {
    def: "Nilai barang dan jasa yang dijual ke luar negeri dalam periode tertentu.",
    img: "assets/img/ekspor.png",
    insight: (rn) =>
      `Nilai ekspor ${rn} pada Januari 2026 mencapai US$2,02 miliar.`,
  },
  impor: {
    def: "Nilai barang dan jasa yang dibeli dari luar negeri dalam periode tertentu.",
    img: "assets/img/impor.jpeg",
    insight: (rn) =>
      `Nilai impor di ${rn} pada Januari 2026 mencapai US$2,07 miliar.`,
  },
};

function openModal(
  type,
  regionKey = "kepulauan_riau",
  regionName = "Kepulauan Riau",
) {
  const overlay = document.getElementById("modalOverlay");
  const title = document.getElementById("modalTitle");
  const ctx = document.getElementById("modalChart");

  const imgEl = document.getElementById("modalImg");
  const defEl = document.getElementById("modalDef");
  const insEl = document.getElementById("modalInsight");

  const info = indicatorInfo[type];
  if (info && imgEl && defEl && insEl) {
    imgEl.src = info.img || "assets/img/potensi.png";
    defEl.textContent = info.def || "-";
    insEl.textContent =
      typeof info.insight === "function" ? info.insight(regionName) : "-";
  }

  if (modalChartInstance) {
    modalChartInstance.destroy();
    modalChartInstance = null;
  }

  const gradientFill = ctx.getContext("2d").createLinearGradient(0, 0, 0, 300);
  gradientFill.addColorStop(0, "rgba(124, 58, 237, 0.15)");
  gradientFill.addColorStop(1, "rgba(13, 148, 136, 0.02)");
  const gradientLine = ctx
    .getContext("2d")
    .createLinearGradient(0, 0, ctx.width, 0);
  gradientLine.addColorStop(0, "#7c3aed");
  gradientLine.addColorStop(1, "#0d9488");

  const charts = {
    ekonomi: () => {
      title.textContent = `Pertumbuhan Ekonomi ${regionName} (%)`;
      let dataArr = [];
      let labelsArr = dataEkonomi.tahun;

      const d = dataEkonomi.wilayah[regionKey];
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }

      return {
        type: "bar",
        data: {
          labels: labelsArr,
          datasets: [
            {
              label: "Pertumbuhan Ekonomi (%)",
              data: dataArr,
              backgroundColor: "rgba(59,130,246,0.7)",
              borderRadius: 6,
            },
          ],
        },
        options: barOptsDecimal("%"),
      };
    },
    pdrb: () => {
      title.textContent = `PDRB per Kapita ${regionName} (Ribu Rupiah)`;
      let dataArr = [];
      if (dataPdrb[regionKey]) {
        dataArr = dataPdrb[regionKey];
      }
      return {
        type: "line",
        data: {
          labels: [2020, 2021, 2022, 2023, 2024, 2025],
          datasets: [
            {
              label: "PDRB per Kapita",
              data: dataArr,
              borderColor: "#10b981",
              backgroundColor: "rgba(16,185,129,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#10b981",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            datalabels: {
              align: "top",
              offset: 6,
              formatter: (v) => v.toLocaleString("id-ID"),
              font: { weight: "bold", size: labelSize() },
              color: "#1e293b",
            },
          },
          scales: {
            y: { display: false, grace: "30%" },
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { font: { size: 11 } },
            },
          },
          layout: { padding: { top: isMobile() ? 20 : 30, bottom: 10, left: isMobile() ? 10 : 40, right: isMobile() ? 10 : 20 } },
        },
      };
    },
    ipm: () => {
      title.textContent = `Indeks Pembangunan Manusia (IPM) ${regionName}`;
      const d = dataIpm.wilayah[regionKey];
      let dataArr = [];
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }
      return {
        type: "line",
        data: {
          labels: dataIpm.tahun,
          datasets: [
            {
              label: "IPM",
              data: dataArr,
              borderColor: "#7c3aed",
              backgroundColor: "rgba(124,58,237,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#7c3aed",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        },
        options: lineOpts(""),
      };
    },
    ipg: () => {
      title.textContent = `Indeks Pembangunan Gender (IPG) ${regionName}`;
      const d = dataIpg.wilayah[regionKey];
      let dataArr = [];
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }
      return {
        type: "line",
        data: {
          labels: dataIpg.tahun,
          datasets: [
            {
              label: "IPG",
              data: dataArr,
              borderColor: "#ec4899",
              backgroundColor: "rgba(236,72,153,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#ec4899",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        },
        options: lineOpts(""),
      };
    },
    tpt: () => {
      title.textContent = `Tingkat Pengangguran Terbuka (TPT) ${regionName}`;
      const d = dataTpt.wilayah[regionKey];
      let dataArr = [];
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }
      return {
        type: "bar",
        data: {
          labels: dataTpt.tahun,
          datasets: [
            {
              label: "TPT (%)",
              data: dataArr,
              backgroundColor: "rgba(239,68,68,0.7)",
              borderRadius: 6,
            },
          ],
        },
        options: barOpts("%"),
      };
    },
    aps: () => {
      title.textContent = `Angka Partisipasi Sekolah (APS) SMA/SMK ${regionName} (%)`;
      const d = dataAps.wilayah[regionKey];
      let dataArr = [];
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }
      return {
        type: "line",
        data: {
          labels: dataAps.tahun,
          datasets: [
            {
              label: "APS",
              data: dataArr,
              borderColor: "#0d9488",
              backgroundColor: "rgba(13,148,136,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#0d9488",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              spanGaps: true,
            },
          ],
        },
        options: lineOpts(""),
      };
    },
    kemiskinan: () => {
      title.textContent = `Angka Kemiskinan ${regionName} (%)`;
    
      const d = dataKemiskinan.wilayah[regionKey];
      let dataArr = [];
      let labelsArr = dataKemiskinan.tahun; // default tahunan
    
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }
    
      // Jika Provinsi Kepulauan Riau, ganti label sesuai data yang tersedia
      if (regionKey === "kepulauan_riau") {
        labelsArr = [
          "Sep 2022",
          "Mar 2023",
          "Mar 2024",
          "Sep 2024",
          "Mar 2025",
          "Sep 2025",
        ];
      }
    
      return {
        type: "bar",
        data: {
          labels: labelsArr,
          datasets: [
            {
              label: "Kemiskinan",
              data: dataArr,
              backgroundColor: "rgba(245,158,11,0.7)",
              borderRadius: 6,
            },
          ],
        },
        options: barOpts(""),
      };
    },
    gini: () => {
      title.textContent = `Gini Ratio ${regionName} (Indeks)`;
      const d = dataGini.wilayah[regionKey];
      let dataArr = [];
      if (d && d.tahunan) {
        dataArr = d.tahunan;
      }
      return {
        type: "line",
        data: {
          labels: dataGini.tahun,
          datasets: [
            {
              label: "Gini Ratio",
              data: dataArr,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245,158,11,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#f59e0b",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        },
        options: lineOpts(""),
      };
    },
    penduduk: () => {
      title.textContent = `Jumlah Penduduk ${regionName} (Sensus Penduduk)`;
      let dataArr = [];
      if (dataPenduduk[regionKey]) {
        dataArr = dataPenduduk[regionKey];
      }
      return {
        type: "bar",
        data: {
          labels: ["SP 2010", "SP 2020"],
          datasets: [
            {
              label: "Jumlah Penduduk (jiwa)",
              data: dataArr,
              backgroundColor: ["rgba(59,130,246,0.7)", "rgba(16,185,129,0.7)"],
              borderRadius: 8,
              barThickness: 60,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: "end",
              align: "right",
              formatter: (v) => v.toLocaleString("id-ID") + " jiwa",
              font: { weight: "bold", size: labelSize() },
              color: "#1e293b",
            },
          },
          scales: {
            x: { display: false },
            y: { grid: { display: false }, border: { display: false } },
          },
          layout: { padding: { right: isMobile() ? 50 : 150 } },
        },
      };
    },
    inflasi: () => {
      title.textContent = `Tingkat Inflasi Year-on-Year (Y-on-Y) `;

      let dataArr = [];
      // Base labels array spanning Jan 25 to Dec 26. We clip it dynamically below based on actual data length.
      let labelsArr = [
        "Jan 25",
        "Feb 25",
        "Mar 25",
        "Apr 25",
        "Mei 25",
        "Jun 25",
        "Jul 25",
        "Ags 25",
        "Sep 25",
        "Okt 25",
        "Nov 25",
        "Des 25",
        "Jan 26",
        "Feb 26",
        "Mar 26",
        "Apr 26",
        "Mei 26",
        "Jun 26",
        "Jul 26",
        "Ags 26",
        "Sep 26",
        "Okt 26",
        "Nov 26",
        "Des 26",
      ];

      if (
        typeof dataInflasi !== "undefined" &&
        dataInflasi.wilayah &&
        dataInflasi.wilayah[regionKey]
      ) {
        const d = dataInflasi.wilayah[regionKey].tahunan;
        if (d) {
          let arr2025 = d["2025"] ? d["2025"].filter((v) => v !== null) : [];
          let arr2026 = d["2026"] ? d["2026"].filter((v) => v !== null) : [];
          dataArr = [...arr2025, ...arr2026];
        }
      }

      if (dataArr.length === 0) {
        // Safe Fallback if dataInflasi is totally missing
        dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      // Match label length to actual data points
      labelsArr = labelsArr.slice(0, dataArr.length);

      return {
        type: "line",
        data: {
          labels: labelsArr,
          datasets: [
            {
              label: "Inflasi Y-on-Y (%)",
              data: dataArr,
              borderColor: gradientLine,
              backgroundColor: gradientFill,
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#7c3aed",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointHoverRadius: 7,
            },
          ],
        },
        options: lineOpts("%"),
      };
    },
    wisman: () => {
      title.textContent = `Jumlah Kunjungan Wisatawan ${regionName} (kunjungan)`;
      let dataArr = [];
      let labelsArr = [
        "Jan 25",
        "Feb 25",
        "Mar 25",
        "Apr 25",
        "Mei 25",
        "Jun 25",
        "Jul 25",
        "Ags 25",
        "Sep 25",
        "Okt 25",
        "Nov 25",
        "Des 25",
        "Jan 26",
        "Feb 26",
        "Mar 26",
        "Apr 26",
        "Mei 26",
        "Jun 26",
        "Jul 26",
        "Ags 26",
        "Sep 26",
        "Okt 26",
        "Nov 26",
        "Des 26",
      ];

      if (
        typeof dataWisman !== "undefined" &&
        dataWisman.wilayah &&
        dataWisman.wilayah[regionKey]
      ) {
        const d = dataWisman.wilayah[regionKey].tahunan;
        if (d) {
          let arr2025 = d["2025"] ? d["2025"].filter((v) => v !== null) : [];
          let arr2026 = d["2026"] ? d["2026"].filter((v) => v !== null) : [];
          dataArr = [...arr2025, ...arr2026];
        }
      }

      if (dataArr.length === 0) {
        dataArr = [0];
      }
      labelsArr = labelsArr.slice(0, dataArr.length);

      return {
        type: "bar",
        data: {
          labels: labelsArr,
          datasets: [
            {
              label: "Kunjungan Wisman",
              data: dataArr,
              backgroundColor: "rgba(22, 163, 74, 0.75)",
              borderRadius: 4,
              /* moved to plugins */
            },
            {
              type: "line",
              label: "Trend",
              data: dataArr,
              borderColor: "#166534",
              backgroundColor: "#166534",
              borderWidth: 2,
              pointRadius: 0,
              datalabels: { display: false },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: "bottom" },
            datalabels: {
              display: true,
              clip: false,
              align: "top",
              anchor: "end",
              offset: 2,
              formatter: (v) =>
                v === 0 || v === null ? "" : v.toLocaleString("id-ID"),
              color: "#1e293b",
              font: { weight: "bold", size: labelSizeSm() },
            },
          },
          scales: {
            x: { grid: { display: false } },
            y: { display: false },
          },
          layout: { padding: { top: 40, bottom: 20 } },
        },
      };
    },
    ekspor: () => {
      title.textContent = `Nilai Ekspor ${regionName} (Juta USD)`;
      let dataArr = [];
      let labelsArr = [
        "Jan 25",
        "Feb 25",
        "Mar 25",
        "Apr 25",
        "Mei 25",
        "Jun 25",
        "Jul 25",
        "Ags 25",
        "Sep 25",
        "Okt 25",
        "Nov 25",
        "Des 25",
        "Jan 26",
        "Feb 26",
        "Mar 26",
        "Apr 26",
        "Mei 26",
        "Jun 26",
        "Jul 26",
        "Ags 26",
        "Sep 26",
        "Okt 26",
        "Nov 26",
        "Des 26",
      ];

      if (
        typeof dataEkspor !== "undefined" &&
        dataEkspor.wilayah &&
        dataEkspor.wilayah[regionKey]
      ) {
        const d = dataEkspor.wilayah[regionKey].tahunan;
        if (d) {
          let arr2025 = d["2025"] ? d["2025"].filter((v) => v !== null) : [];
          let arr2026 = d["2026"] ? d["2026"].filter((v) => v !== null) : [];
          dataArr = [...arr2025, ...arr2026];
        }
      }

      if (dataArr.length === 0) {
        const insEl = document.getElementById("modalInsight");
        if (insEl) insEl.textContent = "Data belum tersedia untuk wilayah ini.";
        return {
          type: "bar",
          data: {
            labels: ["-"],
            datasets: [
              {
                label: "Ekspor (Juta USD)",
                data: [0],
                backgroundColor: "rgba(88,80,141,0.3)",
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: { display: false },
            },
            scales: { y: { display: false }, x: { grid: { display: false } } },
          },
        };
      }

      labelsArr = labelsArr.slice(0, dataArr.length);
      return {
        type: "line",
        data: {
          labels: labelsArr,
          datasets: [
            {
              label: "Ekspor (Juta USD)",
              data: dataArr,
              borderColor: "#58508d",
              backgroundColor: "rgba(88,80,141,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#58508d",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        },
        options: lineOpts(""),
      };
    },
    impor: () => {
      title.textContent = `Nilai Impor ${regionName} (Juta USD)`;
      let dataArr = [];
      let labelsArr = [
        "Jan 25",
        "Feb 25",
        "Mar 25",
        "Apr 25",
        "Mei 25",
        "Jun 25",
        "Jul 25",
        "Ags 25",
        "Sep 25",
        "Okt 25",
        "Nov 25",
        "Des 25",
        "Jan 26",
        "Feb 26",
        "Mar 26",
        "Apr 26",
        "Mei 26",
        "Jun 26",
        "Jul 26",
        "Ags 26",
        "Sep 26",
        "Okt 26",
        "Nov 26",
        "Des 26",
      ];

      if (
        typeof dataImpor !== "undefined" &&
        dataImpor.wilayah &&
        dataImpor.wilayah[regionKey]
      ) {
        const d = dataImpor.wilayah[regionKey].tahunan;
        if (d) {
          let arr2025 = d["2025"] ? d["2025"].filter((v) => v !== null) : [];
          let arr2026 = d["2026"] ? d["2026"].filter((v) => v !== null) : [];
          dataArr = [...arr2025, ...arr2026];
        }
      }

      if (dataArr.length === 0) {
        const insEl = document.getElementById("modalInsight");
        if (insEl) insEl.textContent = "Data belum tersedia untuk wilayah ini.";
        return {
          type: "bar",
          data: {
            labels: ["-"],
            datasets: [
              {
                label: "Impor (Juta USD)",
                data: [0],
                backgroundColor: "rgba(255,99,97,0.3)",
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: { display: false },
            },
            scales: { y: { display: false }, x: { grid: { display: false } } },
          },
        };
      }

      labelsArr = labelsArr.slice(0, dataArr.length);
      return {
        type: "line",
        data: {
          labels: labelsArr,
          datasets: [
            {
              label: "Impor (Juta USD)",
              data: dataArr,
              borderColor: "#ff6361",
              backgroundColor: "rgba(255,99,97,0.1)",
              fill: true,
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "#ff6361",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
            },
          ],
        },
        options: lineOpts(""),
      };
    },
  };

  if (charts[type]) {
    const cfg = charts[type]();
    modalChartInstance = new Chart(ctx, cfg);
    overlay.classList.add("active");
  }
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  if (modalChartInstance) {
    modalChartInstance.destroy();
    modalChartInstance = null;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function barOpts(suffix) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (v) => v.toLocaleString("id-ID") + suffix,
        font: { weight: "bold", size: labelSize() },
        color: "#1e293b",
      },
    },
    scales: {
      y: { display: false, grace: "30%" },
      x: { grid: { display: false }, border: { display: false } },
    },
    layout: { padding: { top: isMobile() ? 24 : 40, right: isMobile() ? 10 : 40, left: isMobile() ? 6 : 20 } },
  };
}
function barOptsDecimal(suffix) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (v) =>
          v.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + suffix,
        font: { weight: "bold", size: labelSize() },
        color: "#1e293b",
      },
    },
    scales: {
      y: { display: false, grace: "30%" },
      x: { grid: { display: false }, border: { display: false } },
    },
    layout: { padding: { top: isMobile() ? 24 : 40, right: isMobile() ? 10 : 40, left: isMobile() ? 6 : 20 } },
  };
}
function lineOpts(suffix) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        align: "top",
        offset: 6,
        formatter: (v) => v.toLocaleString("id-ID") + suffix,
        font: { weight: "bold", size: labelSize() },
        color: "#1e293b",
      },
    },
    scales: {
      y: { display: false, grace: "30%" },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
    layout: { padding: { top: isMobile() ? 24 : 40, bottom: 10, right: isMobile() ? 10 : 40, left: isMobile() ? 6 : 30 } },
  };
}
