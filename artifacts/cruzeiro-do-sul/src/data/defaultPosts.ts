export interface StaticPost {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  coverUrl: string;
  createdAt: string;
  content: string;
  tags?: string;
}

export const DEFAULT_POSTS: StaticPost[] = [
  {
    id: 101,
    slug: "o-que-e-e-como-funciona-a-apometria",
    title: "O que é e como funciona a Apometria?",
    subtitle: "Conheça os fundamentos bioenergéticos do desdobramento dos corpos sutis e as leis formuladas pelo Dr. José Lacerda de Azevedo.",
    category: "Fundamentos",
    authorName: "Fraternidade Cruzeiro do Sul",
    coverUrl: "/assets-reference/hero.webp",
    createdAt: "2025-01-15T10:00:00Z",
    tags: "Apometria, Desdobramento, Bioenergia, Estudo",
    content: `
      <p>A Apometria é uma técnica terapêutica bioenergética que atua através do desdobramento anímico induzido pela vontade firme e pela energia mental dos operadores.</p>
      <h2>Origem e Significado</h2>
      <p>A palavra Apometria deriva do grego <em>apo</em> (além de, fora de) e <em>metron</em> (medida), significando literalmente <strong>"além da medida, além do corpo físico"</strong>.</p>
      <p>Sua sistematização moderna iniciou-se em 1963 com o Dr. Luiz Rodrigues em Buenos Aires (sob o nome Hipnometria) e foi amplamente desenvolvida e aprofundada a partir do Hospital Espírita de Porto Alegre pelo médico e cirurgião Dr. José Lacerda de Azevedo, que formulou as 13 Leis da Apometria.</p>
      <h2>Como atua o tratamento?</h2>
      <p>Durante a sessão, os operadores utilizam contagens mentais e impulsos bioenergéticos para desdobrar os corpos sutis (astral, mental, etérico) do assistido, permitindo:</p>
      <ul>
        <li>O diagnóstico de ressonâncias do passado e memórias traumáticas;</li>
        <li>O desfazimento de laços obsessivos e encaminhamento amoroso de espíritos necessitados;</li>
        <li>A aplicação de curativos bioenergéticos e alinhamento dos chakras.</li>
      </ul>
      <blockquote>"O trabalho apométrico é realizado com Convicção e Força, sempre fundamentado no amor incondicional e na mais pura caridade."</blockquote>
      <p>Todo o atendimento na Fraternidade é gratuito e complementar à medicina formal.</p>
    `,
  },
  {
    id: 102,
    slug: "como-se-preparar-para-o-atendimento-espiritual",
    title: "Como se preparar para o dia do atendimento apométrico",
    subtitle: "Recomendações essenciais de alimentação, equilíbrio mental e vestimenta para otimizar sua sintonia e recuperação.",
    category: "Orientações",
    authorName: "Equipe de Atendimento",
    coverUrl: "/assets-reference/session-inside.webp",
    createdAt: "2025-02-10T14:30:00Z",
    tags: "Atendimento, Preparação, Saúde, Espiritualidade",
    content: `
      <p>O atendimento apométrico é uma oportunidade preciosa de reequilíbrio bioenergético. A eficácia do trabalho depende diretamente da receptividade vibracional do assistido.</p>
      <h2>Recomendações para as 24 horas que antecedem a sessão:</h2>
      <ul>
        <li><strong>Alimentação leve:</strong> Evite carnes pesadas, alimentos gordurosos e excesso de açúcar no dia do atendimento;</li>
        <li><strong>Abstenção total:</strong> É indispensável não consumir bebidas alcoólicas, energéticos ou fumo por pelo menos 24 horas antes da sessão;</li>
        <li><strong>Harmonia mental:</strong> Procure manter pensamentos elevados, evitando discussões, estresse e agitação desnecessária;</li>
        <li><strong>Vestimenta adequada:</strong> Venha com roupas confortáveis, discretas e de cores claras. Você permanecerá deitado durante o trabalho. É expressamente vedado o uso de bermudas, shorts, regatas, transparências ou decotes;</li>
        <li><strong>Pontualidade:</strong> O portão de entrada fecha às 19:30h impreterivelmente.</li>
      </ul>
      <p>Lembre-se: o tratamento espiritual não substitui seus remédios ou acompanhamentos médicos.</p>
    `,
  },
  {
    id: 103,
    slug: "21-anos-de-historia-e-amor-fraterno",
    title: "21 Anos de Amor, Estudo e Caridade em Guarulhos",
    subtitle: "A trajetória da Fraternidade Cruzeiro do Sul desde o marco inicial com o Prof. Francisco Alberto da Eira em 2004.",
    category: "Institucional",
    authorName: "Coordenação Geral",
    coverUrl: "/assets-reference/portas-abertas.webp",
    createdAt: "2025-10-17T09:00:00Z",
    tags: "História, 21 Anos, Francisco da Eira, Guarulhos",
    content: `
      <p>Em outubro de 2025, a Fraternidade Cruzeiro do Sul comemorou 21 anos de dedicação contínua ao estudo e à prática da Apometria e ao acolhimento de milhares de irmãos necessitados.</p>
      <h2>As sementes de março de 2004</h2>
      <p>Nossa história teve início formal quando o Professor Francisco Alberto da Eira, eminente divulgador da técnica apométrica no estado de São Paulo, ministrou a seminal palestra <em>"O que é Apometria"</em>.</p>
      <p>Sob a orientação espiritual do Mestre Heis Brael e com o suporte dos 11 membros fundadores pioneiros, o grupo iniciou seus primeiros atendimentos em Guarulhos com compromisso inabalável de gratuidade, estudo sério e caridade pura.</p>
      <h2>A Sede Luz e Expansão da Consciência</h2>
      <p>Hoje, estabelecida na Rua Barbacena, 101 B, no Jardim Bom Clima, a Fraternidade segue acolhendo semanalmente a todos que buscam a luz, oferecendo sessões apométricas, passes energéticos e cursos periódicos de capacitação.</p>
      <p><em>"Servir é o caminho. Curar é merecimento."</em></p>
    `,
  },
];
