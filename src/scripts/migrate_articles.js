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
      'DEMOGRAPHIC CHARACTERISTICS IN THE ATTITUDE OF POSTGRADUATE STUDENTS TOWARDS THE USE OF INFORMATION RESOURCES IN UNIVERSITY LIBRARIES IN SOUTH-SOUTH, NIGERIA',
    abstract:
      'The study investigated the demographic characteristics in the attitude of postgraduate students towards the use of information resources in university libraries in south-south Nigeria. The specific purpose was to examine the differences in the attitude of male and female postgraduate students towards the use of information resources, explore the disciplinary differences in the attitude of postgraduate students towards the use of information resources, in university libraries located in Edo, Delta, Bayelsa, Akwa-Ibom, Cross River, and Rivers States. Four research questions and four hypotheses were raised to guide this study. The survey method was adopted. A sample of 1,744 was drawn out of the population of 17,449 from which 1,412 was found usable for the study. The reliability of the instrument used for the survey was tested using Cronbach Alpha which yielded an index of (0.87). The data were analyzed using frequency counts, percentage, mean, standard deviation, z-test and ANOVA. The results of analysis revealed that Sex difference and disparate academic discipline influence Postgraduate students’ attitude towards the use of information resources in university libraries in South-South Nigeria. It was recommended that the libraries should be well funded in order to acquire current and relevant information materials, organize symposium on available information resources as part of orientation programme for postgraduate students. Assignments that compel postgraduate students to use library information resources should be encouraged by the academia. Finally the Reference librarians should be accessible for information resources consultation.',
    keywords: ['Sex', 'Academic Discipline', 'Attitude', 'Libraries', 'ANOVA'],
    authorEmail: 'joyce.oragbon@uniben.edu',
    coAuthorEmails: ['samuwaifo@yahoo.com'],
    volumeNumber: 8,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 51, end: 70 },
  },
  {
    title:
      'THE IMPACT OF N-POWER PROGRAMME ON FOOD POVERTY REDUCTION OF BENEFICIARIES IN OREDO LOCAL GOVERNMENT AREA, EDO STATE, NIGERIA',
    abstract:
      'The plan by former president Muhammadu Buhari to lift 100 million Nigerians out of endemic poverty by the year 2030 using appropriate social protection programmes and to know the extent to which this has been achieved through N-Power programmes necessitated the study. The objective of the study was to determine how N-Power worked to reduce the food poverty of beneficiaries in Oredo L.G.A of Edo State. The study leverages empowerment theory and the population of the study comprises N-Power batch A and B enrollees who served in Oredo L.G.A. of Edo State.. The researchers reviewed relevant literature in the area of the study and to have a robust knowledge of the subject matter of discourse the study utilised mixed methods of data collection which involved the use of both quantitative and qualitative methods. Taro Yamani scientific tools were used to obtain an optimum sample size of 345 for N-Power batches A and B respectively. The hypothesis raised was tested with the Pearson correlation statistical method. Findings revealed that N-Power programme has improved the general standard of living of beneficiaries, and closed the food poverty inequality gap between beneficiaries against non-beneficiaries of the programme in the aforementioned local government area. The study recommends that Government should enshrine social protection programmes into the Nigerian constitution, Government at all levels should evolve different food intervention programmes such as food stamps, and food vouchers among others to address the biting challenges of food poverty in Nigeria.',
    keywords: [
      'Beneficiaries',
      'Food Poverty',
      'N-Power Programme',
      'Oredo L.G.A',
      'Reduction',
    ],
    authorEmail: 'isiakamustapha1961@gmail.com',
    coAuthorEmails: ['fred.okunmahie@edouniversity.edu.ng'],
    volumeNumber: 8,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 83, end: 95 },
  },
  {
    title:
      'STRUCTURAL CHANGES AND TAX PERFORMANCE IN ECOWAS SUB-REGION: THEORETICAL AND DESCRIPTIVE PERSPECTIVE',
    abstract:
      'The pattern of changes and adjustments in the structure of an economy is an issue of consideration in determining tax performance. Most countries inclusive of countries within ECOWAS sub region have recorded major structural changes over the years and this no doubt has a bearing on tax performance in particular and the economy in general.  Structural changes was considered as changes in sectorial shares as it relates to output, productivity growth while tax performance was considered in terms of the ratio of taxes to GDP and the structure of taxation in a panel of fifteen (15) countries of the ECOWAS sub-region covering the period of 2000 to 2017. To this end, varied theories were reviewed while the data set were processed and descriptively presented as it relates to structural changes and tax performance in ECOWAS. It was observed that structural changes did not remarkably reflect in improved tax performance owing to factors such as weak tax laws, ease of paying taxes, high of tax rates. It was then recommended amongst others that there is need for ECOWAS sub region to ensure structural adjustments that are market-based and effectively guided by policies and institutional enforcements.',
    keywords: [
      'Structural Changes',
      'Tax Performance',
      'ECOWAS',
      'Time Series',
      'Descriptive Perspective',
    ],
    authorEmail: 'roland_irughe@yahoo.com',
    coAuthorEmails: ['norense.izevbigie@uniben.edu'],
    volumeNumber: 8,
    issueNumber: 2,
    articleType: 'research_article',
    pages: { start: 119, end: 136 },
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
