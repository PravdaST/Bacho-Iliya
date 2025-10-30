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


  const tasksList = [
    {
      id: 'facebook',
      icon: '1',
      title: 'Харесай този пост за раздаването',
      description: 'Виж поста по-долу, харесай го, тагни 2-ма приятели и последвай страницата',
      actionLabel: 'Отвори в Facebook',
      actionUrl: 'https://www.facebook.com/Bacho.Iliya/posts/pfbid0chdESCDSnnd4dRdbqWDe6WqxvJcG3KGixQFszLHvUzvZTa6X3fgFCvfQTTRZw6xol',
      instruction: '1. Харесай поста ❤️  2. Тагни 2-ма приятели 👥  3. Последвай страницата ➕',
      embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FBacho.Iliya%2Fposts%2Fpfbid0chdESCDSnnd4dRdbqWDe6WqxvJcG3KGixQFszLHvUzvZTa6X3fgFCvfQTTRZw6xol&show_text=true&width=500',
      isCompleted: tasks.facebook,
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
                  embedUrl={(task as any).embedUrl}
                  isCompleted={task.isCompleted}
                  onComplete={() => toggleTask(task.id as 'facebook')}
                />
              ))}
            </div>
          </div>

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
