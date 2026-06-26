/**
 * The single source of truth for all CASE DATA, typed and transcribed from the
 * v3 report via 03-CONTENT.md. Numbers live here only. Prose lives in copy.ts.
 *
 * Fidelity rules (00-PROJECT-BRIEF §6) are baked into these values:
 *  - Scope is the Design LATAM operation (4 offices, 3 countries), not Brazil.
 *  - Engagement 40 is read against the 2025 Scorecard target of 80.
 *  - Say/Stay/Strive is the survey's model (Aon Hewitt / Kincentric).
 * Changing a stat here propagates everywhere; do not duplicate a number in a
 * component.
 */

/* ------------------------------------------------------------------ *
 * Structure nesting (RingNest, Chapter 02)
 * ------------------------------------------------------------------ */
export interface NestRing {
  entity: string
  count: number
  /** Pre-formatted display string (e.g. "~140,000"). */
  display: string
  /** The innermost survey-scope ring, rendered as the lime focal point. */
  focal?: boolean
}

export const structureNesting: NestRing[] = [
  { entity: 'Grupo TELUS, global', count: 140000, display: '~140 mil' },
  { entity: 'TELUS Digital', count: 70000, display: '~70 mil' },
  { entity: 'Digital Agency', count: 965, display: '965' },
  { entity: 'Design', count: 124, display: '124' },
  {
    entity: 'Design LATAM (Poatek)',
    count: 41,
    display: '41',
    focal: true,
  },
]

/* ------------------------------------------------------------------ *
 * Acquisition timeline (Chapter 02)
 * ------------------------------------------------------------------ */
export interface TimelineEvent {
  year: string
  title: string
  description: string
  /** 2025 is "the year with the most change" and is emphasized. */
  emphasis?: boolean
}

export const acquisitionTimeline: TimelineEvent[] = [
  {
    year: '2021',
    title: 'WillowTree compra a Poatek',
    description:
      'Uma boutique de software de Porto Alegre, de cerca de 120 pessoas, é adquirida pela WillowTree.',
  },
  {
    year: '2022',
    title: 'TELUS International compra a WillowTree',
    description:
      'A boutique é incorporada a um gigante global de Customer Experience e digital.',
  },
  {
    year: '2025',
    title: 'TELUS Digital, e a operação fecha capital',
    description:
      'A TELUS International vira TELUS Digital e fecha capital. O ano com mais mudanças em sistemas, liderança e cultura. Buenos Aires e Cidade da Guatemala entram no grupo.',
    emphasis: true,
  },
]

/* ------------------------------------------------------------------ *
 * Offices: 4 offices, 3 countries (00 §6, 03)
 * ------------------------------------------------------------------ */
export interface Office {
  city: string
  country: string
  code: string
  /** Year the office joined the group, if it joined after Poatek. */
  joined?: string
}

export const offices: Office[] = [
  { city: 'Porto Alegre', country: 'Brasil', code: 'BR' },
  { city: 'São Paulo', country: 'Brasil', code: 'BR' },
  { city: 'Buenos Aires', country: 'Argentina', code: 'AR', joined: '2025' },
  { city: 'Cidade da Guatemala', country: 'Guatemala', code: 'GT', joined: '2025' },
]

/* ------------------------------------------------------------------ *
 * Financial health (StatCards, Chapter 02)
 * ------------------------------------------------------------------ */
export interface FinancialStat {
  id: string
  /** Numeric target for the count-up. */
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  sub: string
  variant: 'plum' | 'teal'
}

export const financials: FinancialStat[] = [
  {
    id: 'revenue',
    value: 2.8,
    prefix: 'US$ ',
    suffix: ' bi',
    decimals: 1,
    label: 'Receita anual, 2025',
    sub: '+5% vs 2024',
    variant: 'teal',
  },
  {
    id: 'q4',
    value: 714,
    prefix: 'US$ ',
    suffix: ' mi',
    decimals: 0,
    label: 'Receita do Q4',
    sub: '+3% no trimestre e no ano',
    variant: 'plum',
  },
  {
    id: 'ebitda',
    value: 13.7,
    suffix: '%',
    decimals: 1,
    label: 'Margem EBITDA ajustada, Q4',
    sub: 'vs 11,1% no trimestre anterior',
    variant: 'plum',
  },
  {
    id: 'clients',
    value: 60,
    suffix: '+',
    decimals: 0,
    label: 'Novos clientes no ano',
    sub: 'A demanda pela operação é forte',
    variant: 'teal',
  },
]

/* ------------------------------------------------------------------ *
 * Engagement headline + benchmark (Chapter 03)
 * ------------------------------------------------------------------ */
