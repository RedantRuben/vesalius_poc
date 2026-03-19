import type { LegacyFaqContentStore } from '@/lib/faq/types';

export const faqSeedContent: LegacyFaqContentStore = {
  en: {
    badgeLabel: 'Support & FAQ',
    title: 'Frequently Asked Questions',
    placeholder: 'Search...',
    noResults: 'No results found. Try a different search term or filter.',
    aboutTitle: 'About us',
    aboutBody:
      "On this page, you can find all the FAQs for the Vesalius.ai platform. If you can't find your answer, you can always contact us through the contact form.",
    tagsTitle: 'Tags',
    supportButtonLabel: 'Submit a ticket',
    readMoreLabel: 'Read article',
    closeLabel: 'Close article',
    items: [
      {
        id: '1',
        question: 'How does automatic sending of doctor-specific questionnaires via the calendar work?',
        excerpt:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: 'Nov 26, 2025',
        tags: ['Conversations', 'Customise'],
      },
      {
        id: '2',
        question: 'How does Smart Scheduling of Conversations work?',
        excerpt:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...',
        answer:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        date: 'Nov 26, 2025',
        tags: ['Conversations'],
      },
      {
        id: '3',
        question: 'How can I group rooms in the calendar?',
        excerpt:
          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati...',
        answer:
          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.',
        date: 'Nov 26, 2025',
        tags: ['Account management', 'Customise'],
      },
      {
        id: '4',
        question: 'Using Vesalius Scribe as a stand-alone module (no pre-conversation needed)',
        excerpt:
          'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus...',
        answer:
          'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
        date: 'Nov 6, 2025',
        tags: ['Summary'],
      },
      {
        id: '5',
        question: 'How can I customise the format of the Scribe bot summary?',
        excerpt:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto...',
        answer:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        date: 'Aug 1, 2025',
        tags: ['Summary', 'Customise'],
      },
      {
        id: '6',
        question: 'How can I prevent the patient initiated chatbot from asking for the appointment date?',
        excerpt:
          'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam...',
        answer:
          'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        date: 'Aug 1, 2025',
        tags: ['Patient initiated chatbot', 'Customise'],
      },
      {
        id: '7',
        question: 'How can I create a unique link to send a specific questionnaire?',
        excerpt:
          'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit...',
        answer:
          'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.',
        date: 'Aug 1, 2025',
        tags: ['Patient initiated chatbot', 'Conversations'],
      },
      {
        id: '8',
        question:
          'How can I choose which identification details the patient initiated chatbot asks the patients?',
        excerpt:
          'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic...',
        answer:
          'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
        date: 'Aug 1, 2025',
        tags: ['Patient initiated chatbot', 'Access management'],
      },
      {
        id: '9',
        question: 'How can I create or edit a questionnaire?',
        excerpt:
          'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere...',
        answer:
          'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.',
        date: 'Jun 27, 2025',
        tags: ['Conversations', 'Customise'],
      },
      {
        id: '10',
        question: 'How can I indicate that the summary has been copied to the EHR?',
        excerpt:
          'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur...',
        answer:
          'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
        date: 'Jun 27, 2025',
        tags: ['Summary'],
      },
    ],
  },
  fr: {
    badgeLabel: 'Support & FAQ',
    title: 'Questions frequentes',
    placeholder: 'Rechercher...',
    noResults: 'Aucun résultat. Essayez un autre mot-clé ou un autre filtre.',
    aboutTitle: 'A propos',
    aboutBody:
      "Vous trouverez ici les principales questions sur la plateforme Vesalius.ai. Si vous ne trouvez pas ce que vous cherchez, notre équipe peut vous répondre via le formulaire de contact.",
    tagsTitle: 'Thematiques',
    supportButtonLabel: 'Envoyer un ticket',
    readMoreLabel: "Lire l'article",
    closeLabel: "Fermer l'article",
    items: [
      {
        id: '1',
        question:
          "Comment fonctionne l'envoi automatique de questionnaires spécifiques au médecin via le calendrier ?",
        excerpt:
          "Le questionnaire peut être déclenché à partir d'un rendez-vous, d'un type de consultation ou d'un agenda donné afin d'envoyer la bonne préparation au bon patient.",
        answer:
          "Dans les paramètres du calendrier, vous pouvez associer un questionnaire à un praticien ou à un type de rendez-vous. Dès qu'un créneau correspondant est créé, Vesalius planifie automatiquement l'envoi du questionnaire au moment prévu.",
        date: '26 nov. 2025',
        tags: ['Conversations', 'Paramétrage'],
      },
      {
        id: '2',
        question: 'Comment fonctionne la planification intelligente des conversations ?',
        excerpt:
          "La planification intelligente adapte l'envoi des conversations au parcours patient, au type de soin et au bon moment du suivi.",
        answer:
          'Vesalius combine les règles que vous définissez avec le contexte du patient pour déterminer quand lancer une conversation, quand relancer et quand arrêter automatiquement le scénario.',
        date: '26 nov. 2025',
        tags: ['Conversations'],
      },
      {
        id: '3',
        question: 'Comment regrouper des salles dans le calendrier ?',
        excerpt:
          "Vous pouvez regrouper plusieurs salles ou ressources pour simplifier l'affichage et la planification au quotidien.",
        answer:
          "Créez un groupe de salles dans les paramètres du planning puis assignez-y les ressources concernées. Vous pourrez ensuite filtrer, afficher ou répartir les rendez-vous à l'échelle du groupe.",
        date: '26 nov. 2025',
        tags: ['Gestion du compte', 'Paramétrage'],
      },
      {
        id: '4',
        question:
          'Peut-on utiliser Vesalius Scribe comme module autonome, sans pre-conversation ?',
        excerpt:
          'Oui. Le module Scribe peut fonctionner seul si vous souhaitez uniquement capter la consultation et générer une synthèse structurée.',
        answer:
          "Il n'est pas nécessaire d'activer la pré-consultation pour utiliser Scribe. Vous pouvez lancer l'enregistrement ambiant pendant la consultation et récupérer ensuite la note clinique générée.",
        date: '6 nov. 2025',
        tags: ['Synthèse'],
      },
      {
        id: '5',
        question: 'Comment personnaliser le format de la synthèse Scribe ?',
        excerpt:
          'Vous pouvez adapter la sortie au format attendu par votre spécialité, votre cabinet ou votre DMI.',
        answer:
          'Les modèles permettent de définir la structure souhaitée, les rubriques obligatoires et le ton rédactionnel. Vous pouvez ainsi obtenir une synthèse proche de vos habitudes de documentation.',
        date: '1 août 2025',
        tags: ['Synthèse', 'Paramétrage'],
      },
      {
        id: '6',
        question:
          'Comment éviter que le chatbot initié par le patient demande la date du rendez-vous ?',
        excerpt:
          "Ce champ peut être rendu facultatif ou supprimé si votre flux ne dépend pas de l'agenda.",
        answer:
          "Dans les paramètres du scénario, désactivez la question liée à la date de rendez-vous ou remplacez-la par un autre identifiant. Le parcours restera fluide pour le patient tout en conservant le bon contexte côté équipe.",
        date: '1 août 2025',
        tags: ['Chatbot patient', 'Paramétrage'],
      },
      {
        id: '7',
        question: 'Comment créer un lien unique pour envoyer un questionnaire précis ?',
        excerpt:
          'Chaque questionnaire peut disposer de son propre lien partageable pour un envoi ponctuel ou récurrent.',
        answer:
          "Depuis le questionnaire concerné, générez un lien dédié puis partagez-le par e-mail, SMS ou tout autre canal. Le patient arrive directement dans le bon flux, sans étape inutile.",
        date: '1 août 2025',
        tags: ['Chatbot patient', 'Conversations'],
      },
      {
        id: '8',
        question:
          "Comment choisir quelles informations d'identification le chatbot initié par le patient doit demander ?",
        excerpt:
          'Vous pouvez ajuster les informations demandées pour trouver le bon équilibre entre simplicité et sécurité.',
        answer:
          "Dans le paramétrage du chatbot, sélectionnez les champs obligatoires comme le nom, la date de naissance ou le numéro de dossier. Vesalius utilisera ensuite uniquement ces informations pour l'identification.",
        date: '1 août 2025',
        tags: ['Chatbot patient', 'Gestion des accès'],
      },
      {
        id: '9',
        question: 'Comment créer ou modifier un questionnaire ?',
        excerpt:
          "Les questionnaires se construisent étape par étape et peuvent être adaptés à chaque spécialité ou cas d'usage.",
        answer:
          "Vous pouvez ajouter des questions, choisir les types de réponses, définir des conditions d'affichage et prévisualiser le parcours avant publication. Les modifications sont ensuite appliquées au flux concerné.",
        date: '27 juin 2025',
        tags: ['Conversations', 'Paramétrage'],
      },
      {
        id: '10',
        question: 'Comment indiquer que la synthèse a déjà été copiée dans le DMI ?',
        excerpt:
          "Un statut permet à l'équipe de savoir si la synthèse a déjà été reprise dans le dossier médical.",
        answer:
          "Une fois la synthèse transférée dans le DMI, vous pouvez la marquer comme traitée afin d'éviter les doublons et de garder une vision claire de ce qui reste à faire.",
        date: '27 juin 2025',
        tags: ['Synthèse'],
      },
    ],
  },
  nl: {
    badgeLabel: 'Support & FAQ',
    title: 'Veelgestelde vragen',
    placeholder: 'Zoeken...',
    noResults: 'Geen resultaten gevonden. Probeer een andere zoekterm of filter.',
    aboutTitle: 'Over ons',
    aboutBody:
      'Op deze pagina vind je alle veelgestelde vragen voor het Vesalius.ai-platform. Als je je antwoord niet kunt vinden, kun je altijd een ticket indienen via het formulier.',
    tagsTitle: 'Tags',
    supportButtonLabel: 'Dien een ticket in',
    readMoreLabel: 'Lees artikel',
    closeLabel: 'Sluit artikel',
    items: [
      {
        id: '1',
        question: 'Hoe kan ik mijn output op maat instellen?',
        excerpt:
          'Wat is een outputtemplate? Outputtemplates stellen je in staat om precies te definieren wat Vesalius AI genereert na een interactie met een patiënt. Je configureert de structuur, inhoud en timing...',
        answer:
          'Wat is een outputtemplate? Outputtemplates stellen je in staat om precies te definieren wat Vesalius AI genereert na een interactie met een patiënt. Je configureert de structuur, inhoud en timing en de AI zorgt voor de rest.',
        date: '9 mrt. 2026',
        tags: ['Customise', 'Summary'],
      },
      {
        id: '2',
        question:
          'Hoe werkt het automatisch verzenden van arts-specifieke vragenlijsten via de kalender?',
        excerpt:
          'Wat is automatisch vragenlijst verzenden? Het systeem kan automatisch de juiste vragenlijst naar de patiënt sturen op basis van de arts en het afspraaktype.',
        answer:
          'Wat is automatisch vragenlijst verzenden? Het systeem kan automatisch de juiste vragenlijst naar de patiënt sturen op basis van de arts en het afspraaktype. Eenmaal geconfigureerd, krijgt elke afspraak automatisch de juiste vragenlijst toegewezen.',
        date: '26 nov. 2025',
        tags: ['Conversaties', 'Agenda module'],
      },
      {
        id: '3',
        question: 'Hoe werkt Slimme Planning van Gesprekken?',
        excerpt:
          'Wat is Slimme Planning? Slimme Planning bepaalt automatisch het ideale moment om een gesprek naar een patiënt te sturen.',
        answer:
          'Wat is Slimme Planning? Slimme Planning bepaalt automatisch het ideale moment om een gesprek naar een patiënt te sturen. In plaats van de uitnodiging onmiddellijk te versturen, plant het systeem dit op basis van de afspraakdatum.',
        date: '26 nov. 2025',
        tags: ['Conversaties', 'Agenda module'],
      },
      {
        id: '4',
        question: 'Hoe kan ik kamers in de kalender groeperen?',
        excerpt:
          'Om uw kalender gemakkelijker te navigeren, kunt u gerelateerde kamers samenvoegen. Hieronder is een voorbeeld dat laat zien hoe kamers kunnen worden gegroepeerd.',
        answer:
          'Om uw kalender gemakkelijker te navigeren, kunt u gerelateerde kamers samenvoegen. Hieronder is een voorbeeld dat laat zien hoe de kamers RX en Cone Beam CT kunnen worden gegroepeerd onder Medische Beeldvorming.',
        date: '26 nov. 2025',
        tags: ['Accountbeheer', 'Agenda module'],
      },
      {
        id: '5',
        question:
          'Vesalius Scribe gebruiken als een op zichzelf staande module (geen voorafgaande conversatie nodig)',
        excerpt:
          'Dit stelt je in staat om de Scribe-bot te gebruiken, zelfs als je geen Vesaliusgesprek hebt gestuurd voor de consultatie.',
        answer:
          'Dit stelt je in staat om de Scribe-bot te gebruiken, zelfs als je geen Vesaliusgesprek hebt gestuurd voor de consultatie. Ideaal voor binnenlopers, dringende consulten of snelle opvolgingen. Ga naar de Intake pagina om te starten.',
        date: '6 nov. 2025',
        tags: ['Summary'],
      },
      {
        id: '6',
        question: 'Hoe kan ik het formaat van de samenvatting van de Scribe-bot aanpassen?',
        excerpt:
          'Je kunt nu volledig aanpassen hoe de Vesalius Scribe-bot zijn consultatiesamenvattingen structureert door gebruik te maken van uitvoerformaten.',
        answer:
          'Je kunt nu volledig aanpassen hoe de Vesalius Scribe-bot zijn consultatiesamenvattingen structureert door gebruik te maken van uitvoerformaten. Dit betekent dat je precies kunt definieren welke secties verschijnen.',
        date: '1 aug. 2025',
        tags: ['Summary', 'Customise'],
      },
      {
        id: '7',
        question:
          'Hoe kan ik voorkomen dat de door de patiënt geinitieerde chatbot vraagt naar de afspraakdatum?',
        excerpt:
          'Standaard zal de chatbot de patiënt vragen naar de afspraakdatum wanneer ze een PICO-link openen. Als je niet wilt dat deze vraag wordt gesteld, kun je deze uitschakelen.',
        answer:
          'Standaard zal de chatbot de patiënt vragen naar de afspraakdatum wanneer ze een PICO-link openen. Als je niet wilt dat deze vraag wordt gesteld, kun je deze uitschakelen in de instellingen.',
        date: '1 aug. 2025',
        tags: ['Patient initiated chatbot', 'Customise'],
      },
      {
        id: '8',
        question: 'Hoe kan ik een unieke link maken om een specifieke vragenlijst te verzenden?',
        excerpt:
          'Je kunt een PICO-link maken die is gekoppeld aan een of meer specifieke vragenlijsten. Dit zorgt ervoor dat de chatbot alleen de geselecteerde vragenlijsten gebruikt.',
        answer:
          'Je kunt een PICO-link maken die is gekoppeld aan een of meer specifieke vragenlijsten. Dit zorgt ervoor dat de chatbot alleen de geselecteerde vragenlijsten gebruikt bij interactie met de patiënt.',
        date: '1 aug. 2025',
        tags: ['Patient initiated chatbot', 'Conversaties'],
      },
      {
        id: '9',
        question:
          'Hoe kan ik kiezen welke identificatiegegevens de door de patiënt geinitieerde chatbot aan de patiënten vraagt?',
        excerpt:
          'Wanneer een patiënt een gesprek begint via een door de patiënt geinitieerde link, begint de chatbot met het vragen naar identificatiegegevens.',
        answer:
          'Wanneer een patiënt een gesprek begint via een door de patiënt geinitieerde link, begint de chatbot met het vragen naar identificatiegegevens. Deze gegevens helpen je de patiënt te identificeren.',
        date: '1 aug. 2025',
        tags: ['Patient initiated chatbot', 'Acces management'],
      },
      {
        id: '10',
        question: 'Hoe kan ik een specifiek door de patiënt geinitieerd gesprek anoniem maken?',
        excerpt:
          'Bij het genereren van een PICO-link voor een door de patiënt geinitieerd gesprek, kun je ervoor kiezen om dit gesprek anoniem te maken.',
        answer:
          'Bij het genereren van een PICO-link voor een door de patiënt geinitieerd gesprek, kun je ervoor kiezen om dit gesprek anoniem te maken. Dit betekent dat er geen persoonlijke informatie van de patiënt zal worden gevraagd.',
        date: '1 aug. 2025',
        tags: ['Patient initiated chatbot', 'Acces management'],
      },
      {
        id: '11',
        question: 'Hoe kan ik een vragenlijst aanmaken of bewerken?',
        excerpt:
          'Je kunt alle vragenlijsten beheren via Instellingen > Soorten gesprekken. Deze sectie geeft je een overzicht van alle vragenlijsten.',
        answer:
          'Je kunt alle vragenlijsten beheren via Instellingen > Soorten gesprekken. Deze sectie geeft je een overzicht van alle vragenlijsten die momenteel beschikbaar zijn op het platform.',
        date: '27 jun. 2025',
        tags: ['Conversaties', 'Customise'],
      },
      {
        id: '12',
        question: 'Hoe kan ik aangeven dat de samenvatting naar het EPD is gekopieerd?',
        excerpt:
          'Om dit duidelijker te maken, hebben we een pictogram op de dashboardpagina toegevoegd dat aangeeft of de samenvatting al dan niet naar het EPD is gekopieerd.',
        answer:
          'Om dit duidelijker te maken, hebben we een pictogram op de dashboardpagina toegevoegd dat aangeeft of de samenvatting al dan niet naar het EPD is gekopieerd. Je kunt dit handmatig wijzigen of automatisch instellen.',
        date: '27 jun. 2025',
        tags: ['Summary'],
      },
    ],
  },
};
