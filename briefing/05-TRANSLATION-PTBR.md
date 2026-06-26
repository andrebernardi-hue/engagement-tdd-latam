# 05 · Translation to Brazilian Portuguese (Voice, Tone, and Compression)

> Task for the Claude Code agent: translate the entire site to Brazilian Portuguese (pt-BR), in the author's voice, and compress every on-screen string. This is not a literal translation job. It is a localization plus a rewrite for a presentation context. Read this whole file before touching a string.

Instructions are in English on purpose, for the build agent. Everything the user will read on screen must be in Brazilian Portuguese. All pt-BR examples and the glossary below are the target register.

---

## 1. The one rule that governs everything: the screen supports the speaker

This site is a hybrid of a slide deck and a browser experience. A presenter narrates live with voice-over. The screen is not the script. The screen shows the headline, the number, and the evidence. The depth lives in the presenter's mouth, not on the slide.

Consequence for translation: do not translate the long English paragraphs sentence for sentence. Translate the meaning, then cut it down to what a slide needs. If a sentence only adds nuance the speaker will say out loud, remove it from the screen. A viewer should grasp each scene in three to five seconds of reading while listening.

When you remove text, never remove a number, a source attribution, or a framework name. Compress the connective prose around them.

---

## 2. The author's voice in Brazilian Portuguese

Write as the author would write, in pt-BR. The register:

- **Direct and precise.** State what things are. Every claim sits on a number, a model, or a named source.
- **No em-dashes (travessões). Never.** Use periods, commas, colons, or parentheses.
- **No antithesis constructions.** Do not write "não é X, é Y." State the thing directly. Example: instead of "o problema não é o time, é o contrato psicológico," write "o problema está no contrato psicológico com a instituição. O time vai bem."
- **Prose over bullets in reading blocks, short phrases on slides.** On a slide, a tight phrase beats a full sentence. In a reading-heavy block, keep clean sentences.
- **Brazilian Portuguese norms, formal-professional register.** Use "Português do Brasil" grammar and punctuation. Avoid gratuitous anglicisms where a clean Portuguese word exists (do not write "deletar," "startar," "deadline," "budget"). Keep the consecrated technical and brand terms listed in the glossary; those are standard in the field and the v3 report already uses them.
- **Warm in delivery, analytical in structure.** Approachable, never cold or corporate, never decorative.
- **Vocabulary the author gravitates to:** clareza, alinhamento, sistemas, responsabilidade, impacto, resultados, confiança, propósito.

---

## 3. Canonical source for phrasing: reuse v3, then compress

The authoritative report `Caso TELUS - GEP v3 (revisado).docx` is already written in Brazilian Portuguese, in the author's voice. It is the canonical wording. For any sentence that has an equivalent in v3, reuse v3's exact phrasing as the base, then compress it for the screen. Do not invent a fresh translation when v3 already says it well.

Priority order for each string:
1. If v3 says it, take v3's wording and trim to slide length.
2. If only `03-CONTENT.md` (English) has it, translate the meaning, match the glossary, then trim.
3. If neither has it (a pure UI label), translate plainly using the glossary.

The original `case-engajamento-telus-design_v4.html` is also in pt-BR and gives canonical phrasing for labels and captions (for example "altamente engajados," "passivos," "ativamente desengajados," "o ano com mais mudanças"). Reuse it, with the v3 corrections from `00-PROJECT-BRIEF.md` section 6 always winning (LATAM scope, 80 as the Scorecard target, Daft framing, no "âncora de carreira").

---

## 4. Compression targets by element

Treat these as ceilings for on-screen text. Shorter is better.

| Element | Target | Note |
|---|---|---|
| Eyebrow | 2 to 4 words | mono label, uppercase |
| Headline (H2) | up to 8 words | one strong claim |
| Lead | one sentence, up to ~22 words | the scene's thesis |
| Body block | 1 short paragraph (2 to 3 sentences) or 2 to 3 short phrases | the rest is voice-over |
| Caption | one line | sits under a chart |
| Stat label | 2 to 5 words | under a number |
| Theory card title | up to 6 words | |
| Theory card body | 1 to 2 sentences | keep the source name and class |
| Framework chips | unchanged | terms, not prose |
| Debate question | one sentence | |
| Debate lens A / B | one sentence each | |
| Target (meta) | keep the numbers, phrase as "30 para 55 em 12 meses" | |

