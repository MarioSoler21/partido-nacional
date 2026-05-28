function TwitterIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>; }
function InstagramIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>; }
function FacebookIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>; }

export default function SocialFeed() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Síguenos</p>
          <h2 className="font-serif text-text-dark text-3xl md:text-4xl font-bold">
            Redes Sociales
          </h2>
          <div className="mt-3 h-1 w-16 bg-gold rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Twitter/X Feed */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-black px-5 py-3 flex items-center gap-3">
              <TwitterIcon />
              <span className="text-white font-semibold text-sm">@PartidoNacionalHN</span>
            </div>
            <div className="p-5 space-y-4">
              {[
                { text: "Hoy presentamos nuestro plan de trabajo para el 2025. ¡Con Dios, por la Patria, hacia la Libertad! 🇭🇳 #PartidoNacional", time: "hace 2h" },
                { text: "Los resultados hablan por sí solos. 50 nuevas escuelas construidas, 200 km de carreteras. Así trabajamos para Honduras. #HondurasAvanza", time: "hace 1d" },
              ].map((tweet, i) => (
                <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm text-gray-700 leading-relaxed mb-1">{tweet.text}</p>
                  <p className="text-xs text-gray-400">{tweet.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Grid */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div
              className="px-5 py-3 flex items-center gap-3"
              style={{ background: "linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)" }}
            >
              <InstagramIcon />
              <span className="text-white font-semibold text-sm">@PartidoNacionalHN</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=200&q=60",
                  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&q=60",
                  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&q=60",
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60",
                  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&q=60",
                  "https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=200&q=60",
                ].map((src, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Facebook Feed */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-[#1877F2] px-5 py-3 flex items-center gap-3">
              <FacebookIcon />
              <span className="text-white font-semibold text-sm">Partido Nacional HN</span>
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  text: "Inauguramos el nuevo puente que conectará a más de 15,000 familias del sur del país con los centros urbanos.",
                  likes: "1.2K",
                  time: "hace 3h",
                },
                {
                  text: "Nuestros diputados presentaron hoy el proyecto de ley para la reducción del desempleo juvenil. ¡El futuro de Honduras está en sus jóvenes!",
                  likes: "987",
                  time: "hace 8h",
                },
              ].map((post, i) => (
                <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{post.text}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>👍 {post.likes}</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