export interface BenchmarkBand {
  from: number
  to: number
  label: string
  /** Token color name consumed via tokens.ts. */
  tone: 'red' | 'amber' | 'plum'
}

export const engagement = {
  /** Overall engagement, favorable %. */
  overall: 40,
  /** Official 2025 Scorecard target; the result is exactly half of it. */
  scorecardTarget: 80,
  sampleResponses: 20,
  sampleTotal: 41,
  bands: [
    { from: 0, to: 60, label: 'Inferior', tone: 'red' },
    { from: 60, to: 77, label: 'Moderado', tone: 'amber' },
    { from: 77, to: 100, label: 'Topo', tone: 'plum' },
  ] as BenchmarkBand[],
}

/* ------------------------------------------------------------------ *
 * Engagement distribution (DistributionBars, Chapter 03)
 * ------------------------------------------------------------------ */
export interface DistributionSlice {
  label: string
  value: number
  tone: 'teal' | 'teal2' | 'amber' | 'red'
}

export const distribution: DistributionSlice[] = [
  { label: 'Altamente engajados', value: 25, tone: 'teal' },
  { label: 'Moderadamente engajados', value: 15, tone: 'teal2' },
  { label: 'Passivos', value: 40, tone: 'amber' },
  { label: 'Ativamente desengajados', value: 20, tone: 'red' },
]

/* ------------------------------------------------------------------ *
 * Say / Stay / Strive (SayStayStrive, Chapter 03)
 * Model is the survey's (Aon Hewitt / Kincentric), not a course framework.
 * ------------------------------------------------------------------ */
export type SssCategory = 'SAY' | 'STAY' | 'STRIVE'

export interface SssHeadline {
  category: SssCategory
  value: number
  gap: number | null
}

export const sayStayStriveHeadline: SssHeadline[] = [
  { category: 'SAY', value: 75, gap: null },
  { category: 'STAY', value: 25, gap: -49 },
  { category: 'STRIVE', value: 30, gap: -45 },
]

export interface SssItem {
  category: SssCategory
  question: string
  value: number
  gap: number
}

/** Ordered by favorable descending, to show the slide from Say to Stay/Strive. */
export const sayStayStriveItems: SssItem[] = [
  {
    category: 'SAY',
    question: 'Recomendaria a TELUS a um amigo em busca de emprego',
    value: 75,
    gap: -5,
  },
  {
    category: 'SAY',
    question: 'Falo bem de trabalhar aqui',
    value: 60,
    gap: -21,
  },
  {
    category: 'STRIVE',
    question: 'A TELUS me inspira a dar o meu melhor todos os dias',
    value: 50,
    gap: -28,
  },
  {
    category: 'STAY',
    question: 'Raramente penso em sair da TELUS',
    value: 35,
    gap: -34,
  },
  {
    category: 'STRIVE',
    question: 'A TELUS me motiva a contribuir além do exigido',
    value: 30,
    gap: -45,
  },
  {
    category: 'STAY',
    question: 'Seria preciso muito para me fazer sair',
    value: 25,
    gap: -49,
  },
]

/* ------------------------------------------------------------------ *
 * The paradox: micro strong / macro weak (ParadoxColumns, Chapter 03)
 * ------------------------------------------------------------------ */
export interface MetricItem {
  label: string
  value: number
  /** Marks the single worst item in the survey. */
  worst?: boolean
}

export const paradox = {
  strong: {
    title: 'Forte, o time imediato',
    items: [
      { label: 'Meu gestor me apoia a ter sucesso', value: 100 },
      { label: 'Colegas respeitam meus pensamentos', value: 100 },
      { label: 'Meu gestor me incentiva a inovar', value: 95 },
      { label: 'Somos francos e honestos uns com os outros', value: 90 },
    ] as MetricItem[],
  },
  weak: {
    title: 'Fraco, a instituição',
    items: [
      { label: 'É seguro me posicionar sem medo', value: 30, worst: true },
      { label: 'Sou motivado pelos valores da empresa', value: 30 },
      { label: 'Entendo meu programa de remuneração', value: 35 },
      { label: 'Tenho senso de realização no trabalho', value: 45 },
    ] as MetricItem[],
  },
}

/* ------------------------------------------------------------------ *
 * Dimension scores (DivergingBars, Chapter 03)
 * favorable %, gap vs company, gap vs LATAM peer; null = not available.
 * ------------------------------------------------------------------ */
export interface DimensionScore {
  dimension: string
  favorable: number
  vsCompany: number | null
  vsLatam: number | null
}

