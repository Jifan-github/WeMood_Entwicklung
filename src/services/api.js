/**
 * WeMood API Service - vorlüfig vorbereitet
 */

// TODO: hier die richtige Backend-URL einsetzen
const BASE_URL = '/api'

/**
 * Suche nach Artikeln basierend auf der Nutzereingabe
 *
 * @param {string} query - Der Suchbegriff aus der Suchleiste
 * @param {string[]} emotions - Ausgewählte Emotion-Filter
 * @returns {Promise<Array>} - Array von Suchergebnissen mit:
 *   - id: number (Artikel-ID für Backend-Identifikation)
 *   - title: string (Titel des Artikels)
 *   - description: string (Kurzbeschreibung)
 *   - confidence: number (Sicherheitswahrscheinlichkeit 0-100)
 *   - emoji: string (Darstellungs-Emoji)
 */
export async function searchArticles(query, emotions = []) {
    // TODO: Ersetzen mit echtem API-Aufruf wenn Backend bereit ist
    // const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&emotions=${emotions.join(',')}`)
    // const data = await response.json()
    // return data.results

    // Mock-Daten
    return [
        {
            id: 1,
            title: 'Trauer',
            description: 'Verstehe und verarbeite deine Trauer mit bewährten Methoden',
            confidence: 87,
            emoji: '😢'
        },
        {
            id: 2,
            title: 'Stress',
            description: 'Lerne effektive Strategien zur Stressbewältigung',
            confidence: 74,
            emoji: '😰'
        }
    ]
}

/**
 * Hole die Detail-Daten eines einzelnen Artikels
 *
 * @param {number} id - Die Artikel-ID
 * @returns {Promise<Object>} - Artikel-Objekt mit:
 *   - id: number
 *   - title: string
 *   - emoji: string
 *   - readTime: string
 *   - overview: string (Screen 1: Facts & Infos)
 *   - facts: string[] (Screen 1: Wichtige Fakten)
 *   - literature: Array<{title, author, description}> (Screen 2)
 *   - videos: Array<{title, duration, description}> (Screen 3)
 *   - conclusion: string (Screen 4: Fazit)
 *   - takeaways: string[] (Screen 4: Wichtigste Erkenntnisse)
 */
