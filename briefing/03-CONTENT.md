# 03 · Content: Copy, Data, and Theory, Chapter by Chapter

> This is the consolidated, v3-aligned content for the build. The prose is written in the author's voice: direct, structured, sourced, no em-dashes, no "not X, but Y" antithesis. Use it as the copy. Transcribe the data tables into `content/case.ts` as typed objects and the prose into `content/copy.ts`. Where the old HTML disagrees with anything here, this file (matching v3) is correct.

A note on voice for any copy you must extend: state what things are, ground every claim in a metric or a named source, keep it warm in delivery and analytical in structure, and never use an em-dash or an antithesis construction.

---

## Global data layer (`content/case.ts`)

These values are shared across chapters. Single source.

**Structure nesting (RingNest):**
- TELUS group, global: ~140,000
- TELUS Digital: ~70,000
- Digital Agency: 965
- Design: 124
- Design LATAM (Poatek), survey scope: 41

**Acquisition timeline:**
- 2021: Poatek (a Porto Alegre software boutique, ~100 people) acquired by WillowTree.
- 2022: WillowTree acquired by TELUS International.
- 2025: TELUS International becomes TELUS Digital and goes private. The year with the most change. Buenos Aires and Guatemala City join the group.

**Offices (4 offices, 3 countries):** Porto Alegre (BR), São Paulo (BR), Buenos Aires (AR), Guatemala City (GT).

**Financial health (TELUS Digital, 2025):**
- Annual revenue: US$ 2.8B, +5% vs 2024
- Q4 revenue: US$ 714M, +3% in quarter and year
- Adjusted EBITDA margin (Q4): 13.7% (vs 11.1% prior quarter)
- New clients in year: 60+

**Engagement headline:**
- Overall engagement: 40 (favorable %)
- 2025 Scorecard official target: 80 (result is half the formal target)
- Benchmark bands: lower 0 to 60, moderate 60 to 77, top 77 to 100
- Sample: 20 responses of 41

**Engagement distribution:**
- Highly engaged: 25%
- Moderately engaged: 15%
- Passive: 40%
- Actively disengaged: 20%

