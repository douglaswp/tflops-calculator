import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- Ícones SVG ---
const CpuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>;
const GpuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="12" x="3" y="6" rx="2" /><path d="M7 18v3" /><path d="M11 18v3" /><path d="M15 18v3" /><path d="M5 6V3" /><path d="M9 6V3" /><path d="M13 6V3" /><path d="M17 6V3" /></svg>;
const AppleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 3-1 0-2-1.5-2-3Z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;

const Spinner = () => (
  <svg className="w-8 h-8 text-indigo-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Utilitário de Moeda ---
const formatCurrency = (value) => {
  if (value === 0 || value === null || value === undefined) return 'Não informado';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

// --- Componente: Select com Pesquisa Customizado ---
const SearchableSelect = ({ options, value, onChange, placeholder, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`flex items-center justify-between w-full p-2.5 rounded-lg cursor-pointer text-sm border ${isDark
            ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
            : 'bg-slate-50 border-slate-300 hover:bg-slate-100 text-slate-900'
          }`}
        onClick={() => { setIsOpen(!isOpen); setSearch(''); }}
      >
        <span className={value ? (isDark ? "text-slate-200" : "text-slate-900") : "text-slate-500"}>{selectedLabel}</span>
        <ChevronDownIcon />
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-1 rounded-lg shadow-xl max-h-60 flex flex-col overflow-hidden border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
          <div className={`p-2 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <input
              type="text"
              autoFocus
              className={`w-full p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              placeholder="Pesquisar modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-center text-slate-500">Nenhum resultado encontrado</div>
            ) : (
              filteredOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2.5 text-sm cursor-pointer flex justify-between items-center ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                    }`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {value === opt.value && <span className="text-indigo-500"><CheckIcon /></span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Componente Gráfico de Barras ---
const BarChart = ({ data, dataKey, nameKey, label, color, formatValue, hideEmptyMsg = false, isDark }) => {
  if (!data || data.length === 0) {
    if (hideEmptyMsg) return null;
    return (
      <div className={`p-5 rounded-xl border text-sm italic ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
        Sem dados suficientes para o gráfico: {label}.
      </div>
    );
  }

  const maxVal = Math.max(...data.map(d => d[dataKey]), 0.0001);

  return (
    <div className={`p-5 rounded-xl shadow-sm border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{label}</h3>
      <div className="flex flex-col gap-3">
        {data.map((item, idx) => {
          const widthPct = (item[dataKey] / maxVal) * 100;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-1/3 text-sm text-right truncate font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`} title={item[nameKey]}>
                {item[nameKey]}
              </div>

              <div className="flex items-center w-2/3">
                <div className={`flex-1 h-6 rounded-md relative ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                  <div
                    className={`absolute left-0 top-0 h-6 rounded-md ${color} transition-all duration-700 ease-out`}
                    style={{ width: `${widthPct}%`, minWidth: widthPct > 0 ? '4px' : '0' }}
                  ></div>
                </div>

                <span className={`ml-3 text-sm font-mono whitespace-nowrap w-30 text-right ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {formatValue ? formatValue(item[dataKey]) : item[dataKey]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [hardwareList, setHardwareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  // Estados do formulário Principal
  const [selectedType, setSelectedType] = useState('GPU');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVram, setSelectedVram] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Estados de Edição
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Estados do formulário de Customizados
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customTflops, setCustomTflops] = useState('');
  const [customVram, setCustomVram] = useState('');

  // Estado da Tabela/Comparador
  const [selectedItems, setSelectedItems] = useState([]);

  // Carrega os dados (Rede + LocalStorage)
  useEffect(() => {
    const fetchHardwareData = async () => {
      setLoading(true);

      let fetchedHardware = [];

      try {
        const urls = [
          { url: "https://raw.githubusercontent.com/huggingface/huggingface.js/main/packages/tasks/src/hardware-nvidia.ts", defaultProvider: "NVIDIA", defaultType: "GPU" },
          { url: "https://raw.githubusercontent.com/huggingface/huggingface.js/main/packages/tasks/src/hardware-amd.ts", defaultProvider: "AMD", defaultType: "GPU" },
          { url: "https://raw.githubusercontent.com/huggingface/huggingface.js/main/packages/tasks/src/hardware.ts", defaultProvider: "Outros", defaultType: "Outros" }
        ];

        for (const item of urls) {
          const res = await fetch(item.url);
          const text = await res.text();

          const regex = /(?:(?:"([^"]+)")|(?:'([^']+)')|([a-zA-Z0-9_.-]+))\s*:\s*\{([^}]*?tflops\s*:\s*([\d.]+)[^}]*)\}/g;
          let match;

          while ((match = regex.exec(text)) !== null) {
            const name = match[1] || match[2] || match[3];
            const tflops = parseFloat(match[5]);

            let memory = null;
            const memMatch = match[4].match(/memory\s*:\s*\[([\s\S]*?)\]/);
            if (memMatch) {
              memory = memMatch[1].split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
            }

            if (name && !isNaN(tflops)) {
              if (name !== 'tflops' && name !== 'memory' && name !== 'DEFAULT_MEMORY_OPTIONS') {
                let type = item.defaultType;
                let provider = item.defaultProvider;
                const nameLower = name.toLowerCase();

                if (item.defaultProvider === 'Outros') {
                  if (nameLower.includes('apple') || nameLower.includes('m1') || nameLower.includes('m2') || nameLower.includes('m3') || nameLower.includes('m4')) {
                    type = 'Apple';
                    provider = 'Apple';
                  } else {
                    type = 'CPU';
                    provider = nameLower.includes('intel') ? 'Intel' : (nameLower.includes('amd') || nameLower.includes('epyc') ? 'AMD' : 'Outros');
                  }
                }
                fetchedHardware.push({ id: `hf_${name}`, type, provider, name, tflops, memory });
              }
            }
          }
        }
        localStorage.setItem('hf_hardware_cache', JSON.stringify(fetchedHardware));

      } catch (err) {
        console.warn("Erro ao buscar dados do Github. Tentando cache local...", err);
        const cached = localStorage.getItem('hf_hardware_cache');
        if (cached) {
          fetchedHardware = JSON.parse(cached);
        }
      }

      // Carrega customizados salvos pelo usuário
      let customHardware = [];
      const savedCustom = localStorage.getItem('custom_hardware_list');
      if (savedCustom) {
        customHardware = JSON.parse(savedCustom);
      }

      const allHardware = [...fetchedHardware, ...customHardware];
      const uniqueItems = Array.from(new Map(allHardware.map(item => [item.name, item])).values());

      uniqueItems.sort((a, b) => b.tflops - a.tflops);
      setHardwareList(uniqueItems);
      setLoading(false);
    };

    fetchHardwareData();
  }, []);

  // --- Lógica de Filtros do Formulário Principal ---
  const availableProviders = useMemo(() => {
    const providers = new Set(hardwareList.filter(h => h.type === selectedType).map(h => h.provider));
    return Array.from(providers);
  }, [hardwareList, selectedType]);

  useEffect(() => {
    if (availableProviders.length > 0 && !availableProviders.includes(selectedProvider)) {
      setSelectedProvider(availableProviders[0]);
    }
  }, [selectedType, availableProviders, selectedProvider]);

  const availableModels = useMemo(() => {
    return hardwareList
      .filter(h => h.type === selectedType && h.provider === selectedProvider)
      .map(h => {
        const memStr = h.memory && h.memory.length > 0 ? ` (${h.memory.join('/')} GB)` : '';
        return { value: h.name, label: `${h.name}${memStr}` };
      });
  }, [hardwareList, selectedType, selectedProvider]);

  useEffect(() => {
    if (selectedModel) {
      const hw = hardwareList.find(h => h.name === selectedModel);
      if (hw && hw.memory && hw.memory.length > 0) {
        setSelectedVram(hw.memory[0].toString());
      } else {
        setSelectedVram('');
      }
    } else {
      setSelectedVram('');
    }
  }, [selectedModel, hardwareList]);

  useEffect(() => {
    setSelectedModel('');
  }, [selectedProvider, selectedType]);

  // --- Ações ---
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!selectedModel || !quantity) return;

    const hw = hardwareList.find(h => h.name === selectedModel);
    if (!hw) return;

    const parsedCost = cost ? parseFloat(cost) : 0;

    const newItem = {
      id: crypto.randomUUID(),
      name: hw.name,
      type: hw.type,
      provider: hw.provider,
      tflops: hw.tflops,
      memory: hw.memory,
      selectedVram: selectedVram ? parseInt(selectedVram, 10) : null,
      cost: parsedCost,
      quantity: parseInt(quantity, 10),
      includedInTotal: true,
    };

    setSelectedItems([...selectedItems, newItem]);

    setCost('');
    setQuantity(1);
    setSelectedModel('');
  };

  const handleSaveCustomHardware = (e) => {
    e.preventDefault();
    if (!customName || !customTflops) return;

    let parsedMemory = null;
    if (customVram) {
      parsedMemory = customVram.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      if (parsedMemory.length === 0) parsedMemory = null;
    }

    const newCustom = {
      id: `custom_${crypto.randomUUID()}`,
      type: selectedType,
      provider: selectedProvider || 'Custom',
      name: customName,
      tflops: parseFloat(customTflops),
      memory: parsedMemory
    };

    const savedCustom = localStorage.getItem('custom_hardware_list');
    const customList = savedCustom ? JSON.parse(savedCustom) : [];
    customList.push(newCustom);
    localStorage.setItem('custom_hardware_list', JSON.stringify(customList));

    setHardwareList(prev => [...prev, newCustom].sort((a, b) => b.tflops - a.tflops));

    setCustomName('');
    setCustomTflops('');
    setCustomVram('');
    setShowCustomForm(false);
    setSelectedModel(newCustom.name);
  };

  const removeItem = (id) => setSelectedItems(selectedItems.filter(item => item.id !== id));

  const toggleIncludeInTotal = (id) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === id ? { ...item, includedInTotal: !item.includedInTotal } : item
    ));
  };

  // Funções de Edição Inline
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      quantity: item.quantity,
      cost: item.cost > 0 ? item.cost : '',
      selectedVram: item.selectedVram || ''
    });
  };

  const saveEdit = (id) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: parseInt(editForm.quantity, 10) || 1,
          cost: parseFloat(editForm.cost) || 0,
          selectedVram: editForm.selectedVram ? parseInt(editForm.selectedVram, 10) : item.selectedVram
        };
      }
      return item;
    }));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // --- Dados de Gráficos e Cálculos ---
  const chartData = useMemo(() => {
    return selectedItems.map(item => {
      const totalTflops = item.tflops * item.quantity;
      const vramLabel = item.selectedVram ? ` ${item.selectedVram}GB` : '';

      let costPerTflop = 0;
      let tflopsPerDollar = 0;

      if (item.cost > 0) {
        costPerTflop = item.cost / item.tflops;
        tflopsPerDollar = item.tflops / item.cost;
      }

      return {
        ...item,
        displayName: `${item.name}${vramLabel} (x${item.quantity})`,
        totalTflops,
        costPerTflop,
        tflopsPerDollar
      };
    });
  }, [selectedItems]);

  const totalCombinedTflops = chartData
    .filter(item => item.includedInTotal)
    .reduce((acc, curr) => acc + curr.totalTflops, 0);

  const MAX_TFLOPS_SCALE = 150;
  const markerPosition = Math.min((totalCombinedTflops / MAX_TFLOPS_SCALE) * 100, 100);

  const financialChartData = chartData.filter(d => d.cost > 0);
  const activeModelObj = hardwareList.find(h => h.name === selectedModel);
  const hasVramOptions = activeModelObj && activeModelObj.memory && activeModelObj.memory.length > 0;

  if (loading) return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDark ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-800'}`}>
      <Spinner />
      <p className={`mt-4 font-medium text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Carregando base de dados de Hardware...</p>
    </div>
  );

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-[#0b1120] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <div className="p-4 mx-auto space-y-6 max-w-7xl md:p-8">

        {/* Cabeçalho */}
        <header className={`pb-4 border-b flex justify-between items-center ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dashboard de Hardware AI</h1>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Simulador de Poder de Processamento Baseado no HuggingFace</p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            title="Alternar Tema"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        {/* Indicador de Processamento Total */}
        <div className={`border p-6 rounded-xl shadow-xl flex flex-col items-center ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="mb-6 text-center">
            <h3 className={`text-sm font-medium uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Poder de Computação Total</h3>
            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {totalCombinedTflops.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} <span className={`text-lg font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>TFLOPS</span>
            </div>
          </div>

          {/* Barra GPU Poor -> GPU Rich */}
          <div className="w-full max-w-3xl">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="text-red-500">GPU poor</span>
              <span className="text-green-500">GPU rich</span>
            </div>

            <div className="relative w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-green-500">
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-700 ease-out border-[3px] ${isDark ? 'bg-white border-[#0f172a]' : 'bg-white border-slate-200'}`}
                style={{ left: `calc(${markerPosition}% - 8px)` }}
              ></div>

              <div
                className={`absolute top-4 -translate-x-1/2 text-[10px] py-1 px-2 rounded font-mono transition-all duration-700 ease-out whitespace-nowrap border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'}`}
                style={{ left: `${markerPosition}%` }}
              >
                {totalCombinedTflops.toFixed(2)} TFLOPS
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Coluna da Esquerda: Formulário e Tabela */}
          <div className="space-y-6 lg:col-span-5">

            {/* Formulário Principal */}
            <div className={`border p-5 rounded-xl shadow-lg ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Adicionar Hardware</h2>

              <form onSubmit={handleAddItem} className="space-y-4">

                {/* 1. Seleção de Tipo */}
                <div className={`flex gap-2 p-1.5 rounded-full border ${isDark ? 'bg-[#0b1120] border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                  {[
                    { id: 'GPU', icon: <GpuIcon />, label: 'GPU' },
                    { id: 'CPU', icon: <CpuIcon />, label: 'CPU' },
                    { id: 'Apple', icon: <AppleIcon />, label: 'Apple Silicon' }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedType === type.id
                          ? (isDark ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm' : 'bg-white text-indigo-600 border border-slate-200 shadow-sm')
                          : (isDark ? 'text-slate-500 hover:text-slate-300 border border-transparent' : 'text-slate-500 hover:text-slate-700 border border-transparent')
                        }`}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                </div>

                {/* 2. Provedor / Fabricante */}
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Fabricante</label>
                  <div className="relative">
                    <select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className={`w-full p-2.5 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none appearance-none border ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                    >
                      {availableProviders.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>

                {/* 3. Modelo */}
                <div className="relative">
                  <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Modelo</label>
                  <SearchableSelect
                    options={availableModels}
                    value={selectedModel}
                    onChange={setSelectedModel}
                    placeholder="Selecione um modelo..."
                    isDark={isDark}
                  />

                  {/* Botão de Customizado */}
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(!showCustomForm)}
                      className={`text-[11px] transition-colors ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
                    >
                      {showCustomForm ? "Cancelar cadastro customizado" : "Não encontrou? Cadastre um modelo"}
                    </button>
                  </div>
                </div>

                {/* Formulário de Cadastro Customizado (Colapsável) */}
                {showCustomForm && (
                  <div className={`p-4 rounded-lg border space-y-3 mb-4 ${isDark ? 'bg-slate-800/50 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'}`}>
                    <h4 className={`text-xs font-bold mb-2 flex items-center gap-1 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}><PlusIcon /> Novo Hardware Local</h4>
                    <div>
                      <label className={`block text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Nome do Modelo</label>
                      <input
                        type="text" value={customName} onChange={e => setCustomName(e.target.value)}
                        placeholder="Ex: RTX 5090" className={`w-full p-2 rounded text-xs border ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={`block text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Poder (TFLOPS)</label>
                        <input
                          type="number" step="0.1" value={customTflops} onChange={e => setCustomTflops(e.target.value)}
                          placeholder="Ex: 120.5" className={`w-full p-2 rounded text-xs border ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>VRAMs (GB, opcional)</label>
                        <input
                          type="text" value={customVram} onChange={e => setCustomVram(e.target.value)}
                          placeholder="Ex: 24, 48" className={`w-full p-2 rounded text-xs border ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                    </div>
                    <button
                      type="button" onClick={handleSaveCustomHardware}
                      className="flex items-center justify-center w-full gap-2 py-2 text-xs font-bold text-white rounded bg-indigo-600/80 hover:bg-indigo-600"
                    >
                      <SaveIcon /> Salvar no Cache Local
                    </button>
                  </div>
                )}

                {/* 4. VRAM e Quantidade */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-5">
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>VRAM</label>
                    <div className="relative">
                      <select
                        value={selectedVram}
                        onChange={(e) => setSelectedVram(e.target.value)}
                        disabled={!hasVramOptions}
                        className={`w-full p-2.5 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed border ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                      >
                        {hasVramOptions ? activeModelObj.memory.map(m => (
                          <option key={m} value={m}>{m} GB</option>
                        )) : (
                          <option value="">N/A</option>
                        )}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-7">
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Quantidade</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className={`w-full p-2.5 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none border ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                      required
                    />
                  </div>
                </div>

                {/* 5. Custo Opcional */}
                <div>
                  <label className={`block text-xs font-medium mb-1.5 flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span>Custo Unitário (R$)</span>
                    <span className="italic opacity-70">Opcional</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Deixe em branco se não souber"
                    className={`w-full p-2.5 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none border ${isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedModel || showCustomForm}
                  className={`w-full py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed border ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white'}`}
                >
                  Adicionar Item
                </button>
              </form>
            </div>

            {/* Lista de Selecionados com Toggle e Edição */}
            {selectedItems.length > 0 && (
              <div className={`rounded-xl shadow-lg border overflow-hidden ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`text-[10px] uppercase tracking-wider ${isDark ? 'bg-slate-900 text-slate-500' : 'bg-slate-50 text-slate-500'}`}>
                        <th className="p-3 font-semibold">Hardware Selecionado</th>
                        <th className="p-3 font-semibold text-center" title="Incluir na soma total">Somar</th>
                        <th className="p-3 font-semibold text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y text-sm ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                      {selectedItems.map(item => (
                        editingId === item.id ? (
                          // Modo de Edição Inline
                          <tr key={item.id} className={isDark ? 'bg-slate-800' : 'bg-slate-50'}>
                            <td className="p-3">
                              <div className={`font-semibold text-xs mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.name}</div>
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="w-16">
                                  <label className={`block text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Qtd</label>
                                  <input type="number" min="1" value={editForm.quantity} onChange={e => setEditForm({ ...editForm, quantity: e.target.value })} className={`w-full px-1.5 py-1 text-xs border rounded ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                                </div>
                                <div className="w-20">
                                  <label className={`block text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Custo (R$)</label>
                                  <input type="number" min="0" step="0.01" value={editForm.cost} onChange={e => setEditForm({ ...editForm, cost: e.target.value })} className={`w-full px-1.5 py-1 text-xs border rounded ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                                </div>
                                {item.memory && item.memory.length > 0 && (
                                  <div className="w-20">
                                    <label className={`block text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>VRAM</label>
                                    <select value={editForm.selectedVram || ''} onChange={e => setEditForm({ ...editForm, selectedVram: e.target.value })} className={`w-full px-1.5 py-1 text-xs border rounded ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}>
                                      {item.memory.map(m => <option key={m} value={m}>{m} GB</option>)}
                                    </select>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-center align-middle">
                              <span className={`text-[10px] italic ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Editando...</span>
                            </td>
                            <td className="p-3 space-x-1 text-right align-middle whitespace-nowrap">
                              <button onClick={() => saveEdit(item.id)} className="p-1.5 text-green-500 hover:bg-green-500/10 rounded transition-colors" title="Salvar">
                                <CheckIcon />
                              </button>
                              <button onClick={cancelEdit} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Cancelar">
                                <XIcon />
                              </button>
                            </td>
                          </tr>
                        ) : (
                          // Modo de Exibição Normal
                          <tr key={item.id} className={`transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                            <td className="p-3">
                              <div className={`font-semibold text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {item.name} {item.selectedVram && <span className="font-normal opacity-70">({item.selectedVram}GB)</span>}
                              </div>
                              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                {item.quantity} un. {item.cost > 0 && `• ${formatCurrency(item.cost)}/cada`}
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={item.includedInTotal}
                                  onChange={() => toggleIncludeInTotal(item.id)}
                                />
                                <div className={`w-8 h-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-500 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                              </label>
                            </td>
                            <td className="p-3 text-right whitespace-nowrap">
                              <button
                                onClick={() => startEdit(item)}
                                className={`p-1.5 rounded transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'}`}
                                title="Editar item"
                              >
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className={`p-1.5 rounded transition-colors ml-1 ${isDark ? 'text-slate-500 hover:text-red-400 hover:bg-slate-800' : 'text-slate-400 hover:text-red-500 hover:bg-slate-100'}`}
                                title="Remover item"
                              >
                                <TrashIcon />
                              </button>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Coluna da Direita: Gráficos */}
          <div className="space-y-4 lg:col-span-7">
            {selectedItems.length === 0 ? (
              <div className={`h-full min-h-[300px] flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center ${isDark ? 'bg-[#0f172a] border-slate-700 text-slate-500' : 'bg-white border-slate-300 text-slate-400'}`}>
                <ChartIcon />
                <p className={`mt-4 font-medium text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Nenhum hardware na lista</p>
                <p className="mt-1 text-xs">Selecione componentes ao lado para gerar comparações.</p>
              </div>
            ) : (
              <>
                {/* Gráfico 1: Processamento */}
                <BarChart
                  data={chartData}
                  dataKey="totalTflops"
                  nameKey="displayName"
                  label="Poder de Processamento Bruto (TFLOPS) - Quanto maior, melhor"
                  color="bg-indigo-500"
                  formatValue={v => `${v.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} TF`}
                  isDark={isDark}
                />

                {/* Exibe gráficos de Custo Apenas se houver itens COM custo cadastrado */}
                {financialChartData.length > 0 ? (
                  <>
                    <BarChart
                      data={financialChartData}
                      dataKey="tflopsPerDollar"
                      nameKey="displayName"
                      label="Eficiência de Investimento (TFLOPS por R$) - Quanto maior, melhor"
                      color="bg-emerald-500"
                      formatValue={v => `${v.toFixed(6)} TF/R$`}
                      isDark={isDark}
                    />

                    <BarChart
                      data={financialChartData}
                      dataKey="costPerTflop"
                      nameKey="displayName"
                      label="Custo por Unidade de TFLOP (R$) - Quanto menor, melhor"
                      color="bg-rose-500"
                      formatValue={v => formatCurrency(v)}
                      isDark={isDark}
                    />
                  </>
                ) : (
                  <div className={`p-5 rounded-xl border text-xs text-center italic ${isDark ? 'bg-[#0f172a] border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'}`}>
                    Adicione um valor de "Custo Unitário" aos itens para visualizar os gráficos de Eficiência Financeira e Custo Direto.
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}