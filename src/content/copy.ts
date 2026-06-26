/**
 * All prose strings, in the author's voice (direct, sourced, no em-dashes, no
 * antithesis), English-US. Transcribed from 03-CONTENT.md, which is aligned to
 * the v3 report. Numbers live in case.ts; this file never restates a stat that
 * a component should read from data, except where a sentence quotes one.
 *
 * Framework attributions here are the v3-corrected ones (00-PROJECT-BRIEF §6):
 * Protean Career (Hall) and Psychological Contract (Schein) for careers, NOT
 * "career anchor"; Company Attractants (Daft) for attraction; the real 80
 * target; the Design LATAM scope.
 */

/* ------------------------------------------------------------------ *
 * Shared types
 * ------------------------------------------------------------------ */
export interface SectionIntro {
  eyebrow: string
  headline: string
}

export interface Verbatim {
  tag: string
  text: string
  tone: 'neutral' | 'positive'
}

export interface TheoryCard {
  id: string
  classLabel: string
  title: string
  body: string
  chips: string[]
}

export interface SolutionFront {
  id: string
  title: string
  body: string
}

export interface DebateLens {
  label: string
  kind: 'a' | 'b'
  text: string
}

export interface DebateCard {
  num: string
  theme: string
  question: string
  lensA: DebateLens
  lensB: DebateLens
  footnote: string
}

/* ------------------------------------------------------------------ *
 * Chapter 00 · Opening (Hero)
 * ------------------------------------------------------------------ */
export const hero = {
  eyebrow: 'Estudo de caso · Gestão Estratégica de Pessoas',
  headline: 'De cento e vinte para 140 mil. E a identidade que se diluiu.',
  lead: 'Em quatro anos, a Poatek saiu de 120 pessoas para um corpo global de 140 mil via M&A. O Pulsecheck 2025 da área de Design da empresa mostra o preço: engajamento no quartil inferior.',
}

/* ------------------------------------------------------------------ *
 * Chapter 01 · Introduction
 * ------------------------------------------------------------------ */
export const intro = {
  eyebrow: 'Introdução',
  headline: 'Um problema de pessoas, lido com as ferramentas da disciplina.',
  body: [
    'Na economia digital, a gestão estratégica de pessoas é o diferencial competitivo mais claro de uma empresa. Onde o capital intelectual é o ativo principal, atrair, desenvolver e engajar talentos decide quem sustenta o negócio e segue inovando.',
    'Este relatório diagnostica um problema de gestão de pessoas na operação de Design da América Latina da TELUS Digital. O escopo não é só o Brasil: em 2025, Buenos Aires e Cidade da Guatemala entraram ao lado de Porto Alegre e São Paulo, e a dimensão regional fica visível. Após as aquisições e o salto de escala, o clima e a intenção de permanência caíram. A análise corre pelas lentes do curso: Gestão de Carreiras, Avaliação de Desempenho, Treinamento e Desenvolvimento, Atração e Seleção.',
  ],
  /** The four framework names that get an animated underline foreshadowing Ch.04. */
  frameworkNames: [
    'Gestão de Carreiras',
    'Avaliação de Desempenho',
    'Treinamento e Desenvolvimento',
    'Atração e Seleção',
  ],
}

/* ------------------------------------------------------------------ *
 * Chapter 02 · The Organization
 * ------------------------------------------------------------------ */
export const organization = {
  eyebrow: 'Contexto · A empresa',
  headline: 'Uma célula local dentro de um gigante global.',
  intro:
    'A TELUS Digital é o braço global de tecnologia e Customer Experience da TELUS. A operação de Design da América Latina começou como Poatek, uma boutique de software de Porto Alegre com cultura de ofício, agilidade e identidade profissional forte. Hoje é uma célula de 41 pessoas dentro de um corpo global de 140 mil, em quatro escritórios e três países.',
  ringCaption:
    'Apoio forte de quem está perto, pouca conexão com o todo. O anel central é a amostra de 41 pessoas.',
  timelineBody:
    'Foram três integrações críticas. A WillowTree comprou a Poatek em 2021. A TELUS International comprou a WillowTree em 2022. Em 2025 a operação virou TELUS Digital, a empresa fechou capital, e Buenos Aires e Cidade da Guatemala entraram no grupo. O ano com mais mudanças em sistemas, liderança e cultura. O salto de boutique para escala corporativa não veio com uma estratégia de sustentar o capital humano e preservar a cultura original, o que deixou a operação em mudança institucional constante e afastou a liderança global da base.',
  financialsBody:
    'O negócio é saudável. A receita anual chegou a US$ 2,8 bi em 2025, 5% acima de 2024, com lucro positivo. É por isso que o problema se esconde nos decks de resultado. Aqui o problema é de pessoas, e os números provam que não é de dinheiro.',
  financialsClosing: 'O negócio cresce e dá lucro. O problema é de pessoas.',
}

