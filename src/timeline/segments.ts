/**
 * Teleprompter timeline for the live talk (hidden /timeline.html page).
 *
 * The full 25-minute run is sliced into the script's natural beats. Each segment
 * carries its start/end on the running clock (seconds from 00:00), the screen cue
 * ("na tela"), and SUCCINCT bullets — a few words each, glanceable from across a
 * room. Depth lives in the speaker's head; the screen only jogs memory.
 *
 * Source: "Roteiro de Apresentação · Caso TELUS Digital (Design LATAM)".
 */

export interface Segment {
  /** Inclusive start on the running clock, in seconds from 00:00. */
  start: number
  /** Exclusive end on the running clock, in seconds. */
  end: number
  /** Which block of the talk this beat belongs to. */
  bloco: 1 | 2 | 3
  blocoLabel: string
  /** Beat title (right column heading). */
  title: string
  /** Optional "na tela" cue — what to have on screen. */
  screen?: string
  /** Succinct talking points — a few words each. */
  bullets: string[]
  /** Milestone alarm to surface prominently (the two mental alarms). */
  alarm?: string
  /** True for beats flagged "corte se faltar tempo". */
  cut?: boolean
}

const B1 = 'Bloco 1 · Apresentação'
const B2 = 'Bloco 2 · Discussão em grupos'
const B3 = 'Bloco 3 · Plenária'

