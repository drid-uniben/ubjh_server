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
      'A CRITICAL APPRAISAL OF THEORETICAL PERSPECTIVES ON AFRICA’S DEVELOPMENT: A REVISIT OF MODERNIZATION AND DEPENDENCY THEORIES',
    abstract:
      'The paper examines the scholarly debate and prescriptions of the modernization/dependency theoretical constructs in justifying the underdevelopment status of African states. It critically discussed the views of scholars of both divide in an attempt to seek for plausible solutions to the African dilemma. The descriptive analytical construct was adopted in analyzing the phenomenon chronologically and systematically to ensure thorough appraisal and understanding. The paper argue that the economic development problems facing Africa cannot be resolved with the prescription of either of the development theories, hence, the need for integration and harmonization of both perspectives and adoption of an approach that is neither Liberal nor Marxist but capable of resolving the African development challenges. In this vein, the paper advocates the adoption of the strong points and benefits prescribed by both construct to be implemented in such a way as to avoid the breaching of international trade agreements and exchange.',
    keywords: [
      'Modernization',
      'dependency',
      'Underdevelopment',
      'African economies',
      'global south',
    ],
    authorEmail: 'osariyekemwen.igiebor@uniben.edu',
    coAuthorEmails: ['joseph.aihie@uniben.edu', 'daniel.tonwe@uniben.edu'],
    volumeNumber: 11,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 1, end: 14 },
  },
  {
    title:
      'CURRENCY REDESIGN POLICY: ASSESSING THE IMPACT ON COUNTERFEIT PREVENTION IN NIGERIA BEYOND 2023',
    abstract:
      'The spread of fake bank notes has become a clog in the wheel of government revenue generation in Nigeria and across countries of the world. The menace has been so prevalent in Nigeria to the extent the country ranks among the top producers and users of counterfeit bank notes in West Africa. Between 2016 and 2020, the financial authorities seized 365.25 million fake banknotes in circulation. In 2020 alone, a total of 67,265 banknotes with a nominal value of N56.8 million were confiscated. The CBN has utilised numerous strategies to mitigate the problem over the years but with relatively low success rate. It is against this backdrop that this paper discusses the 2023 currency redesign and its implications for counterfeit prevention in Nigeria. Relying on secondary data and rational choice theoretical framework, the paper outlined the security features that are inherent in the newly redesigned currency notes of ₦200, ₦500 and ₦1000 which have been embedded to make counterfeiting difficult for violators. These features are: Intaglio Raised Print, Portrait Watermark, optically variable ink, Iridescent Band, Windowed Metallic Security Thread, Hand-engraved portrait, silver patch (antiscan), and Gold patch (antiscan). With this notion, the paper concludes that the quest for durable and long-lasting currency has just been achieved, not only in 2023 but beyond. This can be achieved when these recommendations are adhered to: Strict adherence to legal provisions, ensuring adequate production and effective distribution of the currency, Improved Public Awareness Campaign.',
    keywords: ['Currency', 'Redesign', 'Counterfeit', 'Rational', 'Prevention'],
    authorEmail: 'endurance.aigbe@uniben.edu',
    coAuthorEmails: ['amaka.omamor@uniben.edu'],
    volumeNumber: 11,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 15, end: 30 },
  },
  {
    title:
      'KNOWLEDGE AND PERCEPTION OF THE CAUSATION AND TRANSMISSION OF ELEPHANTIASIS (LYMPHATIC FILARIASIS) IN OWAN- WEST LOCAL GOVERNMENT AREA, EDO STATE, NIGERIA',
    abstract:
      'Elephantiasis is also known as lymphatic filariasis, spread by mosquitoes. It derived it’s the name elephantiasis because of the swelling and the size of the affected part especially the legs. Elephantiasis also affects other parts of the body like the private parts, breast, hands etc. The causation of the disease Elephantiasis is a pathogenic nematode which is introduced to the human body through the bite of the mosquito, which thereafter causes the inflammation of the lymph nodes, fever, and lymphedema.   Elephantiasis is an infection in humans caused by the transmission of certain parasites called filariae (filariae worm) to humans through the bite of an infected mosquito. The mosquito transmits larvae into the human body that will later develop to adult worms called ‘Wuchereria Bancrofti’. Elephantiasis is a disease that seems to have so much misconception concerning its aetiology. Some persons believe that there is a spiritual and mystical undertone regarding the disease causation, others believe that it is hereditary, the act of gods or some deities. The study revealed that there are various misconceptions concerning the disease elephantiasis, for those that had various misconception and misperception about the disease, the proper medical treatment was and will not be sought after. The government should therefore intensify its effort to ensure proper and enlightenment campaign is launched in the endemic areas.',
    keywords: [
      'Causation',
      'Disease',
      'Knowledge',
      'Lymphatic filariasis',
      'Perception',
    ],
    authorEmail: 'ekwaegbeari.idehen-agho@uniben.edu',
    coAuthorEmails: ['ibhafidon.sadoh@uniben.edu'],
    volumeNumber: 11,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 31, end: 46 },
  },
  {
    title:
      'EXORBITANT ELECTION NOMINATION FORMS AND NOT-TOO-YOUNG-TO-RUN ACT IN NIGERIA: LESON FROM FRANCE',
    abstract:
      'Following the campaign by some activists to lower the minimum age at which candidates are eligible to run for political offices in Nigeria, the Nigerian Senate and House of Representatives passed a constitutional amendment bill that reduces the age of qualification for running for president. This is justifiable when compare to France where even as low as 18 years old can contest for the post of a president. The Not-Too-Young-To-Run Bill was` aimed at increasing youth participation in politics. However, the major political parties on ground are controlled by the bigwigs in the political space who determine who get what, when and how. Consequent upon their activities and deliberate imposition of an outrageous fee for expression of interest and nomination form, Nigeria is heading for moneybags politics and whoever gets more money wins the elections. The will of the people are not allowed to prevail in such circumstances, hence the aim of this paper is to identify the dialectical relationships between the pretentious encouragement of the youth in Nigeria to participate in elective positions and the imposition of an exorbitant nomination fees, with a view to determine whether or not the fees will draw more youth into elective positions in the country. The study uses descriptive research design and secondary data were obtained from textbooks, journals, newspapers, radio/television news and internet.  It was however revealed that not-too-young-to-run Act will remain a fallacy. It is a clear case of the political ruling classes giving with the right hands and collecting it back with the left hands, thereby doing everything possible to limit the young people from occupying political positions and participating in Nigeria democracy. Some suggestions were made to savage the situation. Among which was calling for a drastic reduction in the amount of money that political parties are charging for their express of interest and nomination forms.',
    keywords: [
      'Not-too-young-to-run-Act',
      'Exorbitant election nomination forms',
      'Youth participation',
      'Moneybag Politics',
      'Nigeria Democracy',
    ],
    authorEmail: 'moses.izevbizua@uniben.edu',
    coAuthorEmails: ['kingsley.omoruyi@uniben.edu'],
    volumeNumber: 11,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 47, end: 60 },
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
