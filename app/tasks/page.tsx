'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import TaskItem from '@/components/TaskItem';

export default function TasksPage() {
  const router = useRouter();
  const { userData, selectedProducts, tasks, toggleTask, setCurrentStep, entryId, shareCount, incrementShareCount } = useGiveawayStore();
  const [copied, setCopied] = useState(false);

  const selectedProductsList = products.filter((p) => selectedProducts.includes(p.id));

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(entryId || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    // When user clicks share, increment the counter
    if (entryId) {
      try {
        // Call API to increment share count
        const response = await fetch('/api/share', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entryId }),
        });

        const result = await response.json();

        if (result.success) {
          // Update local state
          incrementShareCount();
          console.log('✅ Share count incremented:', result.data.shareCount);
        }
      } catch (error) {
        console.error('❌ Failed to track share:', error);
      }
    }
  };

  const tasksList = [
    {
      id: 'facebook',
      icon: '1',
      title: 'Харесай поста за раздаването',
      description: 'Отвори Facebook страницата на Бачо Илия и харесай поста за раздаването',
      actionLabel: 'Харесай поста',
      actionUrl: 'https://www.facebook.com/Bacho.Iliya/',
      instruction: 'Отвори поста и натисни "Харесай"',
      isCompleted: tasks.facebook,
    },
    {
      id: 'instagram',
      icon: '2',
      title: 'Коментирай: Искам Бачо Илия',
      description: 'Остави коментар под поста за раздаването с текст: "Искам Бачо Илия"',
      actionLabel: 'Коментирай сега',
      actionUrl: 'https://www.facebook.com/Bacho.Iliya/',
      instruction: 'Напиши точно: Искам Бачо Илия',
      isCompleted: tasks.instagram,
    },
    {
      id: 'share',
      icon: '3',
      title: 'Сподели за БОНУС участия',
      description: 'Всяко споделяне ти дава ДОПЪЛНИТЕЛНО участие в раздаването! Колкото повече споделяш, толкова по-големи са шансовете ти да спечелиш',
      actionLabel: 'Сподели сега',
      actionUrl: 'https://www.facebook.com/sharer/sharer.php?u=https://bacho-iliya.eu',
      instruction: 'Сподели за БОНУС участие',
      isCompleted: tasks.share,
    },
  ];

  const completedCount = Object.values(tasks).filter(Boolean).length;
  const totalTasks = tasksList.length;
  const allCompleted = completedCount === totalTasks;

  const handleContinue = () => {
    if (!allCompleted) {
      alert('Моля, завърши всички задачи за да продължиш');
      return;
    }
    setCurrentStep(4);
    router.push('/success');
  };

  const handleBack = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-old-paper relative overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 bg-vintage-paper opacity-30" />

      <div className="max-w-5xl mx-auto relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar currentStep={3} totalSteps={4} />
        </div>

        {/* Notebook Checklist Card */}
        <div className="bg-white shadow-2xl border-4 border-walnut/40 relative overflow-hidden p-8 md:p-12">
          {/* Notebook Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-faded-denim/15"
                style={{ top: `${(i + 1) * 3.33}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-bulgarian-red/30" />

          {/* Perforation Holes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 hidden md:flex flex-col justify-around py-8">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-walnut/20 rounded-full ml-4 border-2 border-walnut/10" />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="absolute inset-0 bg-vintage-paper opacity-20 pointer-events-none" />

          {/* Header */}
          <div className="relative mb-8 pb-6 border-b-2 border-dashed border-walnut/30">
            <h1 className="font-handwritten text-4xl md:text-5xl text-bulgarian-red mb-2">
              Списък със задачи
            </h1>
            <p className="font-handwritten text-walnut text-lg mb-3">
              Здравей, {userData.name}! 👋
            </p>
            <p className="font-handwritten text-xl text-walnut">
              Останали {totalTasks - completedCount} {totalTasks - completedCount === 1 ? 'задача' : 'задачи'} до участието
            </p>
          </div>

          {/* Entry ID */}
          <div className="relative mb-8 bg-bulgarian-red/5 border-l-4 border-bulgarian-red p-6">
            <p className="font-handwritten text-base md:text-lg text-walnut/80 font-bold uppercase mb-3">Твоят номер за потвърждение:</p>
            <div className="flex items-center justify-between gap-4">
              <p className="font-handwritten text-2xl md:text-3xl font-bold text-bulgarian-red">{entryId || 'Loading...'}</p>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-bulgarian-red border-2 border-walnut/30 text-white text-sm font-handwritten font-bold hover:scale-105 transition-all inline-flex items-center gap-2 flex-shrink-0"
              >
                {copied ? '✓ КОПИРАН' : 'КОПИРАЙ'}
              </button>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="relative mb-8 pb-6 border-b border-dashed border-walnut/20">
            <div className="flex items-center justify-between mb-3">
              <p className="font-handwritten text-2xl text-walnut">Прогрес:</p>
              <p className="font-handwritten text-3xl font-bold text-bulgarian-red">
                {completedCount}/{totalTasks}
              </p>
            </div>
            <div className="bg-walnut/10 h-2 relative overflow-hidden">
              <div
                className="bg-bulgarian-red h-full transition-all duration-500"
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              />
            </div>
          </div>

          {/* Tasks Checklist */}
          <div className="relative mb-8">
            <h2 className="font-handwritten text-3xl text-walnut mb-6">Задачи за участие:</h2>
            <div className="space-y-4">
              {tasksList.map((task) => (
                <TaskItem
                  key={task.id}
                  icon={task.icon}
                  title={task.title}
                  description={task.description}
                  actionLabel={task.actionLabel}
                  actionUrl={task.actionUrl}
                  instruction={task.instruction}
                  isCompleted={task.isCompleted}
                  onComplete={() => toggleTask(task.id as 'facebook' | 'instagram' | 'share')}
                  onAction={task.id === 'share' ? handleShare : undefined}
                />
              ))}
            </div>
          </div>

          {/* Share Counter Display */}
          {shareCount > 0 && (
            <div className="relative mb-8 bg-sunflower/10 border-l-4 border-sunflower p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-handwritten text-2xl text-walnut mb-1">
                    БОНУС Участия!
                  </h3>
                  <p className="font-handwritten text-sm text-walnut/70">
                    Всяко споделяне = допълнително участие
                  </p>
                </div>
                <div className="text-center bg-white border-4 border-sunflower px-6 py-4">
                  <p className="text-4xl font-bold text-bulgarian-red">{shareCount}</p>
                  <p className="text-xs font-handwritten text-walnut uppercase">Споделяния</p>
                </div>
              </div>
              <p className="font-handwritten text-lg text-bulgarian-red text-center">
                Общо участия: 1 + {shareCount} бонус = {1 + shareCount}
              </p>
            </div>
          )}

          {/* Selected Products */}
          {selectedProductsList.length > 0 && (
            <div className="relative mb-8 pb-6 border-b border-dashed border-walnut/20">
              <p className="font-handwritten text-xl text-walnut mb-4">Твоите избрани продукти:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProductsList.map((product) => (
                  <span
                    key={product.id}
                    className="font-handwritten text-sm text-walnut bg-old-paper px-3 py-1 border border-walnut/20"
                  >
                    {product.nameBg}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="relative flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-8 py-4 border-4 border-walnut/40 text-walnut font-handwritten font-bold text-lg hover:bg-walnut/5 transition-all"
            >
              ← НАЗАД
            </button>
            <button
              onClick={handleContinue}
              disabled={!allCompleted}
              className={`
                flex-1 px-8 py-4 border-4 border-walnut/40 font-handwritten font-bold text-lg transition-all shadow-xl relative overflow-hidden
                ${
                  allCompleted
                    ? 'bg-bulgarian-red text-white hover:scale-105'
                    : 'bg-walnut/20 text-walnut/50 cursor-not-allowed'
                }
              `}
            >
              {/* Vintage texture */}
              <div className="absolute inset-0 bg-vintage-paper opacity-10 pointer-events-none" />
              <span className="relative">
                {allCompleted ? 'ЗАВЪРШИ УЧАСТИЕТО →' : `ЗАВЪРШИ ЗАДАЧИТЕ (${completedCount}/${totalTasks})`}
              </span>
            </button>
          </div>

          {/* Coffee Stain */}
          <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-walnut/10 blur-lg opacity-30 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