/* ------------------------------------------------------------------ *
 * Chapter 03 · The Central Problem
 * ------------------------------------------------------------------ */
export const problem = {
  eyebrow: 'Diagnóstico · O problema',
  headline: 'Engajamento no quartil inferior, com um paradoxo no centro.',
  statement:
    'Engajamento em 40 contra a meta de 80 do Scorecard 2025. Metade da meta, no quartil inferior do benchmark. A causa: crise de engajamento e diluição de identidade após as aquisições. As mudanças constantes de gestão e a pressão por escala romperam o contrato psicológico.',
  distributionCaption:
    '60% das pessoas estão passivas ou ativamente desengajadas. Só 1 em 4 está altamente engajada.',
  methodologyBody:
    'Leia o número com honestidade sobre seus limites. Amostra pequena, 20 respostas em 41, e o método mudou de 2024 para 2025, o que bloqueia comparação histórica direta. Por isso não se afirma categoricamente um colapso do engajamento: falta uma base comparável estável. Os limites não invalidam o diagnóstico. Um workshop com os 41 membros do time confirmou que o sentimento era compartilhado pela grande maioria. A triangulação do dado quantitativo com a escuta qualitativa é o que sustenta as conclusões.',
  caveatItems: [
    'Só 20 respostas em 41.',
    'Método mudou de 2024 para 2025: uma escala de 1 a 5 virou % favorável mais um benchmark “Global Top 25%”.',
    'Exclusões: estagiários, menos de 3 meses de casa e o escritório da Argentina (GM2, adquirido em meados de 2025) ficaram fora do escopo.',
    'Parte dos dados de outra diretoria se perdeu por erro de sistema.',
  ],
  caveatCorroboration:
    'A escuta pós-relatório converge com os números. A fragilidade estatística pede cautela na precisão, e o diagnóstico qualitativo confirma a direção.',
  changeMgmtBody:
    'A leitura do caso aponta a gestão da mudança nas integrações como o eixo da falha. O curso não oferece um framework formal de gestão de mudança, então esta é uma interpretação do caso, apoiada na discussão de mudança organizacional em Wood Jr (1995) e no caso GE da Aula 6. O foco em integração operacional e produtividade negligenciou o impacto humano da transição. As dimensões afetadas se leem pelo modelo Say (falar bem), Stay (querer ficar) e Strive (esforçar-se além), o framework do próprio Pulsecheck.',
  sayStayStriveCaption:
    'As pessoas recomendam a empresa (Say 75), mas não querem ficar (Stay 25, gap −49) e não se sentem inspiradas a fazer mais (Strive 30, gap −45).',
  paradoxBody:
    'O fato mais característico do caso é um paradoxo entre o micro e o macro. No time imediato, a confiança é altíssima: apoio do gestor para ter sucesso em 100, respeito dos colegas em 100, incentivo a inovar em 95. No nível institucional, os indicadores despencam. “É seguro me posicionar sem medo” em 30, o pior item da pesquisa, “motivado pelos valores da empresa” também em 30, “entendo meu programa de remuneração” em 35. As pessoas confiam em quem está perto e desconfiam do que está acima. A tensão também apareceu nos workshops, no desconforto de se posicionar em reuniões maiores e de escalar temas à vice-presidência e à liderança global. A insegurança é com o nível global e institucional, não com o gestor direto. Segurança psicológica aqui é um conceito consolidado na literatura, associado a Edmondson.',
  paradoxBridge:
    'As pessoas confiam em quem está perto e perderam o vínculo com o que está acima. Um bom gestor segura o time sobre uma base institucional que não se sustenta sozinha.',
  dimensionCaption:
    'Forte onde o trabalho encontra o cliente, fraco onde a operação encontra a instituição. A Marca Empregadora fica 34 pontos abaixo da empresa.',
  leadership: {
    quote: 'Resolver isto também é responsabilidade sua.',
    highlight: 'responsabilidade sua',
    context:
      'Não vamos mudar uma organização de mais de 100 mil pessoas. Mas moldamos o nosso entorno. Não consigo resolver sozinho. Preciso da ajuda de vocês. A liderança assume a culpa, “a culpa é só minha”, e promete que não há punição pela honestidade.',
    attentionLabel: 'Ponto de atenção',
    attention:
      'A mensagem é honesta e mobilizadora, e chega logo depois de as pessoas dizerem que não se sentem seguras para falar. Pedir que “resolvam” pode soar como empoderamento ou como transferência de responsabilidade. A intenção é boa. O momento e o enquadramento pedem cuidado.',
  },
}

