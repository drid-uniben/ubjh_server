/* eslint-disable max-len */
// migrate_articles.js
// Usage: mongosh "mongodb://localhost:27017/YOUR_DB_NAME" migrate_articles.js
// Migrate ONE ISSUE AT A TIME — change the array below for each run.

// ============================================================
// EDIT THIS ARRAY — one object per article
// ============================================================
const ARTICLES_TO_MIGRATE = [
  {
    title:
      'URBAN-URBAN LINKAGE: RELEVANCE AND CHALLENGES OF THE RIVER NIGER AT ASABA AND ONITSHA, 1965-2022',
    abstract:
      'This paper examines the historical and contemporary relevance of the bridges linking Asaba and Onitsha across the River Niger, focusing on their economic and infrastructural significance since 1965. This paper argues that the first and second bridges were built as a result of the increased demand for transport across the River Niger. The construction of the first bridge replaced the arduous water ferry crossing of the River Niger in the colonial and immediate post-independence periods. The building of the second bridge supplemented the first bridge in handling increased traffic connecting Asaba and Onitsha with other parts of the west and east regions of Nigeria. This paper highlights how state power and budgetary allocations were pivotal in their construction and address the challenges posed by increased traffic and insufficient maintenance over time. This paper argues that bridges are vital national road transport infrastructures that play significant roles in stimulating wealth creation and economic development through the movement of goods, people, and services. They are also integrating trade and commercial activities between the eastern and western regions with other regions in Nigeria. The bridges enhance social interactions and integration of people from diverse ethnic backgrounds thereby fostering greater inter-group relations and national cohesion.',
    keywords: [
      'Transportation',
      'Bridge',
      'Asaba',
      'Onitsha',
      'Infrastructure',
      'River Niger',
    ],
    authorEmail: 'daniel.iweze@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 12,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 1, end: 26 },
  },
  {
    title:
      'THEORETICAL APPLICATION AND ANALYSIS OF HEALTH BELIEF MODEL AND EPIDEMIOLOGICAL TRIANGLE MODEL TO ELEPHANTIASIS IN NIGERIA',
    abstract:
      'Models are simplified representation of a real-world system, concept or phenomenon. It could be physical, mathematical or conceptual representation which is used to analyze, predict or understand complex systems or behavior. While theory is a set of interrelated constructs, definitions and propositions that present a systemic view of phenomena by specifying relations among variables, with the purpose of explaining or predicting phenomena. Elephantiasis is a disease caused by a parasitic worm known as Wuchereria Bancrofti and it is transmitted by the mosquitoes. The disease is endemic in tropical and subtropical regions of Africa, Asia and the pacific. The Health Belief Model (HBM) was developed in the early 1950s as an attempt to understand the widespread failure of people concerning the acceptance of disease preventives or screening tests for the early detection of asymptomatic disease. The epidemiologic triangle is a model developed by scientists to study health problems particularly infectious diseases and how they are transmitted or spread from one organism to the other. It is a method of disease investigation and detection. For any public health program to be effective and successful, its initiatives must be based on an understanding of health behavior and the possibility of behavioural change in the context in which they occur. The analysis and application of these models therefore, was to reemphasis the link between health outcome and human behavior and the possible ways of preventing illness and diseases in man and in its environment.',
    keywords: [
      'Disease',
      'Elephantiasis',
      'Health Behavior',
      'Models',
      'Transmission',
    ],
    authorEmail: 'ekwaegbeari.idehen-agho@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 12,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 27, end: 39 },
  },
  {
    title:
      'DISASTER CAPITALISM: APPRAISING THE ECONOMICS OF TERRORISM IN NIGERIA',
    abstract:
      'The economics of terrorism in Nigeria is largely an under-studied research area. There is a growing body of literature on Boko Haram terrorism and its impact on Nigeria’s political economy, but none of these works had examined Boko Haram terrorism in the context of disaster capitalism and profiteering. Hence, this study seeks to cover this knowledge gap. To achieve the aim of the study, the researcher deployed the historical research methodology. Historically, it found that the abysmal political and economic performance of the Nigerian state, despite her enormous wealth, are first shocks to Nigerians, and the rise of terrorism in Nigeria is the second shock. These negations of the social contract between the leaders and followers are the breeders of the political malfeasances and economic injustices propelling the economics of terrorism. Implicitly, they become the door handle shock doctors (terrorism entrepreneurs and disaster capitalists) use to open the national treasury of Nigeria to profiteering and plundering. In the country, Boko Haram terrorists and their local and foreign collaborators were argued to be shock doctors administering shock therapies (terror and violence) for profiteering. Therefore, this study concludes that troubleshooting Nigeria’s political economy instead of increasing military budgeting is a more pragmatic step to countering Boko Haram terrorism. The latter is a no-no because it spurns the economics of terrorism into a complex web.',
    keywords: [
      'Terrornomics',
      'Disaster Capitalism',
      'Health Behavior',
      'Nigeria',
      'Boko Haram',
      'Terrorism',
    ],
    authorEmail: 'ekwaegbeari.idehen-agho@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 12,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 40, end: 68 },
  },
  {
    title:
      'STOCK MARKET RETURNS AND CORONAVIRUS PANDEMIC IN NIGERIA AND SOUTH AFRICA: A VECTOR ERROR CORRECTION MODEL (VECM) COMPARATIVE APPROACH',
    abstract:
      "This study examined how Stock Market Return (SMR) respond to the number of COVID-19 Infected Confirmed Cases (ICC), Death cases (DC) and government response policy of Facial Covering (FC), Testing Policy (TC) and Lockdown policy (LDP) in Nigeria and South Africa. Daily time series data were collected from the Nigeria Exchange Limited, Johannesburg Stock Exchange (JSE) and Oxford Covid-19 Government Response Tracker (OXCGRT) website from January 22, 2020, to March 24, 2022. The preliminary test of descriptive statistics, correlation analysis, stationarity test and Johansen co-integration test were used. The dynamic Vector Error Correction Model (VECM), variance decomposition and impulse response framework were adopted to analyse the data. Findings indicate that ICC DC, TP and LDP have a significant positive effect on SMR in Nigeria in the long run while only lag values of SMR and DC have a negative causal effect on SMR in the short run. For South Africa, ICC, LDP and FC positively and significantly influence SMR in the long run; while the effects of DC and TP were negative and significant. In the short run, only the SMR lag values and FC significantly and positively determines SMR in the South Africa bourse as shown in the VECM result. The variance decomposition result shows that measures of COVID-19 and government policy response positively contribute to variation in SMR in both markets. The impulse response shows that SMR responds positively to ICC, TP and LDP and negatively reacts to DC and FC in Nigeria. In South Africa, SMR inversely reacts to ICC and positively responds to DC, FC, TP and LDP. From the above analysis, this study recommends that a more effective and efficient policy mix should be implemented by the government to arrest and reduce the ICC rate in South Africa and DC in Nigeria to boost investors' confidence and concludes that only COVID-19 information of DC and FC are significant determinants of SMR changes in Nigeria and South Africa bourse in the short run while all measures of COVID-19 and government policy response are significant determinants of SMR in the long run in both markets (except for FC in Nigeria).",
    keywords: [
      'Coronaviruses Pandemic',
      'Stock Market Returns',
      'Generalized Entropy Theory of Information',
      'COVID-19',
      'Lockdown policy',
    ],
    authorEmail: 'osamudiamen.wallace@uniben.edu',
    coAuthorEmails: ['osazee.omorokunwa@uniben.edu'],
    volumeNumber: 12,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 69, end: 114 },
  },
  {
    title: 'FINANCIAL DEVELOPMENT, URBANISATION AND AIR POLLUTION IN NIGERIA',
    abstract:
      'This study explored the intricate relationship between financial development (FD), urbanisation (URBG), and air pollution proxied with carbon emission (CE) in Nigeria using time series data covering the period 1981-2023. The Central Bank of Nigeria (CBN), Worldometer, and World Development Indicators databases are among the reliable sources from which the dataset was gathered. We used several statistical techniques to ensure the study was robust, including the Phillips-Perron and Augmented Dickey-Fuller (ADF) tests. In order to account for the mixed nature of the I(0) and I(1) variables, the estimation of coefficients was appropriately done using an Autoregressive Distributed Lag (ARDL) Error Correction Model. The Long-run ARDL Model and Bounds Test were applied to enable the investigation of cointegration. The study revealed a significant relationship between financial development, urbanisation and air pollution in Nigeria. The findings of this study not only contribute to our understanding of the intricate relationships among urbanisation, financial development, and environmental outcomes but also hold significant implications for policy formulation geared towards sustainable development in Nigeria.',
    keywords: [
      'Air Pollution',
      'CO2 emission',
      'Financial Development',
      'Urbanisation',
      'Central Bank of Nigeria',
    ],
    authorEmail: 'osazee.ogieva@uniben.edu',
    coAuthorEmails: ['johnson.ateghie@mgtsci.uniben.edu'],
    volumeNumber: 12,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 115, end: 145 },
  },
];
// ============================================================

