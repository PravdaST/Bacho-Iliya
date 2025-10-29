'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGiveawayStore, products } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import TaskItem from '@/components/TaskItem';

export default function TasksPage() {
  const router = useRouter();
  const {
    userData,
    selectedProducts,
    tasks,
    toggleTask,
    setCurrentStep,
    entryId,
    shareCount,
    incrementShareCount,
  } = useGiveawayStore();
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
      description:
        'Всяко споделяне ти дава ДОПЪЛНИТЕЛНО участие в раздаването! Колкото повече споделяш, толкова по-големи са шансовете ти да спечелиш',
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
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24">
      {/* Vintage Paper Texture */}
      <div className="bg-vintage-paper absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar currentStep={3} totalSteps={4} />
        </div>

        {/* Notebook Checklist Card */}
        <div className="border-walnut/40 relative overflow-hidden border-4 bg-white p-8 shadow-2xl md:p-12">
          {/* Notebook Lines */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="border-faded-denim/15 absolute right-0 left-0 border-b"
                style={{ top: `${(i + 1) * 3.33}%` }}
              />
            ))}
          </div>

          {/* Left Margin Line */}
          <div className="bg-bulgarian-red/30 absolute top-0 bottom-0 left-16 w-px" />

          {/* Perforation Holes */}
          <div className="absolute top-0 bottom-0 left-0 hidden w-12 flex-col justify-around py-8 md:flex">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="bg-walnut/20 border-walnut/10 ml-4 h-3 w-3 rounded-full border-2"
              />
            ))}
          </div>

          {/* Paper Texture */}
          <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-20" />

          {/* Header */}
          <div className="border-walnut/30 relative mb-8 border-b-2 border-dashed pb-6">
            <h1 className="font-handwritten text-bulgarian-red mb-2 text-4xl md:text-5xl">
              Списък със задачи
            </h1>
            <p className="font-handwritten text-walnut mb-3 text-lg">
              Здравей, {userData.name}! 👋
            </p>
            <p className="font-handwritten text-walnut text-xl">
              Останали {totalTasks - completedCount}{' '}
              {totalTasks - completedCount === 1 ? 'задача' : 'задачи'} до участието
            </p>
          </div>

          {/* Entry ID */}
          <div className="bg-bulgarian-red/5 border-bulgarian-red relative mb-8 border-l-4 p-6">
            <p className="font-handwritten text-walnut/80 mb-3 text-base font-bold uppercase md:text-lg">
              Твоят номер за потвърждение:
            </p>
            <div className="flex items-center justify-between gap-4">
              <p className="font-handwritten text-bulgarian-red text-2xl font-bold md:text-3xl">
                {entryId || 'Loading...'}
              </p>
              <button
                onClick={handleCopyCode}
                className="bg-bulgarian-red border-walnut/30 font-handwritten inline-flex flex-shrink-0 items-center gap-2 border-2 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105"
              >
                {copied ? '✓ КОПИРАН' : 'КОПИРАЙ'}
              </button>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="border-walnut/20 relative mb-8 border-b border-dashed pb-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-handwritten text-walnut text-2xl">Прогрес:</p>
              <p className="font-handwritten text-bulgarian-red text-3xl font-bold">
                {completedCount}/{totalTasks}
              </p>
            </div>
            <div className="bg-walnut/10 relative h-2 overflow-hidden">
              <div
                className="bg-bulgarian-red h-full transition-all duration-500"
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              />
            </div>
          </div>

          {/* Tasks Checklist */}
          <div className="relative mb-8">
            <h2 className="font-handwritten text-walnut mb-6 text-3xl">Задачи за участие:</h2>
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
            <div className="bg-sunflower/10 border-sunflower relative mb-8 border-l-4 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-handwritten text-walnut mb-1 text-2xl">БОНУС Участия!</h3>
                  <p className="font-handwritten text-walnut/70 text-sm">
                    Всяко споделяне = допълнително участие
                  </p>
                </div>
                <div className="border-sunflower border-4 bg-white px-6 py-4 text-center">
                  <p className="text-bulgarian-red text-4xl font-bold">{shareCount}</p>
                  <p className="font-handwritten text-walnut text-xs uppercase">Споделяния</p>
                </div>
              </div>
              <p className="font-handwritten text-bulgarian-red text-center text-lg">
                Общо участия: 1 + {shareCount} бонус = {1 + shareCount}
              </p>
            </div>
          )}

          {/* Selected Products */}
          {selectedProductsList.length > 0 && (
            <div className="border-walnut/20 relative mb-8 border-b border-dashed pb-6">
              <p className="font-handwritten text-walnut mb-4 text-xl">Твоите избрани продукти:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProductsList.map((product) => (
                  <span
                    key={product.id}
                    className="font-handwritten text-walnut bg-old-paper border-walnut/20 border px-3 py-1 text-sm"
                  >
                    {product.nameBg}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="relative flex flex-col gap-4 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={handleBack}
              className="border-walnut/40 text-walnut font-handwritten hover:bg-walnut/5 flex-1 border-4 px-8 py-4 text-lg font-bold transition-all"
            >
              ← НАЗАД
            </button>
            <button
              onClick={handleContinue}
              disabled={!allCompleted}
              className={`border-walnut/40 font-handwritten relative flex-1 overflow-hidden border-4 px-8 py-4 text-lg font-bold shadow-xl transition-all ${
                allCompleted
                  ? 'bg-bulgarian-red text-white hover:scale-105'
                  : 'bg-walnut/20 text-walnut/50 cursor-not-allowed'
              } `}
            >
              {/* Vintage texture */}
              <div className="bg-vintage-paper pointer-events-none absolute inset-0 opacity-10" />
              <span className="relative">
                {allCompleted
                  ? 'ЗАВЪРШИ УЧАСТИЕТО →'
                  : `ЗАВЪРШИ ЗАДАЧИТЕ (${completedCount}/${totalTasks})`}
              </span>
            </button>
          </div>

          {/* Coffee Stain */}
          <div className="bg-walnut/10 pointer-events-none absolute right-8 bottom-8 h-24 w-24 rounded-full opacity-30 blur-lg" />
        </div>
      </div>
    </div>
  );
}
