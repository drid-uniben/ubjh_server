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
      'PUBLIC PARTICIPATION AND SUSTAINABLE ENVIRONMENTAL RESOURCE MANAGEMENT IN NIGERIA: IMPLICATION FOR PUBLIC POLICY DEVELOPMENT',
    abstract:
      'This paper holistically examined the lacuna created by lack of public participation in the efforts to attain sustainable environmental resource management in Nigeria. It adopted the content analysis of secondary data in journals, internet, government gazette and periodicals amongst others. The result of the analysis and review of the data established the fact that the bane of the failure and ineffectiveness of public actions and issues in the context of environmental management is the lacuna created and the gap between government and the people and the exclusion of public participation in the management of the environment resources in Nigeria. Feasible recommendations as penance to remedy this negative development were made at the end of the discourse.',
    keywords: [
      'Environmental resource management',
      'Public participation',
      'Sustainable development',
      'Pollution',
      'Public policy thrusts',
    ],
    authorEmail: 'ernest.ugiagbe@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 10,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 1, end: 15 },
  },
  {
    title:
      'INNOVATION, LEADERSHIP STYLE AND ORGANISATIONAL PERFORMANCE IN THE OIL AND GAS SECTOR OF NIGERIA (A CASE STUDY OF NATIONAL PETROLEUM DEVELOPMENT COMPANY)',
    abstract:
      'The purpose of the study was to examine the relationship among innovation, leadership style and organizational performance of NPDC in Benin City. The study adopted survey research design. The findings from the study revealed that Innovation dimensions (such as marketing innovation, management innovation and human resource innovation) had significant relationship with the performance of NPDC in Benin City. The study also revealed that Human resource innovation had the highest positive influence on the performance of NPDC in Benin City. Although all the innovation dimensions were positively related with transactional and transformational leadership styles, none of the dimensions had a significant relationship with transactional leadership style. Human resource innovation and management innovation were the dimensions that had significant influence on both transformational leadership style and the performance of NPDC in Benin City. Transactional leadership style was not significant with organizational performance, whereas transformational leadership was significant with organizational performance. Transformational leadership style was found to partially mediate the relationship between innovation and performance of NPDC in Benin City. It was recommended that NPDC should pay adequate attention to human resource innovation through training and development programmes. Transformational leadership should be developed across the entire organisation.',
    keywords: [
      'Innovation',
      'Transformational Leadership',
      'Management',
      'Organisational Performance',
      'National Petroleum Development',
    ],
    authorEmail: 'oluchi.okocha@uniben.edu',
    coAuthorEmails: ['presley.osemwengie@uniben.edu'],
    volumeNumber: 10,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 56, end: 73 },
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