Numbers and gaps stay. Format in pt-BR: decimal comma and thousands point. "US$ 2.8B" becomes "US$ 2,8 bi," "13.7%" becomes "13,7%," "140,000" becomes "140 mil," gaps stay as "-49." Configure number formatting with the pt-BR locale.

---

## 5. What to translate and what to keep

**Translate:** all headlines, leads, body, captions, stat labels, nav labels, chapter labels, debate questions and lenses, theory card titles and bodies, the methodological note, the leadership tension copy, and any UI string.

**Keep as is (do not translate):**
- Brand and proper nouns: TELUS, TELUS Digital, Poatek, WillowTree, TELUS International, GM2.
- Place names in their pt-BR form: Porto Alegre, São Paulo, Buenos Aires, Cidade da Guatemala.
- The survey instrument name: Pulsecheck. The company term: Scorecard.
- The engagement model labels: Say, Stay, Strive. Gloss them in pt on first use: Say (falar bem), Stay (querer ficar), Strive (esforçar-se além). This matches v3.
- Author and source names: Hall, Schein, Dutra, Lombardo e Eichinger, Kirkpatrick, Phillips, Knowles, Kolb, Daft, Windolf, Fleury, Zarifian, Prahalad e Hamel, Edmondson, Wood Jr.
- Established technical terms the field and v3 use in English: Employer Branding, EVP (gloss once as Proposta de Valor ao Empregado), Learning Agility, 9-box, core competences (you may pair with "competências organizacionais"), turnover, stakeholders, offboarding, benchmark, EBITDA.
- Data values, percentages, and the dimension names in the diverging-bars chart may stay in English if they come from the survey export, or be translated consistently if translated at all. Pick one and be consistent across the chart.

When a glossed English term and its Portuguese gloss both exist, introduce the gloss once, then use the shorter form.

---

## 6. Glossary (use consistently across the whole site)

| English | pt-BR (canonical) |
|---|---|
| engagement | engajamento |
| engagement score | índice de engajamento |
| target (Scorecard) | meta (do Scorecard) |
| lower quartile | quartil inferior |
| benchmark band | faixa de benchmark |
| favorable % | % favorável |
| gap | gap (mantido) |
| sample | amostra |
| it is safe to speak up without fear | é seguro me posicionar sem medo |
| manager support | apoio do gestor |
| colleagues respect my thinking | colegas respeitam meus pensamentos |
| encourages me to innovate | me incentiva a inovar |
| candid and honest | francos e honestos |
| motivated by the company's values | motivado pelos valores da empresa |
| I understand my compensation program | entendo meu programa de remuneração |
| sense of accomplishment | senso de realização |
| psychological safety | segurança psicológica |
| psychological contract | contrato psicológico |
| intention to stay | intenção de permanência |
| highly / moderately engaged | altamente / moderadamente engajados |
| passive / actively disengaged | passivos / ativamente desengajados |
| immediate team | time imediato |
| institution / institutional | instituição / institucional |
| dilution of identity | diluição da identidade |
| scale (vs boutique) | escala (vs boutique) |
| Company Attractants (Daft) | Atrativos da Empresa (Daft) |
| Sustainable Performance | Performance Sustentável |
| Performance x Potential matrix | Matriz Desempenho x Potencial |
| Training & Development | Treinamento e Desenvolvimento |
| Careers | Gestão de Carreiras |
| Performance Evaluation | Avaliação de Desempenho |
| Attraction & Selection | Atração e Seleção |
| Organizational Culture | Cultura Organizacional |
| Competencies | Competências |
| protean career | carreira proteana |
| the year with the most change | o ano com mais mudanças |
| revenue | receita |
| profit | lucro |
| new clients | novos clientes |