print('=== Article Migration Script ===');
print(`Articles to process: ${ARTICLES_TO_MIGRATE.length}`);

let successCount = 0;
let skipCount = 0;
const errors = [];

for (let i = 0; i < ARTICLES_TO_MIGRATE.length; i++) {
  const articleData = ARTICLES_TO_MIGRATE[i];
  print(
    `\n[${i + 1}/${ARTICLES_TO_MIGRATE.length}] Processing: "${articleData.title.substring(0, 60)}..."`
  );

  try {
    // 1. Find primary author
    const author = db.Users.findOne({
      email: articleData.authorEmail.toLowerCase().trim(),
      role: 'author',
    });
    if (!author)
      throw new Error(`Author not found: ${articleData.authorEmail}`);

    // 2. Find co-authors
    const coAuthorIds = [];
    for (const coEmail of articleData.coAuthorEmails || []) {
      const coAuthor = db.Users.findOne({
        email: coEmail.toLowerCase().trim(),
      });
      if (!coAuthor) throw new Error(`Co-author not found: ${coEmail}`);
      coAuthorIds.push(coAuthor._id);
    }

    // 3. Find volume
    const volume = db.Volumes.findOne({
      volumeNumber: articleData.volumeNumber,
    });
    if (!volume)
      throw new Error(
        `Volume ${articleData.volumeNumber} not found. Create it first in the admin panel.`
      );

    // 4. Find issue — use its publishDate for the article
    const issue = db.Issues.findOne({
      volume: volume._id,
      issueNumber: articleData.issueNumber,
    });
    if (!issue)
      throw new Error(
        `Issue ${articleData.issueNumber} not found for Volume ${articleData.volumeNumber}. Create it first.`
      );

    // 5. Duplicate check
    const duplicate = db.Articles.findOne({
      title: articleData.title,
      issue: issue._id,
    });
    if (duplicate) {
      print(`  ⚠ SKIPPED — article already exists in this issue`);
      skipCount++;
      continue;
    }

    // 6. Build document
    const now = new Date();
    const article = {
      title: articleData.title.trim(),
      abstract: articleData.abstract.trim(),
      keywords: (articleData.keywords || []).map((k) => k.trim()),
      pdfFile: '', // empty — upload later via admin "Manual Articles" tab
      author: author._id,
      coAuthors: coAuthorIds,
      // NO manuscriptId — marks this as manually published
      publishDate: issue.publishDate, // use issue's publish date
      volume: volume._id,
      issue: issue._id,
      articleType: articleData.articleType || 'research_article',
      pages:
        articleData.pages?.start && articleData.pages?.end
          ? { start: articleData.pages.start, end: articleData.pages.end }
          : undefined,
      views: { count: 0, viewers: [] },
      downloads: { count: 0, downloaders: [] },
      citationCount: 0,
      license: 'CC BY 4.0',
      copyrightHolder: 'The Authors',
      isPublished: true,
      publishedAt: now,
      indexingStatus: {
        googleScholar: false,
        base: false,
        core: false,
        internetArchive: false,
      },
      publicationOptions: {
        doiEnabled: false,
        internetArchiveEnabled: false,
        emailNotificationEnabled: false,
      },
      emailNotificationStatus: {
        sent: false,
        idempotencyKey: `migration_${now.getTime()}_${i}`,
        recipientCount: 0,
        failureCount: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    db.Articles.insertOne(article);
    successCount++;
    print(
      `  ✓ Inserted — Author: ${author.name}, Vol ${articleData.volumeNumber} Iss ${articleData.issueNumber}, Pages ${articleData.pages?.start}-${articleData.pages?.end}`
    );
  } catch (err) {
    errors.push({
      title: articleData.title.substring(0, 50),
      error: err.message,
    });
    print(`  ✗ ERROR: ${err.message}`);
  }
}

print('\n======== SUMMARY ========');
print(`✓ Inserted : ${successCount}`);
print(`⚠ Skipped  : ${skipCount}`);
print(`✗ Errors   : ${errors.length}`);
if (errors.length > 0) {
  print('\nFailed articles:');
  errors.forEach((e, i) => print(`  ${i + 1}. "${e.title}..." — ${e.error}`));
}
print('=========================');
print(
  '\nNext step: Go to Admin → Publication → Manual Articles to upload PDFs.'
);