**Say / Stay / Strive (model is the survey's, Aon Hewitt / Kincentric, not a course framework):**
- Headline by behavior: Say 75, Stay 25 (gap −49), Strive 30 (gap −45)
- Item level:
  - SAY: "Would recommend TELUS to a friend looking for a job": 75, gap −5
  - SAY: "I say good things about working here": 60, gap −21
  - STRIVE: "TELUS inspires me to do my best every day": 50, gap −28
  - STAY: "I rarely think about leaving TELUS": 35, gap −34
  - STRIVE: "TELUS motivates me to contribute beyond what is required": 30, gap −45
  - STAY: "It would take a lot to make me leave": 25, gap −49

**The paradox (micro strong / macro weak):**
- Strong, immediate team (teal):
  - "My manager supports me to succeed": 100
  - "Colleagues respect my thinking": 100
  - "My manager encourages me to innovate": 95
  - "We are candid and honest with each other": 90
- Weak, institution (red):
  - "It is safe to speak up without fear": 30 (worst item in the survey)
  - "I am motivated by the company's values": 30
  - "I understand my compensation program": 35
  - "I have a sense of accomplishment at work": 45

**Dimension scores (DivergingBars; favorable %, gap vs company, gap vs LATAM peer; null = not available):**
| Dimension | Fav | vs Company | vs LATAM |
|---|---|---|---|
| Customer/Client | 92 | +4 | n/a |
| Leadership | 81 | −2 | +6 |
| Diversity & Inclusiveness | 79 | −7 | −4 |
| Work Effectiveness | 76 | −7 | −6 |
| Work Tasks & Influence | 69 | −10 | −16 |
| Health & Well-Being | 68 | −13 | n/a |
| Workplace Health & Safety | 68 | −8 | −4 |
| Enabling Work | 66 | −11 | −2 |
| Career, Development & Learning | 65 | −15 | −7 |
| Innovation & Experimentation | 58 | −18 | −3 |
| Performance, Pay & Recognition | 52 | −24 | −7 |
| Employment Brand | 49 | −34 | −25 |

**Employee verbatims (QuoteCard; translate faithfully, keep meaning):**
- On clarity: "A clearer career-progression framework, with expectations defined per level, would support long-term development and growth."
- On clarity: "The lack of transparency in communication creates uncertainty and speculation among colleagues, lowers trust in leadership, and undermines the culture."
- On speaking up: "Sometimes it is hard to speak openly, because reactions to different questions or opinions can be quite defensive. That makes me hesitant to challenge ideas."
- On culture (positive): "What I value most is the strong culture of collaboration, which lets us keep learning from one another."

**Leadership tension:**
- Quote: "It is also your responsibility to solve this."
- Context: "We will not change a 100,000-plus person organization. But we shape our surroundings. I cannot fix this alone. I need your help." Leadership takes the blame ("no one is to blame except me") and promises no punishment for honesty.
- Point of attention: the message is honest and mobilizing, and it lands right after people said they do not feel safe to speak. Asking them to "solve it" can read as empowerment or as offloading responsibility. The intent is good. The timing and framing deserve care.

---

## Chapter 00 · Opening (Hero)

**Pillar label:** 00 · Opening
**Eyebrow:** Case study · Strategic People Management
**Headline:** From a hundred people to 140,000, and the identity that diluted.
**Lead:** In four years, a Porto Alegre design studio (Poatek) was absorbed through successive acquisitions until it became a 41-person cell inside a global body of more than 140,000. The 2025 Pulsecheck shows the price of that dilution: engagement at 40, the market's lower quartile, while trust in the immediate team sits at the top.

**KPI strip (mono):** Engagement 40 · Safe to speak up 30 · Direct-manager support 100 · Sample 20 responses

**Dataviz:** the hero shader field (see `04`). Optional animated figure from 100 toward 140,000 in the headline.
**Motion:** scroll cue; the headline numbers settle; shader drifts slowly.

---

## Chapter 01 · Introduction

**Pillar label:** 01 · Introduction
**Eyebrow:** Introduction
**Chapter number:** 01
**Headline:** A people problem, read with the discipline's tools.

**Body:**
In the digital economy, strategic people management is the clearest competitive differentiator a firm has. Where intellectual capital is the primary asset, the ability to attract, develop, and above all engage talent decides whether a company can sustain itself and keep innovating. People management is the bridge between strategy and execution, and its job is to keep culture working as the engine of growth.

This report diagnoses one people-and-management problem inside TELUS Digital, in its Design LATAM operation. The scope is not Brazil alone. From 2025, the Buenos Aires and Guatemala City offices joined the group alongside Porto Alegre and São Paulo, so the pains differ by office and the regional dimension stays visible throughout. After a sequence of acquisitions and a sharp increase in project scale, the operation recorded a real deterioration in climate and intention to stay. The analysis runs through the frameworks from the Strategic People Management course: Careers, Performance Evaluation, Training and Development, and Attraction and Selection, to find the root causes of this cultural erosion and to propose practical ways to stabilize the environment and recover engagement.

**Dataviz:** none, or a quiet animated underline tying the four framework names to the chapters that will pay them off.

---

## Chapter 02 · The Organization

**Pillar label:** 02 · Organization
**Eyebrow:** Context · The company
**Chapter number:** 02
**Headline:** A local cell inside a global giant.

**Body (intro):**
TELUS Digital is the global technology and Customer Experience arm of TELUS Corporation, competing in a market with intense demand for technical talent. The Design LATAM operation began as Poatek, a Porto Alegre software boutique known for a culture of craft, agility, and a strong professional identity. Today it is a 41-person cell inside a global body of more than 140,000, spread across four offices and three countries.

**Dataviz 1: RingNest:** the 140k to 41 nesting. The innermost ring (Design LATAM, 41) is the lime focal point. Reinforces the dilution thesis: strong support from those nearby, little connection to the whole.

**Body (timeline):**
The unit went through three critical integrations. WillowTree acquired Poatek in 2021. TELUS International acquired WillowTree in 2022. In 2025 the operation became TELUS Digital and the company went private, the year with the most change in systems, leadership, and culture, and the year Buenos Aires and Guatemala City joined the group. Moving from a boutique to global corporate scale raised complexity and project volume. That scale-up was not matched by a strategy to sustain the human capital and preserve the original culture, which left the operation in constant institutional change and widened the distance between global leadership and the operating base.

**Dataviz 2: Timeline:** 2021 / 2022 / 2025 vertical timeline.

**Body (financials):**
The business is financially healthy. Annual revenue reached US$ 2.8B in 2025, up 5% over 2024, with positive profit. That health is exactly why this problem hides in results decks. The problem here is about people, and the financials prove it is not about money.

**Dataviz 3: StatCards (count-up):** Revenue US$ 2.8B (+5% vs 2024) · Q4 US$ 714M (+3%) · Adjusted EBITDA margin Q4 13.7% (vs 11.1%) · 60+ new clients. Closing line under the grid: "The business grows and turns a profit. The problem is about people."

---

## Chapter 03 · The Central Problem

**Pillar label:** 03 · Problem
**Eyebrow:** Diagnosis · The problem
**Chapter number:** 03
**Headline:** Engagement in the lower quartile, with a paradox at its center.

**Problem statement (body):**
The central problem is an acute engagement crisis and a dilution of cultural identity, driven by successive acquisitions and fast growth without human structural support. Constant changes in management and the pressure to scale projects broke the psychological contract. The 2025 Pulsecheck puts engagement at 40. The official target set in the 2025 Scorecard was 80, so the result is exactly half the company's formal target, a wide gap that places the area in the lower quartile of the global engagement benchmark.

**Dataviz 1: BenchmarkScale:** 0 to 100 scale with bands (lower 0 to 60 red, moderate 60 to 77 amber, top 77 to 100 plum), the 40 marker, and the 80 target marker. The big "40" counts up.

**Dataviz 2: DistributionBars:** highly engaged 25, moderately 15, passive 40, actively disengaged 20. Caption: 60% of people are passive or actively disengaged. Only 1 in 4 is highly engaged.

**Methodological honesty (body, render in CaveatPanel):**
Read the number honestly about its limits. The survey had a small sample, 20 responses out of 41, and the measurement method changed from 2024 to 2025, which blocks a direct historical comparison. For that reason this analysis avoids claiming categorically that engagement collapsed, since there is no stable comparable baseline. Those limits do not invalidate the diagnosis. A follow-up workshop with all 41 members of the team confirmed that the sentiment captured by the survey was shared by the large majority. Triangulating the quantitative data with qualitative listening is what supports the findings, even as the precise numbers ask for caution.

**CaveatPanel items:** only 20 responses · method changed 2024 to 2025 (1 to 5 scale to favorable % plus "Global Top 25%" benchmark) · exclusions: interns, under-3-month tenure, and the Argentina office (GM2 acquired mid-2025) were out of scope · part of another directorate's data was lost to a system error. Corroboration note: the post-report listening converges with the numbers; statistical fragility asks for caution on precision, and the qualitative diagnosis confirms the direction.

**Change-management reading (body):**
The case reading points to change management across the integrations as the axis of failure. The course does not offer a formal change-management framework, so this is an interpretation of the case, supported by the discussion of organizational change in Wood Jr (1995) and the GE case studied in Aula 6. The focus on operational integration and productivity neglected the human impact of the transition. The affected dimensions can be read through the Say, Stay, Strive model, which is the Pulsecheck's own framework and not part of the course bibliography.

**Dataviz 3: SayStayStrive:** the item-level rows from the global data layer, grouped by SAY / STAY / STRIVE, each with favorable bar and gap. Caption: people recommend the company (Say 75) but do not want to stay (Stay 25, gap −49) and do not feel inspired to do more (Strive 30, gap −45).

**The paradox (body):**
The most characteristic fact of the case is a paradox between the micro and the macro level. Inside the immediate team, trust is very high. Manager support to succeed reads 100, peer respect 100, and manager encouragement to innovate 95. At the institutional level the indicators collapse. "It is safe to speak up without fear" reads 30, the worst item in the whole survey, "I am motivated by the company's values" also 30, and "I understand my compensation program" 35. People trust who is near and distrust what is above. This tension also surfaced in the workshops, where people described discomfort speaking up in larger meetings and escalating issues to the vice-presidency and global leadership. This is not fear of the direct manager. It is insecurity toward the global and institutional level. Psychological safety here is a concept established in the literature, associated with Edmondson, and is not a course framework.

**Dataviz 4: ParadoxColumns:** two columns, strong (teal) and weak (red), each with its four MetricBars. Bridge line: "People trust who is near and have lost the bond with what is above. A good manager is holding the team together over an institutional base that cannot hold on its own."

**Dataviz 5: DivergingBars (optional, advanced):** the 12-dimension chart with a mode toggle (favorable % / gap vs company / gap vs LATAM). Strong at the top (Customer/Client 92), worst at the bottom (Employment Brand 49, gap −34). Use this to give the diagnosis analytical depth; keep it optional if it crowds the chapter.

**Dataviz 6: QuoteCards:** the four verbatims.

**Leadership tension (TensionPanel):** the quote, the context, and the point of attention from the global data layer. This is also a strong live-discussion hook.

---

## Chapter 04 · Analysis Through Frameworks

**Pillar label:** 04 · Analysis
**Eyebrow:** Theoretical frameworks
**Chapter number:** 04
**Headline:** Six lenses, one operation under strain.

Render as six `TheoryCard`s (or staged scenes). Each card: class label (eyebrow), title, body, framework chips. The copy below is v3-accurate. Do not reintroduce "career anchor."

**4.1: Aula 7 · Careers.** Title: Protean career and the dilution of purpose.
Body: The dissatisfaction reflects a stalled transition to the Protean Career, Hall's concept from Aula 7, where the professional seeks self-direction and alignment between personal and organizational values. In technology firms that alignment is decisive. Successive management changes stripped the individual's agency and imposed career tracks that do not speak to the professional identity built in the boutique phase, which connects to Dutra's discussion of career preferences. The lack of clarity about the professional future inside a large-scale structure erodes the psychological contract, Schein's concept also covered in Aula 7, and produces a sense of stagnation and lost purpose.
Chips: Protean career (Hall) · Psychological contract (Schein) · Career ladder Y (already in place) · Dutra.

**4.2: Aula 6 · Performance Evaluation.** Title: Results and behavior, interrupted.
Body: Under fast growth, evaluation tended to become purely metric, fixed on the what and blind to the how, which runs against the idea of Sustainable Performance from Aula 6 that ties result to behavior. By ignoring the reading of potential, the operation stops using instruments like the Performance x Potential matrix, the 9-box, and the concept of Learning Agility from Lombardo and Eichinger (2000), which are especially useful in a transition where the capacity to learn in new contexts matters more than past delivery. Without psychological safety to voice concerns during integration, people perceive evaluation as unfair, which hits the Strive pillar directly.
Chips: Sustainable Performance (what + how) · 9-box matrix · Learning Agility (Lombardo & Eichinger, 2000).

**4.3: Aula 5 · Training & Development.** Title: The support that scale required.
Body: The company failed to measure the impact of the development actions run during the transition. Aula 5 offers the vocabulary that was missing: Kirkpatrick's four levels (1975) and Phillips ROI make it possible to assess whether training produced reaction, learning, behavior change, and results, instead of treating it as a cost with no verifiable return. Scaling projects required leadership development grounded in Andragogy, in Knowles (1975) and self-directed learning, and in Kolb (1984) and experiential learning, equipping managers to lead larger teams without losing proximity. The absence of Mentoring programs, also covered in Aula 5, to preserve Poatek's cultural knowledge during the transition kept the new culture from being absorbed organically and left a gap in behavioral competencies.
Chips: Kirkpatrick (1975) · Phillips ROI · Andragogy (Knowles, 1975) · Kolb (1984) · Mentoring.

**4.4: Aula 3 · Attraction & Selection.** Title: The employer promise drifted from the real experience.
Body: The successive acquisitions weakened what Aula 3 calls the Company Attractants, Richard L. Daft's concept for what makes an organization desirable to talent, which in market vocabulary sits close to the Employee Value Proposition (EVP) and Employer Branding. What was once offered as a boutique experience became a scale operation. Read through Windolf's (1986) typology of recruitment strategies, if Attraction and Selection is not realigned to the new reality, the company keeps attracting profiles that seek a culture that no longer exists, feeding the turnover cycle, because the employer promise stopped matching the real post-acquisition experience.
Chips: Company Attractants (Daft) · EVP / Employer Branding · Windolf (1986) · Psychological contract.

**4.5: Aula 2 · Organizational Culture.** Title: Identity dilution after acquisition.
Body: The thesis of cultural-identity dilution finds its ground in Aula 2, which treats organizational culture in Schein's sense, with its three levels of artifacts, espoused values, and basic assumptions, read through Fleury. The erosion in the operation is not only a loss of climate. It is the wearing down of the deepest layer of shared assumptions that Poatek had built, replaced by a global corporate identity that has not yet been internalized as the team's own. When the visible artifacts change, brand, systems, and rituals, without the values and assumptions being rebuilt with the team, culture stops being an engine and becomes a source of estrangement. That reading, more than the engagement number alone, explains why institutional trust fell while trust in the immediate team stayed intact.
Chips: Schein (three levels) · Fleury · Artifacts / values / assumptions.

**4.6: Aula 2 · Competencies.** Title: The mismatch between boutique and scale.
Body: Aula 2 offers the second lens on this case. In Prahalad and Hamel's sense, organizational competencies, or core competences, are the roots that sustain a firm's competitive advantage. The distinctive competencies that defined Poatek were digital-product excellence and consultative client intimacy, a close relationship in which the client's business was understood in depth. Those roots were not cultivated as a strategic asset during the transition. The focus shifted to business and scale: the passion for craft and the culture of proximity and comfort gave way to a corporate game of serving much larger clients under much more pressure. In Prahalad and Hamel's terms, a core competence that stops being recognized and nurtured tends to be treated as a commodity and to dilute, which is exactly the risk the operation runs. At the individual level, read through Fleury and Zarifian's notion of competence as the mobilization of knowledge and capability in action that generates recognized value, scale redefined what is expected of that delivery. The boutique profile, centered on technical craft and proximity, now requires competencies that used to be secondary: managing senior and global stakeholders, mastering the client's business and industry beyond the technical, and communicating and influencing in a multinational, more hierarchical, multilingual context. This mismatch between the inherited individual repertoire and what scale demands is one of the concrete roots of the drop in Strive and of institutional insecurity. The picture is worsened by the absence of a formal map: the competency-and-leveling model is still being built, and that vacuum leaves people without clarity on what is expected at each level, connecting the competency problem to the career problem from 4.1.
Chips: Core competences (Prahalad & Hamel) · Competence in action (Fleury / Zarifian) · Leveling model in progress.

---

## Chapter 05 · Proposed Solution

**Pillar label:** 05 · Solution
**Eyebrow:** Recommendation
**Chapter number:** 05
**Headline:** A human-capital sustainment plan, with targets to calibrate.

**Intro (body):**
To stabilize the environment and recover the Say, Stay, and Strive scores, the plan is a Human-Capital Sustainment Plan on five fronts. The targets below are proposals to calibrate with leadership and with each office's reality, not rigid commitments.

Render the five fronts as a set (cards or staged steps), each with its body and a `TargetMeter` for the proposed metric.

**5.1: Build capability for the new scale.**
The career ladder (Y) already exists. What is missing is readiness to operate at scale rather than as a boutique: higher-stakes decisions, more senior stakeholders, a different way of working. This front combines training, andragogy, and leadership mentoring, with impact measured through Kirkpatrick's levels. Proposed target: train 100% of the operation's managers in a leadership-at-scale program within 6 months, and raise Strive from 30 toward 50 in 12 months.
TargetMeter: Strive 30 to 50 (12 months).

**5.2: Protect what works.**
Trust in the manager at 100, and the culture of collaboration with peers who respect each other at 100, are the strongest assets in the diagnosis and the foundation the rest rebuilds on. Recognize them, give them visibility, and use them as leverage, without treating them as guaranteed. Proposed target: keep both indicators above 90 in the next Pulsecheck waves, and treat any drop as a priority alert.
TargetMeter: manager support and peer respect held above 90.

**5.3: Psychological safety first.**
Psychological safety is priority number one, and it requires action from those with power: leaders modeling vulnerability and responding well to dissent, not only a "speak freely" message. Since the discomfort concentrates in larger meetings and in escalating issues to the vice-presidency and global leadership, the action has to create safe channels at that level. Proposed target: raise "it is safe to speak up without fear" from 30, the worst item in the survey, to 55 in 12 months and 70 in 18 months.
TargetMeter: safe to speak up 30 to 55 (12 months) to 70 (18 months).

**5.4: Profile, hiring, and exit.**
Realign the Employee Value Proposition and the profile recruiting seeks to the reality of a scale company, read through Daft's Company Attractants, prepare HR for a possibly higher turnover, and invest in humane offboarding. Not every exit is a failure. Part of it is a profile readjustment proper to the boutique-to-scale transition, and distinguishing the two kinds of exit is part of management. Proposed target: instrument turnover measurement to separate avoidable loss from transition readjustment within 3 months, and recover intention to stay (Stay) from 25 toward 45 in 12 months.
TargetMeter: Stay 25 to 45 (12 months).

**5.5: Recovery of engagement indicators.**
This front consolidates the previous targets into a phased push to rebuild the psychological contract, anchored in the Pulsecheck indicators. Proposed targets, verified in semiannual waves: recover overall engagement from 40 toward the 80 Scorecard target, with a 60 milestone at 12 months, leaving the benchmark's lower quartile; raise safe-to-speak from 30 to 55 in 12 months; recover Stay from 25 to 45 and Strive from 30 to 50 in the same period; and hold manager support and peer respect above 90. Read every target against regional heterogeneity, since Porto Alegre, São Paulo, Buenos Aires, and Guatemala City start from different points.
TargetMeter (headline): overall engagement 40 to 60 (12 months) to 80 (target).

**Rollout phasing (optional Timeline/NextSteps strip, from the deck):**
- Now: digest the results across four focuses, psychological safety, understand and question the values, decode corporate structure and communication, and improve recognition.
- Next weeks: local brainstorms, "local pains, local solutions," attacking one or two root causes rather than covering everything lightly.
- Early January: regional plans, compiled, defended upstream, and executed, with commitments at three levels: to self, to the group, and to the business.
- 2026: reflect the actions in individual 2026 objectives so the plan does not die at the presentation.

**Closing (body):**
The crisis in TELUS Digital's Design LATAM operation is a people-and-management challenge typical of organizations that scale fast through acquisitions. The solution does not lie in financial metrics, which remain healthy. It lies in rebuilding the psychological contract with the institution and in valuing the human capital. The hardest foundation to build, trust with manager and peers, is still standing, and it is the base from which the rest is rebuilt. By preserving professional identity, giving career clarity, and supporting leaders to manage the new scale, with targets verifiable in the Pulsecheck indicators and attention to the diversity of the four offices, the organization can reverse the engagement decline. Treating people as the central asset of the change strategy is the way to turn the complexity of acquisitions into sustainable competitive advantage and to recover the excellence that once defined the operation.

---

## Chapter 06 · Discussion

**Pillar label:** 06 · Discussion
**Eyebrow:** Questions for the class
**Chapter number:** 06
**Headline:** Four questions to open the debate.

Intro: There is no single answer. Each card holds a real tension in the case and two opposing lenses for the room to argue. Render as four `DebateCard`s (native `<details>`).

**Q1: Psychological safety.** How do you ask people to "speak openly" and tell them "it is your responsibility" right after they said they are afraid to speak?
- Lens A, empowerment: giving voice and agency is exactly what unlocks psychological safety. Waiting for the company to fix it first keeps everyone passive.
- Lens B, offloading responsibility: psychological safety is created by those with power. Handing the problem back to those who feel vulnerable can deepen the silence.
- Footnote: "it is safe to speak up without fear" is 30 favorable, the worst item in the survey.

**Q2: Team vs institution.** How far can a good manager shield a team from a diluted organizational culture?
- Lens A, the manager is what matters: with manager support at 100, the microenvironment protects and the team holds. What is near is what keeps people.
- Lens B, it is unsustainable: Stay at 25 and Strive at 30 show the shield has a limit. Without an institutional bond, the manager's effort becomes damage control, not engagement.
- Footnote: manager support 100 (+16 vs benchmark) coexisting with values at 30 (−46). The good leader is holding. For how long?

**Q3: M&A and culture.** Is identity dilution in successive acquisitions inevitable, or was it a change-management failure?
- Lens A, natural cost of scale: integrating 100 people into 140,000 requires standardization. Some loss of identity is the price of access to resources, clients, and stability.
- Lens B, cultural neglect: three integrations in four years without tending to culture and communication is not destiny. It is a choice. Cultural due diligence usually gets deferred.
- Footnote: three integrations in four years; 2025 was described as "the year with the most change," with strong dilution of local identity.

**Q4: Turnover: how far is it worth fighting?** Can the company tell apart why each person is leaving, and act differently in each case?
- Lens A, every exit is a loss: losing qualified people carries a high replacement cost and delivery impact. Stay at 25 is a cultural alert to treat, not to normalize.
- Lens B, not every exit is a failure: there are two kinds of turnover here, people who left because the company changed and the implicit contract broke (an expected readjustment), and people who would leave but should stay, because they fit the new profile and are going for lack of safety, opaque compensation, or no perspective. Treating both the same is the error. The real work is to separate them and retain only who makes sense to retain.
- Footnote: the question HR probably cannot answer today is how much of recent turnover was boutique-to-scale profile readjustment and how much was avoidable loss. Without that distinction, the company alternately retains who does not want to stay and loses who should stay.

---

## Close

**Assets to protect (Pill `win`):** manager trust (100) · collaboration culture.
**Number-one urgency (Pill `alert`):** psychological safety (30) · turnover: separate healthy exit from critical loss.
**Source note (footer):** Built from the Pulsecheck 2025 reading and the v3 report. Engagement model (Say/Stay/Strive) is the survey's. Psychological safety follows Edmondson. Course frameworks are attributed by class (Aulas 2, 3, 5, 6, 7).
