export const dutchFaqRichBodies: Record<string, string> = {
  '70': String.raw`
    <h2>Wat is een outputtemplate?</h2>
    <p>Met outputtemplates bepaal je exact wat Vesalius AI genereert na een patiëntinteractie. Je legt de structuur, inhoud en timing vast, waarna het systeem de rest automatisch afhandelt.</p>
    <p>Zodra een template is geconfigureerd, wordt bij elke interactie op het juiste moment de juiste output aangemaakt. Meerdere templates kunnen tegelijk actief zijn en onafhankelijk van elkaar werken. Zo kun je bijvoorbeeld tegelijk een verwijsbrief en een consultatienota laten genereren.</p>
    <h2>Hoe stel ik dit in?</h2>
    <p>Ga naar <strong>Settings → Interactions → Output</strong>.</p>
    <figure><img src="https://www.vesalius.ai/web/image/7983-0d4a439a/Screenshot%202026-03-09%20at%2017.49.42.webp?access_token=b71f88a2-5498-4154-8162-37fbdbaca073" alt="" data-attachment-id="7981" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="7981" data-original-src="/web/image/7981-a89cf598/Screenshot%202026-03-09%20at%2017.49.42.png" data-mimetype-before-conversion="image/png" data-resize-width="1920" data-mimetype="image/webp" loading="lazy" style="display: inline-block; width: 360px;"></figure>
    <h3>Stap 1 – Maak een nieuw template</h3>
    <ol>
      <li>Klik op <strong>+ New Template</strong>.</li>
    </ol>
    <figure><img src="https://www.vesalius.ai/web/image/7985-48aabee4/Screenshot%202026-03-09%20at%2017.50.23.webp?access_token=06ef96f0-a4d7-46c6-9fee-5d886d770d47" alt="" data-attachment-id="7982" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="7982" data-original-src="/web/image/7982-e1f8f213/Screenshot%202026-03-09%20at%2017.50.23.png" data-mimetype-before-conversion="image/png" data-resize-width="1920" data-mimetype="image/webp" loading="lazy" style="display: inline-block; width: 360px;"></figure>
    <h3>Stap 2 – Geef je template een naam</h3>
    <ol>
      <li>Kies een duidelijke, beschrijvende naam die het doel van de output weerspiegelt.</li>
    </ol>
    <p>Voorbeeld: <em>Brief aan de verwijzende arts</em></p>
    <h3>Stap 3 – Kies een trigger</h3>
    <p>Bepaal wanneer dit template automatisch moet afgaan. Je hebt vier opties:</p>
    <ul>
      <li><strong>None</strong> — geen automatische trigger, alleen handmatig.</li>
      <li><strong>After conversation</strong> — na afronding van het patiëntgesprek.</li>
      <li><strong>After consultation</strong> — na afronding van de consultatie via speech-to-text.</li>
      <li><strong>After conversation and consultation</strong> — pas wanneer beide afgerond zijn.</li>
    </ul>
    <h3>Stap 4 – Beschrijf het doel van het template</h3>
    <ol>
      <li>Schrijf kort waarvoor dit template dient.</li>
    </ol>
    <p>Voorbeeld: <em>Dit template wordt gebruikt om de verwijsbrief voor de verwijzende arts te genereren.</em></p>
    <figure><img src="https://www.vesalius.ai/web/image/8011-12a9d58c/Screenshot%202026-03-13%20at%2016.58.52.webp?access_token=9121f903-8338-47b1-bcd6-e68d22eaff62" alt="" data-attachment-id="8009" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="8009" data-original-src="/web/image/8009-c4c7e50e/Screenshot%202026-03-13%20at%2016.58.52.png" data-mimetype-before-conversion="image/png" data-resize-width="690" data-mimetype="image/webp" loading="lazy" style="display: inline-block; width: 360px;"></figure>
    <h3>Stap 5 – Definieer het outputformaat</h3>
    <p>Dit is de belangrijkste stap. Hier beschrijf je hoe de output moet worden opgebouwd.</p>
    <ol>
      <li>Schrijf de gewenste structuur uit in het tekstveld.</li>
      <li>Gebruik placeholders met dubbele accolades om dynamische patiëntgegevens in te voegen, bijvoorbeeld <code>{{patient name}}</code>.</li>
    </ol>
    <p>Voorbeelden van placeholders:</p>
    <ul>
      <li><code>{{patient name}}</code></li>
      <li><code>{{date of consultation}}</code></li>
      <li><code>{{referring physician}}</code></li>
    </ul>
    <p>Je kunt placeholders ook in lopende tekst of lijsten gebruiken. Bijvoorbeeld:</p>
    <p><em>De patiënt {{patient name}} werd gezien op {{date of consultation}} voor...</em></p>
    <p>Een uitgebreider voorbeeld voor een verwijsbrief:</p>
    <p><em>Beste Dr. {{name referring physician}},<br>Ik schrijf u in verband met uw patiënt {{patient name}}, geboren op {{date of birth}}, die op {{date of consultation}} gezien werd door {{treating physician}}.<br>Reden van verwijzing: {{referral source}} — {{main complaints}}.<br>Anamnese: {{anamnesis summary}}.<br>Huidige medicatie: {{medication}}.<br>Bekende allergieën: {{allergies}}.<br>Familiale voorgeschiedenis: {{family history}}. {{lifestyle}}.<br>Klinisch onderzoek: {{clinical findings}}. BMI {{BMI}}.<br>Aanvullende onderzoeken: {{investigation results}}.<br>Diagnose: {{diagnosis}}.<br>Beleid: {{management plan}}. Opvolging gepland binnen {{follow-up timing}}.<br>Aarzel niet om contact op te nemen bij vragen.<br>Met vriendelijke groet,<br>{{treating physician}}</em></p>
    <p><strong>Opmerking:</strong> een placeholder wordt alleen ingevuld als die informatie ook effectief verzameld werd tijdens de interactie. Als een bepaald gegeven niet aanwezig is, blijft dat veld leeg.</p>
    <figure><img src="https://www.vesalius.ai/web/image/8012-d6038786/Screenshot%202026-03-13%20at%2017.00.39.webp?access_token=0da3a8dd-fd4b-459a-be2f-e883fc0c26b0" alt="" data-attachment-id="8010" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="8010" data-original-src="/web/image/8010-66278061/Screenshot%202026-03-13%20at%2017.00.39.png" data-mimetype-before-conversion="image/png" data-resize-width="1127" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h3>Stap 6 – Voeg extra instructies toe (optioneel)</h3>
    <p>Voeg bijkomende prompts toe om de output verder te verfijnen, bijvoorbeeld:</p>
    <ul>
      <li><em>wees beknopt</em></li>
      <li><em>schrijf in formeel Nederlands</em></li>
      <li><em>vermijd onnodig medisch jargon</em></li>
    </ul>
    <h3>Stap 7 – Sla het template op</h3>
    <ol>
      <li>Klik rechtsboven op <strong>Save</strong>.</li>
    </ol>
    <p>Je template is nu actief en genereert automatisch output volgens de trigger die je in stap 3 gekozen hebt.</p>
    <figure><img src="https://www.vesalius.ai/web/image/8013-fdab87f2/Screenshot%202026-03-13%20at%2017.05.42.webp?access_token=a2baf7a2-7130-4657-953a-3316399796de" alt="" data-attachment-id="8008" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="8008" data-original-src="/web/image/8008-91556da8/Screenshot%202026-03-13%20at%2017.05.42.png" data-mimetype-before-conversion="image/png" data-resize-width="1133" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h2>Waar vind ik de output terug?</h2>
    <p>Zodra een template automatisch of handmatig werd uitgevoerd, kan je het resultaat bekijken in de detailpagina van het gesprek.</p>
    <ol>
      <li>Open het relevante gesprek.</li>
      <li>Ga bovenaan naar het tabblad <strong>Output</strong>.</li>
      <li>Daar zie je alle gegenereerde outputs voor dat gesprek.</li>
    </ol>
    <p>Als een template op <strong>None</strong> staat, wordt het niet automatisch getriggerd. Om de output dan handmatig te genereren:</p>
    <ol>
      <li>Open het tabblad <strong>Output</strong> in de detailpagina van het gesprek.</li>
      <li>Kies het gewenste template in de dropdown.</li>
      <li>Klik op <strong>Generate</strong>.</li>
    </ol>
  `,
  '64': String.raw`
    <h2>Wat is automatisch verzenden van vragenlijsten?</h2>
    <p>Het systeem kan automatisch de juiste vragenlijst naar de patiënt sturen op basis van de <strong>arts</strong> en het <strong>afspraaktype</strong>. Zodra alles is ingesteld, krijgt elke afspraak automatisch de juiste vragenlijst, zolang die afspraak via de kalender wordt aangemaakt.</p>
    <p>Afspraken die buiten de kalenderflow gemaakt worden, triggeren deze automatische verzending niet.</p>
    <h2>Waarom is dit nuttig?</h2>
    <ul>
      <li>Elke arts kan met zijn of haar eigen vragenlijsten werken.</li>
      <li>Patiënten krijgen altijd de juiste voorbereiding.</li>
      <li>Je vermindert manueel werk en vermijdt fouten.</li>
    </ul>
    <h2>Hoe stel ik dit in?</h2>
    <p>De configuratie bestaat uit <strong>3 stappen</strong> en werkt alleen voor afspraken die via de kalender ingepland worden, dus met timeslots en gekoppelde artsen.</p>
    <h3>Stap 1 – Koppel een vragenlijst aan een arts</h3>
    <ol>
      <li>Ga naar <strong>Settings → Interactions → Conversation Templates</strong>.</li>
      <li>Open de vragenlijst die je wilt koppelen.</li>
      <li>Selecteer bij <strong>Linked doctors</strong> één of meerdere artsen.</li>
      <li>Vergeet niet op <strong>Save</strong> te klikken.</li>
    </ol>
    <p>Als er geen arts gekoppeld is, wordt de vragenlijst als algemeen beschouwd en kan die voor alle artsen gebruikt worden.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6647-32b39aa3/Screenshot%202025-11-26%20at%2010.24.53.webp?access_token=02d37d40-dc29-44da-9072-2514ab00e567" alt="" data-attachment-id="6644" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6644" data-original-src="/web/image/6644-97ba57cd/Screenshot%202025-11-26%20at%2010.24.53.png" data-mimetype-before-conversion="image/png" data-resize-width="1582" data-mimetype="image/webp" loading="lazy" style="display: inline-block; width: 360px;"></figure>
    <h3>Stap 2 – Koppel de vragenlijst aan een afspraaktype</h3>
    <ol>
      <li>Ga naar <strong>Settings → Appointments → Manage Exams</strong>.</li>
      <li>Selecteer de modaliteit.</li>
      <li>Klik op het potloodicoon naast het afspraaktype.</li>
      <li>Kies bij <strong>Conversation</strong> de juiste vragenlijst(en).</li>
      <li>Vergeet niet op <strong>Save</strong> te klikken.</li>
    </ol>
    <p>Je kunt meerdere vragenlijsten aan één afspraaktype koppelen.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6646-8292ab36/Screenshot%202025-11-26%20at%2010.26.45.webp?access_token=29cc18b2-9981-4ae6-a5fe-1658382acc69" alt="" data-attachment-id="6645" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6645" data-original-src="/web/image/6645-f160b144/Screenshot%202025-11-26%20at%2010.26.45.png" data-mimetype-before-conversion="image/png" data-resize-width="1880" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h3>Stap 3 – Koppel de arts aan een timeslot</h3>
    <ol>
      <li>Ga naar <strong>Settings → Appointments → Manage Agenda</strong>.</li>
      <li>Selecteer bovenaan de ruimte en het timeslot.</li>
      <li>Kies bij <strong>Doctor/Provider</strong> de arts die aan dat timeslot gekoppeld is.</li>
      <li>Klik op <strong>Save</strong>.</li>
    </ol>
    <p>Automatische selectie werkt alleen wanneer de afspraak ingepland wordt in een timeslot dat aan een arts gekoppeld is.</p>
    <h2>Hoe werkt dit in de praktijk?</h2>
    <p>Wanneer een afspraak via de kalender wordt aangemaakt, doet het systeem automatisch het volgende:</p>
    <ul>
      <li>het controleert het timeslot</li>
      <li>het bepaalt welke arts aan dat timeslot gekoppeld is</li>
      <li>het selecteert de vragenlijst die zowel bij de arts als bij het afspraaktype past</li>
      <li>het verstuurt die vragenlijst automatisch naar de patiënt</li>
    </ul>
    <h2>Belangrijke opmerkingen</h2>
    <ul>
      <li><strong>Dit werkt alleen via de kalender.</strong> Afspraken buiten timeslots of manueel aangemaakte afspraken triggeren geen automatische verzending.</li>
      <li><strong>Afspraak buiten een timeslot:</strong> er wordt geen vragenlijst automatisch gekozen. Je kunt er wel nog handmatig één toevoegen.</li>
      <li><strong>Geen arts gekoppeld aan het timeslot:</strong> het systeem kan geen vragenlijst automatisch kiezen.</li>
      <li><strong>Geen arts gekoppeld aan de vragenlijst:</strong> de vragenlijst wordt algemeen en geldt voor alle artsen.</li>
      <li><strong>Meerdere vragenlijsten per afspraaktype:</strong> het systeem kiest de vragenlijst die overeenkomt met de arts die aan het timeslot gekoppeld is.</li>
    </ul>
  `,
  '63': String.raw`
    <h2>Wat is Slimme Planning?</h2>
    <p>Slimme Planning bepaalt automatisch het ideale moment om een gesprek naar een patiënt te sturen. In plaats van de uitnodiging onmiddellijk te versturen, plant het systeem het optimale verzendmoment op basis van de consultatiedatum.</p>
    <h2>Waarom is dit nuttig?</h2>
    <ul>
      <li>Patiënten ontvangen hun vragenlijst niet te vroeg.</li>
      <li>Je kunt gesprekken ruim op voorhand inplannen.</li>
      <li>Het herinneringssysteem werkt op het juiste moment.</li>
    </ul>
    <h2>Hoe activeer ik Slimme Planning?</h2>
    <h3>1. Ga naar de instellingen van Slimme Planning</h3>
    <p>Navigeer naar <strong>Settings → Interactions → General → Smart Scheduling</strong>.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6641-a270a1f6/Screenshot%202025-11-26%20at%2009.49.41.webp?access_token=09d25b1d-ab81-4761-823b-b5c8f14e284d" alt="" data-attachment-id="6640" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6640" data-original-src="/web/image/6640-b58d21b7/Screenshot%202025-11-26%20at%2009.49.41.png" data-mimetype-before-conversion="image/png" data-resize-width="1197" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h3>2. Zet de toggle voor Slimme Planning aan</h3>
    <ul>
      <li><strong>Aan:</strong> het systeem verstuurt gesprekken automatisch op het juiste moment.</li>
      <li><strong>Uit:</strong> gesprekken worden meteen na creatie verzonden.</li>
    </ul>
    <h3>3. Kies het aantal dagen vóór de deadline</h3>
    <p>Geef aan hoeveel dagen voor de consultatie je wilt dat de resultaten afgerond zijn.</p>
    <p><strong>Belangrijk:</strong> het systeem gebruikt altijd een <strong>minimum buffer van 7 dagen</strong>. Zo blijft er genoeg tijd over voor de patiënt om de vragenlijst in te vullen en voor herinneringen om correct te werken.</p>
    <p>Voorbeelden:</p>
    <ul>
      <li>0 dagen instellen → het systeem gebruikt 7 dagen</li>
      <li>3 dagen instellen → het systeem gebruikt 10 dagen</li>
      <li>5 dagen instellen → het systeem gebruikt 12 dagen</li>
    </ul>
    <h2>Wanneer wordt de eerste uitnodiging verstuurd?</h2>
    <p>De eerste uitnodiging wordt automatisch verstuurd zodra de consultatie in het berekende venster valt: jouw ingestelde aantal dagen + 7 dagen buffer.</p>
    <p>Voorbeeld:</p>
    <ul>
      <li>Consultatiedatum: 20 november</li>
      <li>Instelling: 3 dagen</li>
      <li>Eerste uitnodiging verstuurd op: 10 november</li>
    </ul>
    <h2>Hoe werken herinneringen?</h2>
    <p>Nadat de eerste e-mail verzonden is, volgen de gebruikelijke herinneringsmomenten:</p>
    <ul>
      <li>7 dagen voor de deadline</li>
      <li>3 dagen voor de deadline</li>
      <li>1 dag voor de deadline</li>
    </ul>
    <h2>Wat als een gesprek dicht bij de afspraakdatum wordt aangemaakt?</h2>
    <p>Als een gesprek <strong>binnen</strong> het buffervenster aangemaakt wordt, dan wordt het <strong>onmiddellijk</strong> verzonden, ook wanneer Slimme Planning actief is.</p>
    <h2>Hoe herken ik geplande gesprekken?</h2>
    <h3>Status: “Planned”</h3>
    <p>Het gesprek is al aangemaakt maar nog niet verzonden. Het systeem wacht op het optimale moment.</p>
    <h3>Status: “Pending”</h3>
    <p>De uitnodiging is verzonden en het normale verloop is gestart.</p>
    <h2>Wat gebeurt er als Slimme Planning wordt uitgeschakeld?</h2>
    <ul>
      <li>Alle gesprekken die nog de status <strong>Planned</strong> hadden, worden meteen verzonden.</li>
      <li>Nieuwe gesprekken worden vanaf dan onmiddellijk na creatie verstuurd.</li>
    </ul>
    <h2>Wanneer worden Slim Geplande gesprekken verstuurd?</h2>
    <p>Het systeem controleert elke ochtend om <strong>07:00</strong> welke gesprekken aan de beurt zijn en verstuurt ze dan automatisch.</p>
  `,
  '62': String.raw`
    <p>Om je kalender overzichtelijker te maken, kun je gerelateerde kamers samen onderbrengen in een kamergroep. Hieronder zie je hoe de kamers <strong>RX</strong> en <strong>Cone Beam CT</strong> bijvoorbeeld gegroepeerd kunnen worden onder <strong>Medical Imaging</strong>.</p>
    <h2>Stap voor stap</h2>
    <ol>
      <li>Ga naar <strong>Settings → Appointments → Manage Agenda</strong>.</li>
    </ol>
    <p>Daar zie je alle actieve timeslots voor elke kamer.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6630-e9bdebb5/Screenshot%202025-11-26%20at%2009.17.25.webp?access_token=5149f853-8c8b-493c-819f-1e6115d5d9a7" alt="" data-attachment-id="6624" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6624" data-original-src="/web/image/6624-c60ddc9f/Screenshot%202025-11-26%20at%2009.17.25.png" data-mimetype-before-conversion="image/png" data-resize-width="258" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <ol start="2">
      <li>Ga naar de kamer die je in een groep wilt onderbrengen.</li>
    </ol>
    <p>Alle kamers zijn bovenaan de pagina zichtbaar.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6632-398aca3b/Screenshot%202025-11-26%20at%2009.19.24.webp?access_token=75cfeb13-69b5-4eec-ac3b-92821e601453" alt="" data-attachment-id="6625" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6625" data-original-src="/web/image/6625-60987d51/Screenshot%202025-11-26%20at%2009.19.24.png" data-mimetype-before-conversion="image/png" data-resize-width="677" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <ol start="3">
      <li>Klik op het potloodicoon naast een kamer, bijvoorbeeld <strong>RX</strong>, om de detailpagina van de kamer te openen.</li>
    </ol>
    <figure><img src="https://www.vesalius.ai/web/image/6634-30281966/Screenshot%202025-11-26%20at%2009.20.09.webp?access_token=3ddadab3-f5fa-435c-924e-bcd434df0d8c" alt="" data-attachment-id="6626" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6626" data-original-src="/web/image/6626-61b8eaa5/Screenshot%202025-11-26%20at%2009.20.09.png" data-mimetype-before-conversion="image/png" data-resize-width="1491" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <ol start="4">
      <li>Open op de detailpagina van de kamer de dropdown <strong>Group</strong>.</li>
      <li>Klik op <strong>Create new</strong> om een nieuwe kamergroep aan te maken.</li>
    </ol>
    <p>Maak bijvoorbeeld de groep <em>Medical Imaging</em> aan door de naam in alle beschikbare talen in te vullen en te bevestigen.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6635-26778b1e/Screenshot%202025-11-26%20at%2009.20.34.webp?access_token=79d6f820-9e82-40ba-8227-5e3b506ddb0e" alt="" data-attachment-id="6627" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6627" data-original-src="/web/image/6627-85711aa2/Screenshot%202025-11-26%20at%2009.20.34.png" data-mimetype-before-conversion="image/png" data-resize-width="538" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <ol start="6">
      <li>Selecteer die groep vervolgens in de detailpagina van elke kamer die je wilt toevoegen.</li>
      <li>Klik telkens op <strong>Save</strong> nadat je de groep hebt toegevoegd of gewijzigd.</li>
    </ol>
    <p>In dit voorbeeld worden <strong>RX</strong> en <strong>Cone Beam CT</strong> toegevoegd aan de groep <em>Medical Imaging</em>.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6633-55d396b5/Screenshot%202025-11-26%20at%2009.21.19.webp?access_token=45761985-aa5e-49f7-a24e-ab0548d54945" alt="" data-attachment-id="6628" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6628" data-original-src="/web/image/6628-81302d47/Screenshot%202025-11-26%20at%2009.21.19.png" data-mimetype-before-conversion="image/png" data-resize-width="1036" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <ol start="8">
      <li>In de kalender zie je de kamers nu netjes gegroepeerd linksonder.</li>
    </ol>
    <figure><img src="https://www.vesalius.ai/web/image/6631-4cb78a6a/Screenshot%202025-11-26%20at%2009.26.30.webp?access_token=d7c65629-92c8-42f5-8eef-6a95ae6b9952" alt="" data-attachment-id="6629" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6629" data-original-src="/web/image/6629-8d0f102c/Screenshot%202025-11-26%20at%2009.26.30.png" data-mimetype-before-conversion="image/png" data-resize-width="232" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
  `,
  '59': String.raw`
    <p>Zo kun je de Scribe-bot gebruiken, zelfs als je vóór de consultatie geen Vesalius-gesprek hebt verstuurd. Dat is ideaal voor walk-ins, dringende consultaties of korte opvolgcontacten.</p>
    <h2>Hoe start je?</h2>
    <ol>
      <li>Ga naar het <strong>Interactions</strong>-dashboard.</li>
      <li>Klik op de knop <strong>+</strong> en kies <strong>Interaction</strong>.</li>
      <li>Selecteer een bestaande patiënt (<strong>Interaction</strong>) of start anoniem (<strong>Anonymous interaction</strong>).</li>
      <li>Klik op <strong>Start recording</strong>.</li>
      <li>Voer je consultatie normaal uit.</li>
    </ol>
    <p>Voor de beste resultaten gebruik je best een toestel met een goede microfoon en spreek je duidelijk in.</p>
    <figure><img class="img-fluid" data-file-name="Screenshot 2025-11-06 at 09.46.47.png" src="https://www.vesalius.ai/web/image/6228-ec712a98/Screenshot%202025-11-06%20at%2009.46.47.png?access_token=0a7f82c5-3c18-499c-9c46-4bcb970d5ef2" loading="lazy"></figure>
    <ol start="6">
      <li>Klik op <strong>Stop recording</strong> wanneer je klaar bent.</li>
    </ol>
    <p>Na enkele seconden toont Scribe een gestructureerde samenvatting die je kunt kopiëren naar het EPD en desgewenst kunt omzetten naar een klinische brief.</p>
    <figure><img class="img-fluid" data-file-name="Screenshot 2025-11-06 at 09.47.27.png" src="https://www.vesalius.ai/web/image/6231-13e8d804/Screenshot%202025-11-06%20at%2009.47.27.png?access_token=26dc16d8-6283-417f-978b-561071aa372e" loading="lazy"></figure>
    <p>Standaard wordt de output in klassiek SOAP-formaat gegenereerd, maar je kunt dit volledig aanpassen in de instellingen.</p>
    <p>Je kunt daarna nog notities toevoegen of verwijderen door gewoon tekst te typen of te wissen. Je kunt ook opnieuw op opnemen drukken en extra informatie inspreken; de agent verwerkt dat automatisch in de notities.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6230-fff4a443/Screenshot%202025-11-06%20at%2009.48.43.webp?access_token=bb2ffa7d-e1a2-4e5b-bb8b-817594ac2042" alt="" data-attachment-id="6223" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6223" data-original-src="/web/image/6223-f823c8fb/Screenshot%202025-11-06%20at%2009.48.43.png" data-mimetype-before-conversion="image/png" data-resize-width="1493" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <p>Via de knop <strong>Generate</strong> kun je vervolgens meteen een brief laten genereren op basis van de notities die je verzamelde.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6229-8197f347/Screenshot%202025-11-06%20at%2010.00.15.webp?access_token=d81adfa7-ac64-4979-ab6d-f44dd2b4fc99" alt="" data-attachment-id="6226" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6226" data-original-src="/web/image/6226-c7467ff1/Screenshot%202025-11-06%20at%2010.00.15.png" data-mimetype-before-conversion="image/png" data-resize-width="1262" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h2>Wat krijg je precies?</h2>
    <ul>
      <li>Een gestructureerde medische samenvatting.</li>
      <li>Standaard een klassieke SOAP-nota, tenzij je een ander outputformaat instelt.</li>
      <li>De mogelijkheid om meteen een nette klinische brief te genereren voor verwijzing, het EPD of de patiënt.</li>
    </ul>
    <h2>Waarom dit gebruiken?</h2>
    <ul>
      <li>Er is geen voorbereiding nodig.</li>
      <li>Het is ideaal voor standaardconsultaties, dringende raadplegingen en korte opvolgingen.</li>
      <li>Je bespaart tijd op notuleren én het schrijven van brieven.</li>
    </ul>
  `,
  '27': String.raw`
    <p>Je kunt nu volledig bepalen hoe de Vesalius Scribe-bot consultatiesamenvattingen structureert via outputformaten. Zo leg je vast welke secties verschijnen, bijvoorbeeld <em>Anamnese</em>, <em>Klinisch Onderzoek</em>, <em>Diagnose</em> of <em>Behandelplan</em>, en hoe die worden gepresenteerd.</p>
    <h2>Waar beheer ik outputformaten?</h2>
    <ol>
      <li>Ga naar <strong>Settings → Interactions → Consultations</strong>.</li>
      <li>Bovenaan zie je alle beschikbare outputformaten voor jouw instelling.</li>
      <li>Je kunt een template als standaard instellen door het te openen en <strong>default template</strong> aan te zetten.</li>
    </ol>
    <figure><img src="https://www.vesalius.ai/web/image/6774-52e79bb7/Screenshot%202025-12-03%20at%2014.30.08.webp?access_token=ae43090e-2422-4c44-a757-928399272f0a" alt="" data-attachment-id="6764" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6764" data-original-src="/web/image/6764-76ebe33c/Screenshot%202025-12-03%20at%2014.30.08.png" data-mimetype-before-conversion="image/png" data-resize-width="1538" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <figure><img src="https://www.vesalius.ai/web/image/6775-70058234/Screenshot%202025-12-03%20at%2014.30.08.webp?access_token=8aa1314b-31a0-4e46-80a1-eb4493e7a57b" alt="" data-attachment-id="6765" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6765" data-original-src="/web/image/6765-8fcfa610/Screenshot%202025-12-03%20at%2014.30.08.png" data-mimetype-before-conversion="image/png" data-resize-width="1538" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h2>Hoe maak ik een eigen template?</h2>
    <p>Je kunt vertrekken van een bestaand template of een volledig nieuw template aanmaken.</p>
    <ol>
      <li>Klik op <strong>New template +</strong>.</li>
      <li>Geef je template een herkenbare naam.</li>
      <li>Beschrijf het doel van de template.</li>
      <li>Beschrijf het gewenste formaat.</li>
    </ol>
    <figure><img src="https://www.vesalius.ai/web/image/6771-8faf6ae7/Screenshot%202025-12-03%20at%2014.32.34.webp?access_token=3dad0756-00d6-4e12-8d70-13e4b00575af" alt="" data-attachment-id="6766" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6766" data-original-src="/web/image/6766-5a10f3a7/Screenshot%202025-12-03%20at%2014.32.34.png" data-mimetype-before-conversion="image/png" data-resize-width="606" data-mimetype="image/webp" loading="lazy" style="display: inline-block; width: 360px;"></figure>
    <p>Bij het beschrijven van het formaat geef je aan hoe je de output wilt laten opbouwen. Een voorbeeld van een duidelijke structuur:</p>
    <ul>
      <li><strong>Subjective:</strong> alle symptomen, voorgeschiedenis, pijn, functionele beperkingen en doelen die de patiënt rapporteert.</li>
      <li><strong>Objective:</strong> alle bevindingen van de clinicus, zoals inspectie, palpatie, ROM, kracht, testen en metingen.</li>
      <li><strong>Assessment:</strong> de klinische interpretatie, vermoedelijke diagnose, ernst en belangrijkste bevindingen.</li>
      <li><strong>Plan:</strong> de volgende stappen zoals behandeling, oefeningen, testen, doorverwijzingen, educatie en opvolging.</li>
    </ul>
    <figure><img src="https://www.vesalius.ai/web/image/6770-e0ea0f11/Screenshot%202025-12-03%20at%2014.35.35.webp?access_token=3538c402-2ec5-45e5-9d05-59659ef74a8f" alt="" data-attachment-id="6767" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6767" data-original-src="/web/image/6767-e0ec060c/Screenshot%202025-12-03%20at%2014.35.35.png" data-mimetype-before-conversion="image/png" data-resize-width="382" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h2>Extra instructies toevoegen</h2>
    <p>Nadien kun je bijkomende instructies toevoegen om de output nog gerichter te maken, bijvoorbeeld:</p>
    <ul>
      <li><em>Ik wil een korte en bondige output</em></li>
      <li><em>Werk met bullet points</em></li>
    </ul>
    <figure><img src="https://www.vesalius.ai/web/image/6773-73f0c557/Screenshot%202025-12-03%20at%2014.47.08.webp?access_token=806d8966-0d69-4e8a-b250-7d09ad1f5767" alt="" data-attachment-id="6768" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6768" data-original-src="/web/image/6768-cbe3b727/Screenshot%202025-12-03%20at%2014.47.08.png" data-mimetype-before-conversion="image/png" data-resize-width="1920" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
    <h2>Een andere template gebruiken dan de standaardtemplate?</h2>
    <p>Dat kan door de huidige output opnieuw te genereren met een andere template. Je wisselt dus eenvoudig van outputformat zonder het hele proces opnieuw te doorlopen.</p>
    <figure><img src="https://www.vesalius.ai/web/image/6772-1470a976/Screenshot%202025-12-03%20at%2014.47.52.webp?access_token=a43cf1be-1a48-4c12-be6d-a44ea1b0d81b" alt="" data-attachment-id="6769" class="img img-fluid o_we_custom_image" data-format-mimetype="image/webp" data-original-id="6769" data-original-src="/web/image/6769-33b02644/Screenshot%202025-12-03%20at%2014.47.52.png" data-mimetype-before-conversion="image/png" data-resize-width="1920" data-mimetype="image/webp" loading="lazy" style="display: inline-block;"></figure>
  `,
  '26': String.raw`
    <p>Standaard vraagt de chatbot de patiënt naar de afspraakdatum wanneer die een PICO-link opent. Als je die vraag niet wilt tonen, kun je ze uitschakelen.</p>
    <h2>Zo doe je dat</h2>
    <ol>
      <li>Ga naar <strong>Settings → Interactions → Unique Link</strong>.</li>
      <li>Zoek in de tabel de zesde kolom: <strong>Ask for appointment date</strong>.</li>
      <li>Zet deze optie uit voor de link waarvoor je niet wilt dat de chatbot naar de afspraakdatum vraagt.</li>
    </ol>
    <p>Naast het label staat een info-icoon. Als je daarover hovert, zie je een korte uitleg: <em>If disabled, the patient will not be asked for the appointment date.</em></p>
    <h2>Wat gebeurt er als ik dit uitschakel?</h2>
    <ul>
      <li>De chatbot slaat de vraag over de afspraakdatum over.</li>
      <li>Het gesprek loopt gewoon verder met de overige vragen.</li>
      <li>De afspraakdatum is daarna niet beschikbaar als filtergegeven om gesprekken sneller terug te vinden.</li>
    </ul>
    <h2>Standaardinstelling</h2>
    <p>Voor nieuwe links staat deze optie standaard aan. De patiënt wordt dus automatisch naar de afspraakdatum gevraagd, tenzij je dit expliciet uitschakelt.</p>
  `,
  '25': String.raw`
    <p>Je kunt een PICO-link maken die gekoppeld is aan één of meerdere specifieke vragenlijsten. Zo gebruikt de chatbot alleen de geselecteerde vragenlijsten wanneer de patiënt de link opent.</p>
    <h2>Stappen om een unieke link te maken voor specifieke vragenlijsten</h2>
    <ol>
      <li>Ga naar <strong>Settings → Interactions → Unique Link</strong>.</li>
      <li>Zoek in het overzicht naar <strong>Column 3: Conversation types</strong>.</li>
      <li>Klik in die kolom om één of meerdere vragenlijsten toe te voegen.</li>
      <li>De lijst is geordend per type, zodat je snel de juiste vragenlijsten vindt.</li>
      <li>Hover over een type om de onderliggende vragenlijsten te zien.</li>
      <li>Kies één of meerdere vragenlijsten die je aan deze URL wilt koppelen.</li>
    </ol>
    <p>Wijzigingen worden automatisch opgeslagen zodra je het veld verlaat.</p>
    <h2>Hoe gebruikt de chatbot deze gekoppelde vragenlijsten?</h2>
    <p><strong>Als er één vragenlijst gekoppeld is:</strong></p>
    <p>De chatbot gebruikt altijd die specifieke vragenlijst wanneer de patiënt op de link klikt.</p>
    <p><strong>Als er meerdere vragenlijsten gekoppeld zijn:</strong></p>
    <p>De chatbot stelt eerst enkele verkennende vragen om de context van de patiënt te begrijpen en kiest daarna de meest relevante vragenlijst uit de set die jij geselecteerd hebt.</p>
    <h2>Wat als er geen vragenlijsten gekoppeld zijn?</h2>
    <p>Als je geen vragenlijsten koppelt, blijft de chatbot alle beschikbare vragenlijsten gebruiken, net zoals voordien.</p>
  `,
  '24': String.raw`
    <p>Wanneer een patiënt een gesprek start via een patiënt-geïnitieerde link, vraagt de chatbot eerst om identificatiegegevens, zoals naam of geboortedatum. Die gegevens helpen je om de patiënt terug te vinden in het dashboard.</p>
    <p>Als organisatiebeheerder kun je zelf bepalen welke identificatiegegevens gevraagd worden.</p>
    <h2>Zo configureer je dit</h2>
    <ol>
      <li>Ga naar <strong>Settings → General → Privacy → Patient Identification</strong>.</li>
      <li>Gebruik de toggles om specifieke velden aan of uit te zetten, zoals naam, e-mailadres, telefoonnummer of geboortedatum.</li>
    </ol>
    <p>Zo verzamel je enkel de informatie die je echt nodig hebt, terwijl patiënten toch correct geïdentificeerd kunnen worden binnen het platform.</p>
  `,
  '23': String.raw`
    <p>Bij het genereren van een PICO-link voor een patiënt-geïnitieerd gesprek kun je ervoor kiezen om dat gesprek anoniem te maken. Dat betekent dat er geen persoonlijke gegevens aan de patiënt worden gevraagd.</p>
    <h2>Waar vind ik deze instelling?</h2>
    <ol>
      <li>Ga naar <strong>Settings → Interactions → Unique link</strong>.</li>
      <li>In de tabel met unieke links vind je in de vijfde kolom de optie <strong>Anonymous</strong>.</li>
    </ol>
    <p>Naast het label <em>Anonymous</em> staat een info-icoon met de toelichting: <em>An anonymous intake will not request any identification from the patient.</em></p>
    <h2>Wat is het effect?</h2>
    <ul>
      <li>Er worden geen persoonlijke gegevens zoals naam, e-mail of telefoonnummer gevraagd.</li>
      <li>In de overzichtstabel verschijnt de patiënt met een systeemgegenereerde naam, bijvoorbeeld <em>Patient 1925</em>.</li>
    </ul>
  `,
  '22': String.raw`
    <p>Je kunt alle vragenlijsten beheren via <strong>Settings → Types of conversations</strong>. Daar krijg je een overzicht van alle vragenlijsten die momenteel op het platform beschikbaar zijn.</p>
    <p>Om een vragenlijst op te slaan, moeten alle verplichte velden ingevuld zijn.</p>
    <h2>Er zijn twee hoofdacties mogelijk</h2>
    <ol>
      <li>Een bestaande vragenlijst bewerken</li>
      <li>Een nieuwe vragenlijst aanmaken</li>
    </ol>
    <h2>1. Een bestaande vragenlijst bewerken</h2>
    <p>Klik op een bestaande vragenlijst om ze te openen. Je kunt dan:</p>
    <ul>
      <li>vragen aanpassen</li>
      <li>nieuwe vragen toevoegen</li>
      <li>vragen herschikken binnen een groep</li>
    </ul>
    <p><strong>Vergeet niet op Save te klikken rechtsonder nadat je wijzigingen hebt aangebracht.</strong></p>
    <h2>2. Een nieuwe vragenlijst aanmaken</h2>
    <ol>
      <li>Klik bovenaan op <strong>New questionnaire</strong>.</li>
      <li>Kies vervolgens <strong>Create blank template</strong>.</li>
    </ol>
    <p>Je start dan met een leeg template. Vul eerst de algemene informatie in:</p>
    <ul>
      <li><strong>Name:</strong> de titel van de vragenlijst zoals die in het systeem verschijnt. Kies een duidelijke en herkenbare naam.</li>
      <li><strong>Description:</strong> beschrijf wanneer of waarom deze vragenlijst gebruikt moet worden. Zo kan de AI automatisch de juiste vragenlijst activeren.</li>
      <li><strong>Intro:</strong> extra context die via de chatbot in het eerste bericht aan de patiënt getoond wordt.</li>
      <li><strong>Pathology:</strong> de aandoening of reden waarvoor de vragenlijst relevant is. Dit helpt om vragenlijsten logisch te groeperen.</li>
      <li><strong>Linked doctors:</strong> optioneel, handig om structuur te bewaren in je profiel.</li>
      <li><strong>Conversation type:</strong> het type vragenlijst, vooral nuttig om het platform overzichtelijk te houden.</li>
      <li><strong>Summary generation prompt:</strong> hier kun je de output van het gesprek verfijnen, bijvoorbeeld door te vragen om korte bullet points of juist volledige zinnen.</li>
    </ul>
    <h2>Zo begin je met opbouwen</h2>
    <h3>Stap 1 – Maak een groep aan</h3>
    <p>Een groep is een sectie waarin je verwante vragen samenbundelt. Voorbeeld: <em>Algemene informatie</em>.</p>
    <h3>Stap 2 – Voeg een vraag toe</h3>
    <p>Klik op <strong>New question</strong> en vul minstens deze twee velden in:</p>
    <ul>
      <li><strong>Key:</strong> een korte sleutel die gebruikt wordt om het antwoord in de samenvatting te koppelen, bijvoorbeeld <em>Type of pain</em>.</li>
      <li><strong>Question:</strong> de vraag zoals die aan de patiënt getoond wordt, bijvoorbeeld <em>What type of pain is the patient experiencing?</em></li>
    </ul>
    <p>Optionele velden:</p>
    <ul>
      <li><strong>Condition:</strong> toon deze vraag alleen wanneer aan een voorwaarde voldaan is, bijvoorbeeld <em>If pain score &gt; 7</em>.</li>
      <li><strong>Options:</strong> gebruik dit voor vaste antwoordopties, bijvoorbeeld <em>Sharp pain</em>, <em>Burning pain</em>, <em>Constant pain</em>.</li>
    </ul>
    <p>Je kunt zoveel groepen en vragen toevoegen als nodig.</p>
    <p><strong>Let op:</strong> de bot doorloopt altijd de volledige vragenlijst van begin tot einde. Gemiddeld bevatten vragenlijsten 30 tot 45 vragen en ongeveer 80% van de patiënten vult ze volledig in. Hou daar rekening mee bij langere formulieren.</p>
    <h3>Stap 3 – Afronden</h3>
    <p>Klik op <strong>Save</strong> zodra je tevreden bent. Als de knop niet beschikbaar is, controleer dan of alle verplichte velden ingevuld zijn.</p>
    <p>De vragenlijst is daarna beschikbaar in de bot onder de naam die je eraan gaf.</p>
  `,
  '21': String.raw`
    <p>Om dit duidelijker te maken, is er op de dashboardpagina een icoon toegevoegd dat aangeeft of de samenvatting al naar het EPD gekopieerd is.</p>
    <h2>Er zijn twee manieren om de status van dat icoon te wijzigen</h2>
    <h3>Handmatig via de detailpagina van het gesprek</h3>
    <p>Je kunt het icoon rechtstreeks aanklikken op de detailpagina van het gesprek. De status verandert dan naar <em>copied to EHR</em>.</p>
    <figure><img class="img-fluid" data-file-name="Screenshot 2025-06-27 at 10.28.41.png" src="https://www.vesalius.ai/web/image/4519-90340ab9/Screenshot%202025-06-27%20at%2010.28.41.png?access_token=98ff8f25-bfe0-4744-b78f-2b1e73ac5dc1" loading="lazy"></figure>
    <h3>Automatisch via instellingen</h3>
    <p>Je kunt automatische statusupdates ook inschakelen via <strong>Settings → Interactions → General</strong>.</p>
    <ol>
      <li>Zet de toggle <strong>Automatically set status to copied</strong> aan.</li>
      <li>Klik op <strong>Save</strong>.</li>
    </ol>
    <p>Vanaf dan wordt de status automatisch op <em>copied to EHR</em> gezet telkens wanneer je op de kopieerknop klikt.</p>
    <p>Je kunt de status daarna nog altijd handmatig aanpassen via de eerste methode.</p>
  `,
};