export const verbatims: Verbatim[] = [
  {
    tag: 'Sobre clareza',
    tone: 'neutral',
    text: 'Um plano de progressão de carreira mais claro, com expectativas definidas por nível, apoiaria o desenvolvimento e o crescimento de longo prazo.',
  },
  {
    tag: 'Sobre clareza',
    tone: 'neutral',
    text: 'A falta de transparência na comunicação gera incerteza e especulação entre colegas, reduz a confiança na liderança e desgasta a cultura.',
  },
  {
    tag: 'Sobre se posicionar',
    tone: 'neutral',
    text: 'Às vezes é difícil falar abertamente, porque as reações a perguntas ou opiniões diferentes podem ser bem defensivas. Isso me deixa hesitante em questionar ideias.',
  },
  {
    tag: 'Sobre cultura',
    tone: 'positive',
    text: 'O que mais valorizo é a forte cultura de colaboração, que nos permite seguir aprendendo uns com os outros.',
  },
]

/* ------------------------------------------------------------------ *
 * Chapter 04 · Analysis Through Frameworks
 * ------------------------------------------------------------------ */
export const analysis = {
  eyebrow: 'Lentes teóricas',
  headline: 'Seis lentes, uma operação sob tensão.',
}

export const theoryCards: TheoryCard[] = [
  {
    id: '4.1',
    classLabel: 'Aula 7 · Gestão de Carreiras',
    title: 'Carreira proteana e perda de propósito.',
    body: 'A transição para a carreira proteana (Hall, Aula 7) travou. Sem protagonismo e sem clareza de trilha, o contrato psicológico (Schein) se desgasta. As trilhas impostas não dialogam com a identidade da fase boutique, o que conecta às preferências de carreira de Dutra.',
    chips: [
      'Carreira proteana (Hall)',
      'Contrato psicológico (Schein)',
      'Plano de carreira Y (já existe)',
      'Dutra',
    ],
  },
  {
    id: '4.2',
    classLabel: 'Aula 6 · Avaliação de Desempenho',
    title: 'Resultado e comportamento, interrompidos.',
    body: 'No crescimento rápido, a avaliação virou puramente métrica, fixa no quê e cega ao como, contra a Performance Sustentável da Aula 6, que liga resultado a comportamento. Ignorar o potencial deixa de fora a Matriz Desempenho x Potencial, o 9-box e a Learning Agility (Lombardo e Eichinger, 2000), úteis numa transição em que aprender em novos contextos importa mais que a entrega passada. Sem segurança psicológica, a avaliação é vista como injusta e atinge o Strive.',
    chips: [
      'Performance Sustentável (o quê + como)',
      '9-box matrix',
      'Learning Agility (Lombardo & Eichinger, 2000)',
    ],
  },
  {
    id: '4.3',
    classLabel: 'Aula 5 · Treinamento e Desenvolvimento',
    title: 'O suporte que a escala exigia.',
    body: 'A empresa não mediu o impacto das ações de desenvolvimento na transição. A Aula 5 traz o vocabulário que faltou: os quatro níveis de Kirkpatrick (1975) e o Phillips ROI aferem reação, aprendizado, mudança de comportamento e resultado, em vez de tratar treinamento como custo sem retorno. Escalar pedia desenvolver liderança via Andragogia (Knowles, 1975) e aprendizado experiencial (Kolb, 1984). A falta de Mentoring para preservar o conhecimento cultural da Poatek deixou um vácuo de competências comportamentais.',
    chips: [
      'Kirkpatrick (1975)',
      'Phillips ROI',
      'Andragogia (Knowles, 1975)',
      'Kolb (1984)',
      'Mentoring',
    ],
  },
  {
    id: '4.4',
    classLabel: 'Aula 3 · Atração e Seleção',
    title: 'A promessa de empregador descolou da experiência real.',
    body: 'As aquisições enfraqueceram o que a Aula 3 chama de Atrativos da Empresa (Daft), o que torna uma organização desejável ao talento, próximo do EVP (Proposta de Valor ao Empregado) e do Employer Branding. A experiência de boutique virou operação de escala. Pela tipologia de Windolf (1986), sem realinhar a Atração e Seleção, a empresa segue atraindo perfis que buscam uma cultura que não existe mais, alimentando o ciclo de turnover.',
    chips: [
      'Atrativos da Empresa (Daft)',
      'EVP / Employer Branding',
      'Windolf (1986)',
      'Contrato psicológico',
    ],
  },
  {
    id: '4.5',
    classLabel: 'Aula 2 · Cultura Organizacional',
    title: 'Diluição de identidade após a aquisição.',
    body: 'A diluição de identidade se ancora na Aula 2, que trata a cultura organizacional no sentido de Schein, com seus três níveis (artefatos, valores declarados e pressupostos básicos), lida por Fleury. A erosão desgasta a camada mais profunda de pressupostos que a Poatek construiu, substituída por uma identidade corporativa global ainda não internalizada. Quando os artefatos mudam sem reconstruir valores e pressupostos com o time, a cultura deixa de ser motor e vira fonte de estranhamento. Isso explica por que a confiança institucional caiu enquanto a do time imediato ficou intacta.',
    chips: ['Schein (três níveis)', 'Fleury', 'Artefatos / valores / pressupostos'],
  },
  {
    id: '4.6',
    classLabel: 'Aula 2 · Competências',
    title: 'O descompasso entre boutique e escala.',
    body: 'No sentido de Prahalad e Hamel, as core competences são as raízes da vantagem competitiva. As da Poatek eram excelência em produto digital e intimidade consultiva com o cliente. Não foram cultivadas como ativo estratégico na transição, e uma competência que deixa de ser reconhecida tende a virar commodity e diluir. No nível individual (Fleury e Zarifian, competência como mobilização que gera valor reconhecido), a escala passou a exigir o que era secundário: gerir stakeholders sêniores e globais, dominar o negócio do cliente e influenciar num contexto multinacional, mais hierárquico e multilíngue. Esse descompasso é uma raiz da queda do Strive e da insegurança institucional. Sem um mapa formal, o modelo de competências e leveling ainda em construção, ninguém tem clareza do que se espera por nível, ligando ao problema de carreira de 4.1.',
    chips: [
      'Core competences (Prahalad & Hamel)',
      'Competência em ação (Fleury / Zarifian)',
      'Modelo de leveling em construção',
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Chapter 05 · Proposed Solution
 * ------------------------------------------------------------------ */
export const solution = {
  eyebrow: 'Recomendação',
  headline: 'Um plano de sustentação do capital humano, com metas a calibrar.',
  intro:
    'Para estabilizar o ambiente e recuperar os índices de Say, Stay e Strive, o plano tem cinco frentes. As metas abaixo são propostas para calibrar com a liderança e a realidade de cada escritório, não compromissos rígidos.',
  closing:
    'A crise na operação de Design da América Latina da TELUS Digital é um desafio de pessoas típico de quem escala rápido por aquisições. A solução não está nos números financeiros, que seguem saudáveis. Está em reconstruir o contrato psicológico com a instituição e valorizar o capital humano. A base mais difícil de construir, a confiança no gestor e nos colegas, ainda está de pé, e é dela que o resto se reconstrói. Preservando identidade, dando clareza de carreira e apoiando líderes na nova escala, com metas verificáveis no Pulsecheck e atenção à diversidade dos quatro escritórios, dá para reverter a queda. Tratar pessoas como ativo central da mudança é o caminho para transformar a complexidade das aquisições em vantagem competitiva sustentável.',
}

export const solutionFronts: SolutionFront[] = [
  {
    id: '5.1',
    title: 'Construir capacidade para a nova escala.',
    body: 'O plano de carreira (Y) já existe. Falta preparo para operar em escala, e não como boutique: decisões de maior impacto, stakeholders mais sêniores, outro jeito de trabalhar. Esta frente combina treinamento, andragogia e mentoring de liderança, com impacto medido por Kirkpatrick. Meta proposta: 100% dos gestores em um programa de liderança em escala em 6 meses, e Strive de 30 para 50 em 12 meses.',
  },
  {
    id: '5.2',
    title: 'Proteger o que funciona.',
    body: 'A confiança no gestor em 100 e a cultura de colaboração com colegas que se respeitam em 100 são os ativos mais fortes do diagnóstico e a base de tudo. Reconhecer, dar visibilidade e usar como alavanca, sem tratar como garantido. Meta proposta: manter ambos acima de 90 nas próximas ondas do Pulsecheck e tratar qualquer queda como alerta prioritário.',
  },
  {
    id: '5.3',
    title: 'Segurança psicológica primeiro.',
    body: 'Segurança psicológica é a prioridade número um, e exige ação de quem tem poder: líderes que modelam vulnerabilidade e respondem bem à divergência, não só uma mensagem de “fale à vontade”. Como o desconforto se concentra em reuniões maiores e em escalar à vice-presidência e à liderança global, a ação precisa criar canais seguros nesse nível. Meta proposta: segurança para se posicionar de 30 para 55 em 12 meses e 70 em 18 meses.',
  },
  {
    id: '5.4',
    title: 'Perfil, contratação e saída.',
    body: 'Realinhar o EVP e o perfil buscado na seleção à realidade de uma empresa de escala, pelos Atrativos da Empresa (Daft), preparar o RH para um turnover possivelmente maior e investir em offboarding humano. Parte das saídas é reajuste de perfil próprio da transição de boutique para escala, e distinguir os dois tipos de saída é parte da gestão. Meta proposta: instrumentar a medição de turnover para separar perda evitável de reajuste em 3 meses, e recuperar Stay de 25 para 45 em 12 meses.',
  },
  {
    id: '5.5',
    title: 'Recuperação dos indicadores de engajamento.',
    body: 'Esta frente consolida as metas anteriores em um avanço faseado para reconstruir o contrato psicológico, ancorado no Pulsecheck. Metas propostas, verificadas em ondas semestrais: engajamento geral de 40 para a meta de 80 do Scorecard, com marco de 60 em 12 meses, saindo do quartil inferior; segurança para se posicionar de 30 para 55 em 12 meses; Stay de 25 para 45 e Strive de 30 para 50 no mesmo período; e apoio do gestor e respeito dos colegas acima de 90. Ler cada meta pela heterogeneidade regional, já que Porto Alegre, São Paulo, Buenos Aires e Cidade da Guatemala partem de pontos diferentes.',
  },
]

export interface RolloutPhase {
  when: string
  text: string
}

export const rolloutPhases: RolloutPhase[] = [
  {
    when: 'Agora',
    text: 'Digerir os resultados em quatro focos: segurança psicológica, entender e questionar os valores, decodificar estrutura e comunicação corporativa, e melhorar o reconhecimento.',
  },
  {
    when: 'Próximas semanas',
    text: 'Brainstorms locais, “dores locais, soluções locais”, atacando uma ou duas causas raiz em vez de cobrir tudo por cima.',
  },
  {
    when: 'Início de janeiro',
    text: 'Planos regionais, compilados, defendidos acima e executados, com compromissos em três níveis: consigo, com o grupo e com o negócio.',
  },
  {
    when: '2026',
    text: 'Refletir as ações nos objetivos individuais de 2026 para o plano não morrer na apresentação.',
  },
]

/* ------------------------------------------------------------------ *
 * Chapter 06 · Discussion
 * ------------------------------------------------------------------ */
export const discussion = {
  eyebrow: 'Perguntas para a turma',
  headline: 'Cinco perguntas para abrir o debate.',
  intro:
    'Não há resposta única. Cada cartão traz uma tensão real do caso e duas lentes opostas para a sala discutir.',
}

export const debateCards: DebateCard[] = [
  {
    num: 'Q1',
    theme: 'Engajamento pós-M&A',
    question:
      'O engajamento caiu para 40, metade da meta, depois de três aquisições. É o custo de escalar ou o M&A corroendo o ativo que comprou?',
    lensA: {
      label: 'Custo de transição',
      kind: 'a',
      text: 'Quedas de engajamento são esperadas e temporárias em integrações agressivas. O negócio cresceu, com receita e lucro em alta, e o score tende a se recuperar quando as pessoas assentam.',
    },
    lensB: {
      label: 'Destruição de valor',
      kind: 'b',
      text: '40 contra uma meta de 80 é um sinal antecipado, não ruído. O M&A subestimou o capital humano, e o talento e a cultura que foram comprados estão se desfazendo, com Stay em 25.',
    },
    footnote:
      'Engajamento em 40, metade da meta de 80 do Scorecard, após três integrações em quatro anos. Stay (querer ficar) em 25, gap −49.',
  },
  {
    num: 'Q2',
    theme: 'Segurança psicológica',
    question:
      'Como pedir “fale abertamente” e “a responsabilidade é sua” a quem acabou de dizer que tem medo de falar?',
    lensA: {
      label: 'Empoderamento',
      kind: 'a',
      text: 'Dar voz e protagonismo é justamente o que destrava a segurança psicológica. Esperar a empresa resolver primeiro mantém todo mundo passivo.',
    },
    lensB: {
      label: 'Transferência de responsabilidade',
      kind: 'b',
      text: 'Segurança psicológica é criada por quem tem poder. Devolver o problema a quem se sente vulnerável pode aprofundar o silêncio.',
    },
    footnote:
      '“É seguro me posicionar sem medo” tem 30 favorável, o pior item da pesquisa.',
  },
  {
    num: 'Q3',
    theme: 'Time vs instituição',
    question:
      'Até onde um bom gestor consegue blindar o time de uma cultura organizacional diluída?',
    lensA: {
      label: 'O gestor é o que importa',
      kind: 'a',
      text: 'Com apoio do gestor em 100, o microambiente protege e o time se sustenta. O que está perto é o que segura as pessoas.',
    },
    lensB: {
      label: 'É insustentável',
      kind: 'b',
      text: 'Stay em 25 e Strive em 30 mostram que a blindagem tem limite. Sem vínculo institucional, o esforço do gestor vira contenção de danos, não engajamento.',
    },
    footnote:
      'Apoio do gestor 100 (+16 vs benchmark) convivendo com valores em 30 (−46). O bom líder está segurando. Por quanto tempo?',
  },
  {
    num: 'Q4',
    theme: 'M&A e cultura',
    question:
      'A diluição de identidade em aquisições sucessivas é inevitável ou foi falha de gestão da mudança?',
    lensA: {
      label: 'Custo natural da escala',
      kind: 'a',
      text: 'Integrar 120 pessoas a 140 mil exige padronização. Alguma perda de identidade é o preço do acesso a recursos, clientes e estabilidade.',
    },
    lensB: {
      label: 'Negligência cultural',
      kind: 'b',
      text: 'Três integrações em quatro anos sem cuidar de cultura e comunicação é uma escolha, não destino. A due diligence cultural costuma ficar para depois.',
    },
    footnote:
      'Três integrações em quatro anos; 2025 foi descrito como “o ano com mais mudanças”, com forte diluição da identidade local.',
  },
  {
    num: 'Q5',
    theme: 'Turnover: até onde vale lutar?',
    question:
      'A empresa consegue distinguir por que cada pessoa sai e agir de forma diferente em cada caso?',
    lensA: {
      label: 'Toda saída é perda',
      kind: 'a',
      text: 'Perder gente qualificada tem alto custo de reposição e impacto na entrega. Stay em 25 é um alerta cultural para tratar, não para normalizar.',
    },
    lensB: {
      label: 'Nem toda saída é falha',
      kind: 'b',
      text: 'Há dois turnovers aqui: quem saiu porque a empresa mudou e o contrato implícito se rompeu (reajuste esperado) e quem deveria ficar mas vai por falta de segurança, remuneração opaca ou perspectiva. O trabalho é separar os dois e reter só quem faz sentido reter.',
    },
    footnote:
      'O que o RH provavelmente não responde hoje é quanto do turnover recente foi reajuste de perfil de boutique para escala e quanto foi perda evitável. Sem essa distinção, a empresa retém quem não quer ficar e perde quem deveria ficar.',
  },
]

/* ------------------------------------------------------------------ *
 * Close
 * ------------------------------------------------------------------ */
export const close = {
  assetsLabel: 'Ativos a proteger',
  urgencyLabel: 'Urgência número um',
  sourceNote:
    'Construído a partir da leitura do Pulsecheck 2025 e do relatório v3. O modelo de engajamento (Say/Stay/Strive) é da pesquisa. Segurança psicológica segue Edmondson. As lentes do curso são atribuídas por aula (Aulas 2, 3, 5, 6, 7).',
}