Do not introduce "âncora de carreira." The career ladder is referred to as plano de carreira (Y). Keep all the v3 corrections from `00-PROJECT-BRIEF.md` section 6.

---

## 7. Worked examples (English source to compressed pt-BR)

These show the level of compression expected. Match this density.

**Hero headline.**
EN: "From a hundred people to 140,000, and the identity that diluted."
pt-BR: "De cem para 140 mil. E a identidade que se diluiu."

**Hero lead.**
EN (long): "In four years, a Porto Alegre design studio (Poatek) was absorbed through successive acquisitions until it became a 41-person cell inside a global body of more than 140,000. The 2025 Pulsecheck shows the price of that dilution: engagement at 40, the market's lower quartile, while trust in the immediate team sits at the top."
pt-BR (compressed): "Em quatro anos, a Poatek virou uma célula de 41 pessoas dentro de um corpo global de 140 mil. O Pulsecheck 2025 mostra o preço: engajamento em 40, quartil inferior, com a confiança no time imediato no topo."

**Problem statement.**
EN (long paragraph): "The central problem is an acute engagement crisis and a dilution of cultural identity... engagement at 40. The official target set in the 2025 Scorecard was 80..."
pt-BR (compressed): "Engajamento em 40 contra a meta de 80 do Scorecard 2025. Metade da meta, no quartil inferior do benchmark. A causa: crise de engajamento e diluição de identidade após as aquisições."

**Theory card (4.1).**
EN title: "Protean career and the dilution of purpose."
pt-BR title: "Carreira proteana e perda de propósito."
EN body (long): "The dissatisfaction reflects a stalled transition to the Protean Career, Hall's concept from Aula 7..."
pt-BR body (compressed): "A transição para a carreira proteana (Hall, Aula 7) travou. Sem protagonismo e sem clareza de trilha, o contrato psicológico (Schein) se desgasta."

**Debate question (Q1).**
EN: "How do you ask people to 'speak openly' and tell them 'it is your responsibility' right after they said they are afraid to speak?"
pt-BR: "Como pedir 'fale abertamente' e 'a responsabilidade é sua' a quem acabou de dizer que tem medo de falar?"

**Target (meta).**
EN: "raise 'it is safe to speak up without fear' from 30, the worst item in the survey, to 55 in 12 months and 70 in 18 months."
pt-BR: "Segurança para se posicionar: de 30 para 55 em 12 meses e 70 em 18 meses."

---

## 8. Implementation notes

- Produce a pt-BR copy module that mirrors the structure of `content/copy.ts`, for example `content/copy.pt.ts`, with identical keys and translated, compressed values. Keep the same object shape so components do not change. If a single-locale build is preferred, replace the values in place, but keep one source of truth.
- Do not change `content/case.ts` data values. Translate only labels and units around them, and apply pt-BR number formatting at the formatter level (`lib/format.ts`), not by hardcoding strings.
- Keep all v3 corrections intact during translation. Scope is "operação de Design na América Latina." The 80 is the Scorecard target. Use "Atrativos da Empresa (Daft)" and never "âncora de carreira."
- Preserve the no-em-dash and no-antithesis rules in the translated copy, the same rules that govern the English.

---

## 9. QA checklist before done

- Every on-screen string is in Brazilian Portuguese, in the author's voice.
- No travessões anywhere. No "não é X, é Y" constructions.
- On-screen text is compressed to the section 4 ceilings. No long paragraph survives on a slide.
- Numbers and gaps are intact and formatted in pt-BR (vírgula decimal, "140 mil," "US$ 2,8 bi," "13,7%").
- Brand names, source names, Say/Stay/Strive, and the glossed technical terms are kept correctly.
- Glossary terms are used consistently across all chapters.
- v3 corrections hold: LATAM scope, 80 as Scorecard target, Daft framing, no "âncora de carreira."
- Spot-read three scenes out loud against an imagined voice-over. If the screen repeats what the presenter would say, cut more.