export async function getArticleById(id) {
    // TODO: Ersetzen mit echtem API-Aufruf wenn Backend bereit ist
    // const response = await fetch(`${BASE_URL}/articles/${id}`)
    // const data = await response.json()
    // return data

    // Mock-Daten
    const articles = {
        1: {
            id: 1,
            title: 'Achtsamkeit für Anfänger',
            emoji: '🧘‍♀️',
            readTime: '5 Min. Lesezeit',
            overview: 'Achtsamkeit ist die Praxis, den gegenwärtigen Moment bewusst wahrzunehmen, ohne ihn zu bewerten. Sie hat ihren Ursprung in buddhistischen Meditationstraditionen und wird heute weltweit als wirksame Methode zur Stressreduktion und Förderung des Wohlbefindens eingesetzt.',
            facts: [
                'Regelmäßige Achtsamkeitsübungen können Stress und Angst nachweislich reduzieren.',
                'Bereits 10 Minuten tägliche Meditation können positive Veränderungen im Gehirn bewirken.',
                'Achtsamkeit verbessert die Konzentrationsfähigkeit und emotionale Regulierung.',
                'Die Methode wird in der klinischen Psychologie zur Behandlung von Depressionen eingesetzt.'
            ],
            literature: [
                { title: 'Gesund durch Meditation', author: 'Jon Kabat-Zinn', description: 'Das Standardwerk zur achtsamkeitsbasierten Stressreduktion (MBSR).' },
                { title: 'Achtsamkeit für Anfänger', author: 'Jon Kabat-Zinn', description: 'Ein zugänglicher Einstieg in die Praxis der Achtsamkeit.' },
                { title: 'Das Wunder der Achtsamkeit', author: 'Thich Nhat Hanh', description: 'Klassisches Werk über Achtsamkeit im Alltag.' }
            ],
            videos: [
                { title: 'Achtsamkeit erklärt in 5 Minuten', duration: '5:23', description: 'Eine kurze und verständliche Einführung in das Konzept der Achtsamkeit.' },
                { title: 'Geführte Meditation für Einsteiger', duration: '12:00', description: 'Eine einfache geführte Meditation zum Mitmachen.' },
                { title: 'Die Wissenschaft hinter Meditation', duration: '18:45', description: 'Wie Meditation das Gehirn verändert – wissenschaftlich erklärt.' }
            ],
            conclusion: 'Achtsamkeit ist eine einfache, aber wirkungsvolle Methode, um das eigene Wohlbefinden zu steigern. Schon wenige Minuten täglicher Praxis können einen spürbaren Unterschied machen.',
            takeaways: [
                'Starte mit nur 5 Minuten täglich und steigere dich langsam.',
                'Bewertung loslassen: Beobachte deine Gedanken ohne sie zu beurteilen.',
                'Achtsamkeit kann überall praktiziert werden – beim Essen, Gehen oder Atmen.',
                'Sei geduldig mit dir selbst – Achtsamkeit ist eine Fähigkeit, die wächst.'
            ]
        },
        2: {
            id: 2,
            title: 'Geführte Meditation',
            emoji: '🎧',
            readTime: '6 Min. Lesezeit',
            overview: 'Geführte Meditation ist eine Form der Meditation, bei der eine Stimme dich durch den Prozess leitet. Sie eignet sich besonders gut für Anfänger, da sie Struktur und Orientierung bietet.',
            facts: [
                'Geführte Meditationen können Schlafqualität um bis zu 65% verbessern.',
                'Sie aktivieren das parasympathische Nervensystem und fördern Entspannung.',
                'Regelmäßige Praxis kann den Blutdruck senken.',
                'Es gibt spezialisierte Meditationen für verschiedene Bedürfnisse wie Schlaf, Fokus oder Angst.'
            ],
            literature: [
                { title: 'Meditation für Skeptiker', author: 'Ulrich Ott', description: 'Wissenschaftlich fundierte Einführung in die Meditation.' },
                { title: 'Der Weg des Künstlers', author: 'Julia Cameron', description: 'Kreativität und Meditation als Werkzeuge der Selbstfindung.' }
            ],
            videos: [
                { title: '10 Minuten Meditation zum Einschlafen', duration: '10:00', description: 'Eine beruhigende Meditation für besseren Schlaf.' },
                { title: 'Morgen-Meditation für einen guten Start', duration: '8:30', description: 'Starte deinen Tag mit Klarheit und Energie.' }
            ],
            conclusion: 'Geführte Meditation ist der perfekte Einstieg in die Welt der Meditation. Lass dich von einer Stimme leiten und finde deinen eigenen Rhythmus.',
            takeaways: [
                'Nutze Apps oder Online-Ressourcen für geführte Meditationen.',
                'Finde einen ruhigen Ort und eine bequeme Position.',
                'Es ist normal, wenn die Gedanken abschweifen – bringe sie sanft zurück.',
                'Experimentiere mit verschiedenen Arten von geführten Meditationen.'
            ]
        },
        3: {
            id: 3,
            title: 'Umgang mit Stress',
            emoji: '📖',
            readTime: '5 Min. Lesezeit',
            overview: 'Stress ist eine natürliche Reaktion des Körpers auf Herausforderungen. Chronischer Stress kann jedoch zu gesundheitlichen Problemen führen. Es gibt bewährte Strategien, um Stress effektiv zu bewältigen.',
            facts: [
                'Chronischer Stress kann das Immunsystem schwächen und zu Krankheiten führen.',
                'Bewegung ist eine der effektivsten Methoden zur Stressreduktion.',
                'Soziale Kontakte und ein starkes Netzwerk schützen vor den Folgen von Stress.',
                'Ausreichend Schlaf ist entscheidend für die Stressresistenz.'
            ],
            literature: [
                { title: 'Warum Zebras keine Magengeschwüre bekommen', author: 'Robert Sapolsky', description: 'Wie Stress den Körper beeinflusst – verständlich erklärt.' },
                { title: 'Die Stress-Lösung', author: 'Dr. Rangan Chatterjee', description: 'Praktische Strategien für weniger Stress im Alltag.' }
            ],
            videos: [
                { title: 'Stress verstehen und bewältigen', duration: '15:20', description: 'Was passiert im Körper bei Stress und wie man damit umgeht.' },
                { title: '5-Minuten Atemübung gegen Stress', duration: '5:00', description: 'Eine schnelle Übung für akute Stresssituationen.' }
            ],
            conclusion: 'Stress gehört zum Leben, aber er muss uns nicht beherrschen. Mit den richtigen Werkzeugen und einer bewussten Lebensweise können wir lernen, Stress zu managen.',
            takeaways: [
                'Identifiziere deine persönlichen Stressauslöser.',
                'Baue regelmäßige Pausen und Erholungszeiten in deinen Alltag ein.',
                'Bewegung, Natur und soziale Kontakte sind natürliche Stresskiller.',
                'Lerne, Nein zu sagen und Grenzen zu setzen.'
            ]
        }
    }

    // Fallback für unbekannte IDs
    const defaultArticle = {
        id: id,
        title: 'Artikel',
        emoji: '📄',
        readTime: '5 Min. Lesezeit',
        overview: 'Dieser Artikel enthält wertvolle Informationen zum Thema psychische Gesundheit und Wohlbefinden.',
        facts: [
            'Psychische Gesundheit ist genauso wichtig wie körperliche Gesundheit.',
            'Frühzeitige Unterstützung kann langfristige Probleme verhindern.',
            'Jeder Mensch kann von Techniken zur Selbstfürsorge profitieren.'
        ],
        literature: [
            { title: 'Weiterführende Literatur', author: 'Verschiedene Autoren', description: 'Wird in einer späteren Version ergänzt.' }
        ],
        videos: [
            { title: 'Weiterführende Videos', duration: '-', description: 'Wird in einer späteren Version ergänzt.' }
        ],
        conclusion: 'Weitere Inhalte werden in Zusammenarbeit mit dem Backend-Team ergänzt.',
        takeaways: [
            'Bleib neugierig und offen für neue Erkenntnisse.',
            'Kleine Schritte führen zu großen Veränderungen.'
        ]
    }

    return articles[id] || defaultArticle
}

