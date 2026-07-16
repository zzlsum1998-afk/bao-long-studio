
    const sectorColors = {
      Agriculture: getComputedStyle(document.documentElement).getPropertyValue('--agri').trim(),
      Technology: getComputedStyle(document.documentElement).getPropertyValue('--tech').trim(),
      Finance: getComputedStyle(document.documentElement).getPropertyValue('--finance').trim(),
      Energy: getComputedStyle(document.documentElement).getPropertyValue('--energy').trim(),
      Transport: getComputedStyle(document.documentElement).getPropertyValue('--transport').trim(),
      Metals: getComputedStyle(document.documentElement).getPropertyValue('--metals').trim(),
      'Real estate': getComputedStyle(document.documentElement).getPropertyValue('--realestate').trim(),
      Other: getComputedStyle(document.documentElement).getPropertyValue('--other').trim()
    };

    const datasets = [
      {
        id: 'globalInvestments',
        button: 'Global investments',
        label: 'Investment sample',
        title: 'China worldwide investments and contracts by sector',
        desc: '参考新闻图表逻辑的示例数据：国家为纵轴，年份为横轴，金额为气泡大小，行业为颜色。',
        unit: 'bn USD',
        years: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014],
        rows: ['Afghanistan','Algeria','Angola','Argentina','Australia','Brazil','Britain','Canada','Chile','Germany','Indonesia','Italy','Kazakhstan','Mexico','Poland','Portugal'],
        deals: [
          {country:'Australia', year:2007, value:8.4, sector:'Metals', title:'Mining partnership'},
          {country:'Australia', year:2009, value:4.2, sector:'Technology', title:'Infrastructure systems'},
          {country:'Australia', year:2013, value:6.6, sector:'Energy', title:'LNG cooperation'},
          {country:'Brazil', year:2007, value:3.9, sector:'Finance', title:'Development financing'},
          {country:'Brazil', year:2008, value:5.2, sector:'Energy', title:'Oil field agreement'},
          {country:'Brazil', year:2010, value:7.6, sector:'Energy', title:'Offshore support deal'},
          {country:'Brazil', year:2011, value:4.5, sector:'Energy', title:'Logistics upgrade'},
          {country:'Brazil', year:2014, value:3.2, sector:'Transport', title:'Port expansion'},
          {country:'Britain', year:2010, value:2.8, sector:'Finance', title:'Financial services stake'},
          {country:'Britain', year:2011, value:1.9, sector:'Other', title:'Urban services contract'},
          {country:'Britain', year:2012, value:2.2, sector:'Real estate', title:'Property development'},
          {country:'Canada', year:2006, value:1.6, sector:'Technology', title:'Clean tech project'},
          {country:'Canada', year:2010, value:5.8, sector:'Metals', title:'Resource investment'},
          {country:'Canada', year:2012, value:7.9, sector:'Transport', title:'Railway system deal'},
          {country:'Canada', year:2014, value:4.7, sector:'Energy', title:'Gas infrastructure'},
          {country:'Chile', year:2005, value:1.2, sector:'Metals', title:'Copper supply contract'},
          {country:'Chile', year:2009, value:4.6, sector:'Metals', title:'Mining acquisition'},
          {country:'Germany', year:2008, value:2.7, sector:'Finance', title:'Industrial loan package'},
          {country:'Germany', year:2013, value:2.1, sector:'Technology', title:'Manufacturing automation'},
          {country:'Indonesia', year:2009, value:2.5, sector:'Energy', title:'Grid expansion'},
          {country:'Indonesia', year:2011, value:3.4, sector:'Metals', title:'Nickel processing'},
          {country:'Indonesia', year:2014, value:5.3, sector:'Energy', title:'Power generation'},
          {country:'Italy', year:2008, value:1.8, sector:'Real estate', title:'Urban renewal'},
          {country:'Italy', year:2011, value:3.6, sector:'Transport', title:'Port logistics'},
          {country:'Kazakhstan', year:2007, value:2.1, sector:'Energy', title:'Pipeline services'},
          {country:'Kazakhstan', year:2010, value:6.1, sector:'Energy', title:'Oilfield contract'},
          {country:'Kazakhstan', year:2012, value:2.4, sector:'Metals', title:'Smelter upgrade'},
          {country:'Mexico', year:2012, value:3.2, sector:'Transport', title:'Urban mobility'},
          {country:'Mexico', year:2014, value:2.8, sector:'Finance', title:'Banking cooperation'},
          {country:'Poland', year:2011, value:1.5, sector:'Other', title:'Public works package'},
          {country:'Portugal', year:2011, value:2.9, sector:'Real estate', title:'Property fund entry'},
          {country:'Portugal', year:2013, value:1.7, sector:'Finance', title:'Capital participation'},
          {country:'Argentina', year:2009, value:4.0, sector:'Transport', title:'Freight corridor'},
          {country:'Argentina', year:2010, value:2.3, sector:'Agriculture', title:'Food processing'},
          {country:'Angola', year:2010, value:3.8, sector:'Energy', title:'Refinery support'},
          {country:'Angola', year:2013, value:2.6, sector:'Energy', title:'Field services'},
          {country:'Algeria', year:2006, value:1.9, sector:'Energy', title:'Drilling equipment'},
          {country:'Afghanistan', year:2014, value:2.2, sector:'Transport', title:'Road network'},
        ]
      },
      {
        id: 'creativeIndustry',
        button: 'Creative sample',
        label: 'Creative sample',
        title: 'Creative industry collaborations by category',
        desc: '更贴近设计网站语境的示例：把不同国家或地区的合作项目放到时间轴里看趋势。',
        unit: 'value',
        years: [2016,2017,2018,2019,2020,2021,2022,2023,2024],
        rows: ['Japan','South Korea','Singapore','Thailand','UK','France','Italy','USA','Canada','Australia','UAE','Brazil'],
        deals: [
          {country:'Japan', year:2017, value:2.2, sector:'Technology', title:'Interactive installation'},
          {country:'Japan', year:2021, value:4.4, sector:'Technology', title:'Spatial media platform'},
          {country:'South Korea', year:2019, value:2.6, sector:'Finance', title:'Brand investment round'},
          {country:'South Korea', year:2023, value:3.3, sector:'Technology', title:'Immersive content'},
          {country:'Singapore', year:2018, value:2.1, sector:'Finance', title:'Design innovation fund'},
          {country:'Singapore', year:2022, value:3.8, sector:'Transport', title:'Exhibition mobility system'},
          {country:'Thailand', year:2020, value:1.7, sector:'Other', title:'Cultural residency'},
          {country:'UK', year:2016, value:1.5, sector:'Real estate', title:'Creative campus'},
          {country:'UK', year:2022, value:2.9, sector:'Finance', title:'Studio financing'},
          {country:'France', year:2018, value:2.5, sector:'Real estate', title:'Museum district'},
          {country:'France', year:2024, value:3.1, sector:'Technology', title:'Digital archive'},
          {country:'Italy', year:2019, value:2.0, sector:'Transport', title:'Biennale mobility'},
          {country:'USA', year:2017, value:3.2, sector:'Technology', title:'Design software alliance'},
          {country:'USA', year:2021, value:5.2, sector:'Finance', title:'Creative venture program'},
          {country:'Canada', year:2020, value:1.8, sector:'Other', title:'Public art grant'},
          {country:'Australia', year:2018, value:2.6, sector:'Agriculture', title:'Landscape ecology lab'},
          {country:'UAE', year:2023, value:4.0, sector:'Real estate', title:'Cultural waterfront'},
          {country:'Brazil', year:2024, value:2.3, sector:'Energy', title:'Low-carbon pavilion'}
        ]
      }
    ];

    const datasetGrid = document.getElementById('datasetGrid');
    const filterGrid = document.getElementById('filterGrid');
    const chartSvg = document.getElementById('chartSvg');
    const chartStage = document.getElementById('chartStage');
    const tooltip = document.getElementById('tooltip');
    const chartTitle = document.getElementById('chartTitle');
    const chartDesc = document.getElementById('chartDesc');
    const legendBlock = document.getElementById('legendBlock');
    const sizeGuide = document.getElementById('sizeGuide');
    const countNote = document.getElementById('countNote');
    const countrySearch = document.getElementById('countrySearch');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const highlightLargeBtn = document.getElementById('highlightLargeBtn');
    const csvFile = document.getElementById('csvFile');
    const csvText = document.getElementById('csvText');
    const loadExampleBtn = document.getElementById('loadExampleBtn');
    const parseDataBtn = document.getElementById('parseDataBtn');
    const useBuiltInBtn = document.getElementById('useBuiltInBtn');
    const mappingBox = document.getElementById('mappingBox');
    const countryColumn = document.getElementById('countryColumn');
    const yearColumn = document.getElementById('yearColumn');
    const valueColumn = document.getElementById('valueColumn');
    const sectorColumn = document.getElementById('sectorColumn');
    const titleColumn = document.getElementById('titleColumn');
    const customTitle = document.getElementById('customTitle');
    const generateUploadBtn = document.getElementById('generateUploadBtn');
    const uploadStatus = document.getElementById('uploadStatus');

    let activeDataset = datasets[0];
    let activeSector = 'All';
    let highlightLarge = false;
    let searchTerm = '';
    let uploadedHeaders = [];
    let uploadedRows = [];

    function sectorsOf(dataset) {
      return ['All', ...new Set(dataset.deals.map(d => d.sector).filter(Boolean))];
    }

    function renderDatasetButtons() {
      datasetGrid.innerHTML = '';
      const list = activeDataset.id === 'uploaded' ? [activeDataset, ...datasets] : datasets;
      list.forEach(ds => {
        const btn = document.createElement('button');
        btn.className = 'dataset-btn' + (ds.id === activeDataset.id ? ' active' : '');
        btn.innerHTML = `<strong>${ds.button || ds.label || ds.title}</strong><span>${ds.desc}</span>`;
        btn.addEventListener('click', () => {
          activeDataset = ds;
          activeSector = 'All';
          searchTerm = '';
          countrySearch.value = '';
          highlightLarge = false;
          renderDatasetButtons();
          renderFilterButtons();
          renderChart();
        });
        datasetGrid.appendChild(btn);
      });
    }

    function renderFilterButtons() {
      filterGrid.innerHTML = '';
      sectorsOf(activeDataset).forEach(sec => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (sec === activeSector ? ' active' : '');
        const color = sec === 'All' ? 'rgba(45,79,73,.25)' : (sectorColors[sec] || dynamicSectorColor(sec));
        btn.innerHTML = `<strong>${sec}</strong><span>${sec === 'All' ? 'Show all sectors' : 'Filter this category only'}</span>`;
        btn.style.borderColor = sec === activeSector ? 'rgba(45,79,73,.24)' : 'rgba(35,37,31,.08)';
        btn.style.boxShadow = sec === activeSector ? `inset 0 0 0 1px ${color}33` : 'none';
        btn.addEventListener('click', () => {
          activeSector = sec;
          renderFilterButtons();
          renderChart();
        });
        filterGrid.appendChild(btn);
      });
    }

    function filteredDeals() {
      return activeDataset.deals.filter(deal => {
        const sectorOk = activeSector === 'All' || deal.sector === activeSector;
        const searchOk = !searchTerm || deal.country.toLowerCase().includes(searchTerm);
        return sectorOk && searchOk;
      });
    }

    function dynamicSectorColor(name) {
      const fallback = ['#8d8550','#d8c089','#d94a38','#ef9a43','#7fc2b9','#6e79b7','#d59c91','#75624d','#7fa88e','#b08f74'];
      let hash = 0;
      const s = String(name || 'Other');
      for (let i = 0; i < s.length; i++) hash = ((hash << 5) - hash) + s.charCodeAt(i);
      return fallback[Math.abs(hash) % fallback.length];
    }

    function renderLegend() {
      legendBlock.innerHTML = '';
      sectorsOf(activeDataset).slice(1).forEach(sec => {
        const item = document.createElement('span');
        item.className = 'sector-legend';
        const color = sectorColors[sec] || dynamicSectorColor(sec);
        item.innerHTML = `
          <span class="sector-legend-shape" style="--legend-color:${color}"></span>
          <span class="sector-legend-label">${sec}</span>
        `;
        legendBlock.appendChild(item);
      });

      sizeGuide.innerHTML = `
        <svg class="size-legend-svg" viewBox="0 0 178 62" aria-label="Bubble size legend">
          <line class="size-baseline" x1="8" y1="39" x2="170" y2="39"></line>
          <path class="size-arc" d="M 20 39 A 12 12 0 0 1 44 39"></path>
          <path class="size-arc" d="M 58 39 A 21 21 0 0 1 100 39"></path>
          <path class="size-arc" d="M 112 39 A 29 29 0 0 1 170 39"></path>
          <text class="size-label" x="32" y="57" text-anchor="middle">1</text>
          <text class="size-label" x="79" y="57" text-anchor="middle">5</text>
          <text class="size-label" x="141" y="57" text-anchor="middle">10</text>
        </svg>
      `;
    }

    function bubbleRadius(value, maxValue) {
      const minR = 8;
      const maxR = 52;
      if (maxValue <= 0) return minR;
      return minR + Math.sqrt(value / maxValue) * (maxR - minR);
    }

    function makeSvg(tag, attrs = {}, parent = chartSvg) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      parent.appendChild(el);
      return el;
    }

    function renderChart() {
      chartSvg.innerHTML = '';
      chartTitle.textContent = activeDataset.title;
      chartDesc.textContent = activeDataset.desc;
      renderLegend();

      const years = activeDataset.years;
      const deals = filteredDeals();
      const visibleRows = activeDataset.rows.filter(row => !searchTerm || row.toLowerCase().includes(searchTerm));
      const rows = visibleRows.length ? visibleRows : activeDataset.rows;
      const maxValue = Math.max(...activeDataset.deals.map(d => d.value), 10);
      countNote.textContent = `${deals.length} deals shown`;

      const width = 1200;
      const height = 780;
      const margin = { top: 70, right: 28, bottom: 30, left: 132 };
      const plotW = width - margin.left - margin.right;
      const plotH = height - margin.top - margin.bottom;
      const rowGap = plotH / Math.max(rows.length, 1);
      const yearGap = plotW / Math.max(years.length, 1);

      // background grid
      years.forEach((year, i) => {
        const x = margin.left + yearGap * i + yearGap / 2;
        makeSvg('line', { x1: x, y1: margin.top - 14, x2: x, y2: height - margin.bottom, class: 'grid-line' });
        const labelBg = makeSvg('rect', {
          x: x - 30, y: 16, width: 60, height: 22, rx: 0, fill: '#141512'
        });
        makeSvg('text', {
          x, y: 31, 'text-anchor': 'middle', class: 'axis-text year', fill: '#fffef9'
        }).textContent = year;
      });

      rows.forEach((row, i) => {
        const y = margin.top + rowGap * i + rowGap / 2;
        makeSvg('line', { x1: margin.left, y1: y, x2: width - margin.right, y2: y, class: 'row-line' });
        makeSvg('text', {
          x: margin.left - 10, y: y + 4, 'text-anchor': 'end', class: 'y-label'
        }).textContent = row;
      });

      // bubbles
      const yearIndex = Object.fromEntries(years.map((y,i)=>[y,i]));
      const rowIndex = Object.fromEntries(rows.map((r,i)=>[r,i]));
      deals.forEach((deal, idx) => {
        if (!(deal.country in rowIndex) || !(deal.year in yearIndex)) return;
        const baseX = margin.left + yearGap * yearIndex[deal.year] + yearGap / 2;
        const baseY = margin.top + rowGap * rowIndex[deal.country] + rowGap / 2;
        const jitterX = ((idx % 5) - 2) * 5.5;
        const jitterY = (((idx * 3) % 7) - 3) * 2.8;
        const x = baseX + jitterX;
        const y = baseY + jitterY;
        const r = bubbleRadius(deal.value, maxValue);
        const sectorColor = sectorColors[deal.sector] || dynamicSectorColor(deal.sector);
        const isTop = deal.value >= maxValue * 0.68;
        const dim = highlightLarge && !isTop;

        const g = makeSvg('g', { class: `bubble-group${dim ? ' is-dim' : ''}` });
        const bubble = makeSvg('circle', {
          cx: x, cy: y, r, fill: sectorColor, opacity: 0.88,
          class: `bubble${dim ? ' is-dim' : ''}`
        }, g);
        makeSvg('circle', {
          cx: x - r * 0.18, cy: y - r * 0.18, r: Math.max(5, r * 0.24), class: 'bubble-core'
        }, g);

        g.addEventListener('mouseenter', () => showTooltip(deal));
        g.addEventListener('mousemove', moveTooltip);
        g.addEventListener('mouseleave', hideTooltip);
      });

      let note = 'Hover over a bubble to see details. Click a category filter to isolate a sector.';
      if (activeSector !== 'All') note = `Showing only: ${activeSector}.`;
      if (searchTerm) note += ` Search filter: ${searchTerm}.`;
      if (highlightLarge) note += ' Highlight mode: emphasising larger deals.';
      document.getElementById('footerNote').textContent = note;
    }

    function showTooltip(deal) {
      const unit = activeDataset.unit || 'value';
      tooltip.innerHTML = `<b>${deal.country}</b>${deal.year} · ${deal.value} ${unit}<br>Sector: ${deal.sector}<br>Project: ${deal.title}`;
      tooltip.classList.add('show');
    }
    function moveTooltip(event) {
      const rect = chartStage.getBoundingClientRect();
      tooltip.style.left = `${event.clientX - rect.left}px`;
      tooltip.style.top = `${event.clientY - rect.top}px`;
    }
    function hideTooltip() { tooltip.classList.remove('show'); }


    function parseCSV(raw) {
      const rows = [];
      let row = [];
      let cell = '';
      let quote = false;
      for (let i = 0; i < raw.length; i++) {
        const ch = raw[i];
        const next = raw[i + 1];
        if (ch === '"') {
          if (quote && next === '"') { cell += '"'; i++; }
          else { quote = !quote; }
        } else if (ch === ',' && !quote) {
          row.push(cell.trim()); cell = '';
        } else if ((ch === '\n' || ch === '\r') && !quote) {
          if (ch === '\r' && next === '\n') i++;
          row.push(cell.trim()); cell = '';
          if (row.some(v => v !== '')) rows.push(row);
          row = [];
        } else {
          cell += ch;
        }
      }
      row.push(cell.trim());
      if (row.some(v => v !== '')) rows.push(row);
      if (rows.length < 2) return { headers: [], rows: [] };
      const headers = rows[0].map((h, i) => h || `Column ${i + 1}`);
      const objects = rows.slice(1).map(values => {
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i] || '');
        return obj;
      });
      return { headers, rows: objects };
    }

    function fillSelect(select, headers, includeEmpty = false, emptyLabel = 'No column') {
      select.innerHTML = '';
      if (includeEmpty) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = emptyLabel;
        select.appendChild(opt);
      }
      headers.forEach(h => {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = h;
        select.appendChild(opt);
      });
    }

    function guessHeader(words, fallbackIndex = 0) {
      const lower = uploadedHeaders.map(h => h.toLowerCase());
      const found = lower.findIndex(h => words.some(w => h.includes(w)));
      return uploadedHeaders[found >= 0 ? found : Math.min(fallbackIndex, uploadedHeaders.length - 1)] || '';
    }

    function readUploadedData(raw) {
      const parsed = parseCSV(raw);
      uploadedHeaders = parsed.headers;
      uploadedRows = parsed.rows;
      if (!uploadedHeaders.length || !uploadedRows.length) {
        mappingBox.hidden = true;
        uploadStatus.textContent = '没有读到有效数据，请确认第一行是表头，下面至少还有一行数据。';
        return;
      }
      fillSelect(countryColumn, uploadedHeaders);
      fillSelect(yearColumn, uploadedHeaders);
      fillSelect(valueColumn, uploadedHeaders);
      fillSelect(sectorColumn, uploadedHeaders);
      fillSelect(titleColumn, uploadedHeaders, true, 'No title column');
      countryColumn.value = guessHeader(['country', 'nation', '地区', '国家'], 0);
      yearColumn.value = guessHeader(['year', '年份'], 1);
      valueColumn.value = guessHeader(['value', 'amount', 'score', 'count', '金额', '数值'], 2);
      sectorColumn.value = guessHeader(['sector', 'category', 'group', 'type', '行业', '分类'], 3);
      titleColumn.value = guessHeader(['title', 'project', 'detail', 'name', '项目', '说明'], 4);
      mappingBox.hidden = false;
      uploadStatus.textContent = `已读取 ${uploadedRows.length} 行数据，请确认列对应关系。`;
    }

    csvFile.addEventListener('change', event => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        csvText.value = String(reader.result || '');
        readUploadedData(csvText.value);
      };
      reader.readAsText(file);
    });

    loadExampleBtn.addEventListener('click', () => {
      csvText.value = `country,year,value,sector,title
Australia,2007,8.4,Metals,Mining partnership
Brazil,2010,7.6,Energy,Offshore support deal
Canada,2012,7.9,Transport,Railway system deal
Germany,2013,2.1,Technology,Manufacturing automation
Portugal,2011,2.9,Real estate,Property fund entry`;
      readUploadedData(csvText.value);
    });

    function downloadTemplateCSV() {
      const template = `country,year,value,sector,title
Australia,2007,8.4,Metals,Mining partnership
Brazil,2010,7.6,Energy,Offshore support deal
Canada,2012,7.9,Transport,Railway system deal
Germany,2013,2.1,Technology,Manufacturing automation
Portugal,2011,2.9,Real estate,Property fund entry`;
      const blob = new Blob([template], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bubble-timeline-template.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      uploadStatus.textContent = '已下载 CSV 模板：按 country, year, value, sector, title 五列填写即可。';
    }

    document.getElementById('downloadTemplateBtn').addEventListener('click', downloadTemplateCSV);

    parseDataBtn.addEventListener('click', () => readUploadedData(csvText.value));

    generateUploadBtn.addEventListener('click', () => {
      const cKey = countryColumn.value;
      const yKey = yearColumn.value;
      const vKey = valueColumn.value;
      const sKey = sectorColumn.value;
      const tKey = titleColumn.value;
      const deals = uploadedRows.map((row, index) => {
        const year = Number(String(row[yKey] || '').replace(/[^\d.-]/g, ''));
        const value = Number(String(row[vKey] || '').replace(/,/g, '').replace(/[^\d.-]/g, ''));
        const sector = sKey ? (row[sKey] || 'Other') : 'Other';
        return {
          country: row[cKey] || `Item ${index + 1}`,
          year,
          value,
          sector: sectorColors[sector] ? sector : sector,
          title: tKey ? (row[tKey] || 'Uploaded item') : 'Uploaded item'
        };
      }).filter(item => item.country && Number.isFinite(item.year) && Number.isFinite(item.value) && item.value > 0);

      if (!deals.length) {
        uploadStatus.textContent = '没有生成有效图表，请确认 year 和 value 列是数字。';
        return;
      }

      const years = [...new Set(deals.map(d => d.year))].sort((a, b) => a - b);
      const rows = [...new Set(deals.map(d => d.country))];
      activeDataset = {
        id: 'uploaded',
        button: 'Uploaded',
        label: 'Uploaded data',
        title: customTitle.value || 'Uploaded bubble timeline',
        desc: '你上传的数据正在以气泡时间轴显示：横轴为年份，纵轴为国家，大小为数值，颜色为分类。',
        unit: 'value',
        years,
        rows,
        deals
      };
      activeSector = 'All';
      highlightLarge = false;
      searchTerm = '';
      countrySearch.value = '';
      uploadStatus.textContent = `已生成 ${deals.length} 个数据点。可以继续用上面的筛选器查看。`;
      renderDatasetButtons();
      renderFilterButtons();
      renderChart();
    });

    useBuiltInBtn.addEventListener('click', () => {
      activeDataset = datasets[0];
      activeSector = 'All';
      highlightLarge = false;
      searchTerm = '';
      countrySearch.value = '';
      mappingBox.hidden = true;
      uploadStatus.textContent = '已切回内置示例数据。';
      renderDatasetButtons();
      renderFilterButtons();
      renderChart();
    });

    countrySearch.addEventListener('input', () => {
      searchTerm = countrySearch.value.trim().toLowerCase();
      renderChart();
    });

    resetFilterBtn.addEventListener('click', () => {
      activeSector = 'All';
      highlightLarge = false;
      searchTerm = '';
      countrySearch.value = '';
      renderFilterButtons();
      renderChart();
    });

    highlightLargeBtn.addEventListener('click', () => {
      highlightLarge = !highlightLarge;
      highlightLargeBtn.classList.toggle('dark', highlightLarge);
      renderChart();
    });

    renderDatasetButtons();
    renderFilterButtons();
    renderChart();
  


    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }

function bindHeaderNavigation(){
  document.querySelectorAll('.site-header [data-nav-filter]').forEach(function(link){
    link.addEventListener('click', function(event){
      if(typeof window.navFilter === 'function' && window.navFilter(link.dataset.navFilter) === false){
        event.preventDefault();
      }
    });
  });

  const loginEntry = document.querySelector('.site-header .login-entry-btn');
  if(loginEntry){
    loginEntry.addEventListener('click', function(){
      window.location.href = 'login.html';
    });
  }

  const mobileMenuToggle = document.querySelector('.site-header .mobile-menu-toggle');
  if(mobileMenuToggle){
    mobileMenuToggle.addEventListener('click', function(){
      if(typeof window.toggleMobileMenu === 'function') window.toggleMobileMenu();
    });
  }

  document.querySelectorAll('#mobileMenuPanel a').forEach(function(link){
    link.addEventListener('click', function(){
      if(typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
    });
  });
}

bindHeaderNavigation();

