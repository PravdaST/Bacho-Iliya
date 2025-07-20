export default function AboutSection() {
  return (
    <section className="py-20 bg-forest text-cream" id="za-nas">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Traditional dairy farm" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-warm-beige">
              НАШАТА КАУЗА Е ПРОСТА.
            </h2>
            <div className="prose prose-lg text-cream/90 leading-relaxed space-y-6">
              <p>
                Ние сме в битка с компромиса. Срещу безвкусното, гумено, воднисто нещо, което се преструва на сирене. Срещу лъжата на етикета.
              </p>
              <p>
                Ние вярваме в 100% мляко. Вярваме в истинския вкус. Вярваме, че това, което слагаш на масата си, е избор.
              </p>
              <p className="text-warm-beige font-semibold text-xl">
                Избери истинското.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
