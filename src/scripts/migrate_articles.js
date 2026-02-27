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
      'ECOLOGICAL SYSTEMS THEORY AND UNDERSTANDING OF THE PHENOMENA OF POVERTY AND SOCIAL LOAFING IN BENIN METROPOLIS, EDO STATE, NIGERIA',
    abstract:
      'This paper espoused the nexus between ecosystems theory and the understanding of the social problems of poverty and social loafing in Benin Metropolis. The paper x-rays the connections between societal processes, class structure and distribution of the resources of the land and contended that social loafing and poverty are caused by the unhealthy and inequitable power-authority relations between different groups in the highly hierarchical Benin Metropolis. This paper shows that endemic poverty and social loafing is common in some parts of Benin Metropolis because of the structural economic divides and the stereotypical allocation of resources including development programmes between the highbrow Government Residential Area (GRA), the City Central Business District (CBD) and the surburbs have resulted in myriads of social pillars including poverty and social loafing. A social worker must first identify that his/her client’s issue is a social systems issue and then intervene using the lens of an ecosystems theory and understand the issue and the interplay of the environment in the exacerbation of the issue and this will help a social worker know the subsystem to address and the extent of the intervention. The paper advances some feasible panacea as the way forward. The paper recommends that the ecosystem theory be employed more in the Nigerian social work practice to further strengthen the practice of social workers especially those in the government institutions.',
    keywords: [
      'Social Loafing',
      'Ecosystem',
      'Environment',
      'Metropolis',
      'Poverty',
    ],
    authorEmail: 'aladeseluosayuwamen@gmail.com',
    coAuthorEmails: [],
    volumeNumber: 9,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 49, end: 62 },
  },
  {
    title:
      'FINANCIAL DEVELOPMENT AND INDUSTRIAL OUTPUT IN NIGERIA: EXPLORING THE LONG RUN AND SHORT RUN DYNAMIC NEXUS',
    abstract:
      'Contrasting empirical findings abound in literature on the nexus between financial development and industrial growth. It is against this backdrop and that of the declining industrial growth and financial development in Nigeria that this study examines a new evidence of the short-run dynamic, and long- run relationship between financial development and industrial growth in Nigeria. The study employs Error Correction Model (ECM) and Fully Modified OLS (FMOLS) regression techniques for a period spanning 1990 to 2021. A significant positive relationship was found in the long run and short run dynamics between financial development and industrial growth in Nigeria. The study recommends the removal of obvious impediments to financial development in Nigeria such as; multiple tax regimes, over regulation of the financial system, multiple charges on banking transactions, insider abuses in the financial system, socio-political tensions and monetary policy conflicts so as to reap the gains of financial development on industrial growth.',
    keywords: [
      'Industrial Growth',
      'Financial Development',
      'Fully Modified OLS',
      'Nigeria',
      'Dynamic Nexus',
    ],
    authorEmail: 'osamedeabusomwan@gmail.com',
    coAuthorEmails: ['norense.izevbigie@uniben.edu'],
    volumeNumber: 9,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 63, end: 78 },
  },
  {
    title: 'AN ESAN PERSPECTIVE OF ENVIRONMENTAL ETHICS',
    abstract:
      "This study is an exposition of environmental ethics based on Esan ontology. It begins with a brief excursion into Esan ontology to enable an understanding of the Esan perception of reality and the place of man in the totality of this reality. It explicates how this ontology impinges on the environment and concretely affects the Esan people's relationship with their environment. It argues that the interplay between ontology and the natural environment in Esan worldview constitutes the basis upon which viable environmental ethics can be established. The study argues that in Esan ontology, man is not separated from the rest of reality. Rather, it acknowledges that there is unity among beings and that the different components of nature complement one another to make a being the being that it is. Hence, Esan considers the non-human parts of the environment as part and parcel of her moral community. Consequently, the study argues that both present and future generations of people, the natural environment, including animals, plants and non-living natural beings have intrinsic value, and in consequence, moral standing. The study thus argues for inclusive environmental ethics based on the metaphysical union of beings in Esan thought. In résumé, the study projects the idea of ‘complementary environmentalism’ as a viable approach for human moral relation with nature. It adopts the critical, conceptual and speculative methods of philosophical inquiries.",
    keywords: [
      'Esan ontology',
      'Natural environment',
      'Union of beings',
      'Environmental ethics, Future generation',
      'Complementary environmentalism',
    ],
    authorEmail: 'felix.airoboman@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 9,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 79, end: 103 },
  },
  {
    title:
      'CREDIT RISK MANAGEMENT AND DEPOSIT MONEY BANK’S PERFORMANCE IN NIGERIA',
    abstract:
      'This paper investigated the impact of credit risk management on the performance of deposit money banks in Nigeria, as the main objective alongside the specific objectives of the paper. The paper used the causal research design, the Correlation and the panel least Square regression techniques as the methodology employed in the paper. Thus, data for the study were sourced from the CBN Statistical Bulletin between the 2006 to2018 periods. Our findings demonstrate succinctly that the selected credit risk management indicators under study significantly impact on the performance of deposit money banks measured as return on equity, return on assets, respectively.  Our findings however suggest that ROA is a better measure of performance than ROE. And our  recommendation are that, Banks should not always be in a rush in approving loans for prospective borrowers but should first determine the credit worthiness of the customer so as to aid quick pay back of the loan. This will not only reduce the massive loan losses often witnessed by them, it will also reduce their huge provision for loss loans and thereby improving their performance over time.',
    keywords: [
      'Panel Least Square',
      'Credit Risk',
      'Performance Deposit',
      'Credit Risk Management',
    ],
    authorEmail: 'bright.oni@uniben.edu',
    coAuthorEmails: ['eseoghene.idolor@uniben.edu'],
    volumeNumber: 9,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 104, end: 126 },
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
