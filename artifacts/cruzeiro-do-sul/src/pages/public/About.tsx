import { PublicLayout } from "@/components/layout/PublicLayout";

export function About() {
  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Quem Somos
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Conheça a essência da Fraternidade Cruzeiro do Sul, nossos valores e nosso propósito espiritual.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary max-w-none">
            <img 
              src="/about.jpg" 
              alt="Fraternidade Cruzeiro do Sul" 
              className="w-full rounded-2xl shadow-md mb-12 aspect-[21/9] object-cover" 
            />
            
            <h2 className="text-3xl font-bold">Nossa Missão</h2>
            <p>
              A Fraternidade Cruzeiro do Sul tem como missão primária o acolhimento fraterno e o tratamento espiritual de seres encarnados e desencarnados, utilizando a técnica da Apometria aliada aos ensinamentos do Evangelho do Cristo.
            </p>
            <p>
              Buscamos ser um pronto-socorro espiritual, onde a dor encontra alívio e a ignorância encontra esclarecimento. Não nos limitamos apenas à cura física ou perispiritual, mas visamos o despertar da consciência cósmica de cada indivíduo que cruza nossas portas.
            </p>

            <h2 className="text-3xl font-bold mt-12">Nossa Visão</h2>
            <p>
              Ser um centro de referência em tratamento espiritual, estudo e prática da Apometria, reconhecido pela seriedade, ética e amorosidade. Almejamos formar trabalhadores conscientes de sua responsabilidade espiritual, multiplicando os pontos de luz na humanidade.
            </p>

            <h2 className="text-3xl font-bold mt-12">Nossos Valores</h2>
            <ul className="space-y-4">
              <li><strong>Amor Incondicional:</strong> A base de todo o trabalho espiritual e a única força capaz de promover a verdadeira cura.</li>
              <li><strong>Ética e Respeito:</strong> Tratamento digno a todos os seres, encarnados ou não, respeitando seu livre-arbítrio e seu momento evolutivo.</li>
              <li><strong>Gratuidade:</strong> Como ensinou o Cristo: "Dai de graça o que de graça recebestes". Nenhum tratamento ou atendimento é cobrado.</li>
              <li><strong>Estudo Contínuo:</strong> A fé deve ser raciocinada. Incentivamos a busca incessante pelo conhecimento e aprofundamento nas leis universais.</li>
              <li><strong>Humildade:</strong> Reconhecemos que somos apenas instrumentos da Espiritualidade Superior, os verdadeiros curadores.</li>
            </ul>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