export const SEGMENTS: Segment[] = [
  {
    start: 0,
    end: 45,
    bloco: 1,
    blocoLabel: B1,
    title: 'Abertura',
    screen: 'Hero · números de destaque',
    bullets: [
      'Boutique de ~100 → célula de 41',
      'Dentro de 140 mil globais',
      'Pulsecheck 2025: engajamento 40',
      'Quartil inferior do mercado',
      'Gancho: confia no time, desconfia da instituição',
    ],
  },
  {
    start: 45,
    end: 90,
    bloco: 1,
    blocoLabel: B1,
    title: 'Introdução',
    screen: 'Seção de introdução',
    bullets: [
      'Recorte: Design LATAM (não só BR)',
      '4 escritórios · 3 países',
      'Buenos Aires + Guatemala entraram em 2025',
      'Lentes: Carreira · Desempenho · T&D · Atração · Cultura',
    ],
  },
  {
    start: 90,
    end: 210,
    bloco: 1,
    blocoLabel: B1,
    title: 'A Empresa',
    screen: 'Diluição · linha do tempo · finanças',
    bullets: [
      '41 dentro de 140 mil',
      'WillowTree 21 · TELUS Intl 22 · TELUS Digital 25',
      '3 integrações em 4 anos',
      '2025: o ano de mais mudança',
      'US$ 2,8 bi · +5% · lucro positivo',
      'Tese: problema é de gente, financeiro saudável',
    ],
  },
  {
    start: 210,
    end: 270,
    bloco: 1,
    blocoLabel: B1,
    title: 'O número e a meta',
    screen: 'Escala 40 vs 80 · distribuição',
    bullets: [
      'Engajamento 40 vs meta 80',
      'Metade da meta · quartil inferior',
      '60% passivos ou desengajados',
      'Só 1 em 4 altamente engajado',
    ],
  },
  {
    start: 270,
    end: 360,
    bloco: 1,
    blocoLabel: B1,
    title: 'Say · Stay · Strive',
    screen: 'Gráfico Say/Stay/Strive',
    bullets: [
      'Modelo da própria pesquisa',
      'Say 75 → recomendam',
      'Stay 25 → não querem ficar (gap 49)',
      'Strive 30 → não inspirados (gap 45)',
      'Marca descolada da experiência',
    ],
  },
  {
    start: 360,
    end: 450,
    bloco: 1,
    blocoLabel: B1,
    title: 'O paradoxo central',
    screen: 'Time forte × instituição fraca',
    bullets: [
      'Gestor 100 · colegas 100 · inovação 95',
      'Posicionar 30 → pior item da pesquisa',
      'Valores 30 · remuneração 35',
      '“Confiam no perto, desconfiam do alto”',
      'Medo: reuniões grandes e VP/global',
    ],
  },
  {
    start: 450,
    end: 510,
    bloco: 1,
    blocoLabel: B1,
    title: 'Honestidade metodológica',
    screen: 'Bloco de ressalvas',
    bullets: [
      'Amostra: 20 de 41',
      'Medição mudou 24→25 (sem histórico)',
      'Workshop com os 41 confirmou',
      'Triangulação sustenta o diagnóstico',
    ],
  },
  {
    start: 510,
    end: 570,
    bloco: 1,
    blocoLabel: B1,
    title: 'A tensão da liderança',
    screen: 'Mensagem da liderança',
    cut: true,
    bullets: [
      'Liderança assumiu e pediu ajuda',
      '“Também é sua responsabilidade”',
      'Veio após “tenho medo de falar”',
      'Empoderamento ou transferência?',
    ],
  },
  {
    start: 570,
    end: 600,
    bloco: 1,
    blocoLabel: B1,
    title: 'Ponte para a discussão',
    bullets: [
      'Problema: contrato com a instituição',
      'Não dar a resposta pronta',
      'Abrir 4 tensões · dividir grupos',
    ],
  },
  {
    start: 600,
    end: 645,
    bloco: 2,
    blocoLabel: B2,
    title: 'Montar a dinâmica',
    screen: 'Discussão · as quatro perguntas',
    alarm: 'Abrir grupos · 10:00',
    bullets: [
      '4 grupos · 1 por pergunta',
      'Escolher lado: argumento + contraponto',
      '4 minutos',
      'Perguntas: segurança · time×instituição · M&A · turnover',
    ],
  },
  {
    start: 645,
    end: 870,
    bloco: 2,
    blocoLabel: B2,
    title: 'Grupos discutem',
    screen: 'Circular e provocar',
    bullets: [
      'P1 · posicionar 30 → poder cria segurança',
      'P2 · gestor 100 × valores 30 → segura sozinho?',
      'P3 · 3 integrações/4 anos → due diligence cultural',
      'P4 · Stay 25 → nem toda saída é falha',
    ],
  },
  {
    start: 870,
    end: 900,
    bloco: 2,
    blocoLabel: B2,
    title: 'Encerrar os grupos',
    bullets: ['Avisar 30 segundos', 'Cada grupo elege porta-voz', 'Frase de posição pronta'],
  },
  {
    start: 900,
    end: 1080,
    bloco: 3,
    blocoLabel: B3,
    title: 'Os grupos reportam',
    alarm: 'Plenária · 15:00',
    bullets: [
      '~45s por grupo · na ordem',
      'Sintetizar a tensão em 1 frase',
      'Não julgar quem está certo',
      'Fio comum: a instituição',
    ],
  },
  {
    start: 1080,
    end: 1290,
    bloco: 3,
    blocoLabel: B3,
    title: 'Amarrar aos referenciais',
    screen: 'Análise · cartões de teoria',
    cut: true,
    bullets: [
      'Cultura (P3): Schein · Fleury — Aula 2',
      'Competências (P3): Prahalad & Hamel · Zarifian',
      'Segurança (P1): Edmondson · 9-box — Aula 6',
      'Carreira (P2): Hall proteana · contrato Schein — Aula 7',
      'Atração/T&D (P4): Daft · Kirkpatrick — Aulas 3 e 5',
    ],
  },
  {
    start: 1290,
    end: 1440,
    bloco: 3,
    blocoLabel: B3,
    title: 'A solução proposta',
    screen: 'Solução · 5 frentes e metas',
    bullets: [
      'Plano de Sustentação · 5 frentes',
      'Capacitar: 100% gestores 6m · Strive 30→50',
      'Proteger: gestor e pares > 90',
      'Segurança: posicionar 30→55→70',
      'Perfil/EVP: instrumentar turnover · Stay 25→45',
      'Recuperar: engajamento 40→60→80 (por escritório)',
    ],
  },
  {
    start: 1440,
    end: 1500,
    bloco: 3,
    blocoLabel: B3,
    title: 'Fechamento',
    screen: 'Conclusão · ativos e urgência',
    bullets: [
      'Tese: contrato com a instituição · time vai bem',
      'Confiança gestor/pares de pé = base',
      'Pessoas como ativo central da mudança',
      'Agradecer · abrir para perguntas',
    ],
  },
]

/** Total talk length in seconds (matches the script's 25:00). */
export const TOTAL_SECONDS = SEGMENTS[SEGMENTS.length - 1].end

/** Format seconds as mm:ss (clamped at 0). */
export function fmt(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const ss = s % 60
  return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

/** Index of the active segment for a given elapsed time (clamped to range). */
export function activeIndex(elapsed: number): number {
  if (elapsed <= 0) return 0
  for (let i = 0; i < SEGMENTS.length; i++) {
    if (elapsed < SEGMENTS[i].end) return i
  }
  return SEGMENTS.length - 1
}