/**
 * Hole alle Artikel für die Bibliothek
 *
 * @returns {Promise<Array>} - Array von Artikel-Objekten mit:
 *   - id: number
 *   - title: string
 *   - description: string
 *   - readTime: string
 *   - emoji: string
 */
export async function getAllArticles() {
    // TODO: Ersetzen mit echtem API-Aufruf wenn Backend bereit ist
    // const response = await fetch(`${BASE_URL}/articles`)
    // const data = await response.json()
    // return data.articles

    // Mock-Daten
    return [
        { id: 1, title: 'Achtsamkeit für Anfänger', description: 'Lerne die Grundlagen der Achtsamkeit', readTime: '5 Min. Lesezeit', emoji: '🧘‍♀️' },
        { id: 2, title: 'Geführte Meditation', description: 'Entspanne deinen Geist', readTime: '6 Min. Lesezeit', emoji: '🎧' },
        { id: 3, title: 'Umgang mit Stress', description: 'Praktische Tipps für den Alltag', readTime: '5 Min. Lesezeit', emoji: '📖' },
        { id: 4, title: 'Emotionen verstehen', description: 'Was sagen uns unsere Gefühle?', readTime: '7 Min. Lesezeit', emoji: '💭' },
        { id: 5, title: 'Schlaf-Meditation', description: 'Für einen erholsamen Schlaf', readTime: '8 Min. Lesezeit', emoji: '🌙' },
        { id: 6, title: 'Selbstfürsorge Rituale', description: 'Tägliche Routinen für dein Wohlbefinden', readTime: '7 Min. Lesezeit', emoji: '✨' },
        { id: 7, title: 'Angst bewältigen', description: 'Strategien gegen Angststörungen', readTime: '10 Min. Lesezeit', emoji: '🌈' },
        { id: 8, title: 'Positive Affirmationen', description: 'Stärke dein Selbstvertrauen', readTime: '4 Min. Lesezeit', emoji: '💪' },
        { id: 9, title: 'Resilienz aufbauen', description: 'Wie du Krisen besser meisterst', readTime: '8 Min. Lesezeit', emoji: '🌺' }
    ]
}