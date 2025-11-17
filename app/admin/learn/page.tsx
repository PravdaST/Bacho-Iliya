'use client';

import { useState, useEffect } from 'react';

type Category = 'recipes' | 'health' | 'culture' | 'products' | 'tradition' | 'guides';

type ClusterSuggestion = {
  clusterTitle: string;
  category: Category;
  description: string;
  suggestedPillars: string[];
  keywords: string;
  seoValue: string;
  difficulty: string;
  confidence: number;
};

type Cluster = {
  id: string;
  title: string;
  slug: string;
  guide_category: Category;
  suggested_pillars: string[];
  is_published: boolean;
  created_at: string;
};

export default function AdminLearnPage() {
  const [activeTab, setActiveTab] = useState<'suggest' | 'cluster' | 'pillar' | 'manage'>('suggest');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Management tab state
  const [allArticles, setAllArticles] = useState<any>(null);
  const [managementLoading, setManagementLoading] = useState(false);
  const [generatingPillars, setGeneratingPillars] = useState<Set<string>>(new Set());

  // Suggestions state
  const [suggestions, setSuggestions] = useState<ClusterSuggestion[]>([]);

  // Existing clusters state
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [existingPillars, setExistingPillars] = useState<string[]>([]);

  // Cluster form state
  const [clusterTitle, setClusterTitle] = useState('');
  const [clusterCategory, setClusterCategory] = useState<Category>('recipes');
  const [clusterKeywords, setClusterKeywords] = useState('');

  // Pillar form state
  const [pillarTitle, setPillarTitle] = useState('');
  const [pillarCategory, setPillarCategory] = useState<Category>('recipes');
  const [pillarParentSlug, setPillarParentSlug] = useState('');
  const [pillarKeywords, setPillarKeywords] = useState('');

  // Fetch existing clusters on mount
  useEffect(() => {
    fetchClusters();
  }, []);

  const fetchClusters = async () => {
    try {
      const response = await fetch('/api/admin/learn-content/list-clusters');
      if (response.ok) {
        const data = await response.json();
        setClusters(data.clusters || []);
      }
    } catch (err) {
      console.error('Failed to fetch clusters:', err);
    }
  };

  const fetchExistingPillars = async (clusterSlug: string) => {
    try {
      const response = await fetch(`/api/admin/learn-content/list-pillars?clusterSlug=${clusterSlug}`);
      if (response.ok) {
        const data = await response.json();
        const pillarTitles = data.pillars.map((p: any) => p.title);
        setExistingPillars(pillarTitles);
      }
    } catch (err) {
      console.error('Failed to fetch existing pillars:', err);
      setExistingPillars([]);
    }
  };

  const fetchAllArticles = async () => {
    setManagementLoading(true);
    try {
      const response = await fetch('/api/admin/learn-content/list-all');
      if (response.ok) {
        const data = await response.json();
        setAllArticles(data);
      }
    } catch (err) {
      console.error('Failed to fetch all articles:', err);
    } finally {
      setManagementLoading(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/learn-content/toggle-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublished: !currentStatus })
      });

      if (response.ok) {
        // Refresh the list
        await fetchAllArticles();
      }
    } catch (err) {
      console.error('Failed to toggle publish:', err);
    }
  };

  const deleteArticle = async (id: string, title: string) => {
    if (!confirm(`Сигурен ли си, че искаш да изтриеш "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/learn-content/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        alert('✅ Статията е изтрита успешно!');
        await fetchAllArticles();
      } else {
        const data = await response.json();
        alert(`❌ Грешка: ${data.error || 'Failed to delete'}`);
      }
    } catch (err) {
      console.error('Failed to delete article:', err);
      alert('❌ Грешка при изтриване');
    }
  };

  const handleSuggestClusters = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/learn-content/suggest-clusters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to suggest clusters');
      }

      setSuggestions(data.suggestions || []);
      setResult(data);

      // Show duplicate warnings if any
      if (data.duplicatesRemoved > 0 && data.duplicateWarnings) {
        const warningMessage = `⚠️ Премахнати ${data.duplicatesRemoved} дублирани предложения:\n\n` +
          data.duplicateWarnings.map((w: any) =>
            `"${w.suggestedTitle}" → ${w.reason}\n   Съществуващи: ${w.existingPosts.join(', ')}`
          ).join('\n\n');

        console.warn('[AI Suggestions] Duplicates removed:', warningMessage);
        // Optionally show to user via alert
        if (data.duplicatesRemoved >= 3) {
          alert(warningMessage);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClusterFromSuggestion = async (suggestion: ClusterSuggestion) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/learn-content/create-cluster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: suggestion.clusterTitle,
          category: suggestion.category,
          keywords: suggestion.keywords,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create cluster');
      }

      alert(`✅ Cluster "${suggestion.clusterTitle}" created successfully!`);
      fetchClusters();
      setActiveTab('pillar');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCluster = async () => {
    if (!clusterTitle.trim()) {
      setError('Моля въведи заглавие на cluster');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/learn-content/create-cluster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: clusterTitle,
          category: clusterCategory,
          keywords: clusterKeywords,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create cluster');
      }

      setResult(data);
      setClusterTitle('');
      setClusterKeywords('');
      alert('✅ Cluster created successfully!');
      fetchClusters();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePillar = async (pillarTitle: string, parentSlug?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/learn-content/create-pillar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pillarTitle,  // Fixed: use 'title' instead of 'pillarTitle'
          category: pillarCategory,
          parentClusterSlug: parentSlug || pillarParentSlug || null,
          keywords: pillarKeywords,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create pillar');
      }

      setResult(data);
      setPillarTitle('');
      setPillarKeywords('');
      alert(`✅ Pillar "${pillarTitle}" created!`);
      fetchClusters();

      // Refresh existing pillars if we have a selected cluster
      if (selectedCluster) {
        fetchExistingPillars(selectedCluster.slug);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get missing pillars for selected cluster
  const getMissingPillars = (cluster: Cluster): string[] => {
    const suggested = cluster.suggested_pillars || [];
    // Filter out pillars that have already been created
    // We use a case-insensitive comparison to catch variations
    return suggested.filter(suggestedPillar => {
      return !existingPillars.some(existingPillar =>
        existingPillar.toLowerCase().includes(suggestedPillar.toLowerCase()) ||
        suggestedPillar.toLowerCase().includes(existingPillar.toLowerCase())
      );
    });
  };

  // Generate a single pillar from cluster
  const generatePillar = async (clusterSlug: string, pillarTitle: string, category: Category, keywords: string) => {
    const pillarKey = `${clusterSlug}-${pillarTitle}`;

    setGeneratingPillars(prev => new Set(prev).add(pillarKey));
    setError(null);

    try {
      const response = await fetch('/api/admin/learn-content/create-pillar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pillarTitle,
          category,
          keywords,
          clusterSlug,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Неуспешно генериране на pillar');
      }

      alert(`✅ Pillar "${pillarTitle}" е генериран успешно!`);
      await fetchAllArticles(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
      alert(`❌ Грешка: ${err.message}`);
    } finally {
      setGeneratingPillars(prev => {
        const next = new Set(prev);
        next.delete(pillarKey);
        return next;
      });
    }
  };

  // Toggle publish status for pillar
  const togglePillarPublish = async (pillarId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/learn-content/publish', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pillarId,
          is_published: !currentStatus
        })
      });

      if (!response.ok) {
        throw new Error('Неуспешна промяна на статус');
      }

      await fetchAllArticles(); // Refresh the list
      alert(`✅ Pillar ${!currentStatus ? 'публикуван' : 'отпубликуван'} успешно!`);
    } catch (err: any) {
      alert(`❌ Грешка: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Бачо Илия - Learn Content Generator
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('suggest')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'suggest'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🤖 AI Suggestions
          </button>
          <button
            onClick={() => setActiveTab('cluster')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'cluster'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📚 Create Cluster
          </button>
          <button
            onClick={() => setActiveTab('pillar')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'pillar'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📖 Create Pillars
          </button>
          <button
            onClick={() => {
              setActiveTab('manage');
              fetchAllArticles();
            }}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'manage'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📋 Управление
          </button>
        </div>

        {/* Suggest Tab */}
        {activeTab === 'suggest' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">AI Cluster Suggestions</h2>
            <p className="text-gray-600 mb-4">
              AI ще анализира съдържанието и ще предложи 8-10 нови cluster теми
            </p>

            <button
              onClick={handleSuggestClusters}
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 mb-6"
            >
              {loading ? 'Генериране...' : '🤖 Предложи Clusters'}
            </button>

            {suggestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">💡 Предложения ({suggestions.length}):</h3>
                {suggestions.map((sug, idx) => (
                  <div key={idx} className="border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900">{sug.clusterTitle}</h4>
                        <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {sug.category}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            SEO: {sug.seoValue}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {sug.difficulty}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleGenerateClusterFromSuggestion(sug)}
                        disabled={loading}
                        className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 whitespace-nowrap"
                      >
                        {loading ? '⏳' : '✨ Generate This'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{sug.description}</p>
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-700 font-medium">
                        📝 Suggested Pillars ({sug.suggestedPillars?.length || 0})
                      </summary>
                      <ul className="mt-2 ml-4 space-y-1">
                        {sug.suggestedPillars?.map((pillar, i) => (
                          <li key={i} className="text-gray-600">• {pillar}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cluster Tab */}
        {activeTab === 'cluster' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Създай Cluster Guide (3,500 думи)</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Заглавие</label>
                <input
                  type="text"
                  value={clusterTitle}
                  onChange={(e) => setClusterTitle(e.target.value)}
                  placeholder="напр: Традиционни рецепти с кисело мляко"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Категория</label>
                <select
                  value={clusterCategory}
                  onChange={(e) => setClusterCategory(e.target.value as Category)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="recipes">Recipes (Рецепти)</option>
                  <option value="health">Health (Здраве)</option>
                  <option value="culture">Culture (Култура)</option>
                  <option value="products">Products (Продукти)</option>
                  <option value="tradition">Tradition (Традиции)</option>
                  <option value="guides">Guides (Ръководства)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Keywords (разделени със запетая)
                </label>
                <input
                  type="text"
                  value={clusterKeywords}
                  onChange={(e) => setClusterKeywords(e.target.value)}
                  placeholder="кисело мляко, рецепти, таратор"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <button
                onClick={handleCreateCluster}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Генериране... (10-15 сек)' : '✨ Генерирай Cluster'}
              </button>
            </div>
          </div>
        )}

        {/* Pillar Tab - IMPROVED! */}
        {activeTab === 'pillar' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Създай Pillar Guides (5,500 думи)</h2>

            {clusters.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Няма създадени clusters още.</p>
                <button
                  onClick={() => setActiveTab('suggest')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Създай първия cluster
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cluster Selector */}
                <div>
                  <label className="block text-sm font-medium mb-2">Избери Cluster</label>
                  <select
                    onChange={(e) => {
                      const cluster = clusters.find(c => c.id === e.target.value);
                      setSelectedCluster(cluster || null);
                      if (cluster) {
                        setPillarParentSlug(cluster.slug);
                        setPillarCategory(cluster.guide_category);
                        fetchExistingPillars(cluster.slug);
                      } else {
                        setExistingPillars([]);
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">-- Избери cluster --</option>
                    {clusters.map(cluster => (
                      <option key={cluster.id} value={cluster.id}>
                        {cluster.title} ({cluster.suggested_pillars?.length || 0} pillars)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Missing Pillars */}
                {selectedCluster && (
                  <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">
                        📝 Липсващи Pillars за "{selectedCluster.title}"
                      </h3>
                      <span className="text-sm text-gray-600">
                        {existingPillars.length} created / {selectedCluster.suggested_pillars?.length || 0} suggested
                      </span>
                    </div>
                    <div className="space-y-2">
                      {getMissingPillars(selectedCluster).length === 0 ? (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                          <p className="text-green-800 font-medium">✅ Всички pillars са създадени!</p>
                        </div>
                      ) : (
                        getMissingPillars(selectedCluster).map((pillar, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg">
                            <span className="text-gray-900">{pillar}</span>
                            <button
                              onClick={() => handleCreatePillar(pillar, selectedCluster.slug)}
                              disabled={loading}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                            >
                              {loading ? '⏳' : '✨ Generate'}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Manual Pillar Creation */}
                <div className="border-t pt-6">
                  <h3 className="font-bold mb-4">Или създай custom pillar:</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Заглавие</label>
                      <input
                        type="text"
                        value={pillarTitle}
                        onChange={(e) => setPillarTitle(e.target.value)}
                        placeholder="напр: Таратор - класическата рецепта"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Keywords</label>
                      <input
                        type="text"
                        value={pillarKeywords}
                        onChange={(e) => setPillarKeywords(e.target.value)}
                        placeholder="таратор, рецепта, лятна супа"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>

                    <button
                      onClick={() => handleCreatePillar(pillarTitle)}
                      disabled={loading || !pillarTitle.trim()}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {loading ? 'Генериране... (15-20 сек)' : '✨ Генерирай Custom Pillar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Management Tab */}
        {activeTab === 'manage' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Управление на статии</h2>

            {managementLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Зареждане...</p>
              </div>
            ) : allArticles ? (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Общо Clusters</p>
                    <p className="text-2xl font-bold text-blue-600">{allArticles.clusters.total}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Публикувани Clusters</p>
                    <p className="text-2xl font-bold text-green-600">{allArticles.clusters.published}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Общо Pillars</p>
                    <p className="text-2xl font-bold text-purple-600">{allArticles.pillars.total}</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Публикувани Pillars</p>
                    <p className="text-2xl font-bold text-emerald-600">{allArticles.pillars.published}</p>
                  </div>
                </div>

                {/* Clusters Section with Pillar Progress */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>📚 Clusters ({allArticles.clusters.total})</span>
                  </h3>
                  <div className="space-y-6">
                    {allArticles.clusters.items.map((cluster: any) => {
                      // Find pillars that belong to this cluster
                      const clusterPillars = allArticles.pillars.items.filter(
                        (p: any) => p.parent_cluster_slug === cluster.slug
                      );
                      const suggestedPillars = cluster.suggested_pillars || [];
                      const generatedCount = clusterPillars.length;
                      const totalCount = suggestedPillars.length;
                      const progressPercent = totalCount > 0 ? (generatedCount / totalCount) * 100 : 0;

                      return (
                        <div key={cluster.id} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
                          {/* Cluster Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900">{cluster.title}</h4>
                              <p className="text-sm text-gray-500 mt-1">/learn/{cluster.slug}</p>

                              {/* Keywords */}
                              {cluster.keywords && (
                                <div className="mt-2">
                                  <span className="text-xs text-gray-600 font-medium">Ключови думи: </span>
                                  <span className="text-xs text-gray-500">{cluster.keywords}</span>
                                </div>
                              )}

                              <div className="flex items-center gap-3 mt-2">
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {cluster.guide_category}
                                </span>
                                {cluster.is_published ? (
                                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    Публикувана
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                    Чернова
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  {new Date(cluster.created_at).toLocaleDateString('bg-BG')}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => togglePublish(cluster.id, cluster.is_published)}
                                className={`px-4 py-2 rounded text-sm font-medium ${
                                  cluster.is_published
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {cluster.is_published ? 'Отпубликувай' : 'Публикувай'}
                              </button>
                              {cluster.is_published && (
                                <a
                                  href={`/blog/learn/${cluster.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                                >
                                  Виж
                                </a>
                              )}
                              <button
                                onClick={() => deleteArticle(cluster.id, cluster.title)}
                                className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                              >
                                🗑️ Изтрий
                              </button>
                            </div>
                          </div>

                          {/* Pillar Progress */}
                          {totalCount > 0 && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-semibold text-gray-700">
                                  📖 Pillar статии: {generatedCount}/{totalCount}
                                </h5>
                                <span className="text-sm font-medium text-gray-600">
                                  {progressPercent.toFixed(0)}% завършени
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                <div
                                  className={`h-3 rounded-full transition-all ${
                                    progressPercent === 100 ? 'bg-green-600' : 'bg-blue-600'
                                  }`}
                                  style={{ width: `${progressPercent}%` }}
                                />
                              </div>

                              {/* Pillar List */}
                              <div className="grid grid-cols-1 gap-2">
                                {suggestedPillars.map((suggestedTitle: string, idx: number) => {
                                  const pillar = clusterPillars.find((p: any) =>
                                    p.title === suggestedTitle ||
                                    p.title.toLowerCase().includes(suggestedTitle.toLowerCase())
                                  );
                                  const isGenerated = !!pillar;
                                  const pillarKey = `${cluster.slug}-${suggestedTitle}`;
                                  const isGenerating = generatingPillars.has(pillarKey);

                                  return (
                                    <div
                                      key={idx}
                                      className={`flex items-center justify-between p-3 rounded-lg border ${
                                        isGenerated
                                          ? 'bg-green-50 border-green-200'
                                          : 'bg-gray-50 border-gray-200'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 flex-1">
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                          isGenerating ? 'bg-blue-500 animate-pulse' :
                                          isGenerated ? 'bg-green-500' :
                                          'bg-gray-300'
                                        }`} />
                                        <div className="flex-1">
                                          <p className={`text-sm font-medium ${
                                            isGenerated ? 'text-green-900' : 'text-gray-700'
                                          }`}>
                                            {suggestedTitle}
                                          </p>
                                          {isGenerated && pillar && (
                                            <p className="text-xs text-green-600 mt-1">
                                              /learn/{pillar.slug}
                                            </p>
                                          )}
                                          {isGenerating && (
                                            <p className="text-xs text-blue-600 mt-1 animate-pulse">
                                              Генериране... (30-60 сек)
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      {/* Action buttons */}
                                      <div className="flex gap-2">
                                        {!isGenerated && !isGenerating && (
                                          <button
                                            onClick={() => generatePillar(
                                              cluster.slug,
                                              suggestedTitle,
                                              cluster.guide_category,
                                              `${cluster.title}, ${suggestedTitle}`
                                            )}
                                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                          >
                                            Генерирай
                                          </button>
                                        )}

                                        {isGenerated && pillar && !pillar.is_published && (
                                          <button
                                            onClick={() => togglePillarPublish(pillar.id, pillar.is_published)}
                                            className="px-3 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
                                          >
                                            Публикувай
                                          </button>
                                        )}

                                        {isGenerated && pillar && pillar.is_published && (
                                          <>
                                            <button
                                              onClick={() => togglePillarPublish(pillar.id, pillar.is_published)}
                                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                                            >
                                              Скрий
                                            </button>
                                            <a
                                              href={`/blog/learn/${pillar.slug}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                            >
                                              Виж
                                            </a>
                                          </>
                                        )}

                                        {isGenerating && (
                                          <button
                                            disabled
                                            className="px-3 py-1 bg-gray-300 text-gray-500 rounded text-xs font-medium cursor-not-allowed"
                                          >
                                            Изчакай...
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pillars Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>📖 Pillars ({allArticles.pillars.total})</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заглавие</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Създадена</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allArticles.pillars.items.map((article: any) => (
                          <tr key={article.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{article.title}</div>
                              <div className="text-xs text-gray-500">/learn/{article.slug}</div>
                              {article.keywords && (
                                <div className="mt-1">
                                  <span className="text-xs text-gray-600 font-medium">Ключови думи: </span>
                                  <span className="text-xs text-gray-500">{article.keywords}</span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                {article.guide_category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {article.is_published ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Публикувана
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  Чернова
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(article.created_at).toLocaleDateString('bg-BG')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => togglePublish(article.id, article.is_published)}
                                className={`px-3 py-1 rounded ${
                                  article.is_published
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {article.is_published ? 'Отпубликувай' : 'Публикувай'}
                              </button>
                              {article.is_published && (
                                <a
                                  href={`/blog/learn/${article.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
                                >
                                  Виж
                                </a>
                              )}
                              <button
                                onClick={() => deleteArticle(article.id, article.title)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                🗑️ Изтрий
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">Натисни бутона "Управление" за да заредиш статиите</p>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-red-800 font-medium">Грешка:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {result && !error && activeTab !== 'suggest' && (
          <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-bold text-lg">Успешно създадено!</p>
                <p className="text-green-700 text-sm">
                  {activeTab === 'cluster' && result.title && `Cluster: ${result.title}`}
                  {activeTab === 'pillar' && result.title && `Pillar: ${result.title}`}
                  {!result.title && 'Съдържанието е генерирано и записано в базата данни'}
                </p>
              </div>
            </div>
            {result.slug && (
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <p className="text-sm text-gray-600 mb-1">URL Slug:</p>
                <p className="font-mono text-sm text-gray-900">/learn/{result.slug}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
