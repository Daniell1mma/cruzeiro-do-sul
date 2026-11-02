import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";

export function History() {
  return (
    <PublicLayout>
      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-20 md:pt-24 md:px-10 text-center md:text-left">
        <p className="eyebrow text-muted-foreground">Nossa Trajetória</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl text-foreground font-bold leading-[1.08]">
          História da Fraternidade
        </h1>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <div className="border-t border-border pt-12">
          <div className="max-w-4xl mx-auto space-y-8 text-foreground/85 text-base sm:text-lg leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                Fraternidade Cruzeiro do Sul de Apometria
              </h2>
              <p>
                A Fraternidade Cruzeiro do Sul de Apometria de Guarulhos nasceu de um propósito de estudo, aprendizado e serviço, voltado ao desenvolvimento integral do ser e à busca por caminhos complementares de cuidado e equilíbrio.
              </p>
              <p>
                Somos uma Sociedade Beneficente, sem fins lucrativos, políticos ou ideológicos, que tem como finalidade estudar e aprofundar o desenvolvimento mental e físico do ser, além de oferecer tratamentos energéticos alternativos e complementares à saúde física, mental, emocional e espiritual, por meio da terapia vibracional, atualmente conhecida também como Medicina Vibracional.
              </p>
            </div>

            {/* O início */}
            <div className="pt-6 border-t border-border">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                O início de uma caminhada
              </h3>
              <p>
                Nossa história começou em março de 2004, quando o Professor Francisco Alberto da Eira, reconhecido como precursor e multiplicador da Apometria em São Paulo, proferiu uma palestra para apresentar o tema:
              </p>
              <p className="italic font-serif text-xl sm:text-2xl text-primary font-medium py-2">
                “O que é Apometria”.
              </p>
              <p className="mt-2">
                Aquela palestra representou o início de uma nova etapa. O interesse despertado pelo conhecimento apresentado levou à organização do primeiro curso de Apometria da Fraternidade, estruturado em 44 aulas, com o objetivo de formar trabalhadores para a realização dos tratamentos apométricos.
              </p>
              <p className="mt-4">
                A iniciativa foi inspirada também pelas palavras do nobre professor:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 py-2 italic font-serif text-lg text-primary bg-muted/40 my-3">
                “Muitos foram os chamados, mas poucos os escolhidos...”
              </blockquote>
              <p>
                A partir daquele momento, um grupo de pessoas passou a se dedicar ao estudo e à prática da Apometria, dando origem à estrutura que se tornaria a Fraternidade Cruzeiro do Sul.
              </p>
            </div>

            {/* Os primeiros 11 membros */}
            <div className="pt-6 border-t border-border">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Os primeiros 11 membros
              </h3>
              <p>
                No início de sua trajetória, a Fraternidade foi formada por 11 membros fundadores, que assumiram diferentes responsabilidades na organização dos trabalhos:
              </p>
              <ul className="mt-4 space-y-3 pl-4 border-l-2 border-primary/30">
                <li className="leading-relaxed">
                  • <strong>Na orientação espiritual</strong> estava o Mestre Heis Brael, manifestado através do médium Aparecido Begosso <em>(in memoriam)</em>.
                </li>
                <li className="leading-relaxed">
                  • <strong>A coordenação dos trabalhos</strong> ficou sob responsabilidade de Silvia Begosso, conforme determinação do orientador espiritual.
                </li>
                <li className="leading-relaxed">
                  • <strong>A coordenação espiritual dos procedimentos</strong> realizados pela Fraternidade foi atribuída ao Dr. João Paulo da Silva Cunha, apresentado como membro da equipe do Dr. Bezerra de Menezes e designado para essa função.
                </li>
                <li className="leading-relaxed">
                  • <strong>Todos os 11 membros fundadores</strong> atuavam como operadores nas sessões realizadas.
                </li>
                <li className="leading-relaxed">
                  • <strong>Na área pedagógica</strong>, José Rubens Gonçalves recebeu a responsabilidade pela orientação e pelo desenvolvimento de novos cursos e atualizações, acompanhando a expansão do núcleo e o crescimento do grupo de trabalhadores.
                </li>
              </ul>
            </div>

            {/* Duas décadas */}
            <div className="pt-6 border-t border-border">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Uma história construída através do trabalho
              </h3>
              <p>
                Ao longo dos anos, a Fraternidade Cruzeiro do Sul foi ampliando seu grupo de trabalhadores e mantendo seu compromisso com o estudo, a formação e a realização dos trabalhos apométricos.
              </p>
              <p className="mt-4">
                Em 17 de outubro de 2025, a Fraternidade Cruzeiro do Sul completou <strong>21 anos de atuação</strong>, consolidando mais de duas décadas de uma caminhada iniciada em março de 2004, com aquela primeira palestra sobre Apometria proferida pelo Professor Francisco Alberto da Eira. Ao longo desses anos, a Fraternidade manteve seu compromisso com o estudo, a espiritualidade, o desenvolvimento do ser e o serviço ao próximo.
              </p>
            </div>

            {/* Nossa continuidade */}
            <div className="pt-6 border-t border-border">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Nossa continuidade
              </h3>
              <p>
                Atualmente, a Fraternidade Cruzeiro do Sul de Apometria de Guarulhos realiza suas atividades na sede do espaço alternativo <strong>Luz e Expansão da Consciência</strong>, localizada na Rua Barbacena, 101 B (antigo 75) - Jd. Bom Clima, em Guarulhos – SP.
              </p>
              <p className="mt-2">
                Os atendimentos são realizados às <strong>segundas-feiras, às 19h</strong>, mediante agendamento prévio.
              </p>
              
              <div className="p-6 bg-primary text-primary-foreground my-8 text-center rounded-sm">
                <p className="font-serif text-xl sm:text-2xl font-bold italic leading-relaxed text-white">
                  &quot;O trabalho dignifica, a caridade santifica e o amor cura.&quot;
                </p>
                <p className="text-xs eyebrow text-white/80 mt-3">
                  Agradecemos a todos os que fazem e fizeram parte desta história, encarnados e desencarnados.
                </p>
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/atendimento"
                  className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all rounded-none"
                >
                  Agendar Atendimento
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