/** The largest absolute gap across modes, for symmetric axis scaling. */
export const DIMENSION_MAX_GAP = 34

export const dimensions: DimensionScore[] = [
  { dimension: 'Cliente', favorable: 92, vsCompany: 4, vsLatam: null },
  { dimension: 'Liderança', favorable: 81, vsCompany: -2, vsLatam: 6 },
  { dimension: 'Diversidade e Inclusão', favorable: 79, vsCompany: -7, vsLatam: -4 },
  { dimension: 'Eficácia no Trabalho', favorable: 76, vsCompany: -7, vsLatam: -6 },
  { dimension: 'Tarefas e Influência', favorable: 69, vsCompany: -10, vsLatam: -16 },
  { dimension: 'Saúde e Bem-Estar', favorable: 68, vsCompany: -13, vsLatam: null },
  { dimension: 'Saúde e Segurança no Trabalho', favorable: 68, vsCompany: -8, vsLatam: -4 },
  { dimension: 'Condições de Trabalho', favorable: 66, vsCompany: -11, vsLatam: -2 },
  { dimension: 'Carreira, Desenvolvimento e Aprendizado', favorable: 65, vsCompany: -15, vsLatam: -7 },
  { dimension: 'Inovação e Experimentação', favorable: 58, vsCompany: -18, vsLatam: -3 },
  { dimension: 'Desempenho, Remuneração e Reconhecimento', favorable: 52, vsCompany: -24, vsLatam: -7 },
  { dimension: 'Marca Empregadora', favorable: 49, vsCompany: -34, vsLatam: -25 },
]

export type DimensionMode = 'favorable' | 'vsCompany' | 'vsLatam'

export const dimensionModes: { id: DimensionMode; label: string }[] = [
  { id: 'favorable', label: '% favorável' },
  { id: 'vsCompany', label: 'Gap vs Empresa' },
  { id: 'vsLatam', label: 'Gap vs LATAM' },
]

/* ------------------------------------------------------------------ *
 * Solution target meters (TargetMeter, Chapter 05). Numbers only; the
 * front bodies live in copy.ts and join by `frontId`.
 * ------------------------------------------------------------------ */
export interface TargetMilestone {
  value: number
  at: string
}

export interface SolutionTarget {
  frontId: string
  /** 'climb' = from -> milestones -> target. 'hold' = keep above a floor. */
  kind: 'climb' | 'hold'
  metric: string
  /** Climb: starting value. Hold: the current value(s). */
  from: number
  milestones: TargetMilestone[]
  /** Climb: final target. */
  target: number
  /** Hold: the line to defend. */
  floor?: number
  /** Scale ceiling for the track (defaults to 100). */
  scaleMax?: number
}

export const solutionTargets: SolutionTarget[] = [
  {
    frontId: '5.1',
    kind: 'climb',
    metric: 'Strive',
    from: 30,
    milestones: [{ value: 50, at: '12 months' }],
    target: 50,
  },
  {
    frontId: '5.2',
    kind: 'hold',
    metric: 'Apoio do gestor e respeito dos colegas',
    from: 100,
    milestones: [],
    target: 100,
    floor: 90,
  },
  {
    frontId: '5.3',
    kind: 'climb',
    metric: 'Segurança para se posicionar',
    from: 30,
    milestones: [
      { value: 55, at: '12 months' },
      { value: 70, at: '18 months' },
    ],
    target: 70,
  },
  {
    frontId: '5.4',
    kind: 'climb',
    metric: 'Stay',
    from: 25,
    milestones: [{ value: 45, at: '12 months' }],
    target: 45,
  },
  {
    frontId: '5.5',
    kind: 'climb',
    metric: 'Engajamento geral',
    from: 40,
    milestones: [{ value: 60, at: '12 months' }],
    target: 80,
  },
]

/* ------------------------------------------------------------------ *
 * Close: assets to protect / number-one urgency (Chapter Close)
 * ------------------------------------------------------------------ */
export const closeAssets: string[] = ['Confiança no gestor (100)', 'Cultura de colaboração']

export const closeUrgency: string[] = [
  'Segurança psicológica (30)',
  'Turnover: separar saída saudável de perda crítica',
]

/* ------------------------------------------------------------------ *
 * Hero KPI strip (Chapter 00)
 * ------------------------------------------------------------------ */
export interface Kpi {
  label: string
  value: string
}

export const heroKpis: Kpi[] = [
  { label: 'Engajamento', value: '40' },
  { label: 'Segurança para se posicionar', value: '30' },
  { label: 'Apoio do gestor direto', value: '100' },
  { label: 'Amostra', value: '20 respostas analisadas da equipe de Design LATAM' },
]
